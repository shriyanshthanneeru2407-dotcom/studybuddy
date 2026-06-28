/**
 * StudyBuddy — Charts Component
 * Lightweight chart renderer using Canvas API
 * No external library required
 */
(function ChartsComponent() {

  /* -------------------------------------------------------
     UTILITIES
  ------------------------------------------------------- */
  function getCSSVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function getChartColors() {
    return {
      primary:   '#2563EB',
      emerald:   '#059669',
      amber:     '#D97706',
      red:       '#DC2626',
      navy:      '#1E3A5F',
      purple:    '#7C3AED',
      teal:      '#0D9488',
      border:    getCSSVar('--border-color') || '#DEE2E6',
      text:      getCSSVar('--text-muted') || '#868E96',
      bg:        getCSSVar('--bg-surface') || '#FFFFFF',
    };
  }

  /* -------------------------------------------------------
     LINE CHART
  ------------------------------------------------------- */
  function drawLineChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const colors = getChartColors();
    const {
      labels = [],
      datasets = [],
      yMin = 0,
      yMax = null,
      gridLines = true,
      smooth = true,
    } = { ...data, ...options };

    const DPR = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight || 220;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    ctx.scale(DPR, DPR);

    const padL = 48, padR = 20, padT = 16, padB = 36;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    // Calculate range
    const allVals = datasets.flatMap(d => d.values || []);
    const maxVal = yMax ?? (Math.max(...allVals) * 1.1 || 100);
    const minVal = yMin;

    const toX = (i) => padL + (i / (labels.length - 1)) * chartW;
    const toY = (v) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    if (gridLines) {
      const steps = 5;
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1;
      for (let i = 0; i <= steps; i++) {
        const y = padT + (i / steps) * chartH;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + chartW, y);
        ctx.stroke();

        // Y labels
        const val = Math.round(maxVal - (i / steps) * (maxVal - minVal));
        ctx.fillStyle = colors.text;
        ctx.font = `11px ${getCSSVar('--font-sans') || 'Inter, sans-serif'}`;
        ctx.textAlign = 'right';
        ctx.fillText(val, padL - 6, y + 4);
      }
    }

    // X labels
    ctx.fillStyle = colors.text;
    ctx.font = `11px ${getCSSVar('--font-sans') || 'Inter, sans-serif'}`;
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
      if (i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1) {
        ctx.fillText(label, toX(i), H - padB + 16);
      }
    });

    // Draw datasets
    const PALETTE = [colors.primary, colors.emerald, colors.amber, colors.red, colors.purple];
    datasets.forEach((dataset, di) => {
      const vals = dataset.values || [];
      if (vals.length < 2) return;
      const color = dataset.color || PALETTE[di % PALETTE.length];

      // Fill area
      if (dataset.fill !== false) {
        const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        grad.addColorStop(0, color + '22');
        grad.addColorStop(1, color + '00');
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(vals[0]));
        if (smooth) {
          for (let i = 1; i < vals.length; i++) {
            const cpX = (toX(i - 1) + toX(i)) / 2;
            ctx.bezierCurveTo(cpX, toY(vals[i-1]), cpX, toY(vals[i]), toX(i), toY(vals[i]));
          }
        } else {
          vals.forEach((v, i) => ctx.lineTo(toX(i), toY(v)));
        }
        ctx.lineTo(toX(vals.length - 1), padT + chartH);
        ctx.lineTo(toX(0), padT + chartH);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(toX(0), toY(vals[0]));
      if (smooth) {
        for (let i = 1; i < vals.length; i++) {
          const cpX = (toX(i - 1) + toX(i)) / 2;
          ctx.bezierCurveTo(cpX, toY(vals[i-1]), cpX, toY(vals[i]), toX(i), toY(vals[i]));
        }
      } else {
        vals.forEach((v, i) => ctx.lineTo(toX(i), toY(v)));
      }
      ctx.stroke();

      // Dots
      vals.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(toX(i), toY(v), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = colors.bg;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }

  /* -------------------------------------------------------
     BAR CHART
  ------------------------------------------------------- */
  function drawBarChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const colors = getChartColors();
    const { labels = [], datasets = [], grouped = false } = { ...data, ...options };

    const DPR = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight || 220;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    ctx.scale(DPR, DPR);

    const padL = 48, padR = 20, padT = 16, padB = 40;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const allVals = datasets.flatMap(d => d.values || []);
    const maxVal = Math.max(...allVals) * 1.1 || 100;

    const toY = (v) => padT + chartH - (v / maxVal) * chartH;
    const barH = (v) => (v / maxVal) * chartH;

    ctx.clearRect(0, 0, W, H);

    // Grid
    const steps = 5;
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    for (let i = 0; i <= steps; i++) {
      const y = padT + (i / steps) * chartH;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
      const val = Math.round(maxVal - (i / steps) * maxVal);
      ctx.fillStyle = colors.text;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val, padL - 6, y + 4);
    }

    const PALETTE = [colors.primary, colors.emerald, colors.amber, colors.red, colors.purple];
    const groupW = chartW / labels.length;
    const totalDatasets = datasets.length;

    labels.forEach((label, li) => {
      const groupX = padL + li * groupW;

      if (grouped && totalDatasets > 1) {
        const bW = (groupW - 16) / totalDatasets;
        datasets.forEach((ds, di) => {
          const val = ds.values[li] ?? 0;
          const color = ds.color || PALETTE[di % PALETTE.length];
          const x = groupX + 8 + di * bW;
          const radius = 4;
          const bH = barH(val);
          const y = toY(val);
          roundedRect(ctx, x, y, bW - 2, bH, radius, color);
        });
      } else {
        const bW = groupW - 16;
        const val = (datasets[0]?.values || [])[li] ?? 0;
        const color = datasets[0]?.colors?.[li] || datasets[0]?.color || PALETTE[0];
        const bH = barH(val);
        roundedRect(ctx, groupX + 8, toY(val), bW, bH, 4, color);
      }

      // X label
      ctx.fillStyle = colors.text;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, groupX + groupW / 2, H - padB + 16);
    });
  }

  function roundedRect(ctx, x, y, w, h, r, color) {
    if (h <= 0) return;
    r = Math.min(r, w / 2, h);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  /* -------------------------------------------------------
     DONUT CHART
  ------------------------------------------------------- */
  function drawDonutChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const colors = getChartColors();
    const { values = [], labels = [], centerText = '' } = { ...data, ...options };

    const DPR = window.devicePixelRatio || 1;
    const size = Math.min(canvas.offsetWidth, 220);
    canvas.width  = size * DPR;
    canvas.height = size * DPR;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(DPR, DPR);

    const cx = size / 2, cy = size / 2;
    const radius = size / 2 - 16;
    const inner  = radius * 0.62;
    const total  = values.reduce((a, b) => a + b, 0);
    const PALETTE = [colors.primary, colors.emerald, colors.amber, colors.red, colors.purple, colors.teal];

    ctx.clearRect(0, 0, size, size);

    let startAngle = -Math.PI / 2;
    values.forEach((v, i) => {
      const slice = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = PALETTE[i % PALETTE.length];
      ctx.fill();
      startAngle += slice;
    });

    // Inner cutout
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = getCSSVar('--bg-surface') || '#FFFFFF';
    ctx.fill();

    // Center text
    if (centerText) {
      ctx.fillStyle = getCSSVar('--text-primary') || '#212529';
      ctx.font = `bold ${Math.round(size * 0.14)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerText, cx, cy);
    }
  }

  /* -------------------------------------------------------
     INIT — Auto-render charts with data-chart attribute
  ------------------------------------------------------- */
  function initCharts() {
    document.querySelectorAll('[data-chart]').forEach(canvas => {
      try {
        const type = canvas.getAttribute('data-chart');
        const raw  = canvas.getAttribute('data-chart-data');
        if (!raw) return;
        const data = JSON.parse(raw);
        if (type === 'line')  drawLineChart(canvas, data);
        if (type === 'bar')   drawBarChart(canvas, data);
        if (type === 'donut') drawDonutChart(canvas, data);
      } catch (e) { console.warn('Chart parse error:', e); }
    });
  }

  document.addEventListener('DOMContentLoaded', initCharts);

  // Re-render on theme change
  document.addEventListener('themechange', () => {
    setTimeout(initCharts, 100);
  });

  window.SBCharts = { drawLineChart, drawBarChart, drawDonutChart, initCharts };
})();
