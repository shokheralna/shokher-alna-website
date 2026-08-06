document.addEventListener("DOMContentLoaded", () => {
  const category = document.body.dataset.category;
  const products = window.SHOKHER_ALNA_PRODUCTS || [];
  const grid = document.getElementById("categoryProductGrid");
  const empty = document.getElementById("categoryEmpty");

  if (!grid || !empty || !category) return;

  const visible = products.filter((product) =>
    product.category === category &&
    (product.status === "active" || product.status === "out-of-stock")
  );

  function priceText(product) {
    return product.price ? `$${product.price}` : "Contact for price";
  }

  function createCard(product) {
    const outOfStock = product.status === "out-of-stock";
    const imagePath = `../${product.folder}/main.jpg`;

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image product-image-file">
        <span class="product-badge ${outOfStock ? "product-badge-dark" : ""}">
          ${outOfStock ? "Out of Stock" : "Available"}
        </span>

        <img src="${imagePath}" alt="${product.name}" loading="lazy">

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
          !outOfStock && product.orderEnabled
            ? `<a class="product-order-link"
                 href="${window.buildWhatsAppOrderUrl(product)}"
                 target="_blank"
                 rel="noopener">
                 Order via WhatsApp <span aria-hidden="true">→</span>
               </a>`
            : `<span class="product-order-disabled">
                 ${outOfStock ? "Currently unavailable" : "Ordering not enabled"}
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

  if (visible.length === 0) {
    empty.hidden = false;
    return;
  }

  visible.forEach((product) => grid.appendChild(createCard(product)));
});
