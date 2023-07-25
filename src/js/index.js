import '../css/styles.css';
import {dictionary} from './dictionary.js'

let localizationCookieLang;

/**
 * This listener is called after the page is fully loaded to select the right language in the combobox
 */
window.addEventListener("load", () => {
    if (localizationCookieLang) {
        selectDefaultLangOption(localizationCookieLang);
    } else {
        selectDefaultLangOption(getLangFromBrowser());
    }
});

/**
 * Set the requested language in the combobox (if language exists)
 * @param lang The requested language to select in the combobox
 */
function selectDefaultLangOption(lang) {
    document
        .querySelectorAll("#localization_panel__localization_select > option")
        .forEach(option => {
            if (lang === option.value) {
                option.setAttribute('selected', 'selected');
            } else {
                option.removeAttribute('selected');
            }
        });
}

/**
 * Get the language of the browser
 * @returns {string} The language of the browser. For example if language and country code of the browser are en_US, just en is returned
 */
function getLangFromBrowser() {
    const langAndContryCode = (navigator.languages !== undefined) ? navigator.languages[0] : navigator.language;
    // Ignore country code (example: en-US -> en)
    return langAndContryCode.split("-")[0];
}

/**
 * When the language is changed in the combobox, the localization of the text in the page must be changed accordingly.
 */
document
    .getElementById("localization_panel__localization_select")
    .addEventListener("change", e => {
        setLocalization(e.target.value);
    });

/**
 * Set the localization cookie language and change all the text in the page to reflect the localization change.
 * @param lang The language to use
 */
function setLocalization(lang) {
    setLocalizationCookieLang(lang);
    document
        .querySelectorAll("localized-text")
        .forEach(localizedText => {
            const key = localizedText.getAttribute("key");
            if (key) {
                localizedText.innerText = translate(key, lang);
            }
        });
}

/**
 * Add a cookie with information about the localization
 * @param lang The language saved in the cookie
 */
function setLocalizationCookieLang(lang) {
    const expirationTime = 86400e3; // 1 day from now
    let date = new Date(Date.now() + expirationTime);
    date = date.toUTCString();
    document.cookie = "wmvlocale=" + lang + "; expires=" + date + "; samesite=strict";
}

/**
 * Get the localization cookie language
 * @returns {null|string} It returns the language saved in the localization cookie, or null if the localization cookie doesn't exist
 */
function getLocalizationCookieLang() {
    if (document.cookie) {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const keyValue = cookie.split("=");
            if (keyValue && keyValue.length > 1) {
                const key = keyValue[0];
                const value = keyValue[1];
                if ("wmvlocale" === key) {
                    return value;
                }
            }
        }
    }
    return null;
}

/**
 * Translate a key of the dictionary given a language
 * @param key The key of the dictionary to translate
 * @param lang The language of the translation
 * @returns {*} The translation in that language for that key, or the key itself if a translation doesn't exist
 */
function translate(key, lang) {
    const dict = (lang in dictionary) ? dictionary[lang] : dictionary['_']
    return key in dict ? dict[key] : key;
}

// https://github.com/KonsomeJona/SimpleHTMLLocalizer
/**
 *  All the next code is used when the page is loaded to substitute the translations of <localized-text> elements.
 *  If the language of the browser corresponds to one language in the dictionary, then the related translations are used.
 *  Otherwise, it will be used the default locale (_) which is english.
 */
class HTMLLocalizer {
    constructor() {
        customElements.define('localized-text', LocalizedTextElement);
    }
}

class LocalizedTextElement extends HTMLElement {
    constructor() {
        super();
        localizationCookieLang = getLocalizationCookieLang();
    }

    connectedCallback() {
        const key = this.hasAttribute('key') ? this.getAttribute('key') : '';
        const lang = this.hasAttribute('lang') ? this.getAttribute('lang') : this.getLang();
        this.innerHTML = this.translate(key, lang);
    }

    getLang() {
        if (localizationCookieLang) {
            return localizationCookieLang;
        } else {
            const langAndContryCode = (navigator.languages !== undefined) ? navigator.languages[0] : navigator.language;
            // Ignore country code (example: en-US -> en)
            return langAndContryCode.split("-")[0];
        }
    }

    translate(key, lang) {
        const dict = (lang in dictionary) ? dictionary[lang] : dictionary['_']
        return key in dict ? dict[key] : key;
    }
}

new HTMLLocalizer();