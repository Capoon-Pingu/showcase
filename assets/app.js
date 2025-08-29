// Simple data-driven loader + procedural background


// projects page grid
const projectsGrid = document.getElementById('projectsGrid');
if(projectsGrid && data.projects){
projectsGrid.innerHTML = '';
data.projects.forEach(proj=>{
const el = document.createElement('article'); el.className='project glass';
el.innerHTML = `<h4>${proj.title}</h4><div class='meta'>${proj.tech || ''} • ${proj.year || ''}</div><p>${proj.desc || ''}</p><p><a class='btn' href='${proj.link||"#"}' target='_blank'>View</a></p>`;
projectsGrid.appendChild(el);
});
}


// achievements
const achList = document.getElementById('achievementsList');
if(achList && data.achievements){
achList.innerHTML = '';
data.achievements.forEach(a=>{const li=document.createElement('li');li.textContent=`${a.title}${a.org?` — ${a.org}`:''}${a.year?` (${a.year})`:''}`;achList.appendChild(li)});
}


// contact details
const contactInfo = document.getElementById('contactInfo');
if(contactInfo && data.contact){
contactInfo.innerHTML = `Email: <a href='mailto:${data.contact.email}'>${data.contact.email}</a><br>LinkedIn: ${data.contact.linkedin||'—'}`;
}


// ---- Procedural background (lightweight particle field) ----
const canvas = document.getElementById('bg-canvas');
if(!canvas) return;
const ctx = canvas.getContext('2d');
let w=canvas.width=innerWidth, h=canvas.height=innerHeight;
window.addEventListener('resize',()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight});


const particles = [];
const PARTICLE_COUNT = Math.min(120, Math.floor((w*h)/12000));
for(let i=0;i<PARTICLE_COUNT;i++)particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,size:1+Math.random()*2});


function step(){
ctx.clearRect(0,0,w,h);
// subtle radial gradient
const g = ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'rgba(10,20,40,0.2)'); g.addColorStop(1,'rgba(0,6,12,0.45)');
ctx.fillStyle = g; ctx.fillRect(0,0,w,h);


for(let p of particles){
// move
p.x += p.vx; p.y += p.vy;
// wrap
if(p.x>w) p.x=0; if(p.x<0) p.x=w; if(p.y>h) p.y=0; if(p.y<0) p.y=h;
// draw connection lines
for(let q of particles){
const dx=p.x-q.x, dy=p.y-q.y; const d=dx*dx+dy*dy;
if(d<10000){
ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle = 'rgba(130,190,255,'+ (0.02*Math.max(0,1 - d/10000)) +')'; ctx.lineWidth=0.6; ctx.stroke();
}
}
// draw particle
ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle='rgba(180,210,255,0.6)'; ctx.fill();
}


requestAnimationFrame(step);
}
step();


})();
