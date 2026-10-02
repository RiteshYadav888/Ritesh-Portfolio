/* =========================================================
   RITESH YADAV — ADVANCED PORTFOLIO
   SCRIPT.JS
========================================================= */


/* =========================================================
   01. SELECTORS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   02. PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = $("#page-loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 700);

    }, 900);

});


/* =========================================================
   03. ELEMENTS
========================================================= */

const navbar = $("#navbar");
const navLinks = $("#nav-links");
const menuBtn = $("#menu-btn");

const progressBar = $("#scroll-progress");

const backToTop = $("#back-to-top");

const hero = $(".hero");
const heroImage = $(".hero-image");

const cursorDot = $(".cursor-dot");
const cursorOutline = $(".cursor-outline");


/* =========================================================
   04. NAVBAR
========================================================= */

function handleNavbar() {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* =========================================================
   05. MOBILE MENU
========================================================= */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuBtn.classList.toggle("active");

    });

}


/* Close menu after clicking a link */

$$(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.classList.remove("active");

    });

});


/* =========================================================
   06. SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? scrollTop / documentHeight
            : 0;

    if (progressBar) {
        progressBar.style.transform =
            `scaleX(${progress})`;
    }

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   07. BACK TO TOP
========================================================= */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   08. TYPEWRITER
========================================================= */

const typingElement = $("#typing-text");

const titles = [

    "AI & Data Science Student",
    "Future AI Engineer",
    "Developer",
    "Problem Solver",
    "Tech Explorer"

];

let titleIndex = 0;
let characterIndex = 0;

let deleting = false;

function typeWriter() {

    if (!typingElement) return;

    const currentTitle = titles[titleIndex];

    if (!deleting) {

        characterIndex++;

        typingElement.textContent =
            currentTitle.slice(0, characterIndex);

        if (characterIndex === currentTitle.length) {

            deleting = true;

            setTimeout(typeWriter, 1700);

            return;
        }

    } else {

        characterIndex--;

        typingElement.textContent =
            currentTitle.slice(0, characterIndex);

        if (characterIndex === 0) {

            deleting = false;

            titleIndex =
                (titleIndex + 1) % titles.length;

        }

    }

    const speed = deleting ? 35 : 70;

    setTimeout(typeWriter, speed);

}

typeWriter();


/* =========================================================
   09. CUSTOM CURSOR
========================================================= */

const supportsFinePointer =
    window.matchMedia("(pointer: fine)").matches;


if (
    supportsFinePointer &&
    cursorDot &&
    cursorOutline
) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;


    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    });


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.15;

        outlineY +=
            (mouseY - outlineY) * 0.15;

        cursorOutline.style.left =
            `${outlineX}px`;

        cursorOutline.style.top =
            `${outlineY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    /* Cursor hover */

    $$("a, button, .skill-category, .project-card")
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorOutline.style.width =
                        "58px";

                    cursorOutline.style.height =
                        "58px";

                    cursorOutline.style.background =
                        "rgba(255,255,255,.04)";

                    cursorOutline.style.borderColor =
                        "rgba(255,255,255,.7)";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorOutline.style.width =
                        "34px";

                    cursorOutline.style.height =
                        "34px";

                    cursorOutline.style.background =
                        "transparent";

                    cursorOutline.style.borderColor =
                        "rgba(255,255,255,.4)";

                }
            );

        });

}


/* =========================================================
   10. SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   11. ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("section[id]");

const navigationLinks =
    $$(".nav-links a");


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id =
                    entry.target.getAttribute("id");

                navigationLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   12. HERO PARALLAX
========================================================= */

if (hero && heroImage) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.innerWidth <= 700) return;

            const rect =
                hero.getBoundingClientRect();

            const offset =
                rect.top * -0.025;

            heroImage.style.transform =
                `scale(1.03) translateY(${offset}px)`;

        },
        { passive: true }
    );

}


/* =========================================================
   13. 3D TILT — PROJECT CARDS
========================================================= */

$$(".project-card").forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 700) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   14. MAGNETIC BUTTONS
========================================================= */

$$(".magnetic").forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 700) return;

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "";

        }
    );

});


/* =========================================================
   15. SKILL CARD MOUSE GLOW
========================================================= */

$$(".skill-category").forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    400px circle at ${x}px ${y}px,
                    rgba(255,255,255,.05),
                    rgba(255,255,255,.012) 45%
                )
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.background =
                "rgba(255,255,255,.012)";

        }
    );

});


/* =========================================================
   16. ANIMATED COUNTERS
========================================================= */

const counters =
    $$("[data-count]");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.getAttribute("data-count")
                    );

                let current = 0;

                const duration = 1000;

                const startTime =
                    performance.now();


                function updateCounter(time) {

                    const progress =
                        Math.min(
                            (time - startTime) / duration,
                            1
                        );

                    current =
                        Math.floor(
                            progress * target
                        );

                    counter.textContent =
                        current;

                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target;

                    }

                }

                requestAnimationFrame(
                    updateCounter
                );

                counterObserver.unobserve(
                    counter
                );

            });

        },

        {
            threshold: 0.7
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   17. SMOOTH ANCHOR LINKS
========================================================= */

$$('a[href^="#"]').forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   18. IMAGE PARALLAX / MOUSE MOVEMENT
========================================================= */

const heroVisual =
    $(".hero-image-wrapper");


if (
    heroVisual &&
    supportsFinePointer
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            const frame =
                heroVisual.querySelector(
                    ".image-frame"
                );

            const orbitOne =
                heroVisual.querySelector(
                    ".orbit-one"
                );

            const orbitTwo =
                heroVisual.querySelector(
                    ".orbit-two"
                );


            if (frame) {

                frame.style.transform =
                    `rotate(${x * 3}deg)
                     translate(${x * 8}px, ${y * 8}px)`;

            }


            if (orbitOne) {

                orbitOne.style.transform =
                    `rotate(-25deg)
                     translate(${x * 12}px, ${y * 12}px)`;

            }


            if (orbitTwo) {

                orbitTwo.style.transform =
                    `rotate(55deg)
                     translate(${x * -10}px, ${y * -10}px)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const frame =
                heroVisual.querySelector(
                    ".image-frame"
                );

            const orbitOne =
                heroVisual.querySelector(
                    ".orbit-one"
                );

            const orbitTwo =
                heroVisual.querySelector(
                    ".orbit-two"
                );


            if (frame) {
                frame.style.transform =
                    "";
            }

            if (orbitOne) {
                orbitOne.style.transform =
                    "";
            }

            if (orbitTwo) {
                orbitTwo.style.transform =
                    "";
            }

        }
    );

}


/* =========================================================
   19. KEYBOARD ACCESS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("open");

            menuBtn.classList.remove("active");

        }

    }
);


/* =========================================================
   20. CONSOLE
========================================================= */

console.log(
    "%c Ritesh Yadav | Portfolio ",
    `
        background:#fff;
        color:#000;
        padding:8px 12px;
        border-radius:5px;
        font-weight:bold;
        font-size:14px;
    `
);

console.log(
    "%cBuilt with HTML • CSS • JavaScript",
    "color:#888;font-size:12px;"
);