const $ = document;
const contenedorProductos = $.querySelector("#product-gridc");
const carrito = []; // Array para almacenar los productos del carrito
const carritoContainer = $.querySelector(".dropdown__wrapper__cart"); // Contenedor del carrito

const renderCards = (array) => {
  contenedorProductos.innerHTML = "";
  array.forEach((item) => {
    const { id, nombre, precio, imagen_url, unidad } = item;
    contenedorProductos.innerHTML += `
      <div class="product-card" id=${id}>
        <div class="product-image">
          <img decoding="async" src="${imagen_url}" class="imagen1" alt="${nombre}">
        </div>
        <div class="product-title">${nombre}</div>
        <div class="product-price">$${precio} / ${unidad}</div>
        <div class="product-button">
          <button class="button-container" data-id=${id} data-nombre="${nombre}" data-precio="${precio}" data-imagen="${imagen_url}">Agregar al carrito</button>
        </div>
      </div>
    `;
  });

  // Agregar eventos a los botones
  const botonesAgregar = $.querySelectorAll(".button-container");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
};

const agregarAlCarrito = (e) => {
  const button = e.target;
  const id = button.dataset.id;
  const nombre = button.dataset.nombre;
  const precio = parseFloat(button.dataset.precio);
  const imagen = button.dataset.imagen;

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((producto) => producto.id === id);
  if (productoExistente) {
    productoExistente.cantidad += 1; // Incrementar la cantidad
  } else {
    carrito.push({ id, nombre, precio, imagen, cantidad: 1 }); // Agregar nuevo producto
  }

  // Mostrar un mensaje de confirmación
  mostrarMensaje(`${nombre} agregado al carrito`);
  
  renderCarrito(); // Actualizar la vista del carrito
};

// Función para mostrar mensaje temporal
const mostrarMensaje = (mensaje) => {
  const mensajeElement = document.createElement('div');
  mensajeElement.className = 'mensaje-temporal';
  mensajeElement.innerHTML = `
    <div class="mensaje-contenido">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 10L9 12L13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${mensaje}</span>
    </div>
  `;
  document.body.appendChild(mensajeElement);

  // Añadir clase para mostrar con animación
  setTimeout(() => mensajeElement.classList.add('mostrar'), 10);

  // Eliminar después de 3 segundos
  setTimeout(() => {
    mensajeElement.classList.remove('mostrar');
    setTimeout(() => mensajeElement.remove(), 300);
  }, 3000);
};

const renderCarrito = () => {
  if (!carritoContainer) return;
  
  // Si el carrito está vacío, mostrar mensaje
  if (carrito.length === 0) {
    carritoContainer.innerHTML = `
      <div class="empty-cart">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Tu carrito está vacío</p>
        <span class="continue-shopping">Continuar comprando</span>
      </div>
    `;
    return;
  }
  
  // Iniciar con el encabezado del carrito
  carritoContainer.innerHTML = `
    <h3 class="cart-header">Tu carrito</h3>
  `;

  // Renderizar cada producto
  carrito.forEach((producto) => {
    const { id, nombre, precio, imagen, cantidad } = producto;
    const subtotal = precio * cantidad;

    carritoContainer.innerHTML += `
      <div class="cart-item" id="cart-item-${id}">
        <div class="cart-item-image">
          <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="cart-item-details">
          <div class="product-name">${nombre}</div>
          <div class="product-quantity">Unidades: ${cantidad}</div>
          <div class="product-price">$${subtotal.toFixed(2)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-controls">
            <button class="decrease" data-id="${id}">-</button>
            <span class="quantity">${cantidad}</span>
            <button class="increase" data-id="${id}">+</button>
          </div>
          <button class="remove-button" data-id="${id}">Eliminar</button>
        </div>
      </div>
    `;
  });

  // Calcular el total
  const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

  // Agregar divisor y total
  carritoContainer.innerHTML += `
    <div class="cart-divider"></div>
    <div class="cart-total">
      <div class="cart-total-row">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-amount">$${total.toFixed(2)}</span>
      </div>
      <button   class="checkout-button">
        Finalizar Compra
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
  // Agregar eventos a los botones del carrito
  const botonesEliminar = carritoContainer.querySelectorAll(".remove-button");
  const botonesIncrementar = carritoContainer.querySelectorAll(".increase");
  const botonesDisminuir = carritoContainer.querySelectorAll(".decrease");
  const botonCheckout = carritoContainer.querySelector(".checkout-button");

  
  botonesEliminar.forEach((boton) => boton.addEventListener("click", eliminarDelCarrito));
  botonesIncrementar.forEach((boton) => boton.addEventListener("click", incrementarCantidad));
  botonesDisminuir.forEach((boton) => boton.addEventListener("click", disminuirCantidad));
  if (botonCheckout) {
    botonCheckout.addEventListener("click", procesarCompra);
  }
  
  // Actualizar contador de carrito si existe
  actualizarContadorCarrito();
};

const eliminarDelCarrito = (e) => {
  const id = e.target.dataset.id;
  const producto = carrito.find((item) => item.id === id);
  
  if (producto) {
    // Mostrar mensaje de eliminación
    mostrarMensaje(`${producto.nombre} eliminado del carrito`);
    
    // Eliminar del array
    const index = carrito.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      carrito.splice(index, 1);
      renderCarrito();
    }
  }
};

const incrementarCantidad = (e) => {
  const id = e.target.dataset.id;
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad += 1;
    renderCarrito();
  }
};

const disminuirCantidad = (e) => {
  const id = e.target.dataset.id;
  const producto = carrito.find((producto) => producto.id === id);
  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    renderCarrito();
  } else if (producto) {
    eliminarDelCarrito(e); // Si la cantidad es 1, eliminar del carrito
  }
};

const procesarCompra = () => {
  // Aquí iría la lógica para procesar la compra
  alert('Procesando tu compra...');
   localStorage.setItem("carrito", JSON.stringify(carrito));

  // Redirigir al formulario de pedidos
  window.location.href = "/formulario_pedidos";
};

// Actualizar contador en el icono del carrito
const actualizarContadorCarrito = () => {
  const contadorElement = $.querySelector('.cart-counter');
  const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  
  if (contadorElement) {
    contadorElement.textContent = totalItems;
    contadorElement.style.display = totalItems > 0 ? 'flex' : 'none';
  }
};

// Cargar productos
fetch("/.netlify/functions/getProductos")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    if (data && Array.isArray(data.productos)) {
      renderCards(data.productos);
    } else {
      throw new Error("La respuesta no contiene un array de productos");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    contenedorProductos.innerHTML = `
      <div class="error-message">
        Error al cargar los productos: ${error.message}
      </div>
    `;
  });

// Inicializar el carrito
renderCarrito();

// Agregar estilos para el mensaje temporal
const estilosMensaje = document.createElement('style');
estilosMensaje.innerHTML = `
  .mensaje-temporal {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    transform: translateX(120%);
    transition: transform 0.3s ease;
  }

  .mensaje-temporal.mostrar {
    transform: translateX(0);
  }

  .mensaje-contenido {
    background-color: var(--color-primary, #4d7c0f);
    color: white;
    padding: 12px 16px;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
  }

  .mensaje-contenido svg {
    margin-right: 8px;
  }
`;
document.head.appendChild(estilosMensaje);