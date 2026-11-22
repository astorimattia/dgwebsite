// @ts-nocheck
'use client';

import { useEffect } from 'react';

const CSS = `
:root{--ink:#171615;--mut:#8a8781;}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;height:100%;overflow:hidden;background:#eee7dc;
  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--ink);}
#gl{position:fixed;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none;}
#gl.dragging{cursor:grabbing;}
.topbar{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:26px 34px 40px;pointer-events:none;background:linear-gradient(180deg,rgba(238,231,220,.85),rgba(238,231,220,0));}
.topbar .name{font-size:15px;letter-spacing:.04em;pointer-events:auto;text-decoration:none;color:var(--ink);text-shadow:0 1px 10px rgba(238,231,220,.95),0 0 3px rgba(238,231,220,.9);}
.topbar nav{pointer-events:auto;}
.topbar nav a{font-size:13px;color:var(--ink);text-decoration:none;margin-left:26px;letter-spacing:.03em;text-shadow:0 1px 10px rgba(238,231,220,.95),0 0 3px rgba(238,231,220,.9);}
.topbar nav a.on{color:var(--mut);}
.vig{position:fixed;inset:0;z-index:5;pointer-events:none;background:
  linear-gradient(180deg,rgba(50,46,40,.08),rgba(50,46,40,0) 18%),
  radial-gradient(120% 90% at 50% 45%,rgba(0,0,0,0) 72%,rgba(40,36,30,.12));}
.grain{position:fixed;inset:0;width:100%;height:100%;z-index:6;pointer-events:none;opacity:.05;}
.bottomhint{position:fixed;bottom:22px;left:0;right:0;text-align:center;z-index:20;font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:#8a867e;pointer-events:none;transition:opacity 1s;text-shadow:0 1px 8px rgba(238,231,220,.95),0 0 3px rgba(238,231,220,.9);}
.lb{position:fixed;inset:0;z-index:50;background:rgba(250,250,249,.97);display:none;align-items:center;justify-content:center;flex-direction:column;padding:5vh 5vw;}
.lb.open{display:flex;}
.lb img{max-width:min(88vw,1100px);max-height:72vh;box-shadow:0 30px 70px rgba(40,36,30,.25);}
.lb .cap{margin-top:22px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mut);}
.lb .story{margin-top:14px;font-size:13px;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:2px;}
.lb .x{position:fixed;top:26px;right:34px;font-size:14px;letter-spacing:.2em;color:var(--mut);cursor:pointer;text-transform:uppercase;}
@media (max-width:640px){.topbar{padding:18px 20px;background:#eee7dc;}.topbar nav a{margin-left:16px;font-size:12px;}}
`;

