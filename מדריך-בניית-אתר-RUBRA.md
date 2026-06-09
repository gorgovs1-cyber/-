# מדריך: בניית אתר לוקסוס סינמטי עם גלילה — סגנון RUBRA

**מה בונים:** אתר חד-עמודי עם וידאו שנגלל פריים-פריים לפי הגלילה, אנימציות, ועיצוב יוקרתי.  
**כלים:** Higgsfield AI · Seedance 2.0 · Claude Code (תוסף VS Code) · Vercel  
**מקור:** Dhiraj Sarkar — AutomationX

---

## שלב 1 — יצירת תיקיית פרויקט

צור תיקייה חדשה ריקה בשם `rubra-pomegranate`.  
בסוף התהליך, המבנה יראה כך:

```
rubra-pomegranate/
├── CLAUDE.md                  ← קובץ חוקים (תיצור אותו)
├── index.html                 ← Claude Code יבנה אותו
├── pomegranate-story.mp4      ← וידאו גיבור (15 שניות)
├── dawn-product.png
├── dusk-product.png
├── night-product.png
├── newsletter-bg.png
├── collection-bg.png
├── card-press.mp4             ← 4 שניות לולאה
├── card-pour.mp4              ← 4 שניות לולאה
└── card-perfect.mp4           ← 4 שניות לולאה
```

> **חשוב:** כל קבצי התמונות הם `.png` — לא `.jpg`.

---

## שלב 2 — יצירת 11 תמונות עם Higgsfield AI

צור את התמונות **לפי הסדר**. מתמונה 2 ואילך — **העלה את התמונה הקודמת כ-Reference** לשמירת עקביות בתאורה וזווית המצלמה.

### 2.1 — 6 תמונות מפתח לוידאו (Keyframes)

| # | שם קובץ | Reference |
|---|---------|-----------|
| 1 | image-1-pomegranate-whole.png | ללא |
| 2 | image-2-pomegranate-cracked.png | image-1 |
| 3 | image-3-seeds-cascading.png | image-2 |
| 4 | image-4-glass-seeds-entering.png | image-3 |
| 5 | image-5-glass-full-glowing.png | image-4 |
| 6 | image-6-hands-wrapping-glass.png | image-5 |

**פרומפטים:**

**תמונה 1 — image-1-pomegranate-whole.png** (ללא Reference)
```
A single whole pomegranate floating in the exact vertical center of the frame,
pure black background, dramatic warm crimson-amber spotlight from directly above,
deep red skin with a natural crown at the top, surface texture rich and leathery
with subtle highlights, floating completely in mid-air with no surface no floor
no table beneath it, subtle deep red glow underneath, ultra photorealistic 8K,
luxury wellness product photography, no text no labels no watermarks
```

**תמונה 2 — image-2-pomegranate-cracked.png** (Reference: תמונה 1)
```
The same pomegranate now dramatically cracked open in the exact vertical center,
pure black background, warm crimson-amber spotlight from directly above,
the outer skin split wide revealing hundreds of glistening ruby-red seeds each
catching the light like a precious gemstone, a few seeds floating outward in
perfect orbital formation, floating completely in mid-air no surface no floor,
ultra photorealistic 8K, no text no labels no watermarks
```

**תמונה 3 — image-3-seeds-cascading.png** (Reference: תמונה 2)
```
Hundreds of glistening ruby-red pomegranate seeds freed from the fruit and
cascading downward in slow motion, pure black background, warm crimson-amber
spotlight from directly above, seeds falling like a waterfall of precious rubies
each catching the light with a deep jewel-like glow, some seeds trailing thin
threads of deep red juice, ultra photorealistic 8K, no text no labels no watermarks
```

