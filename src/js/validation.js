// Validación del formulario
document.getElementById('formRegistro').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/api/usuarios/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Registro exitoso!');
                localStorage.setItem('usuario', JSON.stringify(data));
                window.location.href = 'perfil.html';
            } else {
                throw new Error(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }
});