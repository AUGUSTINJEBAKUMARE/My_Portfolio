// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send the form data to a server
            // For this demo, we'll just simulate a successful submission
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Your message has been sent successfully!', 'success');
            }, 1500);
        });
    }
    
    // Function to show notification
    function showNotification(message, type) {
        // Check if notification container exists, if not create it
        let notificationContainer = document.querySelector('.notification-container');
        
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
            
            // Add CSS for notification container
            const style = document.createElement('style');
            style.textContent = `
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                
                .notification {
                    padding: 15px 20px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    color: white;
                    font-weight: 500;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    transform: translateX(100%);
                    animation: slideIn 0.3s forwards, fadeOut 0.3s 2.7s forwards;
                }
                
                .notification.success {
                    background: linear-gradient(to right, #2ed573, #7bed9f);
                }
                
                .notification.error {
                    background: linear-gradient(to right, #ff4757, #ff6b81);
                }
                
                .notification-close {
                    cursor: pointer;
                    font-size: 20px;
                    margin-left: 10px;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateX(0); }
                    to { opacity: 0; transform: translateX(100%); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Create message element
        const messageElement = document.createElement('span');
        messageElement.textContent = message;
        
        // Create close button
        const closeButton = document.createElement('span');
        closeButton.className = 'notification-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                notificationContainer.removeChild(notification);
            }, 300);
        });
        
        // Append elements to notification
        notification.appendChild(messageElement);
        notification.appendChild(closeButton);
        
        // Append notification to container
        notificationContainer.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode === notificationContainer) {
                notificationContainer.removeChild(notification);
            }
        }, 3000);
    }
    
    // Add animation to contact info items
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 200 * index);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .info-item {
            opacity: 0;
            transform: translateX(-20px);
        }
        
        .info-item.animate {
            animation: fadeInLeft 0.5s forwards;
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});