const fetch = require('node-fetch');

const handler = async () => {
    try {
        const token = 'nfp_qPjNuJCqxvHJZa9sv85dj9Cpjt8WTYTb2a5d';
        const siteId = 'bb30cb29-65ff-4ce2-af08-03cc1d68b904'; // ID del sitio que obtuvimos

        // Obtener los formularios del sitio
        const formsResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!formsResponse.ok) {
            throw new Error(`Error al obtener formularios: ${formsResponse.statusText}`);
        }
        
        const forms = await formsResponse.json();
        console.log('Formularios encontrados:', forms.map(f => `${f.name} (${f.id})`));
        
        // Buscar el formulario que usas para tu POST
        const form = forms.find(f => f.name === 'postForm');
        
        if (!form) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Formulario "postForm" no encontrado' })
            };
        }
        
        console.log(`Formulario encontrado: ${form.name} con ID: ${form.id}`);
        
        // Obtener los envíos de ese formulario
        const submissionsResponse = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!submissionsResponse.ok) {
            throw new Error(`Error al obtener envíos: ${submissionsResponse.statusText}`);
        }
        
        const submissions = await submissionsResponse.json();
        console.log(`Se encontraron ${submissions.length} envíos en el formulario`);
        
        // Transformar los datos para que coincidan con tu formato esperado
        const products = submissions.map(submission => ({
            id: submission.id,
            data: {
                product: submission.data.product || '',
                price: parseFloat(submission.data.price || 0),
                quantity: parseInt(submission.data.quantity || 0)
            }
        }));
        
        return {
            statusCode: 200,
            body: JSON.stringify(products)
        };
    } catch (error) {
        console.error('Error en la función GET:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno del servidor', error: error.message })
        };
    }
};

module.exports = { handler };