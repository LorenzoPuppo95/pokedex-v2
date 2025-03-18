import{P as a}from"./poke-services-Dg5AztMM.js";const h=new a,d=document.getElementById("pokemon-type"),u=document.getElementById("enter-btn"),w=new URLSearchParams(window.location.search),f=w.get("id");function y(){h.getPokemonByNumber(f).then(e=>P(e))}function g(){window.location.href="index.html"}window.goBackToIndex=g;function k(){const e=new URLSearchParams(window.location.search);let t=parseInt(e.get("id"));t>1?t-=1:t=1025,e.set("id",t),window.location.search=e.toString()}window.previousPoke=k;function C(){const e=new URLSearchParams(window.location.search);let t=parseInt(e.get("id"));t<1025?t+=1:t=1,e.set("id",t),window.location.search=e.toString()}window.nextPoke=C;function E(){const e=a.BASE_URL+a.TYPE_URL;fetch(e).then(t=>t.json()).then(t=>v(t)).catch(t=>console.log(t))}function v(e){e.results.forEach(n=>{const o=document.createElement("option");o.value=n.name,o.textContent=n.name.charAt(0).toUpperCase()+n.name.slice(1),d.appendChild(o)})}u.addEventListener("click",()=>{const e=d.value;e?window.location.href=`type.html?type=${e}`:alert("Please select a Pokémon type.")});function P(e){const t=document.getElementById("type-header");t.textContent+=e.name.toUpperCase();const n=document.getElementById("dex-container");if(n.innerHTML="",e){const o=document.createElement("img");o.src=e.sprites.front_default?e.sprites.front_default:"./assets/favicon.svg",o.alt=`${e.name} (Normal)`,o.width=150;const c=document.createElement("img");c.src=e.sprites.front_shiny?e.sprites.front_shiny:"./assets/favicon.svg",c.alt=`${e.name} (Shiny)`,c.width=150;const m=document.createElement("h1");m.textContent=e.name.charAt(0).toUpperCase()+e.name.slice(1);const r=document.createElement("p");r.textContent="Types: "+e.types.map(s=>s.type.name).join(", ");const p=document.createElement("p");p.textContent="Stats: "+e.stats.map(s=>`${s.stat.name}: ${s.base_stat}`).join(", ");const l=document.createElement("p");l.textContent="Abilities: "+e.abilities.map(s=>s.ability.name).join(", ");const i=document.createElement("textarea");i.rows=5,i.cols=50,i.value="Moves: "+e.moves.map(s=>s.move.name).join(", "),i.disabled=!0,n.appendChild(o),n.appendChild(c),n.appendChild(m),n.appendChild(r),n.appendChild(p),n.appendChild(l),n.appendChild(i)}else n.innerHTML="<p>Pokémon details not found.</p>"}y();E();
