"use strict";

// Content and anchor navigation also work without JavaScript.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const mobileViewport = window.matchMedia("(max-width: 640px)");

if (menuButton && navigation) {
    const menuLabel = menuButton.querySelector(".menu-label");

    function setMenuOpen(isOpen, returnFocus = false) {
        menuButton.setAttribute("aria-expanded", String(isOpen));
        navigation.classList.toggle("is-open", isOpen);
        if (menuLabel) menuLabel.textContent = isOpen ? "Close" : "Menu";
        if (returnFocus) menuButton.focus();
    }

    navigation.classList.add("is-enhanced");
    menuButton.hidden = false;

    menuButton.addEventListener("click", () => {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
        const link = event.target.closest("a[href^='#']");
        if (!link || !mobileViewport.matches) return;
        const target = document.querySelector(link.getAttribute("href"));
        setMenuOpen(false);
        // Focus the destination while retaining native anchor scrolling/history.
        if (target) {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
            target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false, true);
        }
    });

    document.addEventListener("click", (event) => {
        if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    navigation.addEventListener("focusout", (event) => {
        if (event.relatedTarget && !navigation.contains(event.relatedTarget) && event.relatedTarget !== menuButton) {
            setMenuOpen(false);
        }
    });

    mobileViewport.addEventListener("change", () => setMenuOpen(false));
}

// Observe a narrow band below the header instead of measuring every scroll event.
if ("IntersectionObserver" in window && navigation) {
    const links = [...navigation.querySelectorAll("a[href^='#']")];
    const sections = [...document.querySelectorAll("main > section[id]")];
    const footer = document.querySelector(".site-footer");
    let sectionObserver;
    let footerVisible = false;
    let resizeTimer;

    function setCurrentSection(id) {
        links.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function observationOffset() {
        const headerHeight = document.querySelector(".site-header").offsetHeight;
        return Math.min(headerHeight + 70, Math.max(1, window.innerHeight - 2));
    }

    function syncCurrentSection() {
        if (footerVisible) return setCurrentSection("contact");
        const offset = observationOffset();
        const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= offset);
        setCurrentSection(current?.id || "home");
    }

    function observeSections() {
        if (sectionObserver) sectionObserver.disconnect();
        const offset = observationOffset();
        const bottomMargin = Math.max(0, window.innerHeight - offset - 2);
        sectionObserver = new IntersectionObserver((entries) => {
            const current = entries.find((entry) => entry.isIntersecting);
            if (current && !footerVisible) setCurrentSection(current.target.id);
        }, { rootMargin: `-${offset}px 0px -${bottomMargin}px 0px`, threshold: 0 });
        sections.forEach((section) => sectionObserver.observe(section));
        syncCurrentSection();
    }

    observeSections();
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(observeSections, 150);
    });

    // The final section may not reach the observation band on a tall display.
    if (footer) {
        const footerObserver = new IntersectionObserver(([entry]) => {
            footerVisible = entry.isIntersecting;
            syncCurrentSection();
        }, { threshold: 1 });
        footerObserver.observe(footer);
    }
}

const copyrightYear = document.querySelector("#copyright-year");
if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());
