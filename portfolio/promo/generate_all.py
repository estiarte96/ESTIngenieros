import re
import os

base_dir = "/Users/josepmiquel/Documents/GitHub/ESTIngenieros/portfolio/promo/"
output_file = os.path.join(base_dir, "todas_promos.html")

html_head = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todas las Promos - EST Ingenieros</title>
    <link rel="stylesheet" href="promo.css">
    <style>
        @media print {
            .a4-page {
                page-break-after: always;
                break-after: page;
            }
            .a4-page:last-child {
                page-break-after: auto;
                break-after: auto;
            }
        }
    </style>
</head>
<body>
    <button class="btn-print no-print" onclick="window.print()">Imprimir Todas (PDF)</button>
'''
html_tail = '''
</body>
</html>
'''

content_accumulator = html_head

for i in range(1, 6):
    pf = f"PF{i}"
    file_path = os.path.join(base_dir, f"{pf}.html")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract everything from <div class="a4-page"> to the closing </div> of a4-page
    # The a4-page closing tag is right before </body>
    match = re.search(r'(<div class="a4-page">.*?)</body>', content, re.DOTALL)
    if match:
        a4_content = match.group(1).strip()
        content_accumulator += "\n" + a4_content + "\n"

content_accumulator += html_tail

with open(output_file, "w", encoding="utf-8") as f:
    f.write(content_accumulator)

print("Created todas_promos.html")
