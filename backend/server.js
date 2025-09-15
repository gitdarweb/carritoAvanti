const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const mercadopago = require('mercadopago');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins (puedes ajustar en .env)
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS || 'http://localhost:5500,https://gitdarweb.github.io').split(',');

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow tools like Postman / thunder
        if (FRONTEND_ORIGINS.indexOf('*') !== -1 || FRONTEND_ORIGINS.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS - origen no permitido: ' + origin));
    }
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, '../frontend/img')));
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

// ---------------------------
// PRODUCTOS (copiados tal cual de frontend/products.js con correcciones en rutas)
// ---------------------------
const productosPorMarca = {
    moroccanoil: [
        { nombre: "Hydration Shampoo 250ml", precio: 10, imagen: "/img/img-productos/moroccanoil/Hydration-Shampoo-250ml.webp" },
        { nombre: "Hydration Acondicionador 250ml", precio: 10, imagen: "/img/img-productos/moroccanoil/Hydration-Conditioner-250ml-.webp" },
        { nombre: "Hydration Mascara Intensa 250ml", precio: 10, imagen: "/img/img-productos/moroccanoil/Hydration-Máscara-Intensa-250m.webp" },
        { nombre: "Hydration Mascara Ultraligera 250ml", precio: 10, imagen: "/img/img-productos/moroccanoil/Hydration-Máscara-Ultraligera-250m.webp" },
        { nombre: "Curly Shampoo 250ml", precio: 10, imagen: "/img/img-productos/moroccanoil/SHAMPOO_CURLY.webp" },
        { nombre: "Curly Acondicionador 250ml", precio: 10, imagen: "/img/img-productos/moroccanoil/CONDITIONER_CURLY.webp" },
        { nombre: "Crema intensa para rizos 300ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Crema-intensa-para-rizos-300ml.webp" },
        { nombre: "Repair Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Repair-Shampoo-250ml.webp" },
        { nombre: "Repair Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Repair-Conditioner-250ml-.webp" },
        { nombre: "Repair Mascara 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Repair-Mascara-250ml.webp" },
        { nombre: "Frizz Control Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/SHAMPOO_FRIZZ-CONTROL_250mL_.webp" },
        { nombre: "Frizz Control Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/CONDITIONER_FRIZZ-CONTROL_250ml.webp" },
        { nombre: "Frizz Control Mascara 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/frizz-control-mascara-250ml.webp" },
        { nombre: "Frizz Control Loción suavizante 300ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Frizz-control-locion-suavizante-300ml.webp" },
        { nombre: "Frizz Control Spray 160ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Frizz-control-spray-160ml.webp" },
        { nombre: "Color Care Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Color-Care-Shampoo.webp" },
        { nombre: "Color Care Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Color-Care-Conditioner.webp" },
        { nombre: "Tratamiento de Argán Clásico 25ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Light-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Clásico 50ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Light-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Clásico 100ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Light-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Light 25ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Clásico-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Light 50ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Clásico-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Light 100ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Clásico-25-50-y-100ml.webp" },
        { nombre: "Bruma Perfumada", precio: 0, imagen: "/img/img-productos/moroccanoil/Bruma-Parfum.webp" }
    ],
    tigi: [
        { nombre: "Recovery Shampoo 400ml", precio: 10, imagen: "/img/img-productos/tigi/recovery-shampoo-jpg.jpg" },
        { nombre: "Recovery Acondicionador 400ml", precio: 10, imagen: "/img/img-productos/tigi/recovery-acondicionador.webp" },
        { nombre: "Resurrection Shampoo 400ml", precio: 10, imagen: "/img/img-productos/tigi/resurrection-shampoo.webp" },
        { nombre: "Resurrection Acondicionador 400ml", precio: 10, imagen: "/img/img-productos/tigi/resurrection-acondicionador.webp" },
        { nombre: "Colour Goddess Shampoo 400ml", precio: 0, imagen: "/img/img-productos/tigi/goddess-shampoo.webp" },
        { nombre: "Colour Goddess Acondicionador 400ml", precio: 0, imagen: "/img/img-productos/tigi/goddess-acondicionador.webp" },
        { nombre: "After Party 100ml", precio: 0, imagen: "/img/img-productos/tigi/afterparty.webp" },
        { nombre: "Foxy Curls 200ml", precio: 0, imagen: "/img/img-productos/tigi/foxycurls.webp" },
        { nombre: "Amplifier 113ml", precio: 0, imagen: "/img/img-productos/tigi/amplifier.webp" },
        { nombre: "Small Talk 240ml", precio: 0, imagen: "/img/img-productos/tigi/smalltalk.webp" }
    ],
    revlon: [
        { nombre: "Equave Lisslook - Serum 85ml", precio: 0, imagen: "/img/img-productos/revlon/equave-bifase.png" },
        { nombre: "Equave Bifase Hidratante", precio: 0, imagen: "/img/img-productos/revlon/equave-lisslook.png" },
        { nombre: "Unique One - 10 Beneficios 150ml", precio: 0, imagen: "/img/img-productos/revlon/uniqone.png" }
    ],
    olaplex: [
        { nombre: "Nro 0 155ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-0.jpg" },
        { nombre: "Nro 3 100ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-3.png" },
        { nombre: "Nro 4 250ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-4.png" },
        { nombre: "Nro 5 250ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-5.jpg" },
        { nombre: "Nro 6 100ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-6.jpg" },
        { nombre: "Nro 7 30ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-7.webp" },
        { nombre: "Nro 8 100ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-8.jpg" },
        { nombre: "Nro 9 90ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-9.jpg" },
        { nombre: "Nro 10 200ml", precio: 0, imagen: "/img/img-productos/olaplex/olaplex-10.png" }
    ],
    hairssime: [
        { nombre: "Nutrikeratina 225mg", precio: 0, imagen: "/img/img-productos/hairssime/nutrikeratina.webp" },
        { nombre: "Nutri Advance Serum 63ml", precio: 0, imagen: "/img/img-productos/hairssime/nutri-serum.webp" },
        { nombre: "Glow Brillo Spray 485ml", precio: 0, imagen: "/img/img-productos/hairssime/glow-spray.webp" }
    ],
    avantibox: [
        { nombre: "Avanti Box Set (4 piezas)", precio: 0, imagen: "/img/img-productos/avantibox/AVANTI-BOX.png" },
        { nombre: "Funda de Almohada", precio: 0, imagen: "/img/img-productos/avantibox/fundas.png" },
        { nombre: "Scrunchies", precio: 0, imagen: "/img/img-productos/avantibox/scrunchie.png" },
        { nombre: "Vincha", precio: 0, imagen: "/img/img-productos/avantibox/vincha.png" },
        { nombre: "Cofia", precio: 0, imagen: "/img/img-productos/avantibox/cofia.png" }
    ],
    karseell: [
        { nombre: "Máscara 500ml", precio: 0, imagen: "/img/img-productos/karseell/karseell-1024x1024.png" }
    ],
    cepillos: [
        { nombre: "Cepillo Eurostil", precio: 0, imagen: "/img/img-productos/cepillos/IMG_5230.webp" },
        { nombre: "Masajeador", precio: 0, imagen: "/img/img-productos/cepillos/IMG_5235.webp" }
    ]
};

