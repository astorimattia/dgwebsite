// @ts-nocheck
'use client';

import { useEffect } from 'react';

const CSS = `
:root{--ink:#171615;--mut:#8a8781;}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;height:100%;overflow:hidden;background:#f4f3f1;
  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);}
#gl{position:fixed;inset:0;cursor:grab;touch-action:none;}
#gl.dragging{cursor:grabbing;}
.topbar{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:26px 34px;pointer-events:none;}
.topbar .name{font-size:15px;letter-spacing:.04em;pointer-events:auto;text-decoration:none;color:var(--ink);}
.topbar nav{pointer-events:auto;}
.topbar nav a{font-size:13px;color:var(--ink);text-decoration:none;margin-left:26px;letter-spacing:.03em;}
.topbar nav a.on{color:var(--mut);}
.ceil{position:fixed;top:0;left:0;right:0;height:22vh;z-index:5;pointer-events:none;background:linear-gradient(180deg,rgba(60,56,50,.10),rgba(60,56,50,0));}
#labels{position:fixed;inset:0;z-index:10;pointer-events:none;overflow:hidden;}
.wlabel{position:absolute;left:0;top:0;text-align:center;white-space:nowrap;opacity:0;}
.wlabel h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:15px;letter-spacing:.34em;margin:0 0 7px;text-transform:uppercase;color:var(--ink);}
.wlabel p{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--mut);margin:0;}
.wlabel .go{font-size:9px;letter-spacing:.3em;color:#b5b2ab;margin-top:9px;}
.wlabel.small h2{font-size:11px;letter-spacing:.26em;}
.bottomhint{position:fixed;bottom:22px;left:0;right:0;text-align:center;z-index:20;font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:#b5b2ab;pointer-events:none;transition:opacity 1s;}
.lb{position:fixed;inset:0;z-index:50;background:rgba(250,250,249,.97);display:none;align-items:center;justify-content:center;flex-direction:column;padding:5vh 5vw;}
.lb.open{display:flex;}
.lb img{max-width:min(88vw,1100px);max-height:72vh;box-shadow:0 30px 70px rgba(40,36,30,.25);}
.lb .cap{margin-top:22px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mut);}
.lb .story{margin-top:14px;font-size:13px;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:2px;}
.lb .x{position:fixed;top:26px;right:34px;font-size:14px;letter-spacing:.2em;color:var(--mut);cursor:pointer;text-transform:uppercase;}
@media (max-width:640px){
  .topbar{padding:18px 20px;}
  .topbar nav a{margin-left:16px;font-size:12px;}
  .wlabel h2{font-size:12px;}
  .wlabel.small h2{font-size:10px;}
}

.gl-root{position:fixed;inset:0;z-index:60;background:#f4f3f1;overflow:hidden;}
`;