export default function SohoGallery() {
  useEffect(() => {
    const start = () => {

// ===== setup.js =====
// v4 setup: params, renderer, env, lights, shared materials/textures
var PH={
 'sansevero2.webp':'/assets/images/sansevero2.webp','sansevero5.webp':'/assets/images/sansevero5.webp','sansevero8.webp':'/assets/images/sansevero8.webp',
 'sanjuan-analog.webp':'/assets/images-optimized/sanjuan-analog.webp','sanjuan-analog3.webp':'/assets/images-optimized/sanjuan-analog3.webp','sanjuan-analog6.webp':'/assets/images-optimized/sanjuan-analog6.webp',
 'tultepec-analog-lg.webp':'/assets/images-optimized/tultepec-analog-lg.webp','tultepec-analog4-lg.webp':'/assets/images-optimized/tultepec-analog4-lg.webp','tultepec-analog8-lg.webp':'/assets/images-optimized/tultepec-analog8-lg.webp',
 'mautkakuan-analog.webp':'/assets/images-optimized/mautkakuan-analog.webp','mautkakuan-analog5.webp':'/assets/images-optimized/mautkakuan-analog5.webp','mautkakuan-analog8.webp':'/assets/images-optimized/mautkakuan-analog8.webp',
 'banni-analog.webp':'/assets/images-optimized/banni-analog.webp','banni-analog3.webp':'/assets/images-optimized/banni-analog3.webp','banni-analog7.webp':'/assets/images-optimized/banni-analog7.webp'
};
var SERIES=[
 {name:'Festa del Soccorso',place:'San Severo, Italia',year:'2026',slug:'c-vdim-au-fnel',photos:['sansevero2.webp','sansevero5.webp','sansevero8.webp']},
 {name:'Si San Juanito Permite',place:'San Juan de la Vega, Mexico',year:'2026',slug:'si-san-juanito-permite',photos:['sanjuan-analog.webp','sanjuan-analog3.webp','sanjuan-analog6.webp']},
 {name:'Tultepec',place:'Tultepec, Mexico',year:'2025',slug:null,photos:['tultepec-analog-lg.webp','tultepec-analog4-lg.webp','tultepec-analog8-lg.webp']},
 {name:'Maut Ka Kuan',place:'India',year:'2025',slug:null,photos:['mautkakuan-analog.webp','mautkakuan-analog5.webp','mautkakuan-analog8.webp']},
 {name:'Banni',place:'India',year:'2025',slug:null,photos:['banni-analog.webp','banni-analog3.webp','banni-analog7.webp']}
];
var q=new URLSearchParams(location.search);
function n(k,d){return q.has(k)?+q.get(k):d;}
function mobile(){return innerWidth<640;}
function P(){return {
  X0:n('X0',3.5), ZW:n('ZW',-2.4), CEIL:n('CEIL',6.4), WIDTH:n('WIDTH',9.0),
  CURVE:n('CURVE',2.0), TREE:n('TREE',1),
  CAMD:n('CAMD',mobile()?7.4:7.3), EYE:n('EYE',1.6),
  LOOK:n('LOOK',mobile()?14:7), LOOKY:n('LOOKY',mobile()?2.6:1.9),
  FOV:n('FOV',mobile()?80:68), GAP:n('GAP',1.0), HANG:n('HANG',1.55),
  EXP:n('EXP',1.05), SUN:n('SUN',2.7), HEMI:n('HEMI',0.5), SHAFT:n('SHAFT',0)
};}
var canvas=document.getElementById('gl');
var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=P().EXP;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
var scene3=new THREE.Scene();
scene3.background=new THREE.Color(0xeee7dc);

var camera=new THREE.PerspectiveCamera(55,1,0.05,120);

// loading cover: hide until shell+tree are ready (or failed / timed out)
var LD={need:{shell:1,tree:1},el:null};
(function(){
  var d=document.createElement('div');d.id='ldcover';
  d.style.cssText='position:fixed;inset:0;z-index:30;background:#eee7dc;display:flex;align-items:center;justify-content:center;font:11px "Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:#8a867e;transition:opacity .9s ease;pointer-events:none;';
  d.textContent='Loading the gallery';
  document.body.appendChild(d);LD.el=d;
  setTimeout(function(){loadDone('timeout',true);},n('LDT',30)*1000);
})();
function loadDone(k,force){
  if(!LD.el)return;
  if(k!=='timeout')delete LD.need[k];
  if(force||Object.keys(LD.need).length===0){
    var e=LD.el;LD.el=null;
    setTimeout(function(){e.style.opacity=0;document.documentElement.setAttribute('data-ready',force?'forced':'ok');setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e);},1000);},350);
  }
}
function sizeRenderer(){
  renderer.setSize(innerWidth,innerHeight,false);
  camera.aspect=innerWidth/innerHeight;
  camera.fov=P().FOV;
  camera.updateProjectionMatrix();
}
function canvasTex(w,h,draw){
  var c=document.createElement('canvas');c.width=w;c.height=h;
  draw(c.getContext('2d'),w,h);
  var t=new THREE.CanvasTexture(c);
  t.anisotropy=renderer.capabilities.getMaxAnisotropy();
  return t;
}
// film grain overlay (2D canvas, static noise regenerated slowly)
var grainC=document.getElementById('grain'),grainX=grainC.getContext('2d');
function grainFrame(){
  var w=grainC.width=Math.ceil(innerWidth/3),h=grainC.height=Math.ceil(innerHeight/3);
  var id=grainX.createImageData(w,h),d=id.data;
  for(var i=0;i<d.length;i+=4){var v=118+Math.random()*20|0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255;}
  grainX.putImageData(id,0,0);
}
grainFrame();
// --- environment IBL: warm gradient sky + two bright softboxes ---
(function(){
  var env=new THREE.Scene();
  var grad=canvasTex(64,256,function(ctx,w,h){
    var g=ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#cdd6de');g.addColorStop(0.42,'#e9e4da');
    g.addColorStop(0.62,'#efe7da');g.addColorStop(1,'#c9bda9');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  });
  var sph=new THREE.Mesh(new THREE.SphereGeometry(40,16,12),
    new THREE.MeshBasicMaterial({map:grad,side:THREE.BackSide}));
  env.add(sph);
  var box=new THREE.MeshBasicMaterial({color:0xfffaf0});
  var p1=new THREE.Mesh(new THREE.PlaneGeometry(24,12),box);
  p1.position.set(-6,26,-8);p1.rotation.x=Math.PI/2.4;env.add(p1);
  var p2=new THREE.Mesh(new THREE.PlaneGeometry(16,9),new THREE.MeshBasicMaterial({color:0xf2ecff}));
  p2.position.set(14,20,10);p2.rotation.x=Math.PI/2.2;p2.rotation.z=0.6;env.add(p2);
  var pm=new THREE.PMREMGenerator(renderer);pm.compileCubemapShader();
  var rt=pm.fromScene(env,0.05);
  scene3.environment=rt.texture;
  pm.dispose();
})();
// --- lights ---
var midX=0; // set after layout
var sun=null,hemi=null;
function buildLights(){
  var p=P();
  hemi=new THREE.HemisphereLight(0xfff6ea,0xb8ae9c,p.HEMI);
  scene3.add(hemi);
  sun=new THREE.DirectionalLight(0xfff1dc,p.SUN);
  sun.position.set(midX+3,p.CEIL+9,p.ZW-5.0);
  sun.target.position.set(midX-1.5,0,p.ZW+p.WIDTH*0.62);
  sun.castShadow=false;
  sun.shadow.mapSize.set(2048,2048);
  var ext=Math.min(24,lastS*0.62+6);
  sun.shadow.camera.left=-ext;sun.shadow.camera.right=ext;
  sun.shadow.camera.top=12;sun.shadow.camera.bottom=-10;
  sun.shadow.camera.near=2;sun.shadow.camera.far=40;
  sun.shadow.bias=-0.0004;sun.shadow.normalBias=0.03;
  scene3.add(sun);scene3.add(sun.target);
  // two warm gallery spots washing the art wall
  for(var i=0;i<2;i++){
    var s=i===0?lastS*0.28:lastS*0.72;
    var sp=new THREE.SpotLight(0xffe9c6,0.85,10,0.5,1.0,1.6);
    sp.position.set(P().X0-s+0.7,p.CEIL-0.35,p.ZW+0.62);
    sp.target.position.set(P().X0-s,1.5,p.ZW+0.04);
    scene3.add(sp);scene3.add(sp.target);
  }
}
// --- shared materials ---
var TL=new THREE.TextureLoader();
function tex(url,srgb,repX,repY){
  var t=TL.load(url);
  t.wrapS=t.wrapT=THREE.RepeatWrapping;
  if(srgb)t.encoding=THREE.sRGBEncoding;
  t.anisotropy=renderer.capabilities.getMaxAnisotropy();
  if(repX)t.repeat.set(repX,repY);
  return t;
}
var A='/assets/soho/';
var floorMat=new THREE.MeshStandardMaterial({
  map:tex(A+'4-floor_diff.jpg',true),
  normalMap:tex(A+'floor_nor.jpg'),
  roughnessMap:tex(A+'floor_rough.jpg'),
  roughness:1.0,metalness:0.0,envMapIntensity:0.55,color:0xe9dcc3});
floorMat.normalScale=new THREE.Vector2(0.7,0.7);
var plasterN=tex(A+'plaster_nor.jpg'),plasterR=tex(A+'plaster_rough.jpg');
function plasterMat(repX,repY){
  var nm=plasterN.clone();nm.needsUpdate=true;nm.repeat.set(repX,repY);
  var rm=plasterR.clone();rm.needsUpdate=true;rm.repeat.set(repX,repY);
  var m=new THREE.MeshStandardMaterial({color:0xece4d6,roughness:1.0,metalness:0,
    normalMap:nm,roughnessMap:rm,envMapIntensity:0.32});
  m.normalScale=new THREE.Vector2(0.4,0.4);
  return m;
}
var creamMat=new THREE.MeshStandardMaterial({color:0xeae2d2,roughness:0.85,metalness:0,envMapIntensity:0.3});
var bronzeMat=new THREE.MeshStandardMaterial({color:0x35302a,roughness:0.5,metalness:0.65,envMapIntensity:0.6});
var frameMat=new THREE.MeshStandardMaterial({color:0x2a2723,roughness:0.52,metalness:0.08,envMapIntensity:0.45});
var matboardMat=new THREE.MeshStandardMaterial({color:0xfbfaf8,roughness:0.95,metalness:0,envMapIntensity:0.25});
var glassMat=new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:0.055,roughness:0.06,metalness:0,envMapIntensity:1.5,depthWrite:false});
var oakMat=new THREE.MeshStandardMaterial({
  map:tex(A+'4-floor_diff.jpg',true),normalMap:tex(A+'floor_nor.jpg'),
  roughness:0.62,metalness:0,color:0xd9c9ae,envMapIntensity:0.5});
