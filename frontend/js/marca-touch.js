// js/marca-touch.js
document.addEventListener('DOMContentLoaded', () => {
    // Activar sólo en dispositivos táctiles / sin hover
    const isTouchDevice = window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches
        || 'ontouchstart' in window;

    if (!isTouchDevice) return;

    let lastActive = null;
    let removeTimeout = null;

    function activateBox(box) {
        if (!box) return;
        if (lastActive === box) return;
        if (lastActive) lastActive.classList.remove('touch-active');
        box.classList.add('touch-active');
        lastActive = box;
        if (removeTimeout) {
            clearTimeout(removeTimeout);
            removeTimeout = null;
        }
    }

    function deactivateLastSoon(delay = 200) {
        if (removeTimeout) clearTimeout(removeTimeout);
        removeTimeout = setTimeout(() => {
            if (lastActive) lastActive.classList.remove('touch-active');
            lastActive = null;
            removeTimeout = null;
        }, delay);
    }

    function handleTouch(e) {
        if (!e.touches || e.touches.length === 0) return;
        const t = e.touches[0];
        const el = document.elementFromPoint(t.clientX, t.clientY);
        const box = el ? el.closest('.marca-box') : null;
        if (box) {
            activateBox(box);
        } else {
            // Si el dedo está sobre otro elemento, quitar el último activo pronto
            deactivateLastSoon(120);
        }
    }

    // Mantener compatibilidad con scroll suave (no preventDefault) => listeners passive
    document.addEventListener('touchstart', handleTouch, { passive: true });
    document.addEventListener('touchmove', handleTouch, { passive: true });

    // Cuando termina el touch, limpiar el estado después de un pequeño delay
    document.addEventListener('touchend', () => deactivateLastSoon(220), { passive: true });
    document.addEventListener('touchcancel', () => deactivateLastSoon(100), { passive: true });

    // También limpiar si se produce scroll con mouse/touchpad (por si acaso)
    window.addEventListener('scroll', () => {
        if (lastActive) {
            // no inmediato para no cortar la experiencia si el usuario desliza muy corto
            deactivateLastSoon(120);
        }
    }, { passive: true });
});
