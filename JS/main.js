/**
 * ABC Optical Website JavaScript
 * Enhanced interactive functionality and user experience
 */

// Wait for DOM to fully load before executing
document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // Navigation & Header Functions
    // ============================
    
    const initNavigation = () => {
        const header = document.querySelector('header');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Toggle icon between menu and close
                const icon = hamburger.querySelector('i');
                icon.classList.contains('bx-menu') 
                    ? icon.classList.replace('bx-menu', 'bx-x')
                    : icon.classList.replace('bx-x', 'bx-menu');
            });
        }
        
        // Close mobile menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const icon = hamburger?.querySelector('i');
                if (icon && icon.classList.contains('bx-x')) {
                    icon.classList.replace('bx-x', 'bx-menu');
                }
            });
        });
        
        // Highlight active menu item based on scroll position
        const highlightActiveSection = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;
            
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            });
        };
        
        // Update header style on scroll
        const updateHeaderOnScroll = () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
                header.style.padding = '0.7rem 0';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.padding = '1.5rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        };
        
        // Attach scroll events
        window.addEventListener('scroll', () => {
            updateHeaderOnScroll();
            highlightActiveSection();
        });
        
        // Initialize on load
        updateHeaderOnScroll();
        highlightActiveSection();
    };
    
    // ============================
    // Smooth Scrolling
    // ============================
    
    const initSmoothScrolling = () => {
        const header = document.querySelector('header');
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return; // Skip if it's just "#"
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate offset based on header height
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // ============================
    // Animation Effects
    // ============================
    
    const initAnimations = () => {
        // Setup initial animation states
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .product-card, .team-card, .contact-card'
        );
        
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Reveal elements as they enter viewport
        const animateOnScroll = () => {
            const triggerBottom = window.innerHeight * 0.85;
            
            elementsToAnimate.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerBottom) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Add subtle hover animations to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
        
        // Run animation on load and scroll
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    };
    
    // ============================
    // Shop Functionality
    // ============================
    
    const initShopFeatures = () => {
        const viewMoreBtn = document.querySelector('.view-more .btn');
        
        if (viewMoreBtn) {
            let isLoadingMore = false;
            let page = 1;
            
            viewMoreBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                
                // Prevent multiple clicks while loading
                if (isLoadingMore) return;
                isLoadingMore = true;
                
                // Change button text to loading state
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                
                try {
                    // In a real implementation, this would be an API call
                    // For demonstration, we'll simulate loading delay
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    // Simulate adding new products
                    const productsGrid = document.querySelector('.products-grid');
                    
                    if (productsGrid && page < 1) { // Limit to 2 additional pages for demo
                        // Here you would normally append new products from API
                        // For demo, we'll duplicate existing products
                        const existingProducts = productsGrid.querySelectorAll('.product-card');
                        const productsToClone = Array.from(existingProducts).slice(0, 3); // Clone first 3
                        
                        productsToClone.forEach(product => {
                            const clone = product.cloneNode(true);
                            productsGrid.appendChild(clone);
                            
                            // Animate in the new products
                            clone.style.opacity = '0';
                            clone.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                clone.style.opacity = '1';
                                clone.style.transform = 'translateY(0)';
                            }, 100);
                        });
                        
                        page++;
                        
                        // If we've reached the limit, change button text
                        if (page >= 1) {
                            this.textContent = 'All Products Loaded';
                            this.disabled = true;
                            this.classList.add('disabled');
                        } else {
                            this.textContent = originalText;
                        }
                    } else {
                        this.textContent = 'All Products Loaded';
                        this.disabled = true;
                        this.classList.add('disabled');
                    }
                } catch (error) {
                    console.error('Error loading more products:', error);
                    this.textContent = 'Error Loading Products';
                    
                    // Reset after a delay
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }
                
                isLoadingMore = false;
            });
        }
    };
    
    // ============================
    // Back to Top Button
    // ============================
    
    const initBackToTopButton = () => {
        // Create the button element
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
        backToTopBtn.classList.add('back-to-top');
        document.body.appendChild(backToTopBtn);
        
        // Style the button with JS (alternatively could be in CSS)
        Object.assign(backToTopBtn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'var(--primary, #2a5caa)',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            zIndex: '999',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        });

        // Object.assign(backToTopBtn.innerHTML.style,{
            
        // });
        
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add hover effect
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.backgroundColor = 'var(--primary-dark, #1a3b6e)';
            backToTopBtn.style.transform = 'translateY(-3px)';
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.backgroundColor = 'var(--primary, #2a5caa)';
            backToTopBtn.style.transform = 'translateY(0)';
        });
    };
    
    // ============================
    // Performance Optimizations
    // ============================
    
    const optimizePerformance = () => {
        // Debounce function for scroll handlers
        const debounce = (func, wait = 10, immediate = true) => {
            let timeout;
            return function() {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        
        // Optimize scroll events
        const scrollHandlers = debounce(() => {
            // Call all scroll-based functions here
        });
        
        window.addEventListener('scroll', scrollHandlers);
        
        // Load non-critical resources after page load
        window.addEventListener('load', () => {
            // Here you could load additional resources like
            // custom fonts, analytics, etc.
        });
    };
    
    // ============================
    // Initialize All Features
    // ============================
    
    const initAll = () => {
        try {
            initNavigation();
            initSmoothScrolling();
            initAnimations();
            initShopFeatures();
            initBackToTopButton();
            optimizePerformance();
            
            console.log('ABC Optical website initialized successfully');
        } catch (err) {
            console.error('Error initializing website:', err);
        }
    };
    
    // Start initialization
    initAll();
});