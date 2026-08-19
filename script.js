document.addEventListener("DOMContentLoaded",()=>{const body=document.body,header=document.getElementById("siteHeader"),toggle=document.getElementById("menuToggle"),menu=document.getElementById("mobileMenu"),mobileToggle=document.getElementById("mobileCollectionsToggle"),submenu=document.getElementById("mobileSubmenu"),dropdown=document.querySelector(".nav-dropdown"),dropdownTrigger=document.querySelector(".dropdown-trigger");const closeMenu=()=>{toggle.classList.remove("active");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation menu");menu.classList.remove("open");menu.setAttribute("aria-hidden","true");body.classList.remove("menu-open")};toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";if(open){closeMenu()}else{toggle.classList.add("active");toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-label","Close navigation menu");menu.classList.add("open");menu.setAttribute("aria-hidden","false");body.classList.add("menu-open")}});mobileToggle.addEventListener("click",()=>{const open=mobileToggle.getAttribute("aria-expanded")==="true";mobileToggle.setAttribute("aria-expanded",String(!open));mobileToggle.querySelector("span").textContent=open?"+":"−";submenu.classList.toggle("open",!open)});dropdownTrigger.addEventListener("click",()=>{const open=dropdown.classList.toggle("open");dropdownTrigger.setAttribute("aria-expanded",String(open))});document.addEventListener("click",e=>{if(!dropdown.contains(e.target)){dropdown.classList.remove("open");dropdownTrigger.setAttribute("aria-expanded","false")}});document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();dropdown.classList.remove("open")}});menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));window.addEventListener("resize",()=>{if(innerWidth>960)closeMenu()});window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>8))});

// =====================================================
// Product management engine
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const config = window.SHOKHER_ALNA_CONFIG || {};
  const products = window.SHOKHER_ALNA_PRODUCTS || [];

  const visibleProducts = products.filter((product) =>
    product.status === "active" || product.status === "out-of-stock"
  );

  function imagePath(product) {
    return `${product.folder}/main.jpg`;
  }

  function priceText(product) {
    return product.price ? `$${product.price}` : "Contact for price";
  }

  function createProductCard(product) {
    const isOutOfStock = product.status === "out-of-stock";
    const orderAllowed = product.orderEnabled && !isOutOfStock;
    const badgeText = isOutOfStock
      ? "Out of Stock"
      : product.bestSeller
        ? "Best Seller"
        : product.newArrival
          ? "New Arrival"
          : "Available";

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image product-image-file">
        <span class="product-badge ${isOutOfStock ? "product-badge-dark" : ""}">
          ${badgeText}
        </span>

        <img
          src="${imagePath(product)}"
          alt="${product.name}"
          loading="lazy"
        >

        <div class="image-fallback" hidden>
          <span>Upload main.jpg</span>
          <small>${product.name}</small>
        </div>
      </div>

      <div class="product-card-body">
        <div class="product-card-topline">
          <span class="product-category">${product.category.replaceAll("-", " ")}</span>
          <span class="product-price">${priceText(product)}</span>
        </div>

        <h3>${product.name}</h3>
        <p>${product.description}</p>

        ${
          orderAllowed
            ? `<a class="product-order-link" href="${window.buildWhatsAppOrderUrl(product)}"
                 target="_blank" rel="noopener">
                 Order via WhatsApp <span aria-hidden="true">→</span>
               </a>`
            : `<span class="product-order-disabled">
                 ${isOutOfStock ? "Currently unavailable" : "Ordering not enabled"}
               </span>`
        }
      </div>
    `;

    const image = card.querySelector("img");
    const fallback = card.querySelector(".image-fallback");

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    });

    return card;
  }

  function renderProductGroup({
    gridId,
    emptyId,
    filter,
    limit = 4
  }) {
    const grid = document.getElementById(gridId);
    const empty = document.getElementById(emptyId);

    if (!grid || !empty) return;

    const selected = visibleProducts.filter(filter).slice(0, limit);
    grid.replaceChildren();

    if (selected.length === 0) {
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    selected.forEach((product) => {
      grid.appendChild(createProductCard(product));
    });
  }

  renderProductGroup({
    gridId: "bestSellersGrid",
    emptyId: "bestSellersEmpty",
    filter: (product) => product.bestSeller
  });

  renderProductGroup({
    gridId: "newArrivalsGrid",
    emptyId: "newArrivalsEmpty",
    filter: (product) => product.newArrival
  });

  // Keep social links controlled from one central settings file.
  document.querySelectorAll('a[href*="instagram.com"]').forEach((link) => {
    if (config.instagramUrl) link.href = config.instagramUrl;
  });

  document.querySelectorAll('a[href*="facebook.com"]').forEach((link) => {
    if (config.facebookUrl) link.href = config.facebookUrl;
  });
});


// =====================================================
// Homepage collection card automatic slideshows
// Uses main.jpg from visible products in each category.
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const products = window.SHOKHER_ALNA_PRODUCTS || [];

  const visibleProducts = products.filter(
    (product) =>
      product.status === "active" ||
      product.status === "out-of-stock"
  );

  const collectionTargets = [
    {
      category: "bags",
      selector: ".collection-image-bags"
    },
    {
      category: "jewelry",
      selector: ".collection-image-jewelry"
    },
    {
      category: "sarees",
      selector: ".collection-image-sarees"
    },
    {
      category: "clothing",
      selector: ".collection-image-clothing"
    },
    {
      category: "handpicked-finds",
      selector: ".collection-image-handpicked"
    }
  ];

  function imageExists(src) {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => resolve(src);
      img.onerror = () => resolve(null);

      img.src = src;
    });
  }

  async function buildCollectionSlideshow({
    category,
    selector
  }) {
    const container =
      document.querySelector(selector);

    if (!container) return;

    const matchingProducts =
      visibleProducts.filter(
        (product) =>
          product.category === category
      );

    if (!matchingProducts.length) return;

    const checks = matchingProducts.map(
      (product) =>
        imageExists(
          `${product.folder}/main.jpg`
        )
    );

    const results =
      await Promise.all(checks);

    const images =
      results.filter(Boolean);

    if (!images.length) return;

    // Remove placeholder label only after at least
    // one real image has been found.
    container
      .querySelectorAll(
        ".collection-placeholder-label"
      )
      .forEach((label) => label.remove());

    container.classList.add(
      "collection-slideshow"
    );

    const firstImage =
      document.createElement("img");

    firstImage.className =
      "collection-slide active";

    firstImage.src = images[0];
    firstImage.alt = "";

    container.appendChild(firstImage);

    // One image means no slideshow is needed.
    if (images.length === 1) return;

    const secondImage =
      document.createElement("img");

    secondImage.className =
      "collection-slide";

    secondImage.src = images[1];
    secondImage.alt = "";

    container.appendChild(secondImage);

    let currentIndex = 0;
    let showingFirst = true;

    window.setInterval(() => {
      const nextIndex =
        (currentIndex + 1) %
        images.length;

      const visibleImage =
        showingFirst
          ? firstImage
          : secondImage;

      const hiddenImage =
        showingFirst
          ? secondImage
          : firstImage;

      hiddenImage.src =
        images[nextIndex];

      hiddenImage.classList.add(
        "active"
      );

      visibleImage.classList.remove(
        "active"
      );

      currentIndex = nextIndex;
      showingFirst = !showingFirst;
    }, 3800);
  }

  collectionTargets.forEach(
    buildCollectionSlideshow
  );
});
