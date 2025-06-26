const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
rootHtml.setAttribute("data-theme", savedTheme);

if (savedTheme === "light") {
    toggleTheme.classList.remove("bi-sun");
    toggleTheme.classList.add("bi-moon-stars");
} else {
    toggleTheme.classList.remove("bi-moon-stars");
    toggleTheme.classList.add("bi-sun");
}

function changeTheme() {
    const currentTheme = rootHtml.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    rootHtml.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");
}

toggleTheme.addEventListener("click", changeTheme);

const accordionHeaders = document.querySelectorAll(".accordion__header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const accordionActive = accordionItem.classList.contains("active");

        accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
    })
})

const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach(item => {
    item.addEventListener("click", () => {
        menuLinks.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    })
})