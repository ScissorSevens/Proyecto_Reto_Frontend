const mostrarMensaje = (mensaje, tipo = "success") => {
  Toastify({
    text: mensaje,
    duration: 4000,
    close: true,
    gravity: "bottom",
    position: "right",
    backgroundColor:
      tipo === "success"
        ? "linear-gradient(135deg, #4CAF50, #45a049)"
        : "linear-gradient(135deg, #F44336, #d32f2f)",
    stopOnFocus: true,
    className: tipo === "success" ? "toastify-custom" : "toastify-custom error",
    style: {
      background:
        tipo === "success"
          ? "linear-gradient(135deg, #4CAF50, #45a049)"
          : "linear-gradient(135deg, #F44336, #d32f2f)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      fontSize: "16px",
      fontWeight: "500",
      padding: "16px 24px",
      color: "white",
      border: "none",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
  }).showToast();
};

export { mostrarMensaje };