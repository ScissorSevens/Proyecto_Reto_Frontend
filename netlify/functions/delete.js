export const handler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método no permitido' }),
        };
    }

    try {
        const { id } = JSON.parse(event.body);

        const response = await fetch(`https://api.netlify.com/api/v1/forms/67f96126bbed92000878ffff/submissions/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer nfp_qPjNuJCqxvHJZa9sv85dj9Cpjt8WTYTb2a5d`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la entrada: ${response.statusText}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Entrada eliminada exitosamente' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
        };
    }
};