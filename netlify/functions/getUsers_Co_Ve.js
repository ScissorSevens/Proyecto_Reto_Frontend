const admin = require('./firebaseAdmin');

exports.handler = async (event, context) => {
  try {
    console.log('Iniciando función getUsers...');

    const compradoresSnapshot = await admin.firestore().collection('compradores').get();
    const vendedoresSnapshot = await admin.firestore().collection('vendedores').get();

    const compradores = compradoresSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const vendedores = vendedoresSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ compradores, vendedores }),
    };
  } catch (error) {
    console.error('Error en la función getUsers:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los usuarios', details: error.message }),
    };
  }
};