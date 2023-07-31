import '../css/styles.css';
import constants from './constants.js';
import localization from './localization.js';
import mail from './mail.js';

let currentLanguage = localization.getLocalization();

/**
 * This listener is called after the page is fully loaded to select the right language in the combobox
 */
window.addEventListener('load', () => {
    selectDefaultLangOption(currentLanguage);
});

/**
 * Set the requested language in the combobox (if language exists)
 * @param lang The requested language to select in the combobox
 */
function selectDefaultLangOption(lang) {
    document
        .querySelectorAll("#localization_panel__localization_select > option")
        .forEach(option => {
            if (option.value === lang) {
                currentLanguage = lang;
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
    .getElementById('localization_panel__localization_select')
    .addEventListener('change', e => {
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
        customElements.define(constants.LOCALIZED_TEXT_ELEMENT_NAME, LocalizedTextElement);
    }
}

class LocalizedTextElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const key = this.hasAttribute(constants.LOCALIZED_TEXT_ELEMENT_KEY) ? this.getAttribute(constants.LOCALIZED_TEXT_ELEMENT_KEY) : '';
        const lang = this.hasAttribute(constants.LOCALIZED_TEXT_ELEMENT_LANG) ? this.getAttribute(constants.LOCALIZED_TEXT_ELEMENT_LANG) : currentLanguage;
        this.innerHTML = localization.translate(key, lang);
    }
}

new HTMLLocalizer();

/**
 * Add all the listeners for the buttons in the call to action section
 */

document
    .getElementById('buttons_showcase__btn_consulting')
    .addEventListener('click', e => {
        e.preventDefault();
        mail.mailTo(constants.EMAIL_ADDRESS, localization.translate('consulting_request', localization.getLocalization()));
    });

document
    .getElementById('buttons_showcase__btn_training')
    .addEventListener('click', e => {
        e.preventDefault();
        mail.mailTo(constants.EMAIL_ADDRESS, localization.translate('training_request',  localization.getLocalization()));
    });

document
    .getElementById('buttons_showcase__btn_development')
    .addEventListener('click', e => {
        e.preventDefault();
        mail.mailTo(constants.EMAIL_ADDRESS, localization.translate('development_request',  localization.getLocalization()));
    });

document
    .getElementById('buttons_showcase__btn_collaborations')
    .addEventListener('click', e => {
        e.preventDefault();
        mail.mailTo(constants.EMAIL_ADDRESS, localization.translate('collaboration_request',  localization.getLocalization()));
    });