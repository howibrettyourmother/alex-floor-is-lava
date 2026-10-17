// ================= UI, HUD, menus, loop =================
let UI=[],HUDB=[],tapFlash=0,saidLegend=false,endStats=null,heroHop=0;
function btn(id,x,y,w,h){UI.push({id,x,y,w,h})}
function bigBtn(id,label,cx,cy,w,h,c1,c2,pulse){const s=pulse?1+Math.sin(T*4)*0.04:1;X.save();X.translate(cx,cy);X.scale(s,s);
  rrect(-w/2,-h/2+5,w,h,h/2);X.fillStyle='rgba(60,10,20,0.45)';X.fill();rrect(-w/2,-h/2,w,h,h/2);const g=X.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.fill();
  X.strokeStyle='#fff';X.lineWidth=3;X.stroke();X.fillStyle='rgba(255,255,255,0.35)';rrect(-w/2+10,-h/2+5,w-20,h*0.3,h*0.15);X.fill();txt(label,0,2,h*0.42,'#fff',{st:'#8a2a0a',sw:5});X.restore();btn(id,cx-w/2,cy-h/2,w,h)}
function roundIcon(id,cx,cy,r,draw,list){circ(cx,cy,r+2,'rgba(0,0,0,0.25)');circ(cx,cy,r,'rgba(255,255,255,0.9)');X.save();X.translate(cx,cy);draw();X.restore();(list||UI).push({id,x:cx-r-9,y:cy-r-9,w:2*r+18,h:2*r+18})}
function muteIcon(){X.fillStyle='#5a2a1a';X.beginPath();X.moveTo(-9,-4);X.lineTo(-4,-4);X.lineTo(2,-9);X.lineTo(2,9);X.lineTo(-4,4);X.lineTo(-9,4);X.fill();X.strokeStyle='#5a2a1a';X.lineWidth=2;X.lineCap='round';
  if(AUD.muted){X.strokeStyle='#e53935';X.beginPath();X.moveTo(5,-5);X.lineTo(11,5);X.moveTo(11,-5);X.lineTo(5,5);X.stroke()}else{X.beginPath();X.arc(3,0,5,-0.9,0.9);X.stroke();X.beginPath();X.arc(3,0,9,-0.9,0.9);X.stroke()}}
function pauseIcon(){X.fillStyle='#5a2a1a';rrect(-7,-8,5,16,2);X.fill();rrect(2,-8,5,16,2);X.fill()}
const insL=()=>portrait?0:INS.l/SC,insR=()=>portrait?0:INS.r/SC;
// ---------- HUD ----------
function drawHUD(){HUDB=[];const p=8+insL(),t=8;rrect(p,t,214,34,17);X.fillStyle='rgba(40,10,30,0.45)';X.fill();
  for(let i=0;i<3;i++){const on=i<hearts,pulse=on&&hearts===1?1+Math.sin(T*8)*0.1:1;X.save();X.translate(p+20+i*24,t+18);X.scale(pulse,pulse);heart(0,0,10,on?'#ff4d6d':'rgba(255,255,255,0.25)');if(on){ell(-3,-4,2.5,1.6,'rgba(255,255,255,0.7)')}X.restore()}
  X.save();X.translate(p+102,t+17);X.scale(0.8,0.8);drawCoinStatic();X.restore();txt(''+coins,p+114,t+18,16,'#fff',{a:'left',sw:3});
  drawGemIcon(p+160,t+17);txt(gems+'',p+172,t+18,16,'#fff',{a:'left',sw:3});
  let px=p+6;const h=hero;const chip=(tp,frac)=>{rrect(px,t+40,34,34,10);X.fillStyle='rgba(40,10,30,0.45)';X.fill();powIcon(tp,px+17,t+57,0.9);if(frac!=null){X.strokeStyle=POW_COL[tp];X.lineWidth=3;X.beginPath();X.arc(px+17,t+57,15,-Math.PI/2,-Math.PI/2+TAU*frac);X.stroke()}px+=40};
  if(h){if(h.pw.boots>0)chip('boots',h.pw.boots/POW_T.boots);if(h.pw.rocket>0)chip('rocket',h.pw.rocket/POW_T.rocket);if(h.pw.shield)chip('shield',null)}
  const cx=Math.max(VW/2,p+214+62);txt(LEVELS[lvI].name,cx,t+12,12,'#fff',{sw:3});txt(String(score).padStart(5,'0'),cx,t+31,16,'#ffe14d',{sw:3});
  const rx=VW-8-insR();roundIcon('pause',rx-20,t+19,17,pauseIcon,HUDB);roundIcon('mute',rx-62,t+19,17,muteIcon,HUDB);
  if(boss&&boss.st!=='happy'){const bw=150,bx=cx-bw/2,by=t+44;rrect(bx,by,bw,22,11);X.fillStyle='rgba(40,10,30,0.55)';X.fill();txt('KING',bx+24,by+11,11,'#ffd23f',{sw:0});for(let i=0;i<3;i++){X.save();X.translate(bx+64+i*28,by+11);star(0,0,9,i<boss.hp?'#ffd23f':'rgba(255,255,255,0.25)');X.restore()}}}
