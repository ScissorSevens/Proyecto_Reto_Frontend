document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const product = document.getElementById('product').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    const response = await fetch('/.netlify/functions/post.js', {
        method: 'POST',
        body: JSON.stringify({ product, price, quantity }),
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert('Error al crear el producto');
    }

    e.target.reset();
});
document.getElementById('getProducts').addEventListener('click', async () => {
    const response = await fetch('/.netlify/functions/get.js');
    const products = await response.json();

    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((p) => {
        const li = document.createElement('li');
        li.textContent = `ID: ${p.id}, Producto: ${p.product}, Precio: ${p.price}, Cantidad: ${p.quantity}`;
        productList.appendChild(li);
    });
});

document.getElementById('putForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('updateId').value);
    const product = document.getElementById('updateProduct').value;
    const price = document.getElementById('updatePrice').value;
    const quantity = document.getElementById('updateQuantity').value;

    const response = await fetch('/.netlify/functions/put.js', {
        method: 'PUT',
        body: JSON.stringify({ id, product, price, quantity }),
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert('Error al actualizar el producto');
    }
});

document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('deleteId').value);

    const response = await fetch('/.netlify/functions/delete.js', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert('Error al eliminar el producto');
    }
});