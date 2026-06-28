/**
 * StudyBuddy — StudyVision AI Page Controller
 */
(function StudyVisionPage() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth validation
    const session = SBAuth.requireRole(['teacher', 'admin']);
    if (!session) return;
    SBAuth.injectUserUI(session);

    /* -------------------------------------------------------
       DYNAMIC SIDEBAR NAVIGATION
    ------------------------------------------------------- */
    const sidebarNav = document.getElementById('sidebarNav');
    if (sidebarNav) {
      if (session.role === 'teacher') {
        sidebarNav.innerHTML = `
          <div class="sidebar-section-label">Academic Portal</div>
          <a href="../dashboards/teacher.html" class="nav-item" data-tooltip="Dashboard">
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
          <div class="sidebar-section-label">Advanced Tools</div>
          <a href="studyvision.html" class="nav-item active" data-tooltip="StudyVision AI">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>StudyVision AI</span>
          </a>
          <a href="analytics.html" class="nav-item" data-tooltip="Performance Analytics">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Analytics</span>
          </a>
        `;
      } else {
        sidebarNav.innerHTML = `
          <div class="sidebar-section-label">Administration</div>
          <a href="../dashboards/admin.html" class="nav-item" data-tooltip="Dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <a href="academic-records.html" class="nav-item" data-tooltip="Academic Records">
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
        `;
      }
    }

    /* -------------------------------------------------------
       SIMULATE UPLOAD
    ------------------------------------------------------- */
    const uploadBtn = document.getElementById('simulateUploadBtn');
    const paper = document.getElementById('handwrittenPaper');
    const editor = document.getElementById('digitalEditor');
    const confidence = document.getElementById('confidenceBadge');
    
    let currentSheet = 1;

    const sheets = {
      1: {
        handwriting: `Q1. Explain Newton's Second Law of Motion.
        
Newton's Second Law of Motion states that the rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction in which the force acts.

F = ma, where F is force, m is mass of the object, and a is acceleration.

momentum is mass multiplied by velocity.`,
        confidence: '94% Confidence',
        badge: 'badge-green',
        remarks: 'Excellent physics definition. Well structured.',
        marks: 9
      },
      2: {
        handwriting: `Q2. What is photosynthesis?
        
Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms' activities.

Chlorophyll in leaves absorbs solar sunlight, which is mixed with carbon dioxide and water to produce glucose and oxygen gas.`,
        confidence: '87% Confidence',
        badge: 'badge-blue',
        remarks: 'Good botanical explanation. Chemical formula omitted.',
        marks: 8
      }
    };

    if (uploadBtn && paper && editor) {
      uploadBtn.addEventListener('click', () => {
        // Toggle sheets
        currentSheet = currentSheet === 1 ? 2 : 1;
        const sheet = sheets[currentSheet];

        paper.innerHTML = sheet.handwriting.replace(/\n/g, '<br>');
        editor.value = sheet.handwriting;
        
        confidence.textContent = sheet.confidence;
        confidence.className = `badge ${sheet.badge}`;

        document.getElementById('evaluationRemarks').value = sheet.remarks;
        document.getElementById('evaluationMarks').value = sheet.marks;

        if (window.SBToast) {
          window.SBToast.info('New Scanned Sheet Loaded', `Arjun Mehta's Sheet Q${currentSheet} uploaded successfully.`);
        }
      });
    }

    /* -------------------------------------------------------
       ANNOTATION TOOL ACTIONS
    ------------------------------------------------------- */
    const btnHighlight = document.getElementById('btnHighlight');
    const btnComment = document.getElementById('btnComment');

    if (btnHighlight && editor) {
      btnHighlight.addEventListener('click', () => {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        if (start === end) {
          alert('Please select some text in the digitized editor first.');
          return;
        }
        const text = editor.value;
        const selected = text.slice(start, end);
        editor.value = text.slice(0, start) + `[Highlight: ${selected}]` + text.slice(end);
        if (window.SBToast) {
          window.SBToast.info('Highlight Applied', 'Selected text marked.');
        }
      });
    }

    if (btnComment && editor) {
      btnComment.addEventListener('click', () => {
        const comment = prompt('Enter your inline remark/comment:');
        if (!comment) return;
        const pos = editor.selectionStart;
        const text = editor.value;
        editor.value = text.slice(0, pos) + ` {Remark: ${comment}} ` + text.slice(pos);
        if (window.SBToast) {
          window.SBToast.info('Comment Added', 'Inline feedback placed.');
        }
      });
    }

    /* -------------------------------------------------------
       EXPORT AND GRADE SYNC
    ------------------------------------------------------- */
    const exportBtn = document.getElementById('exportPdfBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        if (window.SBToast) {
          window.SBToast.success('PDF Export Initialized', 'Downloading evaluation report sheet...');
        }
      });
    }

    const saveGradesBtn = document.getElementById('saveGradesBtn');
    if (saveGradesBtn) {
      saveGradesBtn.addEventListener('click', () => {
        const marksPercent = parseInt(document.getElementById('evaluationMarks').value) * 10; // Convert 10 scale to percent
        
        // Sync to database
        const students = JSON.parse(localStorage.getItem('sb-students') || '[]');
        // Find Arjun Mehta SB2024-042
        const arjunIndex = students.findIndex(s => s.roll === 'SB2024-042');
        if (arjunIndex !== -1) {
          students[arjunIndex].marks = marksPercent;
          localStorage.setItem('sb-students', JSON.stringify(students));
        }

        if (window.SBToast) {
          window.SBToast.success('Evaluation Synced', `Assessment remarks saved. Arjun Mehta's score updated to ${marksPercent}%.`);
        }
      });
    }

  });
})();
