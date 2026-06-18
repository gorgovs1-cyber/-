# SOLIS — מדריך מלא לבניית אתר לוקסוס סינמטי עם גלילה
### מאפס, עם הסברים מלאים + למה כל שלב קיים

**מה בונים:** אתר חד-עמודי עם וידאו שנגלל פריים-פריים לפי הגלילה, אנימציות, ועיצוב יוקרתי.
**מותג:** SOLIS — תפוז קר, לוקסוס, טבעי
**כלים:** Higgsfield AI · Seedance 2.0 · Claude Code (תוסף VS Code) · Vercel

---

## הבנת התמונה הגדולה — מה בנוי מה

לפני שמתחילים, חשוב להבין **לאיזה מטרה כל כלי משרת**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIPELINE של הפרויקט                         │
│                                                                 │
│  Higgsfield AI  →  תמונות סטילס באיכות פרסומת (11 תמונות)     │
│       ↓                                                         │
│  Seedance 2.0   →  הופך תמונות לוידאו סינמטי (1 ארוך + 3 קצרים)│
│       ↓                                                         │
│  FFmpeg         →  מכין את הוידאו לגלילה (כל פריים = נגיש)    │
│       ↓                                                         │
│  CLAUDE.md      →  "חוקי המשחק" שאומרים ל-AI איך לכתוב קוד    │
│       ↓                                                         │
│  Claude Code    →  כותב את כל ה-HTML/CSS/JS האתר               │
│       ↓                                                         │
│  Vercel         →  מפרסם את האתר לאינטרנט בחינם               │
└─────────────────────────────────────────────────────────────────┘
```

---

## לפני שמתחילים — מה צריך להתקין ולמה?

```
✅ VS Code           → code.visualstudio.com
✅ תוסף Claude Code  → חפשי "Claude Code" ב-Extensions של VS Code
✅ FFmpeg            → ffmpeg.org/download.html
✅ Python            → python.org (לרוב כבר מותקן על Mac)
✅ Git               → git-scm.com
```

**למה כל אחד?**

| כלי | למה צריך אותו |
|-----|--------------|
| VS Code | עורך הקוד — Claude Code רץ בתוכו ורואה את הקבצים שלנו |
| תוסף Claude Code | מאפשר לדבר עם ה-AI ישירות מתוך VS Code עם גישה לקבצים |
| FFmpeg | תוכנת וידאו מקצועית — מכינה את הוידאו לגלילה חלקה |
| Python | שרת מקומי — מאפשר לראות את האתר לפני שמפרסמים |
| Git | מעקב שינויים + שליחה ל-GitHub לפני פריסה ב-Vercel |

---

## מה האתר יכיל — מבנה הדפים מלמעלה למטה

```
┌─────────────────────────────────────┐
│  SOLIS          [SHOP]              │  ← ניווט קבוע (fixed)
├─────────────────────────────────────┤
│                                     │
│     וידאו גיבור — גלילה שולטת      │  ← 550vh גובה גלילה
│     בזמן הוידאו (15 שניות)         │
│                                     │
├─────────────────────────────────────┤
│ [תמונה דביקה] │ DAWN               │
│  מתחלפת       │ DUSK               │  ← Sticky Explainer
│  בגלילה       │ NIGHT              │
├─────────────────────────────────────┤
│ ← פאנלים גוללים אופקית →           │  ← Collection Rail
├─────────────────────────────────────┤
│        PRESS  (כרטיס 1)            │
│          POUR  (כרטיס 2)           │  ← כרטיסים מוערמים
│           PERFECT  (כרטיס 3)       │
├─────────────────────────────────────┤
│  "Drink what the sun intended."     │  ← Parallax Statement
├─────────────────────────────────────┤
│  [ עמודה ] [ עמודה ] [ עמודה ]     │  ← Reverse Columns
├─────────────────────────────────────┤
│  THE COLLECTION — DAWN DUSK NIGHT   │  ← Product Grid
├─────────────────────────────────────┤
│       JOIN THE RITUAL               │  ← Newsletter
├─────────────────────────────────────┤
│           SOLIS  © 2026             │  ← Footer
└─────────────────────────────────────┘
```

---

## שלב 1 — יצירת תיקיית פרויקט

### למה?
כל הקבצים (תמונות, וידאואים, קוד) חייבים להיות **באותה תיקייה**.
הסיבה: ב-HTML כשכותבים `<img src="dawn-product.png">` הדפדפן מחפש את הקובץ **בתיקייה שבה נמצא ה-HTML**. אם הקובץ במקום אחר — שגיאה.

צור תיקייה חדשה ריקה בשם `solis-orange`.
בסוף התהליך, המבנה יראה **בדיוק** כך:

```
solis-orange/
├── CLAUDE.md                          ← קובץ חוקים (תיצרי אותו בשלב 6)
├── index.html                         ← Claude Code יבנה אותו
├── orange-story.mp4                   ← וידאו גיבור (15 שניות)
├── dawn-product.png
├── dusk-product.png
├── night-product.png
├── newsletter-bg.png
├── collection-bg.png
├── card-press.mp4                     ← 4 שניות לולאה
├── card-pour.mp4                      ← 4 שניות לולאה
└── card-perfect.mp4                   ← 4 שניות לולאה
```

> ⚠️ **חשוב:** כל קבצי התמונות הם `.png` — לא `.jpg`.

---

## שלב 2 — יצירת 11 תמונות עם Higgsfield AI

### למה Higgsfield ולא Midjourney/DALL-E?
Higgsfield מתמחה בתמונות מוצר פרסומתיות עם **עקביות מצלמה גבוהה** — כלומר אם תשלחי תמונה כ-Reference, היא תשמור על אותה זווית, תאורה ואווירה. זה קריטי כי Seedance 2.0 הופך את התמונות לוידאו, ואם כל תמונה נראית שונה — הוידאו יקפוץ בצורה לא חלקה.

### למה צריך Reference Image?
```
בלי Reference:               עם Reference:
תמונה 1: תפוז מימין         תמונה 1: תפוז מרכז, אור מלמעלה
תמונה 2: תפוז משמאל    →    תמונה 2: אותו זווית, אותו אור
תמונה 3: אור שונה            תמונה 3: אותה עקביות חזותית
      ↓                              ↓
