export function initScript() {
    // Common DOM elements
    const navbarCenter = document.getElementById("navbar-center");
    const hero = document.querySelector(".hero") || document.getElementById("hero");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");
    
    // Theme toggle elements
    const navbarThemeToggle = document.getElementById("navbar-theme-toggle");
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
    const heroThemeToggle = document.getElementById("hero-theme-toggle");
    
    // Theme toggle icons
    const navbarMoonIcon = document.getElementById("navbar-moon-icon");
    const navbarSunIcon = document.getElementById("navbar-sun-icon");
    const mobileMoonIcon = document.getElementById("mobile-moon-icon");
    const mobileSunIcon = document.getElementById("mobile-sun-icon");
    const heroMoonIcon = document.getElementById("hero-moon-icon");
    const heroSunIcon = document.getElementById("hero-sun-icon");
    
    if (!navbarCenter || !hero || !mobileMenuBtn || !mobileDropdown || !mobileMenuOverlay) return;
    
    let menuOpen = false;
    
    // ===== SCROLL FUNCTIONALITY =====
    function handleScroll() {
        const hero = document.querySelector(".hero") || document.getElementById("hero");
        const navbarCenter = document.getElementById("navbar-center");
        const additionalBtn = document.querySelector('.additional-link-btn');
        
        if (!hero || !navbarCenter) return;
        
        // Handle navbar sticky behavior
        if (window.pageYOffset > 16) {
            navbarCenter.classList.add('sticky');
        } else {
            navbarCenter.classList.remove('sticky');
        }
        
        // Calculate hero bottom position
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const currentScroll = window.pageYOffset;
        
        // Show/hide additional button based on scroll position
        if (currentScroll > heroBottom) {
            navbarCenter.classList.add('scrolled');
            
            // Only show button on desktop/tablet (not mobile)
            if (additionalBtn && window.innerWidth > 768) {
                additionalBtn.style.display = 'inline-block';
                additionalBtn.style.visibility = 'visible';
                additionalBtn.style.opacity = '1';
            }
        } else {
            navbarCenter.classList.remove('scrolled');
            
            // Hide button when not scrolled past hero
            if (additionalBtn) {
                additionalBtn.style.display = 'none';
                additionalBtn.style.visibility = 'hidden';
                additionalBtn.style.opacity = '0';
            }
        }
        
        // Add active class to nav items based on scroll position
        setActiveNavItem();
    }
    
    // Enhanced resize handler
    window.addEventListener('resize', function() {
        const additionalBtn = document.querySelector('.additional-link-btn');
        const navbarCenter = document.getElementById("navbar-center");
        
        if (additionalBtn && navbarCenter) {
            if (window.innerWidth <= 768) {
                // Always hide on mobile
                additionalBtn.style.display = 'none';
                additionalBtn.style.visibility = 'hidden';
                additionalBtn.style.opacity = '0';
            } else if (navbarCenter.classList.contains('scrolled')) {
                // Show on desktop if scrolled past hero
                additionalBtn.style.display = 'inline-block';
                additionalBtn.style.visibility = 'visible';
                additionalBtn.style.opacity = '1';
            }
        }
        
        // Close mobile menu if open when resizing to desktop
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });
    
    // Throttled scroll event
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    }, false);
    
    // Function to set active class to navigation items based on scroll position
    function setActiveNavItem() {
        if (!sections || !navLinks) return;
        
        const scrollPosition = window.scrollY + 100; // Offset to trigger slightly before reaching section
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });
                
                // Add active class to corresponding nav links
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add("active");
                });
            }
        });
    }
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    function toggleMenu() {
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            mobileDropdown.classList.add('active');
            mobileMenuOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            mobileMenuBtn.innerHTML = '✕';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileDropdown.classList.remove('active');
            mobileMenuOverlay.style.display = 'none';
            document.body.style.overflow = '';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    // ===== THEME TOGGLE FUNCTIONALITY =====
    function toggleTheme() {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            setIconsForLightMode();
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            setIconsForDarkMode();
            localStorage.setItem('theme', 'dark');
        }
    }
    
    function setIconsForDarkMode() {
        if (!navbarMoonIcon || !navbarSunIcon) return;
        
        // Navbar icons
        navbarMoonIcon.style.display = 'none';
        navbarSunIcon.style.display = 'block';
        // Mobile icons
        if (mobileMoonIcon && mobileSunIcon) {
            mobileMoonIcon.style.display = 'none';
            mobileSunIcon.style.display = 'block';
        }
        // Hero icons
        if (heroMoonIcon && heroSunIcon) {
            heroMoonIcon.style.display = 'none';
            heroSunIcon.style.display = 'block';
        }
    }
    
    function setIconsForLightMode() {
        if (!navbarMoonIcon || !navbarSunIcon) return;
        
        // Navbar icons
        navbarMoonIcon.style.display = 'block';
        navbarSunIcon.style.display = 'none';
        // Mobile icons
        if (mobileMoonIcon && mobileSunIcon) {
            mobileMoonIcon.style.display = 'block';
            mobileSunIcon.style.display = 'none';
        }
        // Hero icons
        if (heroMoonIcon && heroSunIcon) {
            heroMoonIcon.style.display = 'block';
            heroSunIcon.style.display = 'none';
        }
    }
    
    // Function to detect system color scheme preference
    function getSystemThemePreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Watch for system theme preference changes
    function watchSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Check if the mediaQuery.addEventListener method is supported (not supported in some older browsers)
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', (e) => {
                    // Only apply system changes if user hasn't manually set a theme
                    if (!localStorage.getItem('theme')) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        document.documentElement.setAttribute('data-theme', newTheme);
                        
                        if (newTheme === 'dark') {
                            setIconsForDarkMode();
                        } else {
                            setIconsForLightMode();
                        }
                    }
                });
            } else if (mediaQuery.addListener) {
                // Fallback for older browsers
                mediaQuery.addListener((e) => {
                    if (!localStorage.getItem('theme')) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        document.documentElement.setAttribute('data-theme', newTheme);
                        
                        if (newTheme === 'dark') {
                            setIconsForDarkMode();
                        } else {
                            setIconsForLightMode();
                        }
                    }
                });
            }
        }
    }
    
    // Initialize theme from localStorage or system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // User has manually set a preference, use that
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                setIconsForDarkMode();
            } else {
                setIconsForLightMode();
            }
        } else {
            // No user preference saved, use system preference
            const systemTheme = getSystemThemePreference();
            document.documentElement.setAttribute('data-theme', systemTheme);
            
            if (systemTheme === 'dark') {
                setIconsForDarkMode();
            } else {
                setIconsForLightMode();
            }
        }
    }
    
    // ===== PARTICLES.JS CONFIGURATION =====
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#1E88E5"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#1E88E5",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // ===== HERO ANIMATION =====
    function animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // ===== EVENT LISTENERS =====
    
    // Mobile menu events
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) toggleMenu();
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const additionalBtn = document.querySelector('.additional-link-btn');
        if (additionalBtn) {
            if (window.innerWidth <= 768) {
                additionalBtn.style.display = 'none';
            } else if (navbarCenter.classList.contains('scrolled')) {
                additionalBtn.style.display = 'inline-block';
            }
        }
        
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme toggle event listeners
    if (navbarThemeToggle) navbarThemeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
    if (heroThemeToggle) heroThemeToggle.addEventListener('click', toggleTheme);
    
    // ===== INITIALIZATION =====
    
    // Initialize navbar
    handleScroll();
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Initialize theme
    initTheme();
    
    // Start watching for system theme changes
    watchSystemThemeChanges();
    
    // Set initial active class on navigation
    setActiveNavItem();
    
    // Initialize particles
    initParticles();
    
    // Animate hero elements
    animateHeroElements();
}