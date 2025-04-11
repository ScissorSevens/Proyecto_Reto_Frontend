const { products } = require('./data'); // Importar los datos compartidos

exports.handler = async (event) => {
    if (event.httpMethod === 'PUT') {
        try {
            const data = JSON.parse(event.body);

            // Buscar el producto por ID
            const productIndex = products.findIndex((p) => p.id === data.id);
            if (productIndex === -1) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Producto no encontrado' }),
                };
            }

            // Actualizar los datos del producto
            if (data.product) products[productIndex].product = data.product;
            if (data.price) products[productIndex].price = data.price;
            if (data.quantity) products[productIndex].quantity = data.quantity;

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Producto actualizado exitosamente',
                    product: products[productIndex],
                }),
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