function drawCoinStatic(){ell(0,0,10,11,'#b8760f');ell(0,0,8.5,9.5,'#ffd23f');X.fillStyle='#fff3a8';X.fillRect(-1.5,-5,3,10)}
function drawGemIcon(x,y){X.beginPath();X.moveTo(x-9,y-3);X.lineTo(x-4.5,y-9);X.lineTo(x+4.5,y-9);X.lineTo(x+9,y-3);X.lineTo(x,y+10);X.closePath();X.fillStyle='#4dd6ff';X.fill();X.fillStyle='rgba(255,255,255,0.6)';X.beginPath();X.moveTo(x-4.5,y-9);X.lineTo(x,y-3);X.lineTo(x-9,y-3);X.fill()}
function hudTap(p){for(const b of HUDB){if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){if(b.id==='pause'){paused=true;clearInput();AUD.SFX.click()}else toggleMute();return true}}return false}
// ---------- on-screen controls (CSS px) ----------
function drawControls(){if(!(state==='play'||state==='card'))return;const c=ctl(),k=c.k;X.setTransform(DPR,0,0,DPR,0,0);
  const arrow=(b,d,on)=>{circ(b.x,b.y+3,b.r,'rgba(0,0,0,0.22)');circ(b.x,b.y,b.r,on?'rgba(255,230,160,0.75)':'rgba(255,255,255,0.32)');X.strokeStyle='rgba(255,255,255,0.8)';X.lineWidth=3;X.beginPath();X.arc(b.x,b.y,b.r,0,TAU);X.stroke();
    X.fillStyle=on?'#8a2a0a':'rgba(255,255,255,0.95)';X.beginPath();X.moveTo(b.x+d*b.r*0.45,b.y);X.lineTo(b.x-d*b.r*0.25,b.y-b.r*0.42);X.lineTo(b.x-d*b.r*0.25,b.y+b.r*0.42);X.closePath();X.fill()};
  X.globalAlpha=autoRun?0.6:1;arrow(c.L,-1,inp.l&&!bot.on);arrow(c.R,1,inp.r&&!bot.on);X.globalAlpha=1;
  if(autoRun){const bx=(c.L.x+c.R.x)/2,by=c.L.y-c.L.r-16*k,bw=150*k,bh=24*k;X.beginPath();X.roundRect?X.roundRect(bx-bw/2,by-bh/2,bw,bh,bh/2):X.rect(bx-bw/2,by-bh/2,bw,bh);X.fillStyle='rgba(82,214,106,0.9)';X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();
    X.font='bold '+Math.round(13*k)+'px '+FONT;X.textAlign='center';X.textBaseline='middle';X.fillStyle='#fff';X.fillText('AUTO-RUN ON \u25B6',bx,by+1)}
  const J=c.J,on=inp.j;circ(J.x,J.y+4,J.r,'rgba(0,0,0,0.25)');const g=X.createRadialGradient(J.x-J.r*0.3,J.y-J.r*0.4,4,J.x,J.y,J.r);g.addColorStop(0,on?'#fff2a8':'#ffd23f');g.addColorStop(1,on?'#ffb02e':'#ff6a1f');
  X.fillStyle=g;X.beginPath();X.arc(J.x,J.y,J.r*(on?0.94:1),0,TAU);X.fill();X.strokeStyle='#fff';X.lineWidth=4;X.stroke();
  X.fillStyle='#fff';X.beginPath();X.moveTo(J.x,J.y-J.r*0.55);X.lineTo(J.x-J.r*0.25,J.y-J.r*0.22);X.lineTo(J.x+J.r*0.25,J.y-J.r*0.22);X.fill();
  X.font='bold '+Math.round(J.r*0.4)+'px '+FONT;X.textAlign='center';X.textBaseline='middle';X.lineWidth=4;X.strokeStyle='#a33a0a';X.strokeText('JUMP',J.x,J.y+J.r*0.15);X.fillText('JUMP',J.x,J.y+J.r*0.15);
  if(hero&&hero.pw.rocket>0&&!hero.ground){X.font='bold '+Math.round(11*k)+'px '+FONT;X.fillStyle='#bff3ff';X.fillText('AGAIN!',J.x,J.y-J.r-10*k)}}
