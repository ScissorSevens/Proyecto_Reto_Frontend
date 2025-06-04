document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Cargando usuarios del dashboard...');
    const response = await fetch('/.netlify/functions/getUsers_Co_Ve');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Datos recibidos:', data);

    // Referencias a las listas
    const allList = document.getElementById('all-tab');
    const compradoresList = document.getElementById('buyers-tab');
    const agronomosList = document.getElementById('sellers-tab');

    // Limpiar listas
    allList.innerHTML = '';
    compradoresList.innerHTML = '';
    agronomosList.innerHTML = '';

    // Función para crear elemento de notificación
    const createNotificationItem = (usuario, tipo) => {
      const item = document.createElement('div');
      item.classList.add('notification-item', tipo.toLowerCase());
      
      const icon = tipo === 'Agronomo' ? 'fas fa-seedling' : 'fas fa-user';
      const iconClass = tipo === 'Agronomo' ? 'seller-icon' : 'buyer-icon';
      
      item.innerHTML = `
        <div class="notification-icon-wrapper">
          <i class="${icon} ${iconClass}"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Nuevo ${tipo}</div>
          <div class="notification-info">${usuario.name || usuario.nombre} - ${usuario.email}</div>
          <div class="notification-time">UserType: ${usuario.userType}</div>

        </div>
        <div class="notification-actions">
          <button class="btn btn-approve" onclick="approveUser('${usuario.id}', '${usuario.userType}')">
            <i class="fas fa-check"></i> Aprobar
          </button>
          <button class="btn btn-reject" onclick="rejectUser('${usuario.id}', '${usuario.userType}')">
            <i class="fas fa-times"></i> Rechazar
          </button>
        </div>
      `;
      return item;
    };

    // Mostrar todos los usuarios
    const todosLosUsuarios = [...(data.compradores || []), ...(data.agronomos || [])];
    
    if (todosLosUsuarios.length === 0) {
      allList.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No hay usuarios registrados</p></div>';
    } else {
      todosLosUsuarios.forEach(usuario => {
        const tipo = usuario.userType === 'comprador' ? 'Comprador' : 'Agronomo';
        allList.appendChild(createNotificationItem(usuario, tipo));
      });
    }

    // Mostrar compradores
    if (data.compradores && data.compradores.length > 0) {
      data.compradores.forEach(comprador => {
        compradoresList.appendChild(createNotificationItem(comprador, 'Comprador'));
      });
    } else {
      compradoresList.innerHTML = '<div class="empty-state"><i class="fas fa-user"></i><p>No hay compradores registrados</p></div>';
    }

    // Mostrar agronomos
    if (data.agronomos && data.agronomos.length > 0) {
      data.agronomos.forEach(agronomo => {
        agronomosList.appendChild(createNotificationItem(agronomo, 'Agronomo'));
      });
    } else {
      agronomosList.innerHTML = '<div class="empty-state"><i class="fas fa-seedling"></i><p>No hay agronomos registrados</p></div>';
    }

    // Configurar tabs
    setupTabs();
    
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
    document.getElementById('all-tab').innerHTML = 
      '<div class="error-state"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar los usuarios</p></div>';
  }
});

// Función para configurar las pestañas
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.notification-list');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover clase active de todas las pestañas
      tabs.forEach(t => t.classList.remove('active'));
      // Agregar clase active a la pestaña clickeada
      tab.classList.add('active');

      // Ocultar todo el contenido
      tabContents.forEach(content => {
        content.style.display = 'none';
      });

      // Mostrar el contenido correspondiente
      const tabName = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(`${tabName}-tab`);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
    });
  });
}

// Funciones para aprobar/rechazar usuarios (puedes implementarlas después)
window.approveUser = function(userId, userType) {
  console.log(`Aprobando usuario ${userId} de tipo ${userType}`);
  // Implementar lógica de aprobación
};

window.rejectUser = function(userId, userType) {
  console.log(`Rechazando usuario ${userId} de tipo ${userType}`);
  // Implementar lógica de rechazo
};