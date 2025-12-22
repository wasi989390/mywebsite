// ===================================
// PRELOADER
// ===================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===================================
// SMOOTH SCROLLING FOR NAV LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// PORTFOLIO FILTER
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// LIGHTBOX FUNCTIONALITY
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentImageIndex = 0;

// Array of portfolio images
const portfolioImages = [
    'assets/img/interior1.jpg',
    'assets/img/interior2.jpg',
    'assets/img/interior3.jpg',
    'assets/img/interior4.jpg',
    'assets/img/exterior1.jpeg',
    'assets/img/interior5.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = portfolioImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at start or end
    if (currentImageIndex < 0) {
        currentImageIndex = portfolioImages.length - 1;
    } else if (currentImageIndex >= portfolioImages.length) {
        currentImageIndex = 0;
    }
    
    // Fade effect
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = portfolioImages[currentImageIndex];
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Close lightbox on click outside image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// ===================================
// VIDEO PLAYER FUNCTIONALITY
// ===================================
function playVideo(videoIndex) {
    alert('Video player functionality. Replace with your actual video URLs.');
    // You can integrate YouTube/Vimeo player or use HTML5 video
    // Example:
    // window.open('https://www.youtube.com/watch?v=YOUR_VIDEO_ID', '_blank');
}

// ===================================
// CONTACT FORM SUBMISSION (FORMSPREE FIXED)
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // AJAX ke liye allowed

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showNotification(
                    'Thank you! Your message has been sent successfully.',
                    'success'
                );
                contactForm.reset();
            } else {
                showNotification(
                    'Something went wrong. Please try again.',
                    'error'
                );
            }
        })
        .catch(() => {
            showNotification(
                'Network error. Please try again later.',
                'error'
            );
        });
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '30px',
        background: type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '20px 30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: '600',
        animation: 'slideIn 0.5s ease',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// AOS ANIMATION INITIALIZATION
// ===================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ===================================
// WHATSAPP FLOATING BUTTON (Optional)
// ===================================
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/923132673334';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="bi bi-whatsapp"></i>';
    
    Object.assign(whatsappBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        color: 'white',
        boxShadow: '0 5px 20px rgba(37, 211, 102, 0.5)',
        zIndex: '1000',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
    });
    
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 10px 30px rgba(37, 211, 102, 0.7)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(37, 211, 102, 0.5)';
    });
    
    document.body.appendChild(whatsappBtn);
}

// Create WhatsApp button after page load
window.addEventListener('load', createWhatsAppButton);

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function createScrollTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    
    Object.assign(scrollBtn.style, {
        position: 'fixed',
        bottom: '100px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        border: 'none',
        borderRadius: '50%',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 20px rgba(250, 112, 154, 0.5)',
        zIndex: '1000',
        transition: 'all 0.3s ease'
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

createScrollTopButton();

// ===================================
// PARALLAX EFFECT FOR HERO SECTION
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrolled < window.innerHeight) {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.05}px)`;
        });
    }
});

// ===================================
// IMAGE LAZY LOADING (Optional Performance Boost)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🎨 Texture Paints Website', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cPremium Wall Finishes | Contact: +92 313 2673334', 'font-size: 14px; color: #888;');

// ===================================
// DISABLE RIGHT CLICK (Optional - for image protection)
// ===================================
// Uncomment if you want to protect images
// document.addEventListener('contextmenu', function(e) {
//     if (e.target.tagName === 'IMG') {
//         e.preventDefault();
//         showNotification('Images are protected', 'info');
//     }
// });

console.log('✅ All scripts loaded successfully!');