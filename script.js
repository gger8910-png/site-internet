/**
 * First Agent IA - JavaScript Principal
 * Animations, interactions et effets 3D
 * Inspiré par: Cursor.com, DeepMind
 */

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initNeuralNetwork();
    initCube3D();
    initParticles();
    initForm();
    initIntersectionObserver();
    initVideoPlayer();
});

// ============================================
// Navbar
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button click
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('nav-cta')) {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.3;
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
    });
    
    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ============================================
// Neural Network Animation (3D Effect)
// ============================================
function initNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network');
    const layers = document.querySelectorAll('.layer');
    
    if (!neuralNetwork || layers.length === 0) return;
    
    // Create connections between neurons
    createNeuronConnections(layers);
    
    // Mouse move effect
    neuralNetwork.addEventListener('mousemove', (e) => {
        const rect = neuralNetwork.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        neuralNetwork.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset on mouse leave
    neuralNetwork.addEventListener('mouseleave', () => {
        neuralNetwork.style.transform = 'translate(-50%, -50%) rotateX(0) rotateY(0)';
    });
    
    // Animate neurons
    animateNeurons();
}

function createNeuronConnections(layers) {
    const container = document.querySelector('.visual-container');
    if (!container) return;
    
    // Get all neurons
    const allNeurons = [];
    layers.forEach(layer => {
        const neurons = layer.querySelectorAll('.neuron');
        allNeurons.push(Array.from(neurons));
    });
    
    // Create connections between consecutive layers
    for (let i = 0; i < allNeurons.length - 1; i++) {
        const currentLayer = allNeurons[i];
        const nextLayer = allNeurons[i + 1];
        
        currentLayer.forEach((neuron, neuronIndex) => {
            // Connect to 1-2 neurons in the next layer
            const connections = Math.min(2, nextLayer.length);
            for (let j = 0; j < connections; j++) {
                const targetIndex = Math.min(neuronIndex + j, nextLayer.length - 1);
                createConnection(neuron, nextLayer[targetIndex]);
            }
        });
    }
}

function createConnection(source, target) {
    const container = document.querySelector('.visual-container');
    if (!container) return;
    
    const connection = document.createElement('div');
    connection.className = 'neuron-connection';
    
    // Position the connection
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const startX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
    const startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
    const endX = targetRect.left + targetRect.width / 2 - containerRect.left;
    const endY = targetRect.top + targetRect.height / 2 - containerRect.top;
    
    // Calculate angle and distance
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    connection.style.cssText = `
        position: absolute;
        left: ${startX}px;
        top: ${startY}px;
        width: ${distance}px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent);
        transform: rotate(${angle}rad);
        transform-origin: 0 0;
        opacity: 0.5;
        pointer-events: none;
    `;
    
    container.appendChild(connection);
    
    // Add animation
    connection.style.animation = `connectionPulse 2s infinite ${Math.random() * 2}s`;
    
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes connectionPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

function animateNeurons() {
    const neurons = document.querySelectorAll('.neuron');
    
    neurons.forEach((neuron, index) => {
        // Random pulse animation
        setInterval(() => {
            neuron.style.transform = `scale(${1 + Math.random() * 0.3})`;
            neuron.style.opacity = 0.5 + Math.random() * 0.5;
            
            setTimeout(() => {
                neuron.style.transform = 'scale(1)';
                neuron.style.opacity = '1';
            }, 200);
        }, 1000 + Math.random() * 2000);
    });
}

// ============================================
// 3D Cube Animation
// ============================================
function initCube3D() {
    const cube = document.querySelector('.cube-3d');
    if (!cube) return;
    
    let rotationX = 0;
    let rotationY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Auto-rotate
    function autoRotate() {
        rotationY += 0.5;
        cube.style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        requestAnimationFrame(autoRotate);
    }
    
    // Mouse move effect
    cube.addEventListener('mousemove', (e) => {
        const rect = cube.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        targetX = (y - centerY) / 5;
        targetY = (centerX - x) / 5;
    });
    
    // Mouse leave - reset to auto rotation
    cube.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
    
    // Smooth rotation
    function smoothRotate() {
        rotationX += (targetX - rotationX) * 0.1;
        rotationY += (targetY - rotationY) * 0.1;
        cube.style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        requestAnimationFrame(smoothRotate);
    }
    
    smoothRotate();
}

// ============================================
// Particles Animation
// ============================================
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create additional particles dynamically
    for (let i = 0; i < 10; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = 4 + Math.random() * 8;
    
    // Random color
    const colors = ['#60a5fa', '#3b82f6', '#93c5fd', '#2563eb'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random animation duration
    const duration = 4 + Math.random() * 8;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: float ${duration}s infinite ${delay}s;
        opacity: ${0.3 + Math.random() * 0.4};
    `;
    
    container.appendChild(particle);
}

// ============================================
// Form Handling
// ============================================
function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Envoi en cours...
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success
        submitBtn.innerHTML = `
            <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Message envoyé !
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ============================================
// Intersection Observer (Scroll Animations)
// ============================================
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .about-feature, .demo-feature, .tech-icon, .stat, .hero-badge, .hero-title, .hero-description'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add stagger classes based on index
                const index = Array.from(animatedElements).indexOf(entry.target);
                const staggerClass = `stagger-${(index % 4) + 1}`;
                entry.target.classList.add(staggerClass);
                
                // Unobserve after animation
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 600);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.classList.add('opacity-0');
        observer.observe(el);
    });
    
    // Add CSS for opacity-0
    const style = document.createElement('style');
    style.textContent = `
        .opacity-0 {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Video Player
// ============================================
function initVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (!videoPlaceholder) return;
    
    videoPlaceholder.addEventListener('click', () => {
        // In a real implementation, this would open a video modal
        // For now, we'll just show a message
        alert('La vidéo de démonstration serait affichée ici dans une version complète.');
    });
    
    // Add hover effect
    videoPlaceholder.addEventListener('mouseenter', () => {
        const playButton = videoPlaceholder.querySelector('.play-button');
        if (playButton) {
            playButton.style.transform = 'scale(1.1)';
        }
    });
    
    videoPlaceholder.addEventListener('mouseleave', () => {
        const playButton = videoPlaceholder.querySelector('.play-button');
        if (playButton) {
            playButton.style.transform = 'scale(1)';
        }
    });
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // Quick navigation with Ctrl/Cmd + number
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        const sections = document.querySelectorAll('section[id]');
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// Mouse Effects
// ============================================

// Custom cursor (optional)
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ============================================
// Touch Support
// ============================================
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

// ============================================
// Performance Optimization
// ============================================

// Reduce animations on mobile
if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile-device');
    
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
        .mobile-device .neuron-connection,
        .mobile-device .particle {
            display: none !important;
        }
        .mobile-device .neural-network {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Preloader (Optional)
// ============================================
window.addEventListener('load', () => {
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c First Agent IA %c
%c Réinventez le développement %c

Créé avec passion pour les développeurs.

Visitez: https://first-agent-ia.com
`, 
'background: linear-gradient(135deg, #60a5fa, #3b82f6); color: #000; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
'',
'color: #60a5fa; font-size: 14px;',
''
);

// ============================================
// Export for testing
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initScrollAnimations,
        initNeuralNetwork,
        initCube3D,
        initParticles,
        initForm,
        initIntersectionObserver,
        initVideoPlayer
    };
}
