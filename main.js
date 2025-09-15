// =================== DOM ELEMENTS ===================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const rsvpForm = document.getElementById('rsvpForm');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// =================== MOBILE NAVIGATION ===================
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Animate hamburger menu
  const bars = navToggle.querySelectorAll('.bar');
  bars.forEach((bar, index) => {
    if (navMenu.classList.contains('active')) {
      if (index === 0)
        bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) bar.style.opacity = '0';
      if (index === 2)
        bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    }
  });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar) => {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    });
  });
});

// =================== NAVBAR SCROLL EFFECT ===================
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =================== SMOOTH SCROLLING ===================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
}

// =================== SCROLL REVEAL ANIMATION ===================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// =================== MODAL FUNCTIONALITY ===================
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  modals.forEach((modal) => {
    if (e.target === modal) {
      hideModal(modal.id);
    }
  });
});

// Close modal with close button
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) {
      hideModal(modal.id);
    }
  });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.style.display === 'block') {
        hideModal(modal.id);
      }
    });
  }
});

// =================== MODAL TRIGGERS ===================
function showRecommend() {
  showModal('recommendationsModal');
}

function showLodging() {
  showModal('lodgingModal');
}

function openInstagramModal() {
  const videoModal = document.getElementById('proposalVideoModal');
  const iframe = document.getElementById('proposalVideo');

  if (!videoModal || !iframe) {
    console.error('Required elements not found');
    return;
  }

  // Hardcoded Instagram URL
  const instagramUrl =
    'https://www.instagram.com/reel/DKZdX5wNITO/?igsh=bXJmaG51ZTMwbjVz';

  // Convert Instagram URL to embed URL
  let embedUrl = instagramUrl;
  if (instagramUrl.includes('instagram.com/reel/')) {
    const reelId = instagramUrl.match(/\/reel\/([^\/\?]+)/);
    if (reelId) {
      embedUrl = `https://www.instagram.com/p/${reelId[1]}/embed/`;
    }
  }

  // Set the iframe source
  iframe.src = embedUrl;

  // Show the modal
  console.log('Opening modal...');
  showModal('proposalVideoModal');
}

function closeInstagramModal() {
  const videoModal = document.getElementById('proposalVideoModal');
  const iframe = document.getElementById('proposalVideo');

  if (iframe) {
    iframe.src = ''; // Stop the video
  }

  if (videoModal) {
    console.log('Closing modal...');
    hideModal('proposalVideoModal');
  }
}

function showBlessing() {
  showModal('blessingModal');
}
// =================== PROPOSAL VIDEO MODAL ===================

// =================== FORM HANDLING ===================
if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const submitButton = rsvpForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.innerHTML =
      '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      showNotification(
        'Thank you for your RSVP! We look forward to celebrating with you.',
        'success'
      );
      rsvpForm.reset();
    } catch (error) {
      showNotification(
        'There was an error sending your RSVP. Please try again.',
        'error'
      );
    } finally {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });
}

// =================== BLESSING FORM ===================
function submitBlessing() {
  const name = document.getElementById('blessingName').value.trim();
  const message = document.getElementById('blessingMessage').value.trim();

  if (!name || !message) {
    showNotification(
      'Please fill in both your name and blessing message.',
      'error'
    );
    return;
  }

  // Simulate submission
  const submitButton = document.querySelector('#blessingModal .cta-button');
  const originalText = submitButton.innerHTML;

  submitButton.innerHTML =
    '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  submitButton.disabled = true;

  setTimeout(() => {
    showNotification(
      'Thank you for your beautiful blessing! It means the world to us.',
      'success'
    );
    hideModal('blessingModal');
    document.getElementById('blessingName').value = '';
    document.getElementById('blessingMessage').value = '';

    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }, 1500);
}

// =================== NOTIFICATION SYSTEM ===================
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${
        type === 'success'
          ? 'check-circle'
          : type === 'error'
          ? 'exclamation-circle'
          : 'info-circle'
      }"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 3000;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// =================== PARALLAX EFFECTS ===================
function handleParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  parallaxElements.forEach((element) => {
    const speed = element.dataset.parallax || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

window.addEventListener('scroll', handleParallax);

// =================== IMAGE LAZY LOADING ===================
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// =================== COUNTDOWN TIMER ===================
function updateCountdown() {
  const weddingDate = new Date('November 21, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown display if it exists
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
      countdownElement.innerHTML = `
        <div class="countdown-item">
          <span class="countdown-number">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${seconds}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      `;
    }
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// =================== SMOOTH SCROLL FOR ANCHOR LINKS ===================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// =================== ENHANCED FORM VALIDATION ===================
function validateForm(form) {
  const inputs = form.querySelectorAll(
    'input[required], select[required], textarea[required]'
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// Add error styles for form validation
const style = document.createElement('style');
style.textContent = `
  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 1rem;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
  
  .countdown {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .countdown-item {
    text-align: center;
  }
  
  .countdown-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--secondary-color);
  }
  
  .countdown-label {
    font-size: 0.9rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
document.head.appendChild(style);

// =================== INITIALIZATION ===================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize lazy loading
  lazyLoadImages();

  // Add smooth reveal animations to elements
  const elementsToReveal = document.querySelectorAll(
    '.section-header, .timeline-item, .travel-card, .gallery-item'
  );
  elementsToReveal.forEach((element) => {
    element.classList.add('reveal');
  });

  // Initialize scroll reveal
  revealOnScroll();

  // Add parallax data attributes to background images
  const backgroundImages = document.querySelectorAll('.hero-background');
  backgroundImages.forEach((element, index) => {
    element.setAttribute('data-parallax', (index + 1) * 0.1);
  });
});

// =================== PERFORMANCE OPTIMIZATION ===================
// Throttle scroll events for better performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleParallax, 16));
window.addEventListener('scroll', throttle(revealOnScroll, 16));
