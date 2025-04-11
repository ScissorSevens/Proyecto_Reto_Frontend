document.addEventListener('DOMContentLoaded', () => {
    // Simulación de base de datos en localStorage
    const getProductsFromStorage = () => JSON.parse(localStorage.getItem('products')) || [];
    const saveProductsToStorage = (products) => localStorage.setItem('products', JSON.stringify(products));

    // Crear (POST)
    document.getElementById('postForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const product = document.getElementById('product').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;

        const products = getProductsFromStorage();
        const id = products.length + 1;
        products.push({ id, product, price, quantity });
        saveProductsToStorage(products);

        alert('Producto agregado');
        e.target.reset();
    });

    // Leer (GET)
    document.getElementById('getProducts').addEventListener('click', () => {
        const products = getProductsFromStorage();
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach((p) => {
            const li = document.createElement('li');
            li.textContent = `ID: ${p.id}, Producto: ${p.product}, Precio: ${p.price}, Cantidad: ${p.quantity}`;
            productList.appendChild(li);
        });
    });

    // Actualizar (PUT)
    document.getElementById('putForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('updateId').value);
        const product = document.getElementById('updateProduct').value;
        const price = document.getElementById('updatePrice').value;
        const quantity = document.getElementById('updateQuantity').value;

        const products = getProductsFromStorage();
        const productIndex = products.findIndex((p) => p.id === id);

        if (productIndex !== -1) {
            if (product) products[productIndex].product = product;
            if (price) products[productIndex].price = price;
            if (quantity) products[productIndex].quantity = quantity;

            saveProductsToStorage(products);
            alert('Producto actualizado');
        } else {
            alert('Producto no encontrado');
        }
    });

    // Eliminar (DELETE)
    document.getElementById('deleteForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('deleteId').value);

        const products = getProductsFromStorage();
        const newProducts = products.filter((p) => p.id !== id);

        if (products.length !== newProducts.length) {
            saveProductsToStorage(newProducts);
            alert('Producto eliminado');
        } else {
            alert('Producto no encontrado');
        }
    });
});