// Update current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
      
      // Scroll to top when clicked
      backToTopButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Dark mode toggle functionality
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        
        // Here you would toggle between dark and light theme CSS
        // For demonstration, we're just toggling the class
        document.body.classList.toggle('light-mode');
        
        // Update icon
        const toggleIcon = darkModeToggle.querySelector('i');
        if (toggleIcon) {
          if (this.classList.contains('active')) {
            toggleIcon.className = 'fas fa-moon';
          } else {
            toggleIcon.className = 'fas fa-sun';
          }
        }
        
        // Save preference to localStorage
        const isDarkMode = this.classList.contains('active');
        localStorage.setItem('darkMode', isDarkMode);
      });
      
      // Check for saved user preference
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        const isDarkMode = savedDarkMode === 'true';
        
        // Set initial state
        darkModeToggle.classList.toggle('active', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
        
        // Update icon
        const toggleIcon = darkModeToggle.querySelector('i');
        if (toggleIcon) {
          toggleIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
        }
      }
    }
  
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
          // Here you would typically send the email to your server
          // For demonstration, we'll just show a success message
          
          // Create success message
          const successMessage = document.createElement('div');
          successMessage.textContent = 'Thank you for subscribing!';
          successMessage.style.color = '#a29bfe';
          successMessage.style.marginTop = '10px';
          successMessage.style.fontSize = '0.9rem';
          
          // Clear the form and append message
          emailInput.value = '';
          this.appendChild(successMessage);
          
          // Remove success message after 3 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }
      });
    }
  
    // Add smooth scrolling to all footer links
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-links-bottom a');
    
    footerLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only apply smooth scroll to anchor links
        if (href.startsWith('#') && href !== '#') {
          e.preventDefault();
          
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add hover effect to animated shapes
    const shapes = document.querySelectorAll('.circle-shape, .square-shape, .triangle-shape');
    
    shapes.forEach(shape => {
      shape.addEventListener('mouseover', function() {
        this.style.animationPlayState = 'paused';
      });
      
      shape.addEventListener('mouseout', function() {
        this.style.animationPlayState = 'running';
      });
    });
  });