// Agrega este div después del input
<div id="sugerencias" class="dropdown-menu"></div>

// Y este código JavaScript
document.getElementById('inputBusqueda').addEventListener('input', async function() {
    const termino = this.value.trim();
    
    if (termino.length >= 2) {
        const sugerencias = await obtenerSugerencias(termino);
        mostrarSugerencias(sugerencias);
    } else {
        document.getElementById('sugerencias').style.display = 'none';
    }
});

async function obtenerSugerencias(termino) {
    // Aquí podrías hacer una llamada a tu backend
    // o filtrar una lista local de términos populares
    return ['iphone', 'laptop gamer', 'samsung galaxy'].filter(item => 
        item.includes(termino.toLowerCase())
    );
}

function mostrarSugerencias(sugerencias) {
    const contenedor = document.getElementById('sugerencias');
    contenedor.innerHTML = '';
    
    if (sugerencias.length > 0) {
        sugerencias.forEach(sugerencia => {
            const item = document.createElement('button');
            item.className = 'dropdown-item';
            item.textContent = sugerencia;
            item.addEventListener('click', () => {
                document.getElementById('inputBusqueda').value = sugerencia;
                ejecutarBusqueda(sugerencia);
                contenedor.style.display = 'none';
            });
            contenedor.appendChild(item);
        });
        
        contenedor.style.display = 'block';
    } else {
        contenedor.style.display = 'none';
    }
}