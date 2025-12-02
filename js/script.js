(function() {
    'use strict';
    
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    const allSections = document.querySelectorAll('.main, .section');
    let typingStarted = false;

    function revealSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 120) {
                section.classList.add("visible");
                
                if (section.id === 'sec2' && !typingStarted) {
                    startConsoleAnimation();
                }
            }
        });
    }

    function updateActiveDot() {
        let current = '';
        allSections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                current = sec.getAttribute('id') || 'main';
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href').substring(1) === current) {
                dot.classList.add('active');
            }
        });
    }

    function startConsoleAnimation() {
        const codeLines = [
            "[+] INICIANDO PRUEBA DE SEGURIDAD...",
            "[✓] Escaneando vulnerabilidades...",
            "[✓] Testeando configuraciones...",
            "[✓] Resultado: SISTEMA PROTEGIDO ✓"
        ];

        let index = 0;
        let charIndex = 0;

        function typeCode() {
            if (index < codeLines.length) {
                if (charIndex < codeLines[index].length) {
                    document.getElementById("consoleText").innerHTML += codeLines[index][charIndex];
                    charIndex++;
                    setTimeout(typeCode, 50);
                } else {
                    if (index < codeLines.length - 1) {
                        document.getElementById("consoleText").innerHTML += "<br>";
                    }
                    index++;
                    charIndex = 0;
                    setTimeout(typeCode, 300);
                }
            }
        }

        if (!typingStarted) {
            typingStarted = true;
            setTimeout(typeCode, 300);
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        revealSections();
        updateActiveDot();
    });

    window.addEventListener('load', () => {
        revealSections();
        updateActiveDot();
        
        const style = document.createElement('style');
        style.textContent = `
            img {
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
                pointer-events: none;
            }
            .left, #sec2, #sec3 {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    });

    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.classList.contains('left') || 
            e.target.classList.contains('section') || e.target.classList.contains('right')) {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.key === 'U') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.key === 'F12')) {
            e.preventDefault();
            return false;
        }
    });
})();