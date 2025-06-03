const manejarElementosAutenticacion = () => {
  // Verificar si hay usuario en sessionStorage
  const usuarioSesion = sessionStorage.getItem('user');
  
  console.log('Verificando sesión de usuario:', usuarioSesion ? 'Usuario logueado' : 'Sin usuario');

  // Buscar los enlaces con múltiples variaciones de paths
  let enlaceRegistrarse = document.querySelector('a[href="registrarse.html"]') ||
                         document.querySelector('a[href="/registrarse.html"]') ||
                         document.querySelector('a[href="./registrarse.html"]') ||
                         document.querySelector('a[href="../registrarse.html"]');

  let enlaceIngresar = document.querySelector('a[href="login.html"]') ||
                      document.querySelector('a[href="/login.html"]') ||
                      document.querySelector('a[href="./login.html"]') ||
                      document.querySelector('a[href="../login.html"]');

  // Si no encuentra por href, buscar por texto contenido
  if (!enlaceRegistrarse) {
    const todosLosEnlaces = document.querySelectorAll('a');
    todosLosEnlaces.forEach(enlace => {
      const texto = enlace.textContent.trim().toLowerCase();
      if (texto.includes('registr') || texto.includes('registro')) {
        enlaceRegistrarse = enlace;
      }
    });
  }

  if (!enlaceIngresar) {
    const todosLosEnlaces = document.querySelectorAll('a');
    todosLosEnlaces.forEach(enlace => {
      const texto = enlace.textContent.trim().toLowerCase();
      if (texto.includes('ingresar') || texto.includes('login') || texto.includes('iniciar')) {
        enlaceIngresar = enlace;
      }
    });
  }

  console.log('Enlaces encontrados:', {
    registrarse: enlaceRegistrarse ? enlaceRegistrarse.href : 'No encontrado',
    ingresar: enlaceIngresar ? enlaceIngresar.href : 'No encontrado'
  });

  if (usuarioSesion) {
    // Usuario logueado - ocultar enlaces de registro y login
    if (enlaceRegistrarse) {
      const liRegistro = enlaceRegistrarse.closest('li');
      if (liRegistro) {
        liRegistro.style.display = 'none';
        console.log('Ocultando li de registro');
      } else {
        enlaceRegistrarse.style.display = 'none';
        console.log('Ocultando enlace de registro');
      }
    }

    if (enlaceIngresar) {
      const liLogin = enlaceIngresar.closest('li');
      if (liLogin) {
        liLogin.style.display = 'none';
        console.log('Ocultando li de login');
      } else {
        enlaceIngresar.style.display = 'none';
        console.log('Ocultando enlace de login');
      }
    }

    console.log('Usuario logueado - Enlaces de auth ocultos');
  } else {
    // Usuario no logueado - mostrar enlaces MANTENIENDO estilos originales
    if (enlaceRegistrarse) {
      const liRegistro = enlaceRegistrarse.closest('li');
      if (liRegistro) {
        liRegistro.style.display = '';
        console.log('Mostrando li de registro');
      } else {
        enlaceRegistrarse.style.display = '';
        console.log('Mostrando enlace de registro');
      }
    }

    if (enlaceIngresar) {
      const liLogin = enlaceIngresar.closest('li');
      if (liLogin) {
        liLogin.style.display = '';
        console.log('Mostrando li de login');
      } else {
        enlaceIngresar.style.display = '';
        console.log('Mostrando enlace de login');
      }
    }

    console.log('Usuario no logueado - Enlaces de auth visibles con estilos originales');
  }
};

// Función de inicialización más robusta
const inicializar = () => {
  console.log('Inicializando manejo de autenticación...');
  
  // Ejecutar inmediatamente
  manejarElementosAutenticacion();
  
  // Intentar de nuevo después de un delay por si los elementos se cargan tarde
  setTimeout(() => {
    console.log('Re-ejecutando después de 1 segundo...');
    manejarElementosAutenticacion();
  }, 1000);
  
  // Y una vez más después de 3 segundos
  setTimeout(() => {
    console.log('Re-ejecutando después de 3 segundos...');
    manejarElementosAutenticacion();
  }, 3000);
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  // El DOM ya está listo
  inicializar();
}

// También ejecutar cuando la página esté completamente cargada
window.addEventListener('load', () => {
  console.log('Página completamente cargada, verificando elementos...');
  manejarElementosAutenticacion();
});

// Ejecutar cuando cambie el sessionStorage (para otros tabs)
window.addEventListener('storage', (e) => {
  if (e.key === 'user' || e.key === 'usuario') {
    console.log('Cambio detectado en sessionStorage:', e.newValue);
    manejarElementosAutenticacion();
  }
});

// Función para llamar manualmente desde otros scripts
window.actualizarEstadoAutenticacion = manejarElementosAutenticacion;

// Observar cambios en sessionStorage manualmente (para el mismo tab)
const originalSetItem = sessionStorage.setItem;
const originalRemoveItem = sessionStorage.removeItem;
const originalClear = sessionStorage.clear;

sessionStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  if (key === 'user' || key === 'usuario') {
    console.log('SessionStorage setItem detectado:', key, value);
    setTimeout(manejarElementosAutenticacion, 100);
  }
};

sessionStorage.removeItem = function(key) {
  originalRemoveItem.apply(this, arguments);
  if (key === 'user' || key === 'usuario') {
    console.log('SessionStorage removeItem detectado:', key);
    setTimeout(manejarElementosAutenticacion, 100);
  }
};

sessionStorage.clear = function() {
  originalClear.apply(this, arguments);
  console.log('SessionStorage clear detectado');
  setTimeout(manejarElementosAutenticacion, 100);
};

// Función para debugging - puedes llamarla desde la consola
window.debugAuth = () => {
  console.log('=== DEBUG DE AUTENTICACIÓN ===');
  console.log('SessionStorage user:', sessionStorage.getItem('user'));
  console.log('LocalStorage user:', localStorage.getItem('user'));
  console.log('Todos los enlaces a:', document.querySelectorAll('a'));
  console.log('Enlaces con href que contiene "registr":', document.querySelectorAll('a[href*="registr"]'));
  console.log('Enlaces con href que contiene "login":', document.querySelectorAll('a[href*="login"]'));
  manejarElementosAutenticacion();
};

console.log('Script de ocultar_links.js cargado correctamente');