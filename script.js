const envelope=document.getElementById('envelopeBtn'), envScreen=document.getElementById('envelope'), app=document.getElementById('app');
const pages=[...document.querySelectorAll('.page')], next=document.getElementById('next'), prev=document.getElementById('prev'), dots=document.getElementById('dots');
let i=0;
function openEnvelope(){envelope.classList.add('open');setTimeout(()=>{envScreen.classList.add('hidden');app.classList.remove('hidden');render()},1150)}
envelope.onclick=openEnvelope;envelope.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openEnvelope()};
pages.forEach((_,n)=>{const d=document.createElement('span');d.className='dot';d.onclick=()=>go(n);dots.appendChild(d)});
function render(){pages.forEach((p,n)=>p.classList.toggle('active',n===i));[...dots.children].forEach((d,n)=>d.classList.toggle('on',n===i));prev.disabled=i===0;next.disabled=i===pages.length-1}
function go(n){i=Math.max(0,Math.min(pages.length-1,n));render()}
next.onclick=()=>go(i+1);prev.onclick=()=>go(i-1);
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(Number(b.dataset.go)));
document.getElementById('cakeHit').onclick=()=>go(3);document.getElementById('cakeBtn').onclick=()=>go(3);
let sx=0;app.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});app.addEventListener('touchend',e=>{let dx=e.changedTouches[0].screenX-sx;if(Math.abs(dx)>45)dx<0?go(i+1):go(i-1)},{passive:true});
document.addEventListener('keydown',e=>{if(app.classList.contains('hidden'))return;if(e.key==='ArrowLeft')go(i+1);if(e.key==='ArrowRight')go(i-1)});
render();
