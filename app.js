// Array de productos con categorías
const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Descripción corta del producto 1.",
    imagen: "/img/pc1.jpg",
    categoria: "Oficina",
    precio: 1800,
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Descripción corta del producto 2.",
    imagen: "/img/hero.jpg",
    categoria: "Gamer",
    precio: 2500,
  },
  {
    id: 3,
    nombre: "Producto 3",
    descripcion: "Descripción corta del producto 3.",
    imagen: "/img/pc3.jpg",
    categoria: "Gamer",
    precio: 4000,
  },
  {
    id: 4,
    nombre: "Producto 4",
    descripcion: "Descripción corta del producto 4.",
    imagen: "/img/pc4.jpg",
    precio: 1800,
    categoria: "Oficina",
  },
  {
    id: 5,
    nombre: "Producto 5",
    descripcion: "Descripción corta del producto 5.",
    imagen: "/img/pc2.jpg",
    categoria: "Gamer",
    precio: 2300,
  },
  {
    id: 6,
    nombre: "Producto 6",
    descripcion: "Descripción corta del producto 6.",
    imagen: "/img/headset.png",
    precio: 350,
    categoria: "Accesorios",
  },
  {
    id: 7,
    nombre: "Producto 7",
    descripcion: "Descripción corta del producto 7.",
    imagen: "/img/mouse1.png",
    categoria: "Accesorios",
    precio: 700,
  },
  {
    id: 8,
    nombre: "Producto 8",
    descripcion: "Descripción corta del producto 8.",
    imagen: "/img/silla.png",
    precio: 1300,
    categoria: "Accesorios",
  },
  {
    id: 9,
    nombre: "Producto 9",
    descripcion: "Descripción corta del producto 9.",
    imagen: "/img/teclado.png",
    precio: 800,
    categoria: "Accesorios",
  },
];

// Función para mostrar productos
const mostrarProductos = (productosParaMostrar) => {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos productos

  productosParaMostrar.forEach((producto) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <a href="/externs/pc1.html" target="blank" class="cta-button" style="margin: 5px">Ver más</a>
      <a href="#" class="product-button" data-product-id="${producto.id}" data-product-name="${producto.nombre}">Agregar al carrito</a>
    `;

    productGrid.appendChild(productItem);
  });
};

// Función para filtrar productos por categoría
const filtrarProductos = () => {
  const categoriaSeleccionada =
    document.getElementById("category-filter").value;

  const productosFiltrados = productos.filter(
    (producto) =>
      !categoriaSeleccionada || producto.categoria === categoriaSeleccionada
  );

  mostrarProductos(productosFiltrados);
};

// Llamar a la función para mostrar todos los productos al cargar la página
mostrarProductos(productos);

// Agregar evento al botón de filtrado
document
  .getElementById("filter-button")
  .addEventListener("click", filtrarProductos);

// Opción de filtrar automáticamente al cambiar la selección
document
  .getElementById("category-filter")
  .addEventListener("change", filtrarProductos);

// Código para el carrito
document.addEventListener("DOMContentLoaded", function () {
  const cartLink = document.getElementById("carrito-link");
  const cart = document.querySelector(".cart");

  if (cartLink && cart) {
    cartLink.addEventListener("click", function (event) {
      event.preventDefault();
      cart.classList.toggle("show");
    });
  }

  const carrito = [];
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("total");

  const verMasButtons = document.querySelectorAll(".product-button");

  verMasButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const productId = parseInt(button.getAttribute("data-product-id"));
      const product = productos.find((item) => item.id === productId);
      carrito.push(product);

      actualizarListaCarrito(carrito);
      actualizarTotal(carrito);
    });
  });

  function actualizarListaCarrito(carrito) {
    listaCarrito.innerHTML = "";

    carrito.forEach(function (product, index) {
      const listItem = document.createElement("li");

      const productImage = document.createElement("img");
      productImage.src = product.imagen;
      productImage.alt = product.nombre;
      productImage.classList.add("product-image");
      listItem.appendChild(productImage);

      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");

      const productName = document.createElement("h3");
      productName.textContent = product.nombre;
      productName.classList.add("product-name");
      productDetails.appendChild(productName);

      const productPrice = document.createElement("p");
      productPrice.textContent = `Precio: $${product.precio.toLocaleString()}`;
      productPrice.classList.add("product-price");
      productDetails.appendChild(productPrice);

      const eliminarButton = document.createElement("button");
      eliminarButton.textContent = "X";
      eliminarButton.classList.add("eliminar");
      eliminarButton.addEventListener("click", function () {
        carrito.splice(index, 1); // Eliminar el producto del carrito
        actualizarListaCarrito(carrito);
        actualizarTotal(carrito);
      });
      productDetails.appendChild(eliminarButton);

      listItem.appendChild(productDetails);
      listaCarrito.appendChild(listItem);
    });
  }

  function actualizarTotal(carrito) {
    const total = carrito.reduce((acc, product) => acc + product.precio, 0);
    totalElement.textContent = `Total: $${total.toLocaleString()}`;
  }
});
