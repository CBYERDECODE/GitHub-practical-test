
// 1. Dark / Light Theme Toggle

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeButton.textContent = "☾";
    } else {
        themeButton.textContent = "☀";
    }
});


// 2. Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


// 3. Scroll Reveal Animation

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {
    observer.observe(element);
});


// 4. 3D Mouse Movement Effect

const cards = document.querySelectorAll(".tilt-card:not(.main-card)");

cards.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 18;
        const rotateY = (x - centerX) / 18;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", function () {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

});


// 5. Typing Animation

const typingText = document.getElementById("typingText");

const words = [
    "reality.",
    "innovation.",
    "intelligence.",
    "possibilities."
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {
        typingText.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 55 : 100);
}

typeEffect();


// 6. Automatic Copyright Year

document.getElementById("year").textContent =
    new Date().getFullYear();


// 7. Disable 3D movement on touch devices

if (window.matchMedia("(hover: none)").matches) {
    cards.forEach(function (card) {
        card.style.transform = "none";
    });
}
