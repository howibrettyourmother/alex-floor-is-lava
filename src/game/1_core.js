// ================= core: canvas, layout, input, state =================
const cv=document.getElementById('c'),X=cv.getContext('2d');
const DEBUG=/[?&]debug=1/.test(location.search),OGMODE=/[?&]og=1/.test(location.search);
const VERSION='1.1.0';const VH=360,L0=300,FONT='"Arial Rounded MT Bold","Fredoka","Baloo 2","Trebuchet MS",system-ui,sans-serif';
let SW=0,SH=0,DPR=1,SC=1,VW=640,OX=0,OY=0,portrait=false,INS={l:0,r:0,t:0,b:0};
const insEl=document.createElement('div');insEl.style.cssText='position:fixed;left:0;top:0;width:0;height:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);visibility:hidden;pointer-events:none';document.body.appendChild(insEl);
function resize(){SW=innerWidth;SH=innerHeight;DPR=Math.min(devicePixelRatio||1,2.5);
  const cs=getComputedStyle(insEl);INS={t:parseFloat(cs.paddingTop)||0,r:parseFloat(cs.paddingRight)||0,b:parseFloat(cs.paddingBottom)||0,l:parseFloat(cs.paddingLeft)||0};
  portrait=SH>SW*1.1;
  if(!portrait){SC=SH/VH;VW=SW/SC;OX=0;OY=0}
  else{VW=430;SC=SW/VW;OX=0;OY=Math.round(Math.max(INS.t+84,(SH-VH*SC)*0.3))}
  cv.width=Math.round(SW*DPR);cv.height=Math.round(SH*DPR);cv.style.width=SW+'px';cv.style.height=SH+'px'}
addEventListener('resize',resize);addEventListener('orientationchange',()=>setTimeout(resize,200));resize();
const R=Math.random,rr=(a,b)=>a+R()*(b-a),pick=a=>a[(R()*a.length)|0],clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,TAU=Math.PI*2;
const ease=t=>t<0?0:t>1?1:1-Math.pow(1-t,3),easeB=t=>{t=clamp(t,0,1);const c=1.70158;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
let seed=1;const srand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646},srr=(a,b)=>a+srand()*(b-a),spick=a=>a[(srand()*a.length)|0];
const approach=(v,t,d)=>v<t?Math.min(v+d,t):Math.max(v-d,t);
const ov=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
// ---------- persistent prefs ----------
const CAPES=[['#e53935','#ffca28'],['#1e88e5','#ff7043'],['#8e24aa','#ffd54f'],['#43a047','#ffee58'],['#fb8c00','#4fc3f7'],['#ec407a','#b2ff59']];
let capeI=+(localStorage.getItem('afl_cape')||0)%CAPES.length,best=+(localStorage.getItem('afl_best')||0),unlockLv=+(localStorage.getItem('afl_unlock')||1),autoRun=localStorage.getItem('afl_auto')==='1';
// ---------- physics constants (forgiving!) ----------
const GRAV=2100,GRAV_HOLD=1150,JV=565,RUNV=215,ACC=1700,AIR=1300,DEC=2600,MAXF=700,COY=0.14,BUF=0.18,PW=24,PH=34,BOUNCEV=820;
const POW_T={boots:12,rocket:25};
// ---------- game state ----------
let state='title',T=0,stT=0,TS=1,lvI=0,L=null,hero=null,camX=0,camY=0,lavaY=L0,shake=0,parts=[],floats=[],banner=null,card=null,paused=false;
let score=0,coins=0,gems=0,gemsTotal=0,lvCoins=0,lvGems=0,runTime=0,hearts=3,checkpoint=null,fallLog=[],lastSay=-99,boss=null,erupt=null,lvStartScore=0,stomps=0,falls=0,deaths=0,powCount=0,bigJumps=0,levelsDone=[];
const inp={l:0,r:0,j:0},keys={};let jumpEdge=false;const bot={on:false,j:0,t:0,wait:0};
// ---------- layout of on-screen controls (CSS px) ----------
function ctl(){if(!portrait){const k=clamp(SH/390,1,1.7),pad=14*k;const y=SH-INS.b-pad-50*k;
    return{k,L:{x:INS.l+pad+50*k,y,r:46*k},R:{x:INS.l+pad+50*k+112*k,y,r:46*k},J:{x:SW-INS.r-pad-64*k,y:SH-INS.b-pad-64*k,r:62*k}}}
  const top=OY+VH*SC,bot=SH-INS.b,k=clamp(SW/390,1,1.6),y=top+(bot-top)*0.55;
  return{k,L:{x:SW*0.16,y,r:44*k},R:{x:SW*0.42,y,r:44*k},J:{x:SW*0.78,y,r:60*k}}}
