// ================= drawing: world & characters (all original procedural art) =================
function rrect(x,y,w,h,r){r=Math.min(r,w/2,h/2);X.beginPath();X.moveTo(x+r,y);X.arcTo(x+w,y,x+w,y+h,r);X.arcTo(x+w,y+h,x,y+h,r);X.arcTo(x,y+h,x,y,r);X.arcTo(x,y,x+w,y,r);X.closePath()}
function txt(s,x,y,sz,fill,o){o=o||{};X.font=(o.w||'bold ')+sz+'px '+FONT;X.textAlign=o.a||'center';X.textBaseline=o.b||'middle';
  if(o.sw!==0){X.lineJoin='round';X.lineWidth=o.sw||Math.max(3,sz*0.18);X.strokeStyle=o.st||'#4a1a1a';X.strokeText(s,x,y)}X.fillStyle=fill;X.fillText(s,x,y)}
const hsh=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)};
function circ(x,y,r,f){X.beginPath();X.arc(x,y,r,0,TAU);X.fillStyle=f;X.fill()}
function ell(x,y,rx,ry,f){X.beginPath();X.ellipse(x,y,Math.max(0.1,rx),Math.max(0.1,ry),0,0,TAU);X.fillStyle=f;X.fill()}
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;const f=v=>Math.round(clamp(k<0?v*(1+k):v+(255-v)*k,0,255));return'#'+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1)}
// ---------- backgrounds ----------
function drawVolcano(cx,by,sc,act,happy){X.save();X.translate(cx,by);X.scale(sc,sc);
  const g=X.createLinearGradient(0,-170,0,0);g.addColorStop(0,happy?'#8a6a4a':'#7a4a3a');g.addColorStop(1,happy?'#4f6b3a':'#4a2a35');
  X.beginPath();X.moveTo(-230,0);X.quadraticCurveTo(-120,-60,-46,-165);X.lineTo(46,-165);X.quadraticCurveTo(120,-60,230,0);X.closePath();X.fillStyle=g;X.fill();
  X.fillStyle='rgba(255,255,255,0.08)';X.beginPath();X.moveTo(-46,-165);X.lineTo(-10,-165);X.quadraticCurveTo(-60,-60,-150,0);X.lineTo(-200,0);X.quadraticCurveTo(-110,-60,-46,-165);X.fill();
  X.strokeStyle='#ff8a2a';X.lineWidth=7;X.lineCap='round';X.beginPath();X.moveTo(-20,-162);X.quadraticCurveTo(-34,-110,-18,-70);X.stroke();X.beginPath();X.moveTo(24,-162);X.quadraticCurveTo(44,-120,30,-96);X.stroke();
  ell(0,-165,47,9,'#ffb02e');ell(0,-166,36,5,'#ffe27a');
  const n=act?7:4;for(let i=0;i<n;i++){const t=(T*0.25+i/n)%1;circ(Math.sin(i*2.1+T*0.5)*22*t,-175-t*120,10+t*30,`rgba(${act?'90,80,90':'120,110,120'},${0.5*(1-t)})`)}
  if(act){for(let i=0;i<10;i++){const t=(T*1.4+i/10)%1,a=(i/10-0.5)*1.4;circ(Math.sin(a)*120*t,-170-Math.sin(t*Math.PI)*110*Math.cos(a*0.5),7*(1-t)+3,i%2?'#ffd23f':'#ff7b1f')}
    const gl=X.createRadialGradient(0,-170,10,0,-170,160);gl.addColorStop(0,'rgba(255,190,60,0.5)');gl.addColorStop(1,'rgba(255,120,0,0)');X.fillStyle=gl;X.fillRect(-170,-330,340,320)}
  X.restore()}
