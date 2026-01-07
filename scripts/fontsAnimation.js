
/* ===============================
   LETTER MAGNETIC BOLD EFFECT
================================ */

class MagneticText {
    constructor(selector, radius = 80) {
        this.elements = document.querySelectorAll(selector);
        this.radius = radius;

        this.elements.forEach(el => this.prepareText(el));
        window.addEventListener("mousemove", e => this.onMouseMove(e));
    }

    prepareText(element) {
        const text = element.innerText;
        element.innerHTML = "";

        [...text].forEach(char => {
            const span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char;
            element.appendChild(span);
        });
    }

    onMouseMove(e) {
        this.elements.forEach(el => {
            el.querySelectorAll("span").forEach(span => {
                const rect = span.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                const dx = e.clientX - x;
                const dy = e.clientY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.radius) {
                    span.classList.add("active");
                } else {
                    span.classList.remove("active");
                }
            });
        });
    }
}
new MagneticText(".magnetic-text", 20);
