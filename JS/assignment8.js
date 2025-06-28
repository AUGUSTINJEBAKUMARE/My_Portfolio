// Assignment 8 JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation buttons
  const navButtons = document.querySelectorAll(".nav-button")
  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerOffset = 100
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll to top functionality
  const scrollToTopBtn = document.getElementById("scrollToTop")

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight

    // Show button after scrolling 25% of the page
    if (scrollTop > (scrollHeight - clientHeight) * 0.25) {
      scrollToTopBtn.classList.add("show")
    } else {
      scrollToTopBtn.classList.remove("show")
    }
  })

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Animate content boxes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all content boxes
  const contentBoxes = document.querySelectorAll(".content-box")
  contentBoxes.forEach((box) => {
    box.style.opacity = "0"
    box.style.transform = "translateY(30px)"
    box.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(box)
  })

  // Animate component items
  const componentItems = document.querySelectorAll(".component-item")
  componentItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`

    observer.observe(item)
  })

  // Code block copy functionality
  const codeBlocks = document.querySelectorAll(".code-container")
  codeBlocks.forEach((container) => {
    const copyButton = document.createElement("button")
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy'
    copyButton.className = "copy-button"
    copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #1e3c72;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `

    container.style.position = "relative"
    container.appendChild(copyButton)

    container.addEventListener("mouseenter", () => {
      copyButton.style.opacity = "1"
    })

    container.addEventListener("mouseleave", () => {
      copyButton.style.opacity = "0"
    })

    copyButton.addEventListener("click", () => {
      const codeText = container.querySelector(".code-block").textContent
      navigator.clipboard.writeText(codeText).then(() => {
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!'
        copyButton.style.background = "#27ae60"

        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy'
          copyButton.style.background = "#1e3c72"
        }, 2000)
      })
    })
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav ul")

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("show")
      this.classList.toggle("active")
    })
  }

  // Table responsive wrapper
  const tables = document.querySelectorAll(".connection-table")
  tables.forEach((table) => {
    const wrapper = document.createElement("div")
    wrapper.style.cssText = "overflow-x: auto; margin: 1rem 0;"
    table.parentNode.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  // Video lazy loading
  const videos = document.querySelectorAll("video")
  videos.forEach((video) => {
    video.addEventListener("loadstart", function () {
      this.style.opacity = "0.5"
    })

    video.addEventListener("canplay", function () {
      this.style.opacity = "1"
      this.style.transition = "opacity 0.3s ease"
    })
  })

  // Progress indicator for long content
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        z-index: 9999;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollPercent = (scrollTop / scrollHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })

  // Enhanced hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(".component-item, .software-item, .step")
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)"
    })

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Assignment navigation hover effects
  const navBtns = document.querySelectorAll(".nav-btn")
  navBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    // Add click effect
    btn.addEventListener("click", function (e) {
      this.style.transform = "translateY(0)"
      this.style.opacity = "0.8"

      setTimeout(() => {
        this.style.opacity = "1"
      }, 150)
    })
  })

  // Keyboard navigation for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close any open modals or menus
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show")
        menuToggle.classList.remove("active")
      }
    }

    if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (e.key === "End" && e.ctrlKey) {
      e.preventDefault()
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }

    // Arrow key navigation for assignment buttons
    if (e.key === "ArrowLeft" && e.altKey) {
      e.preventDefault()
      const prevBtn = document.querySelector(".prev-btn")
      if (prevBtn) {
        prevBtn.click()
      }
    }

    if (e.key === "ArrowRight" && e.altKey) {
      e.preventDefault()
      const nextBtn = document.querySelector(".next-btn")
      if (nextBtn) {
        nextBtn.click()
      }
    }
  })

  // Print optimization
  window.addEventListener("beforeprint", () => {
    // Expand all collapsed sections for printing
    const collapsedElements = document.querySelectorAll('[style*="display: none"]')
    collapsedElements.forEach((element) => {
      element.style.display = "block"
    })
  })

  // Smooth scroll for assignment navigation links
  const assignmentNavLinks = document.querySelectorAll(".assignment-navigation .nav-btn")
  assignmentNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add a subtle loading effect
      this.style.opacity = "0.7"
      setTimeout(() => {
        this.style.opacity = "1"
      }, 200)
    })
  })

  // Initialize navigation button animations
  const initNavAnimations = () => {
    const navButtons = document.querySelectorAll(".nav-btn")

    navButtons.forEach((button, index) => {
      button.style.opacity = "0"
      button.style.transform = "translateY(20px)"

      setTimeout(() => {
        button.style.transition = "all 0.6s ease"
        button.style.opacity = "1"
        button.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  // Initialize animations when navigation section is visible
  const navSection = document.querySelector(".assignment-navigation")
  if (navSection) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initNavAnimations()
            navObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    navObserver.observe(navSection)
  }

  console.log("Assignment 8: IoT-Based RFID Access Control System - Page loaded successfully")
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("Page load time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
    }, 0)
  })
}

// Enhanced scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".content-box, .component-item, .software-item")

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((element) => {
    animationObserver.observe(element)
  })
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollAnimations)

// Navigation button ripple effect
function createRipple(event) {
  const button = event.currentTarget
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add("ripple")

  const ripple = button.getElementsByClassName("ripple")[0]

  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

// Add ripple effect to navigation buttons
document.addEventListener("DOMContentLoaded", () => {
  const navBtns = document.querySelectorAll(".nav-btn")
  navBtns.forEach((btn) => {
    btn.addEventListener("click", createRipple)
  })

  // Add CSS for ripple effect
  const style = document.createElement("style")
  style.textContent = `
    .nav-btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
})
