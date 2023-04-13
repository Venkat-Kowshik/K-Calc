let ham = document.querySelector('#ham');
let links = document.querySelector('#sus2');
ham.addEventListener('click', () => {
  links.classList.toggle('active');
});
