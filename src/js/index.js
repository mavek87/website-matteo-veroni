import '../css/styles.css';
import dictionary from './dictionary.js'
import localization from './localization.js';

let localizationCookieLang;

/**
 * This listener is called after the page is fully loaded to select the right language in the combobox
 */
window.addEventListener("load", () => {
    if (localizationCookieLang) {
        selectDefaultLangOption(localizationCookieLang);
    } else {
        selectDefaultLangOption(localization.getLangFromBrowser());
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
 * When the language is changed in the combobox, the localization of the text in the page must be changed accordingly.
 */
document
    .getElementById("localization_panel__localization_select")
    .addEventListener("change", e => {
        localization.setLocalization(e.target.value);
    });

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
        localizationCookieLang = localization.getLocalizationCookieLang();
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
            const langAndCountryCode = (navigator.languages !== undefined) ? navigator.languages[0] : navigator.language;
            // Ignore country code (example: en-US -> en)
            return langAndCountryCode.split("-")[0];
        }
    }

    translate(key, lang) {
        const dict = (lang in dictionary) ? dictionary[lang] : dictionary['_']
        return key in dict ? dict[key] : key;
    }
}

new HTMLLocalizer();