// Navbar scroll effect
const navbar = document.getElementById('navbar');
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('shadow-lg', 'scrolled');
    if (scrollToTopBtn) {
      scrollToTopBtn.classList.add('show');
    }
  } else {
    navbar.classList.remove('shadow-lg', 'scrolled');
    if (scrollToTopBtn) {
      scrollToTopBtn.classList.remove('show');
    }
  }
});

// Scroll to top functionality
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scroll for anchor links (Bootstrap handles navbar collapse)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;
    
    const target = document.querySelector(href);
    
    if (target) {
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
      
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Handler - WhatsApp Integration
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || 'Não informado';
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Service names mapping
    const serviceNames = {
      'desenvolvimento': 'Desenvolvimento de Software',
      'landing-page': 'Landing Page',
      'ecommerce': 'E-commerce',
      'outro': 'Outro'
    };
    
    // Create WhatsApp message
    const whatsappMessage = `Olá! Gostaria de solicitar um orçamento.\n\n` +
      `*Nome:* ${name}\n` +
      `*Telefone:* ${phone}\n` +
      `*E-mail:* ${email}\n` +
      `*Serviço:* ${serviceNames[service] || service}\n\n` +
      `*Mensagem:*\n${message}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp API URL
    // Format: https://wa.me/5511971852633?text=
    const whatsappBusinessNumber = '5511971852633';
    const whatsappUrl = `https://wa.me/${whatsappBusinessNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show loading state
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Redirecionando...';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 2000);
  });
}

// Counter animation for stats
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + (element.getAttribute('data-count').includes('+') ? '+' : '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (element.getAttribute('data-count').includes('+') ? '+' : '');
    }
  };
  
  updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(30px)';
      entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      // Animate counters if they exist
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        if (!counter.classList.contains('counted')) {
          counter.classList.add('counted');
          animateCounter(counter);
        }
      });
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Products Carousel - Disable infinite loop
document.addEventListener('DOMContentLoaded', function() {
  const productsCarousel = document.getElementById('productsCarousel');
  if (productsCarousel) {
    const carousel = new bootstrap.Carousel(productsCarousel, {
      wrap: false,
      interval: false,
      ride: false
    });
    
    const prevBtn = productsCarousel.closest('.container').querySelector('[data-bs-slide="prev"]');
    const nextBtn = productsCarousel.closest('.container').querySelector('[data-bs-slide="next"]');
    
    // Disable buttons at start/end
    productsCarousel.addEventListener('slid.bs.carousel', function (e) {
      const totalSlides = productsCarousel.querySelectorAll('.carousel-item').length;
      const currentIndex = Array.from(productsCarousel.querySelectorAll('.carousel-item')).indexOf(e.relatedTarget);
      
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
      }
      
      if (nextBtn) {
        nextBtn.disabled = currentIndex === totalSlides - 1;
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex === totalSlides - 1 ? 'not-allowed' : 'pointer';
      }
    });
    
    // Initial state - disable prev button
    if (prevBtn) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = '0.5';
      prevBtn.style.cursor = 'not-allowed';
    }
  }
});

// Infinite carousel for testimonials - CSS animation handles it now
// The animation is controlled via CSS with hover pause functionality

// Dark Mode / Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.classList.remove('bi-sun-fill');
      themeIcon.classList.add('bi-moon-fill');
    } else {
      themeIcon.classList.remove('bi-moon-fill');
      themeIcon.classList.add('bi-sun-fill');
    }
  }
}
