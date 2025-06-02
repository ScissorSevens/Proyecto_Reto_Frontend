document.querySelector('#loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector('#emailInput');
  const passwordInput = document.querySelector('#passwordInput');

  if (!emailInput || !passwordInput) {
    console.error('No se encontraron los inputs de correo o contraseña.');
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('/.netlify/functions/loginUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error || 'Error desconocido al iniciar sesión');
      return;
    }

    const result = await response.json();

    // Guardar la información del usuario en la sesión
    sessionStorage.setItem('user', JSON.stringify(result.user));
    sessionStorage.setItem('userType', result.userType);

    alert(`Bienvenido, ${result.user.nombre}`);
    // Redirigir al usuario a otra página
    window.location.href = '/index.html'; // Cambia esto a la URL de tu página principal
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error al iniciar sesión. Inténtalo de nuevo.');
  }
});