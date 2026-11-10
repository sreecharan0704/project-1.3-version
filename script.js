const projects = [
  {title:'Survive 100 Days Trapped, Win $500,000',category:'thumbnail',type:'YouTube video · MrBeast',videoId:'9RhWXPcKBI8',palette:['#f45b3c','#f7bc5a','#242044'],words:[]},
  {title:'Future / Form',category:'poster',type:'Design conference',palette:['#b2f2df','#5664a5','#18263c'],words:['FUTURE','/ FORM','2026']},
  {title:'Beat Neymar, Win $500,000',category:'thumbnail',type:'YouTube video · MrBeast',videoId:'DZIASl9q90s',palette:['#6251d2','#e76864','#16152f'],words:[]},
  {title:'Night Bloom',category:'poster',type:'Culture festival',palette:['#f287a4','#f7bd6e','#312459'],words:['NIGHT','BLOOM','AFTER DARK']},
  {title:'Survive 100 Days In Circle, Win $500,000',category:'thumbnail',type:'YouTube video · MrBeast',videoId:'gHzuabZUd6c',palette:['#f0cd76','#d96245','#283e38'],words:[]},
  {title:'Soft Focus',category:'poster',type:'Independent film',palette:['#bdd6ee','#e398a8','#242d49'],words:['SOFT','FOCUS','A FILM BY US']},
  {title:'Beat Professional Athlete, Win $100,000',category:'thumbnail',type:'YouTube video · MrBeast',videoId:'_c2e1NcI3Sc',palette:['#fa674e','#f0c4a0','#1b2434'],words:[]},
  {title:'Open Air',category:'poster',type:'Summer sessions',palette:['#f5a152','#f6d779','#354e58'],words:['OPEN','AIR','MUSIC / SUN / YOU']},
  {title:'How I Trapped 100 People In 100 Circles',category:'thumbnail',type:'YouTube video · MrBeast 2',videoId:'k5-qWiy5IR0',palette:['#ae91f5','#c2f0dd','#24203d'],words:[]},
  {title:'Good Energy',category:'poster',type:'Community event',palette:['#b6e9a2','#e8e275','#34573b'],words:['GOOD','ENERGY','PEOPLE • MUSIC']},
  {title:'I Survived 100 Days In Realistic Minecraft',category:'thumbnail',type:'YouTube video · MrBeast Gaming',videoId:'5F5MKI_jXJw',palette:['#80cce8','#ef8d72','#1b273e'],words:[]},
  {title:'Somewhere Soon',category:'poster',type:'Travel journal',palette:['#f3aa71','#dfa5cf','#342944'],words:['SOMEWHERE','SOON','ISSUE NO. 1']}
];

