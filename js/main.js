/**
 * ZANOTTO INTERIORES — SCRIPT PRINCIPAL
 * Controlo de navegação, scroll suave, filtros de portfólio e envio WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPortfolioFilters();
  initScrollAnimations();
  initContactForm();
  initHeroVideoControls();
  initCelebrityVideo();
  updateCurrentYear();
  initMapControls();
  initStatCounters();
});

function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   1. Navbar Flutuante e Menu Mobile
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Efeito de scroll no header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Toggle do menu mobile
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Atualizar link ativo no scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Filtros da Galeria de Portfólio
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.97)';
          setTimeout(() => {
            card.classList.add('hide');
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Animações de Scroll (Reveal on Scroll)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   4. Controlo do Vídeo Hero (Mute/Pause)
   -------------------------------------------------------------------------- */
function initHeroVideoControls() {
  const video = document.getElementById('hero-bg-video');
  const toggleBtn = document.getElementById('video-toggle-btn');
  if (!video || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      toggleBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
        <span>Pausar</span>
      `;
    } else {
      video.pause();
      toggleBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <span>Reproduzir</span>
      `;
    }
  });
}

/* --------------------------------------------------------------------------
   5. Formulário de Contacto & Envio Direto via WhatsApp (+244 933 783 436)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim() || '';
    const phone = document.getElementById('form-phone')?.value.trim() || '';
    const projectType = document.getElementById('form-type')?.value || 'Residencial';
    const message = document.getElementById('form-message')?.value.trim() || '';

    if (!name || !phone) {
      alert('Por favor preencha pelo menos o seu Nome e Número de Telefone / WhatsApp.');
      return;
    }

    // Formatar texto para o WhatsApp Oficial Zanotto (+244 933 783 436)
    const waNumber = '244933783436';
    const waText = `Olá Zanotto Interiores! 👋%0A%0A*Nova Solicitação de Projeto:*%0A👤 *Nome:* ${encodeURIComponent(name)}%0A📞 *Contacto:* ${encodeURIComponent(phone)}%0A🏢 *Tipo de Projeto:* ${encodeURIComponent(projectType)}%0A💬 *Detalhes:* ${encodeURIComponent(message || 'Gostaria de agendar uma consulta para o meu espaço.')}`;

    // Abrir WhatsApp Web ou App móvel
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;
    window.open(waUrl, '_blank');

    // Feedback visual amigável
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Mensagem Enviada! ✓';
      submitBtn.style.backgroundColor = '#25D366';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        form.reset();
      }, 4000);
    }
  });
}

/* --------------------------------------------------------------------------
   6. Controlo do Vídeo de Assinatura Anna Joyce & Ajuste de Volume
   -------------------------------------------------------------------------- */