function drawBG(th){const W=VW;let g;
  if(th==='living'){g=X.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#fff1d6');g.addColorStop(1,'#ffcf9a');X.fillStyle=g;X.fillRect(0,0,W,VH);
    const ox=-(camX*0.3)%60,oy=-camY*0.3;X.fillStyle='rgba(255,170,120,0.16)';for(let x=ox-60;x<W+60;x+=60)X.fillRect(x,0,26,VH);
    X.fillStyle='rgba(255,255,255,0.3)';for(let x=ox-60;x<W+60;x+=60)for(let y=(oy%50)-50;y<VH;y+=50){X.beginPath();X.arc(x+43,y+25,3,0,TAU);X.fill()}
    const p=0.45,sp=430,i0=Math.floor(camX*p/sp)-1;for(let i=i0;i<i0+W/sp+3;i++){const x=i*sp-camX*p,y=80-camY*p,k=Math.floor(hsh(i)*5);
      if(k===0){rrect(x,y,130,110,6);X.fillStyle='#fff';X.fill();rrect(x+8,y+8,114,94,3);const s=X.createLinearGradient(0,y,0,y+100);s.addColorStop(0,'#8fd8ff');s.addColorStop(1,'#d8f3ff');X.fillStyle=s;X.fill();
        circ(x+40,y+40,12,'#fff');circ(x+52,y+36,14,'#fff');circ(x+64,y+42,10,'#fff');X.fillStyle='#fff';X.fillRect(x+63,y+8,4,94);X.fillRect(x+8,y+53,114,4);
        X.fillStyle='#e85d75';X.beginPath();X.moveTo(x-12,y-10);X.lineTo(x+26,y-10);X.quadraticCurveTo(x+10,y+60,x+18,y+130);X.lineTo(x-12,y+130);X.fill();X.beginPath();X.moveTo(x+142,y-10);X.lineTo(x+104,y-10);X.quadraticCurveTo(x+120,y+60,x+112,y+130);X.lineTo(x+142,y+130);X.fill()}
      else if(k===1){rrect(x+10,y+4,96,76,4);X.fillStyle='#c7883f';X.fill();rrect(x+18,y+12,80,60,2);X.fillStyle='#fffdf3';X.fill();
        X.fillStyle='#8a5a3a';X.beginPath();X.moveTo(x+28,y+66);X.lineTo(x+52,y+30);X.lineTo(x+64,y+30);X.lineTo(x+88,y+66);X.fill();X.fillStyle='#ff6a1f';X.beginPath();X.arc(x+58,y+26,8,0,TAU);X.fill();
        X.strokeStyle='#ff6a1f';X.lineWidth=3;for(let j=0;j<3;j++){X.beginPath();X.moveTo(x+58,y+24);X.lineTo(x+46+j*12,y+14);X.stroke()}circ(x+86,y+22,6,'#ffd23f')}
      else if(k===2){X.fillStyle='#8a5a3a';X.fillRect(x+40,y+30,6,190);ell(x+43,y+220,26,6,'#8a5a3a');X.fillStyle='#ffe08a';X.beginPath();X.moveTo(x+22,y+34);X.lineTo(x+64,y+34);X.lineTo(x+56,y);X.lineTo(x+30,y);X.fill();
        const gl=X.createRadialGradient(x+43,y+30,4,x+43,y+40,70);gl.addColorStop(0,'rgba(255,240,170,0.5)');gl.addColorStop(1,'rgba(255,240,170,0)');X.fillStyle=gl;X.fillRect(x-30,y-30,150,150)}
      else if(k===3){circ(x+60,y+40,30,'#7a4a2a');circ(x+60,y+40,25,'#fffaf0');X.strokeStyle='#4a2a1a';X.lineWidth=3;X.beginPath();X.moveTo(x+60,y+40);X.lineTo(x+60+Math.sin(T)*16,y+40-Math.cos(T)*16);X.moveTo(x+60,y+40);X.lineTo(x+70,y+44);X.stroke()}
      else{X.fillStyle='#b97a4a';X.fillRect(x,y+20,120,150);for(let r=0;r<3;r++){X.fillStyle='#8a5a3a';X.fillRect(x,y+20+r*50,120,6);for(let b=0;b<6;b++){X.fillStyle=['#4dd6ff','#ff6b8b','#ffd23f','#7cff6b','#c387ff','#ff9f1c'][(b+r+i)%6];X.fillRect(x+8+b*18,y+30+r*50+(b%2)*4,14,36-(b%2)*4)}}}}}
  else if(th==='jungle'){g=X.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#6fd0ff');g.addColorStop(0.7,'#c9f1ff');g.addColorStop(1,'#ffe0b0');X.fillStyle=g;X.fillRect(0,0,W,VH);
    circ(W*0.15,60-camY*0.05,26,'rgba(255,250,200,0.9)');
    drawVolcano(W*0.7-camX*0.035,300-camY*0.08,0.95,!!erupt);
    for(let l=0;l<2;l++){const p=0.18+l*0.14,yb=250-camY*p+l*20;X.fillStyle=l?'#4fb85a':'#7fcf86';X.beginPath();X.moveTo(0,VH);for(let x=0;x<=W+20;x+=20){const wx=x+camX*p;X.lineTo(x,yb-30-Math.sin(wx*0.006+l)*28-Math.sin(wx*0.017)*10)}X.lineTo(W,VH);X.fill()}
    const p=0.5,sp=230,i0=Math.floor(camX*p/sp)-1;for(let i=i0;i<i0+W/sp+3;i++){const x=i*sp-camX*p+hsh(i)*80,y=290-camY*p;palm(x,y,0.8+hsh(i+3)*0.4)}
    const pv=0.9,sv=170,j0=Math.floor(camX*pv/sv)-1;for(let i=j0;i<j0+W/sv+3;i++){const x=i*sv-camX*pv,len=40+hsh(i)*70,yy=-camY*pv-10;if(yy+len<0)continue;X.strokeStyle='#2f8a3a';X.lineWidth=4;X.beginPath();X.moveTo(x,yy);X.quadraticCurveTo(x+Math.sin(T+i)*8,yy+len/2,x+4,yy+len);X.stroke();
      for(let k=1;k<4;k++){ell(x+(k%2?6:-4),yy+len*k/4,6,3,'#46b04f')}}}
  else if(th==='caves'){g=X.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#24113a');g.addColorStop(1,'#5a1f3a');X.fillStyle=g;X.fillRect(0,0,W,VH);
    let p=0.2,sp=520,i0=Math.floor(camX*p/sp)-1;for(let i=i0;i<i0+W/sp+3;i++){const x=i*sp-camX*p+hsh(i)*200;const lg=X.createLinearGradient(x,0,x+26,0);lg.addColorStop(0,'rgba(255,120,40,0)');lg.addColorStop(0.5,'rgba(255,150,60,0.55)');lg.addColorStop(1,'rgba(255,120,40,0)');X.fillStyle=lg;X.fillRect(x-20,0,66,VH);
      X.fillStyle='rgba(255,200,90,0.5)';for(let k=0;k<4;k++){const yy=((T*60+k*90+i*37)%VH);X.fillRect(x+8,yy,10,24)}}
    p=0.4;sp=200;i0=Math.floor(camX*p/sp)-1;for(let i=i0;i<i0+W/sp+3;i++){const x=i*sp-camX*p+hsh(i)*60,y=300-camY*p-hsh(i+9)*80;crystal(x,y,0.7+hsh(i+1)*0.6,hsh(i+2)<0.5?'#b06bff':'#4de0ff',0.55)}
    p=0.7;sp=90;i0=Math.floor(camX*p/sp)-1;X.fillStyle='#1a0c28';for(let i=i0;i<i0+W/sp+3;i++){const x=i*sp-camX*p,len=30+hsh(i)*70,yy=-camY*p-20;X.beginPath();X.moveTo(x,yy);X.lineTo(x+22,yy);X.lineTo(x+11,yy+len+20);X.fill()}
    for(let i=0;i<14;i++){const x=(hsh(i)*W+T*12*(1+hsh(i+5)))%W,y=VH-((T*26*(0.5+hsh(i+7))+hsh(i+2)*VH)%VH);circ(x,y,1.6+hsh(i)*1.5,'rgba(255,190,90,0.8)')}}
  else{g=X.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#6a3a9a');g.addColorStop(0.45,'#ff6e7f');g.addColorStop(1,'#ffbf69');X.fillStyle=g;X.fillRect(0,0,W,VH);
    for(let i=0;i<5;i++){const x=((i*260-camX*0.08-T*6)%(W+300)+W+300)%(W+300)-150,y=50+i*23-camY*0.05;ell(x,y,60,12,'rgba(255,220,230,0.45)');ell(x+30,y-6,40,12,'rgba(255,230,240,0.45)')}
    drawVolcano(W*0.62-camX*0.03,330-camY*0.06,1.25,!!erupt||state==='title');
    const p=0.32,sp=170,i0=Math.floor(camX*p/sp)-1;X.fillStyle='#5a2a5a';for(let i=i0;i<i0+W/sp+3;i++){const x=i*sp-camX*p+hsh(i)*50,h=60+hsh(i+4)*90,y=310-camY*p;X.beginPath();X.moveTo(x,y);X.lineTo(x+18,y-h);X.lineTo(x+34,y-h+10);X.lineTo(x+60,y);X.fill()}
    for(let i=0;i<16;i++){const x=(hsh(i)*W-T*14*(1+hsh(i+3))%W+W*2)%W,y=(hsh(i+1)*VH+T*18*(0.4+hsh(i+8)))%VH;circ(x,y,1.5+hsh(i)*1.4,'rgba(255,240,220,0.6)')}}}
function palm(x,y,s){X.save();X.translate(x,y);X.scale(s,s);X.strokeStyle='#9a6a3a';X.lineWidth=9;X.lineCap='round';X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(14,-70,6,-130);X.stroke();
  X.fillStyle='#2f9a4a';for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*0.62+Math.sin(T*1.5+x)*0.04;X.save();X.translate(6,-130);X.rotate(a);X.beginPath();X.ellipse(30,0,34,9,0.25,0,TAU);X.fill();X.restore()}circ(2,-124,6,'#7a4a2a');circ(12,-122,6,'#7a4a2a');X.restore()}
