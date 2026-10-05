"use strict";
//----- CONFIGURACIÓN DE EMAILJS -----
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'LZf-LJVjwAb6EGKup',
    SERVICE_ID: 'service_kea1fdf',
    TEMPLATE_ID: 'template_8t4vqeg'
};
// EmailJS se carga recién al abrir el formulario: si el CDN está bloqueado, el resto del sitio sigue andando
let emailJSReady = null;
function loadEmailJS() {
    if (!emailJSReady) {
        emailJSReady = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = () => {
                emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
                resolve();
            };
            script.onerror = () => {
                script.remove();
                emailJSReady = null;
                reject(new Error('No se pudo cargar EmailJS'));
            };
            document.head.appendChild(script);
        });
    }
    return emailJSReady;
}
function q(selector) {
    return document.querySelector(selector);
}
//----- IDIOMAS -----
const text = {
    es: {
        subtitle: 'Técnico Universitario en Programación • Desarrollador Full Stack',
        location: 'Mendoza, Argentina',
        cvButton: 'Descargar CV',
        cvFile: 'cv/CV-Tobias-Rivas-ES.pdf',
        title: 'Tobias Rivas • Desarrollador Full Stack (React, Next.js, NestJS)',
        metaDescription: 'Portfolio de Tobias Rivas, Técnico Universitario en Programación y desarrollador full stack de Mendoza, Argentina.',
        aboutHeading: 'Sobre mí',
        aboutParagraphEl: 'Técnico Universitario en Programación (UTN) y Técnico en Electrónica. Desarrollo aplicaciones web full stack con React, Next.js, NestJS y PostgreSQL, y automatizo procesos con n8n. Vengo del servicio técnico de hardware, así que resuelvo tanto problemas de software como de equipos y redes. Busco un puesto como desarrollador full stack, remoto o presencial en Mendoza. Disponibilidad inmediata.',
        aboutLanguages: 'Idiomas: Español (nativo) • Inglés (intermedio, B1)',
        skillsHeading: 'Habilidades',
        toolsHeading: 'Herramientas',
        otherHeading: 'También trabajé con',
        contactText: 'Escribime por mail o encontrame en GitHub y LinkedIn.',
        educationHeading: 'Educación',
        educationTitle: 'Tecnicatura Universitaria en Programación',
        educationInstitution: 'Universidad Tecnológica Nacional (UTN) • Facultad Regional Mendoza',
        educationDate: '2024 - 2026 • Finalizada',
        education2Title: 'Técnico en Electrónica',
        education2Institution: 'Escuela Técnica Horacio Martínez Leanez',
        education2Date: '2023 • Título secundario',
        experienceHeading: 'Experiencia',
        experience1Title: 'Desarrollador Full Stack',
        experience1Company: 'Temotiva • Colaboración voluntaria • Remoto',
        experience1Date: 'Abril 2026 - Octubre 2026',
        experience1Description: 'Temotiva es una app española de bienestar emocional, con una plataforma para empresas. Rediseñé por completo su sección B2B (Temotiva Prevent, prevención del burnout para organizaciones), hoy en producción; me encargué del SEO del sitio y corregí bugs en el back-end. Trabajé con React, NestJS y Tailwind CSS.',
        experience1Link: 'Ver la sección B2B en producción',
        experience2Title: 'Técnico en Electrónica y Soporte Informático',
        experience2Company: 'Servicio Técnico Independiente • Freelance',
        experience2Date: '2022 - Actualidad',
        experience2Description: 'Diagnóstico y reparación de PC y notebooks a nivel componente y placa, instalación de cámaras de seguridad y optimización de equipos, con atención directa al cliente.',
        experience3Title: 'Técnico',
        experience3Company: 'La Consola Digital • Mendoza',
        experience3Date: '2022',
        experience3Description: 'Armado, configuración, optimización y reparación de equipos informáticos.',
        projectsHeading: 'Proyectos',
        projectRepo: 'Repositorio',
        projectDemo: 'Demo en vivo',
        projectSite: 'Ver sitio',
        project1Title: 'CRM para freelancers',
        project1Tag: 'Trabajo Final • Tecnicatura Universitaria en Programación (UTN)',
        project1Description: 'Plataforma que lleva un pedido de la consulta al cobro sin tareas manuales: propuesta en línea, factura en PDF, pagos protegidos por hitos con Stripe y panel en tiempo real. Empezó como trabajo final en equipo de dos y después la amplié por mi cuenta.',
        project1Highlight1: 'Pagos con Stripe Connect por hitos: fondos retenidos, liberación automática a los 7 días y webhooks idempotentes con firma verificada.',
        project1Highlight2: 'Automatización en n8n con 21 webhooks, 9 procesos programados y 314 nodos.',
        project1Highlight3: '291 casos de prueba de RLS, 240 pruebas de front con Vitest y CI con lint, tipos, build y escaneo de secretos.',
        project1ImageAlt: 'Panel del CRM para freelancers',
        project2Title: 'El Hornero',
        project2Tag: 'Sitio web en producción • Salón de eventos',
        project2Description: 'Sitio donde la persona arma su evento paso a paso, consulta la disponibilidad de la fecha y envía todo por WhatsApp con un PDF. Incluye un panel para que el salón gestione las consultas.',
        project2ImageAlt: 'Sitio web de El Hornero',
        headerFooter: 'Contacto',
        modalTitle: 'Envíame un mensaje',
        labelName: 'Nombre',
        labelEmail: 'Correo electrónico',
        labelMessage: 'Mensaje',
        submitButton: 'Enviar',
        buttonSending: 'Enviando...',
        successMessage: '¡Mensaje enviado exitosamente!',
        errorMessage: 'No se pudo enviar. Escribime a tobiasbrivas@gmail.com',
        errorNameRequired: 'El nombre es requerido',
        errorEmailRequired: 'El email es requerido',
        errorEmailInvalid: 'Email inválido',
        errorMessageRequired: 'El mensaje es requerido'
    },
    en: {
        subtitle: 'Full Stack Developer • Associate Degree in Programming',
        location: 'Mendoza, Argentina',
        cvButton: 'Download CV',
        cvFile: 'cv/CV-Tobias-Rivas-EN.pdf',
        title: 'Tobias Rivas • Full Stack Developer (React, Next.js, NestJS)',
        metaDescription: 'Portfolio of Tobias Rivas, full stack developer with an Associate Degree in Programming, from Mendoza, Argentina.',
        aboutHeading: 'About Me',
        aboutParagraphEl: 'I hold an Associate Degree in Programming (UTN) and I am an Electronics Technician. I build full stack web applications with React, Next.js, NestJS and PostgreSQL, and automate processes with n8n. I come from hardware technical support, so I solve software problems as well as equipment and network issues. Looking for a full stack developer role, remote or on-site in Mendoza. Available immediately.',
        aboutLanguages: 'Languages: Spanish (native) • English (intermediate, B1)',
        skillsHeading: 'Skills',
        toolsHeading: 'Tools',
        otherHeading: 'Also worked with',
        contactText: 'Email me or find me on GitHub and LinkedIn.',
        educationHeading: 'Education',
        educationTitle: 'Associate Degree in Programming',
        educationInstitution: 'National Technological University (UTN) • Mendoza Regional Faculty',
        educationDate: '2024 - 2026 • Completed',
        education2Title: 'Electronics Technician',
        education2Institution: 'Escuela Técnica Horacio Martínez Leanez',
        education2Date: '2023 • Technical high school degree',
        experienceHeading: 'Experience',
        experience1Title: 'Full Stack Developer',
        experience1Company: 'Temotiva • Volunteer collaboration • Remote',
        experience1Date: 'April 2026 - October 2026',
        experience1Description: 'Temotiva is a Spanish emotional wellbeing app with a platform for companies. I fully redesigned its B2B section (Temotiva Prevent, burnout prevention for organizations), now in production; I handled the site\'s SEO and fixed back-end bugs. I worked with React, NestJS and Tailwind CSS.',
        experience1Link: 'See the B2B section in production',
        experience2Title: 'Electronics Technician and IT Support',
        experience2Company: 'Independent Technical Service • Freelance',
        experience2Date: '2022 - Present',
        experience2Description: 'Diagnosis and repair of desktop PCs and laptops at component and board level, security camera installation and equipment optimization, dealing directly with clients.',
        experience3Title: 'Technician',
        experience3Company: 'La Consola Digital • Mendoza',
        experience3Date: '2022',
        experience3Description: 'Assembly, configuration, optimization and repair of computer equipment.',
        projectsHeading: 'Projects',
        projectRepo: 'Repository',
        projectDemo: 'Live demo',
        projectSite: 'View site',
        project1Title: 'CRM for freelancers',
        project1Tag: 'Final Project • Associate Degree in Programming (UTN)',
        project1Description: 'Platform that takes a request from inquiry to payment with no manual tasks: online proposal, PDF invoice, milestone-protected payments with Stripe and a real-time dashboard. It started as a final project in a team of two, and I then extended it on my own.',
        project1Highlight1: 'Milestone payments with Stripe Connect: funds held, automatic release after 7 days and idempotent webhooks with signature verification.',
        project1Highlight2: 'n8n automation with 21 webhooks, 9 scheduled processes and 314 nodes.',
        project1Highlight3: '291 RLS test cases, 240 front-end tests with Vitest, and CI with lint, type checks, build and secret scanning.',
        project1ImageAlt: 'CRM for freelancers dashboard',
        project2Title: 'El Hornero',
        project2Tag: 'Website in production • Event venue',
        project2Description: 'Site where people plan their event step by step, check date availability and send everything over WhatsApp with a PDF. Includes a dashboard for the venue to manage inquiries.',
        project2ImageAlt: 'El Hornero website',
        headerFooter: 'Contact',
        modalTitle: 'Send me a message',
        labelName: 'Name',
        labelEmail: 'Email',
        labelMessage: 'Message',
        submitButton: 'Send',
        buttonSending: 'Sending...',
        successMessage: 'Message sent successfully!',
        errorMessage: 'Could not send. Email me at tobiasbrivas@gmail.com',
        errorNameRequired: 'Name is required',
        errorEmailRequired: 'Email is required',
        errorEmailInvalid: 'Invalid email',
        errorMessageRequired: 'Message is required'
    }
};
//----- FUNCIONES DE IDIOMA -----
function getLanguage() {
    const lang = localStorage.getItem('language');
    return lang === 'en' ? 'en' : 'es';
}
function setLanguage(lang) {
    localStorage.setItem('language', lang);
}
function setText(el, value) {
    if (el)
        el.textContent = value;
}
//----- FUNCIONES DE VALIDACIÓN Y UI -----
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg)
        return;
    toastMsg.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);
    if (!input || !error)
        return;
    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}
