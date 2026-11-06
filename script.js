/* =====================================
   THE BLACK WOLF
   JAVASCRIPT ENGINE
===================================== */


/* LOADER */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 2200);

});


/* TYPING EFFECT */

const typingElement = document.getElementById("typing");

const words = [

    "Future Software Engineer.",

    "Computer Science Student.",

    "Creative Thinker.",

    "Future Innovator."

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {

        charIndex--;

    } else {

        charIndex++;

    }

    typingElement.textContent =
        currentWord.substring(0, charIndex);


    let speed = deleting ? 45 : 85;


    if (!deleting && charIndex === currentWord.length) {

        deleting = true;

        speed = 1500;

    }


    if (deleting && charIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        speed = 400;

    }


    setTimeout(typeEffect, speed);

}


typeEffect();


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.12

    }

);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});


/* AUTOMATIC YEAR */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* PARTICLE SYSTEM */

const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");


let particles = [];

let width, height;


function resizeCanvas() {

    width = canvas.width = window.innerWidth;

    height = canvas.height = window.innerHeight;

}


window.addEventListener("resize", resizeCanvas);

resizeCanvas();


class Particle {

    constructor() {

        this.x = Math.random() * width;

        this.y = Math.random() * height;

        this.size = Math.random() * 2 + 0.5;

        this.speedX = (Math.random() - 0.5) * 0.4;

        this.speedY = (Math.random() - 0.5) * 0.4;

        this.opacity = Math.random();

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (this.x < 0 || this.x > width) {

            this.speedX *= -1;

        }


        if (this.y < 0 || this.y > height) {

            this.speedY *= -1;

        }


        this.opacity += (Math.random() - 0.5) * 0.03;

        this.opacity = Math.max(
            0.2,
            Math.min(1, this.opacity)
        );

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(180, 130, 255, ${this.opacity})`;

        ctx.shadowBlur = 12;

        ctx.shadowColor = "#8b5cf6";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


/* CREATE PARTICLES */

const particleCount = Math.min(
    100,
    Math.floor(window.innerWidth / 12)
);


for (let i = 0; i < particleCount; i++) {

    particles.push(new Particle());

}


/* ANIMATION LOOP */

function animateParticles() {

    ctx.clearRect(0, 0, width, height);


    particles.forEach((particle) => {

        particle.update();

        particle.draw();

    });


    requestAnimationFrame(animateParticles);

}


animateParticles();


/* PROJECT CARD MOUSE EFFECT */

document.querySelectorAll(".project-card").forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;


        card.style.background = `radial-gradient(
            circle at ${x}px ${y}px,
            rgba(130, 70, 230, 0.12),
            #0c0912 70%
        )`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.background = "#0c0912";

    });

});


/* PROFILE DEPTH EFFECT */

const profileFrame = document.querySelector(".profile-frame");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (profileFrame) {

    profileFrame.addEventListener("pointermove", (event) => {

        if (reduceMotion.matches || event.pointerType === "touch") {
            return;
        }

        const bounds = profileFrame.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

        profileFrame.style.setProperty("--tilt-x", `${vertical * -14}deg`);
        profileFrame.style.setProperty("--tilt-y", `${horizontal * 14}deg`);

    });

    profileFrame.addEventListener("pointerleave", () => {

        profileFrame.style.setProperty("--tilt-x", "0deg");
        profileFrame.style.setProperty("--tilt-y", "0deg");

    });

    reduceMotion.addEventListener("change", (event) => {

        if (event.matches) {
            profileFrame.style.setProperty("--tilt-x", "0deg");
            profileFrame.style.setProperty("--tilt-y", "0deg");
        }

    });

}


/* CONSOLE IDENTITY */

console.log(

    "%c THE BLACK WOLF ",

    "background: #120822; color: #c4a4ff; font-size: 25px; padding: 15px;"

);


console.log(

    "%c Welcome to Fènou's digital universe.",

    "color: #a78bfa; font-size: 14px;"

);