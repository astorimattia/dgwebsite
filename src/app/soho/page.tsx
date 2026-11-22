// @ts-nocheck
'use client';

import { useEffect } from 'react';

const CSS = `
:root{--ink:#171615;--mut:#8a8781;}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;height:100%;overflow:hidden;background:#f2f1ee;
  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);}
#gl{position:fixed;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none;}
#gl.dragging{cursor:grabbing;}
.topbar{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:26px 34px 40px;pointer-events:none;background:linear-gradient(180deg,rgba(244,243,241,.85),rgba(244,243,241,0));}
.topbar .name{font-size:15px;letter-spacing:.04em;pointer-events:auto;text-decoration:none;color:var(--ink);text-shadow:0 1px 10px rgba(244,243,241,.95),0 0 3px rgba(244,243,241,.9);}
.topbar nav{pointer-events:auto;}
.topbar nav a{font-size:13px;color:var(--ink);text-decoration:none;margin-left:26px;letter-spacing:.03em;text-shadow:0 1px 10px rgba(244,243,241,.95),0 0 3px rgba(244,243,241,.9);}
.topbar nav a.on{color:var(--mut);}
.vig{position:fixed;inset:0;z-index:5;pointer-events:none;background:
  linear-gradient(180deg,rgba(50,46,40,.08),rgba(50,46,40,0) 18%),
  radial-gradient(120% 90% at 50% 45%,rgba(0,0,0,0) 72%,rgba(40,36,30,.10));}
.bottomhint{position:fixed;bottom:22px;left:0;right:0;text-align:center;z-index:20;font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:#8a867e;pointer-events:none;transition:opacity 1s;text-shadow:0 1px 8px rgba(244,243,241,.95),0 0 3px rgba(244,243,241,.9);}
.lb{position:fixed;inset:0;z-index:50;background:rgba(250,250,249,.97);display:none;align-items:center;justify-content:center;flex-direction:column;padding:5vh 5vw;}
.lb.open{display:flex;}
.lb img{max-width:min(88vw,1100px);max-height:72vh;box-shadow:0 30px 70px rgba(40,36,30,.25);}
.lb .cap{margin-top:22px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mut);}
.lb .story{margin-top:14px;font-size:13px;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:2px;}
.lb .x{position:fixed;top:26px;right:34px;font-size:14px;letter-spacing:.2em;color:var(--mut);cursor:pointer;text-transform:uppercase;}
@media (max-width:640px){
  .topbar{padding:18px 20px;background:#f2f1ee;}
  .topbar nav a{margin-left:16px;font-size:12px;}
}

.gl-root{position:fixed;inset:0;z-index:60;background:#f2f1ee;overflow:hidden;}
`;

