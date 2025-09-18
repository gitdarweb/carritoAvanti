// js/touch-hover.js
document.addEventListener('DOMContentLoaded', () => {
    // Activar sólo en dispositivos táctiles sin hover (más robusto)
    const isTouchDevice = (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches)
        || ('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches);

    if (!isTouchDevice) return;

    let lastActive = null;
    let removeTimeout = null;

    function activate(el) {
        if (!el) return;
        if (lastActive === el) return;
        if (lastActive) lastActive.classList.remove('touch-active');
        el.classList.add('touch-active');
        lastActive = el;
        if (removeTimeout) {
            clearTimeout(removeTimeout);
            removeTimeout = null;
        }
    }

    function scheduleDeactivate(delay = 150) {
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
        const node = document.elementFromPoint(t.clientX, t.clientY);
        // buscar elementos que queremos activar: .marca-box, .beneficio, .contact-icon
        const target = node ? node.closest('.marca-box, .beneficio, .contact-icon') : null;
        if (target) {
            activate(target);
        } else {
            scheduleDeactivate(100);
        }
    }

    // listeners pasivos para no bloquear scroll
    document.addEventListener('touchstart', handleTouch, { passive: true });
    document.addEventListener('touchmove', handleTouch, { passive: true });

    document.addEventListener('touchend', () => scheduleDeactivate(180), { passive: true });
    document.addEventListener('touchcancel', () => scheduleDeactivate(80), { passive: true });

    // Si el usuario hace un scroll general, limpiar el último activo tras un pequeño delay
    window.addEventListener('scroll', () => {
        if (lastActive) scheduleDeactivate(120);
    }, { passive: true });
});
