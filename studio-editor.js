const formats={
  thumbnail:{label:'YOUTUBE THUMBNAIL',dimensions:'1280 × 720',viewBox:'0 0 1280 720',width:1280,height:720,headline:'BIG IDEAS\nSTART HERE',subtitle:'MAKE YOUR NEXT IDEA COUNT',badge:'NEW VIDEO',size:100,align:'left',templates:[{name:'Impact',style:'impact',accent:'#a9f5e2'},{name:'Glow',style:'glow',accent:'#ff785e'},{name:'Editorial',style:'editorial',accent:'#a78bfa'}]},
  poster:{label:'EVENT POSTER',dimensions:'600 × 800',viewBox:'0 0 600 800',width:600,height:800,headline:'CULTURE\nAFTER DARK',subtitle:'CITY SUMMER SESSIONS',badge:'FRIDAY · 8PM',size:100,align:'left',templates:[{name:'Showtime',style:'impact',accent:'#ffe36c'},{name:'After hours',style:'glow',accent:'#ff785e'},{name:'Gallery',style:'editorial',accent:'#a9f5e2'}]}
};

const drafts=Object.fromEntries(Object.entries(formats).map(([key,format])=>[key,{headline:format.headline,subtitle:format.subtitle,badge:format.badge,showBadge:true,size:format.size,align:format.align,template:format.templates[0].style,accent:format.templates[0].accent}]));
let activeFormat='thumbnail';
const svg=document.querySelector('#designCanvas');
const fields={headline:document.querySelector('#headlineInput'),subtitle:document.querySelector('#subtitleInput'),badge:document.querySelector('#badgeInput'),showBadge:document.querySelector('#showBadge'),accent:document.querySelector('#accentInput'),size:document.querySelector('#sizeInput'),align:document.querySelector('#alignInput')};

function escapeXml(value){return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');}
function wrapLines(value,maxLength){
  const result=[];
  String(value).split('\n').forEach(paragraph=>{
    const words=paragraph.trim().split(/\s+/).filter(Boolean);
    if(!words.length){result.push('');return;}
    let line='';
    words.forEach(word=>{
      if(line&&`${line} ${word}`.length>maxLength){result.push(line);line=word;}
      else line=line?`${line} ${word}`:word;
    });
    result.push(line);
  });
  return result.slice(0,5);
}
function renderTemplates(){
  const list=document.querySelector('#templateOptions');
  list.replaceChildren();
  formats[activeFormat].templates.forEach(template=>{
    const button=document.createElement('button');
    button.type='button';button.className=`template-option ${drafts[activeFormat].template===template.style?'active':''}`;
    button.setAttribute('aria-pressed',String(drafts[activeFormat].template===template.style));
    button.innerHTML=`<span class="template-swatch" style="--template-accent:${template.accent}"></span><strong>${template.name}</strong>`;
    button.addEventListener('click',()=>{
      drafts[activeFormat].template=template.style;
      drafts[activeFormat].accent=template.accent;
      fields.accent.value=template.accent;
      renderTemplates();renderDesign();
    });
    list.append(button);
  });
}
function syncFields(){
  const draft=drafts[activeFormat];
  fields.headline.value=draft.headline;fields.subtitle.value=draft.subtitle;fields.badge.value=draft.badge;
  fields.showBadge.checked=draft.showBadge;fields.accent.value=draft.accent;fields.size.value=draft.size;fields.align.value=draft.align;
  document.querySelector('#accentValue').textContent=draft.accent.toUpperCase();
  document.querySelector('#sizeOutput').value=`${draft.size}%`;
}
function renderDesign(){
  const draft=drafts[activeFormat],format=formats[activeFormat],{width,height}=format;
  const poster=activeFormat==='poster',margin=poster?54:70,center=draft.align==='center';
  const maxChars=poster?10:13,lines=wrapLines(draft.headline,maxChars);
  const fontSize=(poster?width*.116:width*.118)*(draft.size/100);
  const titleX=center?width/2:margin,textAnchor=center?'middle':'start';
  const titleY=poster?height*.49:height*.56,lineGap=fontSize*.92;
  const title=lines.map((line,index)=>`<tspan x="${titleX}" dy="${index===0?0:lineGap}" fill="${index===0?draft.accent:'#ffffff'}">${escapeXml(line.toUpperCase())}</tspan>`).join('');
  const preset=draft.template;
  let shapes='';
  if(preset==='impact')shapes=poster?`<path d="M${width*.59} 0h${width*.41}v${height*.55}L${width*.72} ${height*.68} ${width*.59} ${height*.55}Z" fill="${draft.accent}" opacity=".9"/><circle cx="${width*.79}" cy="${height*.36}" r="${height*.12}" fill="#fff" opacity=".83"/>`:`<path d="M${width*.61} 0h${width*.39}v${height}H${width*.61}Z" fill="${draft.accent}" opacity=".9"/><circle cx="${width*.78}" cy="${height*.47}" r="${height*.21}" fill="#fff" opacity=".82"/><path d="M0 ${height*.85}L${width*.22} ${height*.73}L${width*.44} ${height}H0Z" fill="#ff785e"/>`;
  else if(preset==='glow')shapes=`<circle cx="${width*.76}" cy="${height*.36}" r="${Math.min(width,height)*.28}" fill="${draft.accent}" opacity=".78"/><circle cx="${width*.76}" cy="${height*.36}" r="${Math.min(width,height)*.17}" fill="#fff" opacity=".52"/><path d="M${width*.52} ${height*.8}Q${width*.74} ${height*.45} ${width} ${height*.76}V${height}H${width*.52}Z" fill="${draft.accent}" opacity=".4"/>`;
  else shapes=`<path d="M${width*.64} 0H${width}V${height}H${width*.64}Z" fill="#f4f2ed" opacity=".12"/><path d="M${width*.71} 0H${width*.74}V${height}H${width*.71}Z" fill="${draft.accent}"/><rect x="${width*.8}" y="${height*.17}" width="${width*.15}" height="${height*.2}" rx="${width*.075}" fill="${draft.accent}" opacity=".76"/>`;
  const badge=draft.showBadge&&draft.badge.trim()?`<g><rect x="${margin}" y="${poster?height*.11:height*.12}" width="${Math.min(width*.48,Math.max(140,draft.badge.length*(poster?13:16)+42))}" height="${poster?42:48}" rx="4" fill="${draft.accent}"/><text x="${margin+17}" y="${(poster?height*.11:height*.12)+(poster?27:31)}" fill="#09111e" font-family="Arial,sans-serif" font-size="${poster?16:18}" font-weight="700" letter-spacing="1">${escapeXml(draft.badge.toUpperCase())}</text></g>`:'';
  const subtitleY=titleY+(lines.length-1)*lineGap+fontSize*.8+32;
  const subtitle= draft.subtitle.trim()?`<text x="${titleX}" y="${subtitleY}" text-anchor="${textAnchor}" fill="#f3f2ed" font-family="Arial,sans-serif" font-size="${poster?18:22}" font-weight="600" letter-spacing="${poster?2:3}">${escapeXml(draft.subtitle.toUpperCase())}</text>`:'';
  const detail=poster?`<text x="${margin}" y="${height*.93}" fill="#dbe5ed" font-family="Arial,sans-serif" font-size="13" letter-spacing="3">SIGNAL STUDIO  /  ORIGINAL ARTWORK</text>`:`<text x="${margin}" y="${height*.94}" fill="#dbe5ed" font-family="Arial,sans-serif" font-size="14" letter-spacing="3">SIGNAL STUDIO  /  CREATOR SERIES</text>`;
  svg.setAttribute('viewBox',format.viewBox);svg.setAttribute('aria-label',`Live ${formats[activeFormat].label.toLowerCase()} preview`);
  svg.innerHTML=`<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#182238"/><stop offset="1" stop-color="#090e19"/></linearGradient><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" opacity=".12"/></pattern></defs><rect width="${width}" height="${height}" fill="url(#bg)"/>${shapes}<rect width="${width}" height="${height}" fill="url(#dots)"/><path d="M0 ${height*.78}Q${width*.3} ${height*.65} ${width*.54} ${height*.81}T${width} ${height*.72}V${height}H0Z" fill="#080c14" opacity=".65"/><text x="${margin}" y="${poster?height*.065:height*.075}" fill="#fff" opacity=".88" font-family="Arial,sans-serif" font-size="${poster?13:16}" font-weight="700" letter-spacing="4">SIGNAL STUDIO</text>${badge}<text x="${titleX}" y="${titleY}" text-anchor="${textAnchor}" font-family="Arial Black,Arial,sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="-4">${title}</text>${subtitle}${detail}`;
  document.querySelector('#canvasFormat').textContent=format.label;
  document.querySelector('#canvasDimensions').textContent=format.dimensions;
  document.querySelector('#canvasFrame').classList.toggle('poster-format',poster);
  document.querySelector('#canvasTitle').textContent=lines.join(' ').trim()||`Untitled ${poster?'poster':'thumbnail'}`;
}
function switchFormat(format){
  activeFormat=format;
  document.querySelectorAll('.format-tab').forEach(tab=>{
    const active=tab.dataset.format===format;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));
  });
  syncFields();renderTemplates();renderDesign();
}

