---
name: luxury-web-reel
description: >-
  Guide the user through producing a luxury, cinematic Instagram portfolio reel
  from a website — screen recording, CapCut editing, optional 3D laptop mockup,
  end credit, and posting. Use when the user wants to film/record a website,
  turn a site into a reel, build a portfolio video, create a "camera filming a
  laptop" mockup, or polish a scroll capture for social. The user (Shani Gorgov,
  AI Creative Director) works in Hebrew on a Windows laptop + iPhone.
---

# Luxury Web Reel — production guide

You are guiding a non-technical creative through making a premium portfolio reel
from a live website. Respond in **Hebrew**. Give **one short step at a time**,
wait for a screenshot or confirmation, then continue. Never dump the whole
pipeline at once — she gets overwhelmed. Be warm and encouraging.

## Visual signature (the house style)

- **Pure black background** + **warm amber-gold spotlight** from above.
- Amber-gold accent hex: `#D4853A` / credit gold: `#D4A853`.
- Elegant serif fonts for titles: **Cormorant Garamond** or **Playfair Display**.
- Mood: dark, moody, expensive. Black > bright backgrounds, always.

## Pipeline overview (for your own planning — reveal step by step)

1. Record the site scrolling.
2. Trim the dead intro + speed up in CapCut.
3. (Optional) 3D laptop mockup in MockRocket.
4. Music + end credit in CapCut.
5. Export → post as Instagram Reel.

---

## 1. Screen recording

**Desktop (Chrome, Windows):**
- Open DevTools console with **Ctrl+Shift+J** (NOT F12 — on her ASUS it opens MyASUS).
- Type `allow pasting` (lowercase, exactly) before pasting any code.
- Paste the auto-scroll script (15s delay so she can hide the console + go fullscreen first):
  ```js
  setTimeout(() => {
    let pos = 0;
    const t = setInterval(() => {
      pos += 2;
      window.scrollTo(0, pos);
      if (pos >= document.body.scrollHeight - window.innerHeight) clearInterval(t);
    }, 16);
  }, 15000);
  ```
- Fullscreen via the browser **⋮ menu → fullscreen icon** (F11 opens her screenshot tool).
- Record with **Win+G → click the red ⏺** (Win+Alt+R doesn't work on her keyboard).
- Game Bar records ONE window only — finish ALL setup BEFORE pressing record, then don't switch windows.

**Mobile (iPhone) — often better, looks organic and posts directly:**
- Open the site in Safari, start iPhone screen recording, scroll slowly by hand.

## 2. Trim + speed up (CapCut)

- Import the recording. Drag the **left edge** right to cut the dead intro (before scrolling starts).
- Select clip → **Speed → Standard** → drag to ~**2.5x–2.9x** (dynamic but still readable).
- Quick math: final length ≈ original ÷ speed (e.g. 132.5s ÷ 2.9 ≈ 46s — perfect reel length).
- **Keep the browser bar visible** — it reads as authentic (real site, real URL). Don't hide it.

## 3. Optional — 3D laptop mockup (MockRocket)

Use **app.mockrocket.io** to wrap the recording on a 3D laptop ("camera filming a screen" look).
- Devices → MacBook Pro 16" → Import media → upload the trimmed/sped-up clip.
- Set scene **Duration** to match the clip length.
- Camera angle: a 3/4 view slightly from above reads most cinematic.
- Lighting: keep it subtle. **Venice sunset** tints the aluminium too copper/orange — for a realistic silver body use **Small studio** or **None** with low ambient.
- Keep the **black background** (the house style). The blue glow + colored axes are UI only — they won't render.

> **Known issue:** the MockRocket export can hang at 0%. If it sticks: Cancel render,
> refresh, try once more, or drop to 720p. If it still hangs, **skip the mockup** —
> the sped-up recording alone already looks premium. Don't let this block the reel.

## 4. Music + end credit (CapCut)

- **Audio → Music** → search `emotional dramatic cinematic` (the signature track used before).
- End credit, 3–4s, fade in, gold serif:
  ```
  Created by Shani Gorgov
  AI Creative Director
  ```
- Export: **1080p, 30fps**. On iPhone CapCut, tap the resolution chip (e.g. "UHD-ב") → set 1080p before tapping ייצוא; saves to the gallery in full quality.

## 5. Post as Instagram Reel

- Suggested caption (English, portfolio-style):
  ```
  SOLIS — Cold-Pressed Orange Juice
  A luxury digital experience, built with AI.

  Brand identity · Web design · Motion
  Created by Shani Gorgov | AI Creative Director

  #webdesign #aidesign #brandidentity #luxurybrand #uxdesign #portfolio
  ```
- Cover: a frame with the amber-gold product on black.
