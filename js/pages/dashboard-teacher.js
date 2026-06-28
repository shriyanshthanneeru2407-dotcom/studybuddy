/**
 * StudyBuddy — Teacher Dashboard Controller
 */
(function TeacherDashboard() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth check & User UI inject
    const session = SBAuth.requireRole(['teacher']);
    if (!session) return;
    SBAuth.injectUserUI(session);

    // Setup date formatting
    const dateDisplay = document.getElementById('teacherDateDisplay');
    if (dateDisplay) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formatted = new Date().toLocaleDateString('en-US', options);
      dateDisplay.textContent = `${session.department || 'Mathematics'} Dept • ${session.school || 'StudyBuddy School'}`;
    }

    // Classes schedule list
    const classes = [
      { time: '09:00 AM', section: 'Class 10-A', subject: 'Mathematics (Calculus)', attendance: '28 / 30', status: 'Completed', label: 'gray' },
      { time: '11:00 AM', section: 'Class 10-B', subject: 'Mathematics (Calculus)', attendance: '29 / 30', status: 'Completed', label: 'gray' },
      { time: '01:30 PM', section: 'Class 9-A', subject: 'Algebra Fundamentals', attendance: '30 / 30', status: 'Ongoing', label: 'green' },
      { time: '02:30 PM', section: 'Class 11-A', subject: 'Probability theory', attendance: '--', status: 'Pending', label: 'blue' }
    ];

    const classesBody = document.getElementById('teacherClassesBody');
    if (classesBody) {
      classesBody.innerHTML = classes.map(cls => `
        <tr>
          <td><strong style="font-family:var(--font-mono);font-size:var(--text-xs);">${cls.time}</strong></td>
          <td><strong>${cls.section}</strong></td>
          <td>${cls.subject}</td>
          <td>${cls.attendance}</td>
          <td><span class="badge badge-${cls.label}">${cls.status}</span></td>
        </tr>
      `).join('');
    }

    /* -------------------------------------------------------
       NOTICES PUBLISH HANDLER (SYNCED TO LOCAL STORAGE)
    ------------------------------------------------------- */
    const noticeForm = document.getElementById('quickNoticeForm');
    if (noticeForm) {
      noticeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('noticeTitle').value.trim();
        const body = document.getElementById('noticeBody').value.trim();

        if (!title || !body) return;

        // Retrieve existing notices
        const existing = JSON.parse(localStorage.getItem('sb-notices') || '[]');
        const newNotice = {
          id: Date.now(),
          title,
          body,
          date: 'Just Now',
          author: session.name
        };
        existing.unshift(newNotice);
        localStorage.setItem('sb-notices', JSON.stringify(existing));

        // Toast feedback
        if (window.SBToast) {
          window.SBToast.success('Notice Published', `"${title}" notice has been sent to your classes.`);
        }

        // Reset
        noticeForm.reset();
      });
    }

    /* -------------------------------------------------------
       BAR CHART FOR GRADE DISTRIBUTIONS
    ------------------------------------------------------- */
    const chartCanvas = document.getElementById('teacherClassChart');
    if (chartCanvas && window.SBCharts) {
      const chartData = {
        labels: ['Quiz 1', 'Quiz 2', 'Midterm', 'Assignment 1', 'Assignment 2'],
        datasets: [
          {
            name: 'Class 10-A',
            values: [78, 85, 74, 82, 88],
            color: '#2563EB'
          },
          {
            name: 'Class 10-B',
            values: [74, 80, 71, 79, 83],
            color: '#059669'
          }
        ]
      };

      setTimeout(() => {
        window.SBCharts.drawBarChart(chartCanvas, chartData, { grouped: true });
      }, 100);
    }
  });
})();
