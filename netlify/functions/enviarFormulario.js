const nodemailer = require('nodemailer');

const EMAIL = "felipeb.pachon@gmail.com";
const PASSWORD = "kglx ldys wdjs fkft";

exports.handler = async (event) => {
  console.log('Función enviarFormulario iniciada');
  console.log('Método HTTP:', event.httpMethod);
  console.log('Body recibido:', event.body);

  // Manejar preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Solo permitir método POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Verificar que el body existe
    if (!event.body) {
      console.error('No se recibió body en la petición');
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'No se recibieron datos' }),
      };
    }

    const { nombres, apellidos, correo, direccion, tipoTarjeta, nombreTitular } = JSON.parse(event.body);

    console.log('Datos parseados:', { nombres, apellidos, correo, direccion, tipoTarjeta, nombreTitular });

    // Validar campos requeridos
    if (!nombres || !apellidos || !correo || !direccion || !tipoTarjeta || !nombreTitular) {
      console.error('Faltan campos requeridos');
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Faltan campos requeridos' }),
      };
    }

    console.log('Configurando transporter de nodemailer...');

    // Configurar transporter de nodemailer con las credenciales definidas
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    console.log('Transporter configurado, verificando conexión...');

    // Verificar la conexión
    await transporter.verify();
    console.log('Conexión SMTP verificada exitosamente');

    // Configurar el email
    const mailOptions = {
      from: EMAIL,
      to: correo,
      subject: 'Confirmación de Pago - Tu Compra',
      html: `
        <h2>¡Gracias por tu compra!</h2>
        <p>Hola ${nombres} ${apellidos},</p>
        <p>Tu pago ha sido procesado exitosamente.</p>
        
        <h3>Detalles de la compra:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${nombres} ${apellidos}</li>
          <li><strong>Email:</strong> ${correo}</li>
          <li><strong>Dirección:</strong> ${direccion}</li>
          <li><strong>Tipo de tarjeta:</strong> ${tipoTarjeta}</li>
          <li><strong>Titular:</strong> ${nombreTitular}</li>
        </ul>
        
        <p>Recibirás tu pedido en los próximos días hábiles.</p>
        <p>¡Gracias por confiar en nosotros!</p>
      `,
    };

    console.log('Enviando email...');

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente:', info.messageId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        message: 'Email enviado exitosamente',
        messageId: info.messageId 
      }),
    };
  } catch (error) {
    console.error('Error detallado en enviarFormulario:', error);
    console.error('Stack trace:', error.stack);
    
    // Manejo específico de errores de autenticación
    if (error.code === 'EAUTH') {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Error de autenticación de email. Verifica las credenciales.',
          details: 'Problema con las credenciales de Gmail'
        }),
      };
    }

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Error al enviar email', 
        details: error.message,
        code: error.code || 'UNKNOWN'
      }),
    };
  }
};