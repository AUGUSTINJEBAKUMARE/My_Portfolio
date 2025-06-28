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
    if (window.scrollY > 50) {
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
  const images = document.querySelectorAll(".design-image, .rviz-screenshot, .gazebo-screenshot")

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

  // Add hover effects for cards
  const cards = document.querySelectorAll(".component-card, .step-item, .feature-card, .axis-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (card.classList.contains("step-item")) {
        card.style.transform = "translateX(10px)"
      } else if (card.classList.contains("axis-card")) {
        card.style.transform = "translateY(-3px)"
      } else {
        card.style.transform = "translateY(-5px)"
      }
      card.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      if (card.classList.contains("step-item")) {
        card.style.transform = "translateX(0)"
      }
      card.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
    })
  })

  // Code block copy functionality
  const codeBlocks = document.querySelectorAll(".code-block")

  codeBlocks.forEach((block) => {
    // Create copy button
    const copyButton = document.createElement("button")
    copyButton.className = "copy-button"
    copyButton.innerHTML = '<i class="fas fa-copy"></i>'
    copyButton.title = "Copy code"

    // Position the button
    block.parentElement.style.position = "relative"
    copyButton.style.position = "absolute"
    copyButton.style.top = "10px"
    copyButton.style.right = "10px"
    copyButton.style.background = "rgba(255, 255, 255, 0.1)"
    copyButton.style.border = "none"
    copyButton.style.color = "white"
    copyButton.style.padding = "8px"
    copyButton.style.borderRadius = "5px"
    copyButton.style.cursor = "pointer"
    copyButton.style.transition = "background-color 0.3s ease"

    // Add hover effect
    copyButton.addEventListener("mouseenter", () => {
      copyButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    })

    copyButton.addEventListener("mouseleave", () => {
      copyButton.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
    })

    // Add copy functionality
    copyButton.addEventListener("click", () => {
      const text = block.textContent
      navigator.clipboard.writeText(text).then(() => {
        copyButton.innerHTML = '<i class="fas fa-check"></i>'
        copyButton.style.backgroundColor = "#10b981"
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i>'
          copyButton.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
        }, 2000)
      })
    })

    block.parentElement.appendChild(copyButton)
  })

  // Syntax highlighting for code blocks (basic)
  codeBlocks.forEach((block) => {
    let html = block.innerHTML

    // Highlight XML/HTML tags
    html = html.replace(/(&lt;[^&]*&gt;)/g, '<span style="color: #60a5fa;">$1</span>')

    // Highlight commands
    html = html.replace(/(ros2|mkdir|cd|colcon|source)/g, '<span style="color: #10b981;">$1</span>')

    // Highlight file paths
    html = html.replace(/(\/[^\s]*)/g, '<span style="color: #f59e0b;">$1</span>')

    block.innerHTML = html
  })

  // Add progress indicator for long code sections
  const longCodeSections = document.querySelectorAll(".code-container")

  longCodeSections.forEach((section) => {
    if (section.scrollHeight > section.clientHeight) {
      const progressBar = document.createElement("div")
      progressBar.className = "code-progress"
      progressBar.style.position = "absolute"
      progressBar.style.bottom = "0"
      progressBar.style.left = "0"
      progressBar.style.height = "3px"
      progressBar.style.backgroundColor = "#6366f1"
      progressBar.style.transition = "width 0.3s ease"
      progressBar.style.width = "0%"

      section.style.position = "relative"
      section.appendChild(progressBar)

      section.addEventListener("scroll", () => {
        const scrollPercent = (section.scrollTop / (section.scrollHeight - section.clientHeight)) * 100
        progressBar.style.width = scrollPercent + "%"
      })
    }
  })
})
