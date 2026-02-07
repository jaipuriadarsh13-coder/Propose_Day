document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.getElementById('glow-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Boot Screen Sequence
    const bootText = [
        "> Initializing HeartOS v1.0...",
        "> Searching for unique frequencies...",
        "> Frequency Found: 'MANVI' [Matched]",
        "> Loading Shared Memories (999+ Files)...",
        "> Analyzing Kindness.Stat... [Infinite Detected]",
        "> Compatibility Check... [Perfect Match]",
        "> Preparing Special Message for Manvi...",
        "> System Ready ❤️"
    ];

    const bootContainer = document.getElementById('boot-text');
    let lineIdx = 0;

    function typeBootLine() {
        if (lineIdx < bootText.length) {
            const p = document.createElement('p');
            p.style.marginBottom = '8px';
            bootContainer.appendChild(p);

            let charIdx = 0;
            const text = bootText[lineIdx];

            const timer = setInterval(() => {
                if (charIdx < text.length) {
                    p.textContent += text[charIdx];
                    charIdx++;
                } else {
                    clearInterval(timer);
                    lineIdx++;
                    setTimeout(typeBootLine, 500);
                }
            }, 50);
        } else {
            setTimeout(completeBoot, 1000);
        }
    }

    function completeBoot() {
        const bootScreen = document.getElementById('boot-screen');
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.classList.add('hidden');
            document.getElementById('appreciation').classList.remove('hidden');
            document.getElementById('appreciation').classList.add('active');
            startObserver();
        }, 1000);
    }

    typeBootLine();

    // 3. Reveal Observer
    function startObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Special case for triggering next sections
                    if (entry.target.id === 'appreciation') {
                        document.getElementById('stats').classList.remove('hidden');
                        document.getElementById('stats').classList.add('active');
                    }
                    if (entry.target.id === 'stats') {
                        document.getElementById('letter').classList.remove('hidden');
                        document.getElementById('letter').classList.add('active');
                        startLetterTypewriter();
                    }
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('section, .reveal').forEach(el => observer.observe(el));
    }

    // 4. Letter Typewriter
    let letterStarted = false;
    const letterContent = `Dear Manvi,

From the moment we started talking, I knew there was something different about you. It wasn't just your incredible coding skills or how you dominate in Valorant as Reyna.

It's the kindness you show effortlessly, the way you make me smile even on the busiest days, and the genuine way you connect with the world.

I built this little corner of the digital world for you, because you deserve to feel as special as you make me feel.

I want to spend more time learning from you, gaming with you, and building a beautiful future together.`;

    function startLetterTypewriter() {
        if (letterStarted) return;
        letterStarted = true;

        const container = document.getElementById('letter-content');
        let i = 0;

        function type() {
            if (i < letterContent.length) {
                container.textContent += letterContent[i];
                i++;
                setTimeout(type, 30);
            } else {
                document.getElementById('proposal').classList.remove('hidden');
                document.getElementById('proposal').classList.add('active');
            }
        }
        type();
    }

    // 5. Proposal Logic
    const continueBtn = document.getElementById('continue-btn');
    const mainMoment = document.getElementById('main-moment');
    const yesBtn = document.getElementById('yes-btn');

    continueBtn.addEventListener('click', () => {
        continueBtn.style.display = 'none';
        setTimeout(() => {
            mainMoment.classList.remove('hidden');
            createParticles();
        }, 500);
    });

    yesBtn.addEventListener('click', () => {
        document.getElementById('proposal').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('celebration').classList.add('active');
        celebrate();
    });

    // 6. Particle System
    function createParticles() {
        const container = document.getElementById('particles-container');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '❤️';
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
            particle.style.opacity = Math.random();
            particle.style.animation = `float ${Math.random() * 5 + 5}s linear infinite`;
            container.appendChild(particle);
        }
    }

    function celebrate() {
        const container = document.getElementById('particles-container');
        container.innerHTML = ''; // Reset
        for (let i = 0; i < 150; i++) {
            const p = document.createElement('div');
            p.innerHTML = i % 2 === 0 ? '✨' : '❤️';
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '110vh';
            p.style.fontSize = (Math.random() * 25 + 15) + 'px';
            p.style.animation = `rise ${Math.random() * 3 + 2}s ease-out forwards`;
            p.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(p);
        }
    }
    // 7. Click Pulse Heart
    document.addEventListener('mousedown', (e) => {
        const pulse = document.createElement('div');
        pulse.textContent = '❤️';
        pulse.style.position = 'fixed';
        pulse.style.left = e.clientX + 'px';
        pulse.style.top = e.clientY + 'px';
        pulse.style.transform = 'translate(-50%, -50%)';
        pulse.style.pointerEvents = 'none';
        pulse.style.fontSize = '2rem';
        pulse.style.zIndex = '9999';
        pulse.style.animation = 'clickPulse 0.5s ease-out forwards';
        document.body.appendChild(pulse);
        setTimeout(() => pulse.remove(), 500);
    });
});

// Animations added via CSS or JS-injected keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        20% { opacity: 0.8; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes rise {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
    }
    @keyframes clickPulse {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
`;
document.head.appendChild(style);
