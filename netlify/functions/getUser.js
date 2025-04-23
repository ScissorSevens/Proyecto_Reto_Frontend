const admin = require('./firebaseAdmin');

exports.handler = async (event, context) => {
  try {
    console.log('Iniciando función getUser...');
    const userId = event.queryStringParameters.id;
    console.log('ID del usuario recibido:', userId);

    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    console.log('Resultado de Firestore:', userDoc.exists ? userDoc.data() : 'No encontrado');

    if (!userDoc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Usuario no encontrado' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(userDoc.data()),
    };
  } catch (error) {
    console.error('Error en la función getUser:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener el usuario', details: error.message }),
    };
  }
};