function crystal(x,y,s,c,a){X.save();X.globalAlpha=a==null?1:a;X.translate(x,y);X.scale(s,s);[[-14,0,10,46,-0.2],[0,0,13,64,0],[15,0,9,40,0.25]].forEach(([dx,dy,w,h,r])=>{X.save();X.translate(dx,dy);X.rotate(r);X.beginPath();X.moveTo(-w,0);X.lineTo(-w,-h*0.7);X.lineTo(0,-h);X.lineTo(w,-h*0.7);X.lineTo(w,0);X.closePath();X.fillStyle=c;X.fill();X.fillStyle='rgba(255,255,255,0.35)';X.beginPath();X.moveTo(-w,-h*0.7);X.lineTo(0,-h);X.lineTo(0,0);X.lineTo(-w,0);X.fill();X.restore()});X.restore()}
// ---------- solids ----------
const COUCH=['#3fb7a8','#f2a541','#e2626b','#6c8cff','#9b6bd6'],PASTEL=['#ffb3c7','#b3e5ff','#c9f7b3','#ffe9a3','#e1c4ff'];
function drawSolid(s){if(s.off)return;if(s.x>camX+VW+40||s.x+s.w<camX-40||s.y>camY+VH+20)return;const x=s.x,y=s.y,w=s.w,bot=Math.max(y+10,Math.min(s.y+s.h,lavaY+30));let c;
  switch(s.k){
  case'couch':c=COUCH[(s.v*COUCH.length)|0];rrect(x+8,y-34,w-16,44,14);X.fillStyle=shade(c,-0.18);X.fill();
    X.fillStyle=shade(c,-0.45);X.fillRect(x+14,y+44,10,40);X.fillRect(x+w-24,y+44,10,40);rrect(x,y,w,48,12);X.fillStyle=c;X.fill();
    X.fillStyle=shade(c,0.25);rrect(x+4,y+2,w-8,10,6);X.fill();const n=Math.max(1,Math.round(w/90));X.strokeStyle=shade(c,-0.25);X.lineWidth=2;for(let i=1;i<n;i++){X.beginPath();X.moveTo(x+i*w/n,y+3);X.lineTo(x+i*w/n,y+30);X.stroke()}
    rrect(x-6,y-6,22,52,10);X.fillStyle=shade(c,-0.08);X.fill();rrect(x+w-16,y-6,22,52,10);X.fill();X.fillStyle=shade(c,-0.3);X.fillRect(x+6,y+36,w-12,4);break;
  case'ottoman':c=PASTEL[(s.v*PASTEL.length)|0];X.fillStyle='#8a5a3a';X.fillRect(x+8,y+46,8,50);X.fillRect(x+w-16,y+46,8,50);rrect(x,y,w,52,14);X.fillStyle=c;X.fill();
    X.fillStyle=shade(c,0.4);rrect(x+4,y+3,w-8,10,6);X.fill();for(let i=0;i<Math.floor(w/26);i++)circ(x+16+i*26,y+28,3,shade(c,-0.3));break;
  case'books':for(let yy=y,i=0;yy<bot;yy+=20,i++){const off=(hsh(i+s.x)*10-5)|0;rrect(x+off,yy,w-Math.abs(off),20,3);X.fillStyle=['#e2626b','#3f8fd8','#f2c541','#4fb86a','#9b6bd6','#ff8a3d'][(i+((s.v*6)|0))%6];X.fill();X.fillStyle='rgba(255,255,255,0.65)';X.fillRect(x+off+6,yy+4,w-Math.abs(off)-12,3);X.fillStyle='rgba(0,0,0,0.15)';X.fillRect(x+off+12,yy+10,30,4)}break;
  case'blocks':for(let yy=y,i=0;yy<bot;yy+=32,i++){const cc=['#ff6b6b','#4dabf7','#ffd43b','#51cf66'][(i+((x/64)|0))%4];rrect(x+1,yy+1,w-2,30,5);X.fillStyle=cc;X.fill();rrect(x+6,yy+6,w-12,20,4);X.fillStyle=shade(cc,0.35);X.fill();txt('ABCDEFGH'[(i+((x/64)|0))%8],x+w/2,yy+17,18,shade(cc,-0.35),{sw:0})}break;
  case'cushion':c=PASTEL[(s.v*PASTEL.length)|0];rrect(x-2,y,w+4,22,11);X.fillStyle=c;X.fill();X.fillStyle=shade(c,0.45);rrect(x+6,y+3,w-12,6,3);X.fill();X.strokeStyle=shade(c,-0.2);X.lineWidth=2;X.beginPath();X.moveTo(x+w/2,y+4);X.lineTo(x+w/2,y+18);X.stroke();
    circ(x-2,y+11,4,shade(c,-0.25));circ(x+w+2,y+11,4,shade(c,-0.25));X.fillStyle='rgba(0,0,0,0.12)';ell(x+w/2,y+30,w*0.4,3,'rgba(0,0,0,0.12)');break;
  case'table':X.fillStyle='#8a5a3a';X.fillRect(x+10,y+10,9,bot-y);X.fillRect(x+w-19,y+10,9,bot-y);rrect(x-4,y,w+8,14,4);X.fillStyle='#c98a4f';X.fill();X.fillStyle='#e0a86a';X.fillRect(x,y+2,w,3);break;
  case'grass':case'rock':case'basalt':case'cave':case'arena':{const top={grass:'#5cd65c',rock:'#9a8a7a',basalt:'#6a4a5a',cave:'#7a5a9a',arena:'#7a4a5a'}[s.k],body={grass:'#b9773e',rock:'#7a6a5e',basalt:'#3e2a3a',cave:'#4a2f62',arena:'#4a2a3a'}[s.k];
    X.fillStyle=body;X.fillRect(x,y+6,w,bot-y);X.fillStyle=shade(body,-0.2);for(let i=0;i*28<w;i++){const hx=x+8+i*28+hsh(i+x)*10,hy=y+30+hsh(i*3+x)*60;if(hx<x+w-8&&hy<bot-6){rrect(hx,hy,12,7,3);X.fill()}}
    if(s.k==='basalt'||s.k==='arena'){X.strokeStyle='rgba(255,120,40,0.8)';X.lineWidth=2;for(let i=0;i*60<w-30;i++){const hx=x+20+i*60;X.beginPath();X.moveTo(hx,y+16);X.lineTo(hx+8,y+30);X.lineTo(hx+2,y+44);X.stroke()}}
    if(s.k==='cave'){for(let i=0;i*70<w-30;i++)crystal(x+30+i*70+hsh(i+x)*20,y+60+hsh(i)*30,0.35,hsh(i+x)<0.5?'#b06bff':'#4de0ff')}
    rrect(x-3,y,w+6,14,7);X.fillStyle=top;X.fill();X.fillStyle=shade(top,0.3);X.fillRect(x+4,y+2,w-8,3);
    if(s.k==='grass'){X.fillStyle=top;for(let i=0;i*16<w;i++){X.beginPath();X.arc(x+8+i*16,y+12,7,0,Math.PI);X.fill()}for(let i=0;i*90<w-20;i++){const fx=x+20+i*90+hsh(i+x)*30;X.strokeStyle='#2f8a3a';X.lineWidth=2;X.beginPath();X.moveTo(fx,y);X.lineTo(fx,y-9);X.stroke();circ(fx,y-11,4,['#ff6b8b','#ffd23f','#fff'][i%3]);circ(fx,y-11,1.6,'#ff9f1c')}}
    if(s.k==='arena'){X.fillStyle='rgba(255,210,120,0.35)';for(let i=0;i*64<w;i++)X.fillRect(x+i*64,y+2,2,10)}break}
  case'island':X.fillStyle='#a8683a';X.beginPath();X.moveTo(x,y+10);X.lineTo(x+w,y+10);X.quadraticCurveTo(x+w*0.7,y+40,x+w/2,y+56);X.quadraticCurveTo(x+w*0.3,y+40,x,y+10);X.fill();
    X.strokeStyle='#6a4a2a';X.lineWidth=2;for(let i=0;i<3;i++){const rx=x+w*(0.3+i*0.2);X.beginPath();X.moveTo(rx,y+30);X.quadraticCurveTo(rx+5,y+50,rx-2,y+62+i*4);X.stroke()}
    rrect(x-3,y,w+6,14,7);X.fillStyle='#5cd65c';X.fill();X.fillStyle='#8af08a';X.fillRect(x+4,y+2,w-8,3);break;
  case'log':rrect(x,y,w,18,9);X.fillStyle='#9a5f32';X.fill();X.fillStyle='#b97a4a';X.fillRect(x+6,y+3,w-12,4);ell(x+4,y+9,5,9,'#d9a066');ell(x+w-4,y+9,5,9,'#d9a066');ell(x+w-4,y+9,2,4,'#9a5f32');break;
  case'crystal':rrect(x,y,w,16,6);X.fillStyle='#5a3a7a';X.fill();X.fillStyle='#8a6ab0';X.fillRect(x+4,y+2,w-8,3);for(let i=0;i<w/22;i++){const cx=x+11+i*22;X.fillStyle=i%2?'#4de0ff':'#c58bff';X.beginPath();X.moveTo(cx-7,y+14);X.lineTo(cx,y+30+(i%3)*5);X.lineTo(cx+7,y+14);X.fill()}
    const gl=X.createLinearGradient(0,y+14,0,y+40);gl.addColorStop(0,'rgba(180,120,255,0.35)');gl.addColorStop(1,'rgba(180,120,255,0)');X.fillStyle=gl;X.fillRect(x,y+14,w,26);break;
  case'ledge':rrect(x,y,w,18,6);X.fillStyle='#4a2f42';X.fill();X.fillStyle='#7a4a5a';X.fillRect(x+4,y+2,w-8,3);X.strokeStyle='#ff8a2a';X.lineWidth=2;X.beginPath();X.moveTo(x+14,y+9);X.lineTo(x+30,y+13);X.lineTo(x+48,y+8);X.lineTo(x+w-14,y+12);X.stroke();break;
  case'pipe':{const pc={living:'#4fb86a',jungle:'#4fb86a',caves:'#3bb3c3',summit:'#d98a3a'}[L?L.theme:'jungle'];const g=X.createLinearGradient(x,0,x+w,0);g.addColorStop(0,shade(pc,-0.3));g.addColorStop(0.35,shade(pc,0.35));g.addColorStop(1,shade(pc,-0.35));
    X.fillStyle=g;X.fillRect(x+4,y+14,w-8,bot-y-14);rrect(x-2,y,w+4,18,5);X.fillStyle=g;X.fill();X.strokeStyle=shade(pc,-0.45);X.lineWidth=2;X.strokeRect(x-2,y,w+4,18);ell(x+w/2,y+3,w/2-4,4,shade(pc,-0.55));break}
  case'wall':{const g=X.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'#3e2a3a');g.addColorStop(1,'#5a3a4a');X.fillStyle=g;X.fillRect(x,camY-20,w,bot-camY+20);X.strokeStyle='rgba(255,140,60,0.6)';X.lineWidth=2;for(let yy=Math.floor(camY/50)*50;yy<bot;yy+=50){X.beginPath();X.moveTo(x+6,yy);X.lineTo(x+w-8,yy+18);X.stroke()}break}
  default:X.fillStyle='#888';X.fillRect(x,y,w,s.h)}}
