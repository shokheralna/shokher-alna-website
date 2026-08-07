// ============================================================
// Shokher Alna — Simple Automatic Gallery Engine
// ============================================================

window.SHOKHER_ALNA_GALLERY = {
  maxGalleryImages: 20,

  productBase(product) {
    return `../${product.folder}`;
  },

  mainImage(product) {
    return `${this.productBase(product)}/main.jpg`;
  },

  galleryImage(product, number) {
    const file = String(number).padStart(2, "0") + ".jpg";
    return `${this.productBase(product)}/gallery/${file}`;
  }
};

window.shokherProbeImage = function(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

window.shokherLoadProductImages = async function(product) {
  const gallery = window.SHOKHER_ALNA_GALLERY;
  const images = [];

  // Main image first.
  const main = await window.shokherProbeImage(gallery.mainImage(product));
  if (main) images.push(main);

  // Automatically look for gallery/01.jpg through gallery/20.jpg.
  const checks = [];

  for (let i = 1; i <= gallery.maxGalleryImages; i++) {
    checks.push(
      window.shokherProbeImage(gallery.galleryImage(product, i))
    );
  }

  const results = await Promise.all(checks);

  results
    .filter(Boolean)
    .forEach((src) => images.push(src));

  return images;
};

window.shokherRenderSimpleGallery = async function(product) {
  const galleryElement = document.getElementById("productGallery");

  if (!galleryElement) return;

  galleryElement.innerHTML = `
    <div class="gallery-main">
      <img id="galleryMainImage" src="" alt="${product.name}" hidden>
      <div class="gallery-fallback" id="galleryFallback">
        Product photos will appear here after upload.
      </div>

      <button
        class="gallery-zoom-button"
        id="galleryZoomButton"
        type="button"
        aria-label="Enlarge product image"
        hidden
      >
        Enlarge
      </button>
    </div>

    <div class="gallery-thumbs" id="galleryThumbs"></div>

    <div class="gallery-lightbox" id="galleryLightbox" aria-hidden="true">
      <button
        class="gallery-lightbox-close"
        id="galleryLightboxClose"
        type="button"
        aria-label="Close enlarged image"
      >
        &times;
      </button>

      <img id="galleryLightboxImage" src="" alt="">
    </div>
  `;

  const images = await window.shokherLoadProductImages(product);

  const mainImage = document.getElementById("galleryMainImage");
  const fallback = document.getElementById("galleryFallback");
  const thumbs = document.getElementById("galleryThumbs");
  const zoomButton = document.getElementById("galleryZoomButton");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("galleryLightboxImage");
  const lightboxClose = document.getElementById("galleryLightboxClose");

  if (!images.length) {
    fallback.hidden = false;
    return;
  }

  fallback.hidden = true;
  mainImage.hidden = false;
  zoomButton.hidden = false;

  let currentImage = images[0];
  mainImage.src = currentImage;

  function changeImage(src, button) {
    currentImage = src;
    mainImage.src = src;

    thumbs
      .querySelectorAll(".gallery-thumb")
      .forEach((item) => item.classList.remove("active"));

    if (button) {
      button.classList.add("active");
    }
  }

  images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-thumb";

    if (index === 0) {
      button.classList.add("active");
    }

    button.innerHTML = `
      <img
        src="${src}"
        alt="${product.name} photo ${index + 1}"
      >
      <span>${index === 0 ? "Main" : String(index).padStart(2, "0")}</span>
    `;

    button.addEventListener("click", () => {
      changeImage(src, button);
    });

    thumbs.appendChild(button);
  });

  function openLightbox() {
    lightboxImage.src = currentImage;
    lightboxImage.alt = product.name;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  mainImage.addEventListener("click", openLightbox);
  zoomButton.addEventListener("click", openLightbox);
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
};
