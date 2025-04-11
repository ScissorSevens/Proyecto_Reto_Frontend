const fetch = require('node-fetch');

const handler = async (event) => {
    // Verificar si el método es PUT
    if (event.httpMethod !== 'PUT') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método no permitido' })
        };
    }

    try {
        const token = 'nfp_qPjNuJCqxvHJZa9sv85dj9Cpjt8WTYTb2a5d';
        const siteId = 'bb30cb29-65ff-4ce2-af08-03cc1d68b904';
        
        // Obtener los datos del producto a actualizar del cuerpo de la solicitud
        const requestBody = JSON.parse(event.body);
        const productId = requestBody.id;
        
        if (!productId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Se requiere un ID de producto' })
            };
        }

        // Extraer los datos actualizados
        const updatedData = {
            product: requestBody.product,
            price: parseFloat(requestBody.price),
            quantity: parseInt(requestBody.quantity)
        };

        // Obtener los formularios del sitio
        const formsResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!formsResponse.ok) {
            throw new Error(`Error al obtener formularios: ${formsResponse.statusText}`);
        }
        
        const forms = await formsResponse.json();
        
        // Buscar el formulario que usas para tu POST
        const form = forms.find(f => f.name === 'postForm');
        
        if (!form) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Formulario "postForm" no encontrado' })
            };
        }

        // Verificar si el producto existe
        const checkResponse = await fetch(`https://api.netlify.com/api/v1/submissions/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!checkResponse.ok) {
            if (checkResponse.status === 404) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `Producto con ID ${productId} no encontrado` })
                };
            }
            throw new Error(`Error al verificar el producto: ${checkResponse.statusText}`);
        }

        // Netlify no proporciona una API directa para actualizar submissions
        // Vamos a usar un enfoque alternativo: borrar el original y crear uno nuevo con el mismo ID
        
        // 1. Eliminar el envío del formulario original
        const deleteResponse = await fetch(`https://api.netlify.com/api/v1/submissions/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (!deleteResponse.ok) {
            throw new Error(`Error al actualizar el producto (fase de eliminación): ${deleteResponse.statusText}`);
        }
        
        // 2. Crear un nuevo envío con los datos actualizados
        const createResponse = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                form_id: form.id,
                form_name: form.name,
                data: updatedData
            })
        });
        
        if (!createResponse.ok) {
            throw new Error(`Error al actualizar el producto (fase de creación): ${createResponse.statusText}`);
        }
        
        const newSubmission = await createResponse.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: `Producto con ID ${productId} actualizado correctamente`,
                data: {
                    id: newSubmission.id,
                    data: updatedData
                }
            })
        };
    } catch (error) {
        console.error('Error en la función PUT:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno del servidor', error: error.message })
        };
    }
};

module.exports = { handler };