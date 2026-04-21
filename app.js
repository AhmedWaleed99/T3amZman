/**
 * app.js — منطق تطبيق قائمة طعم زمان
 */

// ---- Tab Switching ----
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById('tab-' + target).classList.add('active');
  });
});

// ---- Render Menu Cards ----
function renderMenuGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = `<div class="empty-msg">لا توجد أصناف متاحة حالياً</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="menu-card">
      <span class="card-number">${String(item.no).padStart(2,'0')}</span>
      <span class="card-name">${item.name}</span>
      <div class="card-price">
        <span class="price-amount">${item.price}</span>
        <span class="price-currency">ج.م</span>
      </div>
    </div>
  `).join('');
}

// ---- Render Contacts ----
function renderContacts(items) {
  const grid = document.getElementById('contacts-grid');
  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = `<div class="empty-msg">لا توجد بيانات اتصال متاحة</div>`;
    return;
  }

  grid.innerHTML = items.map((c, i) => `
    <div class="contact-card" style="animation-delay:${i * 0.08}s">
      <div class="contact-icon">📍</div>
      <div class="contact-branch">${c.branch}</div>
      <div class="contact-phone">
        <span>📞</span>
        <a href="tel:${c.phone}">${c.phone}</a>
      </div>
    </div>
  `).join('');
}

// ---- Initialize ----
function init() {
  renderMenuGrid('sandwiches-grid', MENU_DATA.sandwiches);
  renderMenuGrid('shamlola-grid',   MENU_DATA.shamlola);
  renderMenuGrid('pizza-grid',      MENU_DATA.pizza);
  renderMenuGrid('koshary-grid',    MENU_DATA.koshary);
  renderContacts(MENU_DATA.contacts);
}

document.addEventListener('DOMContentLoaded', init);
