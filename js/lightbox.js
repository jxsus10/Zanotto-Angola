/**
 * ZANOTTO INTERIORES — LIGHTBOX & VISUALIZADOR DE PROJETOS
 */

const projectData = {
  'project-1': {
    title: 'Living Room com Ripado & Iluminação Cénica',
    category: 'Residencial & Marcenaria',
    location: 'Talatona, Luanda',
    year: '2026',
    materials: 'Madeira Muirapiranga ripada, fita LED 3000K, espelho bronze e veludo mostarda.',
    description: 'Conceito desenvolvido para valorizar o espaço de convivência familiar com calor e sofisticação. O ripado em madeira nobre integra perfeitamente a televisão e as prateleiras flutuantes com retroiluminação suave. As poltronas curvas e a mesa espelhada completam a atmosfera acolhedora.',
    mediaType: 'image',
    mediaSrc: 'assets/images/living-wood-slats.jpg'
  },
  'project-2': {
    title: 'Consola Flutuante Minimalista & Espelhos Bronze',
    category: 'Residencial & Marcenaria',
    location: 'Miramar, Luanda',
    year: '2026',
    materials: 'Laca acetinada areia, vidro reflecta bronze, estrutura metálica e latão escovado.',
    description: 'Estética purista com forte presença arquitetónica. O painel traseiro tonalizado amplia o campo de visão da sala através de espelhos de piso ao teto. O móvel ripado suspenso confere leveza visual e acomoda com discrição todos os equipamentos multimédia.',
    mediaType: 'image',
    mediaSrc: 'assets/images/minimal-fluted-tv.jpg'
  },
  'project-3': {
    title: 'Refúgio Bouclé & Geometria Angolana',
    category: 'Residencial',
    location: 'Nova Vida, Luanda',
    year: '2025',
    materials: 'Tecido Bouclé natural, madeira maciça torneada, iluminação perimetral e tapeçaria artesanal.',
    description: 'Um recanto de contemplação intimista. Combina o conforto tátil das poltronas circulares em bouclé com mesinhas em toras de madeira e um espelho semicircular retroiluminado. O tapete apresenta linhas geométricas discretas inspiradas na tradição têxtil de Angola reinterpretada de forma contemporânea.',
    mediaType: 'image',
    mediaSrc: 'assets/images/boucle-reading-nook.jpg'
  },
  'project-4': {
    title: 'Móvel de TV em Pedra Marmorizada & Cinza Grafite',
    category: 'Residencial & Marcenaria',
    location: 'Ilha de Luanda',
    year: '2025',
    materials: 'Pedra sinterizada Calacatta Grey, MDF hidrófugo grafite e sancas de luz indireta.',
    description: 'A força da pedra encontra a suavidade da iluminação linear. O painel em grande formato com veios naturais cria um ponto focal de autoridade e requinte, complementado por ripas verticais em cinza grafite e um sofá modular generoso.',
    mediaType: 'image',
    mediaSrc: 'assets/images/marble-cove-tv.jpg'
  },
  'project-5': {
    title: 'A Cozinha de Sonho de Anna Joyce',
    category: 'Parceria de Assinatura • Residencial',
    location: 'Talatona, Luanda',
    year: '2026',
    materials: 'Mobiliário termoestruturado acetinado, bancadas em quartzo, ferragens Blum com fecho suave.',
    description: 'Projeto exclusivo desenvolvido em parceria com a cantora angolana Anna Joyce. Linhas limpas, torre de fornos embutida, iluminação linear cénica e península gourmet que alia sofisticação, afeto e funcionalidade no dia a dia.',
    mediaType: 'video',
    mediaSrc: 'assets/videos/anna-joyce-kitchen.mp4'
  },
  'project-6': {
    title: 'Sala de Reuniões Executiva Torre Luanda',
    category: 'Escritórios',
    location: 'Baía de Luanda',
    year: '2023',
    materials: 'Painéis acústicos microperfurados, mesa corporativa em nogueira e cadeiras ergonómicas.',
    description: 'Ambiente executivo de alta performance para tomadas de decisão estratégicas. Acústica impecável, calhas técnicas embutidas e iluminação antibrilho pensada para conforto visual contínuo durante reuniões prolongadas.',
    mediaType: 'image',
    mediaSrc: 'assets/images/office-boardroom.jpg'
  },
  'project-7': {
    title: 'Studio de Criação & Hub Colaborativo',
    category: 'Escritórios',
    location: 'Kinaxixi, Luanda',
    year: '2023',
    materials: 'Vidro acústico duplo, carvalho claro, divisórias metálicas minimalistas.',
    description: 'Conceito de open-space humanizado que estimula a criatividade e a concentração, com zonas de reunião rápida e estações de trabalho modulares que se adaptam ao crescimento da equipa.',
    mediaType: 'image',
    mediaSrc: 'assets/images/office-workspace.jpg'
  },
  'project-8': {
    title: 'Boutique & Lounge Comercial de Luxo',
    category: 'Comercial',
    location: 'Avenida 4 de Fevereiro, Luanda',
    year: '2023',
    materials: 'Travertino polido, expositores em latão e iluminação cénica pontual.',
    description: 'Espaço comercial desenhado para proporcionar uma jornada de compra exclusiva. O diálogo entre a pedra natural, a iluminação focada nos produtos e os móveis por medida eleva o valor percebido da marca.',
    mediaType: 'image',
    mediaSrc: 'assets/images/commercial-boutique.jpg'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const cards = document.querySelectorAll('.project-card');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-id');
      const data = projectData[projectId];
      if (data) {
        openLightbox(data);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Fechar ao clicar fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });

  function openLightbox(item) {
    const mediaContainer = document.getElementById('lightbox-media-container');
    const categoryEl = document.getElementById('lightbox-cat');
    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc');
    const locEl = document.getElementById('lightbox-location');
    const yearEl = document.getElementById('lightbox-year');
    const matEl = document.getElementById('lightbox-materials');
    const ctaBtn = document.getElementById('lightbox-cta-btn');

    if (item.mediaType === 'video') {
      mediaContainer.innerHTML = `
        <video controls autoplay loop playsinline style="max-height: 80vh; width: 100%;">
          <source src="${item.mediaSrc}" type="video/mp4">
          O seu navegador não suporta reprodução de vídeo.
        </video>
      `;
    } else {
      mediaContainer.innerHTML = `<img src="${item.mediaSrc}" alt="${item.title}" style="max-height: 80vh; width: 100%; object-fit: contain;">`;
    }

    categoryEl.textContent = item.category;
    titleEl.textContent = item.title;
    descEl.textContent = item.description;
    locEl.textContent = item.location;
    yearEl.textContent = item.year;
    matEl.textContent = item.materials;

    if (ctaBtn) {
      ctaBtn.onclick = () => {
        closeLightbox();
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const selectType = document.getElementById('form-type');
          if (selectType) {
            selectType.value = item.category.includes('Marcenaria') ? 'Marcenaria' : (item.category.includes('Escritórios') ? 'Escritórios' : 'Residencial');
          }
          const msgArea = document.getElementById('form-message');
          if (msgArea) {
            msgArea.value = `Gostei muito do projeto "${item.title}" e gostaria de solicitar um conceito semelhante para o meu espaço.`;
          }
        }
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const mediaContainer = document.getElementById('lightbox-media-container');
    if (mediaContainer) {
      mediaContainer.innerHTML = '';
    }
  }
});
