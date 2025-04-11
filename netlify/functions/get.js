const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.json');

exports.handler = async () => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
        };
    }
};