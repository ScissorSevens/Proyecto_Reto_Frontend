document
  .getElementById("numeroTarjeta")
  .addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    let newValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        newValue += " ";
      }
      newValue += value[i];
    }
    e.target.value = newValue;
  });

document
  .getElementById("fechaExpiracion")
  .addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substr(0, 2) + "/" + value.substr(2);
    }
    e.target.value = value;
  });

  document
  .getElementById("btnVolver")
  .addEventListener("click", function () {
    // Confirmar si el usuario realmente quiere salir
    const confirmar = confirm("¿Estás seguro de que deseas volver? Se perderán los datos ingresados.");
    
    if (confirmar) {
      // Redirigir a la página principal
      window.location.href = "/index.html";
    }
  });

document
  .getElementById("formularioPago")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      nombres: document.getElementById("nombres").value,
      apellidos: document.getElementById("apellidos").value,
      correo: document.getElementById("correo").value,
      direccion: document.getElementById("direccion").value,
      tipoTarjeta: document.getElementById("tipoTarjeta").value,
      nombreTitular: document.getElementById("nombreTitular").value,
    };

    try {
      const response = await fetch("/.netlify/functions/enviarFormulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        document.getElementById("formularioPago");
        document.addEventListener("submit", function (e) {
          e.preventDefault();
          document.getElementById("mensajeExito").style.display = "block";
          this.style.display = "none";
        });
        alert("Correo enviado con éxito");
        document.getElementById("formularioPago").reset();
        window.location.href = "/index.html";
        
      } else {
        alert("Hubo un error al enviar el correo");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el correo");
    }
  });
