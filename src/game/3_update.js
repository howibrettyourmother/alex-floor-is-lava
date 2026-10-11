// ================= gameplay =================
const LAVA_SURF={lava:1,x:-1e9,w:2e9,y:0};
let drops=[],fwT=0,saidHint={};
function mkHero(x,y){return{x,y:y-PH,vx:0,vy:0,ground:null,face:1,coy:0,buf:0,inv:0,hot:null,pw:{boots:0,rocket:0,shield:0},dj:1,sq:0,run:0,air:0,jumpX:x,lastSafe:null,cheer:0,ctrl:0,prevFeet:y,bounced:0,blink:3}}
function newGame(i){score=0;coins=0;gems=0;gemsTotal=0;runTime=0;stomps=0;falls=0;deaths=0;powCount=0;bigJumps=0;levelsDone=[];startLevel(i||0,true)}
function startLevel(i,first){clearInput();lvI=i;L=buildLevel(i);hero=mkHero(L.start.x,L.start.y);hearts=3;lavaY=L0;checkpoint={x:L.start.x,y:L.start.y};fallLog=[];boss=null;erupt=null;drops=[];
  parts=[];floats=[];banner=null;lvCoins=0;lvGems=0;gemsTotal+=L.gemsTotal;lvStartScore=score;saidHint={};camX=0;camY=0;camUpdate(0,true);
  state='card';stT=0;card={i,t:0};AUD.setTheme(LEVELS[i].music);if(first&&i===0)say('title',3);say(LEVELS[i].voice,3)}
function onScreen(x,y,m){m=m||60;return x>camX-m&&x<camX+VW+m&&y>camY-m&&y<camY+VH+m}
// ---------- particles / floating text ----------
function puff(x,y,n,col,o){o=o||{};for(let i=0;i<n;i++){const a=o.a!=null?o.a+rr(-o.sp||-0.6,o.sp||0.6):rr(0,TAU),s=rr(o.s0||40,o.s1||160);
  parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:0,max:rr(o.l0||0.4,o.l1||0.9),col:Array.isArray(col)?pick(col):col,sz:rr(o.z0||2,o.z1||5),g:o.g!=null?o.g:300,k:o.k||'dot',rot:rr(0,TAU),vr:rr(-8,8)})}}
function sparkle(x,y,n){puff(x,y,n||10,['#fff6a8','#ffd23f','#fff'],{k:'star',s0:30,s1:140,g:60,z0:3,z1:6})}
function confetti(n,x,y){for(let i=0;i<n;i++)parts.push({x:x!=null?x+rr(-20,20):camX+rr(0,VW),y:y!=null?y:camY-10,vx:rr(-120,120),vy:y!=null?rr(-520,-200):rr(20,120),life:0,max:rr(2.2,4),col:pick(['#ff4d6d','#ffd23f','#4dd6ff','#7cff6b','#c387ff','#ff9f1c']),sz:rr(4,7),g:y!=null?320:60,k:'conf',rot:rr(0,TAU),vr:rr(-9,9),drag:1})}
function firework(x,y){const col=pick(['#ff4d6d','#ffd23f','#4dd6ff','#7cff6b','#c387ff','#ffffff']);parts.push({x,y:y+180,vx:rr(-30,30),vy:-520,life:0,max:0.34,col:'#fff2b0',sz:3,g:300,k:'rocketp',fw:col});AUD.SFX.firework()}
function ftext(s,x,y,col,big){floats.push({s,x,y,t:0,col:col||'#fff',big:big||0})}
function showBanner(s,col,dur){banner={s,col:col||'#ffd23f',t:0,dur:dur||2.2}}
// ---------- collisions ----------
function surfaces(){return L.solids}
function resolveX(ox){const h=hero,hb={x:h.x,y:h.y,w:PW,h:PH};
  const tst=s=>{if(s.one||s.off||!ov(hb,s))return;if(ox+PW<=s.x+1){h.x=s.x-PW}else if(ox>=s.x+s.w-1){h.x=s.x+s.w}else return;h.vx=0;hb.x=h.x};
  for(const s of L.solids)tst(s);for(const s of L.qb)tst(s)}
