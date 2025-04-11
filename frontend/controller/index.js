document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('postForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario recargue la página
    
        const productData = {
            product: document.getElementById('product').value,
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value),
        };
        console.log('Datos enviados al servidor:', productData); 
        try {
            const response = await fetch('/.netlify/functions/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                throw new Error(`Error al crear el producto: ${response.statusText}`);
            }
    
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error(error);
            alert('Error al crear el producto. Revisa la consola para más detalles.');
        }
    });

    document.getElementById('putForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario recargue la página
    
        const productData = {
            id: document.getElementById('updateId').value,
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
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                throw new Error(`Error al actualizar el producto: ${response.statusText}`);
            }
    
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el producto. Revisa la consola para más detalles.');
        }
    });

    document.getElementById('deleteForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario recargue la página
    
        const productId = document.getElementById('deleteId').value; // ID del producto a eliminar
    
        try {
            const response = await fetch('/.netlify/functions/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productId }),
            });
    
            if (!response.ok) {
                throw new Error(`Error al eliminar el producto: ${response.statusText}`);
            }
    
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error(error);
            alert('Error al eliminar el producto. Revisa la consola para más detalles.');
        }
    });

    document.getElementById('getProducts').addEventListener('click', async () => {
        try {
            const response = await fetch('/.netlify/functions/get');
            if (!response.ok) {
                throw new Error(`Error al obtener los productos: ${response.statusText}`);
            }

            const products = await response.json();

            // Verifica que la respuesta sea un arreglo
            if (!Array.isArray(products)) {
                throw new Error('La respuesta no es un arreglo válido');
            }

            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            products.forEach((p) => {
                const li = document.createElement('li');
                li.textContent = `ID: ${p.id}, Producto: ${p.data.product}, Precio: ${p.data.price}, Cantidad: ${p.data.quantity}`;
                productList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
            alert('Error al mostrar los productos. Revisa la consola para más detalles.');
        }
    });
});