**תמונה 4 — image-4-glass-seeds-entering.png** (Reference: תמונה 3)
```
A stunning handblown glass cup with no handles floating in the exact vertical center,
pure black background, dramatic warm crimson-amber spotlight from directly above,
crystal clear thin walls, small amount of deep red juice at the bottom, hundreds of
ruby-red seeds actively falling from above into the glass in dramatic slow motion,
tiny crimson splashes where seeds hit the juice surface, floating completely in
mid-air no surface no floor no table, ultra photorealistic 8K, no watermarks
```

**תמונה 5 — image-5-glass-full-glowing.png** (Reference: תמונה 4)
```
The same handblown glass cup now completely filled with rich deep red pomegranate
juice glowing from within like liquid ruby, dozens of seeds visible floating at
different depths through the crystal clear glass walls, the liquid radiating a deep
crimson-red light from within, thin layer of rich red foam at the very top,
floating completely in mid-air no surface no floor, ultra photorealistic 8K,
no text no labels no watermarks
```

**תמונה 6 — image-6-hands-wrapping-glass.png** (Reference: תמונה 5)
```
The same glass cup filled with glowing deep red pomegranate juice floating in
the exact vertical center, pure black background, warm crimson-amber spotlight
from above, two elegant hands entering the frame from both sides, fingers gently
curling around the outside of the glass, the deep red glow casting a subtle
crimson hue on the skin, floating completely in mid-air no surface no floor,
ultra photorealistic 8K, no text no labels no watermarks
```

---

### 2.2 — 3 תמונות מוצר

השתמש ב-dawn-product.png כ-Reference גם ל-DUSK וגם ל-NIGHT.

**dawn-product.png** (ללא Reference)
```
A single premium luxury pomegranate juice tin floating in the exact center,
pure black background, warm golden morning light from above at 45 degrees,
deep midnight navy matte finish, the word DAWN in small elegant gold lettering,
beside it three loose glistening pomegranate seeds and a piece of dried pomegranate
skin, floating in mid-air no surface no floor, ultra photorealistic 8K,
luxury wellness brand product photography, no watermarks
```

**dusk-product.png** (Reference: dawn-product.png)
```
A single premium luxury pomegranate juice tin floating in the exact center,
pure black background, warm amber evening light from above at 45 degrees,
deep burgundy wine-red matte finish, the word DUSK in small elegant gold lettering,
beside it three loose glistening pomegranate seeds and a dried rose petal,
floating in mid-air no surface no floor, ultra photorealistic 8K,
luxury wellness brand product photography, no watermarks
```

**night-product.png** (Reference: dawn-product.png)
```
A single premium luxury pomegranate juice tin floating in the exact center,
pure black background, cool silver moonlight from above at 45 degrees,
deep matte black finish, the word NIGHT in small elegant silver lettering,
beside it three loose glistening pomegranate seeds and a single small dried flower,
floating in mid-air no surface no floor, ultra photorealistic 8K,
luxury wellness brand product photography, no watermarks
```

---

### 2.3 — 2 תמונות רקע

**newsletter-bg.png** (ללא Reference)
```
A vast pomegranate orchard at golden hour, rows of pomegranate trees heavy with
deep red ripe fruit stretching to the horizon, warm amber-gold late afternoon sun
raking across the orchard from the left, some pomegranates cracked open revealing
ruby seeds, soft golden mist hovering between the trees, highly cinematic
perspective slightly elevated, ultra photorealistic 8K, no people no text no watermarks
```

**collection-bg.png** (ללא Reference)
```
A vast dark pomegranate orchard at deep twilight, rows of trees stretching to the
horizon, the sky near-black deep navy with a faint ember-crimson glow at the very
bottom, a few ripe pomegranates glowing deep red on dark branches, atmospheric dark
mist between the trees, extremely cinematic, moody, ultra dark luxury editorial feel,
no people no text no watermarks, ultra photorealistic 8K
```

---

## שלב 3 — יצירת וידאו הגיבור (15 שניות)

**כלי:** Seedance 2.0 על Higgsfield.ai  
**שמור כ:** `pomegranate-story.mp4`

העלה את כל 6 התמונות ל-Higgsfield ותייג כל אחת עם `@` בפרומפט:

