/* Edit this list to add or remove real photos. Add files under public/photos/ and use paths such as /photos/photo-1.jpg. */
const photos = [
  { src: "/photos/golden-hour-village.png", caption: "That beautiful smile ♡" },
  { src: "/photos/taj-mahal.jpg", caption: "A day at the Taj" },
  { src: "/photos/temple-portrait.jpg", caption: "Simply you" },
  { src: "/photos/temple-gate.jpg", caption: "A little moment of prettiness" },
  { src: "/photos/eyes.jpg", caption: "Those lovely eyes" },
  { src: "/photos/portrait.jpg", caption: "The smile I could never describe." }
];
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const world = $("#world"), toast = $("#toast");
function announce(message){ toast.textContent=""; setTimeout(()=>toast.textContent=message,30); }
function sprinkle(count=20){
  const sky=$("#particles");
  for(let i=0;i<count;i++){const p=document.createElement("span");p.className="particle";p.textContent=["✿","♡","✧","·"][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+"%";p.style.animationDuration=(9+Math.random()*12)+"s";p.style.animationDelay=(-Math.random()*14)+"s";p.style.fontSize=(10+Math.random()*16)+"px";sky.append(p);}
}
sprinkle(34);
const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));
$$("[data-open-world]").forEach(btn=>btn.addEventListener("click",()=>{world.classList.add("started");world.style.opacity="1";document.querySelector("#nickname").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});heartBurst(12)}));
function openEnvelope(button, envelope, panel){
  const reveal=()=>{if(!panel.hidden)return;envelope.classList.add("open");panel.hidden=false;button.setAttribute("aria-expanded","true");button.disabled=true;heartBurst(9);panel.scrollIntoView({behavior:"smooth",block:"center"});};
  button.setAttribute("aria-expanded","false");button.addEventListener("click",reveal);envelope.addEventListener("click",reveal);envelope.setAttribute("role","button");envelope.setAttribute("tabindex","0");envelope.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();reveal();}});
}
openEnvelope($("#secretButton"),$("#secretEnvelope"),$("#secretLetter"));
openEnvelope($("#finalButton"),$("#finalEnvelope"),$("#finalLetter"));
$("#finalButton").addEventListener("click",()=>{$("#heartSky").hidden=false;});
function heartBurst(n=16){for(let i=0;i<n;i++){const h=document.createElement("span");h.className="heart-up";h.textContent=Math.random()>.25?"♡":"✦";h.style.left=(8+Math.random()*84)+"vw";h.style.fontSize=(16+Math.random()*24)+"px";h.style.animationDuration=(2.8+Math.random()*2)+"s";document.body.append(h);setTimeout(()=>h.remove(),5200)}}
$("#heartSky").addEventListener("click",()=>{heartBurst(50);announce("A little heart is on its way into the sky.");});
function renderGallery(){
 const root=$("#gallery");
 photos.forEach((photo,i)=>{
  const card=document.createElement("figure");card.className="photo-card";card.style.setProperty("--tilt",([-2,1.4,-1.2,1.8,-1.5,.8][i%6])+"deg");
  if(photo.src){const img=document.createElement("img");img.src=photo.src;img.alt=photo.caption;img.loading="lazy";img.addEventListener("error",()=>{img.remove();const empty=document.createElement("div");empty.className="photo-placeholder";empty.textContent="Add your photo here ♡";card.prepend(empty);card.dataset.hasImage="false";});card.prepend(img);card.dataset.hasImage="true";}
  else {const empty=document.createElement("div");empty.className="photo-placeholder";empty.textContent="A little space for your photo ♡";card.append(empty);card.dataset.hasImage="false";}
  const caption=document.createElement("figcaption");caption.textContent=photo.caption;card.append(caption);
  card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-label",photo.src?"View photo: "+photo.caption:"Photo placeholder: "+photo.caption);
  const open=()=>{if(card.dataset.hasImage==="true")showPhoto(i);else announce("This is a photo placeholder. Add a real photo in the photos list in script.js.");};
  card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  root.append(card);
 });
}
renderGallery();
const lightbox=$("#lightbox"), lbImg=$("img",lightbox), lbCaption=$("figcaption",lightbox);let photoIndex=0,previousFocus=null;
function showPhoto(i){photoIndex=i;const p=photos[i];if(!p?.src)return;previousFocus=document.activeElement;lbImg.src=p.src;lbImg.alt=p.caption;lbCaption.textContent=p.caption;lightbox.hidden=false;$(".lightbox-close",lightbox).focus();}
function stepPhoto(step){for(let tries=0;tries<photos.length;tries++){photoIndex=(photoIndex+step+photos.length)%photos.length;if(photos[photoIndex]?.src){showPhoto(photoIndex);return;}}}
$(".lightbox-close").addEventListener("click",closeLightbox);$(".lightbox-prev").addEventListener("click",()=>stepPhoto(-1));$(".lightbox-next").addEventListener("click",()=>stepPhoto(1));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
function closeLightbox(){lightbox.hidden=true;lbImg.removeAttribute("src");previousFocus?.focus();}
document.addEventListener("keydown",e=>{if(lightbox.hidden)return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowLeft")stepPhoto(-1);if(e.key==="ArrowRight")stepPhoto(1)});
const audio=$("#piano"), musicButton=$("#musicToggle");let playing=false;
const muteButton=document.createElement("button");muteButton.className="music mute-button";muteButton.type="button";muteButton.textContent="Mute";muteButton.setAttribute("aria-label","Mute music");musicButton.after(muteButton);
function labelMusic(){musicButton.innerHTML=playing?'♫ <span>Pause melody</span>':'♫ <span>Play our little melody ♡</span>';musicButton.setAttribute("aria-label",playing?"Pause music":"Play music");}
async function playMusic(){if(!audio.getAttribute("src")){announce("Add your piano recording as piano.mp3 in the public folder.");return;}try{await audio.play();playing=true;labelMusic();announce("Music is playing.");}catch{announce("Sound needs a tap to start. Check that piano.mp3 is in the public folder.");}}
musicButton.addEventListener("click",()=>{if(playing){audio.pause();playing=false;labelMusic();}else playMusic();});
muteButton.addEventListener("click",()=>{audio.muted=!audio.muted;muteButton.textContent=audio.muted?"Unmute":"Mute";muteButton.setAttribute("aria-label",audio.muted?"Unmute music":"Mute music");});
audio.volume=.22;
audio.addEventListener("error",()=>{playing=false;labelMusic();});
window.addEventListener("load",()=>{audio.play().then(()=>{playing=true;labelMusic()}).catch(()=>labelMusic());},{once:true});