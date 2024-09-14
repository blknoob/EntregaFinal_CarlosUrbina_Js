const juego = document.getElementById("juego");
juego.className = "juego";

const contenedorJugador = document.createElement("div");
contenedorJugador.className = "contenedorJugador";

const contenedorComputadora = document.createElement("div");
contenedorComputadora.className = "contenedorComputadora";

const jugadorTitulo = document.createElement("h5");
jugadorTitulo.className="h5play"
jugadorTitulo.innerHTML = "Jugador (Elige tu opción)";
contenedorJugador.append(jugadorTitulo);

const cajaImgJugador = document.createElement("div");

const piedraJugador = document.createElement("img");
piedraJugador.className = "img";
piedraJugador.src = "/assets/multimedia/jpg/played/piedra.png";
piedraJugador.addEventListener("click", () => juega("piedra"));

const papelJugador = document.createElement("img");
papelJugador.className = "img";
papelJugador.src = "/assets/multimedia/jpg/played/papel.png";
papelJugador.addEventListener("click", () => juega("papel"));

const tijeraJugador = document.createElement("img");
tijeraJugador.className = "img";
tijeraJugador.src = "/assets/multimedia/jpg/played/tijera.png";
tijeraJugador.addEventListener("click", () => juega("tijera"));

const computadoraTitulo = document.createElement("h5");
computadoraTitulo.className = "h5play";
computadoraTitulo.innerHTML = "Computadora";
contenedorComputadora.append(computadoraTitulo);

const cajaImgComputadora = document.createElement("div");

const piedraComputadora = document.createElement("img");
piedraComputadora.className = "img";
piedraComputadora.src = "/assets/multimedia/jpg/played/piedra.png";

const papelComputadora = document.createElement("img");
papelComputadora.className = "img";
papelComputadora.src = "/assets/multimedia/jpg/played/papel.png";

const tijeraComputadora = document.createElement("img");
tijeraComputadora.className = "img";
tijeraComputadora.src = "/assets/multimedia/jpg/played/tijera.png";

const fin = document.createElement("h3");
fin.className = "h3";

const botonReiniciar = document.createElement("button");
botonReiniciar.className = "boton";
botonReiniciar.innerHTML = "Reiniciar";
botonReiniciar.addEventListener("click", reiniciarJuego);

cajaImgJugador.append(piedraJugador, papelJugador, tijeraJugador);
contenedorJugador.append(cajaImgJugador);
cajaImgComputadora.append(
  piedraComputadora,
  papelComputadora,
  tijeraComputadora
);
contenedorComputadora.append(cajaImgComputadora);

juego.append(contenedorJugador, fin, contenedorComputadora, botonReiniciar);

function juega(jugadorEscoge) {
  piedraJugador.style.display = "none";
  papelJugador.style.display = "none";
  tijeraJugador.style.display = "none";

  switch (jugadorEscoge) {
    case "piedra":
      piedraJugador.style.display = "inline";
      break;
    case "papel":
      papelJugador.style.display = "inline";
      break;
    case "tijera":
      tijeraJugador.style.display = "inline";
      break;
  }

  const opciones = ["piedra", "papel", "tijera"];
  const computadoraEscoge = opciones[Math.floor(Math.random() * 3)];

  piedraComputadora.style.display = "none";
  papelComputadora.style.display = "none";
  tijeraComputadora.style.display = "none";

  switch (computadoraEscoge) {
    case "piedra":
      piedraComputadora.style.display = "inline";
      break;
    case "papel":
      papelComputadora.style.display = "inline";
      break;
    case "tijera":
      tijeraComputadora.style.display = "inline";
      break;
  }

  let resultado;
  if (jugadorEscoge == computadoraEscoge) {
    resultado = `Empate`;
    fin.style.color = "gray";
  } else if (
    (jugadorEscoge == "piedra" && computadoraEscoge == "tijera") ||
    (jugadorEscoge == "papel" && computadoraEscoge == "piedra") ||
    (jugadorEscoge == "tijera" && computadoraEscoge == "papel")
  ) {
    resultado = `Ganaste`;
    fin.style.color="green"
  } else {
    resultado = `Perdiste`;
    fin.style.color = "red";
  }

  fin.innerHTML = resultado;
}

function reiniciarJuego() {
  piedraJugador.style.display = "inline";
  papelJugador.style.display = "inline";
  tijeraJugador.style.display = "inline";

  piedraComputadora.style.display = "inline";
  papelComputadora.style.display = "inline";
  tijeraComputadora.style.display = "inline";

  fin.innerHTML = "";
}
