/**
 * Main JavaScript File - Flagpole Inspired
 * Contains core functionality for the website
 */

// Custom Cursor - REMOVED (CSS was commented out)
// const cursor = document.createElement('div');
// cursor.classList.add('custom-cursor');
// document.body.appendChild(cursor);
// 
// document.addEventListener('mousemove', (e) => {
//     cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
// });

// Smooth Scroll - REMOVED (Duplicate logic below with header offset)
// document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         target.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// });

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project Filter Animations - REMOVED (Likely handled by Isotope in filters.js)
// const filterProjects = (category) => {
//     const projects = document.querySelectorAll('.project-card');
//     
//     projects.forEach(project => {
//         const projectCategories = project.dataset.category.split(' ');
//         
//         if (category === 'all' || projectCategories.includes(category)) {
//             project.style.opacity = '0';
//             setTimeout(() => {
//                 project.style.display = 'block';
//                 project.style.opacity = '1';
//             }, 300);
//         } else {
//             project.style.opacity = '0';
//             setTimeout(() => {
//                 project.style.display = 'none';
//             }, 300);
//         }
//     });
// };

document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader once page is loaded
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 300);
        }, 500);
    }
    
    // Navigation toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
    }
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        // Add scrolled class to navigation
        const nav = document.querySelector('.main-nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        // Update scroll progress bar
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        if (scrollProgress) {
            const scrollPx = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = `${(scrollPx / windowHeight) * 100}%`;
            scrollProgress.style.width = scrolled;
        }
        
        // Fade in elements when they become visible
        const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    });
    
    // Trigger scroll event initially to set initial states
    window.dispatchEvent(new Event('scroll'));
    
    // Project card modal
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.querySelector('.modal__title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal__close');
    
    if (projectCards.length && projectModal && modalClose) {
        projectCards.forEach(card => {
            const viewProjectBtn = card.querySelector('.view-project');
            if (viewProjectBtn) {
                viewProjectBtn.addEventListener('click', function() {
                    const imgSrc = card.getAttribute('data-modal-img-src');
                    const title = card.querySelector('h4').textContent;
                    const category = card.querySelector('.category-tag').textContent;
                    const description = card.querySelector('.short-desc').textContent;
                    
                    // Set modal content
                    modalTitle.textContent = title;
                    modalImage.src = imgSrc || '';
                    modalImage.alt = title;
                    
                    // Build modal content
                    modalContent.innerHTML = `
                        <p class="category-tag">${category}</p>
                        <p>${description}</p>
                        <p>This is a placeholder for full project details. In a real implementation, each project would have its own detailed case study with comprehensive information about the design process, challenges, solutions, and outcomes.</p>
                    `;
                    
                    // Show modal
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        });
        
        // Close modal
        modalClose.addEventListener('click', function() {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside content
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('show')) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('show');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Helper function to check if an element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Helper function to add simple parallax effect
function createParallaxEffect() {
    document.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.3;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Update current year in footer
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
} 