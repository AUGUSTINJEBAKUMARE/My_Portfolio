// Calculate age dynamically
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Update age on page load
document.addEventListener('DOMContentLoaded', () => {
    const ageElement = document.getElementById('age');
    if (ageElement) {
        const birthDate = "2004-10-16"; // Format: YYYY-MM-DD
        ageElement.textContent = calculateAge(birthDate);
    }
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
        item.classList.add('timeline-animation');
    });
});