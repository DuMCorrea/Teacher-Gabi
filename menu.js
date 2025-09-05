let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.querySelector('.overlay-menu');
let btnFechar = document.querySelector('.btn-fechar i');

// abrir menu
btnMenu.addEventListener('click', () => {
  menu.classList.add('abrir-menu');
  overlay.style.display = 'block'; 
});

// fechar clicando no overlay
overlay.addEventListener('click', () => {
  fecharMenu();
});

// fechar clicando no X
btnFechar.addEventListener('click', () => {
  fecharMenu();
});

// ===== Função utilitária para fechar =====
function fecharMenu() {
  menu.classList.remove('abrir-menu');
  overlay.style.display = 'none';
}

/* ---------------------------
   REDIRECIONAMENTO - MOBILE
----------------------------*/
document.querySelectorAll('.menu-mobile nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    let offset = 0;
    if (targetId === "sobre") offset = -55;
    if (targetId === "enemeufrgs") offset = -50;
    if (targetId === "contato") offset = 200; // 👈 mobile

    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });

    fecharMenu();
  });
});

/* ---------------------------
   REDIRECIONAMENTO - DESKTOP
----------------------------*/
document.querySelectorAll(
  '.menu-desktop a[href^="#"], .btn-contato a[href^="#"], .enemeufrgs .btn-cta[href^="#"]'
).forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    let offset = 0;
    if (targetId === "sobre") offset = -80;
    if (targetId === "enemeufrgs") offset = -70;
    if (targetId === "contato") offset = -80;

    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});





// ===== Função utilitária para fechar =====
function fecharMenu() {
  menu.classList.remove('abrir-menu');
  overlay.style.display = 'none';
}



// ======= Script do carrossel feedbacks que você já tinha =======
(() => {
  const root = document.querySelector('#feedbacks');
  if (!root) return;

  const viewport = root.querySelector('.fb-viewport');
  const track    = root.querySelector('.fb-track');
  const leftBtn  = root.querySelector('.fb-arrow.left');
  const rightBtn = root.querySelector('.fb-arrow.right');

  const gap = () => parseFloat(getComputedStyle(track).gap) || 0;

  function stepSize(){
    const first = track.querySelector('.feedback-card');
    if (!first) return 0;
    return Math.round(first.offsetWidth + gap());
  }

  function scrollByOne(dir){
    viewport.scrollBy({ left: dir * stepSize(), behavior: 'smooth' });
  }

  function updateButtons(){
    const max = viewport.scrollWidth - viewport.clientWidth - 1; 
    const x   = Math.round(viewport.scrollLeft);
    leftBtn.disabled  = x <= 0;
    rightBtn.disabled = x >= max;
  }

  leftBtn?.addEventListener('click', () => scrollByOne(-1));
  rightBtn?.addEventListener('click', () => scrollByOne(1));
  viewport?.addEventListener('scroll', () => requestAnimationFrame(updateButtons));
  window.addEventListener('resize', () => setTimeout(updateButtons, 100));

  updateButtons();
})();

function toggleDescriptions() {
  const isMobile = window.innerWidth <= 768;
  
  document.querySelectorAll('.metodologias-box').forEach(box => {
    const longDesc = box.querySelector('.desc-desktop');
    const shortDesc = box.querySelector('.desc-mobile');

    if (isMobile) {
      longDesc.style.display = "none";
      shortDesc.style.display = "block";
    } else {
      longDesc.style.display = "block";
      shortDesc.style.display = "none";
    }
  });
}

// executa ao carregar
toggleDescriptions();

// executa ao redimensionar
window.addEventListener("resize", toggleDescriptions);


// VALORES MOBILE



(() => {
  const cards = document.querySelectorAll('.valor-card');
  if (!cards.length) return;

  let current = 0;
  let interval;

  function setActive(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
    current = index;
    updateAlternation();

    // 👇 Aplica o "flash-hover" no card ativo por 1s
    const activeCard = cards[index];
    activeCard.classList.add('flash-hover');
    setTimeout(() => {
      activeCard.classList.remove('flash-hover');
    }, 1000);
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      current = (current + 1) % cards.length;
      setActive(current);
    }, 10000); // 10 segundos
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  function updateAlternation() {
    cards.forEach(card => card.classList.remove('alt-left', 'alt-right'));
    const others = [...cards].filter(c => !c.classList.contains('active'));
    others.forEach((card, i) => {
      if (i % 2 === 0) {
        card.classList.add('alt-left');
      } else {
        card.classList.add('alt-right');
      }
    });
  }

  // inicializa
  setActive(current);
  startAutoSlide();

  // clique nos cards
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index !== current) {
        setActive(index);
        resetAutoSlide();
      }
    });
  });
})();

