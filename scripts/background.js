
/* ===============================
   STAR BACKGROUND CANVAS
================================ */

const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

class Star {
    constructor() {
        this.homeX = Math.random() * w;
        this.homeY = Math.random() * h;
        this.x = this.homeX;
        this.y = this.homeY;
        this.size = Math.random() * 1.5 + 0.4;
        this.density = Math.random() * 25 + 5;
    }

    update() {
        if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * this.density;
                this.y -= (dy / dist) * force * this.density;
            } else {
                this.returnHome();
            }
        } else {
            this.returnHome();
        }
    }

    returnHome() {
        this.x += (this.homeX - this.x) * 0.02;
        this.y += (this.homeY - this.y) * 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180,220,255,0.23)";
        ctx.fill();
    }
}

const STAR_COUNT = window.innerWidth < 768 ? 300 : 900;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

animateStars();