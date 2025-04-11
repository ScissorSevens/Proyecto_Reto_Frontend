const fetch = require('node-fetch');
const token = 'nfp_vwE6PdB5sriuL4HvYo2SN6sQomp2urwj3cb0';

const handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            console.log('Evento recibido:', event.body); // Log para verificar los datos recibidos

            const productData = JSON.parse(event.body);
            console.log('Datos del producto:', productData); // Log para verificar los datos parseados

            const response = await fetch('https://api.netlify.com/api/v1/forms/67f96126bbed92000878ffff/submissions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            console.log('Respuesta de la API:', response.status, await response.text()); // Log para verificar la respuesta de la API

            if (!response.ok) {
                throw new Error(`Error al enviar los datos al formulario: ${response.statusText}`);
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Producto creado exitosamente' }),
            };
        } catch (error) {
            console.error('Error en la función POST:', error.message); // Log para errores
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido' }),
    };
};

module.exports = { handler };