function drawMover(m){const x=m.x,y=m.y,w=m.w;if(x>camX+VW+20||x+w<camX-20)return;
  if(m.k==='basket'){X.save();const wv=Math.sin(T*4)*2;rrect(x,y+wv,w,14,4);X.fillStyle='#c0392b';X.fill();X.fillStyle='#ffd23f';for(let i=0;i<w/14;i++){X.fillRect(x+4+i*14,y+5+wv,6,4)}
    X.strokeStyle='#ffd23f';X.lineWidth=2;for(let i=0;i<6;i++){X.beginPath();X.moveTo(x+3+i*2,y+14+wv);X.lineTo(x+1+i*2,y+20+wv);X.stroke();X.beginPath();X.moveTo(x+w-3-i*2,y+14+wv);X.lineTo(x+w-1-i*2,y+20+wv);X.stroke()}
    for(let i=0;i<3;i++)circ(x+20+i*30,y+24+Math.sin(T*8+i)*2,3,'rgba(255,255,255,0.6)');X.restore();return}
  rrect(x,y,w,20,7);X.fillStyle='#4a3040';X.fill();X.fillStyle='#6a4a5a';X.fillRect(x+4,y+2,w-8,4);X.strokeStyle='#ffa53a';X.lineWidth=2.5;X.beginPath();X.moveTo(x+12,y+11);X.lineTo(x+32,y+15);X.lineTo(x+52,y+9);X.lineTo(x+w-12,y+14);X.stroke();
  for(const fx of[x+18,x+w-18]){const fl=8+Math.sin(T*30+fx)*3;X.fillStyle='#ffd23f';X.beginPath();X.moveTo(fx-5,y+20);X.lineTo(fx,y+20+fl+6);X.lineTo(fx+5,y+20);X.fill();X.fillStyle='#ff7b1f';X.beginPath();X.moveTo(fx-3,y+20);X.lineTo(fx,y+20+fl);X.lineTo(fx+3,y+20);X.fill()}}
