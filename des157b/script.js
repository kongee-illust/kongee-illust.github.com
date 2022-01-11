(function() {
    "use strict";

    const button = document.querySelector("#switch");
    const overlayToggle = document.getElementById("overlay-toggle");
    const overlay = document.getElementById("overlay");
    const overlayInner = document.querySelector("#overlay .inner");
    const exitButton = document.querySelector("#exit");

    const body = document.querySelector("body");
    const banner = document.querySelector("#banner");
    const sections = document.querySelectorAll("section");
    let mode = "dark";

    button.addEventListener("click", function() {
        if (mode === "dark") {
            body.className = "switch";
            banner.className = "switch";
            button.className = "switch";
            for (const section of sections) {
                section.className = "switch";
            }
            mode = "light";
        } else {
            body.removeAttribute("class");
            banner.removeAttribute("class");
            button.removeAttribute("class");
            for (const section of sections) {
                section.removeAttribute("class");
            }
            mode = "dark";
        }
    });

    overlayToggle.addEventListener("click", function() {
        overlay.classList.toggle("open");
    });
    overlay.addEventListener("click", function() {
        overlay.classList.toggle("open");
    });
    exitButton.addEventListener("click", function() {
        overlay.classList.toggle("open");
    });
    overlayInner.addEventListener("click", function(e) {
        e.stopImmediatePropagation();
    });
})();