export default function SohoGallery() {
  useEffect(() => {
    const start = () => {

const PH={
 'sansevero2.webp':'/assets/images/sansevero2.webp','sansevero5.webp':'/assets/images/sansevero5.webp','sansevero8.webp':'/assets/images/sansevero8.webp',
 'sanjuan-analog.webp':'/assets/images-optimized/sanjuan-analog.webp','sanjuan-analog3.webp':'/assets/images-optimized/sanjuan-analog3.webp','sanjuan-analog6.webp':'/assets/images-optimized/sanjuan-analog6.webp',
 'tultepec-analog-lg.webp':'/assets/images-optimized/tultepec-analog-lg.webp','tultepec-analog4-lg.webp':'/assets/images-optimized/tultepec-analog4-lg.webp','tultepec-analog8-lg.webp':'/assets/images-optimized/tultepec-analog8-lg.webp',
 'mautkakuan-analog.webp':'/assets/images-optimized/mautkakuan-analog.webp','mautkakuan-analog5.webp':'/assets/images-optimized/mautkakuan-analog5.webp','mautkakuan-analog8.webp':'/assets/images-optimized/mautkakuan-analog8.webp',
 'banni-analog.webp':'/assets/images-optimized/banni-analog.webp','banni-analog3.webp':'/assets/images-optimized/banni-analog3.webp','banni-analog7.webp':'/assets/images-optimized/banni-analog7.webp'
};
const SERIES=[
 {name:'Festa del Soccorso',place:'San Severo, Italia',year:'2026',slug:'c-vdim-au-fnel',photos:['sansevero2.webp','sansevero5.webp','sansevero8.webp']},
 {name:'Si San Juanito Permite',place:'San Juan de la Vega, Mexico',year:'2026',slug:'si-san-juanito-permite',photos:['sanjuan-analog.webp','sanjuan-analog3.webp','sanjuan-analog6.webp']},
 {name:'Tultepec',place:'Tultepec, Mexico',year:'2025',slug:null,photos:['tultepec-analog-lg.webp','tultepec-analog4-lg.webp','tultepec-analog8-lg.webp']},
 {name:'Maut Ka Kuan',place:'India',year:'2025',slug:null,photos:['mautkakuan-analog.webp','mautkakuan-analog5.webp','mautkakuan-analog8.webp']},
 {name:'Banni',place:'India',year:'2025',slug:null,photos:['banni-analog.webp','banni-analog3.webp','banni-analog7.webp']}
];
const q=new URLSearchParams(location.search);
const n=(k,d)=>q.has(k)?+q.get(k):d;
const mobile=()=>innerWidth<640;
// rectangular room, meters, Y up. Main (north) wall at z=ZW, camera looks down -X.
const P=()=>({
  X0:n('X0',3.5), ZW:n('ZW',-2.4), CEIL:n('CEIL',3.05), WIDTH:n('WIDTH',5.4),
  CAMD:n('CAMD',mobile()?2.1:2.15), EYE:n('EYE',1.6),
  LOOK:n('LOOK',mobile()?1.7:3.2), LOOKY:n('LOOKY',1.5),
  FOV:n('FOV',mobile()?68:55), GAP:n('GAP',1.0), HANG:n('HANG',1.55)
});
const canvas=document.getElementById('gl');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
const scene3=new THREE.Scene();
scene3.background=new THREE.Color(0xf2f1ee);
scene3.fog=new THREE.Fog(0xf2f1ee,12,30);
const camera=new THREE.PerspectiveCamera(55,1,0.05,120);
function sizeRenderer(){
  renderer.setSize(innerWidth,innerHeight,false);
  camera.aspect=innerWidth/innerHeight;
  camera.fov=P().FOV;
  camera.updateProjectionMatrix();
}
function canvasTex(w,h,draw){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  draw(c.getContext('2d'),w,h);
  const t=new THREE.CanvasTexture(c);
  t.anisotropy=renderer.capabilities.getMaxAnisotropy();
  return t;
}
const works=[];
let lastS=30;
let roomBuilt=false;
// ---- textures with baked gallery lighting ----
const PXM=64; // texture pixels per meter on walls
function wallTexture(xw,xe){
  const lenM=xe-xw;
  const W=Math.min(4096,Math.ceil(lenM*PXM)), H=Math.ceil(P().CEIL*PXM);
  return canvasTex(W,H,(ctx)=>{
    const ceil=P().CEIL;
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#ebe9e5');g.addColorStop(0.18,'#f3f2ef');
    g.addColorStop(0.55,'#f5f4f1');g.addColorStop(0.9,'#efeeea');g.addColorStop(1,'#e8e6e2');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    // warm wash pools above each work (u: meters from xw)
    for(const w of works){
      const u=( (P().X0-w.s) - xw )*PXM;
      const cy=(ceil-2.15)*PXM;
      const rg=ctx.createRadialGradient(u,cy,10,u,cy,1.55*PXM);
      rg.addColorStop(0,'rgba(255,250,238,.42)');rg.addColorStop(0.55,'rgba(255,250,238,.16)');rg.addColorStop(1,'rgba(255,250,238,0)');
      ctx.fillStyle=rg;ctx.fillRect(u-1.6*PXM,0,3.2*PXM,H);
    }
    // corner AO
    for(const ux of [0,W]){
      const cg=ctx.createLinearGradient(ux===0?0:W,0,ux===0?0.9*PXM:W-0.9*PXM,0);
      cg.addColorStop(0,'rgba(60,56,50,.13)');cg.addColorStop(1,'rgba(60,56,50,0)');
      ctx.fillStyle=cg;ctx.fillRect(ux===0?0:W-0.9*PXM,0,0.9*PXM,H);
    }
    // baseboard
    const bb=0.12*PXM;
    ctx.fillStyle='#efeeeb';ctx.fillRect(0,H-bb,W,bb);
    ctx.fillStyle='rgba(70,66,60,.22)';ctx.fillRect(0,H-bb,W,2);
    ctx.fillStyle='rgba(70,66,60,.10)';ctx.fillRect(0,H-2,W,2);
  });
}
function floorTexture(xw,xe){
  const lenM=xe-xw, widM=P().WIDTH;
  const W=Math.min(2048,Math.ceil(lenM*40)), H=Math.ceil(widM*40);
  return canvasTex(W,H,(ctx)=>{
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#c4c2bf');g.addColorStop(0.35,'#cbc9c6');g.addColorStop(1,'#b6b4b1');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    // concrete mottling
    for(let i=0;i<340;i++){
      const x=Math.random()*W,y=Math.random()*H,r=2+Math.random()*13;
      ctx.fillStyle=Math.random()<0.5?'rgba(90,88,85,.012)':'rgba(255,255,255,.014)';
      ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
    }
    // light pools under the spots, near the wall
    for(const w of works){
      const u=((P().X0-w.s)-xw)*40;
      const eg=ctx.createRadialGradient(u,18,4,u,18,1.5*40);
      eg.addColorStop(0,'rgba(255,252,244,.20)');eg.addColorStop(1,'rgba(255,252,244,0)');
      ctx.save();ctx.translate(u,18);ctx.scale(1,0.5);ctx.translate(-u,-18);
      ctx.fillStyle=eg;ctx.fillRect(u-2*40,-2*40,4*40,4*40);
      ctx.restore();
    }
    // wall contact shadow
    const cg=ctx.createLinearGradient(0,0,0,0.4*40);
    cg.addColorStop(0,'rgba(60,56,50,.20)');cg.addColorStop(1,'rgba(60,56,50,0)');
    ctx.fillStyle=cg;ctx.fillRect(0,0,W,0.4*40);
  });
}
function plainWallTex(){
  return canvasTex(64,256,(ctx,w,h)=>{
    const g=ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#eae8e4');g.addColorStop(0.3,'#f2f1ee');g.addColorStop(1,'#e7e5e1');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  });
}
function buildRoom(){
  if(roomBuilt)return;roomBuilt=true;
  const p=P();
  const xe=p.X0+1.8, xw=p.X0-(lastS+2.6), zw=p.ZW, zc=zw+p.WIDTH, ceil=p.CEIL;
  const len=xe-xw, mid=(xe+xw)/2;
  // north (main) wall
  const nw=new THREE.Mesh(new THREE.PlaneGeometry(len,ceil),
    new THREE.MeshBasicMaterial({map:wallTexture(xw,xe)}));
  nw.position.set(mid,ceil/2,zw);
  scene3.add(nw);
  // south wall
  const sw=new THREE.Mesh(new THREE.PlaneGeometry(len,ceil),
    new THREE.MeshBasicMaterial({map:plainWallTex()}));
  sw.position.set(mid,ceil/2,zc);sw.rotation.y=Math.PI;
  scene3.add(sw);
  // end walls
  const ew=new THREE.Mesh(new THREE.PlaneGeometry(p.WIDTH,ceil),
    new THREE.MeshBasicMaterial({map:plainWallTex()}));
  ew.position.set(xe,ceil/2,zw+p.WIDTH/2);ew.rotation.y=-Math.PI/2;
  scene3.add(ew);
  const ww=new THREE.Mesh(new THREE.PlaneGeometry(p.WIDTH,ceil),
    new THREE.MeshBasicMaterial({map:plainWallTex()}));
  ww.position.set(xw,ceil/2,zw+p.WIDTH/2);ww.rotation.y=Math.PI/2;
  scene3.add(ww);
  // floor
  const fg=new THREE.PlaneGeometry(len,p.WIDTH);fg.rotateX(-Math.PI/2);
  const fl=new THREE.Mesh(fg,new THREE.MeshBasicMaterial({map:floorTexture(xw,xe)}));
  fl.position.set(mid,0,zw+p.WIDTH/2);
  scene3.add(fl);
  // ceiling
  const cg2=new THREE.PlaneGeometry(len,p.WIDTH);cg2.rotateX(Math.PI/2);
  const cm=new THREE.Mesh(cg2,new THREE.MeshBasicMaterial({color:0xf0eeeb}));
  cm.position.set(mid,ceil,zw+p.WIDTH/2);
  scene3.add(cm);
  // track rail + spot cans
  const railMat=new THREE.MeshBasicMaterial({color:0x35322d});
  const rail=new THREE.Mesh(new THREE.BoxGeometry(len-1.2,0.028,0.05),railMat);
  rail.position.set(mid,ceil-0.05,zw+0.55);
  scene3.add(rail);
  const canGeo=new THREE.CylinderGeometry(0.026,0.034,0.1,12);
  for(let s=4.5;s<lastS+1;s+=3.4){
    const can=new THREE.Mesh(canGeo,railMat);
    can.position.set(p.X0-s,ceil-0.12,zw+0.55);
    can.rotation.z=0.45;can.rotation.x=-0.3;
    scene3.add(can);
    const stem=new THREE.Mesh(new THREE.BoxGeometry(0.01,0.08,0.01),railMat);
    stem.position.set(p.X0-s,ceil-0.065,zw+0.55);
    scene3.add(stem);
  }
}
// ---- works: framed prints with depth, mat, placard, baked shadows ----
function shadowTex(){
  return canvasTex(256,256,(ctx,w,h)=>{
    const g=ctx.createRadialGradient(w/2,h/2,w*0.28,w/2,h/2,w*0.62);
    g.addColorStop(0,'rgba(45,42,38,.34)');g.addColorStop(0.75,'rgba(45,42,38,.12)');g.addColorStop(1,'rgba(45,42,38,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  });
}
let SHADOW=null;
function makeFrontCanvas(img){
  const matPx=52,W=1024;
  const ph=Math.round(W*img.naturalHeight/img.naturalWidth);
  const c=document.createElement('canvas');
  c.width=W+matPx*2;c.height=ph+matPx*2;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#fbfaf8';ctx.fillRect(0,0,c.width,c.height);
  ctx.drawImage(img,matPx,matPx,W,ph);
  ctx.strokeStyle='rgba(40,36,30,.20)';ctx.lineWidth=3;
  ctx.strokeRect(matPx-1.5,matPx-1.5,W+3,ph+3);
  return c;
}
function placardTex(sr){
  return canvasTex(560,250,(ctx,w,h)=>{
    ctx.fillStyle='rgba(0,0,0,0)';ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(50,46,40,.18)';ctx.fillRect(10,12,w-14,h-12);
    ctx.fillStyle='#fbfaf8';ctx.fillRect(6,6,w-14,h-14);
    ctx.fillStyle='#171615';
    ctx.font='400 30px Georgia,"Times New Roman",serif';
    ctx.textBaseline='top';
    ctx.fillText(sr.name.toUpperCase().split('').join(' '),28,26);
    ctx.fillStyle='#8a8781';
    ctx.font='24px "Helvetica Neue",Helvetica,Arial,sans-serif';
    ctx.fillText(sr.place+' · '+sr.year,28,86);
    ctx.font='20px "Helvetica Neue",Helvetica,Arial,sans-serif';
    ctx.fillStyle='#a9a69f';
    ctx.fillText('Archival pigment print',28,132);
  });
}
function vinylTex(lines,big){
  const font1=(big?'400 72px':'400 40px')+' Georgia,"Times New Roman",serif';
  const font2=(big?'28px':'22px')+' "Helvetica Neue",Helvetica,Arial,sans-serif';
  const m=document.createElement('canvas').getContext('2d');
  m.font=font1;
  const t1=lines[0].toUpperCase().split('').join(' ');
  const wpx=Math.max(m.measureText(t1).width+40, lines[1]?600:0);
  return {tex:canvasTex(Math.ceil(wpx),big?260:170,(ctx,w,h)=>{
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#45423c';
    ctx.font=font1;ctx.textBaseline='top';
    ctx.fillText(t1,20,10);
    if(lines[1]){
      ctx.font=font2;ctx.fillStyle='#8a8781';
      ctx.fillText(lines[1].toUpperCase(),24,big?118:80);
    }
  }),aspect:wpx/(big?220:140)};
}
const frameSide=new THREE.MeshBasicMaterial({color:0x2a2723});
const frameBack=new THREE.MeshBasicMaterial({color:0x1e1c19});
function layoutWorks(){
  const p=P(),GAP=p.GAP;
  let s=3.3,prevSeries=null;
  for(const w of works){
    if(prevSeries!==null&&prevSeries!==w.name)s+=1.7;
    prevSeries=w.name;
    s+=w.w/2;w.s=s;
    const x=p.X0-s,z=p.ZW;
    const g=w.group;
    g.position.set(x,p.HANG,z);
    // soft wall shadow behind frame
    const sh=w.shadow;
    sh.position.set(x+0.045,p.HANG-0.055,z+0.006);
    // placard to the right (toward smaller s => +x? placard on right when facing = -x side)
    const pl=w.placard;
    pl.position.set(x+w.w/2+0.20,1.5,z+0.012);
    s+=w.w/2+GAP;
  }
  lastS=s-GAP;
}
function buildWorks(onDone){
  SHADOW=shadowTex();
  const loader=new THREE.ImageLoader();
  loader.setCrossOrigin('anonymous');
  let pending=0,order=0;
  for(const sr of SERIES)for(const file of sr.photos){
    pending++;
    const idx=order++;
    loader.load(PH[file],img=>{
      const c=makeFrontCanvas(img);
      const tex=new THREE.CanvasTexture(c);
      tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
      const ca=c.width/c.height;
      let h=1.38/Math.pow(ca,0.22);
      h=Math.max(0.95,Math.min(1.68,h));
      const w=h*ca;
      const group=new THREE.Group();
      const mats=[frameSide,frameSide,frameSide,frameSide,
        new THREE.MeshBasicMaterial({map:tex}),frameBack];
      const box=new THREE.Mesh(new THREE.BoxGeometry(w,h,0.045),mats);
      box.position.z=0.024;
      box.userData.work=true;
      group.add(box);
      works.push({idx,group,box,w,h,s:0,src:PH[file],place:sr.place,year:sr.year,slug:sr.slug,name:sr.name,series:sr});
      if(--pending===0)finishWorks(onDone);
    },undefined,()=>{if(--pending===0)finishWorks(onDone);});
  }
}
function finishWorks(onDone){
  const p=P();
  works.sort((a,b)=>a.idx-b.idx);
  for(const w of works){
    // frame lip: 4 thin boxes around front edge
    const fp=0.03,d=0.058;
    const lipM=frameSide;
    const top=new THREE.Mesh(new THREE.BoxGeometry(w.w+2*fp,fp,d),lipM);
    top.position.set(0,w.h/2+fp/2,0.02);
    const bot=top.clone();bot.position.y=-w.h/2-fp/2;
    const lef=new THREE.Mesh(new THREE.BoxGeometry(fp,w.h,d),lipM);
    lef.position.set(-w.w/2-fp/2,0,0.02);
    const rig=lef.clone();rig.position.x=w.w/2+fp/2;
    w.group.add(top,bot,lef,rig);
    scene3.add(w.group);
    // shadow
    const sh=new THREE.Mesh(new THREE.PlaneGeometry(w.w+0.5,w.h+0.5),
      new THREE.MeshBasicMaterial({map:SHADOW,transparent:true,depthWrite:false}));
    w.shadow=sh;scene3.add(sh);
    // placard
    const pl=new THREE.Mesh(new THREE.PlaneGeometry(0.27,0.12),
      new THREE.MeshBasicMaterial({map:placardTex(w.series),transparent:true}));
    w.placard=pl;scene3.add(pl);
  }
  layoutWorks();
  buildRoom();
  buildVinyl();
  onDone();
}
// ---- vinyl wall text ----
function addVinyl(lines,s,y,big){
  const p=P();
  const {tex,aspect}=vinylTex(lines,big);
  const h=big?0.5:0.28,w=h*aspect;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
    new THREE.MeshBasicMaterial({map:tex,transparent:true}));
  m.position.set(p.X0-s,y,p.ZW+0.012);
  scene3.add(m);
  return w;
}
function buildVinyl(){
  addVinyl(['Mattia Astori','Photographs of extreme rituals'],0.75,1.66,true);
  let prevEnd=3.3-0.7;
  for(const sr of SERIES){
    const mine=works.filter(w=>w.name===sr.name);
    if(mine.length){
      const firstS=mine[0].s-mine[0].w/2;
      const gapMid=(prevEnd+firstS)/2;
      if(firstS-prevEnd>1.15)addVinyl([sr.name],gapMid,1.62,false);
      prevEnd=mine[mine.length-1].s+mine[mine.length-1].w/2;
    }
  }
  addVinyl(['More soon'],prevEnd+1.0,1.62,false);
}
// ---- camera walk + input ----
let dead=false;
let pos=n('POS0',mobile()?2.2:-0.95),vel=0,dragging=false,moved=false,lastX=0;
function posMax(){return Math.max(0,lastS-2.2);}
function clampPos(){pos=Math.max(-1.2,Math.min(posMax(),pos));}
function applyCam(){
  const p=P();clampPos();
  const x=p.X0-pos;
  camera.position.set(x,p.EYE,p.ZW+p.CAMD);
  camera.lookAt(x-p.LOOK,p.LOOKY,p.ZW+0.3);
}
function loop(){
  if(dead)return;
  if(!dragging&&Math.abs(vel)>0.0004){pos+=vel;vel*=0.93;clampPos();}
  applyCam();
  renderer.render(scene3,camera);
  requestAnimationFrame(loop);
}
let hintHidden=false;
function hideHint(){if(!hintHidden){hintHidden=true;document.getElementById('hint').style.opacity=0;}}
setTimeout(hideHint,9000);
canvas.addEventListener('pointerdown',e=>{dragging=true;moved=false;lastX=e.clientX;vel=0;});
canvas.addEventListener('pointermove',e=>{
  if(!dragging)return;
  const dx=e.clientX-lastX;lastX=e.clientX;
  if(Math.abs(dx)>2&&!moved){moved=true;hideHint();canvas.classList.add('dragging');
    try{canvas.setPointerCapture(e.pointerId);}catch(_){}}
  const dp=-dx*(mobile()?0.011:0.007);
  pos+=dp;clampPos();vel=dp;
});
function endDrag(){dragging=false;canvas.classList.remove('dragging');}
canvas.addEventListener('pointerup',endDrag);
canvas.addEventListener('pointercancel',endDrag);
canvas.addEventListener('wheel',e=>{
  e.preventDefault();hideHint();
  const d=(e.deltaY+e.deltaX)*0.0032;
  pos+=d;clampPos();vel=d*0.14;
},{passive:false});
// lightbox
const lb=document.getElementById('lb');
function openLb(w){
  document.getElementById('lbimg').src=w.src;
  document.getElementById('lbcap').textContent=w.place+' — '+w.year;
  const s=document.getElementById('lbstory');
  if(w.slug){s.style.display='';s.href='/stories/'+w.slug;}else s.style.display='none';
  lb.classList.add('open');
}
document.getElementById('lbx').addEventListener('click',()=>lb.classList.remove('open'));
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});
addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open');});
const ray=new THREE.Raycaster();
const mv=new THREE.Vector2();
canvas.addEventListener('click',e=>{
  if(moved)return;
  mv.x=(e.clientX/innerWidth)*2-1;
  mv.y=-(e.clientY/innerHeight)*2+1;
  ray.setFromCamera(mv,camera);
  const hits=ray.intersectObjects(works.map(w=>w.box));
  if(hits.length){
    const w=works.find(w=>w.box===hits[0].object);
    if(w)openLb(w);
  }
});
// boot
sizeRenderer();
addEventListener('resize',sizeRenderer);
buildWorks(()=>{});
loop();
(canvas as any).__dispose=()=>{dead=true;renderer.dispose();};

    };
    const w = window as any;
    if (w.THREE) { start(); } else {
      const sc = document.createElement('script');
      sc.src = '/three.min.js';
      sc.onload = start;
      document.head.appendChild(sc);
    }
    return () => {
      const c = document.getElementById('gl') as HTMLCanvasElement | null;
      (c as any)?.__dispose?.();
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
<div className="gl-root">
<div className="vig"></div>
<div className="topbar">
  <a className="name" href="/">Mattia Astori</a>
  <nav><a href="/about">About</a><a href="/stories">Stories</a><a href="/gallery">Gallery</a></nav>
</div>
<canvas id="gl"></canvas>
<div className="bottomhint" id="hint">Drag or scroll to walk the gallery</div>
<div className="lb" id="lb">
  <span className="x" id="lbx">Close</span>
  <img id="lbimg" alt="" />
  <div className="cap" id="lbcap"></div>
  <a className="story" id="lbstory" href="#" style={{display:'none'}}>Read the story</a>
</div>
</div>
    </>
  );
}