export default function Gallery() {
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
// room plan (meters, Y up, camera looks down -X): wall starts near-right, recedes left
const P=()=>({
  S:n('S',40), X0:n('X0',3.5), D0:n('D0',2.7), RET:n('RET',9), SRET:n('SRET',30),
  BOW:n('BOW',mobile()?3.2:3.0), REC:n('REC',12),
  CAMD:n('CAMD',2.8), EYE:n('EYE',1.55),
  LOOK:n('LOOK',mobile()?2.1:2.2), LOOKN:n('LOOKN',0.55), LOOKY:n('LOOKY',1.12),
  FOV:n('FOV',mobile()?66:52), WALLH:n('WH',12.0)
});
function wallPoint(s,p){
  let z=-(p.D0+p.BOW*Math.sin(Math.PI*s/p.S)+p.REC*(s/p.S));
  if(s>p.SRET){let t=(s-p.SRET)/(p.S+2-p.SRET);t=Math.min(1,t);t=t*t*(3-2*t);z+=p.RET*t;}
  return {x:p.X0-s, z};
}
function wallNormal(s,p){
  const e=0.01,a=wallPoint(s-e,p),b=wallPoint(s+e,p);
  let nx=-(b.z-a.z),nz=(b.x-a.x);
  if(nz<0){nx=-nx;nz=-nz;}
  const l=Math.hypot(nx,nz);return {x:nx/l,z:nz/l};
}
const canvas=document.getElementById('gl');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
const scene3=new THREE.Scene();
scene3.background=new THREE.Color(0xf4f3f1);
scene3.fog=new THREE.Fog(0xf4f3f1,9,30);
const camera=new THREE.PerspectiveCamera(52,1,0.05,120);
function sizeRenderer(){
  renderer.setSize(innerWidth,innerHeight,false);
  camera.aspect=innerWidth/innerHeight;
  camera.fov=P().FOV;
  camera.updateProjectionMatrix();
}
function gradTex(w,h,stops){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,h);
  for(const [o,col] of stops)g.addColorStop(o,col);
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  return new THREE.CanvasTexture(c);
}
function buildWall(){
  const p=P(),S0=-6,S1=p.S+2,segs=Math.ceil((S1-S0)/0.15),posArr=[],uvArr=[],idx=[];
  for(let i=0;i<=segs;i++){
    const s=S0+(S1-S0)*i/segs,w0=wallPoint(s,p);
    posArr.push(w0.x,0,w0.z, w0.x,p.WALLH,w0.z);
    uvArr.push(i/segs,0, i/segs,1);
    if(i<segs){const b=2*i;idx.push(b,b+2,b+1, b+1,b+2,b+3);}
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(posArr,3));
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uvArr,2));
  g.setIndex(idx);
  const tex=gradTex(8,512,[[0,'#dcdad6'],[0.12,'#e8e6e2'],[0.45,'#f4f3f1'],[1,'#f7f6f4']]);
  scene3.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide})));
}
function buildFloor(){
  const p=P();
  const geo=new THREE.PlaneGeometry(56,30);
  geo.rotateX(-Math.PI/2);
  const tex=gradTex(8,512,[[0,'#b9b7b4'],[0.45,'#c8c6c3'],[1,'#d9d7d4']]);
  const f=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:tex}));
  // after rotateX(-90) texture v=0 sits at -Z (wall side): darker at the seam, lighter toward camera
  f.position.set(-14.5,0,-5);
  scene3.add(f);
}
const works=[];
let lastS=30;
function makeWorkCanvas(img,place,year){
  const mat=46,capBand=74,W=1024;
  const ph=Math.round(W*img.naturalHeight/img.naturalWidth);
  const c=document.createElement('canvas');
  c.width=W+mat*2;c.height=mat*2+ph+capBand;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,c.width,c.height);
  ctx.drawImage(img,mat,mat,W,ph);
  ctx.fillStyle='#8a8781';
  ctx.font='26px "Helvetica Neue",Helvetica,Arial,sans-serif';
  ctx.textBaseline='middle';
  ctx.textAlign='left';ctx.fillText(place.toUpperCase(),mat,mat+ph+capBand/2+2);
  ctx.textAlign='right';ctx.fillText(year,mat+W,mat+ph+capBand/2+2);
  return c;
}
function layoutWorks(){
  const p=P(),GAP=0.9;
  let s=2.1;
  for(const w of works){
    s+=w.w/2; w.s=s;
    const wp=wallPoint(s,p),nn=wallNormal(s,p);
    w.mesh.position.set(wp.x+nn.x*0.03,w.y,wp.z+nn.z*0.03);
    w.mesh.lookAt(wp.x+nn.x*2,w.y,wp.z+nn.z*2);
    s+=w.w/2+GAP;
  }
  lastS=s-GAP;
}
function buildWorks(onDone){
  const loader=new THREE.ImageLoader();
  let pending=0,order=0;
  for(const sr of SERIES)for(const file of sr.photos){
    pending++;
    const idx=order++;
    loader.load(PH[file],img=>{
      const c=makeWorkCanvas(img,sr.place,sr.year);
      const tex=new THREE.CanvasTexture(c);
      tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
      const ca=c.width/c.height;
      let h=1.45/Math.pow(ca,0.25);
      h=Math.max(0.95,Math.min(1.75,h));
      const w=h*ca;
      const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex}));
      mesh.userData.work=true;
      scene3.add(mesh);
      works.push({idx,mesh,w,h,y:1.62,src:PH[file],place:sr.place,year:sr.year,slug:sr.slug,name:sr.name});
      if(--pending===0){works.sort((a,b)=>a.idx-b.idx);layoutWorks();onDone();}
    },undefined,()=>{if(--pending===0){works.sort((a,b)=>a.idx-b.idx);layoutWorks();onDone();}});
  }
}
// wall labels: HTML overlay projected onto wall gaps
const labelsDiv=document.getElementById('labels');
const labels=[];
function addLabel(html,cls,s,y){
  const d=document.createElement('div');
  d.className='wlabel '+(cls||'');
  d.innerHTML=html;
  labelsDiv.appendChild(d);
  labels.push({el:d,s,y});
}
function buildLabels(){
  addLabel('<h2>Mattia Astori</h2><p>Photographs of extreme rituals</p>','small',mobile()?0.3:1.15,0.62);
  let prevEnd=2.1;
  for(const sr of SERIES){
    const mine=works.filter(w=>w.name===sr.name);
    if(mine.length){
      const firstS=mine[0].s-mine[0].w/2;
      addLabel('<h2>'+sr.name+'</h2><p>'+sr.place+' &middot; '+sr.year+'</p>','small',(prevEnd+firstS)/2,0.62);
      prevEnd=mine[mine.length-1].s+mine[mine.length-1].w/2;
    }
  }
  addLabel('<h2>More soon</h2>','small',prevEnd+0.75,0.62);
}
const v3=new THREE.Vector3();
function projectLabels(){
  const p=P();
  for(const L of labels){
    const wp=wallPoint(L.s,p),nn=wallNormal(L.s,p);
    v3.set(wp.x+nn.x*0.04,L.y,wp.z+nn.z*0.04);
    const d=v3.distanceTo(camera.position);
    v3.project(camera);
    if(v3.z>1||d>17){L.el.style.opacity=0;continue;}
    const x=(v3.x*0.5+0.5)*innerWidth;
    const y=(-v3.y*0.5+0.5)*innerHeight;
    const sc=Math.max(0.55,Math.min(1.15,4.2/d));
    L.el.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px) scale('+sc+')';
    L.el.style.opacity=Math.max(0,Math.min(1,(17-d)/6))*0.96;
  }
}
// camera walk + input
let dead=false;
let pos=n('POS0',mobile()?-0.45:-0.9),vel=0,dragging=false,moved=false,lastX=0;
function posMax(){return Math.max(0,lastS-2.4);}
function clampPos(){pos=Math.max(-1.5,Math.min(posMax(),pos));}
function applyCam(){
  const p=P();clampPos();
  const wp=wallPoint(pos,p),nn=wallNormal(pos,p);
  camera.position.set(wp.x+nn.x*p.CAMD,p.EYE,wp.z+nn.z*p.CAMD);
  const la=wallPoint(pos+p.LOOK,p),ln=wallNormal(pos+p.LOOK,p);
  camera.lookAt(la.x+ln.x*p.LOOKN,p.LOOKY,la.z+ln.z*p.LOOKN);
}
function loop(){
  if(dead) return;
  if(!dragging&&Math.abs(vel)>0.0004){pos+=vel;vel*=0.93;clampPos();}
  applyCam();
  renderer.render(scene3,camera);
  projectLabels();
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
  const hits=ray.intersectObjects(works.map(w=>w.mesh));
  if(hits.length){
    const w=works.find(w=>w.mesh===hits[0].object);
    if(w)openLb(w);
  }
});
// boot
buildWall();
buildFloor();
sizeRenderer();
addEventListener('resize',sizeRenderer);
buildWorks(()=>{buildLabels();});
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
<div className="ceil"></div>
<div className="topbar">
  <a className="name" href="/">Mattia Astori</a>
  <nav><a href="/about">About</a><a href="/stories">Stories</a><a className="on" href="#">Gallery</a></nav>
</div>
<canvas id="gl"></canvas>
<div id="labels"></div>
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
