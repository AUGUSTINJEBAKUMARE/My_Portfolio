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
    
    // Interactive elements for game demonstrations
    const addGameInteractivity = () => {
        // This function could be expanded to add interactive elements
        // For example, simple game controls or demonstrations
        
        // For the Maze Game
        const mazeGameSection = document.querySelector('#maze-game');
        if (mazeGameSection) {
            const mazeGameInfo = document.createElement('div');
            mazeGameInfo.className = 'game-info';
            mazeGameInfo.innerHTML = `
                <div class="game-controls">
                    <h4>Game Controls:</h4>
                    <div class="control-keys">
                        <div class="key">↑</div>
                        <div class="key-row">
                            <div class="key">←</div>
                            <div class="key">↓</div>
                            <div class="key">→</div>
                        </div>
                    </div>
                    <p>Use arrow keys to navigate the maze</p>
                </div>
            `;
            
            const mazeContent = mazeGameSection.querySelector('.section-content');
            mazeContent.appendChild(mazeGameInfo);
        }
        
        // For the Apple Catching Game
        const appleGameSection = document.querySelector('#apple-game');
        if (appleGameSection) {
            const appleGameInfo = document.createElement('div');
            appleGameInfo.className = 'game-info';
            appleGameInfo.innerHTML = `
                <div class="game-controls">
                    <h4>Game Controls:</h4>
                    <div class="control-keys">
                        <div class="key-row">
                            <div class="key">←</div>
                            <div class="key">→</div>
                        </div>
                    </div>
                    <p>Use left and right arrow keys to move the basket</p>
                </div>
            `;
            
            const appleContent = appleGameSection.querySelector('.section-content');
            appleContent.appendChild(appleGameInfo);
        }
    };
    
    // Add CSS for game controls
    const gameControlsStyle = document.createElement('style');
    gameControlsStyle.textContent = `
        .game-info {
            margin-top: 30px;
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .game-controls h4 {
            color: var(--light-text);
            margin-bottom: 15px;
        }
        
        .control-keys {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            margin-bottom: 15px;
        }
        
        .key-row {
            display: flex;
            gap: 5px;
        }
        
        .key {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--light-text);
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .game-controls p {
            color: var(--light-text);
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(gameControlsStyle);
    
    // Initialize game interactivity
    addGameInteractivity();
});
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