function zoneFor(px,py){const c=ctl();
  if(portrait){if(py<OY+VH*SC+6)return null;return px>SW*0.6?'j':(px<(c.L.x+c.R.x)/2?'l':'r')}
  if(py<SH*0.3)return null;if(px>c.R.x+c.R.r*1.7)return 'j';return px<(c.L.x+c.R.x)/2?'l':'r'}
// Input tracking. Touches are tracked per Touch.identifier ('t'+id) via Touch Events; mouse/pen via Pointer Events ('p'+id).
// iOS can silently drop a touchend (app switch, notification, multitasking gesture, Siri, lock), which used to leave a
// finger "held" on RIGHT forever. So: every touch event reconciles against e.touches (the fingers really on the glass),
// and any cancel / blur / visibility change / pagehide clears ALL input state.
const ptrs=new Map();
function syncInp(){let l=0,r=0,j=0;for(const z of ptrs.values()){if(z==='l')l=1;if(z==='r')r=1;if(z==='j')j=1}
  inp.l=l||keys.ArrowLeft||keys.KeyA?1:0;inp.r=r||keys.ArrowRight||keys.KeyD?1:0;inp.j=j||keys.Space||keys.ArrowUp||keys.KeyW||keys.KeyZ?1:0}
function clearInput(){ptrs.clear();for(const k in keys)keys[k]=0;jumpEdge=false;inp.l=inp.r=inp.j=0;syncInp()}
const toL=(px,py)=>({x:(px-OX)/SC,y:(py-OY)/SC});
function press(id,cx,cy){const p=toL(cx,cy);
  if(state==='play'&&!paused){if(hudTap(p))return;const z=zoneFor(cx,cy);if(z){ptrs.set(id,z);if(z==='j')jumpEdge=true;if(z==='l')autoRunOff();syncInp();return}}
  uiTap(p)}
function slide(id,cx,cy){const z=ptrs.get(id);if(z!=='l'&&z!=='r')return;const n=zoneFor(cx,cy);if((n==='l'||n==='r')&&n!==z){ptrs.set(id,n);syncInp()}}
function release(id){if(ptrs.delete(id))syncInp()}
function reconcile(e){const live=new Set();for(let i=0;i<e.touches.length;i++)live.add('t'+e.touches[i].identifier);let ch=false;
  for(const k of [...ptrs.keys()])if(k[0]==='t'&&!live.has(k)){ptrs.delete(k);ch=true}if(ch)syncInp()}
const each=(e,fn)=>{for(let i=0;i<e.changedTouches.length;i++){const t=e.changedTouches[i];fn('t'+t.identifier,t.clientX,t.clientY)}};
cv.addEventListener('touchstart',e=>{e.preventDefault();reconcile(e);each(e,press)},{passive:false});
cv.addEventListener('touchmove',e=>{e.preventDefault();reconcile(e);each(e,slide)},{passive:false});
cv.addEventListener('touchend',e=>{each(e,release);reconcile(e)});
cv.addEventListener('touchcancel',()=>clearInput());
// mouse / pen only (touch is handled above, so a finger is never counted twice)
const isT=e=>e.pointerType==='touch';
cv.addEventListener('pointerdown',e=>{if(isT(e))return;e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}press('p'+e.pointerId,e.clientX,e.clientY)},{passive:false});
cv.addEventListener('pointermove',e=>{if(!isT(e))slide('p'+e.pointerId,e.clientX,e.clientY)});
['pointerup','lostpointercapture'].forEach(ev=>addEventListener(ev,e=>{if(!isT(e))release('p'+e.pointerId)}));
addEventListener('pointercancel',()=>clearInput());
addEventListener('blur',clearInput);addEventListener('pagehide',clearInput);
document.addEventListener('visibilitychange',()=>{clearInput();if(document.hidden&&state==='play')paused=true});
addEventListener('keydown',e=>{if(e.repeat){return}keys[e.code]=1;if(state==='play'&&!paused&&(e.code==='ArrowLeft'||e.code==='KeyA'))autoRunOff();if(['Space','ArrowUp','KeyW','KeyZ'].includes(e.code)){jumpEdge=true;if(state!=='play')uiKey('go')}
  if(e.code==='Enter')uiKey('go');if(e.code==='KeyP'||e.code==='Escape')uiKey('pause');if(e.code==='KeyM')toggleMute();syncInp();if(e.code.startsWith('Arrow')||e.code==='Space')e.preventDefault()});
addEventListener('keyup',e=>{keys[e.code]=0;syncInp()});
function toggleMute(){AUD.setMuted(!AUD.muted);AUD.SFX.click()}
function say(k,prio,minGap){if(minGap&&T-lastSay<minGap)return false;const r=AUD.say(k,prio||1);if(r)lastSay=T;return r}
