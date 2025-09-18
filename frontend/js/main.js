console.log("main.js cargado");

// ==== MENÚ HAMBURGUESA CON CIERRE AUTOMÁTICO ====
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".burger");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (hamburger && sidebar && overlay) {
        const toggleMenu = () => {
            // Mostrar/ocultar menú lateral
            sidebar.classList.toggle("active");
            // Mostrar/ocultar overlay
            overlay.classList.toggle("active");
            // Activar/desactivar animación de la hamburguesa
            hamburger.classList.toggle("active");
        };

        // Abrir/cerrar con clic en el icono
        hamburger.addEventListener("click", toggleMenu);
        // Cerrar al hacer clic en el overlay
        overlay.addEventListener("click", toggleMenu);
        // Cerrar al hacer clic en cualquier link
        sidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", toggleMenu);
        });
    }
});

// ==== FUNCIONES AL CARGAR DOM ====  
document.addEventListener("DOMContentLoaded", () => {
    // === Mostrar contador del carrito si existe ===
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    // === FADE-IN SCROLL ANIMATION ===
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
