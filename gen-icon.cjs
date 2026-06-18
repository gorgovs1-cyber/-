const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2;

  const bg = ctx.createRadialGradient(cx, cy * 0.8, 0, cx, cy, size * 0.75);
  bg.addColorStop(0,   '#1A103A');
  bg.addColorStop(0.5, '#0D0A1E');
  bg.addColorStop(1,   '#0A0814');
  ctx.fillStyle = bg;
  const r = size * 0.22;
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  const amb = ctx.createRadialGradient(cx, cy * 0.95, 0, cx, cy, size * 0.5);
  amb.addColorStop(0,   'rgba(0,255,212,0.18)');
  amb.addColorStop(0.55,'rgba(0,255,212,0.06)');
  amb.addColorStop(1,   'rgba(0,255,212,0)');
  ctx.fillStyle = amb;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.fill();

  const fontSize = size * 0.58;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `600 ${fontSize}px Arial, sans-serif`;

  const layers = [
    { blur: size * 0.16, alpha: 0.15 },
    { blur: size * 0.09, alpha: 0.28 },
    { blur: size * 0.045,alpha: 0.55 },
    { blur: size * 0.018,alpha: 0.82 },
  ];
  for (const l of layers) {
    ctx.shadowColor = '#00FFD4';
    ctx.shadowBlur = l.blur;
    ctx.fillStyle = 'rgba(0,255,212,' + l.alpha + ')';
    ctx.fillText('₪', cx, cy * 1.04);
  }

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#00FFD4';
  ctx.fillText('₪', cx, cy * 1.04);

  return c.toBuffer('image/png');
}

[180, 192, 512].forEach(function(s) {
  const buf = makeIcon(s);
  fs.writeFileSync('icon-' + s + '.png', buf);
  console.log('icon-' + s + '.png');
});
fs.writeFileSync('favicon.png', makeIcon(32));
console.log('favicon.png');
