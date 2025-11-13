//----- CONFIGURACIÓN DE EMAILJS -----

interface EmailJSConfig {
    PUBLIC_KEY: string;
    SERVICE_ID: string;
    TEMPLATE_ID: string;
}

interface EmailJSResponse {
    status: number;
    text: string;
}

declare const emailjs: {
    init: (publicKey: string) => void;
    sendForm: (serviceId: string, templateId: string, form: HTMLFormElement) => Promise<EmailJSResponse>;
};

const EMAILJS_CONFIG: EmailJSConfig = {
    PUBLIC_KEY: 'LZf-LJVjwAb6EGKup',
    SERVICE_ID: 'service_kea1fdf',
    TEMPLATE_ID: 'template_8t4vqeg'
};

(function(): void {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

function q<T extends HTMLElement = HTMLElement>(selector: string): T | null {
    return document.querySelector(selector) as T | null;
}

//----- INTERFACES DE IDIOMA Y TEXTOS -----

interface LanguageText {
    subtitle: string;
    aboutHeading: string;
    aboutParagraphEl: string;
    skillsHeading: string;
    toolsHeading: string;
    educationHeading: string;
    educationTitle: string;
    educationDate: string;
    projectsHeading: string;
    projectDescription: string;
    headerFooter: string;
    modalTitle: string;
    labelName: string;
    labelEmail: string;
    labelMessage: string;
    submitButton: string;
    buttonSending: string;
    successMessage: string;
    errorMessage: string;
    errorNameRequired: string;
    errorEmailRequired: string;
    errorEmailInvalid: string;
    errorMessageRequired: string;
}

interface TextContent {
    es: LanguageText;
    en: LanguageText;
}

type Language = 'es' | 'en';

//----- IDIOMAS -----

const text: TextContent = {
    es: {
        subtitle: 'Estudiante • Desarrollador Junior',
        aboutHeading: 'Sobre mí',
        aboutParagraphEl: 'Estudiante de programación con experiencia en Electrónica y soporte técnico. Busco crecer como Desarrollador Junior, aportando habilidades en desarrollo web, bases de datos, trabajo en equipo y adaptabilidad.',
        skillsHeading: 'Habilidades',
        toolsHeading: 'Herramientas',
        educationHeading: 'Educación',
        educationTitle: 'Tecnicatura en Programación',
        educationDate: '2024 - Presente',
        projectsHeading: 'Proyectos',
        projectDescription: 'Apuestcraft es un pequeño casino temático de Minecraft desarrollado con HTML, CSS y JavaScript.',
        headerFooter: 'Contacto',
        modalTitle: 'Envíame un mensaje',
        labelName: 'Nombre',
        labelEmail: 'Correo electrónico',
        labelMessage: 'Mensaje',
        submitButton: 'Enviar',
        buttonSending: 'Enviando...',
        successMessage: '¡Mensaje enviado exitosamente!',
        errorMessage: 'Error al enviar. Intenta de nuevo.',
        errorNameRequired: 'El nombre es requerido',
        errorEmailRequired: 'El email es requerido',
        errorEmailInvalid: 'Email inválido',
        errorMessageRequired: 'El mensaje es requerido'
    },
    en: {
        subtitle: 'Student • Junior Developer',
        aboutHeading: 'About Me',
        aboutParagraphEl: 'Programming student with a background in Electronics and technical support. Seeking to grow as a Junior Developer with skills in web development, databases, teamwork, and adaptability.',
        skillsHeading: 'Skills',
        toolsHeading: 'Tools',
        educationHeading: 'Education',
        educationTitle: 'Technical Degree in Programming',
        educationDate: '2024 - Present',
        projectsHeading: 'Projects',
        projectDescription: 'Apuestcraft is a small (fake) Minecraft-themed casino developed using HTML, CSS, and JavaScript.',
        headerFooter: 'Contact',
        modalTitle: 'Send me a message',
        labelName: 'Name',
        labelEmail: 'Email',
        labelMessage: 'Message',
        submitButton: 'Send',
        buttonSending: 'Sending...',
        successMessage: 'Message sent successfully!',
        errorMessage: 'Failed to send. Try again.',
        errorNameRequired: 'Name is required',
        errorEmailRequired: 'Email is required',
        errorEmailInvalid: 'Invalid email',
        errorMessageRequired: 'Message is required'
    }
};

//----- FUNCIONES DE IDIOMA -----

function getLanguage(): Language {
    const lang = localStorage.getItem('language');
    return lang === 'en' ? 'en' : 'es';
}

function setLanguage(lang: Language): void {
    localStorage.setItem('language', lang);
}

function setText(el: HTMLElement | null, value: string): void {
    if (el) el.textContent = value;
}

//----- FUNCIONES DE VALIDACIÓN Y UI -----

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message: string, isError = false): void {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function showError(inputId: string, message: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement;
    const error = document.getElementById(`${inputId}-error`);
    if (!input || !error) return;
    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}

function showSuccess(inputId: string): void {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);
    input?.classList.remove('error');
    input?.classList.add('success');
    error?.classList.remove('show');
}

function clearValidation(inputId: string): void {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);
    input?.classList.remove('error', 'success');
    error?.classList.remove('show');
}


