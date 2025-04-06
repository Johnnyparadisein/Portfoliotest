// Typing effect for hero heading (Kept from original enhanced-ui.js)
document.addEventListener('DOMContentLoaded', function() {
  const heroHeading = document.querySelector('#hero .typing-container'); // Target the specific h1
  
  if (heroHeading) {
    // Clear existing content before typing
    heroHeading.innerHTML = ''; 
    const text = "I'm John Kvezereli,\nExperienced Designer"; // Text to type
    let index = 0;
    
    function type() {
      if (index < text.length) {
        let char = text.charAt(index);
        // Handle newline characters properly
        if (char === '\n') {
          heroHeading.innerHTML += '<br>';
        } else {
          heroHeading.innerHTML += char;
        }
        index++;
        // Add cursor effect while typing
        heroHeading.innerHTML = heroHeading.innerHTML.replace('<span class=\"cursor-blink\">|</span>', '') + '<span class=\"cursor-blink\">|</span>'; 
        setTimeout(type, 50); // Typing speed
      } else {
        // Remove cursor when done typing, or keep blinking
        // heroHeading.innerHTML = heroHeading.innerHTML.replace('<span class=\"cursor-blink\">|</span>', '');
        // Optional: Add a class when done if needed for further styling/logic
        heroHeading.classList.add('typing-done'); 
      }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500); 
  }
}); 