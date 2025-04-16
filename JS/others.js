// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Certificate zoom effect
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('click', () => {
            const image = card.querySelector('.certificate-image img');
            const modal = document.createElement('div');
            modal.classList.add('certificate-modal');
            
            const modalContent = document.createElement('div');
            modalContent.classList.add('certificate-modal-content');
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('certificate-modal-close');
            closeBtn.innerHTML = '&times;';
            
            const modalImage = document.createElement('img');
            modalImage.src = image.src;
            
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalImage);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Close modal on click
            modal.addEventListener('click', () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });
    });
    
    // Add animation to hobby items
    const hobbyItems = document.querySelectorAll('.hobby-item');
    
    hobbyItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 100 * index);
    });
});

// Add CSS for certificate modal
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .certificate-modal {
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
        
        .certificate-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .certificate-modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border: 5px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
        }
        
        .certificate-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        
        .hobby-item {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .hobby-item.animate {
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
    `;
    document.head.appendChild(style);
});