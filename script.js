tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            maroon: '#731625',
                            maroonDark: '#4a0e17',
                            gold: '#F4B41A',
                            dark: '#0a0a0a',
                            darkGray: '#171717',
                            light: '#F8F4E6'
                        }
                    },
                    fontFamily: {
                        brand: ['Shrikhand', 'cursive'],
                        display: ['Poppins', 'sans-serif'],
                        body: ['Inter', 'sans-serif']
                    },
                    animation: {
                        'marquee': 'marquee 25s linear infinite',
                        'float-slow': 'float 6s ease-in-out infinite',
                        'blob': 'blob 7s infinite',
                        'tilt': 'tilt 10s infinite linear',
                    },
                    keyframes: {
                        marquee: {
                            '0%': { transform: 'translateX(0%)' },
                            '100%': { transform: 'translateX(-100%)' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' }
                        },
                        blob: {
                            '0%': { transform: 'translate(0px, 0px) scale(1)' },
                            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                            '100%': { transform: 'translate(0px, 0px) scale(1)' }
                        },
                        tilt: {
                            '0%, 50%, 100%': { transform: 'rotate(0deg)' },
                            '25%': { transform: 'rotate(1deg)' },
                            '75%': { transform: 'rotate(-1deg)' }
                        }
                    }
                }
            }
        }

document.addEventListener('DOMContentLoaded', () => {
            // Setup Intersection Observer for elements with 'reveal' class
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Optional: Stop observing once revealed
                        // observer.unobserve(entry.target); 
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));

            // Navbar background effect on scroll
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('shadow-md', 'bg-brand-light/95');
                    navbar.classList.remove('glass');
                } else {
                    navbar.classList.remove('shadow-md', 'bg-brand-light/95');
                    navbar.classList.add('glass');
                }
            });
        });

let chatOpen = false;

        function toggleCrepeChat() {
            const panel = document.getElementById('crepe-chat-panel');
            const popout = document.getElementById('crepe-chat-popout');
            if (chatOpen) {
                panel.classList.remove('open');
                chatOpen = false;
            } else {
                panel.classList.add('open');
                if (popout) popout.style.display = 'none'; // Auto-hide welcome text on open
                chatOpen = true;
            }
        }

        // Close chat if user clicks outside
        document.addEventListener('click', function(e) {
            if (!chatOpen) return;
            const wrapper = document.getElementById('crepe-chat-wrapper');
            const panel = document.getElementById('crepe-chat-panel');
            if (!wrapper.contains(e.target) && !panel.contains(e.target)) {
                panel.classList.remove('open');
                chatOpen = false;
            }
        });

        // Show welcome popout bubble after 3 seconds if main panel isn't open
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const panel = document.getElementById('crepe-chat-panel');
                const popout = document.getElementById('crepe-chat-popout');
                if (panel && !panel.classList.contains('open')) {
                    popout.style.display = 'block';
                }
            }, 3000);
        });

        // Kill default injected chat bubbles
        function nukeDefault() {
            ['#paymegpt-bubble-btn','[id*="paymegpt-bubble"]','[class*="paymegpt-bubble"]',
            '[id*="pmgpt-launcher"]','[class*="pmgpt-launcher"]','div[data-paymegpt-launcher]',
            '[class*="widget-launcher"]','[class*="widget-bubble"]'].forEach(function(s){
                try { document.querySelectorAll(s).forEach(function(el){
                    el.style.cssText='display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;width:0!important;height:0!important;position:absolute!important;top:-9999px!important;left:-9999px!important;';
                }); } catch(e){}
            });
            // Also scan for fixed round bubbles
            document.querySelectorAll('body > div').forEach(function(el){
                if (el.id === 'crepe-chat-wrapper' || el.id === 'crepe-chat-panel') return;
                const cs = window.getComputedStyle(el);
                const attr = el.getAttribute('style') || '';
                if ((cs.position === 'fixed' || attr.includes('fixed')) && !el.id.startsWith('crepe')) {
                    const r = el.getBoundingClientRect();
                    if (r.width < 130 && r.height < 130 && r.width > 0) {
                        const br = cs.borderRadius || '';
                        if (br.includes('50%') || attr.includes('border-radius: 50%')) {
                            el.style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;';
                        }
                    }
                }
            });
        }
        nukeDefault();
        setInterval(nukeDefault, 200);
        window.addEventListener('load', nukeDefault);