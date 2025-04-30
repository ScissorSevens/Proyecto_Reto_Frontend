document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/.netlify/functions/getUsers_Co_Ve');
    console.log('Función getUsers_Co_Ve llamada');
    const data = await response.json();

    const compradoresList = document.getElementById('buyers-tab');
    const vendedoresList = document.getElementById('sellers-tab');

    // Limpiar listas
    compradoresList.innerHTML = '';
    vendedoresList.innerHTML = '';

    // Control dinámico del estado vacío para compradores
    const emptyStateBuyers = document.querySelector('#buyers-tab .empty-state');
    if (emptyStateBuyers) {
      if (data.compradores.length === 0) {
        emptyStateBuyers.style.display = 'block';
      } else {
        emptyStateBuyers.style.display = 'none';
      }
    }

    // Control dinámico del estado vacío para vendedores
    const emptyStateSellers = document.querySelector('#sellers-tab .empty-state');
    if (emptyStateSellers) {
      if (data.vendedores.length === 0) {
        emptyStateSellers.style.display = 'block';
      } else {
        emptyStateSellers.style.display = 'none';
      }
    }

    // Mostrar compradores
    data.compradores.forEach(comprador => {
      const item = document.createElement('div');
      item.classList.add('notification-item', 'buyer');
      item.innerHTML = `
        <div class="notification-icon-wrapper">
          <i class="fas fa-user buyer-icon"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Nuevo Comprador</div>
          <div class="notification-info">${comprador.nombre} - ${comprador.correo}</div>
          <div class="notification-time">Estado: ${comprador.estado}</div>
        </div>
      `;
      compradoresList.appendChild(item);
    });

    // Mostrar vendedores
    data.vendedores.forEach(vendedor => {
      const item = document.createElement('div');
      item.classList.add('notification-item', 'seller');
      item.innerHTML = `
        <div class="notification-icon-wrapper">
          <i class="fas fa-store seller-icon"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Nuevo Vendedor</div>
          <div class="notification-info">${vendedor.nombre} - ${vendedor.correo}</div>
          <div class="notification-time">Estado: ${vendedor.estado}</div>
        </div>
      `;
      vendedoresList.appendChild(item);
    });
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
});