```
Using [@image-1] [@image-2] [@image-3] [@image-4] [@image-5] [@image-6]
create a single continuous 15-second cinematic video in this exact sequence.

Start with [@image-1] whole pomegranate floating in darkness, hold 2 seconds.
Slowly transition into [@image-2] as the pomegranate cracks open revealing
glowing ruby seeds, hold 2 seconds.
Smoothly transition into [@image-3] as hundreds of seeds burst free and cascade
downward like falling rubies in slow motion, hold 3 seconds.
Transition into [@image-4] as seeds enter a crystal glass and crimson splashes
bloom on impact, hold 3 seconds.
Slowly dissolve into [@image-5] as the glass fills completely with deep glowing
red liquid like liquid ruby, hold 2 seconds.
Final transition into [@image-6] as two elegant hands enter from both sides
and gently wrap around the glowing glass, hold 3 seconds.

Pure black background throughout. No cuts, only smooth slow morphing transitions.
Warm crimson-amber spotlight from above throughout.
Ultra cinematic, slow motion, luxury wellness brand feel. No text no watermarks.
```

---

## שלב 4 — יצירת 3 וידאו כרטיסים (4 שניות כל אחד)

**כלי:** Seedance 2.0 על Higgsfield  
העלה תמונת התחלה מתאימה לכל כרטיס.

**card-press.mp4**
```
Using this image as the start frame, create a slow motion 4-second cinematic loop.
The pomegranate is cold-pressed by two hands, ruby juice slowly emerges and drips
downward, seeds glisten and catch the crimson spotlight, juice droplets fall in
ultra slow motion suspended like rubies, pure black background throughout,
warm crimson spotlight from above, no camera movement, loop-friendly ending
```

**card-pour.mp4**
```
Using this image as the start frame, create a slow motion 4-second cinematic loop.
A thin stream of deep ruby pomegranate juice pours continuously from above into
the crystal glass, the stream glows like liquid gemstone, seeds fall alongside
in ultra slow motion, pure black background throughout, no camera movement,
warm crimson spotlight from above, loop-friendly ending
```

**card-perfect.mp4**
```
Using this image as the start frame, create a slow motion 4-second cinematic loop.
The glass cup full of glowing ruby pomegranate juice floats in pure black,
three seeds slowly drift and rotate inside the liquid visible through the glass,
tiny bubbles rise gently, the liquid glows deep crimson pulsing like a heartbeat,
fine mist rises from the top, pure black background, no camera movement,
loop-friendly ending
```

---

## שלב 5 — קידוד מחדש של הוידאו עם FFmpeg

> **חובה!** בלי שלב זה הוידאו לא יגלל חלק — הדפדפן לא יצליח לקפוץ בין פריימים.

הרץ בטרמינל מתוך תיקיית הפרויקט:

```bash
ffmpeg -i pomegranate-story.mp4 \
  -vf scale=960:-1 \
  -movflags faststart \
  -vcodec libx264 \
  -crf 20 \
  -g 1 \
  -pix_fmt yuv420p \
  pomegranate-story-scrub.mp4
```

לאחר מכן שנה שם `pomegranate-story-scrub.mp4` ל-`pomegranate-story.mp4` והחלף את הקובץ המקורי.

---

## שלב 6 — יצירת קובץ CLAUDE.md

צור קובץ בשם `CLAUDE.md` בתיקיית הפרויקט עם התוכן הבא **בדיוק**:

```markdown
# RUBRA — Project Rules
# Read this entire file before writing any code.

## WHAT YOU ARE BUILDING
Single-file luxury scroll website for a pomegranate wellness brand called RUBRA.
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

## COLORS — RULE: Red is NEVER used as text color
#f5f0eb          off-white    ALL text, headings, nav, product names
rgba(245,240,235,0.45)  muted cream  Section eyebrow labels
#a08080          muted rose   Body and description text
#000000          black        Body background, footer
#8b0000          deep crimson Progress bar background only
#c0002a          ruby red     Buttons, accent lines, card borders

## FONTS
Cormorant Garamond — all display/headings
Inter              — all body/labels

## ASSETS
All image files are .png — not .jpg. Always use .png extensions.

## ALWAYS END THE SCRIPT WITH
ScrollTrigger.refresh();
```

