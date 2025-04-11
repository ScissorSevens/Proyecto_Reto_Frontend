exports.handler = async (event) => {
    if (event.httpMethod === 'PUT') {
        const data = JSON.parse(event.body);

       
        const updatedProduct = {
            id: data.id,
            product: data.product || 'Producto actualizado',
            price: data.price || 0,
            quantity: data.quantity || 0,
        };

        

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Producto actualizado exitosamente',
                product: updatedProduct,
            }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido' }),
    };
};