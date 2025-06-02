const admin = require('./firebaseAdmin');
const bcrypt = require('bcryptjs');

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método no permitido' }),
      };
    }

    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El correo y la contraseña son obligatorios' }),
      };
    }

    const db = admin.firestore();

    // Buscar en la colección 'usuarios'
    const userSnapshot = await db.collection('usuarios').where('email', '==', email).get();

    if (userSnapshot.empty) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Usuario no encontrado' }),
      };
    }

    const user = userSnapshot.docs[0].data();

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Contraseña incorrecta' }),
      };
    }

    // Retornar la información del usuario
    return {
      statusCode: 200,
      body: JSON.stringify({
        userType: user.userType,
        user: { nombre: user.name, email: user.email },
      }),
    };
  } catch (error) {
    console.error('Error en la función loginUser:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor', details: error.message }),
    };
  }
};