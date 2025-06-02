const admin = require('./firebaseAdmin');
const bcrypt = require('bcryptjs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, password, userType } = JSON.parse(event.body);

    if (!name || !email || !password || !userType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const db = admin.firestore();

    // Verificar si el correo ya existe en la colección 'usuarios'
    const usersSnapshot = await db.collection('usuarios').where('email', '==', email).get();

    if (!usersSnapshot.empty) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El correo ya está registrado en otra cuenta' }),
      };
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la colección 'usuarios'
    const newUser = {
      name,
      email,
      password: hashedPassword,
      userType, // Guardar el tipo de usuario
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('usuarios').add(newUser);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario registrado exitosamente' }),
    };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};