וידאו קופץ ולא חלק         וידאו חלק וסינמטי ✅
```

### איך נכנסים ל-Higgsfield?

```
1. כנסי ל:  higgsfield.ai
2. לחצי על  "Sign In" (פינה ימנית עליונה)
3. היכנסי עם Google
4. לחצי על  "Generate" בתפריט השמאלי
5. בחרי "Image" (לא Video)
```

### איפה כותבים את הפרומפט?

```
┌─────────────────────────────────────────────────┐
│  Higgsfield — Image Generation                  │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │  [+] Upload Reference Image             │    │  ← כאן מעלים Reference
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │                                         │    │
│  │  Write your prompt here...              │    │  ← כאן מדביקים את הפרומפט
│  │                                         │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  Style: [Photorealistic ▼]  Ratio: [1:1 ▼]     │
│                                                 │
│              [ Generate ]                       │  ← לחצן יצירה
└─────────────────────────────────────────────────┘
```

> 💡 צרי את התמונות **לפי הסדר**. מתמונה 2 ואילך — **העלי את התמונה הקודמת** בקופסת ה-Reference.

---

### 2.1 — 6 תמונות מפתח לוידאו (Keyframes)

### למה דווקא 6 תמונות?
הוידאו בנוי כ**רצף סיפורי**: תפוז שלם ← נחתך ← גרגרים נופלים ← נכנסים לכוס ← כוס מלאה ← ידיים אוחזות.
כל מעבר בין תמונה לתמונה = **סצנה אחת** בוידאו. 6 תמונות = 5 מעברים = סיפור שלם.

| # | שם קובץ לשמירה | Reference |
|---|----------------|-----------|
| 1 | image-1-orange-whole.png | **ללא** |
| 2 | image-2-orange-sliced.png | image-1 |
| 3 | image-3-segments-cascading.png | image-2 |
| 4 | image-4-glass-juice-entering.png | image-3 |
| 5 | image-5-glass-full-glowing.png | image-4 |
| 6 | image-6-hands-wrapping-glass.png | image-5 |

---

**תמונה 1 — `image-1-orange-whole.png`** | Reference: ללא

```
A single whole orange floating in the exact vertical center of the frame,
pure black background, dramatic warm amber-gold spotlight from directly above,
deep vivid orange skin with natural dimpled texture and a short stem with a single
glossy leaf, surface texture rich and slightly waxy with bright highlights,
floating completely in mid-air with no surface no floor no table beneath it,
subtle warm golden glow underneath, ultra photorealistic 8K,
luxury wellness product photography, no text no labels no watermarks
```

---

**תמונה 2 — `image-2-orange-sliced.png`** | Reference: image-1

```
The same orange now dramatically sliced open in the exact vertical center,
pure black background, warm amber-gold spotlight from directly above,
the fruit cut wide revealing vivid deep orange flesh with glistening juice cells
each catching the light like liquid gold, a few juice droplets floating outward
in perfect orbital formation, floating completely in mid-air no surface no floor,
ultra photorealistic 8K, no text no labels no watermarks
```

---

**תמונה 3 — `image-3-segments-cascading.png`** | Reference: image-2

```
Dozens of vivid orange segments freed from the fruit and cascading downward
in slow motion, pure black background, warm amber-gold spotlight from directly above,
segments falling like a shower of liquid amber each catching the light with a deep
jewel-like glow, some segments trailing thin threads of golden juice,
ultra photorealistic 8K, no text no labels no watermarks
```

---

**תמונה 4 — `image-4-glass-juice-entering.png`** | Reference: image-3

```
A stunning handblown glass cup with no handles floating in the exact vertical center,
pure black background, dramatic warm amber-gold spotlight from directly above,
crystal clear thin walls, small amount of deep golden-orange juice at the bottom,
dozens of orange segments actively falling from above into the glass in dramatic
slow motion, tiny golden splashes where segments hit the juice surface, floating
completely in mid-air no surface no floor no table, ultra photorealistic 8K,
no watermarks
```

---

**תמונה 5 — `image-5-glass-full-glowing.png`** | Reference: image-4

```
The same handblown glass cup now completely filled with rich deep golden-orange
juice glowing from within like liquid amber, orange pulp and tiny segments visible
floating at different depths through the crystal clear glass walls, the liquid
radiating a deep warm golden-orange light from within, thin layer of fine golden
foam at the very top, floating completely in mid-air no surface no floor,
ultra photorealistic 8K, no text no labels no watermarks
```

---

**תמונה 6 — `image-6-hands-wrapping-glass.png`** | Reference: image-5

```
The same glass cup filled with glowing golden-orange juice floating in the exact
vertical center, pure black background, warm amber-gold spotlight from above,
two elegant hands entering the frame from both sides, fingers gently curling
around the outside of the glass, the warm golden glow casting a subtle amber hue
on the skin, floating completely in mid-air no surface no floor,
ultra photorealistic 8K, no text no labels no watermarks
```

---

### 2.2 — 3 תמונות מוצר

### למה DAWN / DUSK / NIGHT?
זו אסטרטגיית מיתוג — כל "מוצר" הוא אותו מיץ אבל מוצג ב**שלוש תחושות שונות של זמן**:
- **DAWN** = בוקר, אנרגיה, התחלה (צבע: שנהב/כרם)
- **DUSK** = ערב, חמימות, עומק (צבע: ענבר שרוף)
- **NIGHT** = לילה, שקט, התחדשות (צבע: פחם כהה)

השתמשי ב-`dawn-product.png` כ-Reference גם ל-DUSK וגם ל-NIGHT — לשמירה על אותו צורת פח.

---

**`dawn-product.png`** | Reference: ללא

```
A single premium luxury cold-pressed orange juice tin floating in the exact center,
pure black background, warm golden morning light from above at 45 degrees,
deep ivory cream matte finish, the word DAWN in small elegant gold lettering,
beside it three loose glistening orange segments and a thin curl of dried orange peel,
floating in mid-air no surface no floor, ultra photorealistic 8K,
luxury wellness brand product photography, no watermarks
```

---

**`dusk-product.png`** | Reference: dawn-product.png

```
A single premium luxury cold-pressed orange juice tin floating in the exact center,
pure black background, warm amber evening light from above at 45 degrees,
deep burnt amber matte finish, the word DUSK in small elegant gold lettering,
beside it three loose glistening orange segments and a dried marigold petal,
floating in mid-air no surface no floor, ultra photorealistic 8K,
luxury wellness brand product photography, no watermarks
```

---

**`night-product.png`** | Reference: dawn-product.png

```
A single premium luxury cold-pressed orange juice tin floating in the exact center,
pure black background, cool silver moonlight from above at 45 degrees,
deep charcoal matte finish, the word NIGHT in small elegant silver lettering,
beside it three loose glistening orange segments and a single small dried flower,
floating in mid-air no surface no floor, ultra photorealistic 8K,
luxury wellness brand product photography, no watermarks
```

---

### 2.3 — 2 תמונות רקע

### למה 2 רקעים שונים?
- **newsletter-bg.png** = בהיר וחם → מרגיש כמו הזמנה, קרוב, חם
- **collection-bg.png** = כהה ודרמטי → מרגיש יוקרתי, מסתורי

כל אחד משמש בסקשן אחר ויוצר תנודתיות רגשית בגלילה.

---

**`newsletter-bg.png`** | Reference: ללא

```
A vast orange grove at golden hour, rows of orange trees heavy with deep vivid
ripe fruit stretching to the horizon, warm amber-gold late afternoon sun raking
across the grove from the left, some oranges sliced open revealing golden flesh,
soft golden mist hovering between the trees, highly cinematic perspective
slightly elevated, ultra photorealistic 8K, no people no text no watermarks
```

---

**`collection-bg.png`** | Reference: ללא

```
A vast dark orange grove at deep twilight, rows of trees stretching to the horizon,
the sky near-black deep navy with a faint ember-amber glow at the very bottom,
a few ripe oranges glowing deep gold on dark branches, atmospheric dark mist
between the trees, extremely cinematic, moody, ultra dark luxury editorial feel,
no people no text no watermarks, ultra photorealistic 8K
```

---

## שלב 3 — יצירת וידאו הגיבור (15 שניות)

### למה Seedance 2.0 ולא כלי וידאו אחר?
Seedance 2.0 תומך ב**Stitch Mode** — הזנת כמה תמונות ובניית מעברים חלקים ביניהן לפי סדר שאנחנו קובעים. רוב כלי הוידאו יוצרים קליפ אחד מתמונה אחת. כאן אנחנו בונים **סיפור** מ-6 תמונות.

### למה 15 שניות?
הוידאו נשלט על ידי גלילה. 550vh גלילה ÷ 15 שניות = קצב מתאים שמרגיש **לא מהיר מדי ולא איטי מדי**.
אם הוידאו היה 5 שניות — הגלילה הייתה מרוצה. 30 שניות — הגלילה הייתה מעייפת.

### איפה יוצרים?

```
1. כנסי ל:  higgsfield.ai
2. לחצי על  "Generate" בתפריט
3. בחרי     "Video" (לא Image)
4. בחרי     "Seedance 2.0" מרשימת המודלים
5. בחרי     "Stitch" — זה מאפשר ריצוף כמה תמונות
```

### איך מעלים את 6 התמונות?

```
┌──────────────────────────────────────────────────────┐
│  Seedance 2.0 — Stitch Mode                          │
│                                                      │
│  Drag images here or click to upload                 │
│  ┌──────┐ ┌──────┐ ┌──────┐                         │
│  │img-1 │ │img-2 │ │img-3 │  ← גרור את כל 6        │
│  └──────┘ └──────┘ └──────┘     התמונות לכאן        │
│  ┌──────┐ ┌──────┐ ┌──────┐                         │
│  │img-4 │ │img-5 │ │img-6 │                         │
│  └──────┘ └──────┘ └──────┘                         │
│                                                      │
│  Duration: [15s ▼]                                   │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │  Write prompt — use @ to tag images        │      │
│  └────────────────────────────────────────────┘      │
│                                                      │
│                    [ Generate ]                      │
└──────────────────────────────────────────────────────┘
```

**שמור כ:** `orange-story.mp4`

### פרומפט Stitch — העלי את 6 התמונות ותייגי כל אחת עם @

```
Using [@image-1] [@image-2] [@image-3] [@image-4] [@image-5] [@image-6]
create a single continuous 15-second cinematic video in this exact sequence.

