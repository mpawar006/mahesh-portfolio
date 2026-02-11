// Hide loader when page is fully loaded
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
  }, 500);
});

// Create animated particles
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random size
  const size = Math.random() * 6 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Random position
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  
  // Random animation duration
  particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  
  particlesContainer.appendChild(particle);
}

// Typing animation for subtitle
const typingText = document.getElementById('typingText');
const roles = [
  "Cloud & DevOps Engineer",
  "AWS Certified Solutions Architect",
  "Kubernetes Expert",
  "Infrastructure Automation Specialist",
  "CI/CD Pipeline Architect"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 1000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing new role
  }
  
  setTimeout(typeRole, typingSpeed);
}

// Start typing animation
setTimeout(typeRole, 1000);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (icon.classList.contains('fa-bars')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Observe stats section for animation trigger
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Animate elements when they come into view using Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-category')) {
        const skillBars = entry.target.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
          const skill = bar.getAttribute('data-skill');
          setTimeout(() => {
            bar.style.width = `${skill}%`;
          }, 200);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark-mode';

if (savedTheme === 'light-mode') {
  body.classList.add('light-mode');
  themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
} else {
  body.classList.add('dark-mode');
  themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light-mode');
  }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      // Submit form using fetch API
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
          
          // Reset form
          contactForm.reset();
        } else {
          // Show error message
          showToast('Oops! There was a problem submitting your form.', 'error');
        }
        
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      })
      .catch(error => {
        // Show error message
        showToast('Oops! There was a problem submitting your form.', 'error');
        
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        console.error('Error:', error);
      });
    }
  });
}

// Toast notification function
function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.classList.add('show');
  
  if (type === 'error') {
    toast.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
  } else {
    toast.style.background = 'linear-gradient(135deg, #64ffda, #4fd1b5)';
  }
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Add parallax effect to header
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('header');
  if (header && scrolled < 800) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
    header.style.opacity = 1 - (scrolled / 800);
  }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't trigger if clicking on a link
    if (!e.target.closest('a')) {
      const link = this.querySelector('.project-link.primary');
      if (link) {
        window.open(link.href, '_blank');
      }
    }
  });
});

// Add click effect to blog cards
document.querySelectorAll('.blog-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't trigger if clicking on a link
    if (!e.target.closest('a')) {
      const link = this.querySelector('.blog-link');
      if (link) {
        window.location.href = link.href;
      }
    }
  });
});

// Add animation to certification badges
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const badge = this.querySelector('.cert-badge');
    if (badge) {
      badge.style.animation = 'pulse 0.5s ease-in-out';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    const badge = this.querySelector('.cert-badge');
    if (badge) {
      badge.style.animation = '';
    }
  });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add progress indicator for page scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(135deg, #64ffda, #4fd1b5);
  width: 0%;
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  // Press 'T' to go to top
  if (e.key === 't' || e.key === 'T') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Press 'B' to go to bottom
  if (e.key === 'b' || e.key === 'B') {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
});

// Add console message
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #64ffda;');
console.log('%cInterested in how this portfolio was built? Check out the source code on GitHub!', 'font-size: 14px; color: #8892b0;');
console.log('%c🔗 https://github.com/mpawar006/mahesh-portfolio', 'font-size: 14px; color: #64ffda;');
