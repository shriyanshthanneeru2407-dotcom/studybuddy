/**
 * StudyBuddy — Auth Manager
 * Simulates role-based authentication using localStorage
 * Roles: student | teacher | admin
 */
(function AuthManager() {
  const STORAGE_KEY = 'sb-session';

  const DEMO_ACCOUNTS = {
    student: {
      id: 'stu-001',
      name: 'Arjun Mehta',
      email: 'arjun.mehta@studybuddy.edu',
      role: 'student',
      avatar: null,
      initials: 'AM',
      class: '10-A',
      rollNo: 'SB2024-042',
      school: 'Delhi Public School',
    },
    teacher: {
      id: 'tch-001',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@studybuddy.edu',
      role: 'teacher',
      avatar: null,
      initials: 'PS',
      department: 'Mathematics',
      school: 'Delhi Public School',
    },
    admin: {
      id: 'adm-001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@studybuddy.edu',
      role: 'admin',
      avatar: null,
      initials: 'RK',
      title: 'Principal',
      school: 'Delhi Public School',
    },
  };

  const ROLE_DASHBOARDS = {
    student: '../dashboards/student.html',
    teacher: '../dashboards/teacher.html',
    admin:   '../dashboards/admin.html',
  };

  const ROLE_DASHBOARDS_ROOT = {
    student: 'dashboards/student.html',
    teacher: 'dashboards/teacher.html',
    admin:   'dashboards/admin.html',
  };

  /** Get current session */
  function getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  /** Set session */
  function setSession(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  /** Clear session */
  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /** Login with email/password (simulated) */
  function login(email, password, role) {
    // Simulation: any non-empty credentials succeed for demo
    if (!email || !password || !role) {
      return { success: false, error: 'Please fill in all fields.' };
    }
    const user = { ...DEMO_ACCOUNTS[role], email };
    setSession(user);
    return { success: true, user };
  }

  /** Social login simulation */
  function socialLogin(provider, role) {
    const roleKey = role || 'student';
    const user = {
      ...DEMO_ACCOUNTS[roleKey],
      loginProvider: provider,
    };
    setSession(user);
    return { success: true, user };
  }

  /** Register simulation */
  function register(data) {
    if (!data.name || !data.email || !data.password || !data.role) {
      return { success: false, error: 'Please fill all required fields.' };
    }
    const user = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      initials: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      school: data.school || 'StudyBuddy School',
      avatar: null,
    };
    setSession(user);
    return { success: true, user };
  }

  /** Logout and redirect */
  function logout() {
    clearSession();
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
    window.location.href = prefix + 'login.html';
  }

  /** Redirect to correct dashboard */
  function redirectToDashboard(fromRoot = false) {
    const session = getSession();
    if (!session) {
      window.location.href = fromRoot ? 'login.html' : '../login.html';
      return;
    }
    const map = fromRoot ? ROLE_DASHBOARDS_ROOT : ROLE_DASHBOARDS;
    window.location.href = map[session.role] || (fromRoot ? 'dashboards/student.html' : '../dashboards/student.html');
  }

  /** Guard: redirect to login if not authenticated */
  function requireAuth() {
    const session = getSession();
    if (!session) {
      const depth = window.location.pathname.split('/').filter(Boolean).length;
      const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
      window.location.href = prefix + 'login.html';
      return null;
    }
    return session;
  }

  /** Guard: redirect if wrong role */
  function requireRole(allowedRoles) {
    const session = requireAuth();
    if (!session) return null;
    if (!allowedRoles.includes(session.role)) {
      redirectToDashboard();
      return null;
    }
    return session;
  }

  /** Inject user info into UI elements */
  function injectUserUI(user) {
    // Name
    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = user.name;
    });
    // Role
    document.querySelectorAll('[data-user-role]').forEach(el => {
      el.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    });
    // Initials avatar
    document.querySelectorAll('[data-user-initials]').forEach(el => {
      el.textContent = user.initials || user.name.slice(0, 2).toUpperCase();
    });
    // Email
    document.querySelectorAll('[data-user-email]').forEach(el => {
      el.textContent = user.email;
    });
    // School
    document.querySelectorAll('[data-user-school]').forEach(el => {
      el.textContent = user.school || 'StudyBuddy School';
    });
    // Class/Roll
    if (user.class) {
      document.querySelectorAll('[data-user-class]').forEach(el => {
        el.textContent = 'Class ' + user.class;
      });
    }
    if (user.rollNo) {
      document.querySelectorAll('[data-user-rollno]').forEach(el => {
        el.textContent = user.rollNo;
      });
    }
  }

  // Expose globally
  window.SBAuth = {
    getSession,
    login,
    socialLogin,
    register,
    logout,
    requireAuth,
    requireRole,
    injectUserUI,
    redirectToDashboard,
    DEMO_ACCOUNTS,
  };
})();