function makeArtwork(project,index){
  if(project.category==='thumbnail') return `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
  const poster=project.category==='poster', width=poster?600:1200, height=poster?800:675;
  const [a,b,c]=project.palette, seed=index+1, shape=seed%4;
  const focal=shape===0?`<circle cx="${width*.79}" cy="${height*.32}" r="${height*.23}" fill="${b}"/><circle cx="${width*.79}" cy="${height*.32}" r="${height*.15}" fill="${a}"/>`:shape===1?`<path d="M ${width*.52} ${height*1.1} L ${width*.75} ${height*.1} L ${width*1.03} ${height*1.1} Z" fill="${b}"/><circle cx="${width*.76}" cy="${height*.43}" r="${height*.12}" fill="${a}"/>`:shape===2?`<circle cx="${width*.77}" cy="${height*.48}" r="${height*.27}" fill="${b}"/><path d="M ${width*.55} ${height*.62} Q ${width*.77} ${height*.1} ${width*.99} ${height*.62} Q ${width*.77} ${height*.94} ${width*.55} ${height*.62}" fill="${a}"/>`:`<rect x="${width*.62}" y="${height*.16}" width="${width*.32}" height="${height*.57}" rx="${height*.16}" fill="${b}" transform="rotate(12 ${width*.78} ${height*.44})"/><circle cx="${width*.78}" cy="${height*.4}" r="${height*.1}" fill="${a}"/>`;
  const words=project.words.map((word,i)=>`<text x="${width*.075}" y="${height*(poster?.48:.57)+i*(poster?height*.105:height*.13)}" fill="${i===1?'#fff':a}" font-family="Arial,sans-serif" font-size="${poster?height*.105:height*.14}" font-weight="900" letter-spacing="-5">${word.replaceAll('&','&amp;').replaceAll('<','&lt;')}</text>`).join('');
  const art=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><defs><linearGradient id="g" x2=".9" y2="1"><stop stop-color="${c}"/><stop offset="1" stop-color="#101421"/></linearGradient><pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" opacity=".12"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/>${focal}<rect width="100%" height="100%" fill="url(#p)"/><path d="M0 ${height*.86} Q ${width*.25} ${height*.7} ${width*.52} ${height*.93} T ${width} ${height*.76} V${height} H0Z" fill="#090d18" opacity=".66"/><text x="${width*.075}" y="${height*.13}" fill="#fff" font-family="Arial,sans-serif" font-size="${poster?20:22}" font-weight="700" letter-spacing="5">SIGNAL STUDIO   /   ${String(seed).padStart(2,'0')}</text>${words}<text x="${width*.075}" y="${height*.94}" fill="#fff" font-family="Arial,sans-serif" font-size="${poster?15:17}" letter-spacing="3">${project.type.toUpperCase()}  —  ${2024+index%3}</text><circle cx="${width*.93}" cy="${height*.92}" r="${poster?22:28}" fill="${a}"/><path d="M${width*.92} ${height*.92}h${poster?20:25}m-10 -10 10 10 -10 10" stroke="#101421" stroke-width="3" fill="none"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(art)}`;
}

const grid=document.querySelector('#portfolioGrid');
const allLayout=document.querySelector('#portfolioAllLayout');
function makeCard(project,index){
  const col=document.createElement('div'); col.className='col-6 col-lg-4 portfolio-col'; col.dataset.category=project.category;
  const image=makeArtwork(project,index);
  const thumbnailCopy=project.category==='thumbnail'?'<span class="youtube-reference">YOUTUBE REFERENCE</span>':'';
  const alt=project.category==='poster'?`Original poster artwork: ${project.title}`:`YouTube thumbnail: ${project.title}`;
  col.innerHTML=`<button class="portfolio-item ${project.category}" type="button" data-index="${index}" aria-label="View ${project.title}, ${project.type}"><span class="portfolio-visual"><img class="portfolio-image" src="${image}" alt="${alt}" loading="lazy">${thumbnailCopy}</span><span class="portfolio-caption"><strong>${project.title}</strong><span>${project.category==='poster'?'POSTER':'YOUTUBE'} ↗</span></span></button>`;
  return col;
}
function addLoopCopies(track){
  Array.from(track.children).forEach(column=>{
    const copy=column.cloneNode(true);
    copy.dataset.loopCopy='true';
    copy.setAttribute('aria-hidden','true');
    copy.querySelectorAll('button').forEach(button=>button.tabIndex=-1);
    track.append(copy);
  });
}
projects.forEach((project,index)=>grid.append(makeCard(project,index)));
document.querySelectorAll('[data-gallery-track]').forEach(track=>{
  projects.forEach((project,index)=>{
    if(project.category===track.dataset.category)track.append(makeCard(project,index));
  });
  addLoopCopies(track);
});
addLoopCopies(grid);

