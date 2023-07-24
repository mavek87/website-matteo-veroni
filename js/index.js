// https://github.com/KonsomeJona/SimpleHTMLLocalizer

var dictionary = {
    "_": { // when language is not supported
        "about_me": "about me",
        "about_me_paragraph": "My name is Matteo Veroni, and I have been working in the field of Computer Science for over 10 years as a backend software developer. I enjoy designing and writing efficient software capable of simplifying complex problems or saving time by automating otherwise lengthy and repetitive processes",
        "resume": "resume",
        "resume_paragraph": "I mainly use technologies related to the Java ecosystem (Java, Gradle, Jenkins), and I have gained knowledge of DevOps (Docker, Kubernetes), Linux server administration (Debian, Ubuntu), relational database management (PostgreSQL), and Cloud Computing (Amazon AWS). In my free time, I enjoy staying up-to-date, studying new topics, and experimenting with frontend technologies (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "For more information, please refer to my complete resume ",
        "resume_paragraph_call_to_action_link": "here",
        "services": "services",
        "services_paragraph": "I can help you achieve your goals by providing you with these services",
        "contact_me": "contact me",
        "consulting": "consulting",
        "training": "training",
        "development": "development",
        "collaborations": "collaborations",

    },
    "en": {
        "about_me": "about me",
        "about_me_paragraph": "My name is Matteo Veroni, and I have been working in the field of Computer Science for over 10 years as a backend software developer. I enjoy designing and writing efficient software capable of simplifying complex problems or saving time by automating otherwise lengthy and repetitive processes",
        "resume": "resume",
        "resume_paragraph": "I mainly use technologies related to the Java ecosystem (Java, Gradle, Jenkins), and I have gained knowledge of DevOps (Docker, Kubernetes), Linux server administration (Debian, Ubuntu), relational database management (PostgreSQL), and Cloud Computing (Amazon AWS). In my free time, I enjoy staying up-to-date, studying new topics, and experimenting with frontend technologies (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "For more information, please refer to my complete resume ",
        "resume_paragraph_call_to_action_link": "here",
        "services": "services",
        "services_paragraph": "I can help you achieve your goals by providing you with these services",
        "contact_me": "contact me",
        "consulting": "consulting",
        "training": "training",
        "development": "development",
        "collaborations": "collaborations"
    },
    "it": {
        "about_me": "chi sono",
        "about_me_paragraph": "Mi chiamo Matteo Veroni, lavoro nel campo dell'informatica da oltre 10 anni come backend software developer. Mi piace progettare e scrivere software efficienti in grado di semplificare problemi complessi, o di far risparmiare tempo automatizzando processi altrimenti lunghi e ripetitivi",
        "resume": "curriculum",
        "resume_paragraph": "Utilizzo prevalentemente tecnologie legate all'ecosistema Java (Java, Gradle, Jenkins), ed ho maturato conoscenze di Dev-Ops (Docker, Kubernetes), amministrazione di server Linux (Debian, Ubuntu), gestione di database relazionali (PostgreSQL) e Cloud Computing (Amazon AWS). Nel mio tempo libero mi piace tenermi aggiornato e studiare nuovi argomenti e sperimentare con tecnologie legate al mondo frontend (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "Per maggiori informazioni consulta il mio curriculum vitae completo",
        "resume_paragraph_call_to_action_link": "qui",
        "services": "servizi",
        "services_paragraph": "Posso aiutarti a raggiungere i tuoi obbiettivi fornendoti questi servizi",
        "contact_me": "contatti",
        "consulting": "consulenza",
        "training": "training",
        "development": "sviluppo",
        "collaborations": "collaborazioni"
    },
    "es": {
        "about_me": "quién soy",
        "about_me_paragraph": "Mi nombre es Matteo Veroni, he estado trabajando en el campo de la informática por más de 10 años como desarrollador de software backend. Disfruto diseñar y escribir software eficiente capaz de simplificar problemas complejos o ahorrar tiempo automatizando procesos que de otro modo serían largos y repetitivos.",
        "resume": "currículum",
        "resume_paragraph": "Principalmente utilizo tecnologías relacionadas con el ecosistema de Java (Java, Gradle, Jenkins) y he adquirido conocimientos en DevOps (Docker, Kubernetes), administración de servidores Linux (Debian, Ubuntu), gestión de bases de datos relacionales (PostgreSQL) y Cloud Computing (Amazon AWS). En mi tiempo libre, me gusta mantenerme actualizado, estudiar nuevos temas y experimentar con tecnologías relacionadas con el mundo frontend (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "Para obtener más información, consulta mi currículum vitae completo ",
        "resume_paragraph_call_to_action_link": "aquí",
        "services": "servicios",
        "services_paragraph": "Puedo ayudarte a alcanzar tus objetivos brindándote estos servicios.",
        "contact_me": "contacto",
        "consulting": "consultoría",
        "training": "formación",
        "development": "desarrollo",
        "collaborations": "colaboraciones"
    }
}

var localizationCookieValue;

class HTMLLocalizer {
    constructor() {
        customElements.define('localized-text', LocalizedTextElement);
    }
}

class LocalizedTextElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var key = this.hasAttribute('key') ? this.getAttribute('key') : '';
        var lang = this.hasAttribute('lang') ? this.getAttribute('lang') : this.getLang();
        this.innerHTML = this.translate(key, lang);
    }

    getLang() {
        localizationCookieValue = getLocalizationCookieValue();
        if (localizationCookieValue) {
            return localizationCookieValue;
        } else {
            var lang = (navigator.languages !== undefined) ? navigator.languages[0] : navigator.language;
            // Ignore country code (example: en-US -> en)
            return lang.split("-")[0];
        }
    }

    translate(key, lang) {
        var dict = (lang in dictionary) ? dictionary[lang] : dictionary['_']
        return key in dict ? dict[key] : key;
    }
}

new HTMLLocalizer();

function getLocalizationCookieValue() {
    if (document.cookie) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var keyValue = cookie.split("=");
            if (keyValue && keyValue.length > 1) {
                var key = keyValue[0];
                var value = keyValue[1];
                if ("wmvlocale" === key) {
                    return value;
                }
            }
        }
    }
    return null;
}

function setLocalizationCookieValue(lang) {
    var date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = "wmvlocale=" + lang + "; expires=" + date + "; samesite=strict";
}

function reloadLocalization(lang) {
    if(lang !== localizationCookieValue) {
        setLocalizationCookieValue(lang);
        location.reload()
    }
}