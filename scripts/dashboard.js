// Simple mock data -- replace with real API/auth-backed data as needed
const mockData = {
  user: {
    name: 'Jane Doe',
    points: 360,
    pointsTarget: 1000,
  },
  courses: [
    { id: 'c1', title: 'Intro to HTML & CSS', completion: 100, skills: ['HTML','CSS'], certificate: true },
    { id: 'c2', title: 'JavaScript Basics', completion: 78, skills: ['JavaScript'], certificate: false },
    { id: 'c3', title: 'Business Fundamentals', completion: 45, skills: ['Business'], certificate: false },
  ],
  skills: [
    { name: 'HTML', level: 'Intermediate', acquiredOn: '2025-03-10' },
    { name: 'CSS', level: 'Intermediate', acquiredOn: '2025-04-05' },
    { name: 'JavaScript', level: 'Beginner', acquiredOn: null },
  ],
  leaderboard: {
    web: [ {name:'Alice', points:1200}, {name:'Bob', points:980}, {name:'You', points:360}],
    design: [ {name:'Eve', points:820}, {name:'Mallory', points:740}, {name:'You', points:340}],
    business: [ {name:'Trent', points:630}, {name:'Oscar', points:540}, {name:'You', points:360}],
  }
};

function formatPercent(n){ return Math.round(n) + '%'; }

// Animate a progress-fill element from 0 to target percent (0-100)
function animateProgressBar(el, targetPct, duration = 800){
  if(!el) return;
  targetPct = Math.min(Math.max(0, targetPct), 100);
  el.style.width = '0%';
  const start = performance.now();
  function tick(now){
    const t = Math.min(1, (now - start) / duration);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3);
    const current = Math.round(eased * targetPct * 100) / 100;
    el.style.width = current + '%';
    if(t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderOverview(){
  const totalCourses = mockData.courses.length;
  const overallCompletion = Math.round((mockData.courses.reduce((s,c)=>s+c.completion,0) / (totalCourses||1)));
  const skillsCount = mockData.skills.filter(s=>s.acquiredOn).length;
  const certsCount = mockData.courses.filter(c=>c.certificate).length;

  document.getElementById('totalCourses').textContent = totalCourses;
  document.getElementById('overallCompletion').textContent = formatPercent(overallCompletion);
  document.getElementById('skillsCount').textContent = skillsCount;
  document.getElementById('certsCount').textContent = certsCount;

  document.getElementById('pointsValue').textContent = mockData.user.points;
  document.getElementById('pointsTarget').textContent = mockData.user.pointsTarget;
  const pct = Math.round((mockData.user.points / mockData.user.pointsTarget) * 100);
  const pointsFill = document.getElementById('pointsProgress');
  if(pointsFill){
    animateProgressBar(pointsFill, Math.min(pct,100), 1200);
  }
}

// create a reusable modal overlay
function showModal(title, message){
  // remove any existing
  const existing = document.getElementById('dashboardModal');
  if(existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'dashboardModal';
  overlay.innerHTML = `
    <div class="modal-backdrop" aria-hidden="false">
      <div class="modal-card">
        <button class="modal-close" aria-label="Close">×</button>
        <h3>${title}</h3>
        <div class="modal-body">${message}</div>
        <div style="text-align:right;margin-top:18px;"><button class="modal-ok">OK</button></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  function cleanup(){ overlay.remove(); }
  overlay.querySelector('.modal-close').addEventListener('click', cleanup);
  overlay.querySelector('.modal-ok').addEventListener('click', cleanup);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) cleanup(); });
}

function renderCourses(){
  const ul = document.getElementById('coursesList');
  ul.innerHTML = '';
  mockData.courses.forEach(course=>{
    const li = document.createElement('li');
    li.className = 'course-item';
    const certHtml = `<span class="badge cert-badge" data-course="${course.id}" data-completion="${course.completion}" data-certified="${course.certificate}">${course.certificate? 'Certificate' : 'Certificate'}</span>`;
    li.innerHTML = `
      <div class="course-meta">
        <div class="course-title">${course.title}</div>
        <div class="course-progress">
          <div class="progress">
            <div class="progress-fill" data-target="${course.completion}" style="width:0%"></div>
          </div>
          <div style="margin-top:6px;font-size:0.85rem;color:var(--muted)">Completion: <span class="completion-text">${course.completion}%</span></div>
        </div>
      </div>
      <div style="min-width:120px;text-align:right">
        ${certHtml}
      </div>
    `;
    ul.appendChild(li);
    // animate the course progress bar
    const fill = li.querySelector('.progress-fill');
    const target = Number(fill.dataset.target || 0);
    // varied duration so bars animate asynchronously
    animateProgressBar(fill, target, 700 + target * 8);
  });

  // attach click handlers for certificate badges (delegation)
  ul.querySelectorAll('.cert-badge').forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const certified = btn.dataset.certified === 'true';
      const completion = Number(btn.dataset.completion || 0);
      if(certified){
        showModal('Certificate', `You have already earned the certificate for this course.\nCompletion: ${completion}%`);
      } else {
        if(completion >= 100){
          showModal('Certificate Available', 'Congratulations — you have completed the course! The certificate will be issued shortly.');
        } else {
          showModal('Certificate Locked', `You must complete the course to get certified. Current completion: ${completion}%. Keep going!`);
        }
      }
    });
  });
}

function renderSkills(){
  const container = document.getElementById('skillsList');
  container.innerHTML = '';
  mockData.skills.forEach(s=>{
    const div = document.createElement('div');
    div.className = 'skill-chip';
    const acquired = s.acquiredOn ? `<small>${s.level}</small>` : `<small style="color:#ffb3b3">In Progress</small>`;
    div.innerHTML = `
      <div>
        <div style="font-weight:700">${s.name}</div>
        ${acquired}
      </div>
      <div class="badges">
        ${s.acquiredOn?'<span class="badge">Acquired</span>':''}
        ${(!s.acquiredOn && Math.random()>0.7)?'<span class="badge">Progress Milestone</span>':''}
      </div>
    `;
    container.appendChild(div);
  });
}

function renderLeaderboard(skill='web'){
  const list = document.getElementById('leaderboardList');
  list.innerHTML = '';
  const items = mockData.leaderboard[skill] || [];
  items.forEach((it, idx)=>{
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>${idx+1}. ${it.name}</strong></div><div>${it.points} pts</div>`;
    list.appendChild(li);
  });
}

function wireTabs(){
  document.querySelectorAll('.leaderboard-tabs .tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.leaderboard-tabs .tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderLeaderboard(btn.dataset.skill);
    });
  });
}

// Award simple milestone badge if completed first skill
function awardBadges(){
  const firstCompleted = mockData.courses.find(c=>c.completion>=100);
  if(firstCompleted){
    const skillsContainer = document.getElementById('skillsList');
    const toast = document.createElement('div');
    toast.className = 'badge special';
    toast.style.marginBottom = '8px';
    toast.textContent = 'Completed First Skill';
    skillsContainer.insertBefore(toast, skillsContainer.firstChild);
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', ()=>{
  renderOverview();
  renderCourses();
  renderSkills();
  renderLeaderboard();
  wireTabs();
  awardBadges();
});
