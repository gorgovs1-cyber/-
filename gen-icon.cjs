const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  const cx = size/2, cy = size/2;

  // Background — near-black like splash #0A0814
  const r = size * 0.22;
  ctx.beginPath();
  ctx.moveTo(r,0); ctx.lineTo(size-r,0);
  ctx.quadraticCurveTo(size,0,size,r);
  ctx.lineTo(size,size-r);
  ctx.quadraticCurveTo(size,size,size-r,size);
  ctx.lineTo(r,size);
  ctx.quadraticCurveTo(0,size,0,size-r);
  ctx.lineTo(0,r);
  ctx.quadraticCurveTo(0,0,r,0);
  ctx.closePath();
  ctx.fillStyle = '#08060E';
  ctx.fill();

  // Subtle dark-purple radial behind symbol (matches splash backdrop)
  const bg2 = ctx.createRadialGradient(cx, cy*0.9, 0, cx, cy, size*0.55);
  bg2.addColorStop(0,  'rgba(40,18,62,0.7)');
  bg2.addColorStop(0.6,'rgba(20,10,38,0.4)');
  bg2.addColorStop(1,  'rgba(0,0,0,0)');
  ctx.fillStyle = bg2;
  ctx.beginPath(); ctx.arc(cx,cy,size*0.55,0,Math.PI*2); ctx.fill();

  // ₪ — exact splash color #00FFD4 + brightness(1.15) ≈ #17FFE0
  const COLOR = '#17FFE0';
  const GLOW  = 'rgba(0,255,212,';
  const fs2 = size * 0.60;
  ctx.font = '700 ' + fs2 + 'px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Layer 1 — wide outer glow (like 50px at 120px font = 0.42 ratio)
  ctx.shadowColor = COLOR; ctx.shadowBlur = size*0.42;
  ctx.fillStyle = GLOW + '0.45)'; ctx.fillText('₪', cx, cy*1.02);

  // Layer 2 — mid glow
  ctx.shadowBlur = size*0.20;
  ctx.fillStyle = GLOW + '0.65)'; ctx.fillText('₪', cx, cy*1.02);

  // Layer 3 — tight glow
  ctx.shadowBlur = size*0.07;
  ctx.fillStyle = GLOW + '0.85)'; ctx.fillText('₪', cx, cy*1.02);

  // Layer 4 — crisp solid
  ctx.shadowBlur = size*0.025;
  ctx.fillStyle = COLOR; ctx.fillText('₪', cx, cy*1.02);

  // Final sharp pass (no shadow)
  ctx.shadowBlur = 0;
  ctx.fillStyle = COLOR; ctx.fillText('₪', cx, cy*1.02);

  return c.toBuffer('image/png');
}

[180,192,512].forEach(function(s){
  fs.writeFileSync('icon-'+s+'.png', makeIcon(s));
  console.log('icon-'+s+'.png');
});
fs.writeFileSync('favicon.png', makeIcon(32));
console.log('favicon.png');
