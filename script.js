(function(){
var root=document.documentElement,size=100;
function setSize(n){size=Math.max(80,Math.min(160,n));root.style.fontSize=size+"%"}
document.getElementById("bigger").onclick=function(){setSize(size+10)};
document.getElementById("smaller").onclick=function(){setSize(size-10)};
var c=document.getElementById("contrast");
c.onclick=function(){var on=root.dataset.theme!=="contrast";root.dataset.theme=on?"contrast":"";c.setAttribute("aria-pressed",on)};

var links=document.querySelectorAll("nav a");
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id)})}})},{rootMargin:"-30% 0px -60% 0px"});
document.querySelectorAll("main>section").forEach(function(s){io.observe(s)});

var au=document.getElementById("lesson"),st=document.getElementById("astatus");
document.getElementById("play").onclick=function(){au.play();st.textContent="Playing the audio lesson."};
document.getElementById("stop").onclick=function(){au.pause();au.currentTime=0;st.textContent="Audio stopped."};
au.onended=function(){st.textContent="Audio finished."};

var qs=document.querySelectorAll(".q"),score=document.getElementById("score");
document.getElementById("check").onclick=function(){
var right=0,unanswered=0;
qs.forEach(function(q,i){
var sel=q.querySelector("input:checked");q.classList.remove("ok","bad");
if(!sel){unanswered++;return}
if(sel.value===q.dataset.a){right++;q.classList.add("ok")}else q.classList.add("bad")});
score.textContent=unanswered?"Please answer all questions.":"Your score: "+right+" / "+qs.length+(right===qs.length?" — Excellent!":" — Review the notes and try again.")};
document.getElementById("again").onclick=function(){
document.querySelectorAll(".q input").forEach(function(i){i.checked=false});
qs.forEach(function(q){q.classList.remove("ok","bad")});score.textContent=""};
})();