document.querySelectorAll('.format-tab').forEach(tab=>tab.addEventListener('click',()=>switchFormat(tab.dataset.format)));
fields.headline.addEventListener('input',()=>{drafts[activeFormat].headline=fields.headline.value;renderDesign();});
fields.subtitle.addEventListener('input',()=>{drafts[activeFormat].subtitle=fields.subtitle.value;renderDesign();});
fields.badge.addEventListener('input',()=>{drafts[activeFormat].badge=fields.badge.value;renderDesign();});
fields.showBadge.addEventListener('change',()=>{drafts[activeFormat].showBadge=fields.showBadge.checked;renderDesign();});
fields.accent.addEventListener('input',()=>{drafts[activeFormat].accent=fields.accent.value;document.querySelector('#accentValue').textContent=fields.accent.value.toUpperCase();renderDesign();});
fields.size.addEventListener('input',()=>{drafts[activeFormat].size=Number(fields.size.value);document.querySelector('#sizeOutput').value=`${fields.size.value}%`;renderDesign();});
fields.align.addEventListener('change',()=>{drafts[activeFormat].align=fields.align.value;renderDesign();});
document.querySelectorAll('.swatch').forEach(button=>button.addEventListener('click',()=>{fields.accent.value=button.dataset.color;fields.accent.dispatchEvent(new Event('input',{bubbles:true}));}));
document.querySelector('#resetButton').addEventListener('click',()=>{
  const format=formats[activeFormat];
  drafts[activeFormat]={headline:format.headline,subtitle:format.subtitle,badge:format.badge,showBadge:true,size:format.size,align:format.align,template:format.templates[0].style,accent:format.templates[0].accent};
  syncFields();renderTemplates();renderDesign();
});
document.querySelector('#exportButton').addEventListener('click',()=>{
  const source=`<?xml version="1.0" encoding="UTF-8"?>\n${svg.outerHTML}`;
  const blob=new Blob([source],{type:'image/svg+xml;charset=utf-8'});
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  const slug=(document.querySelector('#canvasTitle').textContent||activeFormat).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  link.href=url;link.download=`signal-studio-${slug||activeFormat}.svg`;document.body.append(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
});

syncFields();renderTemplates();renderDesign();
