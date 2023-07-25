import '../css/styles.css';
// import profilePicture from './assets/img/foto-matteo.jpeg';

/**
 * To completely avoid any clash in namespace, the executor function (comparable to Java’s main method), needs to execute anonymously.
 * This can be achieved with IIFE — immediately invoked function expression.
 * IIFE is simply achieved by wrapping all logic in an anonymous function.
 * We then wrap the anonymous function in parentheses and execute it with function parentheses.
 * This avoids any setting in the global context.
 */
(
    // why window, document and undefined are passed: https://stackoverflow.com/questions/2716069/how-does-this-javascript-jquery-syntax-work-function-window-undefined
    function (window, document, undefined) {
        var dictionary = {
            "_": { // when language is not supported
                "about_me": "about me",
                "about_me_paragraph": "My name is Matteo Veroni, and I have been working in the field of Computer Science for over 10 years as a backend software developer. I enjoy designing and writing efficient software capable of simplifying complex problems or saving time by automating otherwise lengthy and repetitive processes.",
                "resume": "resume",
                "resume_paragraph": "I mainly use technologies related to the Java ecosystem (Java, Gradle, Jenkins), and I have gained knowledge of DevOps (Docker, Kubernetes), Linux server administration (Debian, Ubuntu), relational database management (PostgreSQL), and Cloud Computing (Amazon AWS). In my free time, I enjoy staying up-to-date, studying new topics, and experimenting with frontend technologies (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "For more information, please refer to my complete resume ",
                "resume_paragraph_call_to_action_link": "here",
                "services": "services",
                "services_paragraph": "I can help you achieve your goals by providing you with these services.",
                "contact_me": "contact me",
                "consulting": "consulting",
                "training": "training",
                "development": "development",
                "collaborations": "collaborations"
            },
            "en": {
                "about_me": "about me",
                "about_me_paragraph": "My name is Matteo Veroni, and I have been working in the field of Computer Science for over 10 years as a backend software developer. I enjoy designing and writing efficient software capable of simplifying complex problems or saving time by automating otherwise lengthy and repetitive processes.",
                "resume": "resume",
                "resume_paragraph": "I mainly use technologies related to the Java ecosystem (Java, Gradle, Jenkins), and I have gained knowledge of DevOps (Docker, Kubernetes), Linux server administration (Debian, Ubuntu), relational database management (PostgreSQL), and Cloud Computing (Amazon AWS). In my free time, I enjoy staying up-to-date, studying new topics, and experimenting with frontend technologies (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "For more information, please refer to my complete resume ",
                "resume_paragraph_call_to_action_link": "here",
                "services": "services",
                "services_paragraph": "I can help you achieve your goals by providing you with these services.",
                "contact_me": "contact me",
                "consulting": "consulting",
                "training": "training",
                "development": "development",
                "collaborations": "collaborations"
            },
            "it": {
                "about_me": "chi sono",
                "about_me_paragraph": "Mi chiamo Matteo Veroni, lavoro nel campo dell'informatica da oltre 10 anni come sviluppatore software backend. Mi piace progettare e scrivere software efficienti in grado di semplificare problemi complessi, o di far risparmiare tempo automatizzando processi altrimenti lunghi e ripetitivi.",
                "resume": "curriculum",
                "resume_paragraph": "Utilizzo prevalentemente tecnologie legate all'ecosistema Java (Java, Gradle, Jenkins) e ho acquisito conoscenze di Dev-Ops (Docker, Kubernetes), amministrazione di server Linux (Debian, Ubuntu), gestione di database relazionali (PostgreSQL) e Cloud Computing (Amazon AWS). Nel mio tempo libero mi piace tenermi aggiornato, studiare nuovi argomenti e sperimentare con tecnologie legate al mondo frontend (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "Per maggiori informazioni consulta il mio curriculum vitae completo ",
                "resume_paragraph_call_to_action_link": "qui",
                "services": "servizi",
                "services_paragraph": "Posso aiutarti a raggiungere i tuoi obiettivi fornendoti questi servizi.",
                "contact_me": "contatti",
                "consulting": "consulenza",
                "training": "formazione",
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
            },
            "de": {
                "about_me": "über mich",
                "about_me_paragraph": "Ich heiße Matteo Veroni und arbeite seit über 10 Jahren als Backend-Softwareentwickler im Bereich der Informatik. Ich liebe es, effiziente Software zu entwerfen und zu schreiben, die komplexe Probleme vereinfachen oder Zeit sparen kann, indem sie ansonsten lange und repetitive Prozesse automatisiert.",
                "resume": "Lebenslauf",
                "resume_paragraph": "Ich nutze hauptsächlich Technologien aus dem Java-Ökosystem (Java, Gradle, Jenkins) und habe Kenntnisse in DevOps (Docker, Kubernetes), Linux-Serveradministration (Debian, Ubuntu), der Verwaltung von relationalen Datenbanken (PostgreSQL) und Cloud Computing (Amazon AWS) erworben. In meiner Freizeit halte ich mich gerne auf dem Laufenden, studiere neue Themen und experimentiere mit Technologien aus dem Frontend-Bereich (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "Für weitere Informationen schau dir meinen vollständigen Lebenslauf ",
                "resume_paragraph_call_to_action_link": "hier",
                "services": "Dienstleistungen",
                "services_paragraph": "Ich kann dir helfen, deine Ziele zu erreichen, indem ich dir diese Dienstleistungen anbiete.",
                "contact_me": "Kontakt",
                "consulting": "Beratung",
                "training": "Training",
                "development": "Entwicklung",
                "collaborations": "Kooperationen"
            },
            "fr": {
                "about_me": "à propos de moi",
                "about_me_paragraph": "Je m'appelle Matteo Veroni, je travaille dans le domaine de l'informatique depuis plus de 10 ans en tant que développeur de logiciels backend. J'aime concevoir et écrire des logiciels efficaces capables de simplifier des problèmes complexes ou d'économiser du temps en automatisant des processus autrement longs et répétitifs.",
                "resume": "curriculum",
                "resume_paragraph": "J'utilise principalement des technologies liées à l'écosystème Java (Java, Gradle, Jenkins) et j'ai acquis des connaissances en DevOps (Docker, Kubernetes), en administration de serveurs Linux (Debian, Ubuntu), en gestion de bases de données relationnelles (PostgreSQL) et en Cloud Computing (Amazon AWS). Pendant mon temps libre, j'aime me tenir informé, étudier de nouveaux sujets et expérimenter avec des technologies liées au frontend (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "Pour plus d'informations, consultez mon curriculum vitae complet ",
                "resume_paragraph_call_to_action_link": "ici",
                "services": "services",
                "services_paragraph": "Je peux vous aider à atteindre vos objectifs en vous proposant ces services.",
                "contact_me": "contact",
                "consulting": "conseil",
                "training": "formation",
                "development": "développement",
                "collaborations": "collaborations"
            },
            "pt": {
                "about_me": "sobre mim",
                "about_me_paragraph": "Meu nome é Matteo Veroni, trabalho na área de informática há mais de 10 anos como desenvolvedor de software backend. Gosto de projetar e escrever software eficiente capaz de simplificar problemas complexos ou economizar tempo automatizando processos que de outra forma seriam longos e repetitivos.",
                "resume": "currículo",
                "resume_paragraph": "Utilizo principalmente tecnologias relacionadas ao ecossistema Java (Java, Gradle, Jenkins) e adquiri conhecimentos em DevOps (Docker, Kubernetes), administração de servidores Linux (Debian, Ubuntu), gerenciamento de bancos de dados relacionais (PostgreSQL) e Computação em Nuvem (Amazon AWS). No meu tempo livre, gosto de me manter atualizado, estudar novos temas e experimentar tecnologias relacionadas ao mundo frontend (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "Para mais informações, consulte o meu currículo completo ",
                "resume_paragraph_call_to_action_link": "aqui",
                "services": "serviços",
                "services_paragraph": "Posso ajudá-lo a alcançar seus objetivos, fornecendo-lhe estes serviços.",
                "contact_me": "contato",
                "consulting": "consultoria",
                "training": "treinamento",
                "development": "desenvolvimento",
                "collaborations": "colaborações"
            },
            "nl": {
                "about_me": "over mij",
                "about_me_paragraph": "Mijn naam is Matteo Veroni en ik werk al meer dan 10 jaar als backend software ontwikkelaar in de informatica. Ik geniet ervan om efficiënte software te ontwerpen en te schrijven die complexe problemen kan vereenvoudigen of tijd kan besparen door anders lange en repetitieve processen te automatiseren.",
                "resume": "cv",
                "resume_paragraph": "Ik maak voornamelijk gebruik van technologieën gerelateerd aan het Java ecosysteem (Java, Gradle, Jenkins) en ik heb kennis van DevOps (Docker, Kubernetes), Linux serverbeheer (Debian, Ubuntu), relationele databasebeheer (PostgreSQL) en Cloud Computing (Amazon AWS) opgedaan. In mijn vrije tijd houd ik ervan om up-to-date te blijven, nieuwe onderwerpen te bestuderen en te experimenteren met frontend technologieën (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "Voor meer informatie kunt u mijn volledige curriculum vitae ",
                "resume_paragraph_call_to_action_link": "hier",
                "services": "diensten",
                "services_paragraph": "Ik kan u helpen uw doelen te bereiken door u deze diensten aan te bieden.",
                "contact_me": "contact",
                "consulting": "advies",
                "training": "training",
                "development": "ontwikkeling",
                "collaborations": "samenwerkingen"
            },
            "zh": {
                "about_me": "关于我",
                "about_me_paragraph": "我叫Matteo Veroni，作为后端软件开发人员，我已经在计算机科学领域工作了十多年。我喜欢设计和编写高效的软件，能够简化复杂的问题，或者通过自动化长而重复的流程来节省时间。",
                "resume": "简历",
                "resume_paragraph": "我主要使用与Java生态系统相关的技术（Java、Gradle、Jenkins），并掌握了DevOps（Docker、Kubernetes）、Linux服务器管理（Debian、Ubuntu）、关系型数据库管理（PostgreSQL）和云计算（Amazon AWS）等方面的知识。在业余时间，我喜欢保持更新，学习新知识，并尝试前端技术（Javascript、ReactJS）。",
                "resume_paragraph_call_to_action": "更多信息，请查看我的完整简历 ",
                "resume_paragraph_call_to_action_link": "这里",
                "services": "服务",
                "services_paragraph": "我可以通过提供这些服务来帮助您实现您的目标。",
                "contact_me": "联系方式",
                "consulting": "咨询",
                "training": "培训",
                "development": "开发",
                "collaborations": "合作"
            },
            "ja": {
                "about_me": "私について",
                "about_me_paragraph": "私の名前はマッテオ・ヴェローニです。バックエンドのソフトウェア開発者として、10年以上にわたりコンピュータ科学の分野で働いています。複雑な問題を簡単にする効率的なソフトウェアの設計と記述が好きで、それによって長くて繰り返しの多いプロセスを自動化し、時間を節約することができます。",
                "resume": "履歴書",
                "resume_paragraph": "主にJavaエコシステムに関連する技術（Java、Gradle、Jenkins）を使用し、DevOps（Docker、Kubernetes）、Linuxサーバーの管理（Debian、Ubuntu）、リレーショナルデータベースの管理（PostgreSQL）、クラウドコンピューティング（Amazon AWS）などの知識を持っています。空き時間には常に最新情報を把握し、新しいトピックを学び、フロントエンド技術（Javascript、ReactJS）を試しています。",
                "resume_paragraph_call_to_action": "詳細については、私の完全な履歴書をこちらでご覧ください ",
                "resume_paragraph_call_to_action_link": "ここで",
                "services": "サービス",
                "services_paragraph": "これらのサービスを提供することで、あなたの目標達成をサポートできます。",
                "contact_me": "お問い合わせ",
                "consulting": "コンサルティング",
                "training": "トレーニング",
                "development": "開発",
                "collaborations": "コラボレーション"
            },
            "ru": {
                "about_me": "обо мне",
                "about_me_paragraph": "Меня зовут Маттео Верони, я работаю в области информационных технологий более 10 лет в качестве разработчика программного обеспечения для backend. Мне нравится проектировать и писать эффективное программное обеспечение, способное упрощать сложные задачи или экономить время, автоматизируя иначе длительные и повторяющиеся процессы.",
                "resume": "резюме",
                "resume_paragraph": "Я в основном использую технологии, связанные с экосистемой Java (Java, Gradle, Jenkins), и получил знания в области DevOps (Docker, Kubernetes), администрирования Linux-серверов (Debian, Ubuntu), управления реляционными базами данных (PostgreSQL) и облачных вычислений (Amazon AWS). В свободное время мне нравится быть в курсе новостей, изучать новые темы и экспериментировать с технологиями frontend (Javascript, ReactJS).",
                "resume_paragraph_call_to_action": "Для получения дополнительной информации ознакомьтесь с моим полным резюме ",
                "resume_paragraph_call_to_action_link": "здесь",
                "services": "услуги",
                "services_paragraph": "Я могу помочь вам достичь ваших целей, предоставляя вам эти услуги.",
                "contact_me": "контакты",
                "consulting": "консультации",
                "training": "обучение",
                "development": "разработка",
                "collaborations": "сотрудничество"
            },
            "ar": {
                "about_me": "من أنا",
                "about_me_paragraph": "أنا ماتيو فيروني، أعمل في مجال علوم الحاسوب لأكثر من 10 سنوات كمطور برمجيات خلفية (Backend). أحب تصميم وكتابة برامج فعالة قادرة على تبسيط المشكلات المعقدة أو توفير الوقت من خلال أتمتة العمليات الطويلة والمكررة.",
                "resume": "السيرة الذاتية",
                "resume_paragraph": "أستخدم بشكل أساسي التقنيات المرتبطة ببيئة جافا (Java، Gradle، Jenkins) وقد اكتسبت معرفة في DevOps (Docker، Kubernetes)، وإدارة خوادم Linux (Debian، Ubuntu)، وإدارة قواعد بيانات ذات علاقات (PostgreSQL) والحوسبة السحابية (Amazon AWS). في وقت فراغي، أحب أن أبقى على اطلاع، وأدرس مواضيع جديدة وأجرب التقنيات المرتبطة بالواجهة الأمامية (JavaScript، ReactJS).",
                "resume_paragraph_call_to_action": "للمزيد من المعلومات، يرجى الاطلاع على السيرة الذاتية الكاملة ",
                "resume_paragraph_call_to_action_link": "هنا",
                "services": "الخدمات",
                "services_paragraph": "يمكنني مساعدتك في تحقيق أهدافك من خلال تقديم هذه الخدمات.",
                "contact_me": "التواصل",
                "consulting": "الاستشارات",
                "training": "التدريب",
                "development": "التطوير",
                "collaborations": "التعاون"
            }
        }

        var localizationCookieLang;

        /**
         * This listener is called after the page is fully loaded to select the right language in the combobox
         */
        window.addEventListener("load", function () {
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
                .forEach(function (option) {
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
            var langAndContryCode = (navigator.languages !== undefined) ? navigator.languages[0] : navigator.language;
            // Ignore country code (example: en-US -> en)
            return langAndContryCode.split("-")[0];
        }

        /**
         * When the language is changed in the combobox, the localization of the text in the page must be changed accordingly.
         */
        document
            .getElementById("localization_panel__localization_select")
            .addEventListener("change", function (e) {
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
                .forEach(function (localizedText) {
                    var key = localizedText.getAttribute("key");
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
            var expirationTime = 86400e3; // 1 day from now
            var date = new Date(Date.now() + expirationTime);
            date = date.toUTCString();
            document.cookie = "wmvlocale=" + lang + "; expires=" + date + "; samesite=strict";
        }

        /**
         * Get the localization cookie language
         * @returns {null|string} It returns the language saved in the localization cookie, or null if the localization cookie doesn't exist
         */
        function getLocalizationCookieLang() {
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

        /**
         * Translate a key of the dictionary given a language
         * @param key The key of the dictionary to translate
         * @param lang The language of the translation
         * @returns {*} The translation in that language for that key, or the key itself if a translation doesn't exist
         */
        function translate(key, lang) {
            var dict = (lang in dictionary) ? dictionary[lang] : dictionary['_']
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
                var key = this.hasAttribute('key') ? this.getAttribute('key') : '';
                var lang = this.hasAttribute('lang') ? this.getAttribute('lang') : this.getLang();
                this.innerHTML = this.translate(key, lang);
            }

            getLang() {
                if (localizationCookieLang) {
                    return localizationCookieLang;
                } else {
                    var langAndContryCode = (navigator.languages !== undefined) ? navigator.languages[0] : navigator.language;
                    // Ignore country code (example: en-US -> en)
                    return langAndContryCode.split("-")[0];
                }
            }

            translate(key, lang) {
                var dict = (lang in dictionary) ? dictionary[lang] : dictionary['_']
                return key in dict ? dict[key] : key;
            }
        }

        new HTMLLocalizer();
    }
)(window, document);