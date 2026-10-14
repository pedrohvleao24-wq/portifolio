// ===== EDITE AQUI: seu e-mail e seus projetos =====
// img: caminho em img/ (ex.: "img/loja.png"); deixe "" para usar imagem padrão.
const projetos = [
  {nome:"Agência DESC",desc:"Site de uma agência de marketing, desenvolvido durante o curso Técnico em Informática do Senac.",tec:["HTML5","CSS3","JavaScript"],turma:"Senac",img:"",link:"https://www.dennysferreira.com.br/ti100/desc/"}
];
const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const S = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/";
// [nome, logo, fallback (ícone Bootstrap), logo monocromática?]
const tecnologias = [
  ["HTML5", D+"html5/html5-original.svg"],
  ["CSS3", D+"css3/css3-original.svg"],
  ["JavaScript", D+"javascript/javascript-original.svg"],
  ["Bootstrap", D+"bootstrap/bootstrap-original.svg"],
  ["PHP", D+"php/php-original.svg"],
  ["MySQL", D+"mysql/mysql-original-wordmark.svg"],
  ["Python", D+"python/python-original.svg"],
  ["C#", D+"csharp/csharp-original.svg"],
  ["ChatGPT", S+"openai.svg", "bi-chat-dots", true],
  ["Claude", S+"claude.svg", "bi-stars", true]
];
// =====================================
const $ = s => document.querySelector(s);
const turmas = ["Todos", ...new Set(projetos.map(p => p.turma))];
let filtro = "Todos";
const padrao = n => `https://placehold.co/640x360/161616/d4af37?text=${encodeURIComponent(n)}`;

function render(){
  $("#filtros").innerHTML = turmas.length<=2 ? "" : turmas.map(t => `<button class="${t===filtro?'on':''}" data-f="${t}">${t}</button>`).join("");
  $("#lista").innerHTML = projetos.filter(p => filtro==="Todos" || p.turma===filtro).map(p => `
    <div class="col-md-6 col-lg-4 reveal"><article class="proj">
      <img src="${p.img || padrao(p.nome)}" alt="Prévia do projeto ${p.nome}" loading="lazy">
      <div class="corpo"><h3>${p.nome}</h3><p>${p.desc}</p>
        <div class="d-flex flex-wrap gap-1">${p.tec.map(t => `<span class="badge">${t}</span>`).join("")}</div>
        <a class="ver" href="${p.link}" target="_blank" rel="noopener">Ver projeto <i class="bi bi-arrow-up-right"></i></a>
      </div></article></div>`).join("");
}
$("#filtros").addEventListener("click", e => { if(e.target.dataset.f){ filtro = e.target.dataset.f; render(); }});
$("#tech").innerHTML = tecnologias.map(([n,src,fb,mono]) => `<div class="col-6 col-md-4 col-lg-3 reveal"><div class="tech-item">
  <img src="${src}" alt="Logo ${n}" loading="lazy" class="${mono?'mono':''}" onerror="this.outerHTML='<i class=\'bi ${fb||'bi-code-slash'}\'></i>'"><span>${n}</span></div></div>`).join("");
$("#ano").textContent = new Date().getFullYear();
render();

// contadores
document.querySelectorAll("[data-n]").forEach(el => {
  const alvo = +el.dataset.n; let v = 0;
  const t = setInterval(() => { el.textContent = ++v; if(v>=alvo) clearInterval(t); }, 80);
});

// animação de entrada ao rolar
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visivel"); io.unobserve(e.target); }}), {threshold:.12});
function observar(){ document.querySelectorAll(".reveal:not(.visivel)").forEach((el,i) => { el.style.transitionDelay = (i%4)*70 + "ms"; io.observe(el); }); }
observar();
// reobserva os cards quando o filtro redesenha a lista
new MutationObserver(observar).observe($("#lista"), {childList:true});

// barra de progresso de rolagem + menu compacto
const barra = $("#progresso"), nav = $("#menu");
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  barra.style.width = (max>0 ? scrollY/max*100 : 0) + "%";
  nav.classList.toggle("compacto", scrollY > 40);
}, {passive:true});
