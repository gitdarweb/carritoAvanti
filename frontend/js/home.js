// home.js

document.addEventListener('DOMContentLoaded', () => {
    const spanStatus = document.getElementById('carrito-status');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (spanStatus) {
        if (carrito.length > 0) {
            const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            spanStatus.textContent = `(${totalItems} producto${totalItems > 1 ? 's' : ''} en carrito)`;
        } else {
            spanStatus.textContent = '(Carrito vacío)';
        }
    }
});