Start with [@image-1] whole orange floating in darkness, hold 2 seconds.
Slowly transition into [@image-2] as the orange is sliced open revealing
glowing golden flesh, hold 2 seconds.
Smoothly transition into [@image-3] as dozens of segments burst free and cascade
downward like falling amber in slow motion, hold 3 seconds.
Transition into [@image-4] as segments enter a crystal glass and golden splashes
bloom on impact, hold 3 seconds.
Slowly dissolve into [@image-5] as the glass fills completely with deep glowing
golden-orange liquid like liquid amber, hold 2 seconds.
Final transition into [@image-6] as two elegant hands enter from both sides
and gently wrap around the glowing glass, hold 3 seconds.

Pure black background throughout. No cuts, only smooth slow morphing transitions.
Warm amber-gold spotlight from above throughout.
Ultra cinematic, slow motion, luxury wellness brand feel. No text no watermarks.
```

---

## שלב 4 — יצירת 3 וידאו כרטיסים (4 שניות כל אחד)

### למה דווקא 4 שניות ולמה לולאה?
הכרטיסים מוצגים כשהמשתמש **עצר** לקרוא. הוידאו ברקע צריך **לנוע אבל לא לספר סיפור** — רק ליצור אווירה. 4 שניות = לולאה קצרה מספיק שלא מרגישים שהיא חוזרת.

אותו תהליך כמו הוידאו הראשי — Seedance 2.0 על Higgsfield.
**בחרי Duration: 4s** והעלי תמונת התחלה מתאימה לכל כרטיס.

---

**`card-press.mp4`** — העלי תמונת כתום נסחט

```
Using this image as the start frame, create a slow motion 4-second cinematic loop.
The orange is cold-pressed by two hands, golden juice slowly emerges and drips
downward, segments glisten and catch the amber spotlight, juice droplets fall in
ultra slow motion suspended like liquid gold, pure black background throughout,
warm amber spotlight from above, no camera movement, loop-friendly ending
```

---

**`card-pour.mp4`** — העלי תמונת מזיגה

```
Using this image as the start frame, create a slow motion 4-second cinematic loop.
A thin stream of deep golden orange juice pours continuously from above into
the crystal glass, the stream glows like liquid gemstone, segments fall alongside
in ultra slow motion, pure black background throughout, no camera movement,
warm amber spotlight from above, loop-friendly ending
```

---

**`card-perfect.mp4`** — העלי תמונת כוס מלאה

```
Using this image as the start frame, create a slow motion 4-second cinematic loop.
The glass cup full of glowing golden-orange juice floats in pure black,
three orange segments slowly drift and rotate inside the liquid visible through
the glass, tiny bubbles rise gently, the liquid glows deep amber pulsing like
a heartbeat, fine mist rises from the top, pure black background,
no camera movement, loop-friendly ending
```

---

## שלב 5 — קידוד מחדש של הוידאו עם FFmpeg

### למה?
כשוידאו נוצר, הדפדפן לא יכול לקפוץ לכל פריים ישר — הוא חייב **לנגן קדימה** מנקודה מסוימת כדי לדעת מה יש בפריים שביקשת. זה גורם ל**קפיצות ותקיעות** בגלילה.

FFmpeg יוצר **קובץ שבו כל פריים עצמאי** — הדפדפן יכול לקפוץ לכל שנייה מיידית, בדיוק כמו שגוגל מפות יכולה לקפוץ לכל מיקום על המפה.

```
וידאו רגיל:   [ פריים מפתח ] ... [ פריים תלוי ] ... [ פריים תלוי ]
               ↑ אפשר לקפוץ         ↑ חייב לחשב מהמפתח האחרון ← תקיעה!