function drawBouncer(b){const sq=Math.sin(b.sq*Math.PI*3)*b.sq,x=b.x,y=b.y,w=b.w;X.save();X.translate(x+w/2,y+b.h);X.scale(1+sq*0.25,1-sq*0.35);
  if(b.k==='mush'){X.fillStyle='#fff3d6';rrect(-9,-16,18,16,5);X.fill();X.fillStyle='#2ec4b6';X.beginPath();X.ellipse(0,-16,w/2+4,20,0,Math.PI,0);X.fill();X.fillStyle='#ffe14d';circ(-12,-26,4,'#ffe14d');circ(8,-30,5,'#ffe14d');circ(18,-20,3,'#ffe14d');circ(-22,-18,3,'#ffe14d');
    circ(-5,-9,2,'#4a1a1a');circ(5,-9,2,'#4a1a1a');X.strokeStyle='#4a1a1a';X.lineWidth=1.5;X.beginPath();X.arc(0,-7,3,0.2,Math.PI-0.2);X.stroke()}
  else{rrect(-w/2-4,-22,w+8,22,11);X.fillStyle='#fff';X.fill();X.fillStyle='#ffd6e8';rrect(-w/2+2,-18,w-4,6,3);X.fill();X.strokeStyle='#ffb3d1';X.lineWidth=2;X.beginPath();X.moveTo(-w/2,-11);X.lineTo(w/2,-11);X.stroke();txt('BOING',0,-8,8,'#ff6fa5',{sw:0})}
  X.restore()}
function drawQ(b){const bo=-Math.sin(b.bump*Math.PI)*9,x=b.x,y=b.y+bo;if(x>camX+VW+40||x<camX-60)return;
  if(b.used){rrect(x,y,32,32,6);X.fillStyle='#a07050';X.fill();X.fillStyle='#7a5038';[[6,6],[24,6],[6,24],[24,24]].forEach(([a,c])=>circ(x+a,y+c,2.4,'#7a5038'));return}
  rrect(x,y,32,32,6);const g=X.createLinearGradient(0,y,0,y+32);g.addColorStop(0,'#ffe066');g.addColorStop(1,'#ff9f1c');X.fillStyle=g;X.fill();X.strokeStyle='#b8560f';X.lineWidth=2;X.stroke();
  X.fillStyle='rgba(255,255,255,0.5)';X.fillRect(x+4,y+3,24,3);txt('?',x+16,y+17+Math.sin(T*4)*1.5,22,'#fff',{st:'#b8560f',sw:3})}
function drawSign(s){const x=s.x,y=s.y;X.fillStyle='#8a5a3a';X.fillRect(x-3,y-44,6,44);rrect(x-30,y-74,60,36,6);X.fillStyle='#e0a86a';X.fill();X.strokeStyle='#8a5a3a';X.lineWidth=2;X.stroke();
  const t={run:'RUN →',jump:'JUMP!',q:'BONK ↑',lava:'HOT!',up:'CLIMB ↑',king:'KING ★'}[s.k];txt(t,x,y-56,12,'#5a3a1a',{sw:0})}
function drawCP(c){const x=c.x,y=c.y;X.fillStyle='#e8e8f0';X.fillRect(x,y-86,5,86);circ(x+2.5,y-88,5,'#ffd23f');const up=c.on?1:0.35,fy=y-86+(1-up)*50,wv=Math.sin(T*6)*3;
  X.fillStyle=c.on?'#52d66a':'#ff8a3d';X.beginPath();X.moveTo(x+5,fy);X.quadraticCurveTo(x+22,fy-4+wv,x+40,fy+2);X.quadraticCurveTo(x+24,fy+12-wv,x+40,fy+24);X.quadraticCurveTo(x+22,fy+20+wv,x+5,fy+24);X.fill();
  if(c.on)star(x+20,fy+12,6,'#fff');else circ(x+20,fy+12,4,'#fff3d6')}
function star(x,y,r,f,rot){X.beginPath();for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rr2=i%2?r*0.45:r;X.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2)}X.closePath();X.fillStyle=f;X.fill()}
function drawGoal(g){const x=g.x,y=g.y,th=L.theme;
  if(th==='living'){X.fillStyle='#7ab8ff';X.beginPath();X.moveTo(x+10,y);X.lineTo(x+80,y-90);X.lineTo(x+150,y);X.fill();X.fillStyle='#ffd6e8';X.beginPath();X.moveTo(x+80,y-90);X.lineTo(x+150,y);X.lineTo(x+120,y);X.fill();
    X.fillStyle='#3a5aa8';X.beginPath();X.moveTo(x+62,y);X.lineTo(x+80,y-40);X.lineTo(x+98,y);X.fill();for(let i=0;i<4;i++){rrect(x+4+i*38,y-16,36,18,8);X.fillStyle=PASTEL[i];X.fill()}txt('SAFE ZONE',x+80,y-104,13,'#fff',{st:'#3a5aa8'})}
  else if(th==='jungle'){X.fillStyle='#9a6a3a';X.fillRect(x+20,y-70,110,70);X.fillStyle='#e0b060';X.beginPath();X.moveTo(x+6,y-66);X.lineTo(x+75,y-120);X.lineTo(x+144,y-66);X.fill();rrect(x+60,y-44,30,44,4);X.fillStyle='#5a3a1a';X.fill();circ(x+40,y-46,9,'#ffe9a3');circ(x+110,y-46,9,'#ffe9a3')}
  else{X.fillStyle='#4a2f62';rrect(x+10,y-120,130,120,20);X.fill();rrect(x+40,y-90,70,90,30);const gg=X.createLinearGradient(0,y-90,0,y);gg.addColorStop(0,'#c58bff');gg.addColorStop(1,'#4de0ff');X.fillStyle=gg;X.fill();crystal(x+20,y-112,0.5,'#4de0ff');crystal(x+130,y-112,0.5,'#c58bff')}
  const fx=x+170;X.fillStyle='#fff';X.fillRect(fx,y-150,6,150);circ(fx+3,y-152,7,'#ffd23f');const wv=Math.sin(T*5)*4;X.fillStyle='#ff4d6d';X.beginPath();X.moveTo(fx+6,y-148);X.quadraticCurveTo(fx+30,y-152+wv,fx+56,y-144);X.lineTo(fx+56,y-112);X.quadraticCurveTo(fx+30,y-118-wv,fx+6,y-114);X.fill();star(fx+30,y-130,9,'#ffd23f',T)}
// ---------- collectibles ----------
function drawCoin(x,y,ph){const w=Math.abs(Math.cos(T*4+ph))*8+1.5;ell(x,y,w+1.5,10.5,'#b8760f');ell(x,y,w,9,'#ffd23f');if(w>4){X.fillStyle='#fff3a8';X.fillRect(x-1.5,y-5,3,10)}}
const GEMC=['#ff4d8d','#4dd6ff','#7cff6b','#c387ff','#ffd23f'];
function drawGem(x,y,c,s){s=s||1;const bob=Math.sin(T*3+x)*3;y+=bob;const col=GEMC[c%5];const gl=X.createRadialGradient(x,y,2,x,y,26*s);gl.addColorStop(0,'rgba(255,255,255,0.55)');gl.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=gl;X.fillRect(x-28*s,y-28*s,56*s,56*s);
  X.beginPath();X.moveTo(x-12*s,y-4*s);X.lineTo(x-6*s,y-12*s);X.lineTo(x+6*s,y-12*s);X.lineTo(x+12*s,y-4*s);X.lineTo(x,y+13*s);X.closePath();X.fillStyle=col;X.fill();X.strokeStyle=shade(col,-0.35);X.lineWidth=1.5;X.stroke();
  X.fillStyle='rgba(255,255,255,0.6)';X.beginPath();X.moveTo(x-6*s,y-12*s);X.lineTo(x,y-4*s);X.lineTo(x-12*s,y-4*s);X.fill();star(x+8*s,y-12*s,3.5*s*(0.6+0.4*Math.sin(T*6+x)),'#fff')}
