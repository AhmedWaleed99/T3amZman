/**
 * app.js — النسخة المعتمدة لرابط الشيت الخاص بك
 */

// الرابط الخاص بك الذي أرسلته
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8mldsiqQGqSvSkgJ6s7PhyEVOsD4Hx4F8NQ1WRCCleqgwdcptX69qHhvKdD550o91WVQaCCyrDSc-/pub?output=csv';

// ---- منطق التنقل بين الأقسام (Tabs) ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        
        // إزالة النشاط عن الجميع
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // تفعيل القسم المختار
        btn.classList.add('active');
        const panel = document.getElementById('tab-' + target);
        if (panel) panel.classList.add('active');
    });
});

// ---- جلب البيانات من Google Sheets ----
async function loadMenuFromSheet() {
    try {
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) throw new Error();
        
        const csvText = await response.text();
        
        // تقسيم النص إلى أسطر وتنظيفها من الفراغات
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");
        
        // تحويل الأسطر إلى مصفوفة بيانات (نتجاهل السطر الأول لأنه سطر العناوين)
        const allItems = lines.slice(1).map(line => {
            // تقسيم السطر بفاصلة
            const cols = line.split(',').map(c => c.replace(/^"|"$/g, '').trim());
            return {
                no: cols[0] || '0',    // العمود A: الرقم
                name: cols[1] || '',   // العمود B: الصنف
                price: cols[2] || ''   // العمود C: السعر
            };
        });

        // عرض كل الأصناف في قسم "سندوتشات" كقسم رئيسي
        renderMenuGrid('sandwiches-grid', allItems);
        
        // جعل باقي الأقسام تعرض رسالة بسيطة أو تبقى جاهزة
        ['shamlola-grid', 'pizza-grid', 'koshary-grid'].forEach(id => {
            renderMenuGrid(id, []);
        });

    } catch (error) {
        console.error("خطأ في الاتصال:", error);
        const grid = document.getElementById('sandwiches-grid');
        if (grid) {
            grid.innerHTML = `<div class="empty-msg">يوجد مشكلة في تحميل البيانات، تأكد من الاتصال بالإنترنت.</div>`;
        }
    }
}

// ---- وظيفة بناء كروت الطعام على الشاشة ----
function renderMenuGrid(gridId, items) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<div class="empty-msg">قريباً.. أصناف جديدة ومميزة</div>`;
        return;
    }

    // بناء الكود البرمجي لكل صنف (نفس التصميم العصري)
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

// بدء التحميل بمجرد فتح الصفحة
document.addEventListener('DOMContentLoaded', loadMenuFromSheet);
