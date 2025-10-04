// GitHub Pages Demo - Main JavaScript
// Demonstrates client-side functionality and interactivity

class GitHubPagesDemo {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupAnimations();
    this.setupFormHandling();
    this.setupLocalStorage();
  }

  setupEventListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    });
  }

  initializeComponents() {
    // Initialize tooltips
    this.initTooltips();
    
    // Initialize modals
    this.initModals();
    
    // Initialize lazy loading
    this.initLazyLoading();
    
    // Initialize progress bars
    this.initProgressBars();
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .feature-item, .demo-container').forEach(el => {
      observer.observe(el);
    });
  }

  setupFormHandling() {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactForm(contactForm);
      });
    }

    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubscription(newsletterForm);
      });
    }
  }

  setupLocalStorage() {
    // Save user preferences
    this.loadUserPreferences();
    
    // Track page visits
    this.trackPageVisit();
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    }
  }

  handleSearch(query) {
    const results = document.getElementById('search-results');
    if (!results) return;

    if (query.length < 2) {
      results.innerHTML = '';
      results.style.display = 'none';
      return;
    }

    // Simple search implementation
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, .feature-card, .feature-item');
    const matches = Array.from(searchableElements).filter(el => {
      return el.textContent.toLowerCase().includes(query.toLowerCase());
    });

    if (matches.length > 0) {
      results.innerHTML = matches.map(el => {
        const text = el.textContent.substring(0, 100) + '...';
        return `<div class="search-result">${text}</div>`;
      }).join('');
      results.style.display = 'block';
    } else {
      results.innerHTML = '<div class="search-result">No results found</div>';
      results.style.display = 'block';
    }
  }

  handleFormSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    this.showNotification('Form submitted successfully!', 'success');
    
    // Reset form
    form.reset();
    
    // In a real application, you would send the data to a server
    console.log('Form data:', Object.fromEntries(formData));
  }

  handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!data.name || !data.email || !data.message) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Simulate sending email
    this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    form.reset();
  }

  handleNewsletterSubscription(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    if (!this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Save to localStorage (in real app, send to server)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      this.showNotification('Successfully subscribed to newsletter!', 'success');
    } else {
      this.showNotification('You\'re already subscribed!', 'info');
    }
    
    form.reset();
  }

  initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => this.showTooltip(e));
      element.addEventListener('mouseleave', () => this.hideTooltip());
    });
  }

  initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        this.openModal(modalId);
      });
    });

    modalCloses.forEach(close => {
      close.addEventListener('click', () => this.closeModal());
    });

    // Close modal on outside click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModal();
      }
    });
  }

  initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percentage = bar.dataset.percentage || 0;
          this.animateProgressBar(bar, percentage);
          progressObserver.unobserve(bar);
        }
      });
    });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  animateProgressBar(bar, percentage) {
    let current = 0;
    const increment = percentage / 100;
    const timer = setInterval(() => {
      current += increment;
      bar.style.width = current + '%';
      if (current >= percentage) {
        clearInterval(timer);
      }
    }, 20);
  }

  showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = event.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  }

  hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  loadUserPreferences() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  trackPageVisit() {
    const visits = parseInt(localStorage.getItem('page_visits') || '0') + 1;
    localStorage.setItem('page_visits', visits.toString());
    
    const visitCounter = document.getElementById('visit-counter');
    if (visitCounter) {
      visitCounter.textContent = visits;
    }
  }
}

// Initialize the demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GitHubPagesDemo();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GitHubPagesDemo;
}
