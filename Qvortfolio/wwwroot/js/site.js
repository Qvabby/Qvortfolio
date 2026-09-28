/* ============================================================
   QVORTFOLIO — interactions (vanilla, no deps)
   ============================================================ */

(function () {
    "use strict";

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- mobile menu ---------- */

    function initMenu() {
        var burger = document.querySelector(".burger");
        if (!burger) return;

        burger.addEventListener("click", function () {
            document.body.classList.toggle("menu-open");
            burger.setAttribute("aria-expanded", document.body.classList.contains("menu-open"));
        });

        document.querySelectorAll(".menu a").forEach(function (a) {
            a.addEventListener("click", function () {
                document.body.classList.remove("menu-open");
            });
        });
    }

    /* ---------- hide nav on scroll down ---------- */

    function initNav() {
        var nav = document.querySelector(".nav");
        if (!nav) return;

        var last = 0;

        window.addEventListener("scroll", function () {
            var y = window.scrollY;
            var down = y > last && y > 220;

            if (down && !document.body.classList.contains("menu-open")) {
                nav.classList.add("is-hidden");
            } else {
                nav.classList.remove("is-hidden");
            }

            last = y;
        }, { passive: true });
    }

    /* ---------- reveal on scroll ---------- */

    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!items.length) return;

        if (reduced || !("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("in"); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var delay = parseFloat(el.dataset.delay || 0);
                setTimeout(function () { el.classList.add("in"); }, delay * 1000);
                io.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        items.forEach(function (el) { io.observe(el); });
    }

    /* ---------- portrait parallax tilt ---------- */

    function initTilt() {
        var frame = document.querySelector("[data-tilt]");
        if (!frame || reduced || window.matchMedia("(hover: none)").matches) return;

        frame.addEventListener("mousemove", function (e) {
            var r = frame.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            frame.style.transform = "perspective(900px) rotateY(" + (x * 6).toFixed(2) + "deg) rotateX(" + (-y * 6).toFixed(2) + "deg)";
        });

        frame.addEventListener("mouseleave", function () {
            frame.style.transform = "";
        });

        frame.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    }

    /* ---------- marquee: duplicate track for seamless loop ---------- */

    function initMarquee() {
        document.querySelectorAll(".marquee").forEach(function (m) {
            var track = m.querySelector(".marquee__track");
            if (!track) return;
            m.appendChild(track.cloneNode(true));
        });
    }

    /* ---------- repo search filter ---------- */

    function initFilter() {
        var input = document.querySelector("[data-filter-input]");
        var grid = document.querySelector("[data-filter-target]");
        if (!input || !grid) return;

        var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-search]"));
        var out = document.querySelector("[data-filter-count]");
        var empty = document.querySelector("[data-filter-empty]");

        function apply() {
            var q = input.value.trim().toLowerCase();
            var shown = 0;

            cards.forEach(function (card) {
                var hit = card.dataset.search.indexOf(q) !== -1;
                card.style.display = hit ? "" : "none";
                if (hit) shown++;
            });

            if (out) out.textContent = shown;
            if (empty) empty.style.display = shown ? "none" : "";
        }

        input.addEventListener("input", apply);
    }

    /* ---------- project slideshows ---------- */

    function initSlideshows() {
        document.querySelectorAll("[data-slideshow]").forEach(function (box) {
            var slides = box.querySelectorAll(".slide");
            var dots = box.querySelectorAll(".dot");
            var counter = box.querySelector("[data-slide-count]");
            if (slides.length < 1) return;

            var i = 0;
            var timer = null;

            function show(n) {
                i = (n + slides.length) % slides.length;
                slides.forEach(function (s, k) { s.classList.toggle("on", k === i); });
                dots.forEach(function (d, k) { d.classList.toggle("on", k === i); });
                if (counter) counter.textContent = (i + 1) + " / " + slides.length;
            }

            function auto() {
                if (reduced || slides.length < 2) return;
                clearInterval(timer);
                timer = setInterval(function () { show(i + 1); }, 5000);
            }

            box.querySelectorAll("[data-slide-prev]").forEach(function (b) {
                b.addEventListener("click", function () { show(i - 1); auto(); });
            });

            box.querySelectorAll("[data-slide-next]").forEach(function (b) {
                b.addEventListener("click", function () { show(i + 1); auto(); });
            });

            dots.forEach(function (d, k) {
                d.addEventListener("click", function () { show(k); auto(); });
            });

            box.addEventListener("mouseenter", function () { clearInterval(timer); });
            box.addEventListener("mouseleave", auto);

            show(0);
            auto();
        });
    }

    /* ---------- scrambling text on hover ---------- */

    function initScramble() {
        if (reduced) return;
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>_";

        document.querySelectorAll("[data-scramble]").forEach(function (el) {
            var original = el.textContent;
            var frame = null;

            el.addEventListener("mouseenter", function () {
                var step = 0;
                clearInterval(frame);

                frame = setInterval(function () {
                    el.textContent = original.split("").map(function (c, k) {
                        if (c === " ") return " ";
                        if (k < step) return original[k];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("");

                    step += 1 / 2;

                    if (step >= original.length) {
                        clearInterval(frame);
                        el.textContent = original;
                    }
                }, 28);
            });

            el.addEventListener("mouseleave", function () {
                clearInterval(frame);
                el.textContent = original;
            });
        });
    }

    /* ---------- boot ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        initMenu();
        initNav();
        initReveal();
        initTilt();
        initMarquee();
        initFilter();
        initSlideshows();
        initScramble();
    });
})();
