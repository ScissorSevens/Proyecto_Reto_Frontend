const { products } = require('./data'); 

exports.handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
};