function resolveY(oy){const h=hero,hb={x:h.x,y:h.y,w:PW,h:PH},pf=oy+PH;
  const tst=(s,kind)=>{if(s.off||!ov(hb,s))return;const top=kind==='m'?Math.min(s.y,s.py):s.y;
    if(h.vy>=0&&pf<=top+(kind==='m'?Math.abs(s.y-s.py)+5:5)){h.y=s.y-PH;h.vy=0;hb.y=h.y;
      if(kind==='b'){h.vy=-BOUNCEV;s.sq=1;h.dj=1;h.bounced=1;h.air=0;h.jumpX=h.x;AUD.SFX.boing();puff(s.x+s.w/2,s.y,8,['#fff','#ffe0f0'],{a:-Math.PI/2,sp:1.2,g:200});return}
      h.ground=s;return}
    if(!s.one&&kind!=='b'&&h.vy<0&&oy>=s.y+s.h-8){const oL=h.x+PW-s.x,oR=s.x+s.w-h.x;
      if(kind!=='q'&&oL<9){h.x=s.x-PW;hb.x=h.x;return}if(kind!=='q'&&oR<9){h.x=s.x+s.w;hb.x=h.x;return}
      h.y=s.y+s.h;hb.y=h.y;h.vy=40;if(kind==='q')hitBlock(s);else AUD.SFX.bump()}};
  for(const s of L.solids)tst(s,'s');for(const s of L.qb)tst(s,'q');for(const s of L.movers)tst(s,'m');for(const s of L.bouncers)tst(s,'b')}
function surfaceBelow(x,y){let best=null;const chk=s=>{if(s.off||s.k==='wall')return;if(x>=s.x&&x<=s.x+s.w&&s.y>=y-2&&(best==null||s.y<best))best=s.y};
  L.solids.forEach(chk);L.qb.forEach(chk);L.movers.forEach(chk);L.bouncers.forEach(chk);return best}
// ---------- hero ----------
function doJump(rocket){const h=hero;const pj=h.pw.rocket>0?1.1:1;h.vy=-JV*pj*(rocket?1.04:1);h.buf=0;h.coy=0;h.ground=null;h.sq=-0.3;h.jumpX=h.x;h.air=0;h.bounced=0;
  if(rocket){h.dj--;AUD.SFX.rocket();puff(h.x+PW/2,h.y+PH,14,['#ffd23f','#ff8a1f','#fff'],{a:Math.PI/2,sp:0.6,s0:80,s1:220,g:0})}else{h.dj=1;AUD.SFX.jump();puff(h.x+PW/2,h.y+PH,5,'rgba(255,255,255,0.8)',{a:Math.PI/2,sp:1.4,s0:20,s1:70,g:0})}}
function heroStep(dt){const h=hero;if(h.hot){hotStep(dt);return}
  if(h.inv>0)h.inv-=dt;h.blink-=dt;if(h.blink<0)h.blink=rr(2,4);
  if(h.pw.rocket>0)h.pw.rocket-=dt;
  if(h.pw.boots>0){h.pw.boots-=dt;if(h.pw.boots<=0&&h.ground===LAVA_SURF){h.pw.boots=0;startHot(true)}}
  if(h.ground&&h.ground.mover){h.x+=h.ground.x-h.ground.px;h.y+=h.ground.y-h.ground.py}
  let dir=(inp.r?1:0)-(inp.l?1:0);if(autoRun&&!inp.l&&!inp.r&&!bot.on)dir=1;if(h.ctrl>0){h.ctrl-=dt;dir=0}
  const tgt=dir*RUNV;let a;if(!dir)a=h.ground?DEC:AIR*0.45;else if(h.ground)a=(h.vx*dir<0)?DEC:ACC;else a=AIR;
  h.vx=approach(h.vx,tgt,a*dt);if(dir)h.face=dir;
  if(jumpEdge){h.buf=BUF;jumpEdge=false}
  h.buf-=dt;if(h.ground)h.coy=COY;else h.coy-=dt;
  if(h.buf>0){if(h.coy>0)doJump(false);else if(h.pw.rocket>0&&h.dj>0&&h.vy>-200)doJump(true)}
  h.vy=Math.min(h.vy+((h.vy<0&&inp.j)?GRAV_HOLD:GRAV)*dt,MAXF);
  const ox=h.x,oy=h.y,wasG=h.ground;h.prevFeet=oy+PH;
  h.x+=h.vx*dt;resolveX(ox);if(h.x<0){h.x=0;h.vx=0}if(h.x>L.end-PW){h.x=L.end-PW;h.vx=0}
  h.y+=h.vy*dt;h.ground=null;resolveY(oy);
  if(h.y+PH>lavaY+3){if(h.pw.boots>0){h.y=lavaY-PH;h.vy=0;h.ground=LAVA_SURF;if(R()<dt*30)parts.push({x:h.x+PW/2+rr(-8,8),y:lavaY+2,vx:0,vy:0,life:0,max:1.4,col:'#3a2420',sz:rr(7,11),g:0,k:'crust'});if(R()<dt*20)puff(h.x+PW/2,lavaY,1,['#ffd23f','#ff7b1f'],{a:-Math.PI/2,s0:40,s1:120,g:200})}
    else{startHot(false);return}}
  if(h.ground&&!wasG)onLand(wasG);
  if(h.ground){h.air=0;h.dj=1;if(!h.ground.mover&&!h.ground.lava){h.lastSafe=h.ground}}else h.air+=dt;
  h.run+=Math.abs(h.vx)*dt*0.055;if(h.sq)h.sq=approach(h.sq,0,dt*2.5);if(h.cheer>0)h.cheer-=dt}
