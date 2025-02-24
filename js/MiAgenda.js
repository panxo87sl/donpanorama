export default class MiAgenda {
  constructor() {
    //Inicializo "el carrito" si es que esta en localStoge si no vacio.
    this.eventosInteres = JSON.parse(localStorage.getItem("agenda")) || [];

    this.agregarEvento = function (evento) {
      if (!this.existeEvento(evento.id)) {
        //Verifico si el evento existe antes de agregar ya que en este contexto no pueden haber eventos repetidos en el carrito
        this.eventosInteres.push(evento);
        this.guardarEnStorage();
        console.log(
          `${evento.nombre} con ID ${evento.id} agregado a mi agenda`
        );
        Toastify({
          text: `Evento "${evento.nombre}" agregado con exito!`,
          className: "toast-success", // Para el caso de éxito
          duration: 3000,
          gravity: "top",
          position: "right",
          stopOnFocus: true, // NO se detiene si el usuario pasa el cursor
        }).showToast();
      } else {
        console.log(`Evento ya existe en la agenda`);
        Toastify({
          text: `Evento "${evento.nombre}" ya está en tu agenda`,
          className: "toast-error", // Para el caso de error
          duration: 3000,
          gravity: "top",
          position: "right",
          stopOnFocus: true, // NO se detiene si el usuario pasa el cursor
        }).showToast();
      }
    };

    this.mostrarAgenda = function () {
      if (this.eventosInteres.length === 0) {
        console.log("Mi agenda: No hay eventos");
      } else {
        console.log("Mi agenda: ", this.eventosInteres);
      }
    };

    this.guardarEnStorage = function () {
      localStorage.setItem("agenda", JSON.stringify(this.eventosInteres));
    };

    this.existeEvento = function (idEvento) {
      //busco si el evento existe
      return this.eventosInteres.some((aux) => aux.id === idEvento);
    };

    this.eliminarEvento = function (idEvento) {
      if (this.existeEvento(idEvento)) {
        this.eventosInteres = this.eventosInteres.filter(
          (aux) => aux.id !== idEvento
        );
        this.guardarEnStorage();
        console.log(`${idEvento} eliminado de mi agenda.`);
      } else {
        console.log(`El evento "${idEvento}" no está en la agenda.`);
      }
    };
  }
}
