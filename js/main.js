//----------------------------------------------INICIO Carga de datos---------------------------------------------------//
import Evento from "./Evento.js";
import MiAgenda from "./MiAgenda.js";
const agenda = new MiAgenda();
const listaEventos = [];
function baseEventos() {
  const evento1 = new Evento(
    1,
    "https://static.ptocdn.net/images/eventos/fv2025_calugalistado.jpg",
    "Festival Internacional de la Canción de Viña del Mar",
    "BIZARRO LIVE ENTERTAINMENT",
    "Quinta Vergara - Viña del Mar",
    "23 Febrero 2025",
    "https://www.puntoticket.com/festival-de-vina"
  );
  const evento2 = new Evento(
    2,
    "https://static.ptocdn.net/images/eventos/lot181_calugalistado.jpg",
    "Lucybell",
    "LOTUS",
    "Movistar Arena - Santiago",
    "29 Enero 2025",
    "https://www.puntoticket.com/lucybell-2025"
  );
  const evento3 = new Evento(
    3,
    "https://static.ptocdn.net/images/eventos/biz305_calugalistado.jpg",
    "Illapu Sinfónico",
    "BIZARRO LIVE ENTERTAINMENT",
    "Movistar Arena - Santiago",
    "27 Julio 2025",
    "https://www.puntoticket.com/illapu-sinfonico"
  );
  const evento4 = new Evento(
    4,
    "https://static.ptocdn.net/images/eventos/nxo032_calugalistado.jpg",
    "Japan Expo",
    "NoiX Tours Organization SPA",
    "Centro Cultural Estación Mapocho - Santiago",
    "23 Mayo 2025",
    "https://www.puntoticket.com/sje2025"
  );
  const evento5 = new Evento(
    5,
    "https://static.ptocdn.net/images/eventos/ptp300_calugalistado.jpg",
    "Gira Concierto Acustico los Jaivas",
    "4Parlantes",
    "Teatro Municipal - Antofagasta",
    "23 Marzo 2025",
    "https://www.puntoticket.com/giraconciertoacusticolosjaivas2025"
  );
  const evento6 = new Evento(
    6,
    "https://static.ptocdn.net/images/eventos/rec085v2_calugalistado.jpg",
    "Master of Rock",
    "The FanLab Producciones SpA",
    "Movistar Arena - Santiago",
    "23 Abril 2025",
    "https://www.puntoticket.com/masters-of-rock"
  );
  listaEventos.push(evento1, evento2, evento3, evento4, evento5, evento6);
}
baseEventos();
console.log(listaEventos);
agenda.mostrarAgenda();
//----------------------------------------------FIN Carga de datos---------------------------------------------------//

// class MiAgenda {
//   constructor() {
//     //Inicializo "el carrito" si es que esta en localStoge si no vacio.
//     this.eventosInteres = JSON.parse(localStorage.getItem("agenda")) || [];

//     this.agregarEvento = function (evento) {
//       if (!this.existeEvento(evento.id)) {
//         //Verifico si el evento existe antes de agregar ya que en este contexto no pueden haber eventos repetidos en el carrito
//         this.eventosInteres.push(evento);
//         this.guardarEnStorage();
//         console.log(
//           `${evento.nombre} con ID ${evento.id} agregado a mi agenda`
//         );
//       } else {
//         console.log(`Evento ya existe en la agenda`);
//       }
//     };

//     this.mostrarAgenda = function () {
//       if (this.eventosInteres.length === 0) {
//         console.log("Mi agenda esta vacia");
//       } else {
//         console.log(this.eventosInteres);
//       }
//     };

//     this.guardarEnStorage = function () {
//       localStorage.setItem("agenda", JSON.stringify(this.eventosInteres));
//     };

//     this.existeEvento = function (idEvento) {
//       //buscco si el evento existe
//       return this.eventosInteres.some((aux) => aux.id === idEvento);
//     };

//     this.eliminarEvento = function (idEvento) {
//       if (this.existeEvento(idEvento)) {
//         this.eventosInteres = this.eventosInteres.filter(
//           (aux) => aux.id !== idEvento
//         );
//         this.guardarEnStorage();
//         console.log(`${idEvento} eliminado de mi agenda.`);
//       } else {
//         console.log(`El evento "${idEvento}" no está en la agenda.`);
//       }
//     };
//   }
// }
// agenda.agregarEvento(listaEventos[4]);
// agenda.mostrarAgenda();
// agenda.eliminarEvento(3);
// agenda.mostrarAgenda();

const contenedor = document.getElementById("lista-eventos");
listaEventos.forEach((evento) => {
  const card = document.createElement("article");
  card.classList.add("event-card");
  card.innerHTML = `<img src="${evento.imagen}" alt="${evento.nombre}"/>
                    <div class="event-info" id="informacion">
                      <h2>${evento.nombre}</h2>
                      <p id="productora" ><strong>Productora:</strong> ${evento.productora}</p>
                      <p id="lugar"><strong>Lugar:</strong> ${evento.lugar}</p>
                      <p id="fecha"><strong>Fecha:</strong> ${evento.fecha}</p>
                      <div class="event-info-buttons" id:"botones">
                        <a href="${evento.enlace}" target="_blank" class="event-info-link" id="enlace">Más información</a>
                        <a class="event-like-link" data-eventoid="${evento.id}" id="like">Me interesa</a>
                      </div>
                    </div>`;
  contenedor.appendChild(card);
});

function buscarIndiceEvento(idEvento) {
  return listaEventos.findIndex((auxEvento) => auxEvento.id === idEvento);
}
function disableButton(button) {}
const listaLikeButtons = document.querySelectorAll("#like"); //busca todos los botones "Me Interesa"
console.log(listaLikeButtons);
listaLikeButtons.forEach((auxButon) => {
  auxButon.addEventListener("click", function () {
    let idEvento = Number(this.dataset.eventoid); // Suponiendo que el botón tiene `data-nombre="Nombre Evento"`
    console.log("idEvento es", idEvento);
    let auxIndice = buscarIndiceEvento(idEvento);
    console.log("auxIndice es", auxIndice);
    if (auxIndice > -1) {
      agenda.agregarEvento(listaEventos[auxIndice]);
    } else {
      console.log("Evento no se agregó.");
    }
    if (
      !agenda.eventosInteres.some((auxEvento) => auxEvento.nombre === idEvento)
    ) {
      this.textContent = "Guardado"; // Cambia el texto del botón
      this.classList.add("disabled-btn"); // Deshabilita el botón
    }
    agenda.mostrarAgenda();
  });
});

const todosLosEventos = document.querySelectorAll(".event-card"); //lista de todos los eventos
const buscar = document.getElementById("buscar"); //input "buscar"

buscar.addEventListener("input", function () {
  const buscarText = buscar.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  // console.log(buscarText);
  todosLosEventos.forEach((evento) => {
    const auxNombre = evento
      .querySelector("h2")
      .textContent.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") //normalizar el texto a minusculas y sin signos especiales
      .toLowerCase();
    const auxLugar = evento
      .querySelector("p:nth-of-type(2)")
      .textContent.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") //normalizar el texto a minusculas y sin signos especiales
      .toLowerCase();
    // console.log(auxNombre);
    // console.log(auxLugar);
    if (auxNombre.includes(buscarText) || auxLugar.includes(buscarText)) {
      evento.style.display = "flex";
    } else {
      evento.style.display = "none";
    }
  });
});
