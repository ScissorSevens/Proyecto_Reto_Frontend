import fetch from 'node-fetch';

export const handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const productData = JSON.parse(event.body);

            const response = await fetch('https://api.netlify.com/api/v1/forms/YOUR_FORM_ID/submissions', {
                method: 'POST',
                headers: {
                    Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`,
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