const data = require('./data'); // Importar el objeto compartido

exports.handler = async (event) => {
    if (event.httpMethod === 'DELETE') {
        try {
            const productData = JSON.parse(event.body);

            // Filtrar la lista para eliminar el producto
            const initialLength = data.products.length;
            data.products = data.products.filter((p) => p.id !== productData.id);

            if (data.products.length === initialLength) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Producto no encontrado' }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Producto eliminado exitosamente' }),
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