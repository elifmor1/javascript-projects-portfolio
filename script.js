document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const workItems = document.querySelectorAll('.work-item');
    const processSteps = document.querySelectorAll('.process-step');
    const contactForm = document.getElementById('contact-form');
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const header = document.querySelector('header');
    const projectCards = document.querySelectorAll('.project-card');
    const canvas = document.getElementById('noise-canvas');

    // Custom Cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursorFollower.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });

    // Hover Effects
    const hoverElements = document.querySelectorAll('a, button, .work-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
            cursor.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursor.style.opacity = '1';
        });
    });

    // Menu Toggle
    menuToggle.addEventListener('click', () => {
        navContent.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContent.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Smooth Scroll
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

    // Skills Animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const parentBar = progressBar.parentElement;
                if (parentBar && parentBar.hasAttribute('data-progress')) {
                    progressBar.style.width = parentBar.getAttribute('data-progress') + '%';
                }
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Process Steps Animation
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        processObserver.observe(step);
    });

    // Work Items Animation
    const observerOptions = {
        threshold: 0.3
    };

    const workObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    workItems.forEach(item => {
        workObserver.observe(item);
    });

    // Canvas Noise Effect
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        function noise(ctx) {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 15; // Low opacity for subtle effect
            }
            
            ctx.putImageData(imageData, 0, 0);
        }

        function loop() {
            noise(ctx);
            requestAnimationFrame(loop);
        }

        loop();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            
            formData.forEach((value, key) => {
                if (!value.trim()) {
                    isValid = false;
                }
            });

            if (isValid) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulated form submission
                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });

        // Form Label Animation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check for pre-filled inputs
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    // Scroll Animation
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.setProperty('--scroll', scrolled);

        // Header Background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Project Cards Animation
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            if (cardTop < window.innerHeight - 100 && cardBottom > 0) {
                card.classList.add('visible');
            }
        });
    });

    // Set initial active section
    setActiveSection('about');
});

function setActiveSection(sectionId) {
    // Remove active class from all sections and links
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to current section and link
    const currentSection = document.getElementById(sectionId);
    const currentLink = document.querySelector(`a[href="#${sectionId}"]`);

    if (currentSection) currentSection.classList.add('active');
    if (currentLink) currentLink.classList.add('active');
}
