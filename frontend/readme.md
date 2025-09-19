Avanti Hair Salon

Demo en vivo: https://gitdarweb.github.io/AvantiHairSalon/

📖 Descripción del proyecto

Avanti Hair Salon es un sitio web de catálogo y tienda online de productos profesionales para el cuidado capilar. Esta versión corresponde a la última etapa de desarrollo, donde se implementaron mejoras de diseño y funcionalidades interactivo-dinámicas según el feedback de diseño recibido.
📂 Estructura del proyecto

AvantiHairSalon/
├── index.html              # Página principal
├── carrito.html            # Simulación de carrito y guía de compra
├── terminos.html           # Términos y condiciones
├── privacidad.html         # Política de privacidad
├── productos/              # Páginas de categorías y productos
│   ├── shampoos.html
│   ├── acondicionadores.html
│   └── ...
├── css/                    # Módulos CSS separados
│   ├── main.css
│   ├── productos.css
│   └── carrito.css
├── js/                     # Lógica JS modular
│   ├── main.js             # Menú, interacción general
│   ├── products.js         # Renderizado dinámico de productos
│   ├── cart.js             # Carrito (LocalStorage mock)
│   └── slider.js           # Carrusel de imágenes
├── fonts/                  # Tipografías personalizadas
├── img/                    # Imágenes y assets estáticos
└── .vscode/                # Configuración de editor (opcional)

🛠 Tecnologías utilizadas

HTML5

CSS3 (modular)

JavaScript (ES6+): módulos nativos

Font Awesome para iconografía

GitHub Pages para despliegue estático

🚀 Flujo de navegación

Home (index.html): visión general, marcas y categorías.

Catálogos (productos/*.html): páginas por marca y por tipo de producto.

Cómo Comprar (carrito.html): simulación de carrito y pasos para coordinar la compra por WhatsApp.

Nosotras (sección dentro de index.html): presentación de la marca.

Contacto (footer y sección dentro de index.html): teléfono, Instagram y formulario mock.

Términos y Privacidad (terminos.html, privacidad.html).

✅ Funcionalidades implementadas

Renderizado dinámico de listados de productos desde products.js.

Carrito de compras simulado con almacenamiento en LocalStorage (cart.js).

Menú hamburguesa responsive y cierre automático (main.js).

Carrusel manual de imágenes (slider.js).

Botón flotante de WhatsApp con acceso directo.

Animaciones de fade-in y hover states refinados.

Diseño responsivo en desktop, tablet y mobile.

Accesibilidad inicial: atributos alt, focus states en enlaces.

⚙️ Cómo ejecutar localmente

Clona el repositorio:

git clone https://github.com/gitdarweb/AvantiHairSalon.git

Abre index.html en tu navegador.

Para simular la navegación completa, usa un servidor local (opcional):

# Con Python 3
python -m http.server 8000

Accede a http://localhost:8000.
 git add .
 git commit -m "pruebas de diseño"
 git push

🔜 Próximos pasos

Ajustes finales de diseño tras la revisión de la diseñadora.

Integración de buscador y filtros (JS).

Conexión real de carrito con API o WhatsApp Business API.

Optimización SEO y performance (lazy-loading de imágenes).

📬 Contacto

Desarrollador: Dario Duarte (La Plata, Argentina)

WhatsApp: +54 9 221 3533461

Email: duartedario780@gmail.com

Preparado para la presentación final a la diseñadora de Avanti.<!---->