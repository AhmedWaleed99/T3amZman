/**
 * data.js — بيانات قائمة طعم زمان
 * المصدر: Google Sheets
 * يمكن تعديل هذا الملف مباشرة أو ربطه بـ Google Sheets API لاحقاً
 */

const MENU_DATA = {

  sandwiches: [
    { no: 1, name: "سندوتش فول",     price: 8  },
    { no: 2, name: "سندوتش طعمية",   price: 8  },
    { no: 3, name: "سندوتش مكس",     price: 9  },
    { no: 4, name: "سندوتش غنوج",    price: 13 },
    { no: 5, name: "سندوتش جبنة",    price: 13 },
    { no: 6, name: "سندوتش مسقعة",   price: 13 },
    { no: 7, name: "سندوتش شيبسي",   price: 13 },
  ],

  shamlola: [
    { no: 1, name: "شملولة عادية",       price: 20 },
    { no: 2, name: "شملولة بجبنة",       price: 25 },
    { no: 3, name: "شملولة بالدجاج",     price: 30 },
    { no: 4, name: "شملولة خاصة",        price: 35 },
  ],

  pizza: [
    { no: 1, name: "بيتزا مارجريتا",      price: 45 },
    { no: 2, name: "بيتزا دجاج",          price: 55 },
    { no: 3, name: "بيتزا خضار",          price: 50 },
    { no: 4, name: "بيتزا مكسطة",         price: 60 },
    { no: 5, name: "بيتزا بيبيروني",      price: 65 },
  ],

  koshary: [
    { no: 1, name: "كشري صغير",    price: 12 },
    { no: 2, name: "كشري وسط",     price: 18 },
    { no: 3, name: "كشري كبير",    price: 25 },
    { no: 4, name: "كشري كبير جداً", price: 35 },
  ],

  contacts: [
    { branch: "الفرع الرئيسي",  phone: "01000000001" },
    { branch: "فرع المنصورة",   phone: "01000000002" },
    { branch: "فرع طنطا",       phone: "01000000003" },
  ],

};

/**
 * NOTE للمطور:
 * البيانات الموجودة هنا مبنية على ما تم استخراجه من الشيت.
 * لتحديث البيانات مباشرة من Google Sheets استخدم الرابط:
 * https://docs.google.com/spreadsheets/d/1SEeFYP_Q8BXyCQIVRgvZBG1qBU0DPQ8CjieN6rIOZwI
 *
 * يمكن استبدال هذا الملف بـ fetch() من Google Sheets API أو CSV export.
 */