function onLand(){const h=hero;AUD.SFX.land();h.sq=0.35;puff(h.x+PW/2,h.y+PH,6,'rgba(255,255,255,0.75)',{a:-Math.PI/2,sp:1.5,s0:30,s1:90,g:0,l1:0.4});
  const dx=Math.abs(h.x-h.jumpX);if(h.air>0.55&&dx>165&&h.ground!==LAVA_SURF){bigJumps++;if(bigJumps%3===1||R()<0.25){if(say(h.bounced?'super':'aj',1,10)){h.cheer=1;ftext(h.bounced?'SUPER JUMP!':'AWESOME!',h.x+PW/2,h.y-14,'#ffe14d',1)}}}h.bounced=0}
function startHot(free){const h=hero;if(h.hot)return;const fx=h.x;
  if(h.pw.shield&&!free){h.pw.shield=0;free=true;AUD.SFX.pop();say('pop',2);puff(h.x+PW/2,h.y+PH/2,16,['#bfefff','#fff','#8fd8ff'],{s0:60,s1:200,g:50})}
  if(!free){hearts--;falls++}
  AUD.SFX.hot();say(R()<0.55?'hot':'hot2',2,1.5);ftext('HOT HOT HOT!',h.x+PW/2,lavaY-60,'#fff2a8',1);shake=Math.max(shake,0.25);
  puff(h.x+PW/2,lavaY,22,['#ffd23f','#ff7b1f','#ff3d1f','#fff2a8'],{a:-Math.PI/2,sp:0.9,s0:120,s1:360,g:600});
  puff(h.x+PW/2,lavaY,8,'rgba(120,110,120,0.5)',{a:-Math.PI/2,sp:0.5,s0:30,s1:80,g:-40,z0:6,z1:12,l0:0.8,l1:1.4,k:'smoke'});
  if(hearts<=0){h.hot={t:0,dur:1.0,x0:h.x,y0:lavaY-PH,out:1};return}
  const tg=pickLanding(fx);fallLog.push(fx);h.vx=0;h.vy=0;h.ground=null;
  h.hot={t:0,dur:1.05,x0:h.x,y0:lavaY-PH,s:tg.s,off:tg.off}}
function pickLanding(fx){const back=hero.lastSafe,rep=fallLog.some(x=>Math.abs(x-fx)<260);
  const okS=s=>s&&!s.off&&s.k!=='wall'&&s.w>=40&&s.y<lavaY-40;const lx=(s,p)=>clamp(p,s.x+6,s.x+s.w-PW-6)-s.x;
  const cands=L.solids.filter(okS);let fwd=null;
  for(const s of cands){if(s===back)continue;if(s.x+s.w>fx+PW+30&&s.x<fx+380&&s.y>camY-260&&(!fwd||s.x<fwd.x))fwd=s}
  const bk=okS(back)?back:null;let s=(rep||!bk)?(fwd||bk):bk;
  if(!s){let bd=1e9;for(const c of cands){const d=Math.abs(c.x+c.w/2-fx)+Math.abs(c.y-lavaY)*0.2;if(d<bd){bd=d;s=c}}}
  if(!s)return{s:{x:checkpoint.x-20,y:checkpoint.y,w:40},off:20};
  return{s,off:s===fwd?lx(s,s.x+16):lx(s,fx<s.x?s.x+10:fx>s.x+s.w?s.x+s.w-PW-10:fx)}}
