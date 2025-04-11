import fetch from 'node-fetch';

export const handler = async (event) => {
    if (event.httpMethod === 'PUT') {
        try {
            const productData = JSON.parse(event.body);

            const entriesResponse = await fetch(`https://api.netlify.com/api/v1/forms/YOUR_FORM_ID/submissions`, {
                headers: {
                    Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`,
                },
            });

            if (!entriesResponse.ok) {
                throw new Error(`Error al obtener las entradas del formulario: ${entriesResponse.statusText}`);
            }

            const entries = await entriesResponse.json();

            const entry = entries.find((e) => e.data.id === productData.id);
            if (!entry) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Producto no encontrado' }),
                };
            }

            await fetch(`https://api.netlify.com/api/v1/submissions/${entry.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`,
                },
            });

            const createResponse = await fetch(`https://api.netlify.com/api/v1/forms/YOUR_FORM_ID/submissions`, {
                method: 'POST',
                headers: {
                    Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!createResponse.ok) {
                throw new Error(`Error al crear la entrada actualizada: ${createResponse.statusText}`);
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Producto actualizado exitosamente' }),
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