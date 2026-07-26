# My Money — Google Play TWA Setup

## מה כבר מוכן
- ✅ `mymoney-release.jks` — קובץ החתימה (שמרי אותו במקום בטוח!)
- ✅ `assetlinks.json` — אימות דומיין מול גוגל
- ✅ `twa-manifest.json` — קונפיגורציה לאנדרואיד

**סיסמת הקובץ:** `MyMoney2026!` (שמרי זאת בנפרד!)

---

## שלב 1 — עדכוני את הדומיין

פתחי `twa-manifest.json` וחפשי `YOUR-DOMAIN.vercel.app` — החליפי ב-URL האמיתי שלך.
עשי אותו דבר ב-SETUP.md.

---

## שלב 2 — הוסיפי assetlinks.json לאפליקציה

הקובץ `assetlinks.json` חייב להיות נגיש ב:
```
https://YOUR-DOMAIN.vercel.app/.well-known/assetlinks.json
```

ב-`vercel.json` הוסיפי:
```json
"headers": [{
  "source": "/.well-known/assetlinks.json",
  "headers": [{ "key": "Content-Type", "value": "application/json" }]
}]
```

ויצרי תיקייה `public/.well-known/assetlinks.json` עם תוכן הקובץ הזה.

---

## שלב 3 — בנייה עם Bubblewrap (על המחשב שלך)

```bash
# התקיני Node.js + Bubblewrap
npm install -g @bubblewrap/cli

# העתיקי את תיקיית twa/ למחשב שלך
# הריצי מתוך תיקיית twa/:
bubblewrap build
```

→ יצור קובץ `app-release-signed.apk`

---

## שלב 4 — גוגל פליי

1. פתחי חשבון Google Play Developer: play.google.com/console ($25 חד-פעמי)
2. "Create app" → שם: My Money
3. מלאי פרטי האפליקציה (תיאור, צילומי מסך, אייקון 512x512)
4. "Release" → "Production" → העלי את ה-APK
5. המתיני לאישור (2–3 ימים)

---

## SHA-256 Fingerprint (לשמירה)
```
CF:1A:C4:C8:AF:C1:34:5F:DE:70:ED:F8:D0:5E:8A:1D:79:54:E3:F1:B6:41:E6:C8:2F:9D:DF:35:7A:A6:77:7F
```

---

## ⚠️ חשוב!
- **אל תעלי את `mymoney-release.jks` ל-GitHub** — זה מפתח החתימה שלך
- אם תאבדי אותו — לא תוכלי לעדכן את האפליקציה בגוגל פליי
- שמרי אותו ב-Google Drive / iCloud בנפרד
