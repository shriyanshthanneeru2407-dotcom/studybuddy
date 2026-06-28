/**
 * StudyBuddy — Navigation Component
 * Handles sidebar collapse, mobile menu, dropdowns, notifications
 */
(function NavComponent() {
  document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------
       SIDEBAR COLLAPSE / EXPAND
    ------------------------------------------------------- */
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const topnav = document.getElementById('topnav');
    const toggleBtn = document.getElementById('sidebarToggle');
    const COLLAPSE_KEY = 'sb-sidebar-collapsed';

    function applySidebarState(collapsed) {
      if (!sidebar) return;
      if (collapsed) {
        sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('sidebar-collapsed');
      } else {
        sidebar.classList.remove('collapsed');
        if (mainContent) mainContent.classList.remove('sidebar-collapsed');
      }
      localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
    }

    // Restore last state
    if (sidebar) {
      const wasCollapsed = localStorage.getItem(COLLAPSE_KEY) === '1';
      applySidebarState(wasCollapsed);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.contains('collapsed');
        applySidebarState(!isCollapsed);
      });
    }

    /* -------------------------------------------------------
       MOBILE SIDEBAR
    ------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openMobileSidebar() {
      if (!sidebar) return;
      sidebar.classList.add('mobile-open');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove('mobile-open');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileSidebar);

    /* -------------------------------------------------------
       PUBLIC NAV MOBILE MENU
    ------------------------------------------------------- */
    const publicMobileBtn = document.getElementById('publicMobileMenuBtn');
    const publicMobileNav = document.getElementById('publicMobileNav');
    if (publicMobileBtn && publicMobileNav) {
      publicMobileBtn.addEventListener('click', () => {
        publicMobileNav.classList.toggle('open');
        const isOpen = publicMobileNav.classList.contains('open');
        publicMobileBtn.setAttribute('aria-expanded', isOpen);
      });
    }

    /* -------------------------------------------------------
       NOTIFICATIONS PANEL
    ------------------------------------------------------- */
    const notifBtn = document.getElementById('notifBtn');
    const notifPanel = document.getElementById('notifPanel');

    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel.classList.toggle('open');
        userDropdown?.classList.remove('open');
      });
    }

    /* -------------------------------------------------------
       USER DROPDOWN
    ------------------------------------------------------- */
    const userDropdownBtn = document.getElementById('userDropdownBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userDropdownBtn && userDropdown) {
      userDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
        notifPanel?.classList.remove('open');
      });
    }

    /* -------------------------------------------------------
       GENERIC DROPDOWNS
    ------------------------------------------------------- */
    document.querySelectorAll('[data-dropdown-trigger]').forEach(trigger => {
      const targetId = trigger.getAttribute('data-dropdown-trigger');
      const target = document.getElementById(targetId);
      if (!target) return;
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        target.classList.toggle('open');
      });
    });

    /* -------------------------------------------------------
       CLOSE ALL PANELS ON OUTSIDE CLICK
    ------------------------------------------------------- */
    document.addEventListener('click', () => {
      notifPanel?.classList.remove('open');
      userDropdown?.classList.remove('open');
      document.querySelectorAll('.dropdown-menu.open, .dropdown.open').forEach(el => {
        el.classList.remove('open');
      });
    });

    /* -------------------------------------------------------
       ACTIVE NAV ITEM
       Mark the current page in sidebar/nav
    ------------------------------------------------------- */
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item[href], a.nav-item').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
        link.classList.add('active');
      }
    });

    /* -------------------------------------------------------
       TOPNAV SEARCH
    ------------------------------------------------------- */
    const searchInput = document.querySelector('.topnav-search input');
    if (searchInput) {
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          searchInput.blur();
        }
      });
    }

    /* -------------------------------------------------------
       LOGOUT BUTTONS
    ------------------------------------------------------- */
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.SBAuth) window.SBAuth.logout();
        else window.location.href = '../login.html';
      });
    });

    /* -------------------------------------------------------
       BREADCRUMB — auto-generate if placeholder present
    ------------------------------------------------------- */
    const breadcrumbEl = document.getElementById('autoBreadcrumb');
    if (breadcrumbEl) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        const lastPart = parts[parts.length - 1].replace('.html', '').replace(/-/g, ' ');
        const formatted = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
        breadcrumbEl.innerHTML = `
          <a href="#">Home</a>
          <span class="breadcrumb-sep">›</span>
          <span class="breadcrumb-current">${formatted}</span>
        `;
      }
    }
  });
})();
