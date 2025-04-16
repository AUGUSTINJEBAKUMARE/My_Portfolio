// Add animation to assignment cards
document.addEventListener('DOMContentLoaded', () => {
    const assignmentCards = document.querySelectorAll('.assignment-card');
    
    // Staggered animation for assignment cards
    assignmentCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, 100 * index);
    });
    
    // Filter functionality (if needed in the future)
    const addFilterFunctionality = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (!filterButtons.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter the assignments
                assignmentCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    };
    
    // Initialize filter if it exists
    addFilterFunctionality();
});

// For assignment detail pages
const initAssignmentDetail = () => {
    // Check if we're on an assignment detail page
    const assignmentDetail = document.querySelector('.assignment-detail');
    if (!assignmentDetail) return;
    
    // Image gallery functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const mainImage = document.querySelector('.main-image img');
    
    if (galleryImages.length && mainImage) {
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                const imgSrc = image.getAttribute('src');
                mainImage.setAttribute('src', imgSrc);
                
                // Remove active class from all gallery images
                galleryImages.forEach(img => img.classList.remove('active'));
                
                // Add active class to clicked image
                image.classList.add('active');
            });
        });
    }
    
    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    if (paginationLinks.length) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.classList.contains('active')) {
                    // This would be replaced with actual page loading logic
                    console.log('Loading page:', link.textContent);
                }
            });
        });
    }
};

// Initialize assignment detail functionality
document.addEventListener('DOMContentLoaded', initAssignmentDetail);