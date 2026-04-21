/**
 * app.js — نسخة مخصصة لهيكل (No, Item, Price)
 */

// 1. استبدل الرابط أدناه برابط CSV الخاص بك من Google Sheets
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_O0h_6_p_your_id_here/pub?output=csv';

// ---- منطق التنقل بين التبويبات ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('tab-' + target);
        if (panel) panel.classList.add('active');
    });
});

// ---- جلب البيانات من Google Sheets ----
async function loadMenuFromSheet() {
    try {
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) throw new Error('فشل الاتصال');
        
        const csvText = await response.text();
        // تقسيم النص إلى أسطر وتجاهل الهيدر (العناوين)
        const rows = csvText.split('\n').filter(row => row.trim() !== '').slice(1);

        // تحويل كل سطر إلى كائن برمجي بناءً على ترتيب أعمدتك A, B, C
        const allItems = rows.map(row => {
            const cols = row.split(',').map(c => c.trim());
            return {
                no: cols[0] || '',    // العمود A: No
                name: cols[1] || '',  // العمود B: Item
                price: cols[2] || ''  // العمود C: Price
            };
        });

        // عرض البيانات في أول قسم (سندوتشات) كافتراضي
        renderMenuGrid('sandwiches-grid', allItems);
        
        // تنظيف الأقسام الأخرى إذا كانت فارغة في الشيت
        renderMenuGrid('shamlola-grid', []);
        renderMenuGrid('pizza-grid', []);
        renderMenuGrid('koshary-grid', []);

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('sandwiches-grid').innerHTML = 
            `<div class="empty-msg">تأكد من نشر الشيت بصيغة CSV ومن الرابط الصحيح</div>`;
    }
}

// ---- وظيفة الرسم على الشاشة ----
function renderMenuGrid(gridId, items) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (!items || items.length === 0) {
        grid.innerHTML = `<div class="empty-msg">الأصناف قيد التحديث...</div>`;
        return;
    }

    // بناء الكروت بنفس التصميم العصري (Dark Mode) المطلوب
    grid.innerHTML = items.map(item => `
        <div class="menu-card">
            <span class="card-number">${String(item.no).padStart(2, '0')}</span>
            <span class="card-name">${item.name}</span>
            <div class="card-price">
                <span class="price-amount">${item.price}</span>
                <span class="price-currency">ج.م</span>
            </div>
        </div>
    `).join('');
}

// تشغيل الوظيفة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadMenuFromSheet);
