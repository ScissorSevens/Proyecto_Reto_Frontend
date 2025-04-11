// Leer Productos (GET)
document.getElementById('getProducts').addEventListener('click', async () => {
    try {
        const response = await fetch('/.netlify/functions/get');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        
        const products = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Limpiar la lista
        
        products.forEach((product) => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${product.id}, Producto: ${product.data.product}, Precio: ${product.data.price}, Cantidad: ${product.data.quantity}`;
            productList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al obtener los productos.');
    }
});

// Eliminar Producto (DELETE)
document.getElementById('deleteForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página
    const productId = document.getElementById('deleteId').value;
    
    try {
        const response = await fetch('/.netlify/functions/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: productId }),
        });
        
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto.');
    }
});

// Actualizar Producto (PUT)
document.getElementById('putForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página
    
    const productId = document.getElementById('updateId').value;
    const updatedData = {
        product: document.getElementById('updateProduct').value,
        price: parseFloat(document.getElementById('updatePrice').value),
        quantity: parseInt(document.getElementById('updateQuantity').value),
    };
    
    try {
        const response = await fetch('/.netlify/functions/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: productId, ...updatedData }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message); // Mostrar mensaje de éxito
        } else {
            throw new Error(result.message || 'Error al actualizar el producto');
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto.');
    }
});

// Asegúrate de que el formulario de crear funcione correctamente
// No es necesario agregar un event listener ya que utiliza el atributo data-netlify="true"