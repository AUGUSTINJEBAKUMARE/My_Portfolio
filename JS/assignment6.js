document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation buttons
  const navButtons = document.querySelectorAll(".nav-button");

  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to Top Button functionality
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Image lightbox functionality
  const images = document.querySelectorAll(
    ".overview-image, .workflow-image, .pcb-image, .tool-img, .machine-image, .interface-image, .final-pcb-image, .design-image"
  );

  images.forEach((image) => {
    image.addEventListener("click", () => {
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";

      const lightboxContent = document.createElement("div");
      lightboxContent.className = "lightbox-content";

      const lightboxImage = document.createElement("img");
      lightboxImage.src = image.src;

      const closeButton = document.createElement("span");
      closeButton.className = "lightbox-close";
      closeButton.innerHTML = "&times;";

      lightboxContent.appendChild(lightboxImage);
      lightboxContent.appendChild(closeButton);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);

      setTimeout(() => {
        lightbox.style.opacity = "1";
      }, 10);

      lightbox.addEventListener("click", () => {
        lightbox.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(lightbox);
        }, 300);
      });
    });
  });

  // Lightbox CSS
  const style = document.createElement("style");
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
  `;
  document.head.appendChild(style);

  // Section animation on scroll
  const sections = document.querySelectorAll(".content-box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
    section.classList.add("section-animation");
  });

  // Section animation styles
  const animationStyle = document.createElement("style");
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

  // Hover effects for cards
  const cards = document.querySelectorAll(
    ".step-card, .pcb-type-card, .material-card, .tool-card, .setup-step, .design-step"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("step-card")) {
        card.style.transform = "translateY(-5px)";
      }
      card.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("step-card")) {
        card.style.transform = "translateY(0)";
      } else {
        card.style.transform = "translateX(0)";
      }
      card.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    });
  });

  // ✅ Fixed: Progressive image loading (prevent disappearing images)
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.transition = "opacity 0.5s ease";

          if (img.complete) {
            img.style.opacity = "1"; // Show immediately if already loaded
          } else {
            img.style.opacity = "0";
            img.onload = () => {
              img.style.opacity = "1";
            };
          }

          imageObserver.unobserve(img);
        }
      });
    },
    { threshold: 0.1 }
  );

  const lazyImages = document.querySelectorAll("img");
  lazyImages.forEach((img) => {
    img.style.opacity = "0"; // Start hidden for smooth transition
    imageObserver.observe(img);
  });

  // Tooltip for technical terms
  const technicalTerms = document.querySelectorAll("strong");
  technicalTerms.forEach((term) => {
    term.addEventListener("mouseenter", (e) => {
      e.target.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
      e.target.style.padding = "2px 4px";
      e.target.style.borderRadius = "3px";
      e.target.style.transition = "all 0.3s ease";
    });

    term.addEventListener("mouseleave", (e) => {
      e.target.style.backgroundColor = "transparent";
      e.target.style.padding = "0";
    });
  });
});