const products = {
    shampoos: [
        { nombre: "Hydration Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Hydration-Shampoo-250ml.webp" },
        { nombre: "Curly Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/SHAMPOO_CURLY.webp" },
        { nombre: "Repair Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Repair-Shampoo-250ml.webp" },
        { nombre: "Frizz Control Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/SHAMPOO_FRIZZ-CONTROL_250mL_.webp" },
        { nombre: "Color Care Shampoo 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Color-Care-Shampoo.webp" },
        { nombre: "Recovery Shampoo 400ml", precio: 0, imagen: "/img/img-productos/tigi/recovery-shampoo-jpg.jpg" },
        { nombre: "Resurrection Shampoo 400ml", precio: 0, imagen: "/img/img-productos/tigi/resurrection-shampoo.webp" },
        { nombre: "Colour Goddess Shampoo 400ml", precio: 0, imagen: "/img/img-productos/tigi/goddess-shampoo.webp" }
    ],
    acondicionadores: [
        { nombre: "Hydration Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Hydration-Conditioner-250ml-.webp" },
        { nombre: "Curly Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/CONDITIONER_CURLY.webp" },
        { nombre: "Repair Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Repair-Conditioner-250ml-.webp" },
        { nombre: "Frizz Control Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/CONDITIONER_FRIZZ-CONTROL_250ml.webp" },
        { nombre: "Color Care Acondicionador 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Color-Care-Conditioner.webp" },
        { nombre: "Recovery Acondicionador 400ml", precio: 0, imagen: "/img/img-productos/tigi/recovery-acondicionador.webp" },
        { nombre: "Resurrección Acondicionador 400ml", precio: 0, imagen: "/img/img-productos/tigi/resurrection-acondicionador.webp" },
        { nombre: "Colour Goddess Acondicionador 400ml", precio: 0, imagen: "/img/img-productos/tigi/goddess-acondicionador.webp" }
    ],
    mascaras: [
        { nombre: "Hydration Máscara Intensa 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Hydration-Máscara-Intensa-250m.webp" },
        { nombre: "Hydration Máscara Ultraligera 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Hydration-Máscara-Ultraligera-250m.webp" },
        { nombre: "Repair Máscara 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Repair-Mascara-250ml.webp" },
        { nombre: "Frizz Control Máscara 250ml", precio: 0, imagen: "/img/img-productos/moroccanoil/frizz-control-mascara-250ml.webp" }
    ],
    serums: [
        { nombre: "Equave Liss Look Serum 85ml", precio: 0, imagen: "/img/img-productos/revlon/equave-bifase.png" },
        { nombre: "Nutri Advance Serum 63ml", precio: 0, imagen: "/img/img-productos/hairssime/nutri-serum.webp" },
        { nombre: "Tratamiento de Argán Clásico 25ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Light-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Clásico 50ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Light-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Clásico 100ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Light-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Light 25ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Clásico-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Light 50ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Clásico-25-50-y-100ml.webp" },
        { nombre: "Tratamiento de Argán Light 100ml", precio: 0, imagen: "/img/img-productos/moroccanoil/Tratamiento-Argan-Clásico-25-50-y-100ml.webp" }
    ]
};

