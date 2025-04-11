const fetch = require('node-fetch');

const handler = async (event) => {
    // Verificar si el método es DELETE
    if (event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método no permitido' })
        };
    }

    try {
        const token = 'nfp_qPjNuJCqxvHJZa9sv85dj9Cpjt8WTYTb2a5d';
        const siteId = 'bb30cb29-65ff-4ce2-af08-03cc1d68b904';
        
        // Obtener el ID del producto a eliminar del cuerpo de la solicitud
        const requestBody = JSON.parse(event.body);
        const productId = requestBody.id;
        
        if (!productId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Se requiere un ID de producto' })
            };
        }

        // Obtener los formularios del sitio
        const formsResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
            headers: {
                'Authorization': `Bearer ${token}`
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
        
        // Eliminar el envío del formulario
        const deleteResponse = await fetch(`https://api.netlify.com/api/v1/submissions/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!deleteResponse.ok) {
            // Si no se pudo eliminar, verificar si el producto existe
            const checkResponse = await fetch(`https://api.netlify.com/api/v1/submissions/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (checkResponse.status === 404) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `Producto con ID ${productId} no encontrado` })
                };
            }
            
            throw new Error(`Error al eliminar el producto: ${deleteResponse.statusText}`);
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Producto con ID ${productId} eliminado correctamente` })
        };
    } catch (error) {
        console.error('Error en la función DELETE:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno del servidor', error: error.message })
        };
    }
};

module.exports = { handler };