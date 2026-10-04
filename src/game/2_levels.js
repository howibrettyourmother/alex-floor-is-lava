// ================= levels (hand-built with a little seeded variety) =================
const LEVELS=[
 {theme:'living',name:'Living Room Lava',voice:'l1',music:'living',sub:'Couches, pillows & the classic game!'},
 {theme:'jungle',name:'Jungle Volcano',voice:'l2',music:'jungle',sub:'Bouncy mushrooms & a rumbling volcano!'},
 {theme:'caves',name:'Lava Caves',voice:'l3',music:'caves',sub:'Sparkly crystals & rising lava!'},
 {theme:'summit',name:'Volcano Summit',voice:'l4',music:'summit',sub:'Meet the grumpy Volcano King!'}];
let B=null;
const PH_OF={table:14,log:18,cushion:22,island:24,crystal:20,ledge:18};
function nl(i){seed=1234+i*977;const d=LEVELS[i];B={i,theme:d.theme,name:d.name,solids:[],movers:[],bouncers:[],qb:[],coins:[],gems:[],items:[],enemies:[],cps:[],signs:[],zones:[],erupts:[],goal:null,arena:null,cx:0,start:{x:70,y:220}};return B}
function seg(w,y,k,o){const s=Object.assign({x:B.cx,y,w,h:L0+170-y,k,one:0,v:srand()},o||{});B.solids.push(s);B.cx+=w;return s}
function gap(d){B.cx+=d}
function plat(w,y,k,o){const s=Object.assign({x:B.cx,y,w,h:PH_OF[k]||18,k,one:1,v:srand()},o||{});B.solids.push(s);B.cx+=w;return s}
function solid(x,y,w,h,k,o){const s=Object.assign({x,y,w,h,k,one:0,v:srand()},o||{});B.solids.push(s);return s}
function pipe(x,s,h){return solid(x,s.y-h,56,h+6,'pipe')}
function bounce(s,k){const b={x:s.x+s.w/2-26,y:s.y-22,w:52,h:22,k,sq:0,base:s};B.bouncers.push(b);return b}
function q(x,y,item){B.qb.push({x,y,w:32,h:32,item,used:0,bump:0})}
function qa(s,off,items){items.forEach((it,i)=>q(s.x+off+i*32,s.y-112,it))}
function coin(x,y){B.coins.push({x,y,got:0,ph:srand()*9})}
function row(x,y,n,dx){for(let i=0;i<n;i++)coin(x+i*(dx||28),y)}
function col(x,y,n,dy){for(let i=0;i<n;i++)coin(x,y-i*(dy||30))}
function arc(x0,x1,y,n,h){for(let i=0;i<n;i++){const t=n>1?i/(n-1):0.5;coin(lerp(x0,x1,t),y-4*(h||55)*t*(1-t))}}
function arcGap(a,b){const x0=a.x+a.w-22,x1=b.x+22,n=Math.max(3,Math.round((x1-x0)/30));arc(x0,x1,Math.min(a.y,b.y)-40,n,48)}
function gem(x,y){B.gems.push({x,y,got:0,c:B.gems.length%5})}
function blob(s,off,k){const e={k:k||'blob',x:s.x+off,y:s.y-26,w:30,h:26,vx:-38,minX:s.x+2,maxX:s.x+s.w-32,ph:srand()*9,dead:0,base:s.y,vy:0,jt:srr(0.5,1.5)};B.enemies.push(e);return e}
function bat(x,y,range){B.enemies.push({k:'bat',x,y,x0:x,y0:y,w:30,h:24,range:range||70,ph:srand()*9,dead:0,vx:0,vy:0})}
function cp(s,off){B.cps.push({x:s.x+off,y:s.y,on:0})}
function sign(x,y,k){B.signs.push({x,y,k})}
function mover(x,y,w,dx,dy,per,k){B.movers.push({x0:x,y0:y,x,y,px:x,py:y,w,h:20,dx,dy,per,ph:0,k:k||'rockplat',one:1,mover:1})}
function goal(s,off){B.goal={x:s.x+off,y:s.y}}
function zone(x0,x1){B.zones.push({x0,x1,on:0,done:0})}
function eruptAt(x){B.erupts.push({x,done:0})}
function buildLevel(i){nl(i);let a,b,c,s,x;
 if(i===0){// ---------------- 1: Living Room Lava ----------------
  a=seg(500,220,'couch');sign(a.x+110,a.y,'run');row(a.x+190,186,5);sign(a.x+440,a.y,'jump');
  gap(70);b=seg(150,200,'ottoman');arcGap(a,b);
  gap(80);a=seg(340,220,'couch');arcGap(b,a);sign(a.x+28,a.y,'q');qa(a,96,['coin','shield','coin']);blob(a,250);
  gap(90);b=seg(100,236,'ottoman');bounce(b,'pillow');col(b.x+50,160,4,34);gem(b.x+50,10);
  gap(70);a=seg(280,180,'books');row(a.x+40,150,6);
  gap(80);b=plat(100,190,'cushion');row(b.x+22,160,3);gap(80);c=plat(100,170,'cushion');row(c.x+22,140,3);gap(80);
  a=seg(420,220,'couch');cp(a,50);blob(a,230);qa(a,290,['boots']);sign(a.x+390,a.y,'lava');
  x=B.cx;gap(100);plat(90,200,'cushion');gap(100);plat(90,200,'cushion');gap(100);row(x+18,276,16,29);gem(x+240,268);
  a=seg(300,210,'couch');blob(a,170);
  gap(80);b=plat(140,190,'table');row(b.x+30,160,4);gap(90);c=plat(140,170,'table');blob(c,80);gap(90);
  a=seg(64,200,'blocks');seg(64,168,'blocks');s=seg(64,136,'blocks');gem(s.x+32,95);
  gap(90);a=seg(300,200,'couch');cp(a,60);blob(a,200);
  gap(80);b=seg(200,215,'ottoman');blob(b,120);gap(90);c=plat(100,185,'cushion');arcGap(b,c);gap(90);a=seg(280,215,'couch');qa(a,100,['coin','coin','coin']);blob(a,220);
  x=a.x+a.w;mover(x+10,205,100,130,0,4.2,'basket');gap(250);arc(x+10,x+240,170,7,70);gem(x+125,90);
  a=seg(380,220,'couch');qa(a,110,['coin','rocket']);blob(a,270);
  gap(60);b=seg(170,140,'books');row(b.x+30,110,5);gem(b.x+85,62);
  gap(90);b=seg(90,250,'ottoman');bounce(b,'pillow');gap(120);c=seg(90,250,'ottoman');bounce(c,'pillow');arc(b.x+60,c.x+30,120,5,60);gap(110);
  a=seg(660,220,'couch');cp(a,40);row(a.x+120,186,6);goal(a,440);
 }else if(i===1){// ---------------- 2: Jungle Volcano ----------------
  a=seg(460,220,'grass');row(a.x+180,186,6);
  gap(80);b=plat(120,195,'island');arcGap(a,b);gap(80);
  a=seg(320,215,'grass');qa(a,70,['coin','shield']);blob(a,220);
  gap(70);a=seg(440,215,'grass');pipe(a.x+140,a,64);pipe(a.x+320,a,92);blob(a,240);row(a.x+150,120,3);row(a.x+330,92,3);gem(a.x+348,30);
  gap(90);b=seg(90,240,'rock');bounce(b,'mush');col(b.x+45,160,5,36);gem(b.x+45,-30);
  gap(100);a=seg(380,210,'grass');cp(a,50);blob(a,250,'hopper');eruptAt(a.x+120);
  gap(70);a=seg(560,220,'grass');pipe(a.x+300,a,70);blob(a,160);blob(a,440,'hopper');
  gap(90);b=plat(120,200,'island');gap(90);c=plat(120,168,'island');gem(c.x+60,120);gap(90);b=plat(120,195,'island');gap(90);
  a=seg(320,220,'grass');qa(a,96,['coin','rocket']);blob(a,250,'hopper');
  gap(70);b=seg(70,150,'pipe');row(b.x+8,118,2);gap(80);
  a=seg(240,210,'rock');x=a.x+a.w;mover(x+10,200,100,140,0,4.2,'rockplat');gap(260);arc(x+10,x+250,165,7,70);
  a=seg(360,215,'grass');cp(a,40);blob(a,170);blob(a,300);
  gap(80);b=plat(220,200,'log');blob(b,140);row(b.x+30,170,6);gem(b.x+110,120);gap(80);
  a=seg(300,215,'grass');blob(a,150,'hopper');gap(90);b=plat(120,190,'island');gap(90);c=plat(120,170,'island');blob(c,50);gap(90);a=seg(260,210,'grass');qa(a,90,['coin','shield']);gap(80);
  b=seg(90,250,'rock');bounce(b,'mush');gap(130);c=seg(90,240,'rock');bounce(c,'mush');arc(b.x+60,c.x+30,110,5,70);gem(c.x+45,40);gap(110);
  a=seg(640,220,'grass');cp(a,40);row(a.x+120,186,6);goal(a,440);
 }else if(i===2){// ---------------- 3: Lava Caves ----------------
  a=seg(440,220,'cave');row(a.x+180,186,6);
  gap(80);b=plat(110,200,'crystal');arcGap(a,b);gap(80);
  a=seg(300,215,'cave');bat(a.x+200,140,60);qa(a,50,['coin','boots']);
  x=B.cx;gap(100);plat(90,195,'crystal');gap(100);plat(90,195,'crystal');gap(100);row(x+18,276,16,29);gem(x+240,268);
  a=seg(280,215,'cave');cp(a,60);blob(a,190);
  x=B.cx;gap(200);mover(x+50,190,100,0,-70,3.6,'rockplat');
  a=seg(320,210,'cave');pipe(a.x+180,a,70);bat(a.x+120,120,50);gem(a.x+208,90);
  gap(80);a=seg(280,215,'cave');bat(a.x+140,130,80);blob(a,200);gap(90);b=plat(110,195,'crystal');gap(90);c=seg(240,205,'cave');pipe(c.x+120,c,80);row(c.x+128,95,2);gap(80);
  a=seg(300,220,'cave');cp(a,40);sign(a.x+150,a.y,'up');zone(a.x+190,0);
  for(let k=0;k<8;k++){gap(45);s=plat(110,220-60*(k+1),'crystal');if(k%2)row(s.x+27,s.y-30,3);if(k===5)gem(s.x+55,s.y-60);if(k===3)blob(s,40)}
  gap(50);a=seg(340,-260,'cave');cp(a,60);B.zones[0].x1=a.x+20;row(a.x+120,-292,6);gem(a.x+300,-310);
  gap(60);a=seg(400,220,'cave');blob(a,200);blob(a,320);qa(a,120,['shield']);
  gap(90);b=plat(110,190,'crystal');gap(90);c=plat(110,190,'crystal');bat(c.x+55,120,40);gem(b.x+200,110);gap(90);
  a=seg(620,220,'cave');cp(a,40);row(a.x+120,186,6);goal(a,440);
 }else{// ---------------- 4: Volcano Summit + Volcano King ----------------
  a=seg(440,220,'basalt');row(a.x+180,186,6);
  gap(90);b=seg(110,200,'basalt');arcGap(a,b);gap(90);
  a=seg(320,215,'basalt');qa(a,60,['coin','rocket']);blob(a,240,'hopper');
  x=a.x+a.w;mover(x+10,200,100,140,0,4,'rockplat');gap(260);arc(x+10,x+250,165,7,70);gem(x+130,85);
  a=seg(340,210,'basalt');cp(a,50);eruptAt(a.x+110);
  gap(70);a=seg(520,220,'basalt');pipe(a.x+260,a,70);blob(a,140);blob(a,420);
  gap(90);b=seg(90,250,'basalt');bounce(b,'mush');gap(130);c=seg(90,240,'basalt');bounce(c,'mush');arc(b.x+60,c.x+30,110,5,70);gem(c.x+45,40);gap(110);
  a=seg(300,215,'basalt');cp(a,40);zone(a.x+190,0);qa(a,150,['shield']);
  for(let k=0;k<5;k++){gap(45);s=plat(110,215-60*(k+1),'ledge');if(k%2===0)row(s.x+27,s.y-30,3);if(k===4)gem(s.x+55,s.y-62)}
  gap(50);a=seg(300,-85,'basalt');B.zones[0].x1=a.x+20;row(a.x+100,-117,5);
  gap(60);a=seg(380,220,'basalt');blob(a,180);blob(a,300,'hopper');
  gap(90);b=plat(120,190,'ledge');gap(90);c=plat(120,180,'ledge');gem(c.x+60,130);gap(90);
  a=seg(320,240,'basalt');cp(a,60);sign(a.x+200,a.y,'king');
  const ar=seg(640,240,'arena');B.arena={x0:ar.x,w:640,y:240};
  solid(ar.x+640,-420,80,900,'wall');B.arena.gate=solid(ar.x-36,-420,36,660,'wall',{off:1});
  solid(ar.x+40,150,96,18,'ledge',{one:1});gem(ar.x+88,112);solid(ar.x+504,150,96,18,'ledge',{one:1});
 }
 B.end=B.cx;B.gemsTotal=B.gems.length;return B}
