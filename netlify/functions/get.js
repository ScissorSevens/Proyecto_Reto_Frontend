const data = require('./data'); // Importar el objeto compartido

exports.handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(data.products),
    };
};