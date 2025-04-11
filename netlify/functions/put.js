const data = require('./data'); // Importar el objeto compartido

exports.handler = async (event) => {
    if (event.httpMethod === 'PUT') {
        try {
            const productData = JSON.parse(event.body);

            // Buscar el producto por ID
            const productIndex = data.products.findIndex((p) => p.id === productData.id);
            if (productIndex === -1) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Producto no encontrado' }),
                };
            }

            // Actualizar los datos del producto
            if (productData.product) data.products[productIndex].product = productData.product;
            if (productData.price) data.products[productIndex].price = productData.price;
            if (productData.quantity) data.products[productIndex].quantity = productData.quantity;

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Producto actualizado exitosamente',
                    product: data.products[productIndex],
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