function drawPortraitFrame(){X.setTransform(DPR,0,0,DPR,0,0);const g=X.createLinearGradient(0,0,0,SH);g.addColorStop(0,'#3a1240');g.addColorStop(1,'#7a1f2a');X.fillStyle=g;X.fillRect(0,0,SW,SH);
  if(TAB){const y0=OY+VH*SC,g2=X.createLinearGradient(0,y0,0,SH);g2.addColorStop(0,'#e8551c');g2.addColorStop(0.35,'#a8241a');g2.addColorStop(1,'#4a0f1c');X.fillStyle=g2;X.fillRect(0,y0,SW,SH-y0);X.fillStyle='rgba(255,210,63,0.25)';for(let i=0;i<9;i++){const bx=(i*137+T*18*(i%3+1))%SW,by=y0+20+((i*61)%Math.max(1,SH-y0-40));X.beginPath();X.arc(bx,by,6+i%4*3,0,TAU);X.fill()}return}const ty=Math.max(INS.t+10,OY-70);X.save();X.translate(SW/2-110,ty+30);X.rotate(Math.sin(T*2)>0?-Math.PI/2*ease((Math.sin(T*2))):0);rrect(-12,-20,24,40,5);X.fillStyle='#fff';X.fill();rrect(-9,-15,18,28,2);X.fillStyle='#ff8a3d';X.fill();X.restore();
  X.font='bold 17px '+FONT;X.textAlign='left';X.textBaseline='middle';X.fillStyle='#ffe14d';X.fillText('Turn your phone sideways',SW/2-86,ty+20);X.fillStyle='#fff';X.font='bold 14px '+FONT;X.fillText('for BIG lava fun!',SW/2-86,ty+42)}
// ---------- title ----------
function drawTitle(){const W=VW;camX=200+Math.sin(T*0.12)*200;camY=0;lavaY=L0;drawBG('summit');
  const vx=W*0.62-camX*0.03,vy=330-165*1.25;if(R()<0.5)parts.push({x:vx+rr(-20,20)+camX,y:vy+camY,vx:rr(-90,90),vy:rr(-420,-250),life:0,max:rr(0.8,1.4),col:pick(['#ffd23f','#ff7b1f','#ff4d2e','#fff2a8']),sz:rr(3,6),g:420,k:'dot'});
  X.save();X.translate(-camX,-camY);drawParts();X.restore();
  drawLava();const rx=W*0.2,ry=262;X.fillStyle='#3e2a3a';X.beginPath();X.moveTo(rx-80,ry+60);X.lineTo(rx-70,ry+4);X.quadraticCurveTo(rx,ry-8,rx+70,ry+4);X.lineTo(rx+80,ry+60);X.fill();rrect(rx-74,ry-2,148,12,6);X.fillStyle='#6a4a5a';X.fill();
  heroHop=(T%2.6);const hop=heroHop<0.5?Math.sin(heroHop/0.5*Math.PI)*34:0;drawHero(rx,ry-hop,{face:1,cheer:heroHop>0.4&&heroHop<1.6,air:hop>2,moving:false,title:1,scale:W<560?1.5:1.8});txt('ALEX',rx,ry+26,13,'#ffd23f',{st:'#2a1020',sw:4});
  const tw=Math.sin(T*2)*2;txt('THE FLOOR IS',W/2,40+tw,28,'#fff',{st:'#5a1a2a',sw:6});
  const word='LAVA!';X.font='bold 66px '+FONT;let ww=0;const ws=[...word].map(ch=>{const w=X.measureText(ch).width;ww+=w;return w});let lx=W/2-ww/2;
  [...word].forEach((ch,i)=>{const y=92+Math.sin(T*3+i*0.8)*5;const g=X.createLinearGradient(0,y-30,0,y+30);g.addColorStop(0,'#fff27a');g.addColorStop(0.5,'#ffb02e');g.addColorStop(1,'#ff3d1f');txt(ch,lx+ws[i]/2,y,66,g,{st:'#5a1a2a',sw:10});lx+=ws[i]});
  if(OGMODE){txt("Alex's Volcano Adventure",W/2,140,20,'#fff',{st:'#5a1a2a',sw:5});return}
  bigBtn('play','PLAY',W/2,190,190,60,'#ffe14d','#ff7b1f',true);
  if(unlockLv>1){for(let i=0;i<4;i++){const cx=W/2+(i-1.5)*44,cy=246,on=i<unlockLv;circ(cx,cy+2,17,'rgba(0,0,0,0.3)');circ(cx,cy,17,on?['#ffb3c7','#7cff6b','#c387ff','#ff9f1c'][i]:'rgba(255,255,255,0.3)');txt(on?''+(i+1):'·',cx,cy+1,16,'#fff',{st:'#5a1a2a',sw:3});if(on)btn('lv'+i,cx-20,cy-20,40,40)}}
  const p=10+insL();rrect(p,VH-64,6*34+16,54,14);X.fillStyle='rgba(40,10,30,0.55)';X.fill();txt('HERO COLOR',p+8+3*34,VH-53,10,'#fff',{sw:0});
  CAPES.forEach((c,i)=>{const cx=p+25+i*34,cy=VH-28;if(i===capeI)circ(cx,cy,15,'#fff');circ(cx,cy,12,c[0]);X.beginPath();X.arc(cx,cy,12,Math.PI,0);X.fillStyle=c[1];X.fill();btn('cape'+i,cx-17,cy-20,34,40)});
  const ax=VW-10-insR()-128;rrect(ax,VH-56,128,40,20);X.fillStyle=autoRun?'#52d66a':'rgba(40,10,30,0.55)';X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();txt(autoRun?'AUTO-RUN: ON':'AUTO-RUN: OFF',ax+64,VH-36,12,'#fff',{sw:3});btn('auto',ax,VH-62,128,52);
  roundIcon('mute',VW-10-insR()-20,26,18,muteIcon);txt('v'+VERSION,VW-10-insR()-20,52,8,'rgba(255,255,255,0.55)',{sw:0});
  rrect(p,12,124,30,15);X.fillStyle='rgba(40,10,30,0.55)';X.fill();star(p+16,27,9,'#ffd23f');txt('BEST '+best,p+30,28,13,'#fff',{a:'left',sw:0})}
