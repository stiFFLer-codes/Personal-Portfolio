#!/usr/bin/env python3
"""
Build-time generator for the /travel map geometry. NOT a runtime dependency.

Fetches public-domain Natural Earth 50m admin-0 boundaries, keeps the six
countries the trip touches, projects them (Lambert conformal conic) into the
SVG viewBox, simplifies, and writes src/components/travel-geo.ts with accurate
country paths, label anchors, and the projected marker positions for each stop.

The SAME projection is applied to the coastlines and to the city coordinates,
so every pin lands in the correct country by construction.

Usage:
    python3 scripts/build-travel-geo.py [path-to-ne50.geojson]
If no local file is given it fetches from raw.githubusercontent.com.
"""
import json, math, sys, os, urllib.request, ssl
sys.setrecursionlimit(20000)


def make_ssl_context():
    # Use the proxy CA bundle when this environment provides one (CURL_CA_BUNDLE,
    # or the known agent-proxy path); otherwise fall back to the system trust
    # store, so the generator also runs on an ordinary checkout without that file.
    cafile = os.environ.get("CURL_CA_BUNDLE")
    if not cafile:
        fallback = "/root/.ccr/ca-bundle.crt"
        cafile = fallback if os.path.exists(fallback) else None
    return ssl.create_default_context(cafile=cafile)

NE_URL = ("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
          "master/geojson/ne_50m_admin_0_countries.geojson")
NE_LAKES_URL = ("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
                "master/geojson/ne_50m_lakes.geojson")
LAKE_MIN_AREA = 40.0  # viewBox px^2 — keep sizeable lakes, drop specks

# viewBox width; height derived from the projected frame aspect.
W = 1000.0
MARGIN = 22.0
# Framing window (lon/lat). Anything beyond is clipped by the plate in the SVG.
LON0, LON1, LAT0, LAT1 = 3.5, 30.5, 54.0, 64.0
# Lambert conformal conic parameters for the region.
PHI1, PHI2, PHI0, LAMBDA0 = 56.0, 63.0, 59.0, 17.0
DP_TOL = 0.8  # Douglas-Peucker tolerance, viewBox units

COUNTRIES = ["Norway", "Sweden", "Finland", "Denmark", "Estonia", "Latvia"]
CITIES = {  # lat, lon
    "helsinki": (60.17, 24.94), "jyvaskyla": (62.24, 25.75),
    "baltic-sea": (59.30, 20.60), "stockholm": (59.33, 18.07),
    "gothenburg": (57.71, 11.97), "oslo": (59.91, 10.75),
    "sandefjord": (59.13, 10.22), "riga": (56.95, 24.11),
    "tallinn": (59.44, 24.75),
}

d2r = math.radians

def lcc(lat, lon):
    p1, p2, p0, l0 = map(d2r, (PHI1, PHI2, PHI0, LAMBDA0))
    phi, lam = d2r(lat), d2r(lon)
    n = math.log(math.cos(p1) / math.cos(p2)) / math.log(
        math.tan(math.pi/4 + p2/2) / math.tan(math.pi/4 + p1/2))
    F = math.cos(p1) * math.tan(math.pi/4 + p1/2)**n / n
    rho = F / math.tan(math.pi/4 + phi/2)**n
    rho0 = F / math.tan(math.pi/4 + p0/2)**n
    x = rho * math.sin(n * (lam - l0))
    y = rho0 - rho * math.cos(n * (lam - l0))
    return x, y

# --- fit transform from the framing window ---
xs, ys = [], []
for i in range(41):
    for (a, b) in [(LON0 + (LON1-LON0)*i/40, LAT0), (LON0 + (LON1-LON0)*i/40, LAT1),
                   (LON0, LAT0 + (LAT1-LAT0)*i/40), (LON1, LAT0 + (LAT1-LAT0)*i/40)]:
        x, y = lcc(b, a); xs.append(x); ys.append(y)
minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
scale = (W - 2*MARGIN) / (maxx - minx)
H = round((maxy - miny) * scale + 2*MARGIN, 1)

