// https://github.com/KonsomeJona/SimpleHTMLLocalizer

var dictionary = {
    "_": { // when language is not supported
        "who_am_i": "who am i",
        "who_am_i_paragraph": "My name is Matteo Veroni, and I have been working in the field of Computer Science for over 10 years as a backend software developer. I enjoy designing and writing efficient software capable of simplifying complex problems or saving time by automating otherwise lengthy and repetitive processes",
        "resume": "resume",
        "resume_paragraph": "I mainly use technologies related to the Java ecosystem (Java, Gradle, Jenkins), and I have gained knowledge of DevOps (Docker, Kubernetes), Linux server administration (Debian, Ubuntu), relational database management (PostgreSQL), and Cloud Computing (Amazon AWS). In my free time, I enjoy staying up-to-date, studying new topics, and experimenting with frontend technologies (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "For more information, please refer to my complete resume ",
        "resume_paragraph_call_to_action_link": "here",
        "services": "services",
        "services_paragraph": "I can help you achieve your goals by providing you with these services",
        "contacts": "contacts",
        "consulting": "consulting",
        "training": "training",
        "development": "development",
        "collaborations": "collaborations",

    },
    "en": {
        "who_am_i": "who am i",
        "who_am_i_paragraph": "My name is Matteo Veroni, and I have been working in the field of Computer Science for over 10 years as a backend software developer. I enjoy designing and writing efficient software capable of simplifying complex problems or saving time by automating otherwise lengthy and repetitive processes",
        "resume": "resume",
        "resume_paragraph": "I mainly use technologies related to the Java ecosystem (Java, Gradle, Jenkins), and I have gained knowledge of DevOps (Docker, Kubernetes), Linux server administration (Debian, Ubuntu), relational database management (PostgreSQL), and Cloud Computing (Amazon AWS). In my free time, I enjoy staying up-to-date, studying new topics, and experimenting with frontend technologies (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "For more information, please refer to my complete resume ",
        "resume_paragraph_call_to_action_link": "here",
        "services": "services",
        "services_paragraph": "I can help you achieve your goals by providing you with these services",
        "contacts": "contacts",
        "consulting": "consulting",
        "training": "training",
        "development": "development",
        "collaborations": "collaborations"
    },
    "it": {
        "who_am_i": "chi sono",
        "who_am_i_paragraph": "Mi chiamo Matteo Veroni, lavoro nel campo dell'informatica da oltre 10 anni come backend software developer. Mi piace progettare e scrivere software efficienti in grado di semplificare problemi complessi, o di far risparmiare tempo automatizzando processi altrimenti lunghi e ripetitivi",
        "resume": "curriculum",
        "resume_paragraph": "Utilizzo prevalentemente tecnologie legate all'ecosistema Java (Java, Gradle, Jenkins), ed ho maturato conoscenze di Dev-Ops (Docker, Kubernetes), amministrazione di server Linux (Debian, Ubuntu), gestione di database relazionali (PostgreSQL) e Cloud Computing (Amazon AWS). Nel mio tempo libero mi piace tenermi aggiornato e studiare nuovi argomenti e sperimentare con tecnologie legate al mondo frontend (Javascript, ReactJS).",
        "resume_paragraph_call_to_action": "Per maggiori informazioni consulta il mio curriculum vitae completo",
        "resume_paragraph_call_to_action_link": "qui",
        "services": "servizi",
        "services_paragraph": "Posso aiutarti a raggiungere i tuoi obbiettivi fornendoti questi servizi",
        "contacts": "contatti",
        "consulting": "consulenza",
        "training": "training",
        "development": "sviluppo",
        "collaborations": "collaborazioni"
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