let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.querySelector('.overlay-menu');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('abrir-menu');
    overlay.style.display = 'block'; 
});

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
    overlay.style.display = 'none'; 
});