def project(lat, lon):
    x, y = lcc(lat, lon)
    px = MARGIN + (x - minx) * scale
    py = MARGIN + (maxy - y) * scale   # flip Y for SVG
    return px, py

def dp(pts, tol):
    if len(pts) < 3:
        return pts
    dmax, idx = 0.0, 0
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    for i in range(1, len(pts)-1):
        x0, y0 = pts[i]
        num = abs((y2-y1)*x0 - (x2-x1)*y0 + x2*y1 - y2*x1)
        den = math.hypot(x2-x1, y2-y1) or 1e-9
        dist = num/den
        if dist > dmax:
            dmax, idx = dist, i
    if dmax > tol:
        return dp(pts[:idx+1], tol)[:-1] + dp(pts[idx:], tol)
    return [pts[0], pts[-1]]

def simplify_ring(proj, tol):
    # A closed ring has first==last, which makes a single DP baseline degenerate
    # (zero-length -> all distances 0 -> collapse). Split the ring at the vertex
    # farthest from the start and simplify each arc as an open polyline.
    pts = proj[:-1] if len(proj) > 1 and proj[0] == proj[-1] else proj[:]
    if len(pts) <= 4:
        return pts
    x0, y0 = pts[0]
    k = max(range(len(pts)), key=lambda i: (pts[i][0]-x0)**2 + (pts[i][1]-y0)**2)
    arc1 = pts[0:k+1]
    arc2 = pts[k:] + [pts[0]]
    return dp(arc1, tol)[:-1] + dp(arc2, tol)[:-1]

def ring_to_d(ring):
    proj = [project(lat, lon) for lon, lat in ring]
    # drop rings entirely off-plate (Svalbard, Jan Mayen, distant isles)
    if all(x < -60 or x > W+60 or y < -60 or y > H+60 for x, y in proj):
        return None
    proj = simplify_ring(proj, DP_TOL)
    if len(proj) < 3:
        return None
    pts = " ".join(f"{x:.1f} {y:.1f}" for x, y in proj)
    parts = pts.split(" ")
    coords = [f"{parts[i]} {parts[i+1]}" for i in range(0, len(parts), 2)]
    return "M" + coords[0] + "L" + "L".join(coords[1:]) + "Z"

def geom_rings(geom):
    if geom["type"] == "Polygon":
        return geom["coordinates"]
    out = []
    for poly in geom["coordinates"]:
        out.extend(poly)
    return out

def biggest_ring_centroid(geom):
    best, best_area = None, -1
    polys = [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"]
    for poly in polys:
        ring = poly[0]
        proj = [project(lat, lon) for lon, lat in ring]
        area = 0.0; cx = 0.0; cy = 0.0
        for i in range(len(proj)-1):
            x0, y0 = proj[i]; x1, y1 = proj[i+1]
            cr = x0*y1 - x1*y0; area += cr; cx += (x0+x1)*cr; cy += (y0+y1)*cr
        if abs(area) < 1e-6:
            continue
        area *= 0.5; cx /= (6*area); cy /= (6*area)
        if abs(area) > best_area:
            best_area = abs(area); best = (cx, cy)
    return best

src = sys.argv[1] if len(sys.argv) > 1 else None
if src and os.path.exists(src):
    data = json.load(open(src))
else:
    ctx = make_ssl_context()
    req = urllib.request.Request(NE_URL, headers={"User-Agent": "travel-geo"})
    data = json.load(urllib.request.urlopen(req, context=ctx, timeout=120))

feat = {f["properties"].get("ADMIN"): f["geometry"] for f in data["features"]
        if f["properties"].get("ADMIN") in COUNTRIES}

out_countries, out_labels = [], []
for name in COUNTRIES:
    geom = feat[name]
    ds = [d for d in (ring_to_d(r) for r in geom_rings(geom)) if d]
    out_countries.append((name, " ".join(ds)))
    c = biggest_ring_centroid(geom)
    if c:
        out_labels.append((name, round(c[0], 1), round(c[1], 1)))

cities_xy = {k: project(lat, lon) for k, (lat, lon) in CITIES.items()}

# --- lakes ---
def poly_area(proj):
    a = 0.0
    for i in range(len(proj) - 1):
        a += proj[i][0] * proj[i + 1][1] - proj[i + 1][0] * proj[i][1]
    return abs(a) / 2

def load_geojson(local_arg_index, url):
    p = sys.argv[local_arg_index] if len(sys.argv) > local_arg_index else None
    if p and os.path.exists(p):
        return json.load(open(p))
    ctx = make_ssl_context()
    req = urllib.request.Request(url, headers={"User-Agent": "travel-geo"})
    return json.load(urllib.request.urlopen(req, context=ctx, timeout=120))

lakes_data = load_geojson(2, NE_LAKES_URL)
lake_paths = []
for f in lakes_data["features"]:
    g = f["geometry"]
    polys = [g["coordinates"]] if g["type"] == "Polygon" else g["coordinates"]
    for poly in polys:
        ring = poly[0]
        proj = [project(lat, lon) for lon, lat in ring]
        if all(x < -40 or x > W + 40 or y < -40 or y > H + 40 for x, y in proj):
            continue
        if poly_area(proj) < LAKE_MIN_AREA:
            continue
        sp = simplify_ring(proj, 0.5)
        if len(sp) < 3:
            continue
        coords = [f"{x:.1f} {y:.1f}" for x, y in sp]
        lake_paths.append("M" + coords[0] + "L" + "L".join(coords[1:]) + "Z")

# Graticule: meridians every 5deg lon, parallels every 2deg lat, projected.
grat = []
for lon in range(5, 31, 5):
    pts = [project(LAT0 + (LAT1 - LAT0) * t / 60, lon) for t in range(61)]
    grat.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts))