אחרי FFmpeg:  [ פריים מפתח ] [ פריים מפתח ] [ פריים מפתח ]
               ↑ כל פריים עצמאי → קפיצה מיידית לכל נקודה ✅
```

> ⚠️ **חובה!** בלי שלב זה הוידאו לא יגלל חלק.

### הרץ בטרמינל מתוך תיקיית הפרויקט:

```bash
ffmpeg -i orange-story.mp4 \
  -vf scale=960:-1 \
  -movflags faststart \
  -vcodec libx264 \
  -crf 20 \
  -g 1 \
  -pix_fmt yuv420p \
  orange-story-scrub.mp4
```

**הסבר כל דגל:**

| דגל | מה עושה | למה חשוב |
|-----|---------|---------|
| `-vf scale=960:-1` | מצמצם לרוחב 960px | קובץ קטן יותר = גלילה מהירה יותר |
| `-movflags faststart` | metadata בתחילת הקובץ | הדפדפן מתחיל לנגן לפני שהכל נטען |
| `-crf 20` | איכות גבוהה (0=מושלם, 51=גרוע) | שמירה על חדות ויזואלית |
| `-g 1` | **כל פריים = מפתח** | הקסם של הגלילה החלקה |
| `-pix_fmt yuv420p` | פורמט צבע סטנדרטי | תואם לכל דפדפן |

לאחר מכן — **שנה שם** `orange-story-scrub.mp4` ל-`orange-story.mp4` והחלף את המקורי.

---

## שלב 6 — יצירת קובץ CLAUDE.md

### למה CLAUDE.md ולא פשוט לכתוב לו בצ'אט?
Claude Code הוא AI — בלי הנחיות ספציפיות הוא יקבל **החלטות ברירת מחדל** שלא תואמות מה שאנחנו רוצים.

דוגמאות להחלטות שגויות ללא CLAUDE.md:
- יצור `package.json` ו-`npm install` כשאנחנו רוצים קובץ סטטי פשוט
- ישתמש ב-`window.scrollY` לגלילה שגורמת לתקיעות
- ישתמש ב-Canvas במקום `video.currentTime`
- יבחר גופנים שלא מתאימים לסגנון

CLAUDE.md = **הוראות עבודה קבועות** שנקראות בכל שיחה חדשה.

פתחי VS Code, פתחי את תיקיית `solis-orange`, צרי קובץ חדש בשם **`CLAUDE.md`**, והדביקי את התוכן הבא **בדיוק**:

```markdown
# SOLIS — Project Rules
# Read this entire file before writing any code.

