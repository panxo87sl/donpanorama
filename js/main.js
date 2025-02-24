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
//----------------------------------------------FIN Carga de datos---------------------------------------------------//
//----------------------------------------------INICIO Construccion HTML---------------------------------------------------//
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
                        <button class="event-like-link" data-nombre="${evento.nombre}" data-eventoid="${evento.id}" id="like">Agregar</button>
                      </div>
                    </div>`;
  contenedor.appendChild(card);
});
//----------------------------------------------FIN Construccion HTML---------------------------------------------------//
//----------------------------------------------INICIO Comparación Agenda con Lista total de Eventos---------------------------//
function buscarIndexEventosInteres(idEvento) {
  return agenda.eventosInteres.findIndex(
    (auxEvento) => auxEvento.id === idEvento
  );
}
function deshabilitarBotonesGuardados() {
  const listaLikeButtonsActualizar = document.querySelectorAll("#like"); //Lista de los botones "Me Interes" de cada evento
  listaLikeButtonsActualizar.forEach((auxButon) => {
    let idEvento = Number(auxButon.dataset.eventoid); // Suponiendo que el botón tiene `data-eventoid="ID Evento"`
    let auxIndice = buscarIndexEventosInteres(idEvento); //Comprueba si existe el evento en la lista de eventos
    // console.log("auxIndice es", auxIndice);
    if (auxIndice > -1) {
      auxButon.textContent = "Eliminar"; // Cambia el texto del botón
      auxButon.classList.add("event-like-disabled"); // Deshabilita el botón
    }
  });
}
deshabilitarBotonesGuardados();
//----------------------------------------------FIN Comparación Agenda con Lista total de Eventos--------------------//

function buscarIndexListaEventos(idEvento) {
  return listaEventos.findIndex((auxEvento) => auxEvento.id === idEvento);
}
const listaLikeButtons = document.querySelectorAll("#like"); //busca todos los botones "Me Interesa"
listaLikeButtons.forEach((auxButon) => {
  auxButon.addEventListener("click", function () {
    let idEvento = Number(this.dataset.eventoid); // Suponiendo que el botón tiene `data-eventoid="ID Evento"`
    // console.log("idEvento es", idEvento);
    let auxIndice = buscarIndexListaEventos(idEvento);
    // console.log("auxIndice es", auxIndice);
    if (auxIndice > -1) {
      if (this.textContent === "Eliminar") {
        agenda.eliminarEvento(listaEventos[auxIndice]);
        this.textContent = "Agregar"; // Cambia el texto del botón
        this.classList.remove("event-like-disabled"); // Deshabilita el botón
      } else {
        agenda.agregarEvento(listaEventos[auxIndice]);
        this.textContent = "Eliminar"; // Cambia el texto del botón
        this.classList.add("event-like-disabled"); // Deshabilita el botón
      }
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
