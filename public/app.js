const apiUrl = 'http://localhost:3000/api';
let authToken = null;

// Funcionalidad para el botón "Ver todos los productos"
document.getElementById('getProductsBtn').addEventListener('click', () => {
    fetch(`${apiUrl}/productos`)
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('products-container');
            container.innerHTML = products.map(p => `
                <div class="product-item">
                    <strong>${p.nombre}</strong> (ID: ${p._id})<br>
                    Existencias: ${p.existencias}<br>
                    Stock Mínimo: ${p.stock_minimo}
                </div>
            `).join('');
        })
        .catch(error => console.error('Error al obtener productos:', error));
});

// Funcionalidad para el formulario de login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            authToken = data.token;
            document.getElementById('auth-token').textContent = 'Sí, token obtenido.';
            document.getElementById('login-status').textContent = 'Inicio de sesión exitoso.';
        } else {
            document.getElementById('login-status').textContent = data.error || 'Error en el login.';
        }
    })
    .catch(error => console.error('Error de login:', error));
});

// Funcionalidad para registrar entrada de inventario
document.getElementById('entradaBtn').addEventListener('click', () => {
    const productId = document.getElementById('productId').value;
    const amount = parseInt(document.getElementById('amount').value);

    fetch(`${apiUrl}/inventario/entrada`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // <-- Clave para la autenticación
        },
        body: JSON.stringify({ producto_id: productId, cantidad: amount })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('inventory-status').textContent = data.message || data.error;
    })
    .catch(error => console.error('Error al registrar entrada:', error));
});

// Funcionalidad para registrar salida de inventario
document.getElementById('salidaBtn').addEventListener('click', () => {
    const productId = document.getElementById('productId').value;
    const amount = parseInt(document.getElementById('amount').value);

    fetch(`${apiUrl}/inventario/salida`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // <-- Clave para la autenticación
        },
        body: JSON.stringify({ producto_id: productId, cantidad: amount })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('inventory-status').textContent = data.message || data.error;
    })
    .catch(error => console.error('Error al registrar salida:', error));
});