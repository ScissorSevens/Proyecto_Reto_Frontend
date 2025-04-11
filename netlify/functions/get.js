const fetch = require('node-fetch');

exports.handler = async () => {
    try {
        // Obtén los datos del formulario desde la API de Netlify
        const response = await fetch('https://api.netlify.com/api/v1/forms', {
            headers: {
                Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`, // Reemplaza con tu token de acceso personal
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los datos del formulario: ${response.statusText}`);
        }

        const forms = await response.json();

        // Encuentra el formulario específico por su nombre (por ejemplo, "postForm")
        const form = forms.find((f) => f.name === 'postForm');
        if (!form) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Formulario no encontrado' }),
            };
        }

        // Obtén las entradas del formulario
        const entriesResponse = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
            headers: {
                Authorization: `nfp_TDtuh4A8hbXdUjFZCbVySq2QqK9j8sfZ451b`, // Reemplaza con tu token de acceso personal
            },
        });

        if (!entriesResponse.ok) {
            throw new Error(`Error al obtener las entradas del formulario: ${entriesResponse.statusText}`);
        }

        const entries = await entriesResponse.json();

        // Devuelve las entradas como respuesta
        return {
            statusCode: 200,
            body: JSON.stringify(entries),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
        };
    }
};