function powIcon(t,x,y,s){X.save();X.translate(x,y);X.scale(s,s);
  if(t==='boots'){rrect(-9,-10,10,16,3);X.fillStyle='#ff6a1f';X.fill();rrect(-9,2,18,8,4);X.fill();X.fillStyle='#ffd23f';X.beginPath();X.moveTo(-8,-10);X.lineTo(-5,-20);X.lineTo(-2,-12);X.lineTo(1,-19);X.lineTo(2,-10);X.fill()}
  else if(t==='rocket'){X.fillStyle='#e8eef8';X.beginPath();X.moveTo(0,-16);X.quadraticCurveTo(9,-6,7,8);X.lineTo(-7,8);X.quadraticCurveTo(-9,-6,0,-16);X.fill();circ(0,-4,3.5,'#4dd6ff');X.fillStyle='#ff4d6d';X.beginPath();X.moveTo(-7,2);X.lineTo(-12,10);X.lineTo(-6,8);X.fill();X.beginPath();X.moveTo(7,2);X.lineTo(12,10);X.lineTo(6,8);X.fill();X.fillStyle='#ffd23f';X.beginPath();X.moveTo(-4,8);X.lineTo(0,16+Math.sin(T*30)*2);X.lineTo(4,8);X.fill()}
  else if(t==='shield'){circ(0,0,14,'rgba(150,230,255,0.45)');X.strokeStyle='#bff3ff';X.lineWidth=2.5;X.beginPath();X.arc(0,0,14,0,TAU);X.stroke();ell(-5,-6,4,2.5,'#fff')}
  else{heart(0,0,13,'#ff4d6d')}X.restore()}
function heart(x,y,s,f){X.beginPath();X.moveTo(x,y+s*0.75);X.bezierCurveTo(x-s*1.3,y-s*0.1,x-s*0.6,y-s*1.0,x,y-s*0.35);X.bezierCurveTo(x+s*0.6,y-s*1.0,x+s*1.3,y-s*0.1,x,y+s*0.75);X.fillStyle=f;X.fill()}
// ---------- characters ----------
function drawHero(cx,by,o){o=o||{};const cape=CAPES[capeI][0],helm=CAPES[capeI][1],f=o.face||1,run=o.run||0,air=o.air,hot=o.hot,sq=o.sq||0,cheer=o.cheer;
  const HS=o.scale||1.12;X.save();X.translate(cx,by);X.scale(HS*f*(1+sq*0.25),HS*(1-sq*0.25));const sw=Math.sin(run*TAU)*(o.moving?1:0);
  if(o.rocket){rrect(-16,-34,9,16,4);X.fillStyle='#d8e0ee';X.fill();circ(-11.5,-34,4.5,'#ff4d6d');if(air){X.fillStyle='#ffd23f';X.beginPath();X.moveTo(-15,-18);X.lineTo(-11.5,-6-Math.random()*6);X.lineTo(-8,-18);X.fill()}}
  const cw=Math.sin(T*9+run*2)*(o.moving||air?5:2);X.fillStyle=cape;X.beginPath();X.moveTo(-6,-33);X.quadraticCurveTo(-18-(o.moving?6:0),-20+cw*0.4,-20-(o.moving?10:0)+cw,-6+(air?-6:0));X.lineTo(-4-(o.moving?6:0)+cw*0.5,-8);X.lineTo(4,-32);X.fill();
  X.fillStyle=shade(cape,-0.25);X.beginPath();X.moveTo(-6,-33);X.quadraticCurveTo(-12,-22,-16-(o.moving?8:0)+cw,-8+(air?-6:0));X.lineTo(-10,-10);X.fill();
  const leg=(a,sh)=>{X.save();X.translate(sh,-13);X.rotate(a);rrect(-3.5,0,7,11,3);X.fillStyle='#3a4a8a';X.fill();rrect(-4,8,11,6,3);X.fillStyle=o.boots?'#ff6a1f':'#7a3a1a';X.fill();
    if(o.boots){X.fillStyle='#ffd23f';X.beginPath();X.moveTo(-3,8);X.lineTo(-1,2+Math.sin(T*25+sh)*2);X.lineTo(2,8);X.fill()}X.restore()};
  if(air){leg(-0.5,-3);leg(0.6,4)}else{leg(sw*0.7,-3);leg(-sw*0.7,4)}
  rrect(-8,-32,16,21,6);X.fillStyle='#fffaf0';X.fill();X.fillStyle=cape;rrect(-8,-17,16,5,2);X.fill();txt('A',0,-24,9,cape,{sw:0});
  const arm=(a,sh)=>{X.save();X.translate(sh,-29);X.rotate(a);rrect(-2.5,0,5,11,2.5);X.fillStyle='#fffaf0';X.fill();circ(0,12,3.4,'#ffd2a8');X.restore()};
  if(cheer||hot){arm(Math.PI-0.5+Math.sin(T*16)*0.3,-7);arm(-Math.PI+0.5-Math.sin(T*16)*0.3,7)}else if(air){arm(2.4,-7);arm(-2.2,7)}else{arm(-sw*0.8+0.15,-7);arm(sw*0.8-0.15,7)}
  const hy=-43;circ(0,hy,11.5,'#ffd2a8');X.fillStyle='#6a3a1a';X.beginPath();X.arc(-6,hy-4,4,0,TAU);X.fill();
  X.fillStyle=helm;X.beginPath();X.arc(0,hy-2,12.5,Math.PI,0);X.lineTo(15,hy-1);X.lineTo(-13,hy-1);X.fill();X.fillStyle=shade(helm,-0.25);X.fillRect(-13,hy-3,28,3.5);X.fillStyle='rgba(255,255,255,0.5)';X.beginPath();X.ellipse(-4,hy-9,4,2,-0.4,0,TAU);X.fill();
  circ(6,hy-8,3.6,'#ff7b1f');circ(6,hy-8,1.8,'#ffe14d');
  if(hot){X.strokeStyle='#3a1a1a';X.lineWidth=1.8;X.beginPath();X.moveTo(1,hy+0);X.lineTo(4,hy+2);X.lineTo(1,hy+4);X.moveTo(9,hy);X.lineTo(6,hy+2);X.lineTo(9,hy+4);X.stroke();ell(5,hy+7.5,3,3.5,'#7a1a1a')}
  else{const bl=hero&&hero.blink<0.12&&!o.title;if(bl){X.strokeStyle='#2a1a1a';X.lineWidth=1.6;X.beginPath();X.moveTo(1.5,hy+1);X.lineTo(5.5,hy+1);X.moveTo(7.5,hy+1);X.lineTo(11,hy+1);X.stroke()}else{ell(3.5,hy+1,2.2,2.8,'#fff');ell(9,hy+1,2.2,2.8,'#fff');circ(4.2,hy+1.4,1.4,'#2a1a1a');circ(9.6,hy+1.4,1.4,'#2a1a1a')}
    X.strokeStyle='#7a2a1a';X.lineWidth=1.6;X.beginPath();if(cheer)X.arc(6,hy+5,3.5,0.1,Math.PI-0.1);else X.arc(6,hy+5,2.6,0.25,Math.PI-0.6);X.stroke();if(cheer){ell(6,hy+6.5,2.5,1.6,'#c0392b')}}
  ell(10.5,hy+5,2,1.3,'rgba(255,120,120,0.5)');X.restore();
  if(o.shield){const r=29+Math.sin(T*5)*1.5;X.save();X.globalAlpha=0.9;const g=X.createRadialGradient(cx-6,by-28,4,cx,by-22,r);g.addColorStop(0,'rgba(255,255,255,0.05)');g.addColorStop(0.75,'rgba(150,230,255,0.2)');g.addColorStop(1,'rgba(190,245,255,0.55)');
    X.fillStyle=g;X.beginPath();X.ellipse(cx,by-22,r,r*1.08,0,0,TAU);X.fill();X.strokeStyle='rgba(220,250,255,0.85)';X.lineWidth=1.8;X.stroke();ell(cx-9,by-38,5,3,'rgba(255,255,255,0.8)');X.restore()}}
