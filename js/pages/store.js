/**
 * StudyBuddy — School Store Controller
 */
(function SchoolStorePage() {
  document.addEventListener('DOMContentLoaded', () => {
    // Auth check & Sidebar injection
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
          <a href="studybuddy-ai.html" class="nav-item" data-tooltip="StudyBuddy AI">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>StudyBuddy AI</span>
          </a>
          <a href="school-store.html" class="nav-item active" data-tooltip="School Store">
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
          <div class="sidebar-section-label">Operations</div>
          <a href="school-store.html" class="nav-item active" data-tooltip="School Store">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>School Store</span>
          </a>
        `;
      }
    }

    // Toggle Admin inventory tabs if admin
    const storeTabs = document.getElementById('storeTabs');
    if (session.role === 'admin' && storeTabs) {
      storeTabs.style.display = 'flex';
    }

    /* -------------------------------------------------------
       CATALOG PRODUCTS DATABASE
    ------------------------------------------------------- */
    const defaultProducts = [
      { id: '1', name: 'Mathematics Textbook Class 10', price: 420, category: 'textbooks', icon: '📚' },
      { id: '2', name: 'Physics Practical Manual', price: 180, category: 'textbooks', icon: '📓' },
      { id: '3', name: 'Spiral A4 Notebook (5 Pack)', price: 250, category: 'stationery', icon: '📝' },
      { id: '4', name: 'Geometry Box Deluxe', price: 120, category: 'stationery', icon: '📐' },
      { id: '5', name: 'DPS School Polo Shirt', price: 350, category: 'sports', icon: '👕' }
    ];

    function getProducts() {
      const raw = localStorage.getItem('sb-store-products');
      if (!raw) {
        localStorage.setItem('sb-store-products', JSON.stringify(defaultProducts));
        return defaultProducts;
      }
      return JSON.parse(raw);
    }

    function saveProducts(prods) {
      localStorage.setItem('sb-store-products', JSON.stringify(prods));
    }

    /* -------------------------------------------------------
       CART OPERATIONS
    ------------------------------------------------------- */
    let cart = [];

    function updateCartUI() {
      const emptyState = document.getElementById('cartEmptyState');
      const cartContent = document.getElementById('cartContentList');
      const itemsList = document.getElementById('cartItemsList');
      const totalCost = document.getElementById('cartTotalCost');

      if (cart.length === 0) {
        emptyState?.classList.remove('hidden');
        cartContent?.classList.add('hidden');
        return;
      }

      emptyState?.classList.add('hidden');
      cartContent?.classList.remove('hidden');

      if (itemsList) {
        itemsList.innerHTML = cart.map(item => `
          <div class="cart-list-item">
            <div>
              <span class="fw-semibold">${item.name}</span>
              <div class="text-muted" style="font-size:10px;">Qty: ${item.qty}</div>
            </div>
            <div class="flex items-center gap-2">
              <strong>₹${item.price * item.qty}</strong>
              <button class="btn btn-ghost btn-sm remove-cart-item" data-id="${item.id}" style="color:var(--color-error);padding:2px;">✕</button>
            </div>
          </div>
        `).join('');

        // Bind remove actions
        document.querySelectorAll('.remove-cart-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart = cart.filter(c => c.id !== id);
            updateCartUI();
          });
        });
      }

      if (totalCost) {
        const sum = cart.reduce((acc, val) => acc + (val.price * val.qty), 0);
        totalCost.textContent = `₹${sum}.00`;
      }
    }

    function addToCart(product) {
      const existing = cart.find(c => c.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCartUI();
      if (window.SBToast) {
        window.SBToast.success('Cart Updated', `"${product.name}" added to request cart.`);
      }
    }

    /* -------------------------------------------------------
       RENDER PRODUCTS CATALOG
    ------------------------------------------------------- */
    function renderCatalog() {
      const prods = getProducts();
      const search = document.getElementById('storeSearch').value.toLowerCase();
      const filter = document.getElementById('storeFilter').value;

      const grid = document.getElementById('storeGrid');
      if (!grid) return;

      const filtered = prods.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search);
        const matchesFilter = filter === 'all' || p.category === filter;
        return matchesSearch && matchesFilter;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No products match criteria.</div>`;
        return;
      }

      grid.innerHTML = filtered.map(p => `
        <div class="card item-card">
          <div class="item-img-placeholder">${p.icon || '📦'}</div>
          <h3 class="text-sm fw-bold">${p.name}</h3>
          <span class="badge badge-gray" style="align-self:flex-start;margin-top:4px;">${p.category}</span>
          <div class="item-price">₹${p.price}.00</div>
          
          <div style="flex:1;display:flex;align-items:flex-end;margin-top:12px;">
            ${session.role === 'student' ? `
              <button class="btn btn-primary w-full btn-sm add-to-cart-btn" data-id="${p.id}">Add to Request</button>
            ` : `<button class="btn btn-surface w-full btn-sm" disabled style="opacity:0.6;">Checkout only for students</button>`}
          </div>
        </div>
      `).join('');

      // Add to cart wires
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const p = prods.find(item => item.id === id);
          if (p) addToCart(p);
        });
      });
    }

    // Bind triggers
    document.getElementById('storeSearch').addEventListener('input', renderCatalog);
    document.getElementById('storeFilter').addEventListener('change', renderCatalog);

    /* -------------------------------------------------------
       SUBMIT PLACE ORDER
    ------------------------------------------------------- */
    const placeBtn = document.getElementById('placeOrderRequestBtn');
    if (placeBtn) {
      placeBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        // Retrieve existing orders from localStorage
        const pendingOrders = JSON.parse(localStorage.getItem('sb-orders-pending') || '[]');
        
        cart.forEach(item => {
          pendingOrders.push({
            id: 'ORD-' + Math.floor(100 + Math.random() * 900),
            name: session.name,
            class: session.class || '10-A',
            item: item.name
          });
        });

        localStorage.setItem('sb-orders-pending', JSON.stringify(pendingOrders));

        // Toast feedback
        if (window.SBToast) {
          window.SBToast.success('Request Submitted', 'Store admin notified. Check notifications.');
        }

        // Reset
        cart = [];
        updateCartUI();
      });
    }

    /* -------------------------------------------------------
       ADMIN MODE TAB NAVIGATION & TABLE RENDER
    ------------------------------------------------------- */
    const tabCatalog = document.getElementById('tabCatalogBtn');
    const tabInventory = document.getElementById('tabAdminInventoryBtn');
    const catalogView = document.getElementById('catalogView');
    const adminInventoryView = document.getElementById('adminInventoryView');

    function switchTabs(showAdmin) {
      if (showAdmin) {
        tabCatalog.classList.remove('active');
        tabInventory.classList.add('active');
        catalogView.classList.add('hidden');
        adminInventoryView.classList.remove('hidden');
        renderInventoryTable();
      } else {
        tabInventory.classList.remove('active');
        tabCatalog.classList.add('active');
        adminInventoryView.classList.add('hidden');
        catalogView.classList.remove('hidden');
        renderCatalog();
      }
    }

    tabCatalog?.addEventListener('click', () => switchTabs(false));
    tabInventory?.addEventListener('click', () => switchTabs(true));

    function renderInventoryTable() {
      const prods = getProducts();
      const body = document.getElementById('inventoryTableBody');
      if (!body) return;

      body.innerHTML = prods.map(p => `
        <tr>
          <td><strong style="margin-right:6px;">${p.icon}</strong><strong>${p.name}</strong></td>
          <td><span class="badge badge-gray">${p.category}</span></td>
          <td><strong>₹${p.price}.00</strong></td>
          <td><span class="badge badge-green">In Stock</span></td>
          <td class="text-right">
            <button class="btn btn-ghost btn-sm delete-product-btn" data-id="${p.id}" style="color:var(--color-error);padding:4px;">✕ Delete</button>
          </td>
        </tr>
      `).join('');

      // Delete action wire
      document.querySelectorAll('.delete-product-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          let updated = getProducts().filter(p => p.id !== id);
          saveProducts(updated);
          renderInventoryTable();
          if (window.SBToast) {
            window.SBToast.warning('Product Deleted', 'Catalog item removed.');
          }
        });
      });
    }

    /* -------------------------------------------------------
       ADMIN ADD PRODUCT MODAL
    ------------------------------------------------------- */
    const prodModal = document.getElementById('productModal');
    const prodForm = document.getElementById('productForm');
    const addProductBtn = document.getElementById('addNewProductBtn');

    function openProductModal() {
      prodForm.reset();
      document.getElementById('prodNameError').textContent = '';
      prodModal?.classList.add('open');
    }
    function closeProductModal() {
      prodModal?.classList.remove('open');
    }

    addProductBtn?.addEventListener('click', openProductModal);
    document.getElementById('closeProductModalBtn')?.addEventListener('click', closeProductModal);
    document.getElementById('cancelProductModalBtn')?.addEventListener('click', closeProductModal);

    prodForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('prodName').value.trim();
      const price = parseInt(document.getElementById('prodPrice').value || 0);
      const category = document.getElementById('prodCategory').value;
      const icon = document.getElementById('prodIcon').value.trim() || '📦';

      if (!name) {
        document.getElementById('prodNameError').textContent = 'Product name required';
        return;
      }

      const prods = getProducts();
      prods.push({
        id: Date.now().toString(),
        name,
        price,
        category,
        icon
      });

      saveProducts(prods);
      closeProductModal();
      renderInventoryTable();

      if (window.SBToast) {
        window.SBToast.success('Catalog Enhanced', `"${name}" added to inventory.`);
      }
    });

    // Initial render
    renderCatalog();
  });
})();
