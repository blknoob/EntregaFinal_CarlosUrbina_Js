const divMap = document.getElementById("map");
let mapa, direccion1, direccion2, autocompletarInicio, autocompletarFin;
const resultadoClima = document.getElementById("resultadoClima");
const resultadoTiempo = document.getElementById("resultadoTiempo");
const resultadoDistancia = document.getElementById("resultadoDistancia");
const botonPLain = document.getElementById("botonPlain");

const weatherAPIKey = `6e4c069a2cc9e747962535a676063416`;

function initMap() {
  mapa = new google.maps.Map(divMap, {
    center: { lat: -33.45694, lng: -70.64827 },
    zoom: 12,
  });

  direccion1 = new google.maps.DirectionsService();
  direccion2 = new google.maps.DirectionsRenderer();
  direccion2.setMap(mapa);

  const inputInicio = document.getElementById("inicio");
  const inputFin = document.getElementById("fin");

  autocompletarInicio = new google.maps.places.Autocomplete(inputInicio);
  autocompletarFin = new google.maps.places.Autocomplete(inputFin);
}

function calcularRuta() {
  const inicio = document.getElementById("inicio").value;
  const fin = document.getElementById("fin").value;

  const respuesta = {
    origin: inicio,
    destination: fin,
    travelMode: "BICYCLING",
  };

  direccion1.route(respuesta, function (resultado, estado) {
    if (estado === "OK") {
      direccion2.setDirections(resultado);

      const ruta = resultado.routes[0].legs[0];
      const duracion = ruta.duration.text;
      const distancia = ruta.distance.text;
      const ubicacion = ruta.start_location;

      resultadoTiempo.innerHTML = `${duracion}`;
      resultadoDistancia.innerHTML = `${distancia}`;

      obtenerClima(ubicacion.lat(), ubicacion.lng());
    }
  });
}

botonPLain.addEventListener("click", () => {
  calcularRuta();
});

function obtenerClima(lat, lng) {
  const clima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherAPIKey}&units=metric&lang=es`;

  fetch(clima)
    .then((resp) => resp.json())
    .then((dat) => {
      const temperatura = dat.main.temp;
      const descripcion = dat.weather[0].description;

      resultadoClima.innerHTML = `${temperatura}°C, ${descripcion}`;
    });
}
