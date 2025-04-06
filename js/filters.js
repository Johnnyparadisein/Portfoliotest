// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal__close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.querySelector('.modal__title');
  const modalDescription = document.getElementById('modal-content');
  
  // Exit if elements don't exist
  if (!portfolioGrid || !filterBtns.length) return;
  
  // Set first filter as active by default
  filterBtns[0].classList.add('active');
  
  // Initialize Isotope with error handling
  let iso;
  try {
    if (window.Isotope) {
      iso = new Isotope(portfolioGrid, {
        itemSelector: '.project-card',
        layoutMode: 'fitRows',
        fitRows: {
          gutter: 30
        },
        transitionDuration: '0.4s',
        hiddenStyle: {
          opacity: 0,
          transform: 'scale(0.8)'
        },
        visibleStyle: {
          opacity: 1,
          transform: 'scale(1)'
        }
      });
      
      // Layout Isotope after all images have loaded
      if (window.imagesLoaded) {
        imagesLoaded(portfolioGrid, function() {
          iso.layout();
        });
      } else {
        // Fallback if imagesLoaded is not available
        window.addEventListener('load', function() {
          iso.layout();
        });
      }
    }
  } catch (error) {
    console.warn('Isotope initialization failed:', error);
  }
  
  // Click handler for filter buttons
  filterBtns.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      if (iso) {
        // If Isotope is available, use it
        if (filterValue === 'all') {
          iso.arrange({ filter: '*' });
        } else {
          iso.arrange({ filter: `[data-category~="${filterValue}"]` });
        }
      } else {
        // Fallback to basic filtering with animation
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.opacity = '0';
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 400);
          }
        });
      }
    });
  });
  
  // Modal functionality
  function openModal(card) {
    const title = card.querySelector('h4').textContent;
    const description = card.querySelector('.short-desc').textContent;
    const imgSrc = card.getAttribute('data-modal-img-src') || card.querySelector('img').src;
    const category = card.querySelector('.category-tag').textContent;
    
    modalTitle.textContent = title;
    modalDescription.innerHTML = `
      <p class="category-tag">${category}</p>
      <p>${description}</p>
      <p>This is a placeholder for full project details. In a real implementation, each project would have its own detailed case study with comprehensive information about the design process, challenges, solutions, and outcomes.</p>
    `;
    modalImage.src = imgSrc;
    modalImage.alt = title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    firstFocusable.focus();
    
    function handleTabKey(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    }
    
    modal.addEventListener('keydown', handleTabKey);
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
  
  // Setup modal triggers
  if (modal) {
    portfolioGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.project-card');
      if (card && (event.target.classList.contains('view-project') || event.target.closest('.view-project'))) {
        openModal(card);
      }
    });
    
    // Close modal events
    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
}); 