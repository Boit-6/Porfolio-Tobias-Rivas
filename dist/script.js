"use strict";
const text = {
    es: {
        subtitle: 'Estudiante • Desarrollador Junior',
        aboutHeading: 'Sobre mi',
        aboutParagraphEl: 'Estudiante de programación con una experiencia en el área de Electrónica y en el área de soporte técnico. Buscando crecer como Desarrollador Junior, contribuyendo con habilidades en desarrollo web y bases de datos, combinados con trabajo en equipo, aprendizaje rápido y adaptabilidad.',
        skillsHeading: 'Habilidades',
        projectsHeading: 'Proyectos',
        projectDescription: 'Apuestcraft es un proyecto en el que deseo tomar mis primeros pasos en programación. Es un pequeño (falso) casino temático en Minecraft que desarrollé usando HTML, CSS y JavaScript.',
        headerFooter: 'Contacto'
    },
    en: {
        subtitle: 'Student • Junior Developer',
        aboutHeading: 'About Me',
        aboutParagraphEl: 'Programming student with a background in Electronics and experience in technical support. Seeking to grow as a Junior Developer, contributing skills in web development and databases, combined with teamwork, quick learning, and adaptability.',
        skillsHeading: 'Skills',
        projectsHeading: 'Projects',
        projectDescription: 'Apuestcraft is a project with which I wanted to take my first steps in programming. It is a small (fake) casino themed around Minecraft that I developed using HTML, CSS and JavaScript.',
        headerFooter: 'Contact'
    }
};
// -------------------------
// Helpers: storage + DOM safe helpers
// -------------------------
function getLanguage() {
    const language = localStorage.getItem('language');
    if (language === 'es' || language === 'en')
        return language;
    return 'es';
}
function setLanguage(language) {
    localStorage.setItem('language', language);
}
// -------------------------
// Main UI initialization
// - runs on DOMContentLoaded to ensure elements exist
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Element references (with fallbacks)
    const aboutEl = document.getElementById('about-heading') || document.querySelector('.about__heading');
    const aboutParagraphEl = document.getElementById('about-paragraph') || document.querySelector('.about p');
    const subtitleEl = document.querySelector('.me__subtitle');
    const skillsHeadingEl = document.getElementById('skills-heading') || document.querySelector('.skills h3');
    const projectsHeadingEl = document.getElementById('projects-heading');
    const projectDescriptionEl = document.querySelector('.projects__description');
    const headerFooter = document.getElementById('header-footer');
    // Utility: set text content safely
    function setText(el, value) {
        if (!el)
            return;
        el.textContent = value;
    }
    // Apply translations to page
    function applyLanguage(lang) {
        setText(aboutEl, text[lang].aboutHeading);
        setText(aboutParagraphEl, text[lang].aboutParagraphEl);
        setText(subtitleEl, text[lang].subtitle);
        setText(skillsHeadingEl, text[lang].skillsHeading);
        setText(projectsHeadingEl, text[lang].projectsHeading);
        setText(projectDescriptionEl, text[lang].projectDescription);
        setText(headerFooter, text[lang].headerFooter);
    }
    // Initialize language
    applyLanguage(getLanguage());
    // Language toggle button
    const langButton = document.querySelector('.page-actions__language-button');
    if (langButton) {
        langButton.addEventListener('click', () => {
            const current = getLanguage();
            const next = current === 'es' ? 'en' : 'es';
            setLanguage(next);
            applyLanguage(next);
        });
    }
    // Theme toggle: select the button by class (BEM) and attach listener here
    const themeButtonEl = document.querySelector('.page-actions__theme-button');
    const rootEl = document.documentElement;
    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        rootEl.classList.add('dark');
        rootEl.classList.remove('light');
    }
    else if (storedTheme === 'light') {
        rootEl.classList.add('light');
        rootEl.classList.remove('dark');
    }
    // Add theme toggle listener (defensive)
    if (themeButtonEl) {
        themeButtonEl.addEventListener('click', () => {
            const current = localStorage.getItem('theme');
            if (current === 'light') {
                localStorage.setItem('theme', 'dark');
                rootEl.classList.remove('light');
                rootEl.classList.add('dark');
            }
            else {
                localStorage.setItem('theme', 'light');
                rootEl.classList.remove('dark');
                rootEl.classList.add('light');
            }
        });
    }
});
