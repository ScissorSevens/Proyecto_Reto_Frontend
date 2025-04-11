const data = require('./data'); // Importar el objeto compartido

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const productData = JSON.parse(event.body);

            // Crear un nuevo producto
            const newProduct = {
                id: data.products.length + 1, // Generar un ID único
                product: productData.product,
                price: productData.price,
                quantity: productData.quantity,
            };

            // Agregar el producto al arreglo compartido
            data.products.push(newProduct);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Producto creado exitosamente',
                    product: newProduct,
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