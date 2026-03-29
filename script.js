/* ============================================
   PIRATE ANIME PORTFOLIO - JAVASCRIPT
   Animations, Particles, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initParticles();
    initTypewriter();
    initScrollAnimations();
    initNavbar();
    initCountUp();
    initTiltEffect();
    initContactForm();
    initSmoothScroll();
});

/* =====================
   CUSTOM CURSOR
   ===================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');

    if (!cursor || !trail) return;
    if (window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth trail
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Cursor hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .bounty-card, .contact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(255, 215, 0, 0.1)';
            cursor.style.borderColor = '#FFD700';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

/* =====================
   PARTICLE SYSTEM
   ===================== */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Treasure particle types: coins, sparkles, bubbles
    const particleTypes = ['coin', 'sparkle', 'bubble'];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
            this.size = Math.random() * 4 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = -Math.random() * 0.5 - 0.1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            this.pulse = Math.random() * Math.PI * 2;

            switch (this.type) {
                case 'coin':
                    this.color = `rgba(255, 215, 0, ${this.opacity})`;
                    this.size = Math.random() * 3 + 2;
                    break;
                case 'sparkle':
                    this.color = `rgba(255, 237, 74, ${this.opacity})`;
                    this.size = Math.random() * 2 + 1;
                    break;
                case 'bubble':
                    this.color = `rgba(6, 182, 212, ${this.opacity * 0.5})`;
                    this.size = Math.random() * 3 + 1;
                    this.speedY = -Math.random() * 0.3 - 0.2;
                    break;
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            this.pulse += 0.02;
            
            const pulseScale = 1 + Math.sin(this.pulse) * 0.3;
            this.currentSize = this.size * pulseScale;

            // Wrap around
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);

            if (this.type === 'coin') {
                // Gold coin
                ctx.beginPath();
                ctx.arc(0, 0, this.currentSize, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.strokeStyle = `rgba(184, 134, 11, ${this.opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            } else if (this.type === 'sparkle') {
                // Star sparkle
                this.drawStar(0, 0, 4, this.currentSize, this.currentSize * 0.5);
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                // Bubble
                ctx.beginPath();
                ctx.arc(0, 0, this.currentSize, 0, Math.PI * 2);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            ctx.restore();
        }

        drawStar(cx, cy, spikes, outerR, innerR) {
            let rot = Math.PI / 2 * 3;
            let step = Math.PI / spikes;
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerR);
            for (let i = 0; i < spikes; i++) {
                ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
                rot += step;
                ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerR);
            ctx.closePath();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* =====================
   TYPEWRITER EFFECT
   ===================== */
function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const texts = [
        'Full-Stack Developer',
        'Data Science Explorer',
        'Machine Learning Pirate',
        'React.js Navigator',
        'Problem Solver',
        'Code Adventurer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTime = 0;

    function type() {
        const currentText = texts[textIndex];

        if (pauseTime > 0) {
            pauseTime--;
            requestAnimationFrame(() => setTimeout(type, 50));
            return;
        }

        if (!isDeleting) {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                pauseTime = 40; // Pause before deleting
                requestAnimationFrame(() => setTimeout(type, 50));
                return;
            }
        } else {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        const speed = isDeleting ? 30 : 80;
        setTimeout(type, speed);
    }

    setTimeout(type, 1000);
}

/* =====================
   SCROLL ANIMATIONS
   ===================== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* =====================
   NAVBAR
   ===================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
}

/* =====================
   COUNT UP ANIMATION
   ===================== */
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateCount(target, 0, count, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));

    function animateCount(el, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
}

/* =====================
   TILT EFFECT
   ===================== */
function initTiltEffect() {
    if (window.innerWidth <= 768) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            el.style.transition = 'transform 0.5s ease';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.1s ease';
        });
    });
}

/* =====================
   CONTACT FORM
   ===================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>🔄 Sending...</span>';

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                btn.innerHTML = '<span>🎉 Message Sent! Yo ho ho!</span>';
                btn.style.background = 'linear-gradient(135deg, #06B6D4, #2563EB)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    form.reset();
                }, 3000);
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            btn.innerHTML = '<span>❌ Failed to Send!</span>';
            btn.style.background = 'linear-gradient(135deg, #EF4444, #B91C1C)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    });
}

/* =====================
   SMOOTH SCROLL
   ===================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/* =====================
   PARALLAX ON MOUSEMOVE (Hero)
   ===================== */
(function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth <= 768) return;

    const heroImage = hero.querySelector('.hero-image');
    const badges = hero.querySelectorAll('.floating-badge');

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (heroImage) {
            heroImage.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }

        badges.forEach((badge, i) => {
            const speed = (i + 1) * 10;
            badge.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        if (heroImage) heroImage.style.transform = '';
        badges.forEach(badge => badge.style.transform = '');
    });
})();

/* =====================
   ADDITIONAL: Sparkle effect on click
   ===================== */
document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: ${Math.random() * 12 + 8}px;
        left: ${x}px;
        top: ${y}px;
        transition: none;
    `;

    const emojis = ['✨', '⭐', '💫', '🌟', '⚡', '💰'];
    sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    document.body.appendChild(sparkle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 80 + 40;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    sparkle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy - 30}px) scale(0)`, opacity: 0 }
    ], {
        duration: 600 + Math.random() * 400,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    }).onfinish = () => sparkle.remove();
}

console.log('%c⚓ Ahoy! Welcome to Vishnu\'s Pirate Portfolio! 🏴‍☠️', 
    'color: #FFD700; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px #000;');
