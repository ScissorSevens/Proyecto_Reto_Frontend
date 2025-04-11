const { products } = require('./data'); // Importar los datos compartidos

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const data = JSON.parse(event.body);

            // Crear un nuevo producto
            const newProduct = {
                id: products.length + 1, // Generar un ID único
                product: data.product,
                price: data.price,
                quantity: data.quantity,
            };

            // Agregar el producto a la lista
            products.push(newProduct);

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