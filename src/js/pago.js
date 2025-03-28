// Configuración de Stripe (ejemplo)
const stripe = Stripe('tu_clave_publica');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

document.getElementById('formPago').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
    });

    if (error) {
        console.error(error);
        return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    try {
        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                usuarioId: usuario.id,
                productos: carrito,
                paymentMethodId: paymentMethod.id,
                total: calcularTotal(carrito)
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Pago exitoso!');
            localStorage.removeItem('carrito');
            window.location.href = `confirmacion.html?pedido=${data.pedidoId}`;
        } else {
            throw new Error(data.message || 'Error en el pago');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});