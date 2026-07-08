# CLAUDE.md

הנחיות ל-Claude Code בעבודה על הריפו הזה.
**קודם כל בשיחה חדשה: לקרוא את `STATUS.md`, ואז את `index.html`.**

## מה זו האפליקציה

"My Money" — אפליקציית כספים (PWA) בעברית RTL לעצמאיות בתחום היופי.
חיה ב: **https://my-money-app-tau.vercel.app/** (Vercel מפרסם אוטומטית מ-`main`).

## ארכיטקטורה — חשוב לפני כל עריכה

- **הכל בקובץ אחד**: `index.html` (HTML + CSS + JS ביחד). ~7,500 שורות.
- **ES5 בלבד!** רק `var` ו-`function`. בלי arrow functions, בלי `const`/`let`, בלי template literals (`` `...` ``), בלי class. קריטי לתאימות.
- `shani-finance.html` = **עותק זהה** של `index.html`. אחרי כל שינוי: `cp index.html shani-finance.html`.
- נתונים: **localStorage** + סנכרון ל-**Firebase/Firestore** (התחברות Google).
- `sw.js` = Service Worker (network-first ל-`index.html`), עם גרסת cache.
- `api/send-sms.js` = פונקציית serverless (Twilio).

> הערה: `package.json`/`vite.config.js`/`src/` הם שרידי ניסוי React/Vite ישן — **לא בשימוש** באפליקציה החיה. אל תסתמכי עליהם.

## תהליך עבודה אחרי כל שינוי (חובה)

1. לערוך את `index.html` בלבד.
2. **להעלות `APP_VER` ב-1** (`var APP_VER=...` סביב שורה 2070) — מנגנון הרענון האוטומטי מסתמך על זה.
3. **לעדכן `CACHE` ב-`sw.js`** לאותו מספר: `shani-money-v<APP_VER>`.
4. `cp index.html shani-finance.html`.
5. `git add index.html shani-finance.html sw.js`
6. commit + `git push origin main` (Vercel מפרסם תוך 1-2 דק').
7. סנכרון לענף: `git checkout claude/hebrew-finance-app-Xz4Pg && git merge --ff-only main && git push origin claude/hebrew-finance-app-Xz4Pg && git checkout main`.

## ענפי git

- מפתחים על: `claude/hebrew-finance-app-Xz4Pg`
- דוחפים גם ל-`main` (זה מה ש-Vercel מפרסם).

## קבצים מרכזיים

| קובץ | תפקיד |
|------|--------|
| `index.html` | כל האפליקציה (ערוך רק כאן) |
| `shani-finance.html` | עותק זהה (sync אחרי כל שינוי) |
| `sw.js` | Service Worker + גרסת cache |
| `api/send-sms.js` | serverless לשליחת SMS (Twilio) |
| `marketing/` | נכסי שיווק (PNG) + תבניות + `render.sh` |
| `STATUS.md` | איפה אנחנו עומדים — לקרוא ראשון |
