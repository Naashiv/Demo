// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active nav link
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll to section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight current section in nav while scrolling
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if section is mostly in view
        if (rect.top <= 100 && rect.bottom >= 100) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Handle both #id and id.html links
                if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `${id}.html`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            hamburger.style.transform = isActive ? 'rotate(360deg)' : 'rotate(0deg)';
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.style.transform = 'rotate(0deg)';
            });
        });

        // Handle resize to ensure correct state if menu is open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active'); // Close mobile menu if resized to desktop
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Dynamic progress circle animation for fingerprints
    const fingerprintItems = document.querySelectorAll('.fingerprint-item');
    fingerprintItems.forEach(item => {
        const percent = parseFloat(item.getAttribute('data-percent')); // Ensure it's a number
        const progressCircle = item.querySelector('.progress-circle');
        const progress = item.querySelector('.progress');
        
        if (progress && progressCircle) {
            // Get the actual rendered width of the progress circle container
            const circleContainerWidth = progressCircle.offsetWidth;
            // Get the computed stroke-width of the progress circle.
            const strokeWidth = parseFloat(window.getComputedStyle(progress).strokeWidth);
            
            // Calculate the radius based on container width and stroke width
            // r = (container_width - stroke_width) / 2
            const radius = (circleContainerWidth - strokeWidth) / 2;
            
            // Set cx and cy dynamically for correct centering
            const centerX = circleContainerWidth / 2;
            const centerY = circleContainerWidth / 2;
            progress.setAttribute('cx', centerX);
            progress.setAttribute('cy', centerY);
            progress.setAttribute('r', radius); // Update r attribute dynamically
            
            // Also update background circle
            const backgroundCircle = item.querySelector('.background');
            if (backgroundCircle) {
                backgroundCircle.setAttribute('cx', centerX);
                backgroundCircle.setAttribute('cy', centerY);
                backgroundCircle.setAttribute('r', radius);
            }

            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - percent / 100);
            
            progress.style.strokeDasharray = `${circumference} ${circumference}`;
            progress.style.strokeDashoffset = circumference;
            
            setTimeout(() => {
                progress.style.strokeDashoffset = offset;
            }, 300);
        }
    });

    // Make repository boxes clickable
    const repositoryBoxes = document.querySelectorAll('.repository-box');
    repositoryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank'); // Open in a new tab
            }
        });
    });
});