function hotStep(dt){const h=hero,o=h.hot;o.t+=dt;const p=clamp(o.t/o.dur,0,1);
  if(R()<dt*30)puff(h.x+PW/2,h.y+PH,1,'rgba(140,130,140,0.45)',{a:Math.PI/2,s0:10,s1:40,g:-60,z0:5,z1:9,l0:0.5,l1:0.9,k:'smoke'});
  if(o.out){h.y=o.y0-Math.sin(p*Math.PI)*170;h.x=o.x0;if(p>=1){h.hot=null;oops()}return}
  const tx=o.s.x+o.off,ty=o.s.y-PH,hg=Math.max(110,o.y0-ty+90);h.x=lerp(o.x0,tx,p);h.y=lerp(o.y0,ty,p)-4*hg*p*(1-p)+(p<1?0:0);
  if(p>=1){h.hot=null;h.x=tx;h.y=ty;h.vx=0;h.vy=0;h.inv=1.5;h.ground=null;h.sq=0.4;AUD.SFX.land();h.air=0;h.jumpX=h.x}}
function hurt(fromX){const h=hero;if(h.inv>0||h.hot||state!=='play')return;const away=(h.x+PW/2<fromX)?-1:1;
  if(h.pw.shield){h.pw.shield=0;h.inv=1.3;AUD.SFX.pop();say('pop',2);puff(h.x+PW/2,h.y+PH/2,16,['#bfefff','#fff','#8fd8ff'],{s0:60,s1:200,g:50});h.vx=away*200;h.vy=-260;return}
  hearts--;h.inv=1.8;AUD.SFX.hurt();h.vx=away*230;h.vy=-330;h.ground=null;h.ctrl=0.22;shake=Math.max(shake,0.2);ftext('Ouch!',h.x+PW/2,h.y-10,'#ffd0d0');
  if(hearts<=0){h.hot={t:0,dur:1.0,x0:h.x,y0:h.y,out:1}}}
function oops(){deaths++;state='oops';stT=0;say('oops',3)}
function respawn(){const c=checkpoint;hero=mkHero(c.x,c.y);hero.inv=2;hearts=3;state='play';fallLog=[];drops=[];
  for(const z of L.zones){if(c.x<z.x0+5){z.on=0;z.done=0}}lavaY=L0;if(L.zones.some(z=>z.on&&!z.done))lavaY=Math.min(L0,c.y+160);camUpdate(0,true)}
// ---------- blocks, items, power-ups ----------
function hitBlock(b){b.bump=1;AUD.SFX.bump();if(b.used)return;b.used=1;
  if(b.item==='coin'){coins++;lvCoins++;score+=10;AUD.SFX.coin();parts.push({x:b.x+16,y:b.y-6,vx:0,vy:-420,life:0,max:0.5,col:'#ffd23f',sz:9,g:1300,k:'coinp'});return}
  let it=b.item;if(hero.pw[it]&&hearts<3)it='heart';L.items.push({type:it,x:b.x+16,y:b.y,bx:b.x+16,by:b.y,t:0});AUD.SFX.appear()}
const POW_NAME={boots:'FIRE BOOTS!',rocket:'ROCKET JUMP!',shield:'BUBBLE SHIELD!',heart:'EXTRA HEART!'},POW_COL={boots:'#ff8a1f',rocket:'#4dd6ff',shield:'#9fe8ff',heart:'#ff5a7a'};
let powSeen={};
function grantPower(t){const h=hero;if(t==='boots')h.pw.boots=POW_T.boots;else if(t==='rocket'){h.pw.rocket=POW_T.rocket;h.dj=1}else if(t==='shield'){h.pw.shield=1;AUD.SFX.bubble()}else if(t==='heart')hearts=Math.min(3,hearts+1);
  powCount++;score+=50;AUD.SFX.power();showBanner(POW_NAME[t],POW_COL[t],2);h.cheer=1.2;sparkle(h.x+PW/2,h.y+PH/2,16);
  if(!powSeen[t]){powSeen[t]=1;say(t,2)}else say(R()<0.6?'power':t,2)}
function itemsStep(dt){for(const it of L.items){if(it.done)continue;it.t+=dt;
  if(it.t<0.55){const p=easeB(it.t/0.55);it.x=it.bx;it.y=it.by-8-34*p}
  else{const p=ease((it.t-0.55)/0.35),tx=hero.x+PW/2,ty=hero.y+PH/2;it.x=lerp(it.bx,tx,p);it.y=lerp(it.by-42,ty,p);if(p>=1){it.done=1;grantPower(it.type)}}}}
