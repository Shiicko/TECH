const productos = [
    {
        id: 1,
        nombre: "Producto 1",
        descripcion: "Descripción corta del producto 1.",
        imagen: "/img/pc1.jpg",
        precio: 2000
    },
    {
        id: 2,
        nombre: "Producto 2",
        descripcion: "Descripción corta del producto 2.",
        imagen: "/img/hero.jpg",
        precio: 2500
    },
    {
        id: 3,
        nombre: "Producto 3",
        descripcion: "Descripción corta del producto 3.",
        imagen: "/img/pc3.jpg",
        precio: 4000
    },
    {
        id: 4,
        nombre: "Producto 4",
        descripcion: "Descripción corta del producto 4.",
        imagen: "/img/pc4.jpg",
        precio: 1800
    },   
     {
        id: 5,
        nombre: "Producto 5",
        descripcion: "Descripción corta del producto 5.",
        imagen: "/img/pc2.jpg",
        precio: 2300
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const cartLink = document.getElementById('carrito-link');
    const cart = document.querySelector('.cart');

    if (cartLink && cart) {
        cartLink.addEventListener('click', function(event) {
            event.preventDefault();
            cart.classList.toggle('show');
            // console.log('El enlace del carrito ha sido clicado.');
        });
    } else {
        // console.error('No se pudo encontrar el enlace del carrito o el elemento del carrito.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carrito = [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');

    const verMasButtons = document.querySelectorAll('.product-button');

    verMasButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = productos.find(item => item.id === productId);
            carrito.push(product);

            actualizarListaCarrito(carrito);
            actualizarTotal(carrito);
        });
    });

    function actualizarListaCarrito(carrito) {
        listaCarrito.innerHTML = '';

        carrito.forEach(function(product) {
            const listItem = document.createElement('li');

            const productImage = document.createElement('img');
            productImage.src = product.imagen;
            productImage.alt = product.nombre;
            productImage.classList.add('product-image');
            listItem.appendChild(productImage);

            const productDetails = document.createElement('div');
            productDetails.classList.add('product-details');

            const productName = document.createElement('h3');
            productName.textContent = product.nombre;
            productName.classList.add('product-name');
            productDetails.appendChild(productName);

            const productPrice = document.createElement('p');
            // Formatear el precio con separador de miles
            productPrice.textContent = `Precio: $${product.precio.toLocaleString()}`;
            productPrice.classList.add('product-price');
            productDetails.appendChild(productPrice);

            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'X';
            eliminarButton.classList.add('eliminar');
            productDetails.appendChild(eliminarButton);

            listItem.appendChild(productDetails);
            listaCarrito.appendChild(listItem);
        });
    }

    function actualizarTotal(carrito) {
        const total = carrito.reduce((acc, product) => acc + product.precio, 0);
        // Formatear el total con separador de miles
        totalElement.textContent = `Total: $${total.toLocaleString()}`;
    }

    listaCarrito.addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminar')) {
            const listItem = event.target.parentElement.parentElement;
            // Obtener el índice del producto en la lista del carrito
            const index = Array.from(listaCarrito.children).indexOf(listItem);
            // Eliminar el producto del arreglo carrito
            carrito.splice(index, 1);
            // Actualizar la lista del carrito en el HTML
            actualizarListaCarrito(carrito);
            actualizarTotal(carrito);
        }
    });
});
