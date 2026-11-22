// Motor compartido de los productos de fechas especiales: lluvia de adornos (ilustraciones propias de arte.js), ráfagas y texto que se escribe.
(function(){const c=document.createElement("canvas");c.id="fx";document.body.prepend(c);const x=c.getContext("2d"),B=[],red=matchMedia("(prefers-reduced-motion:reduce)").matches,dpr=Math.min(devicePixelRatio||1,2);let W,H,P=[],O=[],ac=[255,255,255];
const rs=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)};rs();addEventListener("resize",rs);
const hex=s=>{s=(s||"").trim();const m=/^#?([0-9a-f]{6})$/i.exec(s);return m?[0,2,4].map(i=>parseInt(m[1].substr(i,2),16)):[255,255,255]};
const nuevo=e=>({e,x:Math.random()*W,y:Math.random()*H,v:.35+Math.random()*.9,s:16+Math.random()*20,w:Math.random()*6,d:Math.random()*2-1,a:Math.random()*6.28,g:(Math.random()-.5)*.03,z:.55+Math.random()*.45});
const dibuja=(e,px,py,s,ang,vol)=>{const im=window.Arte&&Arte.dibujable(e);if(im){x.save();x.translate(px,py);x.rotate(ang);x.scale(vol||1,1);x.drawImage(im,-s*.75,-s*.75,s*1.5,s*1.5);x.restore()}else{x.font=s+"px serif";x.fillText(e,px,py)}};
window.Fecha={
 colores(o){const s=document.documentElement.style;if(o)for(const k in o)s.setProperty("--"+k,o[k]);ac=hex(getComputedStyle(document.documentElement).getPropertyValue("--a"));O=red?[]:Array.from({length:9},()=>({x:Math.random()*W,y:Math.random()*H,r:60+Math.random()*120,vx:(Math.random()-.5)*.25,vy:-.1-Math.random()*.2,f:Math.random()*6}))},
 llover(em,n=26,sube){P=red?[]:Array.from({length:n},()=>nuevo(em[Math.floor(Math.random()*em.length)]));P.sube=sube},
 rafaga(em,px=W/2,py=H/2,n=26){for(let i=0;i<n;i++){const a=Math.random()*6.283,v=3+Math.random()*7;B.push({e:em[i%em.length],x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,s:20+Math.random()*18,l:78,a:Math.random()*6,g:(Math.random()-.5)*.3})}},
 escribir(el,t,ms=26,fin){if(red){el.textContent=t;fin&&fin();return}el.textContent="";let i=0;(function f(){el.textContent=t.slice(0,++i);if(i<t.length)setTimeout(f,ms);else fin&&fin()})()},
 vibra(n){navigator.vibrate&&navigator.vibrate(n)}
};
(function f(){x.clearRect(0,0,W,H);
for(const o of O){o.x+=o.vx;o.y+=o.vy;o.f+=.01;if(o.y<-o.r)o.y=H+o.r;if(o.x<-o.r)o.x=W+o.r;if(o.x>W+o.r)o.x=-o.r;const g=x.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r),al=.07+.04*Math.sin(o.f);g.addColorStop(0,"rgba("+ac+","+al+")");g.addColorStop(1,"rgba("+ac+",0)");x.fillStyle=g;x.beginPath();x.arc(o.x,o.y,o.r,0,6.283);x.fill()}
for(const p of P){p.y+=(P.sube?-p.v:p.v)*p.z;p.w+=.03;p.a+=p.g;p.x+=Math.sin(p.w)*.6+p.d*.2;if(p.y>H+40||p.y<-40){p.y=P.sube?H+30:-30;p.x=Math.random()*W}x.globalAlpha=.55+.4*p.z;dibuja(p.e,p.x,p.y,p.s*p.z,p.a,Math.cos(p.w*1.3))}
for(let i=B.length-1;i>=0;i--){const b=B[i];b.x+=b.vx;b.y+=b.vy;b.vy+=.25;b.vx*=.99;b.a+=b.g;b.l--;x.globalAlpha=Math.max(0,Math.min(1,b.l/45));dibuja(b.e,b.x,b.y,b.s,b.a);if(b.l<=0)B.splice(i,1)}
x.globalAlpha=1;requestAnimationFrame(f)})();})();

// Sonidos suaves generados por el navegador (sin archivos) y botón de WhatsApp. Se activan al primer toque.
(function(){let ac,mudo=false;const cx=()=>{try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume()}catch(e){}return ac};
Fecha.tono=function(hz,dur=.25,tipo="sine",vol=.12,ret=0){if(mudo)return;const a=cx();if(!a)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+ret;o.type=tipo;o.frequency.value=hz;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(a.destination);o.start(t);o.stop(t+dur+.05)};
Fecha.acorde=function(hzs,tipo="triangle"){hzs.forEach((h,i)=>Fecha.tono(h,.7,tipo,.1,i*.12))};
Fecha.mudo=function(v){mudo=v};
Fecha.boton=function(txt,fn,href){const b=document.createElement(href?"a":"button");b.className="fx-btn";b.textContent=txt;if(href){b.href=href;b.target="_blank";b.rel="noopener"}else{b.type="button";b.onclick=fn}return b};
Fecha.wa=function(num,msg){return"https://wa.me/"+num+"?text="+encodeURIComponent(msg)};
Fecha.compartir=function(txt){if(navigator.share)navigator.share({text:txt,url:location.href}).catch(()=>{});else window.open("https://wa.me/?text="+encodeURIComponent(txt+" "+location.href), "_blank", "noopener,noreferrer")};
const st=document.createElement("style");st.textContent=".fx-btn{font:inherit;font-weight:700;color:#1b1203;background:linear-gradient(180deg,color-mix(in srgb,var(--a,#fff) 70%,#fff),var(--a,#fff));border:0;border-radius:99px;padding:.8rem 1.4rem;margin:.3rem;cursor:pointer;text-decoration:none;display:inline-block;box-shadow:0 8px 24px color-mix(in srgb,var(--a,#fff) 40%,transparent),inset 0 1px 0 rgba(255,255,255,.5);animation:subir .6s both}.fx-acc{display:flex;flex-wrap:wrap;justify-content:center}";document.head.append(st);})();
