const translations = {
    'en': {
        'home': 'Home',
        'about': 'About',
        'work': 'My Work',
        'skills': 'Skills',
        'developer-title': 'web developer',
        'typing-text': 'Welcome to my portfolio !',
        'about-title': 'About Me',
        'about-text-1': 'I am an 18 years old web developer, passionate about creating web experiences for friends or clients.',
        'about-text-2': 'With a strong focus on user experience and a keen eye for design, I strive to deliver visually stunning and functional websites that meet the needs of my clients.',
        'work-title': 'My work',
        'project-kayro': 'Kayro',
        'project-kayro-desc': 'Website for Kayro\'s Discord server',
        'skills-title': 'Skills',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'tools': 'Tools',
        'view-project': 'View project',
        'copyright': '© 2024 zenkey. All rights reserved.'
    },
    'fr': {
        'home': 'Accueil',
        'about': 'À propos',
        'work': 'projets',
        'skills': 'Compétences',
        'developer-title': 'développeur web',
        'typing-text': 'Bienvenue sur mon portfolio !',
        'about-title': 'À propos de moi',
        'about-text-1': 'Je suis un développeur web de 18 ans, passionné par la création d\'expériences web pour mes amis ou clients.',
        'about-text-2': 'Avec un fort accent sur l\'expérience utilisateur et un œil avisé pour le design, je m\'efforce de créer des sites web visuellement impressionnants et fonctionnels qui répondent aux besoins de mes clients.',
        'work-title': 'Mes projets',
        'project-kayro': 'Kayro',
        'project-kayro-desc': 'Site web pour le serveur Discord de Kayro',
        'skills-title': 'Compétences',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'tools': 'Outils',
        'view-project': 'Voir le projet',
        'copyright': '© 2024 zenkey. Tous droits reservés.'
    }
};

let typingTimeout = null;

function typeText(text) {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    element.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, 100);
        }
    }
    
    type();
}

function changeLanguage(lang) {
    const flagIcon = document.querySelector('.lang-btn i:first-child');
    flagIcon.className = `fi fi-${lang === 'en' ? 'gb' : 'fr'}`;

    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.remove('show');

    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                    element.placeholder = translations[lang][key];
                } else if (key === 'typing-text') {
                } else {
                    element.textContent = translations[lang][key];
                }
            }
            element.style.opacity = '1';
        }, 300);
    });

    setTimeout(() => {
        typeText(translations[lang]['typing-text']);
    }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    changeLanguage(savedLanguage);
});

document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.querySelector('.lang-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.lang-dropdown')) {
            dropdownContent.classList.remove('show');
        }
    });

    langBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdownContent.classList.toggle('show');
    });
});
