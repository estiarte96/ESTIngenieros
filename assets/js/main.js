document.addEventListener("DOMContentLoaded", async () => {
    // 1. CARGA DINÁMICA DE COMPONENTES (Header/Footer)
    const scriptTag = document.querySelector('script[src*="assets/js/main.js"]');
    const siteRoot = scriptTag ? scriptTag.src.split('assets/js/main.js')[0] : '';

    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        let file = el.getAttribute('data-include');
        
        if (siteRoot) {
            // Resolvemos basándonos en el root real del sitio para entorno local y Vercel
            let cleanFile = file.replace(/\.\.\//g, '').replace(/^\//, '');
            file = siteRoot + cleanFile;
        } else {
            // Fallback
            file = file.replace(/\.\.\//g, '');
            if (!file.startsWith('/')) file = '/' + file;
        }
        
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

// 3. SISTEMA DE LIGHTBOX PARA GALERÍA
let currentImages = [];
let currentImgIndex = 0;

function createLightbox() {
    if (document.querySelector('.lightbox')) return;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close"><i class="fas fa-times"></i></span>
            <img src="" class="lightbox-img" id="lightboxImg">
            <div class="lightbox-nav">
                <button class="lightbox-btn" id="prevBtn"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-btn" id="nextBtn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Cerrar al hacer clic fuera
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('prevBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        changeImage(-1);
    });
    document.getElementById('nextBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        changeImage(1);
    });

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    });
}

function openLightbox(images, index) {
    createLightbox();
    currentImages = images;
    currentImgIndex = index;
    updateLightboxImage();
    
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function changeImage(step) {
    currentImgIndex = (currentImgIndex + step + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightboxImg');
    img.style.opacity = '0.5';
    img.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        img.src = currentImages[currentImgIndex];
        img.onload = () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };
    }, 100);
}

// Exponer globalmente para los onclick de las páginas PF
window.openLightbox = openLightbox;