## WHAT YOU ARE BUILDING
Single-file luxury scroll website for a cold-pressed orange juice brand called SOLIS.
Everything lives in one file: index.html.
No npm. No package.json. No server.js. No build tools.
Served locally with: python3 -m http.server 8080

## HARD RULES — NEVER BREAK
1. ONE FILE ONLY — everything in index.html
2. NO CANVAS EVER
3. VIDEO SCRUB uses getBoundingClientRect() only — never window.scrollY alone
4. Always attach BOTH scroll listeners:
   window.addEventListener("scroll", requestTick, { passive: true })
   lenis.on("scroll", requestTick)
5. Never animate the pinned container — only animate children inside it
6. Never use GSAP pin:true AND CSS position:sticky on the same element
7. Never add will-change:transform or transform:translateZ(0) to #source-video
   — degrades video quality on Retina displays

## CDN IMPORTS — exact order, always
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.23/dist/lenis.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

## LENIS SETUP
const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

## COLORS — RULE: Orange is NEVER used as text color
#f5f0eb          off-white    ALL text, headings, nav, product names
rgba(245,240,235,0.45)  muted cream  Section eyebrow labels
#a08060          muted amber  Body and description text
#000000          black        Body background, footer
#7a3500          deep amber   Progress bar background only
#e05c00          vivid orange Buttons, accent lines, card borders

## FONTS
Cormorant Garamond — all display/headings
Inter              — all body/labels

## ASSETS
All image files are .png — not .jpg. Always use .png extensions.
Hero video file is: orange-story.mp4

## ALWAYS END THE SCRIPT WITH
ScrollTrigger.refresh();
```

---

## שלב 7 — בניית האתר עם Claude Code

### למה Claude Code ולא לכתוב HTML לבד?
האתר הזה כולל ~1,500 שורות קוד עם:
- JavaScript מורכב לגלילת וידאו
- GSAP ScrollTrigger לאנימציות
- CSS מדויק עם משתני עיצוב
- 10 סקשנים עם אפקטים שונים

לכתוב את זה לבד לוקח ימים ודורש ניסיון מתקדם.
Claude Code כותב את הכל **בדקות**, ויחד עם CLAUDE.md הוא יודע בדיוק מה אנחנו רוצים.

### למה ה-CDN Libraries?

| ספרייה | תפקיד | בלעדיה |
|--------|--------|--------|
| **GSAP** | מנוע אנימציה מקצועי | אנימציות ידניות, קוד ארוך, לא חלק |
| **ScrollTrigger** | מחבר אנימציות GSAP לגלילה | הרכבת האופקית לא הייתה עובדת |
| **Lenis** | גלילה "חלקה" (inertia) | גלילה קשיחה, תחושה של אתר ישן |

### איך פותחים Claude Code ב-VS Code?

```
┌─────────────────────────────────────────────────┐
│  VS Code                                        │
│                                                 │
│  File → Open Folder → בחרי solis-orange         │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │ EXPLORER                                 │   │
│  │ ▼ SOLIS-ORANGE                           │   │
│  │   📄 CLAUDE.md                           │   │
│  │   🎬 orange-story.mp4                    │   │
│  │   🖼️ dawn-product.png                    │   │
│  │   ...                                    │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  בסרגל הצד השמאלי — לחצי על האייקון של         │
│  Claude Code (סמל הכוכב / ה-A הכחול)           │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │ Claude Code                    [New ▼]   │   │
│  │                                          │   │
│  │ > _                                      │   │  ← כאן מדביקים
│  └──────────────────────────────────────────┘   │     את הפרומפט
└─────────────────────────────────────────────────┘
```

### פרומפט הבנייה הראשי — הדביקי בשלמותו:

```
Read CLAUDE.md fully before writing anything.
Build index.html for SOLIS. All assets are in this folder.
Single file only. No npm. No server. Open directly in browser.
Build in this order. Confirm each step works before continuing.

STEP 1 — LENIS + GSAP
Set up Lenis and GSAP ScrollTrigger using exact CDN imports from CLAUDE.md.

STEP 2 — HERO VIDEO SCRUB
Use exact HTML, CSS and JS from CLAUDE.md. Video: orange-story.mp4.
Text overlays (opacity 0 default, transition: opacity 0.6s ease):
progress 0.15–0.25: SOLIS — 96px Cormorant Garamond #f5f0eb weight 300 centered
progress 0.35–0.45: Born from sun-drenched groves. 28px italic Cormorant Garamond #f5f0eb centered
progress 0.55–0.67: PRESS · POUR · PERFECT  72px Cormorant Garamond #f5f0eb centered
progress 0.70–0.80: One fruit changed everything. 12px Inter uppercase letter-spacing 4px #f5f0eb position top 10% left 8%
Nav: SOLIS fixed top-left + SHOP fixed top-right 11px Cormorant Garamond, color #f5f0eb, letter-spacing 5px, z-index 100
Progress bar: fixed 2px wide right edge, background #7a3500, height grows 0 to 100vh as scroll progress goes 0 to 1

STEP 3 — STICKY PRODUCT EXPLAINER
Left 50%: product image, position sticky top 0, height 100vh.
Starts with dawn-product.png. Swaps on scroll via IntersectionObserver.
Right 50%: three 100vh panels. Use CSS sticky only — NO GSAP pin here.
Panel 1 DAWN: "Your morning ritual, reimagined." — dawn description
Panel 2 DUSK: "Golden hour in every drop." — dusk description
Panel 3 NIGHT: "Cold-pressed while you sleep." — night description

