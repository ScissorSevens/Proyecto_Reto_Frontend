const fetch = require('node-fetch');
const token = 'nfp_vwE6PdB5sriuL4HvYo2SN6sQomp2urwj3cb0';

const handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            console.log('Evento recibido:', event.body);

            const productData = JSON.parse(event.body);
            console.log('Datos del producto:', productData);

            // Reemplaza <FORM_ID> con el ID correcto del formulario desde el panel de Netlify
            ; // Asegúrate de reemplazar esto con el ID real del formulario
            const response = await fetch(`https://api.netlify.com/api/v1/forms/<FORM_ID>/submissions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData), // Enviamos los datos directamente
            });

            const responseText = await response.text();
            console.log('Respuesta de la API:', response.status, responseText);

            if (!response.ok) {
                throw new Error(`Error al enviar los datos al formulario: ${response.statusText}`);
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Producto creado exitosamente' }),
            };
        } catch (error) {
            console.error('Error en la función POST:', error.message);
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