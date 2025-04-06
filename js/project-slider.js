// Project slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.featured-projects-slider');
  if (!slider) return;
  
  const slides = Array.from(slider.querySelectorAll('.project-slide'));
  const slideCount = slides.length;
  
  // Skip if no slides
  if (slideCount === 0) return;
  
  let currentSlide = 0;
  let autoplayTimer;
  const autoplayDelay = 5000; // 5 seconds
  let isTransitioning = false;
  
  // Initialize slider with navigation
  function initSlider() {
    // --- Accessibility Setup ---
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-roledescription', 'carousel');
    slider.setAttribute('aria-label', 'Featured Projects');
    
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${slideCount}`);
      slide.style.transform = `translateX(${100 * index}%)`; // Initial position off-screen except first
    });
    // --- End Accessibility Setup ---
    
    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'slider-navigation';
    
    // Create navigation buttons
    const navHTML = `
      <button class=\"slider-btn slider-prev\" aria-label=\"Previous slide\">←</button> <!-- TODO: Replace arrow with icon -->
      <div class=\"slider-dots\"></div>
      <button class=\"slider-btn slider-next\" aria-label=\"Next slide\">→</button> <!-- TODO: Replace arrow with icon -->
    `;
    navContainer.innerHTML = navHTML;
    slider.after(navContainer);
    
    // Create navigation dots
    const dotsContainer = navContainer.querySelector('.slider-dots');
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('data-index', index);
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dotsContainer.appendChild(dot);
    });
    
    // Add event listeners
    navContainer.querySelector('.slider-prev').addEventListener('click', () => {
      if (!isTransitioning) prevSlide();
    });
    
    navContainer.querySelector('.slider-next').addEventListener('click', () => {
      if (!isTransitioning) nextSlide();
    });
    
    navContainer.querySelectorAll('.slider-dot').forEach(dot => {
      dot.addEventListener('click', function() {
        if (!isTransitioning) {
          goToSlide(parseInt(this.getAttribute('data-index')));
        }
      });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!isTransitioning) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      }
    });
    
    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
      if (isTransitioning) return;
      
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
    
    // Start with first slide
    goToSlide(0);
    
    // Set up autoplay
    startAutoplay();
    
    // Pause autoplay on hover/focus
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);
  }
  
  // Navigation functions
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Handle wrapping
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    // Update current slide index
    currentSlide = index;
    
    // Update slides with animation
    slides.forEach((slide, i) => {
      slide.style.transition = 'transform 0.6s ease';
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
      // --- Accessibility: Update aria-hidden ---
      slide.setAttribute('aria-hidden', i !== currentSlide ? 'true' : 'false');
      // --- End Accessibility ---
      
      // Remove transition after animation completes
      slide.addEventListener('transitionend', function handler() {
        slide.style.transition = '';
        slide.removeEventListener('transitionend', handler);
        isTransitioning = false;
      }, { once: true });
    });
    
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-current', i === currentSlide ? 'true' : 'false');
    });
  }
  
  // Autoplay functions
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }
  
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  // Initialize the slider
  initSlider();
}); 