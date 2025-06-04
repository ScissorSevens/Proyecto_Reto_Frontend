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
     
      
      // Guardar usuario en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(result.user));
      
      // Verificar si es admin y redirigir según el tipo de usuario
      if (result.userType === 'admin') {
        // Es un administrador - redirigir al dashboard
        mostrarMensaje('Bienvenido Administrador', 'success');
        setTimeout(() => {
          window.location.href = '/dashboard.html'; // O la ruta de tu dashboard
        }, 1500);
      } else if (result.userType === 'user') {
        mostrarMensaje(`Bienvenido, ${result.user.nombre}`, 'success');
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 1500);
      }
      
      // Actualizar el estado de autenticación para ocultar enlaces
      if (window.actualizarEstadoAutenticacion) {
        window.actualizarEstadoAutenticacion();
      }
      
    } else {
      mostrarMensaje(result.error, 'error');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    mostrarMensaje('Error al iniciar sesión. Inténtalo de nuevo.', 'error');
  }
});