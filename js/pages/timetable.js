/**
 * StudyBuddy — Smart Timetable Page Controller
 */
(function TimetablePage() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth Check & Sidebar injection
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
          <a href="timetable.html" class="nav-item active" data-tooltip="Timetable">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Smart Timetable</span>
          </a>
          <div class="sidebar-section-label">Self Management</div>
          <a href="goal-planner.html" class="nav-item" data-tooltip="Goal Planner">
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
          <a href="notices.html" class="nav-item" data-tooltip="Digital Notices">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            <span>Digital Notices</span>
          </a>
        `;
      }
    }

    /* -------------------------------------------------------
       TIMETABLE DATABASE AND SEED SLOTS
    ------------------------------------------------------- */
    const defaultSlots = [
      { id: '1', day: 'Mon', time: '09:00 AM', subject: 'Mathematics', room: 'Room 302', type: 'math' },
      { id: '2', day: 'Mon', time: '01:00 PM', subject: 'English', room: 'Room 104', type: 'english' },
      { id: '3', day: 'Tue', time: '10:30 AM', subject: 'Physics Lab', room: 'Lab B', type: 'science' },
      { id: '4', day: 'Wed', time: '09:00 AM', subject: 'Mathematics', room: 'Room 302', type: 'math' },
      { id: '5', day: 'Thu', time: '02:30 PM', subject: 'History', room: 'Room 201', type: 'history' },
      { id: '6', day: 'Fri', time: '01:00 PM', subject: 'English Literature', room: 'Room 104', type: 'english' }
    ];

    function getSlots() {
      const raw = localStorage.getItem('sb-timetable-slots');
      if (!raw) {
        localStorage.setItem('sb-timetable-slots', JSON.stringify(defaultSlots));
        return defaultSlots;
      }
      return JSON.parse(raw);
    }

    function saveSlots(slots) {
      localStorage.setItem('sb-timetable-slots', JSON.stringify(slots));
    }

    /* -------------------------------------------------------
       CONFLICT DETECTION ALGORITHM
    ------------------------------------------------------- */
    function checkConflicts(slots) {
      const conflictAlert = document.getElementById('conflictAlert');
      const conflictText = document.getElementById('conflictAlertText');
      
      const counts = {};
      const conflictingIds = new Set();

      slots.forEach(slot => {
        const key = `${slot.day}-${slot.time}`;
        if (counts[key]) {
          counts[key].push(slot.id);
        } else {
          counts[key] = [slot.id];
        }
      });

      let hasConflict = false;
      const conflictMessages = [];

      for (const key in counts) {
        if (counts[key].length > 1) {
          hasConflict = true;
          counts[key].forEach(id => conflictingIds.add(id));
          const [day, time] = key.split('-');
          conflictMessages.push(`Overlap on ${day} at ${time}`);
        }
      }

      if (hasConflict && conflictAlert && conflictText) {
        conflictText.innerHTML = `Overlapping sessions detected:<br>${conflictMessages.join(', ')}`;
        conflictAlert.classList.remove('hidden');
      } else if (conflictAlert) {
        conflictAlert.classList.add('hidden');
      }

      return conflictingIds;
    }

    /* -------------------------------------------------------
       RENDER TIMETABLE CARDS
    ------------------------------------------------------- */
    function renderTimetable() {
      const slots = getSlots();
      const conflictingIds = checkConflicts(slots);

      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      
      days.forEach(day => {
        const col = document.getElementById(`col-${day}`);
        if (!col) return;

        // Filter and sort slots for the day by time
        const daySlots = slots.filter(s => s.day === day);
        daySlots.sort((a, b) => {
          const timeA = parseTime(a.time);
          const timeB = parseTime(b.time);
          return timeA - timeB;
        });

        if (daySlots.length === 0) {
          col.innerHTML = `<div style="text-align:center;padding:20px;font-size:11px;color:var(--text-muted);border:1px dashed var(--border-color);border-radius:var(--radius-lg);">Free Day</div>`;
          return;
        }

        col.innerHTML = daySlots.map(s => {
          const isConflict = conflictingIds.has(s.id);
          const borderStyle = isConflict ? 'border-left: 3px solid var(--color-error); outline: 2px solid var(--color-error);' : '';
          
          return `
            <div class="slot-card ${s.type}" style="${borderStyle}">
              <div class="slot-time">${s.time}</div>
              <div class="slot-title">${s.subject}</div>
              <div class="slot-room">${s.room}</div>
              <button class="slot-delete-btn" data-id="${s.id}" title="Remove slot" aria-label="Remove slot">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          `;
        }).join('');
      });

      // Bind delete events
      document.querySelectorAll('.slot-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          deleteSlot(id);
        });
      });
    }

    // Helper to turn e.g. "09:00 AM" into minutes for sorting
    function parseTime(timeStr) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (hours === 12) hours = 0;
      if (modifier === 'PM') hours += 12;
      return hours * 60 + minutes;
    }

    function deleteSlot(id) {
      let slots = getSlots();
      const removed = slots.find(s => s.id === id);
      slots = slots.filter(s => s.id !== id);
      saveSlots(slots);
      renderTimetable();
      if (window.SBToast && removed) {
        window.SBToast.warning('Slot Removed', `"${removed.subject}" deleted from schedule.`);
      }
    }

    /* -------------------------------------------------------
       MODAL AND SCHEDULER SUBMIT
    ------------------------------------------------------- */
    const modal = document.getElementById('sessionModal');
    const form = document.getElementById('sessionForm');
    const addSessionBtn = document.getElementById('addSessionBtn');

    function openModal() {
      form.reset();
      document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
      modal?.classList.add('open');
    }

    function closeModal() {
      modal?.classList.remove('open');
    }

    if (addSessionBtn) addSessionBtn.addEventListener('click', openModal);
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const subject = document.getElementById('sessionSubject').value.trim();
      const day = document.getElementById('sessionDay').value;
      const time = document.getElementById('sessionTime').value;
      const type = document.getElementById('sessionType').value;

      if (!subject) {
        document.getElementById('subjectError').textContent = 'Title is required';
        return;
      }

      const slots = getSlots();
      const newSlot = {
        id: Date.now().toString(),
        day,
        time,
        subject,
        room: type === 'study' ? 'Self Study Block' : 'Online Session',
        type
      };

      slots.push(newSlot);
      saveSlots(slots);
      closeModal();
      renderTimetable();

      if (window.SBToast) {
        window.SBToast.success('Session Scheduled', `"${subject}" added to your calendar.`);
      }
    });

    // Initial render
    renderTimetable();
  });
})();
