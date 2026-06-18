const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2;

  // Deep purple background — like splash screen rgba(51,25,68)
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

  const bg = ctx.createRadialGradient(cx, cy*0.75, 0, cx, cy, size*0.8);
  bg.addColorStop(0,   '#2B1445');   // deep purple center
  bg.addColorStop(0.45,'#180D30');   // dark purple-navy
  bg.addColorStop(1,   '#0A0814');   // near-black edge
  ctx.fillStyle = bg;
  ctx.fill();

  // Purple glow ring — like splash backdrop
  const ring = ctx.createRadialGradient(cx, cy, 0, cx, cy, size*0.52);
  ring.addColorStop(0,  'rgba(100,40,160,0.35)');
  ring.addColorStop(0.5,'rgba(60,20,100,0.15)');
  ring.addColorStop(1,  'rgba(0,0,0,0)');
  ctx.fillStyle = ring;
  ctx.beginPath(); ctx.arc(cx,cy,size*0.52,0,Math.PI*2); ctx.fill();

  // Turquoise ambient — cyan shifted slightly blue
  const amb = ctx.createRadialGradient(cx, cy, 0, cx, cy, size*0.42);
  amb.addColorStop(0,  'rgba(0,220,255,0.20)');
  amb.addColorStop(0.6,'rgba(0,200,220,0.07)');
  amb.addColorStop(1,  'rgba(0,0,0,0)');
  ctx.fillStyle = amb;
  ctx.beginPath(); ctx.arc(cx,cy,size*0.42,0,Math.PI*2); ctx.fill();

  // ₪ — shifted blue-cyan (#00DCFF) so it reads turquoise not green
  const COLOR = '#00DCFF';
  const fontSize = size * 0.57;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 ' + fontSize + 'px Arial, sans-serif';

  [[size*0.18,0.12],[size*0.10,0.25],[size*0.05,0.52],[size*0.02,0.80]].forEach(function(l){
    ctx.shadowColor = COLOR;
    ctx.shadowBlur  = l[0];
    ctx.fillStyle   = 'rgba(0,220,255,' + l[1] + ')';
    ctx.fillText('₪', cx, cy*1.03);
  });
  ctx.shadowBlur = 0;
  ctx.fillStyle  = COLOR;
  ctx.fillText('₪', cx, cy*1.03);

  return c.toBuffer('image/png');
}

[180,192,512].forEach(function(s){
  fs.writeFileSync('icon-'+s+'.png', makeIcon(s));
  console.log('icon-'+s+'.png');
});
fs.writeFileSync('favicon.png', makeIcon(32));
console.log('favicon.png');
