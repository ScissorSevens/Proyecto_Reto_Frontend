import { mostrarMensaje } from './showmessages.js';

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector('input[placeholder="Email"]');
  const passwordInput = document.querySelector('input[placeholder="Password"]');

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('/.netlify/functions/loginUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      mostrarMensaje(`Bienvenido, ${result.user.nombre}`, 'success');
      sessionStorage.setItem('user', JSON.stringify(result.user));
      window.location.href = '/index.html';
    } else {
      mostrarMensaje(result.error, 'error');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    mostrarMensaje('Error al iniciar sesión. Inténtalo de nuevo.', 'error');
  }
});