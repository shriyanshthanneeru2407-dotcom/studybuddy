/**
 * StudyBuddy — Admin Dashboard Controller
 */
(function AdminDashboard() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth check & User UI inject
    const session = SBAuth.requireRole(['admin']);
    if (!session) return;
    SBAuth.injectUserUI(session);

    // Setup date formatting
    const dateDisplay = document.getElementById('adminDateDisplay');
    if (dateDisplay) {
      dateDisplay.textContent = `Principal Portal • ${session.school || 'StudyBuddy School'}`;
    }

    // Pending store orders list
    const defaultOrders = [
      { id: 'ORD-402', name: 'Arjun Mehta', class: '10-A', item: 'Mathematics Textbook Class 10' },
      { id: 'ORD-403', name: 'Sneha Reddy', class: '9-B', item: 'Graph Notebook & Geometry box' },
      { id: 'ORD-404', name: 'Rahul Sharma', class: '11-C', item: 'Chemistry Lab Manual' }
    ];

    function getStoredData(key, fallback) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    }

    const ordersBody = document.getElementById('adminStoreOrdersBody');
    if (ordersBody) {
      const items = getStoredData('sb-orders-pending', defaultOrders);
      ordersBody.innerHTML = items.map(ord => `
        <tr>
          <td><strong style="font-family:var(--font-mono);">${ord.id}</strong></td>
          <td><strong>${ord.name}</strong></td>
          <td>${ord.class}</td>
          <td class="text-secondary">${ord.item}</td>
          <td>
            <button class="btn btn-primary btn-sm approve-order-btn" data-id="${ord.id}">Approve</button>
          </td>
        </tr>
      `).join('');

      // Attach events to approve buttons
      document.querySelectorAll('.approve-order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const orderId = btn.getAttribute('data-id');
          if (window.SBToast) {
            window.SBToast.success('Order Dispatched', `Order ${orderId} has been approved for dispatch.`);
          }
          // Remove row from UI
          btn.closest('tr').remove();
          // Remove from local array
          let updated = getStoredData('sb-orders-pending', defaultOrders).filter(o => o.id !== orderId);
          localStorage.setItem('sb-orders-pending', JSON.stringify(updated));
        });
      });
    }

    // Audit logs
    const auditLogs = [
      { action: 'Database Backed up', user: 'Rajesh Kumar', time: '10 mins ago' },
      { action: 'Teacher प्रिया शर्मा published notice', user: 'System', time: '1 hour ago' },
      { action: 'Grade submission: Math test Class 10-A', user: 'Priya Sharma', time: '2 hours ago' },
      { action: 'Student session login: Arjun Mehta', user: 'System', time: '3 hours ago' }
    ];

    const logsList = document.getElementById('adminAuditLogsList');
    if (logsList) {
      logsList.innerHTML = auditLogs.map(log => `
        <div class="widget-item" style="padding: 8px 12px;">
          <div class="widget-item-info">
            <div class="text-xs">
              <strong class="text-primary">${log.action}</strong>
              <div class="text-muted" style="font-size:10px;margin-top:2px;">By ${log.user} • ${log.time}</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    /* -------------------------------------------------------
       CORE BUTTON INTERACTIONS
    ------------------------------------------------------- */
    const backupBtn = document.getElementById('backupDatabaseBtn');
    if (backupBtn) {
      backupBtn.addEventListener('click', () => {
        backupBtn.classList.add('loading');
        setTimeout(() => {
          backupBtn.classList.remove('loading');
          if (window.SBToast) {
            window.SBToast.success('Backup Created', 'System database successfully backed up to secure cloud storage.');
          }
        }, 1200);
      });
    }

    const auditBtn = document.getElementById('systemAuditBtn');
    if (auditBtn) {
      auditBtn.addEventListener('click', () => {
        if (window.SBToast) {
          window.SBToast.info('Audit Logs Opened', 'Full audit logs have been compiled for review.');
        }
      });
    }

    /* -------------------------------------------------------
       PLATFORM ENGAGEMENT LINE CHART
    ------------------------------------------------------- */
    const activityCanvas = document.getElementById('adminActivityChart');
    if (activityCanvas && window.SBCharts) {
      const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            name: 'Students Active',
            values: [850, 920, 990, 960, 910, 310, 150],
            color: '#2563EB',
            fill: true
          },
          {
            name: 'Teachers Active',
            values: [74, 82, 84, 80, 78, 12, 5],
            color: '#059669',
            fill: false
          }
        ]
      };

      setTimeout(() => {
        window.SBCharts.drawLineChart(activityCanvas, chartData);
      }, 100);
    }
  });
})();
