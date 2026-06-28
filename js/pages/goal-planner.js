/**
 * StudyBuddy — Goal Planner Page Controller
 */
(function GoalPlannerPage() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth validation
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
          <a href="goal-planner.html" class="nav-item active" data-tooltip="Goal Planner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span>Goal Planner</span>
          </a>
          <a href="notices.html" class="nav-item" data-tooltip="Digital Notices">
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
          <a href="notices.html" class="nav-item" data-tooltip="Digital Notices">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            <span>Digital Notices</span>
          </a>
        `;
      }
    }

    /* -------------------------------------------------------
       GOALS DATABASE
    ------------------------------------------------------- */
    const defaultGoals = [
      { title: 'Revise Calculus Limits', desc: 'Finish chapter exercises and complete past papers.', priority: 'High', status: 'In Progress', progress: 80, deadline: '2026-07-02' },
      { title: 'Read Macbeth Act 3', desc: 'Complete textual reading and summary notes.', priority: 'Medium', status: 'Completed', progress: 100, deadline: '2026-06-25' },
      { title: 'Physics Lab Report Draft', desc: 'Write theory section, plot chart variables.', priority: 'High', status: 'In Progress', progress: 45, deadline: '2026-07-05' },
      { title: 'Chemistry Equation balancing', desc: 'Practice balance sheets for test preparation.', priority: 'Low', status: 'Not Started', progress: 0, deadline: '2026-07-10' }
    ];

    function getGoals() {
      const raw = localStorage.getItem('sb-goals-list');
      if (!raw) {
        localStorage.setItem('sb-goals-list', JSON.stringify(defaultGoals));
        return defaultGoals;
      }
      return JSON.parse(raw);
    }

    function saveGoals(goals) {
      localStorage.setItem('sb-goals-list', JSON.stringify(goals));
      // Also update small dashboard goals representation
      const dashboardFormat = goals.map((g, idx) => ({
        id: idx,
        text: g.title,
        percent: g.progress,
        color: g.priority === 'High' ? 'red' : (g.priority === 'Medium' ? 'amber' : 'blue')
      }));
      localStorage.setItem('sb-goals', JSON.stringify(dashboardFormat));
    }

    /* -------------------------------------------------------
       RENDER AND FILTER
    ------------------------------------------------------- */
    function renderGoals() {
      const goals = getGoals();
      const search = document.getElementById('goalSearch').value.toLowerCase();
      const prioFilter = document.getElementById('priorityFilter').value;
      const statFilter = document.getElementById('statusFilter').value;

      const grid = document.getElementById('goalsGrid');
      if (!grid) return;

      const filtered = goals.filter(g => {
        const matchesSearch = g.title.toLowerCase().includes(search) || g.desc.toLowerCase().includes(search);
        const matchesPrio = prioFilter === 'all' || g.priority === prioFilter;
        const matchesStat = statFilter === 'all' || g.status === statFilter;
        return matchesSearch && matchesPrio && matchesStat;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1;text-align:center;padding:40px;color:var(--text-muted);">No goals found.</div>`;
        return;
      }

      grid.innerHTML = filtered.map((g, index) => {
        const originalIndex = goals.findIndex(o => o.title === g.title);
        const prioBadge = g.priority === 'High' ? 'badge-red' : (g.priority === 'Medium' ? 'badge-yellow' : 'badge-blue');
        const progressFillColor = g.priority === 'High' ? 'red' : (g.priority === 'Medium' ? 'amber' : 'green');
        const isCompleted = g.status === 'Completed';

        return `
          <div class="card goal-card-wrapper">
            <div class="goal-priority-row">
              <span class="badge ${prioBadge}">${g.priority} Priority</span>
              <span class="badge badge-gray">${g.status}</span>
            </div>
            
            <h3 class="goal-title-field">${g.title}</h3>
            <p class="goal-description">${g.desc}</p>
            
            <div class="goal-date-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Deadline: ${g.deadline || 'No Date'}</span>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2" style="font-size:11px;">
                <span class="text-secondary fw-semibold">Progress</span>
                <span class="text-muted fw-bold">${g.progress}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill ${progressFillColor}" style="width: ${g.progress}%"></div>
              </div>
            </div>

            <div class="goal-actions-row">
              ${!isCompleted ? `
                <button class="btn btn-ghost btn-sm complete-btn" data-index="${originalIndex}" title="Mark completed">✓ Done</button>
              ` : ''}
              <button class="btn btn-ghost btn-sm edit-btn" data-index="${originalIndex}" style="padding:4px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button class="btn btn-ghost btn-sm delete-btn" data-index="${originalIndex}" style="padding:4px;color:var(--color-error);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            </div>
          </div>
        `;
      }).join('');

      // Actions bindings
      document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', () => markCompleted(parseInt(btn.getAttribute('data-index'))));
      });
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(parseInt(btn.getAttribute('data-index'))));
      });
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteGoal(parseInt(btn.getAttribute('data-index'))));
      });
    }

    // Bind triggers
    document.getElementById('goalSearch').addEventListener('input', renderGoals);
    document.getElementById('priorityFilter').addEventListener('change', renderGoals);
    document.getElementById('statusFilter').addEventListener('change', renderGoals);

    /* -------------------------------------------------------
       MODAL ACTION & GOAL SAVING
    ------------------------------------------------------- */
    const modal = document.getElementById('goalModal');
    const form = document.getElementById('goalForm');
    const addGoalBtn = document.getElementById('addGoalBtn');

    function openModal(index = null) {
      form.reset();
      document.querySelectorAll('.form-error').forEach(e => e.textContent = '');

      if (index !== null) {
        // Edit Mode
        const g = getGoals()[index];
        document.getElementById('modalTitle').textContent = 'Edit Academic Goal';
        document.getElementById('goalIndex').value = index;
        document.getElementById('goalTitle').value = g.title;
        document.getElementById('goalDesc').value = g.desc;
        document.getElementById('goalPriority').value = g.priority;
        document.getElementById('goalStatus').value = g.status;
        document.getElementById('goalProgress').value = g.progress;
        document.getElementById('goalDeadline').value = g.deadline || '';
      } else {
        // Add Mode
        document.getElementById('modalTitle').textContent = 'Add Academic Goal';
        document.getElementById('goalIndex').value = '';
        document.getElementById('goalProgress').value = 0;
      }
      modal?.classList.add('open');
    }

    function closeModal() {
      modal?.classList.remove('open');
    }

    if (addGoalBtn) addGoalBtn.addEventListener('click', () => openModal());
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const idx = document.getElementById('goalIndex').value;
      const title = document.getElementById('goalTitle').value.trim();
      const desc = document.getElementById('goalDesc').value.trim();
      const priority = document.getElementById('goalPriority').value;
      const status = document.getElementById('goalStatus').value;
      const progress = parseInt(document.getElementById('goalProgress').value || 0);
      const deadline = document.getElementById('goalDeadline').value;

      if (!title) {
        document.getElementById('titleError').textContent = 'Title is required';
        return;
      }

      const goals = getGoals();
      const newGoal = {
        title,
        desc,
        priority,
        status: progress === 100 ? 'Completed' : status,
        progress: progress > 100 ? 100 : (progress < 0 ? 0 : progress),
        deadline
      };

      if (idx === '') {
        goals.push(newGoal);
        if (window.SBToast) window.SBToast.success('Goal Created', `"${title}" has been set.`);
      } else {
        goals[parseInt(idx)] = newGoal;
        if (window.SBToast) window.SBToast.success('Goal Updated', `"${title}" details changed.`);
      }

      saveGoals(goals);
      closeModal();
      renderGoals();
    });

    function markCompleted(index) {
      const goals = getGoals();
      goals[index].status = 'Completed';
      goals[index].progress = 100;
      saveGoals(goals);
      renderGoals();
      if (window.SBToast) {
        window.SBToast.success('Goal Completed!', `Excellent work finishing "${goals[index].title}"!`);
      }
    }

    function deleteGoal(index) {
      if (confirm('Delete this goal?')) {
        const goals = getGoals();
        const removed = goals.splice(index, 1)[0];
        saveGoals(goals);
        renderGoals();
        if (window.SBToast) {
          window.SBToast.warning('Goal Deleted', `"${removed.title}" removed.`);
        }
      }
    }

    // Initial render
    renderGoals();
  });
})();
