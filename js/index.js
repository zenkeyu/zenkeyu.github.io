let isMusicPlaying = true;

function removeOverlay() {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('content');
    const audio = document.getElementById('background-music');

    document.body.classList.add('scroll-enabled');

    overlay.classList.add('hidden');
    setTimeout(() => {
        overlay.style.display = 'none';
        content.classList.add('visible');

        document.getElementById('music-toggle').style.display = 'block';
    }, 500);

    audio.volume = 0.1;
    audio.play();

    typeWriter('welcome-message', "web developer");
    typeWriter('pseudo', "zenkey");
}


function toggleMusic() {
    const audio = document.getElementById('background-music');
    const musicIcon = document.getElementById('music-icon');

    if (isMusicPlaying) {
        audio.pause();
        musicIcon.classList.remove("fa-pause");
        musicIcon.classList.add("fa-play");
    } else {
        audio.play();
        musicIcon.classList.remove("fa-play");
        musicIcon.classList.add("fa-pause");
    }

    isMusicPlaying = !isMusicPlaying;
}

const card = document.getElementById('card');

card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.1)';
    card.style.transition = 'transform 0.3s ease';
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".scroll-effect");

    function checkVisibility() {
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add("visible");
            } else {
                el.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});


function typeWriter(elementId, text) {
    let i = 0;
    const speed = 100;
    const element = document.getElementById(elementId);

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];

function createParticle(x, y) {
    particles.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        alpha: 1
    });
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.01;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
    });
}

function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const topNav = document.querySelector('header.top-nav');
const navMenu = document.querySelector('header nav ul');
const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    topNav.classList.toggle('active');
    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});