// Validación del formulario de búsqueda
document.getElementById('formBusqueda').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputBusqueda = document.getElementById('inputBusqueda');
    const termino = inputBusqueda.value.trim();
    
    // Validación
    if (termino.length < 3 || termino.length > 50) {
        inputBusqueda.classList.add('is-invalid');
        inputBusqueda.nextElementSibling.style.display = 'block';
        return;
    }
    
    // Si pasa la validación, ejecutar búsqueda
    ejecutarBusqueda(termino);
});

// Función para ejecutar la búsqueda (debes implementarla según tu lógica)
function ejecutarBusqueda(termino) {
    console.log('Buscando:', termino);
    // Aquí implementarías:
    // 1. Filtrado de productos
    // 2. Redirección a página de resultados
    // 3. O cualquier otra lógica de búsqueda
    
    // Ejemplo básico:
    const productos = document.querySelectorAll('.card');
    let resultados = 0;
    
    productos.forEach(producto => {
        const texto = producto.textContent.toLowerCase();
        if (texto.includes(termino.toLowerCase())) {
            producto.style.display = 'block';
            resultados++;
        } else {
            producto.style.display = 'none';
        }
    });
    
    // Feedback al usuario
    if (resultados === 0) {
        alert(`No se encontraron resultados para "${termino}"`);
    }
}

// Limpiar validación al escribir
document.getElementById('inputBusqueda').addEventListener('input', function() {
    this.classList.remove('is-invalid');
    this.nextElementSibling.style.display = 'none';
});

