
const profile = document.querySelector('.profile__btn');
const dropdown = document.querySelector('.dropdown__wrapper');
profile.addEventListener('click', () => {
  dropdown.classList.remove('none');
  dropdown.classList.toggle('hide');
});

document.addEventListener('click', (e) => {
  const isclickInside = dropdown.contains(e.target);
  const isprofileclicked = profile.contains(e.target);
  if (!isclickInside && !isprofileclicked) {
    dropdown.classList.add('hide');
    dropdown.classList.add('dropdown__wrapper--fade-in');
  }
});

const profile__cart = document.querySelector('.shopping__cart__btn');
const dropdown__cart = document.querySelector('.dropdown__wrapper__cart');

// Mostrar/ocultar el carrito al hacer clic en el botón
profile__cart.addEventListener('click', (e) => {
  e.stopPropagation(); // Detener propagación para evitar conflictos
  dropdown__cart.classList.remove('none');
  dropdown__cart.classList.toggle('hide');
});

// Evitar que el carrito se cierre al hacer clic dentro de él
dropdown__cart.addEventListener('click', (e) => {
  e.stopPropagation(); // Detener propagación del evento
});

// Cerrar el carrito si se hace clic fuera de él
document.addEventListener('click', (e) => {
  const isclickInside = dropdown__cart.contains(e.target);
  const isprofileclicked = profile__cart.contains(e.target);
  if (!isclickInside && !isprofileclicked) {
    dropdown__cart.classList.add('hide');
    dropdown__cart.classList.add('dropdown__shoping__cart--fade-in');
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