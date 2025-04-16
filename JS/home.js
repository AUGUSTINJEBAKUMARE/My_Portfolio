// Typing effect
const typingText = document.getElementById('typing-text');
const professions = [
    'PCB Designer',
    'Electrical Engineer',
    'Embedded Engineer',
    'IoT Developer',
    'Circuit Designer'
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typingDelay = 500; // Pause before typing next word
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Start the typing effect
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Name animation with blinking effect
const nameElement = document.querySelector('.name-animation');
setInterval(() => {
    nameElement.style.opacity = '0';
    setTimeout(() => {
        nameElement.style.opacity = '1';
    }, 500);
}, 3000);