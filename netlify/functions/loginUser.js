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
    let user = null;
    let userType = null;

    // Buscar en la colección 'usuarios'
    const userSnapshot = await db.collection('usuarios').where('email', '==', email).get();

    if (!userSnapshot.empty) {
      user = userSnapshot.docs[0].data();
      userType = 'user';
    } else {
      // Si no se encuentra en usuarios, buscar en la colección 'admin'
      const adminSnapshot = await db.collection('admin').where('email', '==', email).get();
      
      if (!adminSnapshot.empty) {
        user = adminSnapshot.docs[0].data();
        userType = 'admin';
      }
    }

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Usuario no encontrado' }),
      };
    }

    // Validar la contraseña según el tipo de usuario
    let isPasswordValid = false;
    
    if (userType === 'admin') {
      // Para admin: verificar si la contraseña está hasheada o es texto plano
      if (user.password.startsWith('$2')) {
        // La contraseña está hasheada con bcrypt
        isPasswordValid = await bcrypt.compare(password, user.password);
      } else {
        // La contraseña está en texto plano (comparación directa)
        isPasswordValid = password === user.password;
        
        // Opcional: hashear la contraseña para futuras actualizaciones
        console.log('ADVERTENCIA: Contraseña de admin no está hasheada');
      }
    } else {
      // Para usuarios normales: siempre usar bcrypt
      isPasswordValid = await bcrypt.compare(password, user.password);
    }

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
        userType: userType,
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