// ---------- enemies ----------
function enemiesStep(dt){const h=hero;for(const e of L.enemies){if(e.dead){e.dead+=dt;continue}e.ph+=dt;
  if(e.fly){e.vy+=GRAV*0.8*dt;e.x+=e.vx*dt;e.y+=e.vy*dt;const A=L.arena;if(A){if(e.x<A.x0+10){e.x=A.x0+10;e.vx*=-1}if(e.x>A.x0+A.w-40){e.x=A.x0+A.w-40;e.vx*=-1}if(e.y+e.h>=A.y){e.y=A.y-e.h;e.fly=0;e.base=A.y;e.vy=0;e.minX=A.x0+10;e.maxX=A.x0+A.w-40;e.vx=e.vx>0?40:-40;puff(e.x+15,A.y,6,'#ffb36b',{a:-Math.PI/2,g:300})}}}
  else if(e.k==='bat'){const nx=e.x0+Math.sin(e.ph*1.1)*e.range;e.vx=nx-e.x;e.x=nx;e.y=e.y0+Math.sin(e.ph*2.4)*14}
  else{const sp=e.k==='hopper'?28:38;if(Math.abs(e.vx)!==sp)e.vx=Math.sign(e.vx||-1)*sp;e.x+=e.vx*dt;if(e.x<e.minX){e.x=e.minX;e.vx=sp}if(e.x>e.maxX){e.x=e.maxX;e.vx=-sp}
    if(e.k==='hopper'){e.jt-=dt;if(e.jt<=0&&e.vy===0&&e.y>=e.base-e.h-0.5){e.vy=-470;e.jt=rr(1.4,2.0)}if(e.vy!==0||e.y<e.base-e.h){e.vy+=GRAV*0.75*dt;e.y+=e.vy*dt;if(e.y>=e.base-e.h){e.y=e.base-e.h;e.vy=0}}}}
  if(h.hot||state!=='play')continue;
  const sb={x:h.x-5,y:h.y-2,w:PW+10,h:PH+6},hb={x:h.x+5,y:h.y+8,w:PW-10,h:PH-12},eb={x:e.x+3,y:e.y+4,w:e.w-6,h:e.h-5};
  if(ov(sb,eb)&&(h.vy>20&&(h.prevFeet<=e.y+e.h*0.6+6)||h.prevFeet<=e.y+6)){stomp(e)}else if(ov(hb,eb))hurt(e.x+e.w/2)}}
function stomp(e){const h=hero;e.dead=0.001;h.vy=-(inp.j?640:460);h.ground=null;h.dj=1;h.jumpX=h.x;score+=100;stomps++;AUD.SFX.stomp();
  puff(e.x+e.w/2,e.y+e.h,12,['#ffb36b','#ff7b1f','#ffe14d'],{a:-Math.PI/2,sp:1.4,s0:60,s1:200,g:500});sparkle(e.x+e.w/2,e.y,5);ftext('+100',e.x+e.w/2,e.y-6,'#fff');
  if(stomps===1||R()<0.3)say(R()<0.7?'stomp':'way',1,7)}
