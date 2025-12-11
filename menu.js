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
    const longDesc  = box.querySelector('.desc-desktop');
    const shortDesc = box.querySelector('.desc-mobile');

    // Só mexe se EXISTIR (compat com markup antigo)
    if (longDesc)  longDesc.style.display  = isMobile ? 'none'  : 'block';
    if (shortDesc) shortDesc.style.display = isMobile ? 'block' : 'none';
  });
}

// executa ao carregar (em páginas sem .desc-*, não quebra)
toggleDescriptions();
window.addEventListener('resize', toggleDescriptions);


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



// ============================
// VER MAIS / VER MENOS (desktop) + MODAL (mobile)
// ============================
(() => {
  const isMobile = () => window.innerWidth <= 1366;

  document.querySelectorAll('.metodologias-box .toggle-desc').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.closest('.metodologias-box');
      const full = box.querySelector('.full');
      const aberto = !full.hasAttribute('hidden');

      if (!isMobile()) {
        if (aberto) {
          full.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          btn.textContent = 'Ver mais';
        } else {
          full.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
          btn.textContent = 'Ver menos';
        }
        return;
      }

      const title = box.querySelector('h3')?.textContent;
      const content = full.innerHTML;

      const existingModal = document.querySelector('.metodologia-modal');
      if (existingModal) existingModal.remove();

      const modal = document.createElement('div');
      modal.className = 'metodologia-modal';
      modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <h3>${title}</h3>
          <div class="modal-body">${content}</div>
          <button class="modal-close">Fechar</button>
        </div>
      `;
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden'; 
      const closeModal = () => {
        modal.classList.add('closing');
        setTimeout(() => {
          modal.remove();
          document.body.style.overflow = '';
        }, 300);
      };

      modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
      modal.querySelector('.modal-close').addEventListener('click', closeModal);
    });
  });
})();

 /* FAQ */

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const arrow = item.querySelector('.arrow');

    // garante que começa fechado
    answer.style.display = 'none';
    question.classList.remove('open');
    answer.classList.remove('open');
    arrow.classList.remove('active');

    question.addEventListener('click', () => {
      const isOpen = answer.style.display === 'block';

      // fecha todos antes
      faqItems.forEach(other => {
        const q = other.querySelector('.faq-question');
        const a = other.querySelector('.faq-answer');
        const ar = other.querySelector('.arrow');

        a.style.display = 'none';
        q.classList.remove('open');
        a.classList.remove('open');
        ar.classList.remove('active');
      });

      // se estava fechado, abre este
      if (!isOpen) {
        answer.style.display = 'block';
        question.classList.add('open');
        answer.classList.add('open');
        arrow.classList.add('active');
      }
    });
  });
});

// ============================
// CONTATO: envio sem redirect (FormSubmit via AJAX)
// ============================
(() => {
  const form = document.getElementById("contato-form");
  const msgEl = document.getElementById("form-msg");

  if (!form || !msgEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // feedback visual: opcional (desabilita botão durante envio)
    const submitBtn = form.querySelector('input[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.value = "Enviando...";
    }

    msgEl.textContent = "";
    msgEl.classList.remove("success", "error");

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        msgEl.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
        msgEl.classList.add("success");
      } else {
        msgEl.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
        msgEl.classList.add("error");
      }
    } catch (err) {
      console.error(err);
      msgEl.textContent = "Erro de conexão. Verifique sua internet e tente novamente.";
      msgEl.classList.add("error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.value = "ENVIAR";
      }

      // some a mensagem depois de alguns segundos (opcional)
      setTimeout(() => {
        msgEl.textContent = "";
        msgEl.classList.remove("success", "error");
      }, 6000);
    }
  });
})();
