// Smooth scrolling for navigation items
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // Image lightbox functionality
    const assignmentImages = document.querySelectorAll('.assignment-image');
    
    assignmentImages.forEach(image => {
        image.addEventListener('click', () => {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImage = document.createElement('img');
            lightboxImage.src = image.src;
            
            const closeButton = document.createElement('span');
            closeButton.className = 'lightbox-close';
            closeButton.innerHTML = '&times;';
            
            // Append elements
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Show lightbox
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox on click
            lightbox.addEventListener('click', () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
        });
    });
    
    // Add CSS for lightbox
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            border: 5px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('.assignment-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('section-animation');
    });
    
    // Add CSS for section animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .section-animation {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .section-animation.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
});
// Add this code to your existing assignment1.js file

// Scroll to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        // Show button after scrolling just a little bit (50px)
        if (window.scrollY > 50) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});