// ---------------------------
// Endpoints Productos
// ---------------------------

// GET /api/brands
app.get('/api/brands', (req, res) => {
    try {
        res.json(productosPorMarca);
    } catch (err) {
        console.error('Error /api/brands', err);
        res.status(500).json({ error: 'Error obteniendo marcas' });
    }
});

// GET /api/categories
app.get('/api/categories', (req, res) => {
    try {
        res.json(products);
    } catch (err) {
        console.error('Error /api/categories', err);
        res.status(500).json({ error: 'Error obteniendo categorias' });
    }
});

// GET /api/products?brand=...&category=...&q=...
app.get('/api/products', (req, res) => {
    try {
        const { brand, category, q } = req.query;
        let list = [];

        if (brand) {
            if (!productosPorMarca[brand]) return res.status(404).json({ error: 'Marca no encontrada' });
            list = productosPorMarca[brand];
        } else if (category) {
            if (!products[category]) return res.status(404).json({ error: 'Categoria no encontrada' });
            list = products[category];
        } else {
            list = [];
            for (const b in productosPorMarca) list = list.concat(productosPorMarca[b]);
            for (const c in products) list = list.concat(products[c]);
            const seen = new Set();
            list = list.filter(p => {
                if (seen.has(p.nombre)) return false;
                seen.add(p.nombre);
                return true;
            });
        }

        if (q) {
            const ql = q.toLowerCase();
            list = list.filter(p => (p.nombre || '').toLowerCase().includes(ql));
        }

        res.json(list);
    } catch (err) {
        console.error('Error /api/products', err);
        res.status(500).json({ error: 'Error obteniendo productos' });
    }
});

// ---------------------------
// Endpoint de pago - acepta { carrito: [...] } o [...]
// ---------------------------
const mp = new mercadopago.MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

app.post('/create_preference', async (req, res) => {
    try {
        let carrito = [];
        if (Array.isArray(req.body)) {
            carrito = req.body;
        } else if (Array.isArray(req.body.carrito)) {
            carrito = req.body.carrito;
        } else if (Array.isArray(req.body.items)) {
            carrito = req.body.items;
        } else {
            carrito = [];
        }

        if (!carrito || carrito.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío o mal enviado' });
        }

        const items = carrito.map(it => ({
            title: String(it.nombre || it.title || 'Producto'),
            quantity: Number(it.cantidad || it.quantity) > 0 ? Number(it.cantidad || it.quantity) : 1,
            unit_price: Number(it.precio || it.unit_price) >= 0 ? Number(it.precio || it.unit_price) : 0,
        }));

        const total = items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
        console.log('🛒 Carrito recibido (server):', carrito);
        console.log('💰 Total calculado (server):', total);

        const preference = {
            items,
            back_urls: {
                success: 'https://gitdarweb.github.io/AvantiHairSalon/pago-exitoso.html',
                failure: 'https://gitdarweb.github.io/AvantiHairSalon/pago-fallido.html',
                pending: 'https://gitdarweb.github.io/AvantiHairSalon/pago-pendiente.html',
            },
            auto_return: 'approved',
        };

        const pref = new mercadopago.Preference(mp);
        const result = await pref.create({ body: preference });
        const prefData = result.body || result;

        res.json({
            id: prefData.id,
            init_point: prefData.init_point,
            sandbox_init_point: prefData.sandbox_init_point,
            total
        });
    } catch (err) {
        console.error('❌ Error en create_preference:', err);
        res.status(500).json({ error: 'Error al crear preferencia', detalle: err.message });
    }
});

// Health
app.get('/', (_req, res) => res.send('✅ Backend Avanti funcionando'));

// Start
app.listen(PORT, () => {
    console.log(`🚀 Backend Avanti seguro en http://localhost:${PORT}`);
    console.log(`Allowed origins: ${FRONTEND_ORIGINS.join(',')}`);
});
/**
 * Backend Avanti - compatible con frontend existente
 * - Endpoints:
 *    GET  /api/brands       -> devuelve productosPorMarca
 *    GET  /api/categories   -> devuelve products
 *    GET  /api/products     -> filtros: ?brand=moroccanoil | ?category=shampoos | ?q=texto
 *    POST /create_preference -> acepta { carrito: [...] } o [...] -> crea preferencia MP
 *
 * Requisitos: tener en backend/.env:
 *   MERCADOPAGO_ACCESS_TOKEN=TU_TOKEN
 *   FRONTEND_ORIGINS=http://localhost:5500,https://gitdarweb.github.io
 */