STEP 4 — HORIZONTAL COLLECTION RAIL
.h-sticky: NO height property. GSAP handles all spacing.
.h-track: display flex, width 400vw, height 100vh.
4 panels each 100vw 100vh flex-shrink 0.
Panel 1: collection-bg.png, THE COLLECTION centered.
Panels 2-4: dawn/dusk/night product images, name text bottom-left.
GSAP: x: -(scrollWidth-innerWidth), pin:true, scrub:1, invalidateOnRefresh:true

STEP 5 — STACKING RITUAL CARDS
3 sticky cards. Each 70vh, 70% width, max-width 800px, margin 0 auto.
top: 10vh / 15vh / 20vh. Background videos: card-press/pour/perfect.mp4
Video: autoplay muted loop playsinline, scale(1.08)→scale(1.0) over 4s.
Layers: vignette → film grain → amber light sweep → bottom fade.
Text z-index 5: accent line + number 01/02/03 + word PRESS/POUR/PERFECT + desc.
Word: clamp(72px,10vw,110px) Cormorant Garamond #f5f0eb.
Sweep delay stagger: Card1=0s Card2=1.3s Card3=2.6s.

STEP 6 — PARALLAX STATEMENT
100vh. newsletter-bg.png moves at 0.4x scroll speed. Overlay rgba(0,0,0,0.72).
"Drink what / the sun intended." 80px Cormorant Garamond #f5f0eb italic.
Tagline: SOLIS — Since the first harvest. 10px Inter cream uppercase.

STEP 7 — REVERSE COLUMNS
3-column grid 80vh. All use newsletter-bg.png.
Cols 1+3: translateY(-8% to +8%). Col 2: translateY(+8% to -8%).
Vignette + "Born from the sun." italic overlay centered.

STEP 8 — PRODUCT COLLECTION GRID
Background #0a0005. Heading THE COLLECTION 10px Inter cream uppercase.
3 product cards: dawn/dusk/night-product.png.
Names DAWN DUSK NIGHT in #f5f0eb Cormorant Garamond.
DAWN: "Morning ritual. Cold-pressed at dawn."
DUSK: "Golden hour. Orange at its warmest."
NIGHT: "Deep restore. While the world sleeps."

STEP 9 — NEWSLETTER
newsletter-bg.png background, overlay rgba(0,0,0,0.60).
JOIN THE RITUAL 52px Cormorant Garamond #ffffff centered.
Email input + SUBSCRIBE button background #7a3500.

STEP 10 — FOOTER
Background #000000. SOLIS centered Cormorant Garamond 16px #f5f0eb.
© 2026 SOLIS. All rights reserved. 12px Inter #444444.

END: ScrollTrigger.refresh(); as the very last line.
```

---

## 🧠 הבנת הקוד — איך הגלילה שולטת בוידאו?

### הרעיון בפשטות

```
גלילה של המשתמש  →  מחשבים "כמה אחוז" גללנו  →  קובעים את הזמן בוידאו

