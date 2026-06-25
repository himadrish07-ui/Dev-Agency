document.addEventListener("DOMContentLoaded", () => {
    //1.Fetching the toggle button
    const themeToggle = document.getElementById("theme-toggle");
    //2.Fetching the toggle theme icon
    const themeIcon = document.getElementById("theme-icon");
    //3.Fetching the toggle theme text
    const themeText = document.getElementById("theme-text");
    //4.Fetching the meta color scheme
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    //5.Determining the starting theme
    let currentTheme = localStorage.getItem("color-scheme");
    if (!currentTheme) {
        currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    //6.Applying the theme on load
    applyTheme(currentTheme);
    //7.Setting the theme as per the toggle button
    themeToggle.addEventListener("click", () => {
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });
    //8.The applyTheme() Function
    function applyTheme(theme) {
        currentTheme = theme;
        let github = document.querySelectorAll(".github-icon");
        github.forEach((icon) => {
            if (theme === "dark") {
                icon.src = "https://cdn.simpleicons.org/github/white";
            } else {
                icon.src = "https://cdn.simpleicons.org/github/black";
            }
        });
        localStorage.setItem("color-scheme", theme);
        if (metaColorScheme) {
            metaColorScheme.content = theme;
        }
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            themeIcon.innerHTML = "&#9790;";//Moon icon
            themeText.textContent = "Dark";
            themeToggle.classList.remove("btn-outline-secondary");
            themeToggle.classList.add("btn-outline-light");
        } else {
            themeIcon.innerHTML = "&#9788;";//Sun icon
            themeText.textContent = "Light";
            themeToggle.classList.remove("btn-outline-light");
            themeToggle.classList.add("btn-outline-secondary");
        }
    }
    // 9.Mobile menu auto close
    const navbarCollapse = document.getElementById("navbarLinks");

    if (navbarCollapse) {
        navbarCollapse.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });
    }
    // 10. Contact form
    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("contact-name");
    const contactEmail = document.getElementById("contact-email");
    const contactFile = document.getElementById("contact-file");
    const contactMessage = document.getElementById("contact-message");
    const contactSubmit = document.getElementById("contact-submit");
    const contactSuccess = document.getElementById("contact-success");

    if (contactForm) {
        const validateName = () => {
            const isValid = contactName.value.trim().length >= 2;
            toggleValid(contactName, isValid);
            return isValid;
        };

        const validateEmail = () => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isValid = emailRegex.test(contactEmail.value.trim());
            toggleValid(contactEmail, isValid);
            return isValid;
        };

        const validateFile = () => {
            const files = contactFile.files;
            const isValid = files.length > 0 &&
                Array.from(files).every(f => f.name.toLowerCase().endsWith(".pdf"));
            toggleValid(contactFile, isValid);
            return isValid;
        };

        const validateMessage = () => {
            const isValid = contactMessage.value.trim().length >= 10;
            toggleValid(contactMessage, isValid);
            return isValid;
        };

        // Correct toggleValid: valid -> "is-valid", invalid -> "is-invalid"
        function toggleValid(input, isValid) {
            if (isValid) {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            } else {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            }
        }

        // Validation listeners
        contactName.addEventListener("input", validateName);
        contactName.addEventListener("blur", validateName);


        contactEmail.addEventListener("input", validateEmail);
        contactEmail.addEventListener("blur", validateEmail);

        contactFile.addEventListener("change", validateFile);

        contactMessage.addEventListener("input", validateMessage);
        contactMessage.addEventListener("blur", validateMessage);

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isFileValid = validateFile();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isFileValid && isMessageValid) {
                contactSubmit.textContent = "Sent!";
                contactSubmit.disabled = true;
                contactSuccess.classList.remove("d-none");

                contactForm.reset();
                // Remove validation classes after reset
                [contactName, contactEmail, contactFile, contactMessage].forEach((el) => {
                    el.classList.remove("is-valid", "is-invalid");
                });

                setTimeout(() => {
                    contactSubmit.textContent = "Send Message";
                    contactSubmit.disabled = false;
                    contactSuccess.classList.add("d-none");
                }, 3000);
            }
        });
    }
    // Current Year in the Footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();


});
// .addEventListener("DOMContentLoaded", ...) — registers a function to run once the browser has finished parsing all the HTML and built the DOM tree (but doesn't necessarily wait for images/CSS to fully load).
// This is critical: if your script ran immediately when the <script> tag is reached, document.getElementById("theme-toggle") would return null because that button doesn't exist in the DOM yet (it comes later in the HTML).