document.addEventListener('DOMContentLoaded', function() {
   // Enhanced preloader with minimum display time
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const minimumDisplayTime = 1500; // 1.5 seconds minimum
    
    const loadTime = Math.max(minimumDisplayTime - performance.now(), 0);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, loadTime);
});
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Gallery lightbox (would need additional HTML/CSS for full implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this would open a lightbox/modal
            // with the clicked image enlarged
            console.log('Gallery item clicked - would open lightbox in full implementation');
        });
    });
    
    // Project/Event card hover effects are handled by CSS
    // Rotary wheel animations are handled by CSS
    
    // Scroll reveal animation (would need additional library or implementation)
    // For a simple implementation, we can add a class when elements are in view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .about-image, .project-card, .event-card, .gallery-item, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .about-image, .project-card, .event-card, .gallery-item, .contact-info, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
});
// Update your existing filter code in demo.js
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.members-filter .filter-btn');
    const memberCards = document.querySelectorAll('.member-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filter members based on data-category
            memberCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const memberCategory = card.getAttribute('data-category');
                    if (memberCategory.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow');

    slideshows.forEach(slideshow => {
        const items = slideshow.querySelectorAll('.slideshow-item');
        
        // If there's only one item, show it and skip the slideshow logic
        if (items.length <= 1) {
            if (items.length === 1) {
                items[0].style.opacity = '1';
                if (items[0].tagName === 'VIDEO') {
                    items[0].play().catch(error => {
                        console.log('Video play failed:', error);
                    });
                }
            }
            return;
        }

        let currentIndex = 0;

        // Show the first item initially
        items[currentIndex].style.opacity = '1';

        // Function to cycle through items
        const showNextItem = () => {
            // Fade out the current item
            items[currentIndex].style.opacity = '0';

            // Move to the next item
            currentIndex = (currentIndex + 1) % items.length;

            // Fade in the next item
            items[currentIndex].style.opacity = '1';
        };

        // Cycle every 3 seconds
        setInterval(showNextItem, 3000);

        // Handle video playback
        const updateVideos = () => {
            items.forEach(item => {
                const opacity = window.getComputedStyle(item).opacity;
                if (item.tagName === 'VIDEO') {
                    if (opacity > 0) {
                        item.play().catch(error => {
                            console.log('Video play failed:', error);
                        });
                    } else {
                        item.pause();
                    }
                }
            });
        };

        // Run the update function every 100ms to check visibility
        setInterval(updateVideos, 100);
        updateVideos();
    });
});