0% גלילה  →  0.0 שניות  (פריים ראשון)
50% גלילה →  7.5 שניות  (אמצע הוידאו)
100% גלילה → 15.0 שניות (פריים אחרון)
```

### הפונקציה המלאה עם הערות בעברית

```javascript
// ─── פונקציית גלילת הוידאו ───────────────────────────────────────
// IIFE = Immediately Invoked Function Expression
// הפונקציה נקראת מיד, ואוטומטית "סוגרת" את המשתנים בפנים
// כך שלא מזהמים את ה-namespace הגלובלי של הדף
(() => {

  // מאתר את ה-div שמגדיר את "עומק" הגלילה (גובה 550vh)
  // ככל שהוא ארוך יותר, כך הגלילה נמשכת יותר לפני שהוידאו מסתיים
  const track = document.querySelector(".hero-scroll-track");

  // מאתר את אלמנט הוידאו — אנחנו נשנה את .currentTime שלו
  const video = document.getElementById("source-video");

  // בדיקת בטיחות — אם אחד מהאלמנטים לא קיים בדף, יוצאים
  if (!track || !video) return;

  // ticking: מונע "flood" של קריאות — רק קריאה אחת לכל פריים מסך
  let ticking     = false;
  // duration: משך הוידאו בשניות — יתמלא אחרי שהוידאו נטען
  let duration    = 0;
  // initialized: האם הוידאו מוכן ואפשר לשלוט בו?
  let initialized = false;

  // clamp: מגבילה ערך בין lo ל-hi
  // דוגמה: clamp(1.5, 0, 1) = 1 | clamp(-0.2, 0, 1) = 0
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  // ═══════════════════════════════════════════════════════
  // זו הפונקציה הקריטית — מחברת גלילה לזמן וידאו
  // ═══════════════════════════════════════════════════════
  function update() {
    // לא מריצים אם הוידאו לא מוכן עדיין
    if (!initialized || !duration || !Number.isFinite(duration)) return;

    // track.offsetHeight = הגובה הכולל של בלוק הגלילה (לדוגמה 2750px)
    // window.innerHeight = גובה חלון הדפדפן (לדוגמה 800px)
    // total = הפיקסלים שניתן לגלול בתוך ה-track
    const total = track.offsetHeight - window.innerHeight;

    // getBoundingClientRect() = מיקום האלמנט יחסית לחלון
    // כשגוללים למטה:
    //   .top = 0    → לא גללנו כלל
    //   .top = -500 → גללנו 500px למטה
    //   .top = -2000 → גללנו 2000px למטה
    const rect   = track.getBoundingClientRect();

    // -rect.top = כמה פיקסלים גללנו (ערך חיובי תמיד)
    // clamp מבטיח שלא נצא מהטווח 0 עד total
    const passed = clamp(-rect.top, 0, total);

    // progress: ערך נורמלי בין 0 ל-1
    // 0 = תחילת הגלילה, 1 = סוף הגלילה
    const progress = total > 0 ? passed / total : 0;

    // ★ זה הקסם ★
    // progress × duration = currentTime
    //
    // דוגמה עם וידאו של 15 שניות:
    //   progress 0.0  → currentTime = 0.0s  (פריים ראשון — תפוז שלם)
    //   progress 0.33 → currentTime = 5.0s  (תפוז נחתך)
    //   progress 0.5  → currentTime = 7.5s  (גרגרים נופלים)
    //   progress 0.67 → currentTime = 10.0s (כוס מתמלאת)
    //   progress 1.0  → currentTime = 15.0s (ידיים אוחזות)
    //
    // readyState >= 2 = "יש מספיק נתונים לנגן"
    if (video.readyState >= 2)
      video.currentTime = clamp(progress * duration, 0, duration);

    // מעדכן הופעת/היעלמות טקסטים לפי אחוז הגלילה
    updatePhases(progress);
  }

  // ─── throttling ───────────────────────────────────────────────
  // גלילה מהירה מאוד = עשרות אירועי "scroll" בשנייה
  // אבל המסך מצייר רק 60 פעמים בשנייה (60fps)
  // אין טעם לחשב יותר מ-60 פעמים בשנייה → requestAnimationFrame
  function requestTick() {
    if (ticking) return;   // כבר יש בקשה ממתינה — מתעלמים
    ticking = true;
    requestAnimationFrame(() => {
      update();            // מריצים את update בתזמון המסך
      ticking = false;     // מאפשרים בקשה חדשה
    });
  }

  function initScrub() {
    duration = video.duration;
    // בטיחות — אם duration לא מספר תקין, יוצאים
    if (!duration || !Number.isFinite(duration)) return;

    video.pause();          // חובה — מוודא שהוידאו לא מתנגן לבד
    video.currentTime = 0;  // מתחיל מהפריים הראשון
    initialized = true;

    // מאזין #1: גלילה רגילה של הדפדפן
    // { passive: true } = מאפשר לדפדפן לגלול מהר יותר
    window.addEventListener("scroll", requestTick, { passive: true });

    // מאזין #2: לטיפול בשינוי גודל חלון (שנה רזולוציה, סובב טלפון)
    window.addEventListener("resize", requestTick);

    // מאזין #3: גלילה דרך Lenis (גלילה חלקה)
    // בלי זה — יש עיכוב קל בין גלילה לבין עדכון הוידאו
    if (typeof lenis !== "undefined") lenis.on("scroll", requestTick);

    requestTick(); // הפעלה ראשונית — מציג את הפריים הנכון
  }

  // אם הוידאו כבר בקאש (חזרנו לעמוד) — מתחיל מיד
  // אחרת — ממתין לאירועי טעינה
  if (video.readyState >= 2) initScrub();
  else {
    // loadedmetadata = יודע כמה ארוך הוידאו (duration)
    video.addEventListener("loadedmetadata", initScrub, { once: true });
    // loadeddata = יש מספיק נתונים לנגן את הפריים הראשון
    video.addEventListener("loadeddata",     initScrub, { once: true });
    video.load(); // מפעיל טעינה יזומה (לא ממתין ל-autoplay)
  }

})();
// ────────────────────────────────────────────────────────────────
```

### תרשים זרימה — מגלילה לפריים

```
המשתמש גולל למטה
        │
        ▼
אירוע "scroll" נורה על ידי הדפדפן
        │
        ▼
requestTick() נקרא
        │
        ├─ ticking=true? → יציאה (כבר ממתינים לפריים הבא)
        │
        ▼
requestAnimationFrame() ממתין לפריים הציור הבא של המסך (60fps)
        │
        ▼
update() מחשב:
   ① total  = 2750px  (גובה track פחות גובה חלון)
   ② passed = 825px   (כמה גללנו לפי getBoundingClientRect)
   ③ progress = 825 ÷ 2750 = 0.3
   ④ currentTime = 0.3 × 15 = 4.5 שניות
        │
        ▼
video.currentTime = 4.5  ← הדפדפן מציג פריים מתאים
        │
        ▼
updatePhases(0.3)  ← טקסטים מופיעים/נדעכים לפי אחוז
```

---

## שלב 8 — בדיקה מקומית

### למה שרת Python ולא לפתוח HTML ישירות?
כשפותחים HTML ישירות מקובץ (`file://...`), הדפדפן **חוסם טעינת וידאו** מסיבות אבטחה (CORS policy).
שרת Python נותן לדפדפן כתובת `http://` תקינה — הכל עובד.

### הרץ שרת מקומי

```bash
cd /path/to/solis-orange
python3 -m http.server 8080
```

פתחי בדפדפן: **`http://localhost:8080`**

### רשימת בדיקה לפני פריסה

```
□ גלילה איטית למטה — הוידאו נגלל פריים-פריים בדיוק
□ טקסט "SOLIS" מופיע ונדעך בנקודות הנכונות
□ פס ההתקדמות (2px ימין) גדל עם הגלילה
□ תמונת המוצר מתחלפת DAWN → DUSK → NIGHT
□ רכבת אופקית — 4 פאנלים ללא רווח שחור בהתחלה/סוף
□ כרטיסים — PRESS, POUR, PERFECT מוערמים עם וידאו ברקע
□ פרלקס — "Drink what the sun intended." נע בגלילה
□ עמודות הפוכות — עמוד 2 נע הפוך מ-1 ו-3
□ גריד מוצרים — 3 פחיות עם שמות ותיאורים
□ ניוזלטר — שדה מייל וכפתור subscribe
□ פוטר — SOLIS © 2026
```

> 💡 **Refresh קשה** אחרי כל שינוי בקוד:
> Mac: `Cmd + Shift + R` | Windows: `Ctrl + Shift + R`

### בעיות נפוצות ופתרונות

