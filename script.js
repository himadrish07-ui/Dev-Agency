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
});
// .addEventListener("DOMContentLoaded", ...) — registers a function to run once the browser has finished parsing all the HTML and built the DOM tree (but doesn't necessarily wait for images/CSS to fully load).
// This is critical: if your script ran immediately when the <script> tag is reached, document.getElementById("theme-toggle") would return null because that button doesn't exist in the DOM yet (it comes later in the HTML).