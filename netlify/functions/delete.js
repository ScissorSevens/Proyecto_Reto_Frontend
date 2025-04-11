const { products } = require('./data'); // Importar los datos compartidos

exports.handler = async (event) => {
    if (event.httpMethod === 'DELETE') {
        try {
            const data = JSON.parse(event.body);

            // Filtrar la lista para eliminar el producto
            const initialLength = products.length;
            products = products.filter((p) => p.id !== data.id);

            if (products.length === initialLength) {
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