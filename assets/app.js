const body=document.body;
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu=document.querySelector('.fold-menu');
const nav=document.querySelector('.fold-nav');
function setMenu(open){body.classList.toggle('menu-open',open);menu?.setAttribute('aria-expanded',String(open));nav?.setAttribute('aria-hidden',String(!open));}
menu?.addEventListener('click',()=>setMenu(!body.classList.contains('menu-open')));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

body.classList.add('motion-ready');
const targets=[...document.querySelectorAll('main > section,.long-article > section')];
targets.forEach(target=>target.classList.add('motion-section'));
if(!reduceMotion&&'IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});
 targets.forEach(target=>observer.observe(target));
}else targets.forEach(target=>target.classList.add('in-view'));

let queued=false;
function paintScroll(){const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--scroll',`${max?scrollY/max*100:0}%`);queued=false}
addEventListener('scroll',()=>{if(!queued){requestAnimationFrame(paintScroll);queued=true}},{passive:true});paintScroll();

const matrixMessages=[
 ['NAME THE IDEA','Write one sentence that distinguishes this concept from the nearest related idea.'],
 ['RETRIEVE WITHOUT NOTES','Close the source and write the three ideas you can explain from memory.'],
 ['ADD A CLEAR EXAMPLE','Choose an example that shows the idea working, then explain why it fits.'],
 ['FIND THE LIMIT','Write one case where the idea does not apply or needs a condition.'],
 ['COMPARE TWO METHODS','Identify the cue that tells you which method is suitable.'],
 ['PRACTISE A DECISION','Complete one task where the strategy is not named in advance.'],
 ['CHECK THE ERROR','Classify what went wrong before choosing the correction.'],
 ['EXPLAIN THE LINK','Connect the evidence to the claim in your own words.']
];
const cells=[...document.querySelectorAll('[data-cell]')];
const matrixTitle=document.querySelector('[data-matrix-title]');
const matrixCopy=document.querySelector('[data-matrix-copy]');
cells.forEach((cell,index)=>cell.addEventListener('click',()=>{cells.forEach(item=>item.classList.remove('active'));cell.classList.add('active');const message=matrixMessages[index%matrixMessages.length];if(matrixTitle)matrixTitle.textContent=message[0];if(matrixCopy)matrixCopy.textContent=message[1]}));
if(cells.length)cells[1].classList.add('active');

const clock=document.querySelector('[data-clock]');
clock?.querySelectorAll('[data-time]').forEach(button=>button.addEventListener('click',()=>{
 clock.querySelectorAll('[data-time]').forEach(item=>item.classList.remove('active'));button.classList.add('active');
 const value=Number(button.dataset.time);const minutes=clock.querySelector('[data-minutes]');const hand=clock.querySelector('.clock-hand');
 if(minutes)minutes.textContent=String(value);if(hand)hand.style.setProperty('--angle',`${value/60*360}deg`);
}));

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>item.classList.remove('active'));button.classList.add('active');
 document.querySelectorAll('.path-grid article').forEach(card=>{const visible=button.dataset.filter==='all'||card.dataset.cat===button.dataset.filter;card.classList.toggle('hide',!visible);card.classList.remove('filter-pop');if(visible)requestAnimationFrame(()=>card.classList.add('filter-pop'))});
}));

document.querySelector('.contact-sheet form')?.addEventListener('submit',event=>{event.preventDefault();const status=event.currentTarget.querySelector('.form-status');if(status)status.textContent='Your message is prepared. Learn Matrix Works will reply by email.';event.currentTarget.reset()});

const consent=document.querySelector('.consent');if(localStorage.getItem('lmw-consent'))consent?.classList.add('hidden');
document.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{const analytics=button.dataset.consent==='accept'?'granted':'denied';if(typeof gtag==='function')gtag('consent','update',{analytics_storage:analytics,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});localStorage.setItem('lmw-consent',analytics);consent?.classList.add('hidden')}));
