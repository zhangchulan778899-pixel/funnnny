from pathlib import Path
import hashlib
import json
import re
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'public/portfolio-book'
manifest = json.loads((root / 'assets/source-manifest.json').read_text(encoding='utf-8'))
html = (root / 'index.html').read_text(encoding='utf-8')
refs = re.findall(r'src="(assets/photos/[^"]+)"', html)
assert len(refs) == len(manifest['pages']) == 33
assert refs == ['assets/photos/' + page['file'] for page in manifest['pages']]
assert refs == sorted(refs)
for page, ref in zip(manifest['pages'], refs):
    assert hashlib.sha256((root / ref).read_bytes()).hexdigest() == page['sha256']
    assert Image.open(root / ref).size == (1600, 1132)
assert 400 / 283 == 1600 / 1132
source = Path(r'D:\作品集\西安建筑科技大学-funnnny作品集.pdf')
assert hashlib.sha256(source.read_bytes()).hexdigest() == manifest['sourceSha256']
assert Image.open(root / refs[0]).getpixel((0, 0)) == (255, 255, 255)
assert '.book-page, .cover, .back-cover { background: #fff;' in html
assert html.count('<article ') == 34
print('PASS: 33 source pages, order, asset hashes, unchanged PDF, exact landscape ratio, matching covers.')
print('Page assets MB:', round(sum((root / ref).stat().st_size for ref in refs) / 1e6, 2))
