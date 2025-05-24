document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const formStatus = document.getElementById('formStatus');
  
  // Input validation
  const inputs = form.querySelectorAll('input, textarea, select');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Add validation styling on blur
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    
    input.addEventListener('input', () => {
      // Remove error styling when user starts typing again
      input.classList.remove('invalid');
      
      // Hide form status message when user starts interacting again
      formStatus.style.display = 'none';
    });
  });
  
  // Form submission handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all inputs before submission
    let isValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      showFormStatus('Please fill in all required fields correctly.', 'error');
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnText.classList.add('pulse-animation');
    
    // Collect form data
    const formData = {
      name: form.querySelector('#name').value,
      email: form.querySelector('#email').value,
      subject: form.querySelector('#subject').value,
      message: form.querySelector('#message').value
    };
    
    // Simulate API call with fetch
    try {
      // This is a simulation - in a real application, replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data:', formData);
      
      // Show success message
      showFormStatus('Your message has been sent successfully! I will get back to you soon.', 'success');
      form.reset();
      
      // Update button
      btnText.textContent = 'Sent!';
      btnText.classList.remove('pulse-animation');
      
      // Reset button after delay
      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
      }, 3000);
      
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
      showFormStatus('Something went wrong. Please try again later.', 'error');
      
      // Reset button state
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnText.classList.remove('pulse-animation');
    }
  });
  
  // Validate individual input
  function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.classList.add('invalid');
      return false;
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.classList.add('invalid');
        return false;
      }
    }
    
    input.classList.remove('invalid');
    return true;
  }
  
  // Display form status message
  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    formStatus.style.display = 'block';
    
    // Scroll to form status if not in view
    if (!isElementInViewport(formStatus)) {
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Add focus effect for form inputs
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
});