# נכסים שיווקיים — My Money

נוצרו במותג האפליקציה (ציאן #2DD4BF, רקע כהה #0D1117, לוגו ₪).
כל קובץ PNG נוצר מ-HTML תואם ב-`src/` ורונדר דרך Chromium.

| קובץ | מידות | שימוש |
|------|-------|-------|
| `post-launch.png` | 1080×1080 | פוסט השקה לאינסטגרם / פייסבוק (ריבוע) |
| `story.png` | 1080×1920 | סטורי אינסטגרם / וואטסאפ (אנכי) |
| `og-banner.png` | 1200×630 | תמונת תצוגה מקדימה בשיתוף קישור (OG / וואטסאפ) |
| `icon.png` | 1024×1024 | אייקון אפליקציה (גרסה מרועננת) |

## עריכה ורינדור מחדש
ערכי את ה-HTML ב-`src/`, ואז:
```bash
./render.sh post-launch 1080 1080
./render.sh story 1080 1920
./render.sh og-banner 1200 630
./render.sh icon 1024 1024
```

## חיבור ה-OG banner לאתר (אופציונלי)
להוספה ל-`<head>` של `index.html` כדי ששיתוף הקישור יציג את הבאנר:
```html
<meta property="og:image" content="https://my-money-app-tau.vercel.app/marketing/og-banner.png">
<meta property="og:title" content="My Money — הכספים של העסק במקום אחד">
<meta property="og:description" content="ניהול הכנסות, הוצאות ודוחות לעצמאיות בתחום היופי. בעברית, פשוט.">
```
