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
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Typing effect for hero section
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

    // Animated skill bars
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

    // Project filtering
    const projectCategories = ['All', 'Data Analysis', 'Web Development', 'Database'];
    const projects = [
        { name: "MSSQL Server Implementation", category: "Database" },
        { name: "Power BI Dashboard for S&P 500 Affiliate", category: "Data Analysis" },
        { name: "Web-Based Data Management System", category: "Web Development" }
    ];

    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        const filterContainer = document.createElement('div');
        filterContainer.classList.add('filter-container');
        projectCategories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.addEventListener('click', () => filterProjects(category));
            filterContainer.appendChild(button);
        });
        projectsSection.insertBefore(filterContainer, projectsSection.firstChild);

        const projectGrid = document.querySelector('.project-grid');
        const filterProjects = (category) => {
            const filteredProjects = category === 'All' ? projects : projects.filter(project => project.category === category);
            projectGrid.innerHTML = '';
            filteredProjects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `<h3>${project.name}</h3><p>${project.category}</p>`;
                projectGrid.appendChild(projectCard);
            });
        };
        filterProjects('All');
    }

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

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    // Scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});