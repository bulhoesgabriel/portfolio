// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    
    // Check if the menu is open and the click is outside the navbar
    if (navMenu.classList.contains('active') && !navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// (Navbar scroll state handled in consolidated scroll handler below)

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation classes to elements
document.querySelectorAll('.project-card, .about-content, .contact-content, .skill-category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um endereço de e-mail válido', 'error');
            return;
        }

        // Get submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        // Send form via fetch without redirect
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Mensagem enviada com sucesso, responderei em breve!', 'success');
                contactForm.reset();
            } else {
                showNotification('Houve um problema ao enviar sua mensagem.', 'error');
            }
        })
        .catch(() => {
            showNotification('Houve um problema ao enviar sua mensagem.', 'error');
        })
        .finally(() => {
            // Restore button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when DOM is ready (instant start, no waiting for images)
function initTyping() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent.trim();
        typeWriter(heroTitle, originalText, 45);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyping);
} else {
    initTyping();
}

// Consolidated high-performance scroll listener (passive & rAF-throttled to avoid layout thrashing)
const navbarEl = document.querySelector('.navbar');
const heroEl = document.querySelector('.hero');
const sectionElements = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

            // 1. Navbar scrolled class
            if (navbarEl) {
                if (scrollPos > 40) {
                    navbarEl.classList.add('scrolled');
                } else {
                    navbarEl.classList.remove('scrolled');
                }
            }

            // 2. Desktop hero subtle parallax
            if (heroEl && window.innerWidth > 768) {
                heroEl.style.transform = `translateY(${scrollPos * -0.25}px)`;
            }

            // 3. Active nav link tracking
            let currentSectionId = '';
            sectionElements.forEach(section => {
                if (scrollPos >= section.offsetTop - 220) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });



// Smooth reveal animation for stats
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll(".stat-number");
            statNumbers.forEach(stat => {
                const originalText = stat.textContent;
                const finalValue = parseInt(originalText);
                const hasPlus = originalText.includes("+");

                // Reset the stat to 0 before animating
                stat.textContent = "0" + (hasPlus ? "+" : "");

                // Animate to final value
                animateValue(stat, 0, finalValue, 2000, hasPlus);
            });
            // Stop observing after the animation has been triggered once
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector(".about");
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Animate number counting
function animateValue(element, start, end, duration, hasPlus = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + (hasPlus ? "+" : "");
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
