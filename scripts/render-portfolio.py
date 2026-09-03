"""Render complete PDF pages, without cropping or changing their sequence."""
import hashlib
import json
from pathlib import Path
import sys
import pypdfium2 as pdfium
from PIL import Image

source = Path(sys.argv[1])
destination = Path(sys.argv[2])
destination.mkdir(parents=True, exist_ok=True)
source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
pdf = pdfium.PdfDocument(str(source))
records = []
for index in range(len(pdf)):
    page = pdf[index]
    width, height = page.get_size()
    bitmap = page.render(scale=1600 / max(width, height))
    image = bitmap.to_pil().convert('RGB').transpose(Image.Transpose.ROTATE_270)
    name = f'page-{index + 1:03d}.webp'
    image.save(destination / name, format='WEBP', lossless=True, method=6)
    records.append({'file': name, 'page': index + 1, 'pdfSize': [width, height],
                    'pixels': list(image.size),
                    'sha256': hashlib.sha256((destination / name).read_bytes()).hexdigest()})
    print(f'{name}: {image.size}', flush=True)
    bitmap.close()
    page.close()
pdf.close()
assert hashlib.sha256(source.read_bytes()).hexdigest() == source_hash
(destination.parent / 'source-manifest.json').write_text(json.dumps({
    'source': source.name, 'sourceSha256': source_hash, 'pages': records,
    'rendering': 'Complete pages, original order, clockwise 90 degrees as requested, 1600px long edge, lossless WebP'
}, ensure_ascii=False, indent=2), encoding='utf-8')
