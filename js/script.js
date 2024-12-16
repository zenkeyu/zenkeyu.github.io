// Animation du texte
/* Script désactivé car remplacé par language.js
const typingText = document.querySelector('.typing-text');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    // Code commenté
}

setInterval(type, 100);
*/

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    
    nav.classList.toggle('nav-active');
    
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    
    burger.classList.toggle('toggle');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

const skillBars = document.querySelectorAll('.progress');

function showProgress() {
    skillBars.forEach(bar => {
        const value = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = value;
        }, 500);
    });
}

const skillsSection = document.querySelector('.skills');
const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
            observerSkills.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observerSkills.observe(skillsSection);
