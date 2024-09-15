// HEADER //
document.getElementById("head");

//// MENU DE NAVEGACION ////

const navLinks = [
  { nombre: "E-commerce", link: "./index.html" },
  { nombre: "Planifica tu Rodada", link: "./plain.html" },
  { nombre: "Piedra, Papel o Tijera", link: "./play.html" },
];

const navBar = document.getElementById("navBar");
navBar.className = "menu";

navLinks.forEach((links) => {
  const a = document.createElement("a");
  a.href = links.link;
  a.innerHTML = links.nombre;
  navBar.append(a);
});

//// FOOTER ////

const footer = document.getElementById("footer");
footer.className = "footer";

const copyright = document.createElement("p");
copyright.innerHTML = `SOK CORES. derechos reservados.`;

const links = [
  { text: "Política de Privacidad", url: "#" },
  { text: "Términos de Servicio", url: "#" },
  { text: "Contacto", url: "#" },
];

const linksContainer = document.createElement("div");

links.forEach((link) => {
  const linkElement = document.createElement("a");
  linkElement.href = link.url;
  linkElement.innerHTML = link.text;
  linksContainer.append(linkElement);
});

footer.append(linksContainer, copyright);
document.body.append(footer);

//// ICONO ////

const iconoWhatsapp = document.createElement("div");
iconoWhatsapp.className = "whatsapp";

const iconSvg = document.createElement("img");
iconSvg.src = "./assets/multimedia/jpg/whatsapp.png";
iconoWhatsapp.append(iconSvg);
document.body.append(iconoWhatsapp);
