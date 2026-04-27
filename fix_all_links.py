import re
from pathlib import Path

# Fix blog pages
blog_dir = Path('blog')
for html_file in blog_dir.glob('*.html'):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # fix data-include="header.html"
    content = re.sub(r'data-include="header\.html"', r'data-include="/header.html"', content)
    content = re.sub(r'data-include="footer\.html"', r'data-include="/footer.html"', content)
    
    # fix contacto.html
    content = re.sub(r'href="contacto\.html\b', r'href="/contacto', content)
    # wait, might have ?...
    content = re.sub(r'href="\.\./contacto\.html\b', r'href="/contacto', content)
    
    with open(html_file, 'w') as f:
        f.write(content)

# Fix products
products_dir = Path('assets/products')
if products_dir.exists():
    for html_file in products_dir.rglob('*.html'):
        with open(html_file, 'r') as f:
            content = f.read()
        content = re.sub(r'href="/productos\.html"', r'href="/"', content)
        content = re.sub(r'href="/contacto\.html', r'href="/contacto', content)
        with open(html_file, 'w') as f:
            f.write(content)

# Fix instagram
instagram_dir = Path('instagram')
if instagram_dir.exists():
    for html_file in instagram_dir.rglob('*.html'):
        with open(html_file, 'r') as f:
            content = f.read()
        content = re.sub(r'href="/productos\.html"', r'href="/"', content)
        content = re.sub(r'href="/contacto\.html', r'href="/contacto', content)
        with open(html_file, 'w') as f:
            f.write(content)

print("Fixed links!")
