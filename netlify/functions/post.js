const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.json');

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const productData = JSON.parse(event.body);

            // Leer los datos existentes
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            // Agregar el nuevo producto
            const newProduct = { id: data.length + 1, ...productData };
            data.push(newProduct);

            // Guardar los datos actualizados
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Producto creado exitosamente', product: newProduct }),
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