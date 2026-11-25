const products = [
  {id:1,name:"Linho Flame Off + forro microfibra trigo",category:"cortinas",kind:"Cortina sob medida",image:"assets/catalogo-01.jpg",alt:"Cortina clara em ambiente de jantar, referência do catálogo da JF Decor",description:"Cortina sob medida em Linho Flame Off com forro microfibra trigo.",price:null,visual:"Linho Flame Off",detail:"Cortina sob medida no tecido Linho Flame Off com forro microfibra trigo."},
  {id:2,name:"Persiana Rolô Blackout",category:"persianas",kind:"Persiana pronta-entrega no catálogo",image:"assets/catalogo-02.jpg",alt:"Persiana rolô blackout instalada em quarto, referência do catálogo da JF Decor",description:"O catálogo enviado descreve este modelo como pronta-entrega. Confirme disponibilidade.",price:null,visual:"Blackout",detail:"O catálogo enviado indica pronta-entrega para este modelo. Confirme disponibilidade e opções atuais com a equipe."},
  {id:3,name:"Cortina Sob Medida",category:"cortinas",kind:"Prega Degrade · Linho Rústico",image:"assets/catalogo-03.jpg",alt:"Cortina clara em sala de estar, referência do catálogo da JF Decor",description:"Modelo prega Degrade, tecido Linho Rústico, sem forro.",price:null,visual:"Linho Rústico",detail:"Modelo prega Degrade, no tecido Linho Rústico e sem forro."},
  {id:4,name:"Persiana Rolo tela solar 3% com bandô",category:"persianas",kind:"Persiana sob medida",image:"assets/catalogo-04.jpg",alt:"Persiana rolô em janela ampla, referência do catálogo da JF Decor",description:"Referência sob medida com tela solar 3% e bandô.",price:null,visual:"Tela Solar 3%",detail:"Persiana Rolo tela solar 3% com bandô, sob medida."},
  {id:5,name:"Cortina prega degrade, tecido voil liso + blackout 70%",category:"cortinas",kind:"Cortina sob medida",image:null,alt:"",description:"Combinação de voil liso com blackout 70%, conforme catálogo.",price:null,visual:"Voil + blackout",detail:"Cortina prega degrade em tecido voil liso com blackout 70%, sob medida."},
  {id:6,name:"Cortina na prega Wave, no tecido linho flame off + blackout 70%",category:"cortinas",kind:"Cortina sob medida",image:null,alt:"",description:"Prega Wave com linho Flame Off e blackout 70%.",price:null,visual:"Prega Wave",detail:"Cortina na prega Wave, no tecido linho Flame Off com blackout 70%, sob medida."},
  {id:7,name:"Cortina prega degrade, no tecido linho flame e sem forro",category:"cortinas",kind:"Cortina sob medida",image:null,alt:"",description:"Prega degrade em tecido linho Flame, sem forro.",price:null,visual:"Linho Flame",detail:"Cortina prega degrade no tecido linho Flame, sem forro, sob medida."},
  {id:8,name:"Capa de cadeira — Efeito Couro",category:"complementos",kind:"Complemento para casa",image:null,alt:"",description:"Capa para cadeira com efeito couro.",price:"R$ 45,00",visual:"Efeito Couro",detail:"Capa de cadeira com efeito couro. O catálogo enviado mostra R$ 45,00; confirme o valor atual com a equipe."},
  {id:9,name:"Protetor para sofá retrátil hidrorepelente",category:"complementos",kind:"Proteção para sofá",image:null,alt:"",description:"Opções descritas para assentos de 1,80 m a 2,60 m.",price:null,visual:"Sofá retrátil",detail:"Protetor para sofá retrátil hidrorepelente. O catálogo lista medidas para assentos de 1,80 m, 2,00 m, 2,20 m, 2,40 m e 2,60 m."},
  {id:10,name:"Cortina em tecido + Persiana Horizontal",category:"cortinas",kind:"Composição sob medida",image:null,alt:"",description:"Composição de cortina em tecido e persiana horizontal.",price:null,visual:"Tecido + persiana",detail:"Cortina em tecido combinada com persiana horizontal, sob medida."}
];

