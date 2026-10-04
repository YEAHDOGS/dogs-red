#!/usr/bin/env python3
"""Fresh complete mirror of the public www.wearedogs.net build into site/.
Recursively follows /assets/* references until closure, so code-split
chunks are included. Run from ~/workspace/builds/dogs-red-apex/."""
import os
import re
import sys
import urllib.request

UPSTREAM = "https://www.wearedogs.net"
SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")
ASSETS = os.path.join(SITE, "assets")
REF = re.compile(r'["\'(=](?:/assets/|\./)([A-Za-z0-9_.\-]+?\.(?:js|css|woff2?|png|svg|webp|json|lottie|mp4|webm|avif|mov))["\')\s;`]')
os.makedirs(ASSETS, exist_ok=True)

def fetch(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": "dogs-red-mirror/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    # refuse to save the 404 shim as an asset
    if b"__wad_redirect" in data and dest.endswith((".js", ".css")):
        print(f"  SKIP (404 shim): {url}")
        return None
    with open(dest, "wb") as f:
        f.write(data)
    print(f"  got {os.path.basename(dest)} ({len(data)} bytes)")
    return data

def refs_in(data):
    return {"/assets/" + m for m in REF.findall(data.decode("utf-8", "ignore"))}

print("== index.html")
index = fetch(UPSTREAM + "/", os.path.join(SITE, "index.html"))
if index is None:
    sys.exit("index fetch failed")

pending = refs_in(index)
done = set()
# static files referenced from HTML head that the regex may miss
for extra in ["/favicon.svg", "/favicon-16x16.png", "/favicon-32x32.png",
              "/apple-touch-icon.png", "/site.webmanifest", "/robots.txt"]:
    if extra.encode() in index:
        pending.add(extra)

while pending:
    ref = pending.pop()
    if ref in done:
        continue
    done.add(ref)
    name = ref.split("/")[-1]
    dest = os.path.join(ASSETS if ref.startswith("/assets/") else SITE, name)
    if os.path.exists(dest) and os.path.getsize(dest) > 0 and ref.startswith("/assets/"):
        # re-verify existing files still parse for refs
        with open(dest, "rb") as f:
            data = f.read()
        print(f"  have {name}")
    else:
        data = fetch(UPSTREAM + ref, dest)
        if data is None:
            continue
    if dest.endswith((".js", ".css")):
        for r in refs_in(data):
            if r not in done:
                pending.add(r)

print(f"\nDone. {len(done)} assets mirrored.")
