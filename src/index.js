export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Simple routing for static assets
        if (url.pathname === "/style.css") {
            return new Response(STYLES, {
                headers: { "content-type": "text/css" },
            });
        }

        if (url.pathname === "/script.js") {
            return new Response(SCRIPT, {
                headers: { "content-type": "application/javascript" },
            });
        }

        return new Response(HTML, {
            headers: { "content-type": "text/html;charset=UTF-8" },
        });
    },
};

const STYLES = `:root {
    --bg-white: #ffffff;
    --gemini-blue: #4796e3;
    --gemini-purple: #ad89eb;
    --gemini-pink: #ca6673;
    --text-main: #1f1f1f;
    --text-dim: #444746;
    --nav-height: 64px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Outfit', sans-serif;
    background-color: var(--bg-white);
    color: var(--text-main);
    line-height: 1.5;
    overflow-x: hidden;
    overflow-y: auto;
}

#background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: #ffffff;
}

.glass-nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--nav-height);
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
}

.nav-content {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-main);
}

.logo span {
    font-weight: 400;
    color: var(--text-dim);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
}

.nav-item {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.nav-links a {
    color: var(--text-main);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: opacity 0.2s;
}

.nav-links a:hover {
    opacity: 0.7;
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 8px;
    min-width: 200px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 1001;
}

.nav-item:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.dropdown a {
    display: block;
    padding: 12px 16px;
    color: var(--text-main) !important;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 8px;
    transition: background 0.2s;
}

.dropdown a:hover {
    background: #f5f5f7;
    opacity: 1 !important;
}

.btn-pill {
    background: #000;
    color: #fff !important;
    padding: 10px 24px;
    border-radius: 100px;
    font-weight: 600 !important;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 120px 24px;
    text-align: center;
}

.hero-content h1 {
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 700;
    line-height: 1.05;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    color: var(--text-main);
}

.hero-content h1 span {
    background: linear-gradient(90deg, var(--gemini-blue), var(--gemini-purple), var(--gemini-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-content p {
    font-size: 1.25rem;
    color: var(--text-dim);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.hero-actions {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    gap: 16px;
}

.btn-black {
    background: #1f1f1f;
    color: #fff;
    padding: 14px 32px;
    border-radius: 100px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.btn-black:hover {
    background: #000;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
}

.btn-outline {
    background: transparent;
    border: 1px solid #dadce0;
    color: var(--text-main);
    padding: 14px 32px;
    border-radius: 100px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
}

.btn-outline:hover {
    background: #f8f9fa;
}

/* Animations */
.fade-in {
    opacity: 0;
    animation: fadeIn 0.8s forwards;
}

.fade-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s 0.2s forwards;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

@keyframes fadeUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .floating-cards {
        flex-direction: column;
    }
    .hero-actions {
        flex-direction: column;
        width: 100%;
    }
}
`;

const SCRIPT = `const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles;

const colors = ['#4796e3', '#ad89eb', '#ca6673', '#ad89eb'];

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.5 + 0.2;
        this.orbitRadius = Math.random() * 300 + 50;
        this.centerX = width / 2;
        this.centerY = height / 2;
    }

    update() {
        this.angle += this.velocity * 0.01;
        this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
    }
}

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
`;

const HTML = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloudflare AI Search | Antigravity Style</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
</head>
<body class="light-theme">
    <canvas id="background-canvas"></canvas>
    
    <nav class="glass-nav">
        <div class="nav-content">
            <div class="logo">Cloudflare <span>Demo</span></div>
            <div class="nav-links">
                <a href="https://bank-cf-demo-ai-suite.nforce-lab.workers.dev/">Home</a>
                <div class="nav-item">
                    <a href="#use-cases">Use Cases <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-left:2px;"><path d="m6 9 6 6 6-6"/></svg></a>
                    <div class="dropdown">
                        <a href="#">AI Search</a>
                    </div>
                </div>
                <a href="#demo" class="btn-pill">Get Started</a>
            </div>
        </div>
    </nav>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1 class="fade-in">Confidently scale <span>AI Search</span></h1>
                <p class="fade-up" style="font-weight: 700; color: var(--text-main); margin-bottom: 12px; text-align: center;">Unlock the power of your enterprise data with secure, high-performance AI Search.</p>
                <p class="fade-up" style="font-size: 1.1rem; max-width: 800px; text-align: center; color: var(--text-dim);">Cloudflare AI Search provides a high-performance, secure foundation for building next-generation search experiences. Levering our global network, you can deliver sub-second response times while ensuring your sensitive data remains protected and compliant.</p>
                <div class="hero-actions">
                    <a href="#demo" class="btn-black">Try Search Demo</a>
                    <a href="https://developers.cloudflare.com/workers/learning/vectorize/" target="_blank" class="btn-outline">View Documentation</a>
                </div>
            </div>
        </section>
    </main>

    <script src="/script.js"></script>
</body>
</html>
`;