function initCelebrityVideo() {
  const video = document.getElementById('anna-joyce-video');
  const card = document.querySelector('.celebrity-video-card');
  const overlayBtn = document.getElementById('play-anna-joyce-btn');
  const toggleBtn = document.getElementById('anna-video-toggle');
  const soundBtn = document.getElementById('anna-sound-toggle');
  const volumeSlider = document.getElementById('anna-volume-slider');
  const inquireBtn = document.getElementById('btn-inquire-kitchen');

  if (!video) return;

  // Estado inicial de volume
  let lastVolume = 0.8;
  video.volume = 0.8;
  video.muted = false;

  function updateSliderFill(val) {
    if (!volumeSlider) return;
    const percentage = Math.round(val * 100);
    volumeSlider.style.background = `linear-gradient(to right, #BD5338 0%, #BD5338 ${percentage}%, rgba(255, 255, 255, 0.25) ${percentage}%, rgba(255, 255, 255, 0.25) 100%)`;
  }

  function updateSoundIcon(isMuted, vol) {
    if (!soundBtn) return;
    const soundOnIcon = soundBtn.querySelector('.icon-sound-on');
    const soundOffIcon = soundBtn.querySelector('.icon-sound-off');

    if (isMuted || vol === 0) {
      if (soundOnIcon) soundOnIcon.style.display = 'none';
      if (soundOffIcon) soundOffIcon.style.display = 'inline-block';
      soundBtn.setAttribute('title', 'Ativar Som');
      soundBtn.setAttribute('aria-label', 'Ativar Som');
    } else {
      if (soundOnIcon) soundOnIcon.style.display = 'inline-block';
      if (soundOffIcon) soundOffIcon.style.display = 'none';
      soundBtn.setAttribute('title', 'Desativar Som');
      soundBtn.setAttribute('aria-label', 'Desativar Som');
    }
  }

  // Inicializa fill do slider e ícones
  updateSliderFill(video.volume);
  updateSoundIcon(video.muted, video.volume);

  function playVideo() {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (card) card.classList.add('is-playing');
        if (overlayBtn) overlayBtn.classList.add('hidden');
        updatePlayIcons(true);
      }).catch(() => {
        // Fallback caso o navegador exija mute para iniciar reprodução
        video.muted = true;
        updateSoundIcon(true, 0);
        if (volumeSlider) volumeSlider.value = 0;
        updateSliderFill(0);
        video.play();
        if (card) card.classList.add('is-playing');
        if (overlayBtn) overlayBtn.classList.add('hidden');
        updatePlayIcons(true);
      });
    }
  }

  function pauseVideo() {
    video.pause();
    if (card) card.classList.remove('is-playing');
    if (overlayBtn) overlayBtn.classList.remove('hidden');
    updatePlayIcons(false);
  }

  function updatePlayIcons(isPlaying) {
    if (!toggleBtn) return;
    const playIcon = toggleBtn.querySelector('.icon-play');
    const pauseIcon = toggleBtn.querySelector('.icon-pause');
    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? 'none' : 'inline-block';
      pauseIcon.style.display = isPlaying ? 'inline-block' : 'none';
    }
  }

  if (overlayBtn) {
    overlayBtn.addEventListener('click', playVideo);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (video.paused) {
        playVideo();
      } else {
        pauseVideo();
      }
    });
  }

  video.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  video.addEventListener('ended', () => {
    pauseVideo();
  });

  // Ajuste do Slider de Volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      video.volume = val;
      if (val === 0) {
        video.muted = true;
      } else {
        video.muted = false;
        lastVolume = val;
      }
      updateSliderFill(val);
      updateSoundIcon(video.muted, val);
    });
  }

  // Controlo de Áudio (Mute / Unmute)
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.muted || video.volume === 0) {
        video.muted = false;
        const restoreVol = lastVolume > 0 ? lastVolume : 0.8;
        video.volume = restoreVol;
        if (volumeSlider) volumeSlider.value = restoreVol;
        updateSliderFill(restoreVol);
        updateSoundIcon(false, restoreVol);
      } else {
        lastVolume = video.volume;
        video.muted = true;
        if (volumeSlider) volumeSlider.value = 0;
        updateSliderFill(0);
        updateSoundIcon(true, 0);
      }
    });
  }

  // Pausar automaticamente quando o utilizador faz scroll para fora da secção do vídeo
  function checkVideoOffscreen() {
    if (video.paused) return;
    const target = card || video;
    const rect = target.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // O vídeo saiu do ecrã se:
    // - O fundo do vídeo subiu além do topo da janela (rolou para baixo)
    // - O topo do vídeo desceu além do fundo da janela (rolou para cima)
    const isOutOfScreen = (rect.bottom <= 80) || (rect.top >= vh - 40);
    if (isOutOfScreen) {
      pauseVideo();
    }
  }

  // Eventos diretos de scroll e touch para resposta instantânea
  window.addEventListener('scroll', checkVideoOffscreen, { passive: true });
  window.addEventListener('touchmove', checkVideoOffscreen, { passive: true });

  // Observador de intersecção como garantia adicional
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio === 0) {
          if (!video.paused) {
            pauseVideo();
          }
        }
      });
    }, {
      threshold: [0, 0.1]
    });

    videoObserver.observe(video);
    if (card) videoObserver.observe(card);
  }

  // Pausar se o utilizador trocar de aba ou minimizar a janela
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !video.paused) {
      pauseVideo();
    }
  });

  // Ação de pré-preenchimento para a cozinha
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      const selectType = document.getElementById('form-type');
      if (selectType) selectType.value = 'Marcenaria por Medida';
      const msgArea = document.getElementById('form-message');
      if (msgArea) {
        msgArea.value = 'Olá Zanotto! Vi o projeto da cozinha de sonho de Anna Joyce no vosso site e gostaria de agendar uma consulta para conceber uma cozinha de assinatura semelhante para a minha casa.';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. Controlos do Mapa & Copiar Coordenadas do Atelier
   -------------------------------------------------------------------------- */
function initMapControls() {
  const copyBtn = document.getElementById('copy-coords-btn');
  const copyText = document.getElementById('copy-coords-text');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const coords = '-8.9468535, 13.1982501';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(coords).then(() => {
        if (copyText) copyText.textContent = 'Coordenadas Copiadas! ✓';
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copiar Coordenadas';
        }, 3000);
      }).catch(() => {
        fallbackCopy(coords);
      });
    } else {
      fallbackCopy(coords);
    }
  });

  function fallbackCopy(text) {
    prompt('Coordenadas do Atelier Zanotto Interiores:', text);
  }
}

/* --------------------------------------------------------------------------
   8. Contadores Animados de Estatísticas (Efeito Count-Up Dinâmico)
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statsSection = document.getElementById('stats-banner');
  const statElements = document.querySelectorAll('.stat-number[data-counter]');
  if (!statsSection || !statElements.length) return;

  let isAnimating = false;
  let animationId = null;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function startCountUp() {
    if (isAnimating) return;
    isAnimating = true;

    const duration = 1800; // 1.8 segundos com aceleração e desaceleração suave
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      statElements.forEach(el => {
        const target = parseFloat(el.getAttribute('data-counter')) || 0;
        const countValEl = el.querySelector('.count-value');
        if (!countValEl) return;

        const currentVal = target * eased;

        if (el.getAttribute('data-format') === 'thousands') {
          const rounded = Math.round(currentVal);
          countValEl.textContent = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else if (el.getAttribute('data-pad')) {
          const padLength = parseInt(el.getAttribute('data-pad'), 10) || 2;
          countValEl.textContent = String(Math.round(currentVal)).padStart(padLength, '0');
        } else {
          countValEl.textContent = Math.round(currentVal);
        }
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    }

    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animate);
  }

  function resetCounters() {
    if (animationId) cancelAnimationFrame(animationId);
    isAnimating = false;
    statElements.forEach(el => {
      const countValEl = el.querySelector('.count-value');
      if (!countValEl) return;
      if (el.getAttribute('data-pad')) {
        countValEl.textContent = '00';
      } else {
        countValEl.textContent = '0';
      }
    });
  }

  // IntersectionObserver para disparar sempre que a secção entra no campo de visão
  let hasBeenVisible = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resetCounters();
        startCountUp();
        hasBeenVisible = true;
      } else if (hasBeenVisible) {
        resetCounters();
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -40px 0px'
  });

  observer.observe(statsSection);
}