| בעיה | סיבה | פתרון |
|------|------|-------|
| וידאו לא נגלל | לא הרצת FFmpeg | חזרי לשלב 5 |
| וידאו קופץ בגלילה | `window.scrollY` במקום `getBoundingClientRect` | תגידי ל-Claude Code לתקן |
| רכבת אופקית עוצרת מוקדם | יש `height` על `.h-sticky` | הסירי את ה-height |
| וידאו מטושטש על Mac | יש `will-change:transform` על `#source-video` | הסירי אותו |
| וידאו לא נטען בכלל | פתחת HTML ישירות מקובץ | השתמשי בשרת Python |

---

## שלב 9 — פריסה ב-Vercel

### למה Vercel ולא GitHub Pages?
- **Vercel** = אפס קונפיגורציה, HTTPS אוטומטי, CDN גלובלי → אתר מהיר מכל מקום בעולם
- **GitHub Pages** = צריך הגדרה, לפעמים בעיות עם נתיבי קבצים

לאתר חד-עמודי סטטי, Vercel הוא הבחירה המהירה ביותר.

### למה Git + GitHub לפני Vercel?
Vercel מתחבר ל-GitHub ומפרסם כל `git push` אוטומטית.
כך כל עדכון שתעשי בקוד יתפרסם **תוך 30 שניות** ממש.

### העלאה ל-GitHub

```bash
# מתוך תיקיית solis-orange:
git init
echo "node_modules/" > .gitignore
git add .
git commit -m "SOLIS orange luxury scroll website"

# עברי ל-github.com, צרי repo חדש בשם solis-orange, ואז:
git remote add origin https://github.com/YOUR-USERNAME/solis-orange.git
git branch -M main
git push -u origin main
```

### פריסה ב-Vercel

```
1. vercel.com → "Sign In" עם GitHub
2. "Add New Project"
3. ייבאי את solis-orange מ-GitHub
4. השאירי הכל ברירת מחדל — אין מה להגדיר
5. "Deploy"
6. בעוד ~30 שניות — קישור חי ✅
```

> כתובת לדוגמה: `https://solis-orange.vercel.app`

---

## טבלת כל הקבצים + מקור כל אחד

| קובץ | נוצר איפה | שלב |
|------|-----------|-----|
| image-1-orange-whole.png | Higgsfield AI — Image | 2 |
| image-2-orange-sliced.png | Higgsfield AI — Image | 2 |
| image-3-segments-cascading.png | Higgsfield AI — Image | 2 |
| image-4-glass-juice-entering.png | Higgsfield AI — Image | 2 |
| image-5-glass-full-glowing.png | Higgsfield AI — Image | 2 |
| image-6-hands-wrapping-glass.png | Higgsfield AI — Image | 2 |
| dawn-product.png | Higgsfield AI — Image | 2 |
| dusk-product.png | Higgsfield AI — Image | 2 |
| night-product.png | Higgsfield AI — Image | 2 |
| newsletter-bg.png | Higgsfield AI — Image | 2 |
| collection-bg.png | Higgsfield AI — Image | 2 |
| orange-story.mp4 | Seedance 2.0 / Higgsfield → FFmpeg | 3+5 |
| card-press.mp4 | Seedance 2.0 / Higgsfield | 4 |
| card-pour.mp4 | Seedance 2.0 / Higgsfield | 4 |
| card-perfect.mp4 | Seedance 2.0 / Higgsfield | 4 |
| CLAUDE.md | ידנית | 6 |
| index.html | Claude Code | 7 |

---

## פלטת הצבעים של SOLIS + הגיון העיצוב

| שם | קוד | שימוש | למה |
|----|-----|-------|-----|
| Off-white | `#f5f0eb` | כל הטקסטים | קרם חם > לבן קר = מרגיש יוקרתי |
| Muted cream | `rgba(245,240,235,0.45)` | תוויות קטנות | שקוף חלקית = לא מתחרה בתוכן |
| Muted amber | `#a08060` | טקסט גוף | פחות קונטרסט = עין לא מתעייפת |
| Pure black | `#000000` | רקע | מדגיש כל צבע אחר כנגדו |
| Deep amber | `#7a3500` | פס התקדמות | כהה מספיק לראות, לא צועק |
| Vivid orange | `#e05c00` | כפתורים, קווים | נקודות הדגשה — לא טקסט |

---

## כללים קריטיים + הסבר למה

```
✗ אל תגדירי height על .h-sticky
  → GSAP מחשב את הגובה לפי מספר הפאנלים. height ידנית תשבור את החישוב.

✗ אל תוסיפי will-change:transform ל-#source-video
  → דפדפן מכניס את הוידאו ל-composite layer, מה שמוריד איכות על Retina.

✗ אל תשתמשי ב-GSAP pin:true וגם CSS sticky על אותו אלמנט
  → שניהם מנסים לשלוט במיקום האלמנט ומתנגשים.

✗ אל תשתמשי ב-window.scrollY לבד
  → לא מדויק כשיש Lenis (גלילה מניפולטיבית). getBoundingClientRect תמיד מדויק.

✗ אין canvas לוידאו
  → Canvas = ציור מחדש בכל פריים = כבד על CPU. video.currentTime = הרבה יותר יעיל.

✓ תמיד שני מאזינים: window וגם lenis.on("scroll")
  → Lenis "מחליף" את גלילת הדפדפן — בלי המאזין שלו, הוידאו לא יגיב.

✓ תמיד סיימי עם ScrollTrigger.refresh()
  → מחשב מחדש את כל המיקומים אחרי שהדף נטען מלא. בלי זה — אנימציות בטיימינג שגוי.
```

---

*SOLIS — Built with Claude Code · Higgsfield Seedance 2.0 · Vercel*
