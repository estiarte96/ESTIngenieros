import os

base_dir = "/Users/josepmiquel/Documents/JestDesign/portfolio/promo/"
files = ["PF1.html", "PF2.html", "PF3.html", "PF4.html", "PF5.html"]

for filename in files:
    filepath = os.path.join(base_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace the email
        content = content.replace("info@estingenieros.com", "p.estiarte@gmail.com")
        # Replace the subtitle/tagline
        content = content.replace("Ingeniería y Automatización Industrial", "Diseño 3D")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filename}")

