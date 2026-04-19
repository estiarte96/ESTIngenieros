import re
import os

base_dir = "/Users/josepmiquel/Documents/GitHub/ESTIngenieros/portfolio/promo/"
configs = {
    "PF1": {
        "img": "PF1.png",
        "alt": "Máquina de Corte",
        "qr": "https://estingenieros.com/portfolio/PF1/PF1.html",
        "text": "Automatizar el corte de fieltro técnico con alimentación por arrastre motorizado y cuchilla circular de alta precisión."
    },
    "PF2": {
        "img": "PF2.png",
        "alt": "Transportador Modular",
        "qr": "https://estingenieros.com/portfolio/PF2/PF2.html",
        "text": "Sincronizar el transporte con la línea principal mediante encoder y asegurar la adherencia de láminas con una turbina de vacío."
    },
    "PF3": {
        "img": "PF3.png",
        "alt": "Expansor de Mangas",
        "qr": "https://estingenieros.com/portfolio/PF3/PF3.html",
        "text": "Expandir cuellos de filtros mediante un mecanismo mecánico neumático para una inserción instantánea y concéntrica."
    },
    "PF4": {
        "img": "PF4.png",
        "alt": "Máquina de Soldadura",
        "qr": "https://estingenieros.com/portfolio/PF4/PF4.html",
        "text": "Automatizar la soldadura de tejidos técnicos cilíndricos sincronizando temperatura y tracción con control HMI avanzado."
    },
    "PF5": {
        "img": "PF5.png",
        "alt": "Cortadora Automática",
        "qr": "https://estingenieros.com/portfolio/PF5/PF5.html",
        "text": "Procesar rollos de cinta automatizando la tracción y el corte neumático para una repetibilidad milimétrica sin errores."
    }
}

for pf, data in configs.items():
    file_path = os.path.join(base_dir, f"{pf}.html")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_main_content = f'''<div class="main-content">
            <div class="half-page-image-container">
                <img src="{data['img']}" alt="{data['alt']}" class="half-page-image">
            </div>
            
            <div class="bottom-info-area">
                <div class="description-text">
                    <strong>Diseñado para:</strong>
                    {data['text']}
                </div>
                
                <div class="qr-area">
                    <div class="qr-code">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={data['qr']}" alt="QR">
                    </div>
                </div>
            </div>
        </div>'''

    # We use regex to replace everything from <div class="main-content"> to <footer class="footer">
    # Wait, <footer class="footer"> is outside <div class="main-content">. 
    # Let's replace the whole main-content block.
    # The block ends before <footer class="footer">
    pattern = re.compile(r'<div class="main-content">[\s\S]*?</div>\s*<footer class="footer">')
    new_content = pattern.sub(new_main_content + '\n\n        <footer class="footer">', content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Updated {pf}.html")

