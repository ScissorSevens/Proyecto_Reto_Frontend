exports.handler = async (event) => {
    if (event.httpMethod === 'DELETE') {
        const data = JSON.parse(event.body);

       
        const deletedProductId = data.id;

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Producto con ID ${deletedProductId} eliminado exitosamente`,
            }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido' }),
    };
};