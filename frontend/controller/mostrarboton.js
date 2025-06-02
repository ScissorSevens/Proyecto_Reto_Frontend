document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay datos de usuario en localStorage
  const userData = sessionStorage.getItem('user');

  if (userData) {
    const user = JSON.parse(userData);

    // Mostrar el botón de perfil
    const profileBtn = document.querySelector('.profile__btn');
    console.log('Botón de perfil encontrado:', profileBtn); // Depuración
    profileBtn.style.display = 'block';

    // Actualizar la información del perfil
    const profileName = document.querySelector('#profileName');
    const profileEmail = document.querySelector('#profileEmail');

    profileName.textContent = user.nombre;
    profileEmail.textContent = user.email;

    // Mostrar el enlace de "Salir"
    const salirLink = document.querySelector('#salir');
    salirLink.style.display = 'block';

    // Agregar funcionalidad al botón "Salir"
    salirLink.addEventListener('click', () => {
      sessionStorage.removeItem("user"); // Eliminar la sesión
      alert('Has cerrado sesión.');
      window.location.href = "/index.html"; // Redirigir al login
    });
  }
});