// frontend/js/renderProducts.js
import { fetchProductsFromBackend, BACKEND_URL } from './fetchProducts.js';
import { products, productosPorMarca } from './products.js';

// -------------------- utilidades --------------------
function obtenerRutaImagen(imagen) {
  if (!imagen || imagen === '') {
    return '/img/img-productos/placeholder.jpg';
  }
  // Usar BACKEND_URL para imágenes del backend
  return imagen.startsWith('/') ? `${BACKEND_URL}${imagen}` : `${BACKEND_URL}/img/img-productos/${imagen}`;
}

// -------------------- nueva función de carga --------------------
async function getListaProductos(tipo, valor) {
  try {
    // Intentar traer del backend
    let backendProducts = [];
    const response = await fetchProductsFromBackend(); // Usa /api/products
    if (!response.ok) throw new Error('Error en API products');
    backendProducts = await response.json();

    if (tipo === 'categoria') {
      backendProducts = backendProducts.filter(p => p.categoria === valor);
    } else if (tipo === 'marca') {
      backendProducts = backendProducts.filter(p => p.marca === valor);
    }

    if (backendProducts.length > 0) {
      return backendProducts;
    }
  } catch (error) {
    console.warn('Fallo el backend, usando products.js:', error);
  }

  // Fallback a products.js
  if (tipo === 'categoria') return products[valor] || [];
  if (tipo === 'marca') return productosPorMarca[valor] || [];
  return [];
}

// -------------------- renderizar --------------------
export async function renderizarProductosPor(tipo, valor) {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) {
    console.warn('⚠️ Elemento #contenedor-productos no encontrado');
    return;
  }

  contenedor.innerHTML = '';

  const lista = await getListaProductos(tipo, valor);

  if (lista.length === 0) {
    contenedor.innerHTML = `<p>No hay productos para ${tipo} "${valor}".</p>`;
    return;
  }

  const rutaPlaceholder = '/img/img-productos/placeholder.jpg';

  lista.forEach((producto) => {
    const { nombre, precio, imagen } = producto;
    const rutaImg = obtenerRutaImagen(imagen);

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-producto');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    const imgEl = document.createElement('img');
    imgEl.src = rutaImg;
    imgEl.alt = nombre;
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = rutaPlaceholder;
    };
    imgContainer.appendChild(imgEl);

    const info = document.createElement('div');
    info.classList.add('info-producto');
    info.innerHTML = `
      <h3>${nombre}</h3>
      <p>$${precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito('${nombre}', ${precio}, '${rutaImg}')">
        Agregar al carrito
      </button>
    `;

    tarjeta.appendChild(imgContainer);
    tarjeta.appendChild(info);
    contenedor.appendChild(tarjeta);
  });
}