const grid = document.querySelector("#product-grid");
const status = document.querySelector("#results-status");
const search = document.querySelector("#catalog-search");
const filters = [...document.querySelectorAll(".filter-button")];
const dialog = document.querySelector("#product-dialog");
const dialogBody = document.querySelector("#dialog-body");
let currentFilter = "todos";
let previousFocus = null;

function visualMarkup(item, large = false) {
  if (item.image) return `<img src="${item.image}" alt="${item.alt}" loading="lazy" width="900" height="620">`;
  return `<div class="product-visual--editorial" role="img" aria-label="Representação gráfica do tecido ou complemento; sem fotografia do item"><div class="swatch-copy"><span>${item.visual}</span><small>Referência em texto</small></div></div>`;
}

function messageLink(item) {
  const text = `Olá, vi a referência “${item.name}” na vitrine da JF Decor e gostaria de confirmar medidas, disponibilidade e valores.`;
  return `https://wa.me/558388087018?text=${encodeURIComponent(text)}`;
}

function cardMarkup(item) {
  const price = item.price ? `${item.price}<small>valor mostrado no catálogo</small>` : `Consulte<small>medidas e valor</small>`;
  return `<article class="product-card" data-product="${item.id}">
    <div class="product-visual">${visualMarkup(item)}<span class="product-number">${String(item.id).padStart(2,"0")}</span><span class="product-tag">${item.price ? "Complemento" : item.category === "persianas" ? "Persiana" : item.category === "complementos" ? "Casa" : "Sob medida"}</span></div>
    <div class="product-info"><span class="product-category">${item.kind}</span><h3>${item.name}</h3><p>${item.description}</p><div class="product-bottom"><span class="product-price">${price}</span><button class="product-open" type="button" data-open="${item.id}" aria-label="Ver detalhes de ${item.name}">Detalhes ↗</button></div></div>
  </article>`;
}

function renderProducts() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");
  const visible = products.filter(item => (currentFilter === "todos" || item.category === currentFilter) && (!term || `${item.name} ${item.kind} ${item.description}`.toLocaleLowerCase("pt-BR").includes(term)));
  grid.innerHTML = visible.length ? visible.map(cardMarkup).join("") : `<div class="empty-state">Não encontrei essa referência. Tente outro termo ou escolha uma categoria.</div>`;
  status.textContent = `${visible.length} ${visible.length === 1 ? "referência" : "referências"} ${term ? "encontrada" : "no catálogo"}`;
}

function openProduct(id, trigger) {
  const item = products.find(product => product.id === Number(id));
  if (!item) return;
  previousFocus = trigger;
  const price = item.price ? `<p class="dialog-price">${item.price} <span>· valor mostrado no catálogo enviado</span></p>` : `<p class="dialog-price">Consulte medidas e valores com a equipe.</p>`;
  dialogBody.innerHTML = `<div class="dialog-media">${visualMarkup(item, true)}</div><div class="dialog-copy"><span class="product-category">${item.kind}</span><h2 id="dialog-title">${item.name}</h2><p>${item.detail}</p>${price}<p class="dialog-note">Prévia conceitual baseada no catálogo compartilhado. Confirme valores, disponibilidade e detalhes atuais antes de fechar.</p><a class="button button-dark" href="${messageLink(item)}" target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp <span aria-hidden="true">↗</span></a></div>`;
  dialog.showModal();
  dialog.querySelector(".dialog-close").focus();
}

filters.forEach(button => button.addEventListener("click", () => {
  currentFilter = button.dataset.filter;
  filters.forEach(filter => { const active = filter === button; filter.classList.toggle("is-active", active); filter.setAttribute("aria-pressed", String(active)); });
  renderProducts();
}));
search.addEventListener("input", renderProducts);
grid.addEventListener("click", event => {
  const target = event.target.closest("[data-open]");
  if (target) openProduct(target.dataset.open, target);
});
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => previousFocus?.focus());

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
  mobileNav.hidden = expanded;
});
mobileNav.addEventListener("click", event => {
  if (event.target.closest("a")) { mobileNav.hidden = true; menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Abrir menu"); }
});
renderProducts();
