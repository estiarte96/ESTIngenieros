import re

with open('portfolio/index.html', 'r') as f:
    content = f.read()

# Fix image src: src="promo/PF...webp" to src="/portfolio/promo/PF...webp"
content = re.sub(r'src="(promo/PF\d+\.webp)"', r'src="/portfolio/\1"', content)

# Fix hrefs to PF pages: href="PF1/PF1.html" to href="/portfolio/PF1/PF1"
content = re.sub(r'href="(PF\d+/PF\d+)\.html"', r'href="/portfolio/\1"', content)

# Fix contact link: href="../contacto.html" to href="/contacto"
content = re.sub(r'href="\.\./contacto\.html"', r'href="/contacto"', content)

# Fix global css and favicon and js
content = re.sub(r'href="\.\./assets/css/global\.css"', r'href="/assets/css/global.css"', content)
content = re.sub(r'href="\.\./assets/images/favicon\.webp"', r'href="/assets/images/favicon.webp"', content)
content = re.sub(r'src="\.\./assets/js/main\.js"', r'src="/assets/js/main.js"', content)
content = re.sub(r'data-include="\.\./header\.html"', r'data-include="/header.html"', content)
content = re.sub(r'data-include="\.\./footer\.html"', r'data-include="/footer.html"', content)

with open('portfolio/index.html', 'w') as f:
    f.write(content)

print("Fixed portfolio/index.html")
