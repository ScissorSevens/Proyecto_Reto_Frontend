const fetch = require('node-fetch');
const token = 'nfp_vwE6PdB5sriuL4HvYo2SN6sQomp2urwj3cb0';
const handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const productData = JSON.parse(event.body);

            const response = await fetch('https://api.netlify.com/api/v1/forms/67f937b0ed19af0008534551/submissions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Reemplaza con tu token de acceso personal
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`Error al enviar los datos al formulario: ${response.statusText}`);
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Producto creado exitosamente' }),
            };
        } catch (error) {
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