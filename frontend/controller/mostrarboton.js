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

const manejarElementosAutenticacion = () => {
  // Verificar si hay usuario en sessionStorage
  const usuarioSesion = sessionStorage.getItem('user');

  // Buscar los enlaces de registro e inicio de sesión
  const enlaceRegistrarse = document.querySelector('a[href="registrarse.html"], a[href="/registrarse.html"]');
  const enlaceIngresar = document.querySelector('a[href="login.html"], a[href="/login.html"]');

  if (usuarioSesion) {
    // Usuario logueado - ocultar enlaces de registro y login SIN cambiar estilos
    if (enlaceRegistrarse) {
      const liRegistro = enlaceRegistrarse.closest('li');
      if (liRegistro) {
        liRegistro.style.display = 'none';
      } else {
        enlaceRegistrarse.style.display = 'none';
      }
    }

    if (enlaceIngresar) {
      const liLogin = enlaceIngresar.closest('li');
      if (liLogin) {
        liLogin.style.display = 'none';
      } else {
        enlaceIngresar.style.display = 'none';
      }
    }

    console.log('Usuario logueado - Enlaces de auth ocultos');
  } else {
    // Usuario no logueado - mostrar enlaces MANTENIENDO estilos originales
    if (enlaceRegistrarse) {
      const liRegistro = enlaceRegistrarse.closest('li');
      if (liRegistro) {
        // Usar display inicial o vacío para mantener CSS original
        liRegistro.style.display = '';
      } else {
        enlaceRegistrarse.style.display = '';
      }
    }

    if (enlaceIngresar) {
      const liLogin = enlaceIngresar.closest('li');
      if (liLogin) {
        // Usar display inicial o vacío para mantener CSS original
        liLogin.style.display = '';
      } else {
        enlaceIngresar.style.display = '';
      }
    }

    console.log('Usuario no logueado - Enlaces de auth visibles con estilos originales');
  }
};

// Ejecutar la función cuando se carga la página
document.addEventListener('DOMContentLoaded', manejarElementosAutenticacion);

// También ejecutar cuando cambie el sessionStorage (por si el usuario se loguea/desloguea)
window.addEventListener('storage', manejarElementosAutenticacion);

// Función para llamar cuando el usuario se loguee o desloguee desde tu código
window.actualizarEstadoAutenticacion = manejarElementosAutenticacion;

// Observar cambios en sessionStorage manualmente (para mismo tab)
const originalSetItem = sessionStorage.setItem;
const originalRemoveItem = sessionStorage.removeItem;

sessionStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  if (key === 'user' || key === 'usuario') {
    manejarElementosAutenticacion();
  }
};

sessionStorage.removeItem = function(key) {
  originalRemoveItem.apply(this, arguments);
  if (key === 'user' || key === 'usuario') {
    manejarElementosAutenticacion();
  }
};