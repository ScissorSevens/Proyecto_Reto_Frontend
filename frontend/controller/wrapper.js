
const profile = document.querySelector('.profile__btn');
const dropdown = document.querySelector('.dropdown__wrapper');
profile.addEventListener('click', () => {
  dropdown.classList.remove('none');
  dropdown.classList.toggle('hide');
});

document.addEventListener('click', (e) => {
  const isclickInside = dropdown.contains(e.target);
  const isprofileclicked = profile.contains(e.target);
  if (!isclickInside && !isprofileclicked) {
    dropdown.classList.add('hide');
    dropdown.classList.add('dropdown__wrapper--fade-in');
  }
});

const profile__cart = document.querySelector('.shopping__cart__btn');
const dropdown__cart = document.querySelector('.dropdown__wrapper__cart');

// Mostrar/ocultar el carrito al hacer clic en el botón
profile__cart.addEventListener('click', (e) => {
  e.stopPropagation(); // Detener propagación para evitar conflictos
  dropdown__cart.classList.remove('none');
  dropdown__cart.classList.toggle('hide');
});

// Evitar que el carrito se cierre al hacer clic dentro de él
dropdown__cart.addEventListener('click', (e) => {
  e.stopPropagation(); // Detener propagación del evento
});

// Cerrar el carrito si se hace clic fuera de él
document.addEventListener('click', (e) => {
  const isclickInside = dropdown__cart.contains(e.target);
  const isprofileclicked = profile__cart.contains(e.target);
  if (!isclickInside && !isprofileclicked) {
    dropdown__cart.classList.add('hide');
    dropdown__cart.classList.add('dropdown__shoping__cart--fade-in');
  }
});

