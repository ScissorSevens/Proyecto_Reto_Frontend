document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('input[placeholder="Nombre"]');
  const emailInput = document.querySelector('input[placeholder="Email"]');
  const passwordInput = document.querySelector('input[placeholder="Contraseña"]');
  const userTypeInput = document.querySelector('input[name="userType"]:checked');

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const userType = userTypeInput.value;

  try {
    const response = await fetch('/.netlify/functions/registerUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, userType }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);

      // Limpiar los inputs
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      userTypeInput.checked = false; // Desmarca el radio seleccionado
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    alert('Error al registrar usuario. Inténtalo de nuevo.');
  }
});