/**
 * Contact Form JavaScript
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }
      
      // Email validation
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Form data (for when you have a real backend)
      const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
      };
      
      // Simulate form submission with a delay
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Change button to loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate API call (replace with actual API call when you have a backend)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Show success message
        showNotification('Your message has been sent successfully!', 'success');
        
        // Log form data (for demonstration)
        console.log('Form submission:', formData);
      }, 1500);
    });
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Notification helper
  function showNotification(message, type = 'info') {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.className = 'notification-container';
      document.body.appendChild(notificationContainer);
      
      // Add styles if not already in CSS
      const style = document.createElement('style');
      style.textContent = `
        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        .notification {
          padding: 15px 20px;
          margin-bottom: 10px;
          border-radius: 4px;
          color: white;
          font-weight: 500;
          min-width: 280px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transform: translateX(100%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .notification.show {
          transform: translateX(0);
          opacity: 1;
        }
        .notification.info {
          background: var(--accent-primary, #4a6cf7);
        }
        .notification.success {
          background: #10B981;
        }
        .notification.error {
          background: #EF4444;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      
      // Remove from DOM after animation
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }
}); 