// ---------- overlays ----------
function panel(w,h,y){const x=VW/2-w/2;rrect(x,y+6,w,h,22);X.fillStyle='rgba(30,5,20,0.4)';X.fill();rrect(x,y,w,h,22);const g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#fff6e0');g.addColorStop(1,'#ffd9a8');X.fillStyle=g;X.fill();X.strokeStyle='#ff8a3d';X.lineWidth=4;X.stroke();return x}
function dim(a){X.fillStyle=`rgba(25,5,30,${a})`;X.fillRect(0,0,VW,VH)}
function drawCard(){const t=card.t,a=Math.min(1,t*4)*(t>3.1?Math.max(0,1-(t-3.1)*4):1);X.save();X.globalAlpha=a;dim(0.45);const y=VH/2-95+(1-easeB(Math.min(1,t*2.2)))*-60;panel(340,180,y);
  txt('LEVEL '+(card.i+1),VW/2,y+28,16,'#ff6a1f',{sw:0});txt(LEVELS[card.i].name,VW/2,y+66,32,'#fff',{st:'#c0392b',sw:7});txt(LEVELS[card.i].sub,VW/2,y+102,14,'#7a3a1a',{sw:0});
  for(let i=0;i<4;i++){const cx=VW/2+(i-1.5)*30;circ(cx,y+132,9,i<card.i?'#52d66a':i===card.i?'#ff8a3d':'#e8c8a8');if(i<card.i)star(cx,y+132,6,'#fff')}
  txt('TAP TO GO!',VW/2,y+160+Math.sin(T*6)*2,15,'#ff6a1f',{sw:0});X.restore()}
function drawClear(){const t=stT;dim(Math.min(0.4,t*0.5));const y=VH/2-90;X.save();const s=easeB(Math.min(1,t*2));X.translate(VW/2,y+85);X.scale(s,s);X.translate(-VW/2,-(y+85));panel(330,170,y);
  txt('LEVEL CLEAR!',VW/2,y+34,30,'#ffe14d',{st:'#c0392b',sw:7});X.save();X.translate(VW/2-70,y+82);drawCoinStatic();X.restore();txt('× '+lvCoins,VW/2-52,y+83,20,'#7a3a1a',{a:'left',sw:0});
  drawGemIcon(VW/2+40,y+82);txt(lvGems+' / '+L.gemsTotal,VW/2+56,y+83,20,'#7a3a1a',{a:'left',sw:0});
  txt('Hearts bonus +'+(hearts*100),VW/2,y+114,13,'#c0392b',{sw:0});if(t>1.5)txt(lvI<3?'TAP FOR NEXT LEVEL!':'',VW/2,y+146+Math.sin(T*6)*2,15,'#ff6a1f',{sw:0});X.restore()}
function drawOops(){const t=stT;dim(Math.min(0.5,t));const y=VH/2-70;panel(300,130,y);txt('Oopsie!',VW/2,y+34,30,'#fff',{st:'#c0392b',sw:7});txt('Back to the flag — hearts refilled!',VW/2,y+70,14,'#7a3a1a',{sw:0});
  for(let i=0;i<3;i++){const on=t>0.4+i*0.3;X.save();X.translate(VW/2+(i-1)*34,y+102);const s=on?easeB(Math.min(1,(t-0.4-i*0.3)*4)):0.7;X.scale(s,s);heart(0,0,13,on?'#ff4d6d':'#e8c8a8');X.restore()}}
function drawPaused(){dim(0.55);const y=VH/2-122;panel(300,244,y);txt('PAUSED',VW/2,y+34,28,'#fff',{st:'#c0392b',sw:7});bigBtn('resume','PLAY ON!',VW/2,y+90,200,52,'#7cff6b','#2fa84a');bigBtn('home','HOME',VW/2,y+150,160,44,'#ffe14d','#ff7b1f');
  const ax=VW/2-75;rrect(ax,y+188,150,36,18);X.fillStyle=autoRun?'#52d66a':'rgba(90,40,30,0.55)';X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();txt(autoRun?'AUTO-RUN: ON':'AUTO-RUN: OFF',VW/2,y+206,13,'#fff',{sw:3});btn('auto',ax,y+184,150,44)}
function drawEnd(){const W=VW;camX=200+Math.sin(T*0.12)*200;camY=0;lavaY=L0;drawBG('summit');fwT-=1/60;
  X.save();X.translate(-camX,-camY);drawParts();X.restore();drawLava();
  if(W>620){const kx=W-150;X.fillStyle='#3e2a3a';X.beginPath();X.moveTo(kx-24,L0+30);X.lineTo(kx-14,L0-36);X.quadraticCurveTo(kx+62,L0-48,kx+138,L0-36);X.lineTo(kx+148,L0+30);X.fill();rrect(kx-18,L0-42,160,12,6);X.fillStyle='#6a4a5a';X.fill();const hop=Math.abs(Math.sin(T*3));drawKing({x:kx,y:L0-40-118-hop*22,w:124,h:118,st:'happy',sq:hop<0.15?0.2:0})}
  const s=endStats;const y=22,pw=Math.min(W-30,400);const px=(W>620?W/2-60:W/2);X.save();X.translate(px-W/2,0);panel(pw,VH-44,y);
  txt('YOU DID IT, ALEX!',W/2,y+30,26,'#ffe14d',{st:'#c0392b',sw:7});txt('Lava Legend!',W/2,y+58,15,'#c0392b',{sw:0});
  for(let i=0;i<3;i++){const t=stT-0.6-i*0.45,on=i<s.stars&&t>0,sc=on?easeB(Math.min(1,t*3)):1;X.save();X.translate(W/2+(i-1)*56,y+96-(i===1?8:0));X.scale(sc,sc);star(0,3,27,'rgba(120,40,20,0.25)');star(0,0,26,on?'#ffd23f':'#e8c8a8');if(on)star(-6,-6,6,'rgba(255,255,255,0.7)');X.restore()}
  const rows=[['Gems',s.gems+' / '+s.gt],['Coins',''+s.coins],['Time',s.time],['Score',''+s.score+(s.newBest?'  NEW BEST!':'')]];
  rows.forEach((r,i)=>{const yy=y+142+i*25;txt(r[0],W/2-pw/2+40,yy,15,'#7a3a1a',{a:'left',sw:0});txt(r[1],W/2+pw/2-40,yy,16,r[0]==='Score'&&s.newBest?'#e53935':'#5a2a1a',{a:'right',sw:0})});
  X.restore();bigBtn('again','PLAY AGAIN',px-(pw/4)+0,VH-52,Math.min(170,pw/2-14),46,'#7cff6b','#2fa84a');bigBtn('home','HOME',px+pw/4,VH-52,Math.min(130,pw/2-30),46,'#ffe14d','#ff7b1f')}
// ---------- scene ----------
function drawParts(){for(const p of parts){const a=clamp(1-p.life/p.max,0,1);X.globalAlpha=p.k==='smoke'?a*0.8:a;
  if(p.k==='star')star(p.x,p.y,p.sz,p.col,p.rot);else if(p.k==='conf'){X.save();X.translate(p.x,p.y);X.rotate(p.rot);X.fillStyle=p.col;X.fillRect(-p.sz/2,-p.sz/4,p.sz,p.sz/2);X.restore()}
  else if(p.k==='smoke')circ(p.x,p.y,p.sz*(1+p.life*1.5),p.col);else if(p.k==='coinp'){X.save();X.translate(p.x,p.y);drawCoinStatic();X.restore()}
  else if(p.k==='crust'){X.globalAlpha=a*0.85;ell(p.x,p.y,p.sz,p.sz*0.35,p.col);ell(p.x,p.y-1,p.sz*0.6,p.sz*0.18,'#6a3a2a')}
  else circ(p.x,p.y,p.sz*(p.k==='spark'?a:1),p.col)}X.globalAlpha=1}
function drawScene(){const th=L.theme;drawBG(th);const sx=shake>0?rr(-1,1)*shake*10:0,sy=shake>0?rr(-1,1)*shake*10:0;
  X.save();X.translate(Math.round(-camX+sx),Math.round(-camY+sy));
  for(const s of L.solids)if(s.k!=='pipe')drawSolid(s);for(const s of L.solids)if(s.k==='pipe')drawSolid(s);
  for(const m of L.movers)drawMover(m);for(const b of L.bouncers)drawBouncer(b);for(const b of L.qb)drawQ(b);for(const s of L.signs)drawSign(s);for(const c of L.cps)drawCP(c);if(L.goal)drawGoal(L.goal);
  for(const c of L.coins)if(!c.got&&onScreen(c.x,c.y))drawCoin(c.x,c.y,c.ph);for(const g of L.gems)if(!g.got&&onScreen(g.x,g.y))drawGem(g.x,g.y,g.c);
  for(const it of L.items)if(!it.done){const gl=X.createRadialGradient(it.x,it.y,2,it.x,it.y,26);gl.addColorStop(0,'rgba(255,255,220,0.8)');gl.addColorStop(1,'rgba(255,255,220,0)');X.fillStyle=gl;X.fillRect(it.x-26,it.y-26,52,52);powIcon(it.type,it.x,it.y,1.2)}
  for(const d of drops){if(d.warn>0){const a=0.4+0.4*Math.sin(T*20);X.strokeStyle=`rgba(255,80,40,${a})`;X.lineWidth=3;X.beginPath();X.ellipse(d.x,d.ty-2,16*(1.2-d.warn*0.3),5,0,0,TAU);X.stroke()}
    else{circ(d.x,d.y,9,'#ff6a1f');circ(d.x,d.y-2,6,'#ffd23f');X.fillStyle='rgba(255,180,60,0.6)';X.beginPath();X.moveTo(d.x-7,d.y-3);X.lineTo(d.x,d.y-24);X.lineTo(d.x+7,d.y-3);X.fill()}}
  X.restore();drawLava();X.save();X.translate(Math.round(-camX+sx),Math.round(-camY+sy));
  for(const e of L.enemies){if(!onScreen(e.x,e.y))continue;if(e.k==='bat')drawBat(e);else drawBlob(e)}
  if(boss)drawKing(boss);
  const h=hero;if(h&&!(state==='oops'&&stT>0.2)){const blink=h.inv>0&&!h.hot&&Math.sin(T*28)>0.2;X.globalAlpha=blink?0.45:1;
    drawHero(h.x+PW/2,h.y+PH,{face:h.face,run:h.run,moving:Math.abs(h.vx)>20&&!!h.ground,air:!h.ground&&state!=='card',hot:!!h.hot,sq:h.sq,cheer:h.cheer>0||state==='clear'||state==='bosswin',boots:h.pw.boots>0&&(h.pw.boots>2.5||Math.sin(T*20)>0),rocket:h.pw.rocket>0,shield:h.pw.shield});X.globalAlpha=1;
    if(h.hot&&!h.hot.out){txt('HOT HOT HOT!',h.x+PW/2,h.y-26+Math.sin(T*20)*2,14,'#fff2a8',{st:'#c0392b',sw:4})}}
  drawParts();
  for(const f of floats){const a=clamp(1.4-f.t,0,1);X.globalAlpha=a;const s=f.big?easeB(Math.min(1,f.t*4)):1;X.save();X.translate(f.x,f.y-f.t*30);X.scale(s,s);txt(f.s,0,0,f.big?16:13,f.col,{st:'#5a1a2a',sw:4});X.restore();X.globalAlpha=1}
  X.restore();
  if(banner){const b=banner,t=b.t,a=t<b.dur-0.3?1:Math.max(0,(b.dur-t)/0.3),s=easeB(Math.min(1,t*3));X.save();X.globalAlpha=a;X.translate(VW/2,VH*0.32);X.scale(s,s);X.rotate(Math.sin(T*3)*0.02);txt(b.s,0,0,30,b.col,{st:'#5a1a2a',sw:8});X.restore()}}
function render(){X.setTransform(DPR,0,0,DPR,0,0);X.fillStyle='#2a0f2e';X.fillRect(0,0,SW,SH);if(portrait)drawPortraitFrame();
  X.setTransform(DPR*SC,0,0,DPR*SC,OX*DPR,OY*DPR);X.save();X.beginPath();X.rect(0,0,VW,VH);X.clip();UI=[];
  if(state==='title')drawTitle();else if(state==='end')drawEnd();
  else{drawScene();drawHUD();if(state==='card'&&card)drawCard();if(state==='clear')drawClear();if(state==='oops')drawOops();if(paused)drawPaused()}
  X.restore();if(portrait){X.setTransform(DPR,0,0,DPR,0,0);X.strokeStyle='rgba(255,180,90,0.7)';X.lineWidth=3;X.strokeRect(OX,OY,VW*SC,VH*SC)}
  if(!paused)drawControls()}
// ---------- flow ----------
function startPlay(){if(state!=='card')return;state='play';card=null;jumpEdge=false;say('go',2,0.5)}
function nextLevel(){if(lvI<3)startLevel(lvI+1);else finish()}
function setAuto(v){autoRun=!!v;localStorage.setItem('afl_auto',autoRun?'1':'0');AUD.SFX.click()}
// Auto-Run is optional; a tap on LEFT mid-level switches it off (and remembers that), so a kid is never stuck running right.
function autoRunOff(){if(!autoRun)return;setAuto(false);showBanner('AUTO-RUN OFF','#ffffff',1.6)}
function toTitle(){clearInput();state='title';stT=0;paused=false;boss=null;AUD.setTheme('title');parts=[];floats=[]}
function fmtT(s){s=Math.floor(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function finish(){state='end';stT=0;paused=false;const r=gemsTotal?gems/gemsTotal:0;const stars=r>=0.75?3:r>=0.4?2:1;const nb=score>best;if(nb){best=score;localStorage.setItem('afl_best',best)}
  endStats={stars,gems,gt:gemsTotal,coins,time:fmtT(runTime),score,newBest:nb};AUD.setTheme('win');AUD.SFX.fanfare();setTimeout(()=>AUD.SFX.cheer(),500);say('did',3);parts=[];fwT=0}
function uiKey(k){if(k==='pause'){if(state==='play'){paused=!paused;clearInput();AUD.SFX.click()}return}
  if(paused){paused=false;clearInput();return}if(state==='title'){AUD.SFX.click();newGame(0)}else if(state==='card'&&card.t>0.4)startPlay();else if(state==='clear'&&stT>1.5)nextLevel();else if(state==='end'&&stT>1.5){newGame(0)}}
function uiTap(p){let hit=null;for(let i=UI.length-1;i>=0;i--){const b=UI[i];if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){hit=b.id;break}}
  if(paused){if(hit==='resume'){paused=false;clearInput();AUD.SFX.click()}else if(hit==='home'){AUD.SFX.click();toTitle()}else if(hit==='auto'){setAuto(!autoRun)}return}
  if(state==='title'){if(hit==='play'){AUD.SFX.click();newGame(0)}else if(hit&&hit.startsWith('lv')){AUD.SFX.click();newGame(+hit.slice(2))}
    else if(hit&&hit.startsWith('cape')){capeI=+hit.slice(4);localStorage.setItem('afl_cape',capeI);AUD.SFX.boing()}else if(hit==='auto'){if(stT>1)setAuto(!autoRun)}else if(hit==='mute')toggleMute();return}
  if(state==='card'){if(card.t>0.4)startPlay();return}if(state==='clear'){if(stT>1.5)nextLevel();return}
  if(state==='end'){if(hit==='again'){AUD.SFX.click();newGame(0)}else if(hit==='home'){AUD.SFX.click();toTitle()}}}
// ---------- update loop ----------
function update(dt){T+=dt;stT+=dt;shake=Math.max(0,shake-dt*1.5);
  for(const p of parts){p.life+=dt;p.vy+=p.g*dt;if(p.drag){p.vx*=0.985;p.vy=Math.min(p.vy,90)}p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;
    if(p.k==='rocketp'&&p.life>=p.max){for(let i=0;i<34;i++){const a=i/34*TAU,s=rr(120,200);parts.push({x:p.x,y:p.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:0,max:rr(0.9,1.4),col:i%3?p.fw:'#fff',sz:3,g:140,k:'spark',rot:0,vr:0})}}}
  parts=parts.filter(p=>p.life<p.max);if(parts.length>700)parts.splice(0,parts.length-700);
  for(const f of floats)f.t+=dt;floats=floats.filter(f=>f.t<1.4);if(banner){banner.t+=dt;if(banner.t>banner.dur)banner=null}
  if(state==='title')return;
  if(state==='end'){fwT-=dt;if(fwT<=0){fwT=rr(0.5,0.9);firework(camX+rr(60,VW-60),camY+rr(40,130))}if(R()<dt*6)confetti(2);return}
  if(paused)return;
  if(state==='card'){card.t+=dt;for(const m of L.movers){m.px=m.x;m.py=m.y}camUpdate(dt);if(card.t>3.4)startPlay();return}
  if(state==='play'){runTime+=dt;worldStep(dt);camUpdate(dt)}
  else if(state==='clear'){const h=hero;if(h.x<L.goal.x+60){h.x+=90*dt;h.run+=dt*1.5;h.face=1}h.cheer=1;camUpdate(dt);if(stT>6)nextLevel()}
  else if(state==='oops'){camUpdate(dt);if(stT>2)respawn()}
  else if(state==='bosswin'){runTime+=dt;for(const m of L.movers){m.px=m.x;m.py=m.y}heroStep(dt);bossStep(dt);for(const e of L.enemies)if(e.dead)e.dead+=dt;camUpdate(dt);
    const b=boss,A=L.arena;if(b.y+b.h>=A.y-0.5&&b.vy===0&&R()<dt*1.4)b.vy=-360;
    fwT-=dt;if(fwT<=0&&stT>0.6){fwT=0.42;firework(b.x+b.w/2+rr(-30,30),b.y-60);confetti(14,b.x+b.w/2,b.y)}if(stT>2.4&&!saidLegend){saidLegend=true;say('legend',3)}
    if(stT>8.5){saidLegend=false;finish()}}}
let last=performance.now(),acc=0;
function frame(now){const dt=Math.min(0.05,Math.max(0,(now-last)/1000));last=now;acc+=dt*TS;const STEP=1/120;let n=0;
  try{while(acc>=STEP&&n<60){update(STEP);acc-=STEP;n++}if(n>=60)acc=0;render()}catch(e){console.error(e&&e.stack||e)}requestAnimationFrame(frame)}
AUD.setTheme('title');requestAnimationFrame(frame);
if(DEBUG)window.__A={get state(){return state},get hero(){return hero},get hearts(){return hearts},set hearts(v){hearts=v},get score(){return score},get coins(){return coins},get gems(){return gems},get gemsTotal(){return gemsTotal},get lv(){return lvI},get L(){return L},get boss(){return boss},
  get falls(){return falls},get deaths(){return deaths},get stomps(){return stomps},get powCount(){return powCount},get runTime(){return runTime},get erupt(){return erupt},get lavaY(){return lavaY},get card(){return card},get paused(){return paused},get stT(){return stT},get endStats(){return endStats},get camX(){return camX},
  audio:AUD,newGame,startPlay,finish,set TS(v){TS=v},get TS(){return TS},bot(on){bot.on=on;if(!on){inp.l=inp.r=inp.j=0}},give(t){grantPower(t)},tele(x,y){hero.x=x;hero.y=(y==null?surfaceBelow(x+PW/2,-400):y)-PH;hero.vx=0;hero.vy=0;camUpdate(0,true)},
  toClient:(x,y)=>({x:x*SC+OX,y:y*SC+OY}),ctl,get VW(){return VW},get portrait(){return portrait},stomp(e){stomp(e)},startHot(){startHot(false)},get ui(){return UI.map(b=>({id:b.id,x:b.x+b.w/2,y:b.y+b.h/2}))},get hud(){return HUDB.map(b=>({id:b.id,x:b.x+b.w/2,y:b.y+b.h/2}))},
  get autoRun(){return autoRun},set autoRun(v){autoRun=!!v},get inp(){return {l:inp.l,r:inp.r,j:inp.j}},get nptrs(){return ptrs.size},get version(){return VERSION},get capeI(){return capeI},set stT(v){stT=v}};
