/**
 * StudyBuddy — Home Page Scripts
 */
(function HomePage() {
  document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------------------------------------
       ROLE-BASED FEATURES TABS
    ------------------------------------------------------- */
    const tabs = document.querySelectorAll('.role-tab');
    const panels = document.querySelectorAll('.role-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        // Hide all panels
        panels.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('hidden', '');
        });

        // Activate clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Show corresponding panel
        const targetId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(targetId);
        if (panel) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        }
      });
    });

    /* -------------------------------------------------------
       ANIMATE ON SCROLL (SUBTLE INTERACTION)
       Using IntersectionObserver
    ------------------------------------------------------- */
    const animElements = document.querySelectorAll(
      '.feature-card, .testimonial-card, .hero-float-card, .ai-highlight-content, .ai-highlight-visual'
    );

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animElements.forEach(el => {
        // Pause animation execution initially until observed
        el.style.animationPlayState = 'paused';
        observer.observe(el);
      });
    }
  });
})();