const viewport=document.querySelector('#portfolioViewport');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function setupGallery(viewport,track){
  let galleryPaused=false,lastFrame=0;
  function moveGallery(timestamp){
    if(lastFrame&&!galleryPaused&&!reducedMotion){
      const elapsed=Math.min(timestamp-lastFrame,40);
      const loopLength=track.scrollWidth/2;
      if(loopLength>viewport.clientWidth){
        viewport.scrollLeft+=elapsed*.048;
        if(viewport.scrollLeft>=loopLength)viewport.scrollLeft-=loopLength;
      }
    }
    lastFrame=timestamp;
    requestAnimationFrame(moveGallery);
  }
  requestAnimationFrame(moveGallery);
  viewport.addEventListener('pointerenter',()=>{galleryPaused=true;});
  viewport.addEventListener('pointerleave',()=>{galleryPaused=false;});
  viewport.addEventListener('focusin',()=>{galleryPaused=true;});
  viewport.addEventListener('focusout',event=>{if(!viewport.contains(event.relatedTarget))galleryPaused=false;});
  viewport.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
      event.preventDefault();
      viewport.scrollBy({left:event.key==='ArrowRight'?280:-280,behavior:'smooth'});
    }
  });
}
document.querySelectorAll('[data-gallery-viewport]').forEach(view=>setupGallery(view,view.querySelector('[data-gallery-track]')));
setupGallery(viewport,grid);

document.querySelectorAll('.filter-btn').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('.filter-btn').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  allLayout.hidden=filter!=='all';
  viewport.hidden=filter==='all';
  document.querySelectorAll('[data-gallery-viewport],#portfolioViewport').forEach(view=>{view.scrollLeft=0;});
  document.querySelectorAll('#portfolioGrid .portfolio-col').forEach(col=>{col.hidden=filter==='all'||col.dataset.category!==filter;});
  document.querySelector('.work-count').textContent=`${filter==='all'?'12':filter==='poster'?'06':'06'} PROJECTS / 2024—26`;
}));

const modalElement=document.querySelector('#artworkModal');
const artworkModal=window.bootstrap?bootstrap.Modal.getOrCreateInstance(modalElement):null;
document.querySelector('#work').addEventListener('click',event=>{
  const button=event.target.closest('.portfolio-item'); if(!button)return;
  const index=Number(button.dataset.index),project=projects[index];
  document.querySelector('#modalImage').src=makeArtwork(project,index);
  document.querySelector('#modalImage').alt=`${project.title} — ${project.type}`;
  document.querySelector('#modalImage').closest('.modal-art-wrap').classList.remove('thumbnail-preview');
  document.querySelector('#modalPreviewTitle').textContent='';
  document.querySelector('#modalCategory').textContent=`${String(index+1).padStart(2,'0')} — ${project.category==='poster'?'POSTER DESIGN':'THUMBNAIL DESIGN'}`;
  document.querySelector('#modalTitle').textContent=project.title;
  document.querySelector('#modalDescription').textContent=project.category==='thumbnail'?`${project.type}. This is a selected YouTube thumbnail reference; use the source link to watch the video.`:`${project.type}. An original Signal Studio poster concept.`;
  const sourceLink=document.querySelector('#modalSource');
  sourceLink.hidden=project.category!=='thumbnail';
  if(project.category==='thumbnail')sourceLink.href=`https://www.youtube.com/watch?v=${project.videoId}`;
  document.querySelector('#modalIndex').textContent=`SIGNAL STUDIO  /  ${project.category.toUpperCase()}  /  2024—26`;
  artworkModal?.show();
});

document.querySelectorAll('#mobileNav a').forEach(link=>link.addEventListener('click',()=>{
  const menu=document.querySelector('#mobileNav');
  if(menu.classList.contains('show'))window.bootstrap?.Collapse.getOrCreateInstance(menu).hide();
}));

document.querySelectorAll('.nav-links a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
  document.querySelectorAll('.nav-links a').forEach(item=>{
    const active=item===link;
    item.classList.toggle('is-active',active);
    if(active)item.setAttribute('aria-current','location');
    else item.removeAttribute('aria-current');
  });
}));
