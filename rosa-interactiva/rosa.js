(function(){var d=window.DATOS;document.querySelectorAll("[data-t]").forEach(function(e){var v=d[e.getAttribute("data-t")];if(v!==undefined&&v!==null){e.textContent=v;e.style.whiteSpace="pre-line";}});if(d.titulo)document.title=d.titulo;})();

const $=id=>document.getElementById(id);
const ids=["ask","roseScreen","envelopeScreen","letterScreen"];
function show(id){ids.forEach(x=>$(x).classList.toggle("active",x===id));window.scrollTo({top:0,behavior:"smooth"});}
function decorate(){
 const box=$("decor"), symbols=["♡","♥","✧","🌸"];
 for(let i=0;i<23;i++){const e=document.createElement("span");e.className="heart";e.textContent=symbols[Math.floor(Math.random()*symbols.length)];e.style.left=Math.random()*100+"%";e.style.fontSize=(12+Math.random()*15)+"px";e.style.animationDuration=(9+Math.random()*12)+"s";e.style.animationDelay=(-Math.random()*15)+"s";box.appendChild(e);}
}
function growRose(){const r=$("roseArea");r.classList.remove("bloomed");void r.offsetWidth;r.classList.add("bloomed");}
function fallingPetals(){const box=$("decor");for(let i=0;i<18;i++){const e=document.createElement("span");e.textContent=["🌸","💗","🌷","✦"][i%4];e.style.position="absolute";e.style.left=Math.random()*100+"%";e.style.top="-30px";e.style.fontSize=(14+Math.random()*9)+"px";e.style.animation=`falling ${4+Math.random()*4}s linear forwards`;box.appendChild(e);setTimeout(()=>e.remove(),8500);} }
const style=document.createElement("style");style.textContent="@keyframes falling{to{transform:translateY(110vh) rotate(480deg);opacity:0}}";document.head.appendChild(style);
$("yes").addEventListener("click",()=>{show("roseScreen");growRose();fallingPetals();});
const no=$("no");
function moveNo(){
 const row=$("choiceRow"), rect=row.getBoundingClientRect(), b=no.getBoundingClientRect();
 const maxX=Math.max(0,Math.min(100,window.innerWidth-b.width-24));
 const x=Math.max(12,Math.min(maxX,Math.random()*maxX));
 const y=(Math.random()-.5)*28;
 no.style.position="relative";no.style.left=(x-(rect.left+(rect.width-b.width)/2))+"px";no.style.transform=`translateY(${y}px)`;
 $("askNote").textContent=DATOS.frasesNo[Math.floor(Math.random()*3)];
}
no.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse")moveNo();});
no.addEventListener("click",moveNo);
$("surprise").addEventListener("click",()=>show("envelopeScreen"));
$("envelope").addEventListener("click",()=>{
 $("envelope").classList.add("open");$("envelopeHint").textContent=DATOS.abriendo;
 setTimeout(()=>{show("letterScreen");$("letterBody").textContent=letter;},650);
});
$("backRose").addEventListener("click",()=>{show("roseScreen");growRose();});
$("backToRose").addEventListener("click",()=>{show("roseScreen");growRose();});
decorate();
const letter = DATOS.carta;
