const D = window.DATOS, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const C = D.colores; Object.entries(C).forEach(([k,v])=>document.documentElement.style.setProperty("--"+k,v));
const PAL=[C.rosa,C.lila,C.menta,C.durazno,C.cielo];
$("#tit").textContent=D.titulo; $("#sub").textContent=D.edad+" años"; $("#abrir").textContent=D.boton;
$("#tSorp").textContent=D.tituloSorpresa; $("#pFlores").textContent=D.pistaFlores; $("#pPastel").textContent=D.pistaPastel;
$("#alFinal").textContent=D.ultima+" →";
let vistaAct="inicio", animId=0;
function ir(id){
  vistaAct=id; $$(".vista").forEach(v=>v.classList.toggle("on",v.id===id));
  $$("#nav a").forEach(a=>a.classList.toggle("on",a.dataset.go===id));
  cancelAnimationFrame(animId);
  if(id==="carta") carta();
  if(id==="final") document.fonts.load('italic 700 20px Fraunces').finally(()=>{ if(vistaAct==="final") finale() });
}
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]"); if(g) ir(g.dataset.go)});
$("#abrir").onclick=$("#regalo").onclick=()=>{$("#regalo").classList.add("abre"); confeti(); setTimeout(()=>ir("sorpresa"),1100)};
function carta(){
  const p=$("#papel"); p.innerHTML="";
  D.carta.forEach((t,i)=>{ const e=document.createElement(i?"p":"h3"); e.textContent=t; if(i) e.style.animationDelay=(i*0.7)+"s"; p.appendChild(e); });
}
$("#jardin").onclick=e=>{
  const r=e.currentTarget.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top, H=r.height-y+30;
  const n=5+(Math.random()*4|0), col=PAL[Math.random()*PAL.length|0], sz=14+Math.random()*10;
  let pet=""; for(let i=0;i<n;i++) pet+=`<ellipse cx="0" cy="${-sz}" rx="${sz*.55}" ry="${sz}" fill="${col}" stroke="#fff" stroke-width="1.5" transform="rotate(${i*360/n})"/>`;
  const s=document.createElementNS("http://www.w3.org/2000/svg","svg");
  s.setAttribute("width",80); s.setAttribute("height",H); s.setAttribute("viewBox",`0 0 80 ${H}`);
  s.style.left=(x-40)+"px"; s.style.top=(y-30)+"px";
  const L=H-30, dir=Math.random()<.5?-1:1;
  s.innerHTML=`<path class="tallo" style="--l:${L*1.2}" d="M40 30 Q${40+dir*12} ${30+L/2} 40 ${H}"/>
   <ellipse class="hoja" cx="${40+dir*12}" cy="${30+L*.6}" rx="12" ry="5" transform="rotate(${-dir*25} ${40+dir*12} ${30+L*.6})"/>
   <g transform="translate(40 30)"><g class="cab">${pet}<circle r="${sz*.42}" fill="#ffe08a"/></g></g>`;
  $("#jardin").appendChild(s);
};
$("#tarta").onclick=()=>{
  const v=$$(".vela:not(.off)"); if(v.length) v[0].classList.add("off");
  if(!$$(".vela:not(.off)").length){ $("#pPastel").textContent=D.deseo; confeti(); $("#alFinal").classList.add("on"); }
};
$("#alFinal").onclick=()=>ir("final");
$("#repetir").onclick=()=>{cancelAnimationFrame(animId); finale()};
function confeti(){
  const c=$("#confeti"),x=c.getContext("2d"); c.width=innerWidth; c.height=innerHeight;
  const p=Array.from({length:130},()=>({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*14,vy:-Math.random()*14-3,c:PAL[Math.random()*5|0],s:6+Math.random()*6}));
  (function t(n){x.clearRect(0,0,c.width,c.height);p.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=.3;x.fillStyle=q.c;x.fillRect(q.x,q.y,q.s,q.s)});if(n>110)x.clearRect(0,0,c.width,c.height);else requestAnimationFrame(()=>t(n+1))})(0);
}
// animación final: letras-fuegos artificiales -> texto -> globos (colores pastel intensos para que se lean)
const TONOS=[340,262,158,22,208];
function finale(){
  const c=$("#lienzo"),x=c.getContext("2d"); c.width=innerWidth; c.height=innerHeight;
  const W=c.width,H=c.height, tam=Math.max(18,Math.min(W/11,54)), paso=tam*1.05;
  const fuente=k=>`italic 700 ${k}px Fraunces,Georgia,serif`;
  const L=[], n=D.lineas.length;
  D.lineas.forEach((ln,i)=>{
    const t=ln.split(""), ancho=t.length*paso, y=H/2+(i-(n-1)/2)*tam*1.8;
    t.forEach((ch,j)=>{ if(ch===" ")return;
      const hue=TONOS[(j+i)%5];
      L.push({ch,tx:W/2-ancho/2+j*paso+paso/2,ty:y,hue,col:`hsl(${hue},75%,72%)`,x:W/2-ancho/2+j*paso+paso/2,y:H+20,fase:"sube",d:Math.random()*90,vx:0,vy:0,b:0});
    });
  });
  const F=[]; let t0=0;
  (function bucle(){
    t0++; x.fillStyle="rgba(255,248,242,.3)"; x.fillRect(0,0,W,H);
    x.textAlign="center"; x.textBaseline="middle"; x.lineJoin="round";
    L.forEach(l=>{
      if(t0<l.d) return;
      if(l.fase==="sube"){ l.y-=(l.y-l.ty)*.045+4; x.fillStyle=l.col; x.beginPath(); x.arc(l.x,l.y,3.5,0,7); x.fill();
        if(l.y-l.ty<24){ l.fase="texto"; for(let k=0;k<22;k++){const a=Math.random()*6.28,s=Math.random()*4+1; F.push({x:l.x,y:l.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,h:l.hue,v:1})} l.t=0; } }
      else if(l.fase==="texto"){ l.t++; x.font=fuente(tam); x.lineWidth=5; x.strokeStyle="#fff"; x.strokeText(l.ch,l.x,l.y); x.fillStyle=`hsl(${l.hue},70%,68%)`; x.fillText(l.ch,l.x,l.y);
        if(l.t>260+l.d*.3){ l.fase="globo"; l.vy=-.8-Math.random()*1.2; l.vx=(Math.random()-.5)*.8; l.b=Math.random()*6; } }
      else { l.b+=.04; l.x+=l.vx+Math.sin(l.b)*.5; l.y+=l.vy;
        x.strokeStyle="#c9bde0"; x.lineWidth=1.5; x.beginPath(); x.moveTo(l.x,l.y+tam*.55); x.quadraticCurveTo(l.x+6,l.y+tam,l.x,l.y+tam*1.5); x.stroke();
        x.fillStyle=l.col; x.beginPath(); x.ellipse(l.x,l.y,tam*.42,tam*.55,0,0,7); x.fill();
        x.fillStyle="#fff"; x.font=fuente(tam*.6); x.fillText(l.ch,l.x,l.y); }
    });
    F.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.v-=.015;x.fillStyle=`hsla(${p.h},75%,70%,${Math.max(p.v,0)})`;x.fillRect(p.x,p.y,3,3)});
    for(let i=F.length-1;i>=0;i--) if(F[i].v<=0)F.splice(i,1);
    if(L.every(l=>l.fase==="globo"&&l.y<-80)){ setTimeout(()=>{ if(vistaAct==="final") finale() },900); return; }
    animId=requestAnimationFrame(bucle);
  })();
}
addEventListener("resize",()=>{ if(vistaAct==="final"){cancelAnimationFrame(animId); finale()} });
ir("inicio");
