// Process section interactivity
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    const processSection = document.getElementById('process');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const progressIndicator = document.querySelector('.progress-indicator');
    const totalSteps = processSteps.length;
    
    let currentStepIndex = 0;
    
    // Set first step as active by default
    processSteps[0].classList.add('active');
    updateProgressBar();
    
    // Click handlers for step headers
    processSteps.forEach((step, index) => {
      const header = step.querySelector('.step-header');
      
      header.addEventListener('click', function() {
        setActiveStep(index);
      });
    });
    
    // Next/Previous buttons
    nextButton.addEventListener('click', function() {
      if (currentStepIndex < totalSteps - 1) {
        setActiveStep(currentStepIndex + 1);
      }
    });
    
    prevButton.addEventListener('click', function() {
      if (currentStepIndex > 0) {
        setActiveStep(currentStepIndex - 1);
      }
    });
    
    // Function to set active step
    function setActiveStep(index) {
      if (index < 0 || index >= totalSteps) return;
      
      processSteps.forEach(step => step.classList.remove('active'));
      processSteps[index].classList.add('active');
      currentStepIndex = index;
      
      // Scroll to the active step with animation
      processSteps[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
      
      updateProgressBar();
      updateButtonStates();
    }
    
    // Update progress bar
    function updateProgressBar() {
      const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
      progressIndicator.style.width = `${progressPercentage}%`;
    }
    
    // Update button states (disable when at start/end)
    function updateButtonStates() {
      prevButton.disabled = currentStepIndex === 0;
      prevButton.style.opacity = currentStepIndex === 0 ? "0.5" : "1";
      
      nextButton.disabled = currentStepIndex === totalSteps - 1;
      nextButton.style.opacity = currentStepIndex === totalSteps - 1 ? "0.5" : "1";
    }
    
    // Initialize button states
    updateButtonStates();
    
    // Mobile touch support
    let touchStartY = 0;
    let touchEndY = 0;
    
    processSection.addEventListener('touchstart', e => {
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    processSection.addEventListener('touchend', e => {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const verticalThreshold = 50; // Increased threshold for better detection
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) < verticalThreshold) return;
      
      if (deltaY > 0) {
        // Swipe up - show next step
        if (currentStepIndex < totalSteps - 1) {
          setActiveStep(currentStepIndex + 1);
        }
      } else {
        // Swipe down - show previous step
        if (currentStepIndex > 0) {
          setActiveStep(currentStepIndex - 1);
        }
      }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentStepIndex < totalSteps - 1) {
          setActiveStep(currentStepIndex + 1);
        }
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentStepIndex > 0) {
          setActiveStep(currentStepIndex - 1);
        }
      }
    });
    
    // Add animation effects on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe each process step
    processSteps.forEach(step => {
      observer.observe(step);
    });
    
    // Add hover effect on steps
    processSteps.forEach(step => {
      step.addEventListener('mouseenter', function() {
        if (!step.classList.contains('active')) {
          step.querySelector('.step-header').style.transform = 'translateX(5px)';
        }
      });
      
      step.addEventListener('mouseleave', function() {
        if (!step.classList.contains('active')) {
          step.querySelector('.step-header').style.transform = 'translateX(0)';
        }
      });
    });
});