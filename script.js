document.addEventListener("DOMContentLoaded",()=>{const body=document.body,header=document.getElementById("siteHeader"),toggle=document.getElementById("menuToggle"),menu=document.getElementById("mobileMenu"),mobileToggle=document.getElementById("mobileCollectionsToggle"),submenu=document.getElementById("mobileSubmenu"),dropdown=document.querySelector(".nav-dropdown"),dropdownTrigger=document.querySelector(".dropdown-trigger");const closeMenu=()=>{if(!toggle||!menu)return;toggle.classList.remove("active");toggle.setAttribute("aria-expanded","false");menu.classList.remove("open");menu.setAttribute("aria-hidden","true");body.classList.remove("menu-open")};if(toggle&&menu)toggle.addEventListener("click",()=>toggle.getAttribute("aria-expanded")==="true"?closeMenu():(toggle.classList.add("active"),toggle.setAttribute("aria-expanded","true"),menu.classList.add("open"),menu.setAttribute("aria-hidden","false"),body.classList.add("menu-open")));if(mobileToggle&&submenu)mobileToggle.addEventListener("click",()=>{const open=mobileToggle.getAttribute("aria-expanded")==="true";mobileToggle.setAttribute("aria-expanded",String(!open));submenu.classList.toggle("open",!open)});if(dropdown&&dropdownTrigger){dropdownTrigger.addEventListener("click",()=>{const open=dropdown.classList.toggle("open");dropdownTrigger.setAttribute("aria-expanded",String(open))});document.addEventListener("click",e=>{if(!dropdown.contains(e.target))dropdown.classList.remove("open")})}if(header)window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>8))});

window.normalizeShokherStatus = function(status) {
  const value = String(status || "").trim().toLowerCase();

  if (["active","available"].includes(value)) return "active";
  if (["out of stock","out-of-stock","out_of_stock","sold out","sold-out"].includes(value)) return "out-of-stock";
  if (["not available","not-available","not_available","unavailable"].includes(value)) return "not-available";
  if (["discontinued","discarded","discard","hidden"].includes(value)) return "discontinued";

  return value || "discontinued";
};

window.getShokherStatusInfo = function(product) {
  const status = window.normalizeShokherStatus(product && product.status);

  const info = {
    status,
    visible: status !== "discontinued",
    orderAllowed: status === "active" && Boolean(product && product.orderEnabled),
    badge: "Available",
    message: "Available"
  };

  if (status === "out-of-stock") {
    info.badge = "Out of Stock";
    info.message = "Currently out of stock";
  } else if (status === "not-available") {
    info.badge = "Not Available";
    info.message = "Currently not available";
  } else if (status === "discontinued") {
    info.badge = "Discontinued";
    info.message = "Discontinued";
  }

  return info;
};

document.addEventListener("DOMContentLoaded",()=>{
  const products=window.SHOKHER_ALNA_PRODUCTS||[];
  const config=window.SHOKHER_ALNA_CONFIG||{};
  const visibleProducts=products.filter(p=>window.getShokherStatusInfo(p).visible);

  function priceText(p){return p.price?`$${p.price}`:"Contact for price";}
  function createProductCard(p){
    const info=window.getShokherStatusInfo(p);
    const badge=info.status!=="active"?info.badge:(p.bestSeller?"Best Seller":p.newArrival?"New Arrival":"Available");
    const card=document.createElement("article");
    card.className="product-card";
    card.innerHTML=`<div class="product-image product-image-file"><span class="product-badge ${info.status!=="active"?"product-badge-dark":""}">${badge}</span><img src="${p.folder}/main.jpg" alt="${p.name}" loading="lazy"><div class="image-fallback" hidden><span>Upload main.jpg</span><small>${p.name}</small></div></div><div class="product-card-body"><div class="product-card-topline"><span class="product-category">${p.category.replaceAll("-"," ")}</span><span class="product-price">${priceText(p)}</span></div><h3>${p.name}</h3><p>${p.description}</p>${info.orderAllowed?`<a class="product-order-link" href="${window.buildWhatsAppOrderUrl(p)}" target="_blank" rel="noopener">Order via WhatsApp →</a>`:`<span class="product-order-disabled">${info.status==="active"?"Ordering not enabled":info.message}</span>`}</div>`;
    const img=card.querySelector("img"),fallback=card.querySelector(".image-fallback");
    img.addEventListener("error",()=>{img.hidden=true;fallback.hidden=false});
    return card;
  }

  function render(gridId,emptyId,filter){
    const grid=document.getElementById(gridId),empty=document.getElementById(emptyId);
    if(!grid||!empty)return;
    const list=visibleProducts.filter(filter).slice(0,4);
    grid.replaceChildren();
    empty.hidden=list.length>0;
    list.forEach(p=>grid.appendChild(createProductCard(p)));
  }

  render("bestSellersGrid","bestSellersEmpty",p=>p.bestSeller);
  render("newArrivalsGrid","newArrivalsEmpty",p=>p.newArrival);

  document.querySelectorAll('a[href*="instagram.com"]').forEach(a=>{if(config.instagramUrl)a.href=config.instagramUrl});
  document.querySelectorAll('a[href*="facebook.com"]').forEach(a=>{if(config.facebookUrl)a.href=config.facebookUrl});
});

document.addEventListener("DOMContentLoaded",()=>{
  const products=(window.SHOKHER_ALNA_PRODUCTS||[]).filter(p=>window.normalizeShokherStatus(p.status)==="active");
  const targets=[["bags",".collection-image-bags"],["jewelry",".collection-image-jewelry"],["sarees",".collection-image-sarees"],["clothing",".collection-image-clothing"],["handpicked-finds",".collection-image-handpicked"]];

  const probe=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(src);i.onerror=()=>r(null);i.src=src});

  async function build([category,selector]){
    const container=document.querySelector(selector);
    if(!container)return;
    const matches=products.filter(p=>p.category===category);
    const images=(await Promise.all(matches.map(p=>probe(`${p.folder}/main.jpg`)))).filter(Boolean);
    if(!images.length)return;

    container.querySelectorAll(".collection-placeholder-label").forEach(x=>x.remove());
    container.classList.add("collection-slideshow");

    const a=document.createElement("img");a.className="collection-slide active";a.src=images[0];container.appendChild(a);
    if(images.length===1)return;

    const b=document.createElement("img");b.className="collection-slide";b.src=images[1];container.appendChild(b);
    let index=0,first=true;
    setInterval(()=>{const next=(index+1)%images.length,showing=first?a:b,hidden=first?b:a;hidden.src=images[next];hidden.classList.add("active");showing.classList.remove("active");index=next;first=!first},3800);
  }

  targets.forEach(build);
});
