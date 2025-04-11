document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getProducts').addEventListener('click', async () => {
        const response = await fetch('/.netlify/functions/get');
        const products = await response.json();

        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach((p) => {
            const li = document.createElement('li');
            li.textContent = `ID: ${p.id}, Producto: ${p.product}, Precio: ${p.price}, Cantidad: ${p.quantity}`;
            productList.appendChild(li);
        });
    });
});