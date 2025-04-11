const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const productData = JSON.parse(event.body);

            // Enviar los datos al formulario de Netlify
            const response = await fetch('https://api.netlify.com/api/v1/forms/YOUR_FORM_ID/submissions', {
                method: 'POST',
                headers: {
                    Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`, // Reemplaza con tu token de acceso personal
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