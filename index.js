import{a as v,i as n,S as h}from"./assets/vendor-u8rapaCG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const L="https://pixabay.com/api/",k="32552782-0d4c86680018457e820f20492";async function m(t,r=1,o=15){t.includes(" ")&&(t=t.replace(/\s+/g,"+"));const l=new URLSearchParams({key:k,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o});try{return(await v.get(`${L}?${l}`)).data}catch(e){throw new Error(e.response.statusText)}}function g(t){return t.map(({webformatURL:r,largeImageURL:o,tags:l,likes:e,views:s,comments:d,downloads:w})=>`<li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${l}"
              width="360"
            />
          </a>
          <div class="thumb-block">
            <div class="block">
              <h2 class="tittle">Likes</h2>
              <p class="amount">${e}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Views</h2>
              <p class="amount">${s}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Comments</h2>
              <p class="amount">${d}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Downloads</h2>
              <p class="amount">${w}</p>
            </div>
          </div>
        </li>`).join("")}let i=1,u="",p=0;const b=document.querySelector(".js-search"),f=document.querySelector(".gallery"),a=document.querySelector(".loader"),c=document.querySelector(".load-more"),y=document.querySelector(".back-to-top");a.style.display="none";c.style.display="none";y.style.display="none";b.addEventListener("submit",S);c.addEventListener("click",P);y.addEventListener("click",T);window.addEventListener("scroll",$);async function S(t){if(t.preventDefault(),f.innerHTML="",a.style.display="block",c.style.display="none",u=t.target.elements.search.value,i=1,!E(u)){a.style.display="none";return}try{const r=await m(u,i);a.style.display="none",p=r.totalHits,r.hits.length?(f.innerHTML=g(r.hits),p>i*15?c.style.display="block":n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()):n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),b.reset()}catch(r){a.style.display="none",n.error({title:"Error",message:`An error occurred: ${r.message}`}),console.error(r)}}async function P(){i+=1,a.style.display="block",c.style.display="none";try{const t=await m(u,i);a.style.display="none",f.insertAdjacentHTML("beforeend",g(t.hits));const o=document.querySelectorAll(".gallery-item")[0].getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"}),p>i*15?c.style.display="block":n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}catch(t){a.style.display="none",n.error({title:"Error",message:`An error occurred: ${t.message}`}),console.error(t)}}function E(t){return t.trim()===""?(n.error({title:"Error",message:"It seems you forgot to specify what photo you want to find :)"}),!1):(console.log("Input корректный"),!0)}function T(){window.scrollTo({top:0,behavior:"smooth"})}function $(){window.scrollY>window.innerHeight?y.style.display="block":y.style.display="none"}
//# sourceMappingURL=index.js.map
