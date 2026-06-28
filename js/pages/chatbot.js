/**
 * StudyBuddy — Chatbot Page Controller
 */
(function ChatbotPage() {
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
          <a href="studybuddy-ai.html" class="nav-item active" data-tooltip="StudyBuddy AI">
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
       SIMULATED CHATBOT LOGIC
    ------------------------------------------------------- */
    const chatBody = document.getElementById('chatBody');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');

    function appendMessage(text, isAi = false) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${isAi ? 'ai' : 'user'}`;
      
      const initials = isAi ? 'AI' : (session.initials || 'ME');
      
      bubble.innerHTML = `
        <div class="avatar avatar-sm">${initials}</div>
        <div class="chat-bubble-content">${text}</div>
      `;
      chatBody.appendChild(bubble);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function generateResponse(query) {
      const q = query.toLowerCase();
      
      // Medical Safety Disclaimer check
      if (q.includes('depressed') || q.includes('sad') || q.includes('therapist') || q.includes('doctor') || q.includes('sick') || q.includes('hurt') || q.includes('die')) {
        return `I understand you might be going through a tough time, but I am an AI educational assistant. I cannot provide medical diagnosis, therapy, or healthcare advice. Please reach out to our school counselor, parents, or a healthcare professional who can assist you. You are not alone.`;
      }

      if (q.includes('study plan') || q.includes('limits') || q.includes('math')) {
        return `Here is a custom 3-day Study Plan for your Calculus Limits:<br>
                <strong>Day 1: Theory</strong> — Review limit definition, graphs, and indeterminate forms.<br>
                <strong>Day 2: Practice</strong> — Solve algebraic factorization and rationalization limit problems.<br>
                <strong>Day 3: Self-Quiz</strong> — Do a 15-minute timed quiz to test speed. Let me know if you want me to quiz you!`;
      }

      if (q.includes('pomodoro') || q.includes('time management')) {
        return `The Pomodoro Technique is highly effective for focused learning:<br>
                1. Study with complete focus for <strong>25 minutes</strong>.<br>
                2. Take a <strong>5-minute break</strong> (stretch, drink water).<br>
                3. Repeat this loop 4 times.<br>
                4. After 4 cycles, take a longer <strong>20-30 minute break</strong>. This keeps your brain fresh.`;
      }

      if (q.includes('motivation') || q.includes('lazy')) {
        return `Remember: "Success is the sum of small efforts, repeated day in and day out." Focus on just studying for 10 minutes right now. The momentum will carry you forward! You've got this.`;
      }

      if (q.includes('physics') || q.includes('lab')) {
        return `For physics lab preparation, make sure you understand the theoretical formula behind the experiment first (e.g. Ohm's law, pendulum gravity). Then review the safety precautions, step-by-step apparatus procedure, and how to plot coordinates correctly.`;
      }

      return `That's an interesting question! As your StudyBuddy AI tutor, I suggest we break this topic down into smaller concepts. Let's start with the basics, or feel free to ask me to write a study timeline, test your knowledge, or explain a core theory step-by-step!`;
    }

    chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      appendMessage(text, false);
      chatInput.value = '';

      // AI response delay simulation
      setTimeout(() => {
        const reply = generateResponse(text);
        appendMessage(reply, true);
      }, 700);
    });

    // Suggestions chips wire
    document.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        chatInput.value = query;
        chatForm.dispatchEvent(new Event('submit'));
      });
    });

  });
})();
