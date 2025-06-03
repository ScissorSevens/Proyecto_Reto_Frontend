import { mostrarMensaje } from './showmessages.js';

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector('input[placeholder="Email"]');
  const passwordInput = document.querySelector('input[placeholder="Password"]');

  const email = emailInput.value;
  const password = passwordInput.value;

  console.log('Datos ingresados:', { email, password }); // Registro de depuración

  try {
    const response = await fetch('/.netlify/functions/loginUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    console.log('Respuesta del servidor:', result); // Registro de depuración

    if (response.ok) {
      console.log('Llamando a mostrarMensaje con éxito'); // Registro de depuración
      mostrarMensaje(`Bienvenido, ${result.user.nombre}`, 'success');
      sessionStorage.setItem('user', JSON.stringify(result.user));
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 3000);
    } else {
      console.log('Llamando a mostrarMensaje con error'); // Registro de depuración
      mostrarMensaje(result.error, 'error');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    mostrarMensaje('Error al iniciar sesión. Inténtalo de nuevo.', 'error');
  }
});