function drawBlob(e){const cx=e.x+e.w/2,by=e.y+e.h;let sx=1,sy=1,a=1;if(e.dead){const t=e.dead;sy=Math.max(0.2,1-t*6);sx=1+(1-sy)*0.6;a=clamp(1.4-t*2.2,0,1);if(a<=0)return}
  else{const b=Math.sin(e.ph*8)*0.06;sx=1+b;sy=1-b;if(e.k==='hopper'&&e.vy!==0){sy=1.15;sx=0.88}}
  X.save();X.globalAlpha=a;X.translate(cx,by);X.scale(sx,sy);const hop=e.k==='hopper';const c1=hop?'#ffe14d':'#ff9a3d',c2=hop?'#ff9f1c':'#ff4d2e';
  const g=X.createLinearGradient(0,-28,0,0);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.beginPath();X.moveTo(-15,0);X.quadraticCurveTo(-17,-20,-4,-25);X.quadraticCurveTo(0,-32+Math.sin(e.ph*10)*2,4,-25);X.quadraticCurveTo(17,-20,15,0);X.closePath();X.fill();
  X.fillStyle='#ffd23f';X.beginPath();X.moveTo(-3,-26);X.quadraticCurveTo(0,-36-Math.sin(e.ph*14)*3,3,-26);X.fill();
  const lk=e.vx<0?-1.5:1.5;if(e.dead){X.strokeStyle='#4a1a1a';X.lineWidth=1.6;X.beginPath();X.moveTo(-8,-13);X.lineTo(-3,-11);X.moveTo(8,-13);X.lineTo(3,-11);X.stroke()}
  else{ell(-5,-13,4,5,'#fff');ell(5,-13,4,5,'#fff');circ(-5+lk,-12,2.2,'#2a1a1a');circ(5+lk,-12,2.2,'#2a1a1a');circ(-4.2+lk,-13,0.8,'#fff');circ(5.8+lk,-13,0.8,'#fff')}
  X.strokeStyle='#7a1a1a';X.lineWidth=1.5;X.beginPath();X.arc(0,-6,3,0.2,Math.PI-0.2);X.stroke();ell(-10,-7,2.5,1.5,'rgba(255,120,150,0.6)');ell(10,-7,2.5,1.5,'rgba(255,120,150,0.6)');
  if(hop){X.strokeStyle='#b8560f';X.lineWidth=2;X.beginPath();X.moveTo(-6,0);X.lineTo(-8,4);X.moveTo(6,0);X.lineTo(8,4);X.stroke()}X.restore()}
function drawBat(e){const cx=e.x+e.w/2,cy=e.y+e.h/2;let a=1,sy=1;if(e.dead){a=clamp(1-e.dead*2,0,1);sy=Math.max(0.3,1-e.dead*4);if(a<=0)return}X.save();X.globalAlpha=a;X.translate(cx,cy);X.scale(e.vx<0?-1:1,sy);
  const fl=Math.sin(e.ph*16)*0.6;X.fillStyle='#7a3aa8';for(const s of[-1,1]){X.save();X.scale(s,1);X.rotate(fl*s*0.5);X.beginPath();X.moveTo(6,-2);X.quadraticCurveTo(20,-16,26,-4);X.quadraticCurveTo(20,-4,18,2);X.quadraticCurveTo(14,0,6,4);X.fill();X.restore()}
  circ(0,0,11,'#8a4ac0');ell(0,4,7,5,'#ffb36b');X.fillStyle='#8a4ac0';X.beginPath();X.moveTo(-8,-7);X.lineTo(-5,-15);X.lineTo(-2,-9);X.moveTo(8,-7);X.lineTo(5,-15);X.lineTo(2,-9);X.fill();
  ell(-4,-2,3,3.5,'#fff');ell(4,-2,3,3.5,'#fff');circ(-3.5,-1.5,1.6,'#2a1a1a');circ(4.5,-1.5,1.6,'#2a1a1a');X.strokeStyle='#4a1a1a';X.lineWidth=1.2;X.beginPath();X.arc(0,3,2,0.2,Math.PI-0.2);X.stroke();X.restore()}
