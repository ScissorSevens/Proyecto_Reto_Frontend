const { mostrarMensaje } = require('./showmessages.js');

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('input[placeholder="Nombre"]');
  const emailInput = document.querySelector('input[placeholder="Email"]');
  const passwordInput = document.querySelector('input[placeholder="Contraseña"]');
  const userTypeInput = document.querySelector('input[name="userType"]:checked');

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const userType = userTypeInput.value;

  try {
    const response = await fetch('/.netlify/functions/registerUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, userType }),
    });

    const result = await response.json();

    if (response.ok) {
      mostrarMensaje(`Registro exitoso. Bienvenido, ${name}`, 'success');
      localStorage.setItem('user', JSON.stringify({ name, email, userType }));
      window.location.href = '/index.html';
    } else {
      mostrarMensaje(result.error, 'error');
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    mostrarMensaje('Error al registrar usuario. Inténtalo de nuevo.', 'error');
  }
});