function showSuccess(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);
    input?.classList.remove('error');
    input?.classList.add('success');
    error?.classList.remove('show');
}
function clearValidation(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);
    input?.classList.remove('error', 'success');
    error?.classList.remove('show');
}
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = q('.page-actions__language-button');
    const themeBtn = q('.page-actions__theme-button');
    const modal = document.getElementById('contact-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const mailBtn = q('#mail-button');
    const modalClose = q('#modal-close');
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput = document.getElementById('message');
    const submitBtn = q('#submit-button');
    const root = document.documentElement;
    function applyLanguage(lang) {
        const elements = {
            'about-heading': text[lang].aboutHeading,
            'location': text[lang].location,
            'cv-button-text': text[lang].cvButton,
            'about-paragraph': text[lang].aboutParagraphEl,
            'about-languages': text[lang].aboutLanguages,
            'skills-heading': text[lang].skillsHeading,
            'tools-heading': text[lang].toolsHeading,
            'other-heading': text[lang].otherHeading,
            'contact-text': text[lang].contactText,
            'education-heading': text[lang].educationHeading,
            'education-title': text[lang].educationTitle,
            'education-institution': text[lang].educationInstitution,
            'education-date': text[lang].educationDate,
            'education2-title': text[lang].education2Title,
            'education2-institution': text[lang].education2Institution,
            'education2-date': text[lang].education2Date,
            'experience-heading': text[lang].experienceHeading,
            'experience1-title': text[lang].experience1Title,
            'experience1-company': text[lang].experience1Company,
            'experience1-date': text[lang].experience1Date,
            'experience1-description': text[lang].experience1Description,
            'experience1-link': text[lang].experience1Link,
            'experience2-title': text[lang].experience2Title,
            'experience2-company': text[lang].experience2Company,
            'experience2-date': text[lang].experience2Date,
            'experience2-description': text[lang].experience2Description,
            'experience3-title': text[lang].experience3Title,
            'experience3-company': text[lang].experience3Company,
            'experience3-date': text[lang].experience3Date,
            'experience3-description': text[lang].experience3Description,
            'projects-heading': text[lang].projectsHeading,
            'project1-title': text[lang].project1Title,
            'project1-tag': text[lang].project1Tag,
            'project1-description': text[lang].project1Description,
            'project1-highlight1': text[lang].project1Highlight1,
            'project1-highlight2': text[lang].project1Highlight2,
            'project1-highlight3': text[lang].project1Highlight3,
            'project1-repo': text[lang].projectRepo,
            'project1-demo': text[lang].projectDemo,
            'project2-title': text[lang].project2Title,
            'project2-tag': text[lang].project2Tag,
            'project2-description': text[lang].project2Description,
            'project2-demo': text[lang].projectSite,
            'header-footer': text[lang].headerFooter,
            'modal-title': text[lang].modalTitle,
            'label-name': text[lang].labelName,
            'label-email': text[lang].labelEmail,
            'label-message': text[lang].labelMessage,
            'button-text': text[lang].submitButton
        };
        Object.entries(elements).forEach(([id, value]) => setText(document.getElementById(id), value));
        const subtitle = q('.me__subtitle');
        setText(subtitle, text[lang].subtitle);
        document.getElementById('project1-image')?.setAttribute('alt', text[lang].project1ImageAlt);
        document.getElementById('project2-image')?.setAttribute('alt', text[lang].project2ImageAlt);
        document.getElementById('cv-button')?.setAttribute('href', text[lang].cvFile);
        q('meta[name="description"]')?.setAttribute('content', text[lang].metaDescription);
        document.title = text[lang].title;
        root.lang = lang;
        root.classList.remove('i18n-pending');
    }
    applyLanguage(getLanguage());
    // Alternar idioma al hacer click
    langBtn?.addEventListener('click', () => {
        const nextLang = getLanguage() === 'es' ? 'en' : 'es';
        setLanguage(nextLang);
        applyLanguage(nextLang);
    });
    //----- Tema oscuro / claro -----
    // El tema inicial lo aplica el script del <head>; esto cubre el caso de que no haya corrido
    if (!root.classList.contains('dark') && !root.classList.contains('light')) {
        root.classList.add(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
    }
    themeBtn?.addEventListener('click', () => {
        const current = root.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        root.classList.replace(current, next);
        localStorage.setItem('theme', next);
    });
    //----- Modal de mail -----
    // Modal de contacto: abrir / cerrar con accesibilidad básica
    let lastFocused = null;
    const openModal = () => {
        lastFocused = document.activeElement;
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
        nameInput?.focus();
        loadEmailJS().catch(() => { });
    };
    const closeModal = () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
        form?.reset();
        ['name', 'email', 'message'].forEach(clearValidation);
        lastFocused?.focus();
    };
    // Mantiene el foco dentro del modal mientras está abierto
    modal?.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab')
            return;
        const focusables = modal.querySelectorAll('button, input, textarea');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last)
            return;
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
    mailBtn?.addEventListener('click', openModal);
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && modal?.classList.contains('active') && closeModal());
    // Envío del formulario
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!nameInput || !emailInput || !msgInput || !submitBtn) {
            console.warn('Formulario incompleto en el DOM — submit abortado.');
            return;
        }
        const lang = getLanguage();
        let valid = true;
        if (!nameInput.value.trim()) {
            showError('name', text[lang].errorNameRequired);
            valid = false;
        }
        if (!emailInput.value.trim()) {
            showError('email', text[lang].errorEmailRequired);
            valid = false;
        }
        else if (!validateEmail(emailInput.value)) {
            showError('email', text[lang].errorEmailInvalid);
            valid = false;
        }
        if (!msgInput.value.trim()) {
            showError('message', text[lang].errorMessageRequired);
            valid = false;
        }
        if (!valid)
            return;
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        try {
            await loadEmailJS();
            await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form);
            showToast(text[lang].successMessage);
            setTimeout(closeModal, 1500);
        }
        catch {
            showToast(text[lang].errorMessage, true);
        }
        finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
});
