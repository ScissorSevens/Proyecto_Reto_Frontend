exports.handler = async () => {
    
    const products = [
        { id: 1, product: 'Manzanas', price: 100, quantity: 10 },
        { id: 2, product: 'Peras', price: 200, quantity: 5 },
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
};