// ---------- world step ----------
function worldStep(dt){const h=hero;
  for(const m of L.movers){m.px=m.x;m.py=m.y;m.ph+=dt;const k=0.5-0.5*Math.cos(TAU*m.ph/m.per);m.x=m.x0+m.dx*k;m.y=m.y0+m.dy*k}
  for(const b of L.bouncers)if(b.sq>0)b.sq=Math.max(0,b.sq-dt*3);for(const b of L.qb)if(b.bump>0)b.bump=Math.max(0,b.bump-dt*5);
  if(bot.on)botThink(dt);
  heroStep(dt);if(state!=='play')return;
  enemiesStep(dt);itemsStep(dt);
  const cx=h.x+PW/2,cy=h.y+PH/2;
  for(const c of L.coins){if(c.got)continue;if(c.fall){if(c.rest==null){c.y+=c.vy*dt;const sb=surfaceBelow(c.x,c.y-12);if(sb!=null&&c.y+10>=sb){c.y=sb-10;c.rest=0}if(c.y>lavaY+20){c.got=1;continue}}else{c.rest+=dt;if(c.rest>6){c.got=1;continue}}}
    if(Math.abs(c.x-cx)<21&&Math.abs(c.y-cy)<27&&!h.hot){c.got=1;coins++;lvCoins++;score+=10;AUD.SFX.coin();sparkle(c.x,c.y,4);if(coins%100===0&&hearts<3){hearts++;ftext('+♥',cx,h.y-10,'#ff7a90',1)}}}
  for(const g of L.gems){if(g.got)continue;if(Math.abs(g.x-cx)<26&&Math.abs(g.y-cy)<30&&!h.hot){g.got=1;gems++;lvGems++;score+=200;AUD.SFX.gem();sparkle(g.x,g.y,18);ftext('GEM!',g.x,g.y-16,'#bff7ff',1);h.cheer=1;say(gems===1||R()<0.5?'wow':'gj',1,6)}}
  for(const c of L.cps){if(c.on)continue;if(h.x+PW>c.x-6&&Math.abs(h.y+PH-c.y)<220){c.on=1;checkpoint={x:c.x,y:c.y};fallLog=[];const was=hearts;hearts=3;AUD.SFX.check();sparkle(c.x+14,c.y-60,14);
    ftext(was<3?'CHECKPOINT! ♥ full':'CHECKPOINT!',c.x+14,c.y-90,'#b6ff9e',1);say(R()<0.6?'check':'gj',2,3)}}
  for(const s of L.signs){if(s.said||Math.abs(h.x-s.x)>60)continue;s.said=1;if(s.k==='jump')say('couch',2);if(s.k==='q')say('qhint',2);if(s.k==='lava')say('title',1,4)}
  let rising=false;for(const z of L.zones){if(!z.on&&!z.done&&h.x>z.x0){z.on=1;z.t=0;say('rise',3);showBanner('THE LAVA IS RISING!','#ff8a1f',2.4)}
    if(z.on&&!z.done){z.t+=dt;rising=true;if(z.t>1.6){const safeY=(h.lastSafe?h.lastSafe.y:h.y+PH)+110;lavaY=Math.max(Math.min(L0,safeY),lavaY-24*dt)}
      if(h.x>z.x1&&h.ground&&!h.ground.lava){z.done=1;rising=false;showBanner('PHEW! SAFE!','#b6ff9e',1.8);say('way',2,2)}}}
  if(!rising&&lavaY<L0)lavaY=Math.min(L0,lavaY+280*dt);
  for(const e of L.erupts){if(!e.done&&h.x>e.x){e.done=1;erupt={t:0,dur:9,sp:0};say('erupt',3);AUD.SFX.rumble();showBanner('VOLCANO TIME!','#ffd23f',2.2)}}
  if(erupt){erupt.t+=dt;shake=Math.max(shake,erupt.t<1.2?0.12:0.04);erupt.sp-=dt;
    if(erupt.sp<=0&&erupt.t<erupt.dur&&erupt.t>0.8){erupt.sp=0.26;const x=camX+rr(60,VW-30);
      if(R()<0.74)L.coins.push({x,y:camY-20,got:0,fall:1,vy:rr(110,170),ph:R()*9});
      else{const ty=surfaceBelow(x,camY);if(ty!=null&&Math.abs(x-(h.x+PW/2))>30)drops.push({x,y:camY-40,ty,warn:1.1,vy:0})}}
    if(erupt.t>erupt.dur+1)erupt=null}
  for(const d of drops){if(d.done)continue;if(d.warn>0){d.warn-=dt;continue}d.vy=Math.min(d.vy+900*dt,420);d.y+=d.vy*dt;
    if(d.y>=d.ty){d.done=1;puff(d.x,d.ty,12,['#ffd23f','#ff7b1f','#ff3d1f'],{a:-Math.PI/2,sp:1.3,s0:60,s1:200,g:600});AUD.SFX.blorp();
      if(Math.abs(d.x-(h.x+PW/2))<22&&Math.abs(d.ty-(h.y+PH))<30)hurt(d.x)}}
  drops=drops.filter(d=>!d.done);
  if(L.arena&&!boss&&h.x>L.arena.x0+50)bossStart();
  if(boss)bossStep(dt);
  if(L.goal&&h.x+PW>L.goal.x&&state==='play')levelClear();
  if(onScreen(h.x,lavaY,40)&&R()<dt*0.6)AUD.SFX.blorp()}
function levelClear(){state='clear';stT=0;AUD.SFX.fanfare();setTimeout(()=>AUD.SFX.cheer(),400);say('clear',3);score+=hearts*100;levelsDone.push(lvI);
  if(lvI+2>unlockLv){unlockLv=Math.min(4,lvI+2);localStorage.setItem('afl_unlock',unlockLv)}hero.cheer=5;const gx=L.goal.x,LL=L;for(let i=0;i<3;i++)setTimeout(()=>{if(L===LL&&state==='clear')firework(gx+rr(-80,120),camY+rr(60,140))},i*450)}
