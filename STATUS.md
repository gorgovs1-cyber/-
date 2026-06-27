# STATUS — My Money (איפה אנחנו עומדים)

> קובץ סיכום לשיחות המשך. בשיחה חדשה: **"קראי את STATUS.md ואת CLAUDE.md, ואז את index.html"** ואז נמשיך.

עודכן לאחרונה: גרסה `APP_VER=20260857` (SW cache `shani-money-v20260857`).

---

## מה זו האפליקציה
"My Money" — אפליקציית כספים (PWA) בעברית RTL לעצמאיות בתחום היופי (קוסמטיקאיות, מאפרות, בונות ציפורניים).
חיה בכתובת: **https://my-money-app-tau.vercel.app/**

## ארכיטקטורה — חשוב לפני כל עריכה
- **הכל בקובץ אחד**: `index.html` (HTML + CSS + JS ביחד).
- **ES5 בלבד!** רק `var`, `function`, בלי arrow functions, בלי `const`/`let`, בלי template literals (`` `...` ``). זה קריטי לתאימות.
- `shani-finance.html` הוא **עותק זהה** של `index.html` — אחרי כל שינוי מריצים `cp index.html shani-finance.html`.
- נתונים נשמרים ב-**localStorage** + סנכרון ל-**Firebase/Firestore** (התחברות עם Google).
- `sw.js` = Service Worker (network-first ל-`index.html`).

## תהליך עבודה אחרי כל שינוי (חובה)
1. לעדכן את הקוד ב-`index.html`
2. **להעלות `APP_VER` ב-1** (מנגנון רענון אוטומטי מסתמך על זה)
3. **לעדכן `CACHE` ב-`sw.js`** לאותו מספר (`shani-money-v<APP_VER>`)
4. `cp index.html shani-finance.html`
5. `git add index.html shani-finance.html sw.js`
6. commit + `git push origin main` (Vercel מפרסם אוטומטית תוך 1-2 דק')
7. סנכרון לענף: `git checkout claude/hebrew-finance-app-Xz4Pg && git merge --ff-only main && git push origin claude/hebrew-finance-app-Xz4Pg && git checkout main`

## ענפי git
- מפתחים על: `claude/hebrew-finance-app-Xz4Pg`
- דוחפים גם ל-`main` (זה מה ש-Vercel מפרסם)

---

## ✅ מה כבר נעשה (הושלם ונדחף)

### מחירים — מבנה HoneyBook (2 תוכניות × מתג שנתי/חודשי)
- מקור אמת אחד: `var PW_PRICES` ב-JS (גם לחלון השדרוג וגם למסך הנחיתה וגם להודעת ה-WhatsApp).
- **פרטי**: שנתי ₪249/שנה (≈₪21/חודש) · חודשי ₪29/חודש
- **עסקי**: שנתי ₪499/שנה (≈₪41/חודש) · חודשי ₪49/חודש
- כל תוכנית מציגה מחיר לחודש + כמה עולה המנוי השנתי בתשלום חד-פעמי, עם מתג שנתי/חודשי.

### מחיקת פיצ'רים לא בשימוש (1,541 שורות)
- נמחקו לגמרי: **ספקים והזמנות** + **הוצאות שנתיות** (מסכים, חלונות, פונקציות, גלובלים, גיבוי/שחזור, ניווט).
- **נשאר**: נכסים / שווי-נקי (פיצ'ר נפרד שמזין את מסך המאזן).

### תיקון קאש אייפון (PWA)
- ה-Service Worker נרשם עם `updateViaCache:'none'` + בדיקת עדכון תקופתית + רענון אוטומטי כשמגיעה גרסה חדשה.
- בעתיד עדכונים ייכנסו לבד; אין צורך למחוק את האפליקציה שוב.

---

## 📌 משימות פתוחות
- [ ] **(פעולה של המשתמשת, חד-פעמי)** באייפון: למחוק את האפליקציה ממסך הבית → להיכנס דרך Safari ל-`my-money-app-tau.vercel.app` → לוודא מחירים חדשים → להוסיף מחדש למסך הבית. רק פעם אחת, כדי לצאת מהקאש הישן.
- [ ] **החלטה**: האם להוסיף מחירים מפורשים לתמונת ההשקה לאינסטגרם (`marketing/post-launch.png`)? כרגע יש שם רק CTA "חודש חינם" בלי מחירים.
- [ ] **(פעולה של המשתמשת)** להגדיר ב-Vercel את משתני הסביבה ל-SMS: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`.

## קבצים מרכזיים
| קובץ | תפקיד |
|------|--------|
| `index.html` | כל האפליקציה (ערוך רק כאן) |
| `shani-finance.html` | עותק זהה (sync אחרי כל שינוי) |
| `sw.js` | Service Worker + גרסת cache |
| `api/send-sms.js` | פונקציית serverless לשליחת SMS דרך Twilio |
| `marketing/` | נכסי שיווק (PNG) + תבניות `src/*.html` + `render.sh` |
| `CLAUDE.md` | הנחיות הפרויקט |

## הערות
- מנגנון הרענון האוטומטי בודק את הגרסה החיה כל דקה ומרענן אם יש חדשה — לכן חשוב להעלות `APP_VER` בכל שינוי.
- רינדור תמונות שיווק: Chromium headless ב-`/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (ראי `marketing/render.sh`).
