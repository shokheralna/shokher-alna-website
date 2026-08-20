
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
  const category=document.body.dataset.category;
  const products=window.SHOKHER_ALNA_PRODUCTS||[];
  const grid=document.getElementById("categoryProductGrid");
  const empty=document.getElementById("categoryEmpty");
  if(!grid||!empty||!category)return;

  const visible=products.filter(p=>p.category===category&&window.getShokherStatusInfo(p).visible);

  visible.forEach(p=>{
    const info=window.getShokherStatusInfo(p);
    const card=document.createElement("article");
    card.className="product-card";
    card.innerHTML=`<a href="product.html?id=${encodeURIComponent(p.id)}" style="color:inherit;text-decoration:none"><div class="product-image product-image-file"><span class="product-badge ${info.status!=="active"?"product-badge-dark":""}">${info.badge}</span><img src="../${p.folder}/main.jpg" alt="${p.name}" loading="lazy"><div class="image-fallback" hidden><span>Upload main.jpg</span><small>${p.name}</small></div></div><div class="product-card-body"><div class="product-card-topline"><span class="product-category">${p.category.replaceAll("-"," ")}</span><span class="product-price">${p.price?`$${p.price}`:"Contact for price"}</span></div><h3>${p.name}</h3><p>${p.description}</p><span class="product-order-link">View photos →</span></div></a><div class="product-card-body" style="padding-top:0">${info.orderAllowed?`<a class="product-order-link" href="${window.buildWhatsAppOrderUrl(p)}" target="_blank" rel="noopener">Order via WhatsApp →</a>`:`<span class="product-order-disabled">${info.status==="active"?"Ordering not enabled":info.message}</span>`}</div>`;
    const img=card.querySelector("img"),fallback=card.querySelector(".image-fallback");
    img.addEventListener("error",()=>{img.hidden=true;fallback.hidden=false});
    grid.appendChild(card);
  });

  empty.hidden=visible.length>0;
});
