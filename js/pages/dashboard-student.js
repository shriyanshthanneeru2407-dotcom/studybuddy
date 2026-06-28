/**
 * StudyBuddy — Student Dashboard Controller
 */
(function StudentDashboard() {
  document.addEventListener('DOMContentLoaded', () => {
    // Check credentials & inject profile info
    const session = SBAuth.requireRole(['student']);
    if (!session) return;
    SBAuth.injectUserUI(session);

    // Setup current date display
    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formatted = new Date().toLocaleDateString('en-US', options);
      dateDisplay.textContent = `${formatted} • Class ${session.class || '10-A'}`;
    }

    /* -------------------------------------------------------
       MOCK DATABASE (RESTORED / SYNCED WITH LOCALSTORAGE)
    ------------------------------------------------------- */
    // Default timetables
    const defaultTimetable = [
      { id: 1, time: '09:00 AM', subject: 'Mathematics', teacher: 'Dr. Priya Sharma', room: 'Room 302', type: 'math' },
      { id: 2, time: '10:30 AM', subject: 'Physics Lab', teacher: 'Prof. Anil Gupta', room: 'Lab B', type: 'science' },
      { id: 3, time: '01:00 PM', subject: 'English Literature', teacher: 'Mrs. Sarah John', room: 'Room 104', type: 'english' },
      { id: 4, time: '02:30 PM', subject: 'History of India', teacher: 'Mr. Vikram Singh', room: 'Room 201', type: 'history' }
    ];

    // Default notices
    const defaultNotices = [
      { id: 1, title: 'Limits Math Homework', body: 'Please complete exercises 4.1 to 4.4 before Wednesday class.', date: 'Today' },
      { id: 2, title: 'Science Exhibition Entry', body: 'Submit project abstracts to Prof. Anil Gupta by Friday afternoon.', date: 'Yesterday' }
    ];

    // Default goals
    const defaultGoals = [
      { id: 1, text: 'Revise Calculus Limits', percent: 80, color: 'blue' },
      { id: 2, text: 'Read Macbeth Act 3', percent: 100, color: 'green' },
      { id: 3, text: 'Physics Lab Report Draft', percent: 45, color: 'amber' }
    ];

    // Syncing function helper
    function getStoredData(key, fallback) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    }

    /* -------------------------------------------------------
       RENDER UI WIDGETS
    ------------------------------------------------------- */
    // Timetable
    const todayList = document.getElementById('todayScheduleList');
    if (todayList) {
      const items = getStoredData('sb-timetable', defaultTimetable);
      todayList.innerHTML = items.map(item => `
        <div class="timetable-widget-item ${item.type}">
          <div class="timetable-time-block">${item.time}</div>
          <div class="timetable-info-block">
            <div class="timetable-subject">${item.subject}</div>
            <div class="timetable-room">${item.teacher} • ${item.room}</div>
          </div>
        </div>
      `).join('');
    }

    // Notices
    const noticesList = document.getElementById('miniNoticesList');
    if (noticesList) {
      const items = getStoredData('sb-notices', defaultNotices);
      noticesList.innerHTML = items.map(item => `
        <div class="mini-notice-item">
          <div class="mini-notice-header">
            <span class="mini-notice-title">${item.title}</span>
            <span class="mini-notice-date">${item.date}</span>
          </div>
          <p class="mini-notice-body">${item.body}</p>
        </div>
      `).join('');
    }

    // Goals
    const goalsList = document.getElementById('dashboardGoalsList');
    if (goalsList) {
      const items = getStoredData('sb-goals', defaultGoals);
      goalsList.innerHTML = items.map(item => `
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm fw-medium text-primary">${item.text}</span>
            <span class="text-xs fw-semibold text-muted">${item.percent}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${item.color}" style="width: ${item.percent}%"></div>
          </div>
        </div>
      `).join('');
    }

    /* -------------------------------------------------------
       RENDER CHART
    ------------------------------------------------------- */
    const perfCanvas = document.getElementById('performanceChart');
    if (perfCanvas && window.SBCharts) {
      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            name: 'Your Score',
            values: [78, 80, 84, 82, 85, 87],
            color: '#2563EB',
            fill: true
          },
          {
            name: 'Class Average',
            values: [72, 74, 75, 76, 75, 77],
            color: '#059669',
            fill: false
          }
        ]
      };
      // Short delay to allow container size computing in flex layouts
      setTimeout(() => {
        window.SBCharts.drawLineChart(perfCanvas, chartData);
      }, 100);
    }

  });
})();
