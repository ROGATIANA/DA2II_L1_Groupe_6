// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Bouton retour en haut
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des cartes au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.category-card, .rule-card, .schedule-card').forEach(el => {
    observer.observe(el);
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des données
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulation d'envoi
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation de délai
    setTimeout(() => {
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Compteur de livres par catégorie (dynamique)
function updateBookCounts() {
    const categories = {
        'Informatique': 0,
        'Mathématiques': 0,
        'Physique': 0,
        'Électronique': 0
    };
    
    // Compter les livres par catégorie dans le tableau
    document.querySelectorAll('.books-table tbody tr').forEach(row => {
        const categoryCell = row.children[3];
        if (categoryCell && categories.hasOwnProperty(categoryCell.textContent)) {
            categories[categoryCell.textContent]++;
        }
    });
    
    // Mettre à jour les compteurs dans les cartes de catégorie
    document.querySelectorAll('.category-card').forEach(card => {
        const title = card.querySelector('h3').textContent;
        const countElement = card.querySelector('.book-count');
        if (categories[title] !== undefined) {
            countElement.textContent = `${categories[title]} livre${categories[title] > 1 ? 's' : ''}`;
        }
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    updateBookCounts();
    
    // Animation d'entrée progressive
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
fsdfdf