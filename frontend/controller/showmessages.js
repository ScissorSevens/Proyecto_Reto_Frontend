// Importar Toastify desde node_modules
import Toastify from "toastify-js";

// Función para mostrar mensajes con Toastify
const mostrarMensaje = (mensaje, tipo = "success") => {
  Toastify({
    text: mensaje,
    duration: 3000, // Duración en milisegundos
    close: true, // Mostrar botón de cierre
    gravity: "bottom", // Posición: "top" o "bottom"
    position: "right", // Posición: "left", "center" o "right"
    backgroundColor: tipo === "success" ? "#4CAF50" : "#F44336", // Color según el tipo de mensaje
    stopOnFocus: true, // Detener el temporizador si el usuario pasa el mouse
  }).showToast();
};

module.exports = { mostrarMensaje };