// soft radial blob shadow (contact AO)
var SHADOW=canvasTex(256,256,function(ctx,w,h){
  var g=ctx.createRadialGradient(w/2,h/2,w*0.24,w/2,h/2,w*0.6);
  g.addColorStop(0,'rgba(45,40,34,.4)');g.addColorStop(0.75,'rgba(45,40,34,.13)');g.addColorStop(1,'rgba(45,40,34,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
});
// linear AO strip texture (dark at edge)
var STRIP=canvasTex(16,128,function(ctx,w,h){
  var g=ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'rgba(48,42,36,.34)');g.addColorStop(1,'rgba(48,42,36,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
});
var SHAFTTEX=canvasTex(64,256,function(ctx,w,h){
  var g=ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'rgba(255,250,238,0)');g.addColorStop(0.18,'rgba(255,250,238,.34)');
  g.addColorStop(0.7,'rgba(255,250,238,.14)');g.addColorStop(1,'rgba(255,250,238,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  var g2=ctx.createLinearGradient(0,0,w,0);
  g2.addColorStop(0,'rgba(0,0,0,1)');g2.addColorStop(0.3,'rgba(0,0,0,0)');
  g2.addColorStop(0.7,'rgba(0,0,0,0)');g2.addColorStop(1,'rgba(0,0,0,1)');
  ctx.globalCompositeOperation='destination-out';
  ctx.fillStyle=g2;ctx.fillRect(0,0,w,h);
});
var works=[],lastS=30,roomBuilt=false;

// ===== room.js =====
var dust=null,dustBase=null,dustPhase=null;
// v11 room: Blender-baked shell (lightmapped GLB) + live skylight panels
var shellObj=null,TXc=null;
function buildRoom(){
  if(roomBuilt)return;roomBuilt=true;
  var p=P();
  var xe=p.X0+1.8, xw=p.X0-(lastS+2.6), len=xe-xw; midX=(xe+xw)/2;
  buildLights();
  var lm=new THREE.TextureLoader().load('/assets/soho/3-lm.png');
  lm.flipY=false;lm.encoding=THREE.sRGBEncoding;lm.anisotropy=4;
  var lmK=n('LMK',4.1);
  function tx(u,srgb){var t=new THREE.TextureLoader().load(u);t.flipY=false;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;}
  var fl=tx('/assets/soho/4-floor_diff.jpg');
  var DEF={
    plaster:{c:0xfff0d6,k:1.2},floor:{c:0xfff0dc,m:fl,k:1.7},ceilm:{c:0xf0dcb8,k:1.2},cream:{c:0xeae2d2},
    bronze:{c:0x35302a},oak:{c:0xffe0b8,m:fl},vinyl:{c:0x24211d},stone:{c:0xb9a283},pebbles:{c:0xe8e4da}
  };
  new THREE.GLTFLoader().load('/assets/soho/1-shell.glb',function(g){
    var root=g.scene;
    root.traverse(function(o){
      if(!o.isMesh)return;
      var nm=(o.material&&o.material.name||'').split('.')[0];
      var m;
      if(nm==='skyglow'){m=new THREE.MeshBasicMaterial({color:0xfffdf4});m.toneMapped=false;}
      else{
        var d=DEF[nm]||{c:0xdddddd};
        m=new THREE.MeshBasicMaterial({color:d.c,map:d.m||null,lightMap:lm,lightMapIntensity:lmK*(d.k||1),side:THREE.DoubleSide});
      }
      if(q.get('HIDE')===nm)m.visible=false;
      o.material=m;
    });
    scene3.add(root);shellObj=root;loadDone('shell');
  },undefined,function(e){console.warn('shell load failed',e);loadDone('shell');});
}

// ===== works.js =====
// v4 works: framed prints, placards, vinyl titles, layout + curve
function makeFrontCanvas(img){
  var matPx=52,W=1024;
  var ph=Math.round(W*img.naturalHeight/img.naturalWidth);
  var c=document.createElement('canvas');
  c.width=W+matPx*2;c.height=ph+matPx*2;
  var ctx=c.getContext('2d');
  ctx.fillStyle='#fbfaf8';ctx.fillRect(0,0,c.width,c.height);
  ctx.drawImage(img,matPx,matPx,W,ph);
  ctx.strokeStyle='rgba(40,36,30,.20)';ctx.lineWidth=3;
  ctx.strokeRect(matPx-1.5,matPx-1.5,W+3,ph+3);
  return c;
}
function placardTex(sr){
  return canvasTex(560,250,function(ctx,w,h){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#fbfaf8';ctx.fillRect(6,6,w-14,h-14);
    ctx.strokeStyle='rgba(50,46,40,.12)';ctx.strokeRect(6.5,6.5,w-15,h-15);
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
  var font1=(big?'400 72px':'400 40px')+' Georgia,"Times New Roman",serif';
  var font2=(big?'28px':'22px')+' "Helvetica Neue",Helvetica,Arial,sans-serif';
  var m=document.createElement('canvas').getContext('2d');
  m.font=font1;
  var t1=lines[0].toUpperCase().split('').join(' ');
  var wpx=Math.max(m.measureText(t1).width+40, lines[1]?600:0);
  return {tex:canvasTex(Math.ceil(wpx),big?260:170,function(ctx,w,h){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#24211d';
    ctx.font=font1;ctx.textBaseline='top';
    ctx.fillText(t1,20,10);
    if(lines[1]){
      ctx.font=font2;ctx.fillStyle='#8a8781';
      ctx.fillText(lines[1].toUpperCase(),24,big?118:80);
    }
  }),aspect:wpx/(big?220:140)};
}
function layoutWorks(){
  var p=P(),GAP=p.GAP;
  var s=3.3,prevSeries=null;
  for(var wi=0;wi<works.length;wi++){
    var w=works[wi];
    if(prevSeries!==null&&prevSeries!==w.name)s+=(prevSeries===SERIES[0].name?3.6:1.7);
    prevSeries=w.name;
    s+=w.w/2;w.s=s;
    s+=w.w/2+GAP;
  }
  lastS=s-GAP;
}
function buildWorks(onDone){
  var loader=new THREE.ImageLoader();
  loader.setCrossOrigin('anonymous');
  var pending=0,order=0;
  for(var si=0;si<SERIES.length;si++)(function(sr){
    for(var pi=0;pi<sr.photos.length;pi++){
      pending++;
      (function(file,idx){
        loader.load(PH[file],function(img){
          var c=makeFrontCanvas(img);
          var t=new THREE.CanvasTexture(c);
          t.encoding=THREE.sRGBEncoding;
          t.anisotropy=renderer.capabilities.getMaxAnisotropy();
          var ca=c.width/c.height;
          var h=1.38/Math.pow(ca,0.22);
          h=Math.max(0.95,Math.min(1.68,h));
          var w=h*ca;
          var group=new THREE.Group();
          var front=new THREE.MeshBasicMaterial({map:t});front.toneMapped=false;
          var mats=[frameMat,frameMat,frameMat,frameMat,front,frameMat];
          var box=new THREE.Mesh(new THREE.BoxGeometry(w,h,0.045),mats);
          box.position.z=0.024;box.castShadow=true;
          box.userData.work=true;
          group.add(box);
          var glass=new THREE.Mesh(new THREE.PlaneGeometry(w,h),glassMat);
          glass.position.z=0.0495;group.add(glass);
          works.push({idx:idx,group:group,box:box,w:w,h:h,s:0,src:PH[file],
            place:sr.place,year:sr.year,slug:sr.slug,name:sr.name,series:sr});
          if(--pending===0)finishWorks(onDone);
        },undefined,function(){if(--pending===0)finishWorks(onDone);});
      })(sr.photos[pi],order++);
    }
  })(SERIES[si]);
}
function finishWorks(onDone){
  works.sort(function(a,b){return a.idx-b.idx;});
  for(var wi=0;wi<works.length;wi++){
    var w=works[wi];
    var fp=0.03,d=0.058;
    var top=new THREE.Mesh(new THREE.BoxGeometry(w.w+2*fp,fp,d),frameMat);
    top.position.set(0,w.h/2+fp/2,0.02);top.castShadow=true;
    var bot=top.clone();bot.position.y=-w.h/2-fp/2;
    var lef=new THREE.Mesh(new THREE.BoxGeometry(fp,w.h,d),frameMat);
    lef.position.set(-w.w/2-fp/2,0,0.02);lef.castShadow=true;
    var rig=lef.clone();rig.position.x=w.w/2+fp/2;
    w.group.add(top,bot,lef,rig);
    scene3.add(w.group);
    var sh=new THREE.Mesh(new THREE.PlaneGeometry(w.w+0.55,w.h+0.55),
      new THREE.MeshBasicMaterial({map:SHADOW,transparent:true,depthWrite:false,opacity:0.55}));
    sh.renderOrder=1;
    w.shadow=sh;sh.visible=false;
    var pl=new THREE.Group();
    var plb=new THREE.Mesh(new THREE.BoxGeometry(0.27,0.12,0.006),matboardMat);
    pl.add(plb);
    var plt=new THREE.Mesh(new THREE.PlaneGeometry(0.27,0.12),
      new THREE.MeshBasicMaterial({map:placardTex(w.series),transparent:true}));
    plt.position.z=0.004;pl.add(plt);
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
var vinylList=[];
function addVinyl(lines,s,y,big){
  var p=P();
  var r=vinylTex(lines,big);
  var h=big?0.5:0.28,w=h*r.aspect;
  var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
    new THREE.MeshBasicMaterial({map:r.tex,transparent:true}));
  m.position.set(p.X0-s,y,p.ZW+0.012);
  scene3.add(m);
  vinylList.push({mesh:m,s:s,y:y});
  return w;
}
function buildVinyl(){
  var prevEnd=3.3-0.7;
  for(var i=0;i<SERIES.length;i++){
    var sr=SERIES[i];
    var mine=works.filter(function(w){return w.name===sr.name;});
    if(mine.length){
      var firstS=mine[0].s-mine[0].w/2;
      var gapMid=(prevEnd+firstS)/2;
      if(firstS-prevEnd>1.15)addVinyl([sr.name],gapMid,1.62,false);
      prevEnd=mine[mine.length-1].s+mine[mine.length-1].w/2;
    }
  }
  addVinyl(['More soon'],prevEnd+1.0,1.62,false);
}
// ---- curve application ----
function applyCurve(){
  var p=P();
  var xe=p.X0+1.8, xw=p.X0-(lastS+2.6), len=xe-xw;
  function at(x){var t=(x-xw)/len;
    return {dz:-p.CURVE*4*t*(1-t), ang:-Math.atan(-p.CURVE*4*(1-2*t)/len)};}
  function rot(dx,dz,a){return {x:dx*Math.cos(a)+dz*Math.sin(a),z:-dx*Math.sin(a)+dz*Math.cos(a)};}
  for(var wi=0;wi<works.length;wi++){
    var w=works[wi];
    var x=p.X0-w.s,r=at(x);
    w.group.position.set(x,p.HANG,p.ZW+r.dz);w.group.rotation.y=r.ang;
    var so=rot(0.05,0.008,r.ang);
    w.shadow.position.set(x+so.x,p.HANG-0.06,p.ZW+r.dz+so.z);w.shadow.rotation.y=r.ang;
    var po=rot(w.w/2+0.21,0.015,r.ang);
    w.placard.position.set(x+po.x,1.5,p.ZW+r.dz+po.z);w.placard.rotation.y=r.ang;
  }
  for(var vi=0;vi<vinylList.length;vi++){
    var v=vinylList[vi];
    var x2=p.X0-v.s,r2=at(x2);
    var o=rot(0,0.012,r2.ang);
    v.mesh.position.set(x2+o.x,v.y,p.ZW+r2.dz+o.z);v.mesh.rotation.y=r2.ang;
  }
}

// ===== tree.js =====
// v11 tree: scanned olive (Poly Haven island_tree_02, CC0), exported from the Blender scene
function buildTree(){
  var p=P();
  if(!p.TREE){loadDone('tree');return;}
  var s0=works.filter(function(w){return w.series===SERIES[0];});
  var s1=works.filter(function(w){return w.series===SERIES[1];});
  var end0=Math.max.apply(null,s0.map(function(w){return w.s+w.w/2;}));
  var start1=Math.min.apply(null,s1.map(function(w){return w.s-w.w/2;}));
  TXc=p.X0-(end0+start1)/2;
  var dl=new THREE.DRACOLoader();dl.setDecoderPath('/assets/draco/');var DM={'draco_decoder.js':'6-draco_decoder.js','draco_decoder.wasm':'7-draco_decoder.wasm','draco_wasm_wrapper.js':'8-draco_wasm_wrapper.js'};dl._loadLibrary=function(u,t){return THREE.DRACOLoader.prototype._loadLibrary.call(this,DM[u]||u,t)};var gl=new THREE.GLTFLoader();gl.setDRACOLoader(dl);
  gl.load('/assets/soho/2-tree.glb',function(g){
    g.scene.traverse(function(o){
      if(!o.isMesh)return;
      var m=o.material;
      if(m){m.envMapIntensity=0.5;if(m.map)m.map.anisotropy=4;
        if(m.transparent||m.alphaMode==='BLEND'||(m.name||'').toLowerCase().indexOf('leaf')>=0||(m.name||'').toLowerCase().indexOf('leaves')>=0){m.alphaTest=0.45;m.transparent=false;m.depthWrite=true;m.side=THREE.DoubleSide;}
        if(m.color){var lf=((m.name||'').toLowerCase().indexOf('leaf')>=0||(m.name||'').toLowerCase().indexOf('leaves')>=0);if(lf)m.color.setRGB(1.5,1.9,1.1);else m.color.setRGB(1.5,1.4,1.3);if(m.map&&m.emissive){m.emissive.setRGB(0.25,0.28,0.2);m.emissiveMap=m.map;}}
        m.needsUpdate=true;}
    });
    scene3.add(g.scene);document.documentElement.setAttribute('data-tree','ok');loadDone('tree');
  },undefined,function(e){console.warn('tree load failed',e);document.documentElement.setAttribute('data-tree','err:'+(e&&e.message||e));loadDone('tree');});
}

// ===== main.js =====
// v4 main: camera walk, input, lightbox, boot
var dead=false;
var pos=n('POS0',mobile()?4.5:1.0),vel=0,dragging=false,moved=false,lastX=0;
function posMax(){return Math.max(0,lastS-2.2);}
function clampPos(){pos=Math.max(-1.2,Math.min(posMax(),pos));}
function bump(u){u=Math.abs(u);return u>=1?0:0.5*(1+Math.cos(Math.PI*u));}
function applyCam(){
  var p=P();clampPos();
  var x=p.X0-pos;
  var xe=p.X0+1.8, xw=p.X0-(lastS+2.6), len=xe-xw;
  function dz(xx){var t=(xx-xw)/len;return -p.CURVE*4*t*(1-t);}
  var around=(TXc!==null&&TXc!==undefined)?3.4*bump((x-TXc)/3.2):0;
  var cz=p.ZW+dz(x)+p.CAMD+around;
  var lx=x-p.LOOK, lz=p.ZW+dz(lx)+0.3;
  camera.position.set(x,p.EYE,cz);
  camera.lookAt(lx,p.LOOKY,lz);
  if(n('DBG',0)){camera.position.set(n('DX',0),n('DY',1.6),n('DZ',0));camera.lookAt(n('LX',0),n('LY',1.2),n('LZ',0));}
}
var t0=performance.now();
function loop(){
  if(dead)return;
  if(!dragging&&Math.abs(vel)>0.0004){pos+=vel;vel*=0.93;clampPos();}
  applyCam();
  if(dust){
    var t=(performance.now()-t0)/1000;
    var pa=dust.geometry.attributes.position;
    for(var i=0;i<dustPhase.length;i++){
      pa.array[i*3]=dustBase[i*3]+Math.sin(t*0.22+dustPhase[i])*0.06;
      pa.array[i*3+1]=dustBase[i*3+1]+Math.sin(t*0.16+dustPhase[i]*1.7)*0.09;
      pa.array[i*3+2]=dustBase[i*3+2]+Math.cos(t*0.19+dustPhase[i])*0.06;
    }
    pa.needsUpdate=true;
  }
  renderer.render(scene3,camera);
  requestAnimationFrame(loop);
}
var hintHidden=false;
function hideHint(){if(!hintHidden){hintHidden=true;document.getElementById('hint').style.opacity=0;}}
setTimeout(hideHint,9000);
canvas.addEventListener('pointerdown',function(e){dragging=true;moved=false;lastX=e.clientX;vel=0;});
canvas.addEventListener('pointermove',function(e){
  if(!dragging)return;
  var dx=e.clientX-lastX;lastX=e.clientX;
  if(Math.abs(dx)>2&&!moved){moved=true;hideHint();canvas.classList.add('dragging');
    try{canvas.setPointerCapture(e.pointerId);}catch(_){}}
  var dp=-dx*(mobile()?0.011:0.007);
  pos+=dp;clampPos();vel=dp;
});
function endDrag(){dragging=false;canvas.classList.remove('dragging');}
canvas.addEventListener('pointerup',endDrag);
canvas.addEventListener('pointercancel',endDrag);
canvas.addEventListener('wheel',function(e){
  e.preventDefault();hideHint();
  var d=(e.deltaY+e.deltaX)*0.0032;
  pos+=d;clampPos();vel=d*0.14;
},{passive:false});
var lb=document.getElementById('lb');
function openLb(w){
  document.getElementById('lbimg').src=w.src;
  document.getElementById('lbcap').textContent=w.place+' — '+w.year;
  var s=document.getElementById('lbstory');
  if(w.slug){s.style.display='';s.href='/stories/'+w.slug;}else s.style.display='none';
  lb.classList.add('open');document.documentElement.setAttribute('data-lb','open');
}
document.getElementById('lbx').addEventListener('click',function(){lb.classList.remove('open');document.documentElement.setAttribute('data-lb','closed');});
lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('open');});
addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open');});
var ray=new THREE.Raycaster();
var mv=new THREE.Vector2();
canvas.addEventListener('click',function(e){
  if(moved)return;
  mv.x=(e.clientX/innerWidth)*2-1;
  mv.y=-(e.clientY/innerHeight)*2+1;
  ray.setFromCamera(mv,camera);
  var hits=ray.intersectObjects(works.map(function(w){return w.box;}));
  if(hits.length){
    var w=works.find(function(w){return w.box===hits[0].object;});
    if(w)openLb(w);
  }
});
sizeRenderer();
addEventListener('resize',function(){sizeRenderer();grainFrame();});
buildWorks(function(){});
loop();
canvas.__dispose=function(){dead=true;renderer.dispose();};
if(n('LOG',0)){setTimeout(function(){scene3.traverse(function(o){if(!o.isMesh)return;var b=new THREE.Box3().setFromObject(o);var s=new THREE.Vector3();b.getSize(s);if(b.max.x>0&&b.min.x<6&&b.max.z>3&&b.min.y<1.5&&s.x<12)console.log('BOXDBG',o.type,o.geometry.type,(o.material&&o.material.type),JSON.stringify([b.min.toArray().map(function(v){return +v.toFixed(2);}),b.max.toArray().map(function(v){return +v.toFixed(2);})]));});},4000);}
if(n('RAY',0)){setTimeout(function(){var r=new THREE.Raycaster();r.setFromCamera(new THREE.Vector2(0.1,-0.7),camera);var h=r.intersectObjects(scene3.children,true);for(var i=0;i<Math.min(3,h.length);i++){var o=h[i].object;console.log('RAYDBG',i,o.type,o.geometry&&o.geometry.type,o.material&&o.material.type,o.material&&o.material.name,JSON.stringify(h[i].point.toArray().map(function(v){return +v.toFixed(2);})),h[i].faceIndex,'cam',JSON.stringify(camera.position.toArray().map(function(v){return +v.toFixed(2);})));}},4000);}
if(n('NEAR',0)){setTimeout(function(){var L=[];scene3.traverse(function(o){if(!o.isMesh)return;var b=new THREE.Box3().setFromObject(o);var c=new THREE.Vector3();b.getCenter(c);var s=new THREE.Vector3();b.getSize(s);L.push([c.distanceTo(camera.position),o.geometry.type,o.material&&o.material.type,o.visible,s.toArray().map(function(v){return +v.toFixed(1);}),c.toArray().map(function(v){return +v.toFixed(1);})]);});L.sort(function(a,b){return a[0]-b[0];});for(var i=0;i<8;i++)console.log('NEARDBG',JSON.stringify(L[i]));},4000);}
if(n('LBTEST',0)){setTimeout(function(){var best=null;if(n('LBTEST',0)==2)setTimeout(function(){document.getElementById('lbx').dispatchEvent(new MouseEvent('click',{bubbles:true}));},2500);works.forEach(function(w){var v=w.box.getWorldPosition(new THREE.Vector3()).project(camera);if(Math.abs(v.x)<0.6&&Math.abs(v.y)<0.6&&v.z<1&&(!best||Math.abs(v.x)<Math.abs(best.v.x)))best={w:w,v:v};});if(best){canvas.dispatchEvent(new MouseEvent('click',{clientX:(best.v.x+1)/2*innerWidth,clientY:(1-best.v.y)/2*innerHeight,bubbles:true}));}},8000);}

    };
    const w = window;
    const load = (src) => new Promise((res) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; document.head.appendChild(s);
    });
    (async () => {
      if (!w.THREE) await load('/three.min.js');
      if (!w.THREE.GLTFLoader) await load('/9-GLTFLoader.js');
      if (!w.THREE.DRACOLoader) await load('/assets/draco/5-DRACOLoader.js');
      start();
    })();
    return () => {
      const c = document.getElementById('gl');
      if (c && c.__dispose) c.__dispose();
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
<div className="gl-root">
<div className="vig"></div>
<canvas className="grain" id="grain"></canvas>
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
