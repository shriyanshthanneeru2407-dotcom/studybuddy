/**
 * StudyBuddy — Academic Records Page Controller
 */
(function AcademicRecords() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth validation
    const session = SBAuth.requireAuth();
    if (!session) return;
    SBAuth.injectUserUI(session);

    /* -------------------------------------------------------
       DYNAMIC ROLE-BASED SIDEBAR
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
          <a href="academic-records.html" class="nav-item active" data-tooltip="Academic Records">
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
      } else if (session.role === 'teacher') {
        sidebarNav.innerHTML = `
          <div class="sidebar-section-label">Academic Portal</div>
          <a href="../dashboards/teacher.html" class="nav-item" data-tooltip="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <a href="academic-records.html" class="nav-item active" data-tooltip="Academic Records">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <span>Academic Records</span>
          </a>
          <a href="notices.html" class="nav-item" data-tooltip="Digital Notices">
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
      } else if (session.role === 'admin') {
        sidebarNav.innerHTML = `
          <div class="sidebar-section-label">Administration</div>
          <a href="../dashboards/admin.html" class="nav-item" data-tooltip="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <a href="academic-records.html" class="nav-item active" data-tooltip="Academic Records">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <span>User Directory</span>
          </a>
          <a href="notices.html" class="nav-item" data-tooltip="Digital Notices">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            <span>Broadcaster notices</span>
          </a>
          <div class="sidebar-section-label">Operations</div>
          <a href="school-store.html" class="nav-item" data-tooltip="School Store">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>School Store Inventory</span>
          </a>
          <a href="analytics.html" class="nav-item" data-tooltip="Platform Analytics">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Engagement Logs</span>
          </a>
          <a href="settings.html" class="nav-item" data-tooltip="System Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>System Settings</span>
          </a>
        `;
      }
    }

    // Role permissions control: Student can only view, Teacher/Admin can edit
    const addRecordBtn = document.getElementById('addRecordBtn');
    if (session.role === 'student') {
      if (addRecordBtn) addRecordBtn.classList.add('hidden');
    }

    /* -------------------------------------------------------
       MOCK STUDENT DATA DATABASE
    ------------------------------------------------------- */
    const defaultStudents = [
      { roll: 'SB2024-042', name: 'Arjun Mehta', class: '10-A', subjects: ['Math', 'Science', 'English'], marks: 84, attendance: 92 },
      { roll: 'SB2024-011', name: 'Sneha Reddy', class: '10-A', subjects: ['Math', 'Science', 'Hindi'], marks: 91, attendance: 88 },
      { roll: 'SB2024-089', name: 'Rahul Sharma', class: '10-B', subjects: ['Math', 'History', 'English'], marks: 73, attendance: 95 },
      { roll: 'SB2024-055', name: 'Kabir Verma', class: '9-A', subjects: ['Math', 'Science', 'Social'], marks: 68, attendance: 84 },
      { roll: 'SB2024-102', name: 'Divya Iyer', class: '11-A', subjects: ['Physics', 'Chemistry', 'Math'], marks: 95, attendance: 97 }
    ];

    function getStudents() {
      const raw = localStorage.getItem('sb-students');
      if (!raw) {
        localStorage.setItem('sb-students', JSON.stringify(defaultStudents));
        return defaultStudents;
      }
      return JSON.parse(raw);
    }

    function saveStudents(data) {
      localStorage.setItem('sb-students', JSON.stringify(data));
    }

    /* -------------------------------------------------------
       RENDER AND SEARCH/FILTER OPERATIONS
    ------------------------------------------------------- */
    function renderTable() {
      const students = getStudents();
      const search = document.getElementById('recordSearch').value.toLowerCase();
      const classFilt = document.getElementById('classFilter').value;
      const sort = document.getElementById('sortBy').value;

      let filtered = students.filter(stu => {
        const matchesSearch = stu.name.toLowerCase().includes(search) ||
                              stu.roll.toLowerCase().includes(search) ||
                              stu.subjects.join(' ').toLowerCase().includes(search);
        
        const matchesClass = classFilt === 'all' || stu.class === classFilt;

        return matchesSearch && matchesClass;
      });

      // Sort
      if (sort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'roll') {
        filtered.sort((a, b) => a.roll.localeCompare(b.roll));
      } else if (sort === 'marks') {
        filtered.sort((a, b) => b.marks - a.marks);
      }

      const body = document.getElementById('recordsTableBody');
      if (body) {
        if (filtered.length === 0) {
          body.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:40px;">No student records found.</td></tr>`;
          return;
        }

        body.innerHTML = filtered.map((stu, index) => {
          const originalIndex = students.findIndex(s => s.roll === stu.roll);
          const statusClass = stu.marks >= 75 ? 'badge-green' : (stu.marks >= 50 ? 'badge-blue' : 'badge-red');
          const statusText = stu.marks >= 75 ? 'Distinction' : (stu.marks >= 50 ? 'Pass' : 'Needs Review');
          
          return `
            <tr>
              <td><strong style="font-family:var(--font-mono);">${stu.roll}</strong></td>
              <td><strong>${stu.name}</strong></td>
              <td><span class="badge badge-navy">${stu.class}</span></td>
              <td>${stu.subjects.map(s => `<span class="tag" style="margin-right:2px;">${s}</span>`).join('')}</td>
              <td><strong>${stu.marks}%</strong></td>
              <td>
                <div class="flex items-center gap-2">
                  <span class="text-sm fw-medium">${stu.attendance}%</span>
                  <div class="progress-bar" style="width:50px;">
                    <div class="progress-fill ${stu.attendance >= 90 ? 'green' : 'amber'}" style="width: ${stu.attendance}%"></div>
                  </div>
                </div>
              </td>
              <td><span class="badge ${statusClass}">${statusText}</span></td>
              <td class="text-right">
                ${session.role !== 'student' ? `
                  <button class="btn btn-ghost btn-sm edit-btn" data-index="${originalIndex}" style="padding:4px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                  <button class="btn btn-ghost btn-sm delete-btn" data-index="${originalIndex}" style="padding:4px;color:var(--color-error);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                ` : '--'}
              </td>
            </tr>
          `;
        }).join('');

        // Wire Actions
        document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', () => openModal(parseInt(btn.getAttribute('data-index'))));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', () => deleteRecord(parseInt(btn.getAttribute('data-index'))));
        });
      }
    }

    // Bind filters
    document.getElementById('recordSearch').addEventListener('input', renderTable);
    document.getElementById('classFilter').addEventListener('change', renderTable);
    document.getElementById('sortBy').addEventListener('change', renderTable);

    /* -------------------------------------------------------
       MODAL TRIGGERS AND FORM SAVING
    ------------------------------------------------------- */
    const modal = document.getElementById('recordModal');
    const form = document.getElementById('recordForm');
    
    function openModal(index = null) {
      if (!modal) return;
      form.reset();
      
      // Clear errors
      document.querySelectorAll('.form-error').forEach(e => e.textContent = '');

      if (index !== null) {
        // Edit Mode
        const stu = getStudents()[index];
        document.getElementById('modalTitle').textContent = 'Edit Student Record';
        document.getElementById('recordIndex').value = index;
        document.getElementById('studentName').value = stu.name;
        document.getElementById('rollNo').value = stu.roll;
        document.getElementById('studentClass').value = stu.class;
        document.getElementById('subjects').value = stu.subjects.join(', ');
        document.getElementById('marks').value = stu.marks;
        document.getElementById('attendance').value = stu.attendance;
        // Roll number immutable during edit
        document.getElementById('rollNo').setAttribute('readonly', 'true');
      } else {
        // Add Mode
        document.getElementById('modalTitle').textContent = 'Add New Student Record';
        document.getElementById('recordIndex').value = '';
        document.getElementById('rollNo').removeAttribute('readonly');
      }

      modal.classList.add('open');
    }

    function closeModal() {
      modal?.classList.remove('open');
    }

    if (addRecordBtn) addRecordBtn.addEventListener('click', () => openModal());
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);

    // Save record submit
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const idx = document.getElementById('recordIndex').value;
      const name = document.getElementById('studentName').value.trim();
      const roll = document.getElementById('rollNo').value.trim();
      const cls = document.getElementById('studentClass').value.trim().toUpperCase();
      const subjStr = document.getElementById('subjects').value;
      const marks = parseInt(document.getElementById('marks').value);
      const att = parseInt(document.getElementById('attendance').value);

      let hasErr = false;
      if (!name) { document.getElementById('nameError').textContent = 'Name is required'; hasErr = true; }
      if (!roll) { document.getElementById('rollError').textContent = 'Roll number is required'; hasErr = true; }
      if (!cls) { document.getElementById('classError').textContent = 'Class & Sec is required'; hasErr = true; }
      if (isNaN(marks) || marks < 0 || marks > 100) { document.getElementById('marksError').textContent = 'Enter marks between 0-100'; hasErr = true; }
      if (isNaN(att) || att < 0 || att > 100) { document.getElementById('attendanceError').textContent = 'Enter attendance between 0-100'; hasErr = true; }

      if (hasErr) return;

      const subjs = subjStr ? subjStr.split(',').map(s => s.trim()).filter(Boolean) : ['General'];
      const students = getStudents();

      if (idx === '') {
        // Check for duplicate roll number in Add mode
        if (students.some(s => s.roll === roll)) {
          document.getElementById('rollError').textContent = 'Roll number already exists';
          return;
        }
        students.push({ roll, name, class: cls, subjects: subjs, marks, attendance: att });
        if (window.SBToast) window.SBToast.success('Record Added', `Student ${name} successfully registered.`);
      } else {
        students[parseInt(idx)] = { roll, name, class: cls, subjects: subjs, marks, attendance: att };
        if (window.SBToast) window.SBToast.success('Record Updated', `Academic file for ${name} updated.`);
      }

      saveStudents(students);
      closeModal();
      renderTable();
    });

    function deleteRecord(index) {
      if (confirm('Are you sure you want to delete this record?')) {
        const students = getStudents();
        const deleted = students.splice(index, 1)[0];
        saveStudents(students);
        renderTable();
        if (window.SBToast) {
          window.SBToast.warning('Record Removed', `${deleted.name}'s profile has been deleted.`);
        }
      }
    }

    /* -------------------------------------------------------
       EXPORT CSV SIMULATION
    ------------------------------------------------------- */
    const exportBtn = document.getElementById('exportCsvBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const students = getStudents();
        const headers = 'Roll Number,Name,Class,Subjects,Term Marks,Attendance\n';
        const rows = students.map(s => 
          `"${s.roll}","${s.name}","${s.class}","${s.subjects.join(' | ')}",${s.marks},${s.attendance}`
        ).join('\n');
        
        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `studybuddy_academic_records_${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (window.SBToast) {
          window.SBToast.success('Export Successful', 'Academic matrix CSV download triggered.');
        }
      });
    }

    // Initial load
    renderTable();
  });
})();
