class StatsCounter {
  constructor(elements, options = {}) {
    this.statElements = elements;
    this.options = {
      duration: options.duration || 2000,
      delay: options.delay || 0,
      easing: options.easing || 'easeOutExpo'
    };
    
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    this.statElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  animate(element) {
    const countTo = parseInt(element.dataset.count, 10);
    const startTime = performance.now();
    const duration = this.options.duration;
    
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        const progress = this.easing(elapsedTime / duration);
        const currentCount = Math.floor(countTo * progress);
        element.textContent = currentCount;
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = countTo;
      }
    };
    
    setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, this.options.delay);
  }
  
  easing(t) {
    // easeOutExpo
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length) {
    new StatsCounter(statNumbers, {
      duration: 2500,
      delay: 300
    });
  }
}); 