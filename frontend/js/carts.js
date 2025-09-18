// frontend/js/carts.js
import { BACKEND_URL } from './fetchProducts.js';

const SELLER_PUBLIC_KEY = 'APP_USR-df0f7030-960d-49de-bbf7-0e369e83f6cf';

let carrito = [];

export function agregarAlCarrito(nombre, precio, imagen) {
    const item = carrito.find(i => i.nombre === nombre);
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }
    actualizarContadorCarrito();
    renderCarrito();
}

export function renderCarrito() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) {
        console.warn('⚠️ Elemento #cart-items no encontrado');
        return;
    }
    cartItems.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <p>${item.nombre} (x${item.cantidad})</p>
            <p>$${item.precio * item.cantidad}</p>
            <button onclick="eliminarItem(${index})">❌</button>
        `;
        cartItems.appendChild(div);
        total += item.precio * item.cantidad;
    });

    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    }
}

export function vaciarCarrito() {
    carrito = [];
    actualizarContadorCarrito();
    renderCarrito();
}

export function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    renderCarrito();
}

export function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = totalItems;
    }
}

export async function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/create_preference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carrito })
        });

        const data = await response.json();

        if (data.id) {
            console.log('🟢 Preferencia creada:', data.id);
            window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}`;
        } else {
            alert('❌ Error creando la preferencia de pago.');
            console.error('Error:', data);
        }
    } catch (error) {
        console.error('Error en la conexión con el backend:', error);
        alert('Hubo un problema con la conexión al servidor.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
    actualizarContadorCarrito();
});