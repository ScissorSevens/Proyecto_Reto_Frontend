exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);

        // Simula guardar el producto
        const newProduct = {
            id: Date.now(),
            product: data.product,
            price: data.price,
            quantity: data.quantity,
        };

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Producto creado exitosamente',
                product: newProduct,
            }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido' }),
    };
};