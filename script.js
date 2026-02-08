document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll-reveal animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for reveal elements
    const revealElements = document.querySelectorAll('.section, .concept-item, .stats-card, .logic-card, .sql-box');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        revealObserver.observe(el);
    });

    // Add CSS dynamically for visible state
    const revealStyle = document.createElement('style');
    revealStyle.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // 3. Navbar change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.padding = '12px 0';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            nav.style.background = 'rgba(253, 250, 246, 0.95)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(253, 250, 246, 0.8)';
        }
    });

    // 4. Copy to Clipboard functionality for SQL Code
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const pre = btn.parentElement.nextElementSibling;
            const code = pre.querySelector('code').innerText;

            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Copiado!';
                btn.style.background = '#27ae60';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'rgba(255,255,255,0.1)';
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
    });

    // 5. SVG Hover effects for Entities
    const entities = document.querySelectorAll('.node.entity');
    entities.forEach(entity => {
        entity.addEventListener('mouseenter', () => {
            entity.style.filter = 'drop-shadow(0 0 8px rgba(243, 156, 18, 0.5))';
            entity.style.strokeWidth = '3';
        });
        entity.addEventListener('mouseleave', () => {
            entity.style.filter = 'none';
            entity.style.strokeWidth = '2';
        });
    });
});
