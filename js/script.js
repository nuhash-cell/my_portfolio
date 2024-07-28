document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typewriter effect for hero section
    const heroText = "Turning data into actionable insights";
    const heroElement = document.querySelector('.hero-content p');
    if (heroElement) {
        let i = 0;
        const typingEffect = () => {
            if (i < heroText.length) {
                heroElement.innerHTML += heroText.charAt(i);
                i++;
                setTimeout(typingEffect, 100);
            }
        };
        typingEffect();
    }

    // Scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Form submission handling with validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formEntries = Object.fromEntries(formData);
            
            // Simple validation
            if (!formEntries.name || !formEntries.email || !formEntries.message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(formEntries.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            console.log('Form submitted with data:', formEntries);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animated skill bars (if you have skill bars to animate)
    const skills = [
        { name: "Data Analysis", level: 90 },
        { name: "Power BI", level: 85 },
        { name: "SQL", level: 80 },
        { name: "Python", level: 75 },
        { name: "Data Visualization", level: 85 }
    ];

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('skill');
            skillElement.innerHTML = `
                <p>${skill.name}</p>
                <div class="skill-bar-container">
                    <div class="skill-bar" data-level="${skill.level}"></div>
                </div>
            `;
            skillsContainer.appendChild(skillElement);
        });

        const animateSkillBars = () => {
            document.querySelectorAll('.skill-bar').forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = `${level}%`;
                    bar.style.transition = 'width 1s ease-in-out';
                }, 200);
            });
        };

        // Intersection Observer for skill bars animation
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                observer.unobserve(skillsContainer);
            }
        });
        observer.observe(skillsContainer);
    }

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
});
