// Detectar entorno (localhost o producción)
// frontend/js/fetchProducts.js
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const BACKEND_URL = isLocal ? 'http://localhost:3000' : 'https://carritoavanti.onrender.com';

export async function fetchProductsFromBackend() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/products`);
        if (!response.ok) throw new Error('Respuesta no OK del servidor');
        const data = await response.json();
        console.log('📦 Productos desde backend:', data);
        return data;
    } catch (error) {
        console.warn('⚠️ No se pudieron cargar productos del backend:', error);
        return []; // fallback → products.js
    }
}