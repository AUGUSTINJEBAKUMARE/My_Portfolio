// Add animation to skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Staggered animation for skill items
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 50 * index);
    });
    
    // Add hover effect for skill icons
    skillItems.forEach(item => {
        const icon = item.querySelector('.skill-icon');
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Add floating animation to skill categories
    const skillCategories = document.querySelectorAll('.skills-category');
    
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
        category.classList.add('float-animation');
    });
});

// Add CSS for animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .skill-item {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .skill-item.animate {
            animation: fadeInUp 0.5s forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .float-animation {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});