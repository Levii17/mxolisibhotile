document.addEventListener('DOMContentLoaded', function() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    // Check if device is mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // Mobile click behavior
        benefitCards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle current card
                const isActive = this.classList.contains('active');
                
                // Close all cards
                benefitCards.forEach(otherCard => {
                    otherCard.classList.remove('active');
                });
                
                // If card wasn't active before, activate it
                if (!isActive) {
                    this.classList.add('active');
                }
            });
        });
        
        // Close cards when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.benefit-card')) {
                benefitCards.forEach(card => {
                    card.classList.remove('active');
                });
            }
        });
    } else {
        // Desktop hover behavior
        benefitCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    // Add staggered animation for cards
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Initialize Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add delay based on card index
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add subtle parallax effect on mouse move (desktop only)
    if (!isMobile) {
        const section = document.querySelector('.benefits-section');
        
        section.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { left, top, width, height } = section.getBoundingClientRect();
            
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            benefitCards.forEach(card => {
                const depth = parseFloat(card.getAttribute('data-depth') || 0.05);
                const translateX = x * 10 * depth;
                const translateY = y * 10 * depth;
                
                card.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
            });
        });
        
        section.addEventListener('mouseleave', function() {
            benefitCards.forEach(card => {
                card.style.transform = 'translateX(0) translateY(0)';
            });
        });
    }
});