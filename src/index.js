export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

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
    --nav-height: 80px;
    --primary-glow: rgba(71, 150, 227, 0.2);
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
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.nav-content {
    width: 100%;
    max-width: 1200px;
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
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo span {
    font-weight: 400;
    color: var(--text-dim);
}

/* AI Search Container */
.search-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 24px;
    max-width: 900px;
    margin: 0 auto;
}

.hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 700;
    margin-bottom: 16px;
    text-align: center;
    letter-spacing: -0.02em;
}

.hero-title span {
    background: linear-gradient(90deg, var(--gemini-blue), var(--gemini-purple), var(--gemini-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.1rem;
    color: var(--text-dim);
    margin-bottom: 48px;
    text-align: center;
    max-width: 600px;
}

/* Prompt Box */
.prompt-box {
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 24px;
    padding: 8px;
    display: flex;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.prompt-box:focus-within {
    box-shadow: 0 15px 40px rgba(71, 150, 227, 0.15);
    border-color: var(--gemini-blue);
    transform: translateY(-2px);
}

.prompt-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 16px 24px;
    font-size: 1.1rem;
    font-family: inherit;
    background: transparent;
}

.search-btn {
    background: #1f1f1f;
    color: #fff;
    border: none;
    padding: 12px 28px;
    border-radius: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.search-btn:hover {
    background: #000;
    transform: scale(1.02);
}

/* Results Area (Placeholder) */
.results-area {
    margin-top: 40px;
    width: 100%;
    display: none; /* Hidden by default */
}

.glass-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.terminal-mock {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    color: var(--text-dim);
    line-height: 1.8;
}

.line { margin-bottom: 8px; }
.accent { color: var(--gemini-blue); font-weight: 600; }

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

footer {
    padding: 40px;
    text-align: center;
    color: var(--text-dim);
    font-size: 0.9rem;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 40px;
}

.nav-links a {
    color: var(--text-main);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 700;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav-links a:hover {
    opacity: 0.7;
}

.btn-pill {
    background: #000 !important;
    color: #fff !important;
    padding: 14px 36px !important;
    border-radius: 100px !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    font-size: 1.1rem !important;
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
        this.radius = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.3 + 0.1;
        this.orbitRadius = Math.random() * 400 + 100;
        this.centerX = width / 2;
        this.centerY = height / 2;
    }

    update() {
        this.angle += this.velocity * 0.005;
        this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

        if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
    }
}

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 120; i++) {
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

// UI Interactions
const searchBtn = document.querySelector('.search-btn');
const input = document.querySelector('.prompt-input');
const results = document.querySelector('.results-area');

searchBtn.addEventListener('click', () => {
    if (input.value.trim()) {
        results.style.display = 'block';
        results.classList.add('fade-up');
        // Simulated response
        const mockTerminal = document.querySelector('.terminal-mock');
        mockTerminal.innerHTML = '<div class="line"><span class="accent">[AI Search]</span> Analyzing query: ' + input.value + '...</div>' +
                                '<div class="line"><span class="accent">[Vector]</span> Searching Cloudflare Vector Database...</div>' +
                                '<div class="line">... Ready to connect with actual AI Search logic later.</div>';
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});
`;

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloudflare AI Search | Antigravity</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
</head>
<body>
    <canvas id="background-canvas"></canvas>
    
    <nav class="glass-nav">
        <div class="nav-content">
            <div class="logo">Cloudflare <span>AI Search</span></div>
            <div class="nav-links">
                <a href="#">Product</a>
                <a href="#">Use Cases <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></a>
                <a href="#" class="btn-pill">Get Started</a>
            </div>
        </div>
    </nav>

    <main>
        <div class="search-container">
            <h1 class="hero-title fade-in">Search the <span>Knowledge</span></h1>
            <p class="hero-subtitle fade-up">Experience powerful AI-driven search, delivered at the edge by Cloudflare...</p>
            
            <div class="prompt-box fade-up">
                <input type="text" class="prompt-input" placeholder="Type your search query here..." autofocus>
                <button class="search-btn">
                    <span>Search</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </div>

            <div class="results-area">
                <div class="glass-card">
                    <div class="terminal-mock">
                        <!-- Content injected via JS -->
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2026 Cloudflare AI Suite. Created by Bank Nattavut</p>
    </footer>

    <script src="/script.js"></script>
</body>
</html>
`;
