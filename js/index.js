const header = document.getElementById("head");
header.className = "header";
const encabezado = document.createElement("div");
encabezado.className = "encabezadoSty";
const logo = document.createElement("img");
logo.src = "./assets/multimedia/jpg/Screenshot 2024-04-20 141935.jpg";
logo.className = "logo";
const nombre = document.createElement("h3");
nombre.className = "nombreLogo";
nombre.innerHTML = "SOK CORES";
encabezado.append(logo, nombre);
header.append(encabezado);






const boxUp = document.createElement("div");
boxUp.className = "encabezadoRight";
const barraBusqueda = document.createElement("input");
barraBusqueda.className = "barraBusqueda";
barraBusqueda.placeholder = "Buscar productos";
const botonBusqueda = document.createElement("button");
botonBusqueda.innerHTML = "Buscar";
botonBusqueda.className = "botones";

const carritoStorage = document.createElement("img");
carritoStorage.className = "carrito";
carritoStorage.src = "./assets/multimedia/jpg/carro-de-la-compra.png";
carritoStorage.alt = "carrito";
carritoStorage.addEventListener("click", () => {
  contenedorCarritoCompras.style.display = "block";
});
const cajaCarrito = document.createElement("div");

const botonCerrar = document.createElement("button");
botonCerrar.innerHTML = "X";
botonCerrar.className = "botones";
botonCerrar.addEventListener("click", () => {
  contenedorCarritoCompras.style.display = "none";
});
const divCarrito = document.createElement("div");
const botonBorrar = document.createElement("button");
botonBorrar.innerHTML = "Eliminar contenido de carrito";
botonBorrar.className = "botones";
botonBorrar.addEventListener("click", () => {
  localStorage.removeItem("Articulos");
  divCarrito.innerHTML = "Carrito Vacio";
  carritoDeCompras = [];
});
const botonComprar = document.createElement("button");
botonComprar.innerHTML = "Comprar";
botonComprar.className = "botones";
botonComprar.addEventListener("click", () => {
  if (carritoDeCompras.length === 0) {
    Swal.fire({
      title: "Primero debes agregar productos al Carrito!",
      icon: "warning",
    });
  } else {
    carritoDeCompras = [];
    localStorage.removeItem("Articulos");
    divCarrito.innerHTML = "";
    Swal.fire({
      title: "Gracias por su Compra!",
      icon: "success",
    });
  }
});

const contenedorCarritoCompras = document.createElement("div");
contenedorCarritoCompras.className = "modalCarrito";

cajaCarrito.append(botonCerrar, divCarrito, botonBorrar, botonComprar);
boxUp.append(barraBusqueda, botonBusqueda, carritoStorage);
header.append(boxUp);

contenedorCarritoCompras.append(cajaCarrito);
header.append(contenedorCarritoCompras);

const contenedorProductos = document.getElementById("contenedorProductos");
contenedorProductos.className = "contain";

let inventario = [];

const buscarProductos = async (inputApi) => {
  const productosA = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${inputApi}`
  );
  const productosB = await productosA.json();
  inventario = productosB.results;
  mostrarProductos();
};

const productosFuncion = async () => {
  const productosA = await fetch(
    "https://api.mercadolibre.com/sites/MLA/search?q=bicicletas"
  );
  const productosB = await productosA.json();
  const productosC = productosB.results;
  inventario = productosC;
  mostrarProductos();
};

let actual = 0;
const productosPagina = 12;

function mostrarProductos() {
  contenedorProductos.innerHTML = "";

  const productosComienzo = actual * productosPagina;
  const productosFinal = productosComienzo + productosPagina;
  const productosProductos = inventario.slice(
    productosComienzo,
    productosFinal
  );

  productosProductos.forEach((p, index) => {
    p.nuevoId = index + 1;

    const cardContenedor = document.createElement("div");
    cardContenedor.className = "card";

    const imagenProducto = document.createElement("img");
    imagenProducto.src = p.thumbnail;
    imagenProducto.className = "img";
    const descripProducto = document.createElement("h5");
    descripProducto.innerHTML = p.title;
    descripProducto.className = "h5";
    const precioProducto = document.createElement("p");
    precioProducto.innerHTML = `<strong>$${p.price}</strong>`;
    const botonProducto = document.createElement("button");
    botonProducto.id = "carrito";
    botonProducto.innerHTML = "Agregar al carrito";
    botonProducto.className = "botones";

    cardContenedor.append(
      imagenProducto,
      descripProducto,
      precioProducto,
      botonProducto
    );
    contenedorProductos.append(cardContenedor);

    botonProducto.addEventListener("click", () => {
      anadirCarrito(p.id);
    });
  });
}

productosFuncion();

let carritoDeCompras = [];

function anadirCarrito(id) {
  const producto = inventario.find((producto) => producto.id == id);
  carritoDeCompras.push(producto);
  Toastify({
    text: `${producto.title} se agregó al Carrito!`,
    duration: 3000,
    gravity: "bottom",
    position: "left",
    backgroundColor: "#20B2AA",
  }).showToast();
  localStorage.setItem("Articulos", JSON.stringify(carritoDeCompras));
  mostrarProductoCarrito();
}

function mostrarProductoCarrito() {
  let total = 0;
  divCarrito.innerHTML = "";
  carritoDeCompras.forEach((c) => {
    const contenidoLista = document.createElement("div");
    contenidoLista.className = "contenidoLista";
    const listaNombreCarrito = `<p>Nombre: ${c.title}`;
    const cajaNombreCarrito = document.createElement("p");
    cajaNombreCarrito.innerHTML = listaNombreCarrito;
    const listaPrecioCarrito = `<strong>Precio: $${c.price}</strong></p>`;
    const cajaPrecioCarrito = document.createElement("p");
    cajaPrecioCarrito.innerHTML = listaPrecioCarrito;
    total += c.price;
    contenidoLista.append(cajaNombreCarrito, cajaPrecioCarrito);
    divCarrito.append(contenidoLista);
  });

  const totalPrecio = document.createElement("p");
  totalPrecio.innerHTML = `Total: <strong>$${total.toFixed(2)}</strong>`;
  divCarrito.append(totalPrecio);
}

mostrarProductoCarrito();

const controles = document.getElementById("controles");
controles.className = "controles";
const back = document.createElement("button");
back.className = "botones";
back.innerHTML = "Atras";
const next = document.createElement("button");
next.className = "botones";
next.innerHTML = "Siguiente";
controles.append(back);
controles.append(next);

back.addEventListener("click", () => {
  if (actual > 0) {
    actual--;
    mostrarProductos();
  }
});

next.addEventListener("click", () => {
  if ((actual + 1) * productosPagina < inventario.length) {
    actual++;
    mostrarProductos();
  }
});

botonBusqueda.addEventListener("click", () => {
  const inputApi = barraBusqueda.value;
  if (inputApi) {
    buscarProductos(inputApi);
  }
});