// ---------- Volcano King ----------
function bossStart(){const A=L.arena;boss={x:A.x0+A.w-200,y:A.y-140-260,w:150,h:140,vx:0,vy:0,hp:3,st:'intro',t:0,face:-1,sq:0,n:0,mood:0};A.gate.off=0;
  say('king',3);AUD.setTheme('boss');showBanner('THE VOLCANO KING!','#ffd23f',2.6);AUD.SFX.grumble();checkpoint={x:A.x0+80,y:A.y}}
function bossStep(dt){const b=boss,h=hero,A=L.arena;b.t+=dt;if(b.sq)b.sq=approach(b.sq,0,dt*3);
  const bcx=b.x+b.w/2,hcx=h.x+PW/2,dir=hcx<bcx?-1:1;
  b.vy+=GRAV*0.8*dt;b.y+=b.vy*dt;let gr=false;if(b.y+b.h>=A.y){if(b.vy>320){shake=Math.max(shake,0.3);AUD.SFX.land();puff(bcx,A.y,16,'rgba(255,220,180,0.8)',{a:-Math.PI/2,sp:1.5,g:0,s0:60,s1:200});b.sq=0.4}b.y=A.y-b.h;b.vy=0;gr=true}
  if(b.st==='intro'){if(gr&&b.t>0.3&&!b.landed){b.landed=1}if(b.t>2.8){b.st='walk';b.t=0}}
  else if(b.st==='walk'){b.face=dir;b.vx=dir*(50+(3-b.hp)*28);b.x+=b.vx*dt;if(b.t>2.3){b.n++;b.t=0;b.st=b.n%2?'spit':'hop';if(b.st==='hop'){b.vy=-620;b.vx=dir*(150+(3-b.hp)*30);AUD.SFX.grumble()}}}
  else if(b.st==='hop'){b.x+=b.vx*dt;if(gr&&b.t>0.2){b.st='walk';b.t=0}}
  else if(b.st==='spit'){if(b.t>0.7&&!b.spat){b.spat=1;const alive=L.enemies.filter(e=>!e.dead&&e.boss).length;for(let i=0;i<Math.min(2,3-alive);i++){L.enemies.push({k:'blob',boss:1,x:bcx-15,y:b.y-10,w:30,h:26,vx:(i?1:-1)*rr(90,170),vy:-rr(380,480),fly:1,ph:R()*9,dead:0,minX:A.x0,maxX:A.x0+A.w,base:A.y,jt:1})}
      AUD.SFX.spit();puff(bcx,b.y,14,['#ffd23f','#ff7b1f'],{a:-Math.PI/2,sp:0.6,s0:100,s1:260,g:400})}if(b.t>1.4){b.spat=0;b.st='walk';b.t=0}}
  else if(b.st==='stun'){b.vx=0;if(b.t>1.6){b.st='hop';b.t=0;const away=hcx<bcx?1:-1;b.vy=-560;b.vx=away*230}}
  b.x=clamp(b.x,A.x0+8,A.x0+A.w-b.w-8);
  if(b.st==='happy'||h.hot||state!=='play')return;
  const top={x:b.x+16,y:b.y-8,w:b.w-32,h:34},body={x:b.x+18,y:b.y+26,w:b.w-36,h:b.h-26};
  const sb={x:h.x-5,y:h.y,w:PW+10,h:PH+4},hb={x:h.x+5,y:h.y+8,w:PW-10,h:PH-12};
  if(h.vy>0&&ov(sb,top)&&h.prevFeet<=b.y+26){bossStomp()}
  else if(b.st!=='stun'&&b.st!=='intro'&&ov(hb,body)){hurt(bcx);h.vx=(hcx<bcx?-1:1)*300}}
function bossStomp(){const b=boss,h=hero,bcx=b.x+b.w/2;h.vy=-720;h.vx=(h.x+PW/2<bcx?-1:1)*170;h.ground=null;h.dj=1;b.sq=1;
  if(b.st==='stun'){AUD.SFX.boing();return}
  b.hp--;b.st='stun';b.t=0;AUD.SFX.bossHit();shake=0.35;score+=500;sparkle(bcx,b.y,20);ftext('BOING!',bcx,b.y-30,'#ffe14d',1);
  if(b.hp===2)say('hit1',3);else if(b.hp===1)say('hit2',3);else bossWin()}
