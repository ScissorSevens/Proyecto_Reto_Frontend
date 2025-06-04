const admin = require('./firebaseAdmin');

exports.handler = async (event, context) => {
  try {
    console.log('Iniciando función getUsers...');

    // Buscar en la colección 'usuarios' y filtrar por userType
    const usuariosSnapshot = await admin.firestore().collection('usuarios').get();
    
    const compradores = [];
    const agronomos = [];

    // Filtrar usuarios por userType
    usuariosSnapshot.docs.forEach(doc => {
      const userData = { id: doc.id, ...doc.data() };
      
      if (userData.userType === 'comprador') {
        compradores.push(userData);
      } else if (userData.userType === 'agronomo') {
        agronomos.push(userData);
      }
    });

    console.log('Compradores encontrados:', compradores.length);
    console.log('Agronomos encontrados:', agronomos.length);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        compradores, 
        agronomos, // Cambio de 'vendedores' a 'agronomos'
        // Mantener vendedores para compatibilidad si es necesario
        vendedores: agronomos 
      }),
    };
  } catch (error) {
    console.error('Error en la función getUsers:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        error: 'Error al obtener los usuarios', 
        details: error.message 
      }),
    };
  }
};