        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize progress bars with animation
            const progressBars = document.querySelectorAll('.progress');
            setTimeout(() => {
                progressBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 300);
                });
            }, 500);
            
            // Bio scroll indicator logic
            const bioCard = document.querySelector('.bio-text');
            const scrollIndicator = document.getElementById('bioScroll');
            
            // Check if bio content needs scroll indicator
            function checkBioScroll() {
                if (bioCard.scrollHeight > bioCard.clientHeight) {
                    scrollIndicator.classList.add('visible');
                } else {
                    scrollIndicator.classList.remove('visible');
                }
            }
            
            // Run on load and resize
            checkBioScroll();
            window.addEventListener('resize', checkBioScroll);
            
            // Smooth scroll on click
            scrollIndicator.addEventListener('click', () => {
                bioCard.scrollTop += 50;
                if (bioCard.scrollTop + bioCard.clientHeight >= bioCard.scrollHeight - 10) {
                    scrollIndicator.classList.remove('visible');
                }
            });
            
            // Tech item hover animations
            const techItems = document.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.addEventListener('mouseover', () => {
                    const others = Array.from(techItems).filter(i => i !== item);
                    others.forEach(other => {
                        other.style.opacity = '0.6';
                        other.style.transform = 'scale(0.95)';
                    });
                });
                
                item.addEventListener('mouseout', () => {
                    techItems.forEach(other => {
                        other.style.opacity = '1';
                        other.style.transform = '';
                    });
                });
            });
            
// Retrigger typing animation on view
const typingText = document.querySelector('.typing-text');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typingText.style.animation = 'none';
            setTimeout(() => {
                typingText.style.animation = 'blink 0.7s infinite, typing 3.5s steps(30) 1 forwards';
            }, 10);
        }
    });
}, { threshold: 0.5 });

observer.observe(typingText);
});

 // Add intersection observer for scroll animations
 const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

let currentImageIndex = 0;
let certificateImages = [];

// Initialize certificate gallery
document.addEventListener('DOMContentLoaded', function() {
    // Collect all certificate images
    certificateImages = Array.from(document.querySelectorAll('.cert-img'));
    
    // Add click handlers to each certificate
    certificateImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    const img = certificateImages[index];
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'cert-lightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-container">
            <img class="lightbox-image" src="${img.src}" alt="${img.alt}">
            <div class="cert-title">${img.alt}</div>
            <div class="lightbox-controls">
                <button class="lightbox-btn" onclick="previousImage()" ${index === 0 ? 'disabled' : ''}>
                    ←
                </button>
                <span class="image-counter">${index + 1} / ${certificateImages.length}</span>
                <button class="lightbox-btn" onclick="nextImage()" ${index === certificateImages.length - 1 ? 'disabled' : ''}>
                    →
                </button>
            </div>
        </div>
        <button class="close-btn" onclick="closeLightbox()">×</button>
    `;
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    document.body.appendChild(lightbox);
}

function closeLightbox() {
    const lightbox = document.querySelector('.cert-lightbox');
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
    
    // Remove keyboard listener and restore scroll
    document.removeEventListener('keydown', handleKeyPress);
    document.body.style.overflow = '';
}

function nextImage() {
    if (currentImageIndex < certificateImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
    }
}

function previousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    const img = certificateImages[currentImageIndex];
    const lightboxImg = document.querySelector('.lightbox-image');
    const title = document.querySelector('.cert-title');
    const counter = document.querySelector('.image-counter');
    const prevBtn = document.querySelector('.lightbox-btn');
    const nextBtn = document.querySelectorAll('.lightbox-btn')[1];
    
    // Fade out
    lightboxImg.style.opacity = '0.5';
    
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        title.textContent = img.alt;
        counter.textContent = `${currentImageIndex + 1} / ${certificateImages.length}`;
        
        // Update button states
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === certificateImages.length - 1;
        
        // Fade in
        lightboxImg.style.opacity = '1';
    }, 150);
}

function handleKeyPress(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            previousImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
}