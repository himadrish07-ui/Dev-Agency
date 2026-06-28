document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Element References ────────────────────────────────────────────────
    const themeToggle    = document.getElementById("theme-toggle");
    const themeIcon      = document.getElementById("theme-icon");
    const themeText      = document.getElementById("theme-text");
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

    // ── 2. Determine Starting Theme ─────────────────────────────────────────
    // Prefer saved preference → system preference → fallback to light
    let currentTheme = localStorage.getItem("color-scheme");
    if (!currentTheme) {
        currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    // ── 3. Apply Theme on Load ───────────────────────────────────────────────
    applyTheme(currentTheme);

    // ── 4. Toggle on Button Click ────────────────────────────────────────────
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            applyTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

    // ── 5. applyTheme() ──────────────────────────────────────────────────────
    // FIX #1: Guards added for themeIcon / themeText being null.
    // FIX #2: GitHub icon swap moved to CSS (filter: invert); JS no longer
    //         touches .github-icon src at all — see style.css.
    function applyTheme(theme) {
        currentTheme = theme;

        // Persist & set attributes
        localStorage.setItem("color-scheme", theme);
        if (metaColorScheme) metaColorScheme.content = theme;
        document.documentElement.setAttribute("data-theme",    theme);
        document.documentElement.setAttribute("data-bs-theme", theme);

        // Update toggle button state
        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
        }

        if (theme === "dark") {
            if (themeIcon) themeIcon.innerHTML = "&#9788;"; // ☀ Sun
            if (themeText) themeText.textContent = "Light mode";
            if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to light mode");
        } else {
            if (themeIcon) themeIcon.innerHTML = "&#9790;"; // ☾ Moon
            if (themeText) themeText.textContent = "Dark mode";
            if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to dark mode");
        }
    }

    // ── 6. Mobile Menu — Auto-close on nav-link click ───────────────────────
    // FIX #3: Collapse.getInstance() can return null if the menu was never
    //         opened; guard added before calling .hide().
    const navbarCollapse = document.getElementById("navbarLinks");

    if (navbarCollapse) {
        navbarCollapse.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            });
        });
    }

    // ── 7. Contact Form ──────────────────────────────────────────────────────
    const contactForm    = document.getElementById("contact-form");
    const contactName    = document.getElementById("contact-name");
    const contactEmail   = document.getElementById("contact-email");
    const contactFile    = document.getElementById("contact-file");
    const contactMessage = document.getElementById("contact-message");
    const contactSubmit  = document.getElementById("contact-submit");
    const contactSuccess = document.getElementById("contact-success");

    if (contactForm) {

        // ── Validators ───────────────────────────────────────────────────────

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

        // FIX #4: Validate both MIME type AND file extension.
        //         Extension-only checks can be fooled by a renamed file.
        const validateFile = () => {
            const files = contactFile.files;
            const isValid =
                files.length > 0 &&
                Array.from(files).every(
                    (f) =>
                        f.type === "application/pdf" ||        // MIME check (primary)
                        f.name.toLowerCase().endsWith(".pdf")  // extension fallback
                );
            toggleValid(contactFile, isValid);
            return isValid;
        };

        const validateMessage = () => {
            const isValid = contactMessage.value.trim().length >= 10;
            toggleValid(contactMessage, isValid);
            return isValid;
        };

        // Adds is-valid / is-invalid Bootstrap classes
        function toggleValid(input, isValid) {
            input.classList.toggle("is-valid",   isValid);
            input.classList.toggle("is-invalid", !isValid);
        }

        // ── Real-time Listeners ──────────────────────────────────────────────
        contactName.addEventListener("input", validateName);
        contactName.addEventListener("blur",  validateName);

        contactEmail.addEventListener("input", validateEmail);
        contactEmail.addEventListener("blur",  validateEmail);

        contactFile.addEventListener("change", validateFile);

        contactMessage.addEventListener("input", validateMessage);
        contactMessage.addEventListener("blur",  validateMessage);

        // ── Submit ───────────────────────────────────────────────────────────
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const isNameValid    = validateName();
            const isEmailValid   = validateEmail();
            const isFileValid    = validateFile();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isFileValid && isMessageValid) {
                if (contactSubmit) {
                    contactSubmit.textContent = "Details Valid ✓";
                    contactSubmit.disabled    = true;
                }
                if (contactSuccess) contactSuccess.classList.remove("d-none");

                contactForm.reset();

                // Remove validation classes after reset so the form looks clean
                [contactName, contactEmail, contactFile, contactMessage].forEach((el) => {
                    el.classList.remove("is-valid", "is-invalid");
                });

                setTimeout(() => {
                    if (contactSubmit) {
                        contactSubmit.textContent = "Check Message";
                        contactSubmit.disabled    = false;
                    }
                    if (contactSuccess) contactSuccess.classList.add("d-none");
                }, 3000);
            }
        });
    }

    // ── 8. Footer Year ───────────────────────────────────────────────────────
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});