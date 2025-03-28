// Variables globales
let carrito = [];
let sidebarVisible = false; // Cambiado a false inicialmente

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Carrito link
    const carritoLink = document.getElementById('carrito-link');
    if (carritoLink) {
        carritoLink.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal();
        });
    }
    
    // Inicializar carrusel
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement);
    }
});


// Resto del código del carrito 
function agregarAlCarrito(nombre, precio, imagen = 'https://via.placeholder.com/50') {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    abrirModal();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCantidad(index, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(index);
        return;
    }
    
    carrito[index].cantidad = nuevaCantidad;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    
    if (!listaCarrito || !totalCarrito || !contadorCarrito) return;
    
    listaCarrito.innerHTML = '';
    
    let total = 0;
    let cantidadTotal = 0;
    
    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        cantidadTotal += producto.cantidad;
        
        const itemHTML = `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="item-info">
                    <div class="item-nombre">${producto.nombre}</div>
                    <div class="item-precio">$${producto.precio} c/u</div>
                </div>
                <div class="item-cantidad">
                    <button onclick="actualizarCantidad(${index}, ${producto.cantidad - 1})">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="actualizarCantidad(${index}, ${producto.cantidad + 1})">+</button>
                </div>
                <div class="item-subtotal">$${subtotal.toFixed(2)}</div>
                <button class="item-eliminar" onclick="eliminarDelCarrito(${index})">×</button>
            </div>
        `;
        
        listaCarrito.insertAdjacentHTML('beforeend', itemHTML);
    });
    
    totalCarrito.textContent = total.toFixed(2);
    contadorCarrito.textContent = cantidadTotal;
}

function abrirModal() {
    const modal = document.getElementById('modal-carrito');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function cerrarModal() {
    const modal = document.getElementById('modal-carrito');
    if (modal) {
        modal.style.display = 'none';
    }
}

function completarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    
    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    alert(`¡Compra completada!\nTotal: $${total.toFixed(2)}`);
    carrito = [];
    actualizarCarrito();
    cerrarModal();
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal-carrito');
    if (event.target === modal) {
        cerrarModal();
    }
};