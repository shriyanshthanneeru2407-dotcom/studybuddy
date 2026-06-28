/**
 * StudyBuddy — Digital Notices Page Controller
 */
(function DigitalNoticesPage() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth check & Sidebar injection
    const session = SBAuth.requireAuth();
    if (!session) return;
    SBAuth.injectUserUI(session);

    /* -------------------------------------------------------
       DYNAMIC SIDEBAR NAVIGATION
    ------------------------------------------------------- */
    const sidebarNav = document.getElementById('sidebarNav');
    if (sidebarNav) {
      if (session.role === 'student') {
        sidebarNav.innerHTML = `
          <div class="sidebar-section-label">Academic Portal</div>
          <a href="../dashboards/student.html" class="nav-item" data-tooltip="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <a href="academic-records.html" class="nav-item" data-tooltip="Academic Records">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <span>Academic Records</span>
          </a>
          <a href="timetable.html" class="nav-item" data-tooltip="Timetable">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Smart Timetable</span>
          </a>
          <div class="sidebar-section-label">Self Management</div>
          <a href="goal-planner.html" class="nav-item" data-tooltip="Goal Planner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span>Goal Planner</span>
          </a>
          <a href="notices.html" class="nav-item active" data-tooltip="Digital Notices">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            <span>Digital Notices</span>
          </a>
          <div class="sidebar-section-label">AI & Resources</div>
          <a href="studybuddy-ai.html" class="nav-item" data-tooltip="StudyBuddy AI">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>StudyBuddy AI</span>
          </a>
          <a href="school-store.html" class="nav-item" data-tooltip="School Store">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>School Store</span>
          </a>
        `;
      } else {
        // Teacher/Admin
        sidebarNav.innerHTML = `
          <div class="sidebar-section-label">Academic Portal</div>
          <a href="../dashboards/${session.role}.html" class="nav-item" data-tooltip="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <a href="academic-records.html" class="nav-item" data-tooltip="Academic Records">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <span>Academic Records</span>
          </a>
          <a href="notices.html" class="nav-item active" data-tooltip="Digital Notices">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            <span>Digital Notices</span>
          </a>
          <div class="sidebar-section-label">Advanced Tools</div>
          <a href="studyvision.html" class="nav-item" data-tooltip="StudyVision AI">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>StudyVision AI</span>
          </a>
          <a href="analytics.html" class="nav-item" data-tooltip="Performance Analytics">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Analytics</span>
          </a>
        `;
      }
    }

    // Role-based publish permission check
    const addNoticeBtn = document.getElementById('addNoticeBtn');
    if (session.role === 'student') {
      if (addNoticeBtn) addNoticeBtn.classList.add('hidden');
    }

    /* -------------------------------------------------------
       NOTICES DATA STORE AND SEEDING
    ------------------------------------------------------- */
    const defaultNotices = [
      { id: '1', title: 'Calculus Assignment Due', desc: 'Syllabus Chapter 4 Limits homework must be submitted to the portal before Wednesday 12:00 PM. Access resources below.', date: 'Today', author: 'Dr. Priya Sharma', pinned: true, file: 'chapter_4_limits_assignment.pdf' },
      { id: '2', title: 'DPS Annual Science Fair 2026', desc: 'Entries are officially open for physics, chemistry, and robotic automation groups. Registrations close on July 10. Forms available at Principal office.', date: 'Yesterday', author: 'Principal Rajesh Kumar', pinned: true, file: 'science_fair_guidelines.pdf' },
      { id: '3', title: 'Monsoon Sports Schedule Revision', desc: 'Due to expected rain forecasts, sports club outdoor timings will shift to indoor activities. Check portal for adjusted timing sheets.', date: '3 days ago', author: 'Coach Vikram Singh', pinned: false, file: null }
    ];

    function getNotices() {
      const raw = localStorage.getItem('sb-notices-data');
      if (!raw) {
        localStorage.setItem('sb-notices-data', JSON.stringify(defaultNotices));
        return defaultNotices;
      }
      return JSON.parse(raw);
    }

    function saveNotices(notices) {
      localStorage.setItem('sb-notices-data', JSON.stringify(notices));
      // Update sidebar badge notification list sync
      const simpleNotices = notices.map(n => ({
        id: n.id,
        title: n.title,
        body: n.desc.slice(0, 70) + '...',
        date: n.date
      }));
      localStorage.setItem('sb-notices', JSON.stringify(simpleNotices.slice(0, 2)));
    }

    /* -------------------------------------------------------
       RENDER AND SEARCH
    ------------------------------------------------------- */
    function renderBoard() {
      const notices = getNotices();
      const search = document.getElementById('noticeSearch').value.toLowerCase();
      const filter = document.getElementById('noticeFilter').value;

      const board = document.getElementById('noticesBoardGrid');
      if (!board) return;

      let filtered = notices.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(search) || n.desc.toLowerCase().includes(search);
        
        if (filter === 'pinned') return matchesSearch && n.pinned;
        return matchesSearch;
      });

      // Sort pinned to the top, then recent
      filtered.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });

      if (filtered.length === 0) {
        board.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No notices on board.</div>`;
        return;
      }

      board.innerHTML = filtered.map((n, index) => {
        const originalIndex = notices.findIndex(o => o.id === n.id);
        const pinnedStyle = n.pinned ? 'border-left: 3px solid var(--color-warning);' : '';
        const attachmentHtml = n.file ? `
          <div style="margin-top:12px;">
            <a href="#" class="notice-attachment" onclick="alert('Downloading: ${n.file}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              <span>${n.file}</span>
            </a>
          </div>
        ` : '';

        return `
          <div class="card notice-card" style="${pinnedStyle}">
            <div class="notice-card-header">
              <h3 class="notice-card-title">${n.title}</h3>
              ${n.pinned ? `<span class="badge badge-yellow">📌 Pinned</span>` : ''}
            </div>
            
            <div class="notice-card-meta">By ${n.author} • ${n.date}</div>
            <p class="notice-card-body">${n.desc}</p>
            
            ${attachmentHtml}

            ${session.role !== 'student' ? `
              <div class="notice-actions">
                <button class="btn btn-ghost btn-sm edit-btn" data-index="${originalIndex}" style="padding:4px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                <button class="btn btn-ghost btn-sm delete-btn" data-index="${originalIndex}" style="padding:4px;color:var(--color-error);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      // Actions wire
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(parseInt(btn.getAttribute('data-index'))));
      });
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteNotice(parseInt(btn.getAttribute('data-index'))));
      });
    }

    // Bind triggers
    document.getElementById('noticeSearch').addEventListener('input', renderBoard);
    document.getElementById('noticeFilter').addEventListener('change', renderBoard);

    /* -------------------------------------------------------
       MODAL ACTIONS & SAVES
    ------------------------------------------------------- */
    const modal = document.getElementById('noticeModal');
    const form = document.getElementById('noticeForm');

    function openModal(index = null) {
      form.reset();
      document.querySelectorAll('.form-error').forEach(e => e.textContent = '');

      if (index !== null) {
        const n = getNotices()[index];
        document.getElementById('modalTitle').textContent = 'Edit Notice Broadcast';
        document.getElementById('noticeIndex').value = index;
        document.getElementById('noticeTitle').value = n.title;
        document.getElementById('noticeDesc').value = n.desc;
        document.getElementById('pinNotice').checked = n.pinned;
        document.getElementById('attachFile').checked = !!n.file;
      } else {
        document.getElementById('modalTitle').textContent = 'Broadcast Notice';
        document.getElementById('noticeIndex').value = '';
      }
      modal?.classList.add('open');
    }

    function closeModal() {
      modal?.classList.remove('open');
    }

    if (addNoticeBtn) addNoticeBtn.addEventListener('click', () => openModal());
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const idx = document.getElementById('noticeIndex').value;
      const title = document.getElementById('noticeTitle').value.trim();
      const desc = document.getElementById('noticeDesc').value.trim();
      const pinned = document.getElementById('pinNotice').checked;
      const file = document.getElementById('attachFile').checked ? 'syllabus_2026.pdf' : null;

      let hasErr = false;
      if (!title) { document.getElementById('titleError').textContent = 'Title is required'; hasErr = true; }
      if (!desc) { document.getElementById('descError').textContent = 'Announcement description is required'; hasErr = true; }

      if (hasErr) return;

      const notices = getNotices();
      const newNotice = {
        id: idx === '' ? Date.now().toString() : notices[parseInt(idx)].id,
        title,
        desc,
        pinned,
        file,
        date: idx === '' ? 'Just Now' : notices[parseInt(idx)].date,
        author: idx === '' ? session.name : notices[parseInt(idx)].author
      };

      if (idx === '') {
        notices.unshift(newNotice);
        if (window.SBToast) window.SBToast.success('Notice Published', `"${title}" has been broadcast.`);
      } else {
        notices[parseInt(idx)] = newNotice;
        if (window.SBToast) window.SBToast.success('Notice Updated', `"${title}" has been revised.`);
      }

      saveNotices(notices);
      closeModal();
      renderBoard();
    });

    function deleteNotice(index) {
      if (confirm('Delete this notice?')) {
        const notices = getNotices();
        const removed = notices.splice(index, 1)[0];
        saveNotices(notices);
        renderBoard();
        if (window.SBToast) {
          window.SBToast.warning('Notice Deleted', `"${removed.title}" removed from board.`);
        }
      }
    }

    // Initial load
    renderBoard();
  });
})();