for lat in range(54, 65, 2):
    pts = [project(lat, LON0 + (LON1 - LON0) * t / 60) for t in range(61)]
    grat.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts))

def fmt_coord(lat, lon):
    ns = 'N' if lat >= 0 else 'S'
    ew = 'E' if lon >= 0 else 'W'
    return f"{abs(lat):.1f}°{ns} {abs(lon):.1f}°{ew}"
city_coords = {k: fmt_coord(lat, lon) for k, (lat, lon) in CITIES.items()}

# --- write TS module ---
lines = []
lines.append("// AUTO-GENERATED by scripts/build-travel-geo.py — do not edit by hand.")
lines.append("// Accurate Natural Earth (public domain) boundaries, Lambert conformal")
lines.append("// conic projection. Baked at build time: zero runtime deps or requests.")
km_per_px = (maxx - minx) / (W - 2*MARGIN) * 6371.0
lines.append(f"export const VIEW = {{ w: {W:.0f}, h: {H:.0f} }};")
lines.append(f"export const KM_PER_PX = {km_per_px:.3f};")
lines.append("export const COUNTRIES: { name: string; d: string }[] = [")
for name, d in out_countries:
    lines.append(f"  {{ name: {json.dumps(name)}, d: {json.dumps(d)} }},")
lines.append("];")
lines.append("export const COUNTRY_LABELS: { name: string; x: number; y: number }[] = [")
for name, x, y in out_labels:
    lines.append(f"  {{ name: {json.dumps(name)}, x: {x}, y: {y} }},")
lines.append("];")
lines.append("export const LAKES: string[] = [")
for d in lake_paths:
    lines.append(f"  {json.dumps(d)},")
lines.append("];")
lines.append("export const GRATICULE: string[] = [")
for g in grat:
    lines.append(f"  {json.dumps(g)},")
lines.append("];")
lines.append("export const CITY_COORDS: Record<string, string> = {")
for k, v in city_coords.items():
    lines.append(f"  {json.dumps(k)}: {json.dumps(v)},")
lines.append("};")
open("src/components/travel-geo.ts", "w").write("\n".join(lines) + "\n")

print(f"VIEW = {W:.0f} x {H:.0f}")
print("\nMarker x/y as PERCENT of viewBox (paste into places/*.md):")
for k, (x, y) in cities_xy.items():
    print(f"  {k:12s} x: {x/W*100:.2f}  y: {y/H*100:.2f}")
