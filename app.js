/**
 * app.js — منطق تطبيق قائمة طعم زمان (جلب البيانات من Google Sheets)
 */

// ضع رابط الـ CSV الخاص بك هنا
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_O0h_6_p_your_id_here/pub?output=csv';

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

// ---- Fetch and Parse CSV ----
async function loadMenuData() {
    try {
        const response = await fetch(SHEET_CSV_URL);
        const data = await response.text();
        
        // تحويل الـ CSV إلى مصفوفة
        const rows = data.split('\n').slice(1); // تجاهل صف العنوان
        const menu = { sandwiches: [], shamlola: [], pizza: [], koshary: [], contacts: [] };

        rows.forEach(row => {
            const [category, no, name, price, branch, phone] = row.split(',').map(item => item.trim());
            
            if (category === 'contacts') {
                menu.contacts.push({ branch, phone });
            } else if (menu[category]) {
                menu[category].push({ no, name, price });
            }
        });

        renderAll(menu);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        document.querySelectorAll('.menu-grid').forEach(grid => {
            grid.innerHTML = `<div class="empty-msg">حدث خطأ أثناء تحميل القائمة</div>`;
        });
    }
}

// ---- Render Functions ----
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

function renderContacts(items) {
  const grid = document.getElementById('contacts-grid');
  if (!grid) return;
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

function renderAll(menu) {
  renderMenuGrid('sandwiches-grid', menu.sandwiches);
  renderMenuGrid('shamlola-grid',   menu.shamlola);
  renderMenuGrid('pizza-grid',      menu.pizza);
  renderMenuGrid('koshary-grid',    menu.koshary);
  renderContacts(menu.contacts);
}

document.addEventListener('DOMContentLoaded', loadMenuData);
