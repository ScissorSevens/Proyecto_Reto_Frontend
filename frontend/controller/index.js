document.addEventListener('DOMContentLoaded', () => {
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