document.addEventListener('DOMContentLoaded', () => {
    const langBtn = q<HTMLButtonElement>('.page-actions__language-button');
    const themeBtn = q<HTMLButtonElement>('.page-actions__theme-button');
    const modal = document.getElementById('contact-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const mailBtn = q<HTMLButtonElement>('#mail-button');
    const modalClose = q<HTMLButtonElement>('#modal-close');
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const msgInput = document.getElementById('message') as HTMLTextAreaElement | null;
    const submitBtn = q<HTMLButtonElement>('#submit-button');
    const root = document.documentElement;

    function applyLanguage(lang: Language): void {
        const elements: Record<string, string> = {
            'about-heading': text[lang].aboutHeading,
            'about-paragraph': text[lang].aboutParagraphEl,
            'skills-heading': text[lang].skillsHeading,
            'tools-heading': text[lang].toolsHeading,
            'education-heading': text[lang].educationHeading,
            'education-title': text[lang].educationTitle,
            'education-date': text[lang].educationDate,
            'projects-heading': text[lang].projectsHeading,
            'project-description': text[lang].projectDescription,
            'header-footer': text[lang].headerFooter,
            'modal-title': text[lang].modalTitle,
            'label-name': text[lang].labelName,
            'label-email': text[lang].labelEmail,
            'label-message': text[lang].labelMessage,
            'button-text': text[lang].submitButton
        };
        Object.entries(elements).forEach(([id, value]) => setText(document.getElementById(id), value));
        const subtitle = q<HTMLElement>('.me__subtitle');
        setText(subtitle, text[lang].subtitle);
    }

    applyLanguage(getLanguage());

    // Alternar idioma al hacer click
    langBtn?.addEventListener('click', () => {
        const nextLang = getLanguage() === 'es' ? 'en' : 'es';
        setLanguage(nextLang);
        applyLanguage(nextLang);
    });

    //----- Tema oscuro / claro -----
    // Tema: aplicar desde localStorage
    const storedTheme = localStorage.getItem('theme');
    root.classList.add(storedTheme === 'dark' ? 'dark' : 'light');
    themeBtn?.addEventListener('click', () => {
        const current = root.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        root.classList.replace(current, next);
        localStorage.setItem('theme', next);
    });

    //----- Modal de mail -----
    // Modal de contacto: abrir / cerrar con accesibilidad básica
    const openModal = () => {
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
        form?.reset();
        ['name', 'email', 'message'].forEach(clearValidation);
    };

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

        if (!nameInput.value.trim()) { showError('name', text[lang].errorNameRequired); valid = false; }
        if (!emailInput.value.trim()) { showError('email', text[lang].errorEmailRequired); valid = false; }
        else if (!validateEmail(emailInput.value)) { showError('email', text[lang].errorEmailInvalid); valid = false; }
        if (!msgInput.value.trim()) { showError('message', text[lang].errorMessageRequired); valid = false; }

        if (!valid) return;

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                form
            );
            showToast(text[lang].successMessage);
            setTimeout(closeModal, 1500);
        } catch {
            showToast(text[lang].errorMessage, true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
});
