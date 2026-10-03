/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 700);

});



/* =====================================================
   TYPING EFFECT
===================================================== */

const typingText = document.getElementById("typingText");

const roles = [

    "AI & Data Science Student",
    "Future AI Engineer",
    "Web Developer",
    "Python Learner",
    "Data Explorer",
    "Problem Solver"

];

let roleIndex = 0;
let charIndex = 0;

let deleting = false;


function typeRole() {

    if (!typingText) return;


    const currentRole = roles[roleIndex];


    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;


        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeRole, 1700);

            return;
        }


    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {

                roleIndex = 0;

            }

        }

    }


    setTimeout(
        typeRole,
        deleting ? 45 : 75
    );

}


typeRole();



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open"
        );

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}



/* =====================================================
   SCROLL PROGRESS
===================================================== */

const scrollProgress =
    document.getElementById("scrollProgress");


function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;


    scrollProgress.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


updateScrollProgress();



/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   ACTIVE NAV LINK
===================================================== */

const sections =
    document.querySelectorAll("section[id]");


const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;


        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


updateActiveNav();



/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}, { passive: true });


backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorOutline =
    document.querySelector(".cursor-outline");


if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer:fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;


    document.addEventListener("mousemove", event => {

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


    const hoverTargets =
        document.querySelectorAll(
            "a, button, .skill-card, .project-card, .stat-card"
        );


    hoverTargets.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorOutline.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorOutline.classList.remove(
                    "hover"
                );

            }
        );

    });

}



/* =====================================================
   SMOOTH ANCHOR SCROLL
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

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

    });

});



/* =====================================================
   PROJECT CARD MOUSE EFFECT
===================================================== */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) * -2;


            const rotateY =
                ((x / rect.width) - 0.5) * 2;


            card.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1200px) rotateX(0) rotateY(0)";

        }
    );

});



/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%cRitesh Yadav — Portfolio",
    "font-size:20px;font-weight:bold;"
);


console.log(
    "AI & Data Science | Web Development | Python"
);