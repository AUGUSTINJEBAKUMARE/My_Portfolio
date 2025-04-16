document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation buttons
  const navButtons = document.querySelectorAll(".nav-button")

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
  // Scroll to Top Button functionality
  const scrollToTopBtn = document.getElementById("scrollToTopBtn")

  // Show/hide the button based on scroll position
  window.addEventListener("scroll", () => {
    // Show button after scrolling down 25% of viewport height
    if (window.scrollY > window.innerHeight * 0.25) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Image lightbox functionality
  const images = document.querySelectorAll(".project-image, .diagram-image")

  images.forEach((image) => {
    image.addEventListener("click", () => {
      // Create lightbox elements
      const lightbox = document.createElement("div")
      lightbox.className = "lightbox"

      const lightboxContent = document.createElement("div")
      lightboxContent.className = "lightbox-content"

      const lightboxImage = document.createElement("img")
      lightboxImage.src = image.src

      const closeButton = document.createElement("span")
      closeButton.className = "lightbox-close"
      closeButton.innerHTML = "&times;"

      // Append elements
      lightboxContent.appendChild(lightboxImage)
      lightboxContent.appendChild(closeButton)
      lightbox.appendChild(lightboxContent)
      document.body.appendChild(lightbox)

      // Show lightbox
      setTimeout(() => {
        lightbox.style.opacity = "1"
      }, 10)

      // Close lightbox on click
      lightbox.addEventListener("click", () => {
        lightbox.style.opacity = "0"
        setTimeout(() => {
          document.body.removeChild(lightbox)
        }, 300)
      })
    })
  })

  // Add CSS for lightbox
  const style = document.createElement("style")
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
            border: 5px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
    `
  document.head.appendChild(style)

  // Add animation to sections when they come into view
  const sections = document.querySelectorAll(".content-box")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    observer.observe(section)
    section.classList.add("section-animation")
  })

  // Add CSS for section animations
  const animationStyle = document.createElement("style")
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
    `
  document.head.appendChild(animationStyle)

  // Add hover effects for cards and stats
  const cards = document.querySelectorAll(".timeline-item, .stat-item")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
      card.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
    })
  })
})

