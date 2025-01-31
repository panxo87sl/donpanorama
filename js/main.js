const eventos = [
  {
    id: 1,
    imagen: "https://picsum.photos/300?random=1",
    nombre: "Festival Internacional de la Canción de Viña del Mar",
    productora: "BIZARRO LIVE ENTERTAINMENT",
    lugar: "Quinta Vergara - Viña del Mar",
    fecha: "23 Febrero 2025",
    enlace: "https://www.puntoticket.com/festival-de-vina",
  },
  {
    id: 2,
    imagen: "https://picsum.photos/300?random=2",
    nombre: "Lucybell",
    productora: "LOTUS",
    lugar: "Movistar Arena - Santiago",
    fecha: "29 Enero 2025",
    enlace: "https://www.puntoticket.com/lucybell-2025",
  },
  {
    id: 3,
    imagen: "https://picsum.photos/300?random=3",
    nombre: "Illapu Sinfónico",
    productora: "BIZARRO LIVE ENTERTAINMENT",
    lugar: "Movistar Arena - Santiago",
    fecha: "27 Julio 2025",
    enlace: "https://www.puntoticket.com/illapu-sinfonico",
  },
  {
    id: 4,
    imagen: "https://picsum.photos/300?random=4",
    nombre: "Japan Expo",
    productora: "NoiX Tours Organization SPA",
    lugar: "Centro Cultural Estación Mapocho - Santiago",
    fecha: "23 Mayo 2025",
    enlace: "https://www.puntoticket.com/sje2025",
  },
  {
    id: 5,
    imagen: "https://picsum.photos/300?random=5",
    nombre: "Gira Concierto Acustico los Jaivas",
    productora: "4Parlantes",
    lugar: "Teatro Municipal - Antofagasta",
    fecha: "23 Marzo 2025",
    enlace: "https://www.puntoticket.com/giraconciertoacusticolosjaivas2025",
  },
  {
    id: 6,
    imagen: "https://picsum.photos/300?random=6",
    nombre: "Master of Rock",
    productora: "The FanLab Producciones SpA",
    lugar: "Movistar Arena - Santiago",
    fecha: "23 Abril 2025",
    enlace: "https://www.puntoticket.com/masters-of-rock",
  },
];

const contenedor = document.getElementById("lista-eventos");

eventos.forEach((evento) => {
  const card = document.createElement("article");
  card.classList.add("event-card");
  card.innerHTML = `<img src="${evento.imagen}" alt="${evento.nombre}"/>
          <div class="event-info" id="informacion">
            <h2>${evento.nombre}</h2>
            <p id:"productora" ><strong>Productora:</strong> ${evento.productora}</p>
            <p id:"lugar"><strong>Lugar:</strong> ${evento.lugar}</p>
            <p id:"fecha" ><strong>Fecha:</strong> ${evento.fecha}</p>
            <a href="${evento.enlace}" target="_blank" class="event-info-link" id:"enlace">Más información</a>
            <a href="#" class="event-like-link" id:"like">Me interesa</a>
          </div>`;
  contenedor.appendChild(card);
});

const todosLosEventos = document.querySelectorAll(".event-card"); //lista de todos los eventos
const buscar = document.getElementById("buscar"); //input "bucar"

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
      evento.style.display = "block";
    } else {
      evento.style.display = "none";
    }
  });
});
