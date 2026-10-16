(function(){
'use strict';
const lang=document.documentElement.lang.startsWith('en')?'en':'fr';
const entries=(window.SITE_NEWS||[]).filter(x=>x&&x.status!=='deleted').sort((a,b)=>b.date.localeCompare(a.date));
const active=entries.filter(x=>x.status==='featured').slice(0,6);
const archived=entries.filter(x=>x.status==='archive').concat(entries.filter(x=>x.status==='featured').slice(6));
const carousel=document.getElementById('news-carousel'),archive=document.getElementById('news-archive');if(!carousel)return;
const prev=document.getElementById('news-prev'),next=document.getElementById('news-next'),toggle=document.getElementById('news-toggle'),tools=document.getElementById('news-tools');
let cursor=0,paused=false,hovered=false,focused=false,timer=null;
// Ne pas bloquer automatiquement l'animation parce que le pointeur se trouve déjà sur les cartes lors du chargement.
let pointerMoved=false;
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
function count(){return window.matchMedia('(max-width:560px)').matches?1:window.matchMedia('(max-width:820px)').matches?2:3;}
function element(tag,cls,txt){const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el;}
function makeCard(item){const a=element('a','card');a.href=(lang==='en'?'../':'')+'articles/'+(lang==='en'&&(item.art_en||item.art)?(item.art_en||item.art):item.art)+'.html';const visual=element('div','visual '+(item.style||'forest'));visual.append(element('span','visual-label',lang==='fr'?'RECHERCHE EN CLAIR':'RESEARCH EXPLAINED'));a.append(visual);const body=element('div','card-body');body.append(element('div','meta',item.meta[lang]||item.meta.fr));body.append(element('h3','',item.title[lang]||item.title.fr));body.append(element('p','',item.summary[lang]||item.summary.fr));body.append(element('span','mini-link',lang==='fr'?'Lire le décryptage →':'Read the article →'));a.append(body);return a;}
function render(){carousel.replaceChildren();if(!active.length){carousel.append(element('p','section-note',lang==='fr'?'Aucune actualité à la une pour le moment.':'No featured news at the moment.'));return;}let amount=Math.min(count(),active.length);for(let i=0;i<amount;i++)carousel.append(makeCard(active[(cursor+i)%active.length]));if(tools)tools.hidden=active.length<=1;}
function go(delta){cursor=(cursor+delta+active.length)%active.length;render(); if(tools)tools.dataset.position=String(cursor+1);}
function stop(){if(timer){clearInterval(timer);timer=null;}}
function run(){stop();if(paused||(hovered&&pointerMoved)||focused||document.hidden||(reduced&&reduced.matches)||active.length<=1)return;timer=setInterval(()=>go(1),7000);}
if(prev)prev.addEventListener('click',()=>{go(-1);run();});if(next)next.addEventListener('click',()=>{go(1);run();});if(toggle)toggle.addEventListener('click',()=>{paused=!paused;toggle.textContent=paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',paused?(lang==='fr'?'Reprendre le défilement':'Resume autoplay'):(lang==='fr'?'Mettre en pause':'Pause autoplay'));run();});
carousel.addEventListener('mouseenter',()=>{hovered=true;run();});carousel.addEventListener('pointermove',()=>{if(!pointerMoved){pointerMoved=true;run();}},{passive:true});carousel.addEventListener('mouseleave',()=>{hovered=false;run();});carousel.addEventListener('focusin',()=>{focused=true;run();});carousel.addEventListener('focusout',()=>{setTimeout(()=>{focused=carousel.contains(document.activeElement);run();},0);});document.addEventListener('visibilitychange',run);window.addEventListener('resize',()=>{render();run();});if(reduced&&reduced.addEventListener)reduced.addEventListener('change',run);
if(archive){let section=archive.closest('.archive-section');if(section)section.hidden=archived.length===0;archive.replaceChildren(...archived.map(makeCard));}
render();run();
})();