function bossWin(){const b=boss;b.st='happy';b.t=0;state='bosswin';stT=0;fwT=0;say('happy',3);AUD.SFX.cheer();AUD.setTheme('win');score+=1000;
  for(const e of L.enemies)if(!e.dead&&e.boss){e.dead=0.001;sparkle(e.x+15,e.y,8);L.coins.push({x:e.x+15,y:e.y,got:0,fall:1,vy:100,ph:0})}levelsDone.push(lvI)}
// ---------- camera ----------
function camUpdate(dt,snap){const h=hero;let tx=h.x+PW/2-VW*0.38+h.face*16;
  if(boss&&L.arena){const A=L.arena,lo=A.x0-36,hi=A.x0+A.w+80-VW;tx=hi<lo?(lo+hi)/2:clamp(tx,lo,hi)}
  tx=clamp(tx,0,Math.max(0,L.end-VW));const rz=L.zones.some(z=>z.on&&!z.done);let ty=Math.min(0,h.y+PH/2-VH*(rz?0.42:0.6));if(rz)ty=Math.min(ty,lavaY+40-VH);if(boss)ty=0;
  if(snap){camX=tx;camY=ty}else{camX+=(tx-camX)*Math.min(1,dt*6);camY+=(ty-camY)*Math.min(1,dt*4.5)}}
// ---------- kid-bot autopilot (debug/test only: drives the same inputs a kid would) ----------
function botThink(dt){const h=hero;let r=1,l=0,j=0;const feet=h.y+PH,front=h.x+PW;
  if(boss&&boss.st!=='happy'){const bcx=boss.x+boss.w/2,d=bcx-(h.x+PW/2);
    if(boss.st==='stun'||boss.st==='intro'){r=d<0?1:0;l=d<0?0:1;if(Math.abs(d)>200){r=0;l=0}}
    else{r=d>0?1:0;l=d<0?1:0;if(h.ground&&Math.abs(d)<150)j=1;if(!h.ground&&h.vy<0)j=1}
    inp.r=r;inp.l=l;if(j&&!bot.j)jumpEdge=true;bot.j=j;inp.j=j||(bot.j&&h.vy<0)?1:0;return}
  if(h.hot){inp.r=0;inp.l=0;inp.j=0;return}
  if(h.ground){bot.air=0;
    const ahead=surfaceBelow(front+14,feet-4);const gapAhead=(ahead==null||ahead>feet+60)&&h.ground!==LAVA_SURF;
    let wall=false;for(const s of L.solids){if(s.one||s.off)continue;if(s.x>=front-2&&s.x<front+26&&s.y<feet-4&&s.y+s.h>h.y)wall=true}
    let enemy=false;for(const e of L.enemies){if(e.dead)continue;const dx=e.x-front;if(dx>-10&&dx<70&&Math.abs(e.y+e.h-feet)<40)enemy=true}
    let qb=false;for(const b of L.qb){if(!b.used&&b.x+8>h.x&&b.x<front+30&&b.y<h.y&&b.y>h.y-120)qb=true}
    let mv=null;for(const m of L.movers){if(m.x+m.w>front-40&&m.x<front+320)mv=m}
    if(gapAhead){let target=false;for(const s of L.solids.concat(L.bouncers)){if(s.off||s.k==='wall')continue;if(s.x>front+4&&s.x<front+175&&s.y>feet-110&&s.y<feet+120)target=true}
      if(mv&&!target){const dx=mv.x-front;const go=dx<95&&dx>-mv.w+40&&mv.y>feet-110;if(!go){r=0;if(front>surfaceEdge(h.ground)-4)r=0}else j=1}
      else j=1}
    if(wall||enemy||qb)j=1;bot.wait=0}
  else{bot.air=(bot.air||0)+dt;if(h.vy<0)j=bot.j;
    if(h.pw.rocket>0&&h.dj>0&&h.vy>120){const below=surfaceBelow(h.x+PW/2,feet);if(below==null||below>lavaY-10){j=1;jumpEdge=true}}
    for(const m of L.movers){if(h.x+PW/2>m.x-20&&h.x+PW/2<m.x+m.w+20&&feet<m.y+4&&h.vy>0)r=(h.x+PW/2<m.x+m.w/2)?1:0}}
  if(j&&!bot.j&&h.ground)jumpEdge=true;bot.j=j;inp.r=r;inp.l=l;inp.j=j?1:0}
function surfaceEdge(s){return s?s.x+s.w:1e9}
