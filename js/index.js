// https://github.com/KonsomeJona/SimpleHTMLLocalizer

var dictionary = {
    "_": { // when language is not supported
        "who_am_i": "who am i",
        "who_am_i_paragraph": "My name is Matteo Veroni, I'm in the IT for more than 10 years as backend software developer. I work mainly with technologies connected with the Java ecosystem, and I also matured knowledge in Dev-Ops (Docker, Kubernetes), Linux server administration (Debian, Ubuntu) and Cloud Computing (Amazon AWS)",
        "resume": "resume",
        "resume_paragraph": "Check my resume at ",
        "resume_paragraph_link": "this address",
        "services": "services",
        "services_paragraph": "I can help you reaching your goals through these services",
        "contacts": "contacts",
        "consulting": "consulting",
        "training": "training",
        "development": "development",
        "collaborations": "collaborations",

    },
    "en": {
        "who_am_i": "who am i",
        "who_am_i_paragraph": "My name is Matteo Veroni, I'm in the IT for more than 10 years as backend software developer. I work mainly with technologies connected with the Java ecosystem, and I also matured knowledge in Dev-Ops (Docker, Kubernetes), Linux server administration (Debian, Ubuntu) and Cloud Computing (Amazon AWS)",
        "resume": "resume",
        "resume_paragraph": "Check my resume at ",
        "resume_paragraph_link": "this address",
        "services": "services",
        "services_paragraph": "I can help you reaching your goals through these services",
        "contacts": "contacts",
        "consulting": "consulting",
        "training": "training",
        "development": "development",
        "collaborations": "collaborations"
    },
    "it": {
        "who_am_i": "chi sono",
        "who_am_i_paragraph": "Mi chiamo Matteo Veroni, lavoro nel campo dell'informatica da oltre 10 anni come backend software developer. Utilizzo prevalentemente tecnologie legate al mondo Java, ed ho maturato conoscenze di Dev-Ops (Docker, Kubernetes), amministrazione di server Linux (Debian, Ubuntu) e Cloud Computing (Amazon AWS)",
        "resume": "curriculum",
        "resume_paragraph": "Consulta il mio curriculum vitae a ",
        "resume_paragraph_link": "questo indirizzo",
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