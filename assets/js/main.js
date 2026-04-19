document.addEventListener("DOMContentLoaded", async () => {
    // 1. CARGA DINÁMICA DE COMPONENTES (Header/Footer)
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        let file = el.getAttribute('data-include');
        // Convertir rutas relativas en absolutas para evitar fallos en Vercel por trailing slashes
        file = file.replace(/\.\.\//g, '');
        if (!file.startsWith('/')) file = '/' + file;
        
        try {
            const res = await fetch(file);
            if (res.ok) {
                el.outerHTML = await res.text();
                // Si acabamos de cargar el header, activamos los links
                if (file.includes('header')) markActiveLink();
            }
        } catch (err) {
            console.error("Error cargando:", file, err);
        }
    }

    // 2. ANIMACIÓN REVEAL AL HACER SCROLL
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('in');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
});

// Función para marcar el link activo según la URL
function markActiveLink() {
    let currentPath = window.location.pathname;
    let cleanCurrent = currentPath.replace('/index.html', '/').replace('.html', '');

    document.querySelectorAll(".nav-link").forEach(link => {
        let href = link.getAttribute("href");
        if (!href) return;

        let cleanLink = href.replace('/index.html', '/').replace('.html', '');

        if (cleanLink === '/') {
            if (cleanCurrent === '/') {
                link.classList.add("active");
            }
        } else {
            if (cleanCurrent === cleanLink || cleanCurrent.startsWith(cleanLink)) {
                link.classList.add("active");
            }
        }
    });
}

// Limpiar .html e index.html de la barra de direcciones manteniendo parámetros
const cleanPath = (path) => {
    if (path.endsWith('/index.html')) return path.replace('/index.html', '/');
    if (path.endsWith('.html')) return path.replace('.html', '');
    return path;
};

const newPath = cleanPath(window.location.pathname);
// Solo reemplazamos si el path cambia, y CONSERVAMOS search y hash
if (newPath !== window.location.pathname) {
    window.history.replaceState(null, '', newPath + window.location.search + window.location.hash);
}