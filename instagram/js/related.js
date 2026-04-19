const products = [
    { name: 'Soporte Monitor', url: 'SoporteMonitor/SoporteMonitor.html', img: 'SoporteMonitor/Images/1.jpg', cat: 'altres' },
    { name: 'Porta Lápices', url: 'PortaLapices/PortaLapices.html', img: 'PortaLapices/Images/21.png', cat: 'altres' },
    { name: 'Maneta Mercedes', url: 'ManetaMercedes/ManetaMercedes.html', img: 'ManetaMercedes/Images/1.webp', cat: 'coche' },
    { name: 'Gancho Ducato', url: 'PenjadorDucato/PenjadorDucato.html', img: 'PenjadorDucato/Images/1.webp', cat: 'coche' },
    { name: 'Etiquetas Camper', url: 'EtiquetasCamper/EtiquetasCamper.html', img: 'EtiquetasCamper/Images/1.webp', cat: 'altres' },
    { name: 'Bike Wall Mount', url: 'BikeWallMount/BikeWallMount.html', img: 'BikeWallMount/Images/1.png', cat: 'bici' },
    { name: 'Garmin Mount', url: 'GarminMount/GarminMount.html', img: 'GarminMount/Images/1.png', cat: 'bici' },
    { name: 'Suport Llinterna', url: 'Llinterna/Llinterna.html', img: 'Llinterna/Images/1.jpg', cat: 'bici' },
    { name: 'Porta Bidó', url: 'PortaBido/PortaBido.html', img: 'PortaBido/Images/1.png', cat: 'bici' },
    { name: 'Protector de Canvi', url: 'ProtectorCanvi/ProtectorCanvi.html', img: 'ProtectorCanvi/Images/1.png', cat: 'bici' }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.related-grid');
    if (!grid) return;

    // Obtener el nombre de la carpeta del producto actual
    const pathParts = window.location.pathname.split('/');
    const currentFolder = pathParts[pathParts.length - 2];

    // Encontrar el producto actual en la lista
    const currentProd = products.find(p => p.url.startsWith(currentFolder + '/'));

    // Filtrar los productos para no mostrar el actual
    let available = products.filter(p => !p.url.startsWith(currentFolder + '/'));

    // Ordenar: primero los de la misma categoría, luego el resto aleatorio
    available.sort((a, b) => {
        const aSameCat = currentProd && a.cat === currentProd.cat;
        const bSameCat = currentProd && b.cat === currentProd.cat;

        if (aSameCat && !bSameCat) return -1;
        if (!aSameCat && bSameCat) return 1;
        return 0.5 - Math.random();
    });

    // Seleccionar los 4 primeros
    const selected = available.slice(0, 4);

    // Generar el HTML
    grid.innerHTML = selected.map(p => `
        <a href="../${p.url}" class="related-card">
            <img src="../${p.img}" alt="${p.name}">
            <div class="related-card-info"><h4>${p.name}</h4></div>
        </a>
    `).join('');
});