---

## שלב 7 — בניית האתר עם Claude Code

1. פתח **VS Code**
2. פתח את תיקיית `rubra-pomegranate` (File → Open Folder)
3. הפעל את **תוסף Claude Code** ב-VS Code
4. הדבק את הפרומפט הבא **בשלמותו**:

```
Read CLAUDE.md fully before writing anything.
Build index.html for RUBRA. All assets are in this folder.
Single file only. No npm. No server. Open directly in browser.
Build in this order. Confirm each step works before continuing.

STEP 1 — LENIS + GSAP
Set up Lenis and GSAP ScrollTrigger using exact CDN imports from CLAUDE.md.

STEP 2 — HERO VIDEO SCRUB
Use exact HTML, CSS and JS from CLAUDE.md. Video: pomegranate-story.mp4.
Text overlays (opacity 0 default, transition: opacity 0.6s ease):
progress 0.15–0.25: RUBY — 96px Cormorant Garamond #f5f0eb weight 300 centered
progress 0.35–0.45: Born from ancient orchards. 28px italic Cormorant Garamond #f5f0eb centered
progress 0.55–0.67: PRESS · POUR · PERFECT  72px Cormorant Garamond #f5f0eb centered
progress 0.70–0.80: Three seeds changed everything. 12px Inter uppercase letter-spacing 4px #f5f0eb position top 10% left 8%
Nav: RUBRA fixed top-left + SHOP fixed top-right 11px Cormorant Garamond, color #f5f0eb, letter-spacing 5px, z-index 100
Progress bar: fixed 2px wide right edge, background #8b0000, height grows 0 to 100vh as scroll progress goes 0 to 1

STEP 3 — STICKY PRODUCT EXPLAINER
Left 50%: product image, position sticky top 0, height 100vh.
Starts with dawn-product.png. Swaps on scroll via IntersectionObserver.
Right 50%: three 100vh panels. Use CSS sticky only — NO GSAP pin here.
Panel 1 DAWN: "Your morning starts here." — dawn description
Panel 2 DUSK: "The golden hour, bottled." — dusk description
Panel 3 NIGHT: "While you sleep, it works." — night description

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
Layers: vignette → film grain → crimson light sweep → bottom fade.
Text z-index 5: accent line + number 01/02/03 + word PRESS/POUR/PERFECT + desc.
Word: clamp(72px,10vw,110px) Cormorant Garamond #f5f0eb.
Sweep delay stagger: Card1=0s Card2=1.3s Card3=2.6s.

STEP 6 — PARALLAX STATEMENT
100vh. newsletter-bg.png moves at 0.4x scroll speed. Overlay rgba(0,0,0,0.72).
"Drink what / the earth intended." 80px Cormorant Garamond #f5f0eb italic.
Tagline: RUBRA — Since the first harvest. 10px Inter cream uppercase.

STEP 7 — REVERSE COLUMNS
3-column grid 80vh. All use newsletter-bg.png.
Cols 1+3: translateY(-8% to +8%). Col 2: translateY(+8% to -8%).
Vignette + "Born from the earth." italic overlay centered.

STEP 8 — PRODUCT COLLECTION GRID
Background #0a0005. Heading THE COLLECTION 10px Inter cream uppercase.
3 product cards: dawn/dusk/night-product.png.
Names DAWN DUSK NIGHT in #f5f0eb Cormorant Garamond.
DAWN: "Morning ritual. Pressed at dawn."
DUSK: "Golden hour. Ruby at its warmest."
NIGHT: "Deep restore. While the world sleeps."

STEP 9 — NEWSLETTER
newsletter-bg.png background, overlay rgba(0,0,0,0.60).
JOIN THE RITUAL 52px Cormorant Garamond #ffffff centered.
Email input + SUBSCRIBE button background #8b0000.

STEP 10 — FOOTER
Background #000000. RUBRA centered Cormorant Garamond 16px #f5f0eb.
© 2026 RUBRA. All rights reserved. 12px Inter #444444.

END: ScrollTrigger.refresh(); as the very last line.
```