function drawKing(b,o){o=o||{};const cx=b.x+b.w/2,by=b.y+b.h,happy=b.st==='happy',st=b.st==='stun',sq=b.sq||0;X.save();X.translate(cx,by);X.scale(1+sq*0.2,1-sq*0.22);
  if(st&&Math.sin(T*30)>0.3)X.globalAlpha=0.75;const hw=b.w/2;const step=Math.sin(T*10)*(b.st==='walk'?3:0);
  ell(-hw*0.5,-2+step,16,8,'#3a2030');ell(hw*0.5,-2-step,16,8,'#3a2030');
  const g=X.createLinearGradient(0,-b.h,0,0);g.addColorStop(0,happy?'#a0784a':'#8a4a3a');g.addColorStop(1,happy?'#5a8a3a':'#5a2a35');X.fillStyle=g;X.beginPath();X.moveTo(-hw,-4);X.quadraticCurveTo(-hw*0.7,-b.h*0.55,-30,-b.h+6);X.lineTo(30,-b.h+6);X.quadraticCurveTo(hw*0.7,-b.h*0.55,hw,-4);X.closePath();X.fill();
  X.strokeStyle='#ff8a2a';X.lineWidth=6;X.lineCap='round';if(!happy){X.beginPath();X.moveTo(-18,-b.h+8);X.quadraticCurveTo(-26,-b.h+30,-20,-b.h+44+Math.sin(T*3)*3);X.stroke();X.beginPath();X.moveTo(20,-b.h+8);X.quadraticCurveTo(28,-b.h+24,24,-b.h+34);X.stroke()}
  else{for(let i=0;i<6;i++){const fx=-hw*0.75+i*hw*0.3,fy=-12-((i*17)%30);X.strokeStyle='#3a8a3a';X.lineWidth=2;X.beginPath();X.moveTo(fx,fy+8);X.lineTo(fx,fy);X.stroke();for(let k=0;k<5;k++)circ(fx+Math.cos(k*1.26)*4,fy+Math.sin(k*1.26)*4,3,['#ff6b8b','#ffd23f','#c387ff'][i%3]);circ(fx,fy,2,'#fff')}}
  ell(0,-b.h+6,31,7,happy?'#ffe14d':'#ffb02e');ell(0,-b.h+5,22,4,happy?'#fff6c0':'#ffe27a');
  X.save();X.translate(0,-b.h-2+(st?Math.sin(T*8)*2:0));X.rotate(st?Math.sin(T*6)*0.15:0);X.fillStyle='#ffd23f';X.beginPath();X.moveTo(-24,6);X.lineTo(-26,-14);X.lineTo(-13,-3);X.lineTo(0,-20);X.lineTo(13,-3);X.lineTo(26,-14);X.lineTo(24,6);X.closePath();X.fill();X.strokeStyle='#c8860f';X.lineWidth=2;X.stroke();
  circ(0,-2,3.5,'#ff4d8d');circ(-15,0,2.5,'#4dd6ff');circ(15,0,2.5,'#7cff6b');X.restore();
  const fy=-b.h*0.45;
  if(st){X.strokeStyle='#2a1a1a';X.lineWidth=2.5;for(const s of[-1,1]){X.beginPath();for(let k=0;k<14;k++){const a=k*0.9+T*8,r=k*0.55;X.lineTo(s*17+Math.cos(a)*r,fy-6+Math.sin(a)*r)}X.stroke()}for(let k=0;k<3;k++){const a=T*4+k*2.1;star(Math.cos(a)*34,-b.h-22+Math.sin(a)*6,6,'#ffe14d')}}
  else{ell(-17,fy-6,9,happy?8:10,'#fff');ell(17,fy-6,9,happy?8:10,'#fff');const lk=clamp(((hero?hero.x:cx)-cx-b.x+b.x)/200,-1,1)*3;circ(-17+lk,fy-4,4.5,'#2a1a1a');circ(17+lk,fy-4,4.5,'#2a1a1a');circ(-15.5+lk,fy-6,1.5,'#fff');circ(18.5+lk,fy-6,1.5,'#fff')}
  X.strokeStyle='#2a1a1a';X.lineWidth=4;X.lineCap='round';X.beginPath();if(happy){X.moveTo(-26,fy-20);X.quadraticCurveTo(-17,fy-26,-8,fy-20);X.moveTo(8,fy-20);X.quadraticCurveTo(17,fy-26,26,fy-20)}else{X.moveTo(-27,fy-22);X.lineTo(-8,fy-15);X.moveTo(27,fy-22);X.lineTo(8,fy-15)}X.stroke();
  X.lineWidth=3.5;X.beginPath();if(happy){X.arc(0,fy+8,14,0.15,Math.PI-0.15);X.stroke();ell(0,fy+14,8,5,'#c0392b')}else if(st){ell(0,fy+14,6,7,'#4a1a1a')}else{X.moveTo(-12,fy+16);X.quadraticCurveTo(0,fy+6,12,fy+16);X.stroke()}
  ell(-30,fy+8,7,4,'rgba(255,120,140,0.55)');ell(30,fy+8,7,4,'rgba(255,120,140,0.55)');
  X.fillStyle=happy?'#7a9a4a':'#6a3a3a';for(const s of[-1,1]){X.save();X.translate(s*hw*0.78,-b.h*0.32);X.rotate(s*(happy?-1.2+Math.sin(T*10)*0.3:0.4+Math.sin(T*4)*0.1));rrect(-5,0,10,24,5);X.fill();circ(0,26,7,X.fillStyle);X.restore()}
  X.restore()}
// ---------- lava ----------
function drawLava(full){const y=lavaY-camY;if(y>VH+12)return;const W=VW;
  const gl=X.createLinearGradient(0,y-70,0,y);gl.addColorStop(0,'rgba(255,120,30,0)');gl.addColorStop(1,'rgba(255,140,40,0.35)');X.fillStyle=gl;X.fillRect(0,y-70,W,70);
  const g=X.createLinearGradient(0,y,0,Math.max(y+80,VH));g.addColorStop(0,'#ffb02e');g.addColorStop(0.25,'#ff6a1f');g.addColorStop(1,'#d42a1e');X.fillStyle=g;X.beginPath();X.moveTo(0,VH+10);
  for(let x=0;x<=W+12;x+=12){const wx=x+camX;X.lineTo(x,y+Math.sin(wx*0.028+T*2.2)*3+Math.sin(wx*0.011-T*1.4)*4)}X.lineTo(W,VH+10);X.closePath();X.fill();
  X.strokeStyle='#ffe27a';X.lineWidth=3;X.beginPath();for(let x=0;x<=W+12;x+=12){const wx=x+camX;const yy=y+Math.sin(wx*0.028+T*2.2)*3+Math.sin(wx*0.011-T*1.4)*4;x?X.lineTo(x,yy):X.moveTo(x,yy)}X.stroke();
  const c0=Math.floor(camX/70)-1;for(let i=c0;i<c0+W/70+3;i++){const ph=(T*0.6+hsh(i)*7)%1.6,bx=i*70+hsh(i+1)*50-camX;if(ph<1.2){const r=2+ph*7;X.strokeStyle='rgba(255,240,170,0.9)';X.lineWidth=1.5;circ(bx,y+8-ph*4,r,'rgba(255,200,80,0.85)');X.beginPath();X.arc(bx,y+8-ph*4,r,0,TAU);X.stroke();ell(bx-r*0.35,y+6-ph*4-r*0.35,r*0.3,r*0.2,'rgba(255,255,255,0.7)')}
    else if(ph<1.35){const k=(ph-1.2)/0.15;for(let j=0;j<5;j++){const a=-Math.PI*(0.15+j*0.175);circ(bx+Math.cos(a)*k*14,y+4+Math.sin(a)*k*14,2*(1-k)+0.5,'#ffd23f')}}}
  X.fillStyle='rgba(255,240,180,0.35)';for(let i=c0;i<c0+W/70+3;i++){const bx=i*70+hsh(i+7)*60-camX;X.fillRect(bx,y+22+hsh(i)*30,18+hsh(i+2)*20,3)}}
