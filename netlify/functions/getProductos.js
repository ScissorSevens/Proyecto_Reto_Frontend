const admin = require('./firebaseAdmin'); // Importa la configuración de firebaseAdmin.js

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    // Obtén la colección de productos desde Firestore
    const productosSnapshot = await db.collection('productos').get();

    // Mapea los documentos a un array de objetos
    const productos = productosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ productos }),
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener productos' }),
    };
  }
};