> Claude Code יקרא את `CLAUDE.md` אוטומטית ויבנה את `index.html` המלא.

---

## שלב 8 — בדיקה מקומית

הרץ שרת מקומי:

```bash
cd /path/to/rubra-pomegranate
python3 -m http.server 8080
```

פתח בדפדפן: `http://localhost:8080`

**רשימת בדיקה:**
- [ ] וידאו נגלל פריים-פריים בגלילה איטית
- [ ] טקסטים נדעכים ומופיעים בנקודות הנכונות
- [ ] תמונת המוצר מתחלפת DAWN → DUSK → NIGHT
- [ ] רכבת אופקית: 4 פאנלים ללא רווחים שחורים
- [ ] כרטיסים מוערמים עם וידאו ברקע
- [ ] פרלקס, עמודות הפוכות, גריד מוצרים — תקינים
- [ ] ניוזלטר ופוטר נראים טוב

> **Refresh קשה:** `Cmd+Shift+R` (Mac) | `Ctrl+Shift+R` (Windows) אחרי כל שינוי.

---

## שלב 9 — פריסה ב-Vercel

### העלאה ל-GitHub

```bash
git init
echo "node_modules/" > .gitignore
git add .
git commit -m "RUBRA pomegranate luxury scroll website"

# צור repo חדש ב-github.com ואז:
git remote add origin https://github.com/YOUR-USERNAME/rubra-pomegranate.git
git branch -M main
git push -u origin main
```

### פריסה ב-Vercel

1. כנס ל-[vercel.com](https://vercel.com) והתחבר
2. לחץ **Add New Project**
3. ייבא את ה-repository מ-GitHub
4. השאר את כל ההגדרות כברירת מחדל
5. לחץ **Deploy**

> `index.html` הוא קובץ סטטי — Vercel פורס מיידית ללא כל קונפיגורציה.

---

## טבלת סיכום — כל הכלים והשלבים

| שלב | כלי | פעולה |
|-----|-----|-------|
| 1 | - | יצירת תיקיית פרויקט |
| 2 | Higgsfield AI | יצירת 11 תמונות |
| 3 | Seedance 2.0 / Higgsfield | וידאו גיבור 15 שניות |
| 4 | Seedance 2.0 / Higgsfield | 3 וידאו כרטיסים × 4 שניות |
| 5 | FFmpeg | קידוד מחדש לגלילה חלקה |
| 6 | כל עורך טקסט | יצירת CLAUDE.md |
| 7 | Claude Code + VS Code | בניית index.html המלא |
| 8 | Python | בדיקה מקומית |
| 9 | GitHub + Vercel | פריסה חיה |

---

## כללים קריטיים — לעולם לא לשבור

- אל תגדיר `height` על `.h-sticky` — GSAP מנהל את הגובה אוטומטית
- אל תוסיף `will-change:transform` או `transform:translateZ(0)` ל-`#source-video`
- אל תשתמש ב-GSAP `pin:true` ו-CSS `position:sticky` על אותו אלמנט
- אל תשתמש ב-`window.scrollY` לבד — תמיד `getBoundingClientRect()`
- אין `canvas` — גלילת וידאו רק דרך `video.currentTime`
- תמיד צרף שני מאזינים: `window` וגם `lenis.on("scroll")`
- כל התמונות הן `.png` — תמיד השתמש בסיומת `.png`
- תמיד סיים את בלוק הסקריפט עם `ScrollTrigger.refresh()`

---

*מדריך מבוסס על: Dhiraj Sarkar — AutomationX (2026)*
