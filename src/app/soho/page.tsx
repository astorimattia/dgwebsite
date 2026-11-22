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
  X0:n('X0',3.5), ZW:n('ZW',-2.4), CEIL:n('CEIL',6.4), WIDTH:n('WIDTH',5.4),
  CURVE:n('CURVE',0.9), TREE:n('TREE',1),
  CAMD:n('CAMD',mobile()?2.1:2.15), EYE:n('EYE',1.6),
  LOOK:n('LOOK',mobile()?2.6:3.2), LOOKY:n('LOOKY',1.5),
  FOV:n('FOV',mobile()?68:55), GAP:n('GAP',1.0), HANG:n('HANG',1.55)
});
const canvas=document.getElementById('gl');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
const scene3=new THREE.Scene();
scene3.background=new THREE.Color(0xf2f1ee);
scene3.fog=new THREE.Fog(0xf2f1ee,14,38);
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
    // skylight bounce near the ceiling
    const sw2=ctx.createLinearGradient(0,0,0,H*0.3);
    sw2.addColorStop(0,'rgba(255,255,252,.55)');sw2.addColorStop(1,'rgba(255,255,252,0)');
    ctx.fillStyle=sw2;ctx.fillRect(0,0,W,H*0.3);
    // warm wash pools above each work (u: meters from xw)
    for(const w of works){
      const u=( (P().X0-w.s) - xw )*PXM;
      const cy=(ceil-2.6)*PXM;
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
    g.addColorStop(0,'#d9cfc0');g.addColorStop(0.35,'#ded5c7');g.addColorStop(1,'#cfc5b5');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    // light oak planks running along the room
    const pw=Math.max(5,Math.round(0.19*40));
    for(let y=0;y<H;y+=pw){
      const sh=(Math.random()*10-5)|0;
      ctx.fillStyle='rgba('+(120+sh)+','+(100+sh)+','+(80+sh)+',.05)';
      ctx.fillRect(0,y,W,pw);
      ctx.fillStyle='rgba(96,82,64,.16)';ctx.fillRect(0,y,W,1);
      let xj=-Math.random()*2*40;
      while(xj<W){const bl=(2.2+Math.random()*2.5)*40;
        ctx.fillStyle='rgba(96,82,64,.10)';ctx.fillRect(xj,y,1,pw);
        xj+=bl;}
    }
    // daylight spill from the west windows: three soft light patches on the floor
    for(let i=0;i<3;i++){
      const cy2=H*(0.18+i*0.32);
      const pg=ctx.createRadialGradient(1.6*40,cy2,6,1.6*40,cy2,2.4*40);
      pg.addColorStop(0,'rgba(255,255,250,.4)');pg.addColorStop(1,'rgba(255,255,250,0)');
      ctx.save();ctx.translate(1.6*40,cy2);ctx.scale(1.4,0.55);ctx.translate(-1.6*40,-cy2);
      ctx.fillStyle=pg;ctx.fillRect(-1.2*40,cy2-2.4*40,5.6*40,4.8*40);
      ctx.restore();
    }
    const ds=ctx.createLinearGradient(0,0,3*40,0);
    ds.addColorStop(0,'rgba(252,252,248,.22)');ds.addColorStop(1,'rgba(252,252,248,0)');
    ctx.fillStyle=ds;ctx.fillRect(0,0,3*40,H);
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
function windowWallTex(){
  const p=P(),PX2=64;
  const W=Math.ceil(p.WIDTH*PX2),H=Math.ceil(p.CEIL*PX2);
  return canvasTex(W,H,(ctx)=>{
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#eae8e4');g.addColorStop(0.3,'#f2f1ee');g.addColorStop(1,'#e7e5e1');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    // three tall cast-iron loft windows with daylight
    const mX=0.55*PX2,gap=0.4*PX2;
    const ww2=(W-2*mX-2*gap)/3;
    const top=0.75*PX2,bot=H-0.85*PX2;
    for(let i=0;i<3;i++){
      const x=mX+i*(ww2+gap);
      const wg=ctx.createLinearGradient(x,top,x,bot);
      wg.addColorStop(0,'#fffef9');wg.addColorStop(0.4,'#f6f7f2');wg.addColorStop(1,'#ecefe9');
      ctx.fillStyle=wg;ctx.fillRect(x,top,ww2,bot-top);
      // bright daylight core in each pane
      const cx2=x+ww2/2,cy3=top+(bot-top)*0.35;
      const pg=ctx.createRadialGradient(cx2,cy3,4,cx2,cy3,ww2*0.75);
      pg.addColorStop(0,'rgba(255,255,253,.9)');pg.addColorStop(1,'rgba(255,255,253,0)');
      ctx.fillStyle=pg;ctx.fillRect(x,top,ww2,bot-top);
      ctx.fillStyle='#38352f';
      ctx.fillRect(x,top,ww2,4);ctx.fillRect(x,bot-4,ww2,4);
      ctx.fillRect(x,top,4,bot-top);ctx.fillRect(x+ww2-4,top,4,bot-top);
      ctx.fillRect(x+ww2/2-2,top,4,bot-top);
      for(let r=1;r<5;r++)ctx.fillRect(x,top+(bot-top)*r/5-2,ww2,4);
      ctx.fillStyle='rgba(70,66,60,.3)';ctx.fillRect(x-5,bot,ww2+10,5);
    }
    const gg=ctx.createRadialGradient(W/2,H*0.4,10,W/2,H*0.4,W*0.7);
    gg.addColorStop(0,'rgba(255,255,250,.25)');gg.addColorStop(1,'rgba(255,255,250,0)');
    ctx.fillStyle=gg;ctx.fillRect(0,0,W,H);
  });
}
function ceilTexture(xw,xe){
  const lenM=xe-xw,widM=P().WIDTH;
  const W=Math.min(2048,Math.ceil(lenM*40)),H=Math.ceil(widM*40);
  return canvasTex(W,H,(ctx)=>{
    ctx.fillStyle='#f0eeeb';ctx.fillRect(0,0,W,H);
    // skylight wells along the room
    const n=6,sw2=lenM/n;
    for(let i=0;i<n;i++){
      const cx=(i+0.5)*sw2*40, cy2=H*0.45;
      const rw=sw2*40*0.5,rh=H*0.24;
      ctx.save();ctx.shadowColor='rgba(255,255,250,.9)';ctx.shadowBlur=40;
      ctx.fillStyle='rgba(253,253,250,.95)';
      ctx.fillRect(cx-rw/2,cy2-rh/2,rw,rh);
      ctx.restore();
    }
  });
}
function buildRoom(){
  if(roomBuilt)return;roomBuilt=true;
  const p=P();
  const xe=p.X0+1.8, xw=p.X0-(lastS+2.6), zw=p.ZW, zc=zw+p.WIDTH, ceil=p.CEIL;
  const len=xe-xw, mid=(xe+xw)/2;
  // north (main) wall, gently curved (sag = p.CURVE, zero at both ends)
  const seg=Math.max(32,Math.ceil(len*3));
  const nwg=new THREE.PlaneGeometry(len,ceil,seg,1);
  {
    const pa=nwg.attributes.position;
    for(let i=0;i<pa.count;i++){
      const wx=mid+pa.getX(i);
      const t=(wx-xw)/len;
      pa.setZ(i,-p.CURVE*4*t*(1-t));
    }
  }
  const nw=new THREE.Mesh(nwg,
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
    new THREE.MeshBasicMaterial({map:windowWallTex()}));
  ww.position.set(xw,ceil/2,zw+p.WIDTH/2);ww.rotation.y=Math.PI/2;
  scene3.add(ww);
  // floor
  const fg=new THREE.PlaneGeometry(len,p.WIDTH);fg.rotateX(-Math.PI/2);
  const fl=new THREE.Mesh(fg,new THREE.MeshBasicMaterial({map:floorTexture(xw,xe)}));
  fl.position.set(mid,0,zw+p.WIDTH/2);
  scene3.add(fl);
  // ceiling
  const cg2=new THREE.PlaneGeometry(len,p.WIDTH);cg2.rotateX(Math.PI/2);
  const cm=new THREE.Mesh(cg2,new THREE.MeshBasicMaterial({map:ceilTexture(xw,xe)}));
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
    if(prevSeries!==null&&prevSeries!==w.name)s+=(prevSeries===SERIES[0].name?3.6:1.7);
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
  applyCurve();
  buildTree();
  onDone();
}
// ---- vinyl wall text ----
const vinylList=[];
function addVinyl(lines,s,y,big){
  const p=P();
  const {tex,aspect}=vinylTex(lines,big);
  const h=big?0.5:0.28,w=h*aspect;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
    new THREE.MeshBasicMaterial({map:tex,transparent:true}));
  m.position.set(p.X0-s,y,p.ZW+0.012);
  scene3.add(m);
  vinylList.push({mesh:m,s,y});
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
// ---- curve + tree placement ----
function applyCurve(){
  const p=P();
  const xe=p.X0+1.8, xw=p.X0-(lastS+2.6), len=xe-xw;
  const at=x=>{const t=(x-xw)/len;
    return {dz:-p.CURVE*4*t*(1-t), ang:-Math.atan(-p.CURVE*4*(1-2*t)/len)};};
  const rot=(dx,dz,a)=>({x:dx*Math.cos(a)+dz*Math.sin(a),z:-dx*Math.sin(a)+dz*Math.cos(a)});
  for(const w of works){
    const x=p.X0-w.s,{dz,ang}=at(x);
    w.group.position.set(x,p.HANG,p.ZW+dz);w.group.rotation.y=ang;
    const so=rot(0.045,0.006,ang);
    w.shadow.position.set(x+so.x,p.HANG-0.055,p.ZW+dz+so.z);w.shadow.rotation.y=ang;
    const po=rot(w.w/2+0.20,0.012,ang);
    w.placard.position.set(x+po.x,1.5,p.ZW+dz+po.z);w.placard.rotation.y=ang;
  }
  for(const v of vinylList){
    const x=p.X0-v.s,{dz,ang}=at(x);
    const o=rot(0,0.012,ang);
    v.mesh.position.set(x+o.x,v.y,p.ZW+dz+o.z);v.mesh.rotation.y=ang;
  }
}
const foliageCols=[0x7d8863,0x8b9570,0x6e7a58,0x97a182,0x7a8464];
function leafTex(){
  return canvasTex(256,256,(ctx)=>{
    ctx.clearRect(0,0,256,256);
    const cols=['#7d8863','#8b9570','#6e7a58','#97a182','#85906b'];
    for(let i=0;i<22;i++){
      const a=Math.random()*Math.PI*2, r=Math.random()*70;
      const x=128+Math.cos(a)*r, y=128+Math.sin(a)*r;
      ctx.save();ctx.translate(x,y);ctx.rotate(Math.random()*Math.PI);
      ctx.fillStyle=cols[i%cols.length];
      ctx.globalAlpha=0.85+Math.random()*0.15;
      ctx.beginPath();ctx.ellipse(0,0,26+Math.random()*14,9+Math.random()*6,0,0,7);ctx.fill();
      ctx.restore();
    }
  });
}
function tube(p1,p2,r1,r2,mat){
  const d=new THREE.Vector3().subVectors(p2,p1);
  const l=d.length();
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,l,8),mat);
  m.position.copy(p1).addScaledVector(d,0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());
  return m;
}
function buildTree(){
  const p=P();
  if(!p.TREE)return;
  // olive tree stands in the widened gap after the first series, in front of the wall
  const s0=works.filter(w=>w.series===SERIES[0]);
  const s1=works.filter(w=>w.series===SERIES[1]);
  const end0=Math.max(...s0.map(w=>w.s+w.w/2));
  const start1=Math.min(...s1.map(w=>w.s-w.w/2));
  const tx=p.X0-(end0+start1)/2,tz=p.ZW+0.6;
  const potM=new THREE.MeshBasicMaterial({color:0xb5afa4});
  const trunkM=new THREE.MeshBasicMaterial({color:0x5d4e41});
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.36,0.55,20),potM);
  pot.position.set(tx,0.275,tz);scene3.add(pot);
  const soil=new THREE.Mesh(new THREE.CircleGeometry(0.41,20),
    new THREE.MeshBasicMaterial({color:0x4a4038}));
  soil.rotation.x=-Math.PI/2;soil.position.set(tx,0.552,tz);scene3.add(soil);
  const b0=new THREE.Vector3(tx,0.55,tz);
  const b1=new THREE.Vector3(tx+0.08,1.35,tz+0.03);
  const b2=new THREE.Vector3(tx-0.02,2.05,tz-0.04);
  scene3.add(tube(b0,b1,0.06,0.042,trunkM));
  scene3.add(tube(b1,b2,0.042,0.024,trunkM));
  for(let i=0;i<9;i++){
    const a=i/9*Math.PI*2+0.4;
    const r=0.5+((i*37)%45)/100;
    const tip=new THREE.Vector3(b2.x+Math.cos(a)*r,2.4+((i*53)%55)/100,b2.z+Math.sin(a)*r);
    scene3.add(tube(b2,tip,0.014,0.006,trunkM));
  }
  // olive canopy: soft leaf-cluster billboards in an ellipsoid cloud
  const LEAF=leafTex();
  const leafM=new THREE.MeshBasicMaterial({map:LEAF,transparent:true,side:THREE.DoubleSide,alphaTest:0.08});
  for(let i=0;i<80;i++){
    const a=i*2.399963;
    const rr=0.35+((i*29)%65)/100;
    const y=2.45+((i*41)%105)/100;
    const sc=0.28+((i*13)%22)/100;
    const s=new THREE.Mesh(new THREE.PlaneGeometry(sc,sc*0.7),leafM);
    s.position.set(b2.x+Math.cos(a)*rr*0.95,y,b2.z+Math.sin(a)*rr*0.95);
    s.rotation.set(i*0.7,i*1.3,i*0.3);
    scene3.add(s);
  }
  const sh=new THREE.Mesh(new THREE.PlaneGeometry(2.4,2.4),
    new THREE.MeshBasicMaterial({map:SHADOW,transparent:true,depthWrite:false,opacity:0.8}));
  sh.rotation.x=-Math.PI/2;sh.position.set(tx,0.004,tz);
  scene3.add(sh);
}
// ---- camera walk + input ----
let dead=false;
let pos=n('POS0',mobile()?0.4:-0.95),vel=0,dragging=false,moved=false,lastX=0;
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
