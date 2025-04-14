document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Gestion du slider
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const sliderBtns = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        sliderBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentSlide);
        });
    }

    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Gestion du lazy loading (chargement différé des images)
    const lazyLoadElements = document.querySelectorAll('.lazy-load');

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('active'); // Ajoute la classe active pour déclencher l'animation
                
                // Si l'élément contient une image
                const img = element.querySelector('img');
                if (img && img.getAttribute('src')) {
                    img.setAttribute('data-loaded', true);
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1
    });

    lazyLoadElements.forEach(element => {
        lazyLoadObserver.observe(element);
    });

    // Nouveau code pour le carrousel de témoignages
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Créer les boutons de navigation pour les témoignages
    const testimonialNav = document.createElement('div');
    testimonialNav.className = 'testimonial-nav';
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.className = 'testimonial-btn prev-btn';
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.className = 'testimonial-btn next-btn';
    
    testimonialNav.appendChild(prevBtn);
    testimonialNav.appendChild(nextBtn);
    
    // Ajouter la navigation après le conteneur de témoignages
    const testimonialsSection = document.querySelector('.testimonials');
    testimonialsSection.appendChild(testimonialNav);
    
    // Variables pour le carrousel
    let currentTestimonial = 0;
    const testimonialsPerView = window.innerWidth < 768 ? 1 : 3;
    const testimonialWidth = 100 / testimonialsPerView;
    
    // Fonction pour mettre à jour l'affichage des témoignages
    function updateTestimonials() {
        testimonialCards.forEach((card, index) => {
            if (window.innerWidth < 768) {
                // Vue mobile: un témoignage à la fois
                card.style.display = index === currentTestimonial ? 'flex' : 'none';
            } else {
                // Vue desktop: affichage de plusieurs témoignages
                card.style.transform = `translateX(-${currentTestimonial * 100}%)`;
            }
        });
    }
    
    // Initialiser l'affichage
    updateTestimonials();
    
    // Gestionnaires d'événements pour les boutons
    prevBtn.addEventListener('click', () => {
        if (currentTestimonial > 0) {
            currentTestimonial--;
            updateTestimonials();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentTestimonial < testimonialCards.length - testimonialsPerView) {
            currentTestimonial++;
            updateTestimonials();
        }
    });
    
    // Mettre à jour lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        // Réinitialiser la position
        currentTestimonial = 0;
        updateTestimonials();
    });
    
    // Animation au survol des témoignages
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});