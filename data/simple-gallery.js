// ============================================================
// Shokher Alna — Automatic Product Gallery
// Main image + thumbnails + lightbox previous/next navigation
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


// ============================================================
// Check whether an image exists
// ============================================================

window.shokherProbeImage = function(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);

    img.src = src;
  });
};


// ============================================================
// Load main image + gallery images
// ============================================================

window.shokherLoadProductImages = async function(product) {
  const gallery = window.SHOKHER_ALNA_GALLERY;
  const images = [];

  // Main image first
  const main = await window.shokherProbeImage(
    gallery.mainImage(product)
  );

  if (main) {
    images.push(main);
  }

  // Look for gallery/01.jpg through gallery/20.jpg
  const checks = [];

  for (let i = 1; i <= gallery.maxGalleryImages; i++) {
    checks.push(
      window.shokherProbeImage(
        gallery.galleryImage(product, i)
      )
    );
  }

  const results = await Promise.all(checks);

  results
    .filter(Boolean)
    .forEach((src) => images.push(src));

  return images;
};


// ============================================================
// Render gallery
// ============================================================

window.shokherRenderSimpleGallery = async function(product) {

  const galleryElement =
    document.getElementById("productGallery");

  if (!galleryElement) return;


  // ----------------------------------------------------------
  // Gallery HTML
  // ----------------------------------------------------------

  galleryElement.innerHTML = `

    <div class="gallery-main">

      <img
        id="galleryMainImage"
        src=""
        alt="${product.name}"
        hidden
      >

      <div
        class="gallery-fallback"
        id="galleryFallback"
      >
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


    <div
      class="gallery-thumbs"
      id="galleryThumbs"
    ></div>


    <div
      class="gallery-lightbox"
      id="galleryLightbox"
      aria-hidden="true"
    >

      <button
        class="gallery-lightbox-close"
        id="galleryLightboxClose"
        type="button"
        aria-label="Close enlarged image"
      >
        &times;
      </button>


      <button
        id="galleryPrevious"
        type="button"
        aria-label="Previous image"
        style="
          position:fixed;
          left:20px;
          top:50%;
          transform:translateY(-50%);
          z-index:100001;
          width:52px;
          height:52px;
          border:0;
          border-radius:50%;
          background:rgba(255,255,255,.92);
          color:#211814;
          font-size:32px;
          line-height:1;
          cursor:pointer;
        "
      >
        &#10094;
      </button>


      <img
        id="galleryLightboxImage"
        src=""
        alt=""
      >


      <button
        id="galleryNext"
        type="button"
        aria-label="Next image"
        style="
          position:fixed;
          right:20px;
          top:50%;
          transform:translateY(-50%);
          z-index:100001;
          width:52px;
          height:52px;
          border:0;
          border-radius:50%;
          background:rgba(255,255,255,.92);
          color:#211814;
          font-size:32px;
          line-height:1;
          cursor:pointer;
        "
      >
        &#10095;
      </button>

    </div>
  `;


  // ----------------------------------------------------------
  // Load images
  // ----------------------------------------------------------

  const images =
    await window.shokherLoadProductImages(product);


  const mainImage =
    document.getElementById("galleryMainImage");

  const fallback =
    document.getElementById("galleryFallback");

  const thumbs =
    document.getElementById("galleryThumbs");

  const zoomButton =
    document.getElementById("galleryZoomButton");

  const lightbox =
    document.getElementById("galleryLightbox");

  const lightboxImage =
    document.getElementById("galleryLightboxImage");

  const lightboxClose =
    document.getElementById("galleryLightboxClose");

  const previousButton =
    document.getElementById("galleryPrevious");

  const nextButton =
    document.getElementById("galleryNext");


  // ----------------------------------------------------------
  // No images
  // ----------------------------------------------------------

  if (!images.length) {
    fallback.hidden = false;
    return;
  }


  fallback.hidden = true;
  mainImage.hidden = false;
  zoomButton.hidden = false;


  // ==========================================================
  // Current image
  // ==========================================================

  let currentIndex = 0;


  function updateMainImage() {

    mainImage.src = images[currentIndex];

    thumbs
      .querySelectorAll(".gallery-thumb")
      .forEach((item, index) => {

        item.classList.toggle(
          "active",
          index === currentIndex
        );

      });
  }


  // ==========================================================
  // Create thumbnails
  // ==========================================================

  images.forEach((src, index) => {

    const button =
      document.createElement("button");

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

      <span>
        ${index === 0
          ? "Main"
          : String(index).padStart(2, "0")}
      </span>

    `;


    button.addEventListener("click", () => {

      currentIndex = index;

      updateMainImage();

    });


    thumbs.appendChild(button);

  });


  updateMainImage();


  // ==========================================================
  // Lightbox
  // ==========================================================

  function updateLightboxImage() {

    lightboxImage.src =
      images[currentIndex];

    lightboxImage.alt =
      `${product.name} photo ${currentIndex + 1}`;

  }


  function openLightbox() {

    updateLightboxImage();

    lightbox.classList.add("open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  }


  function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

  }


  // ==========================================================
  // Previous / Next
  // ==========================================================

  function showNextImage() {

    currentIndex =
      (currentIndex + 1) % images.length;

    updateLightboxImage();
    updateMainImage();

  }


  function showPreviousImage() {

    currentIndex =
      (currentIndex - 1 + images.length)
      % images.length;

    updateLightboxImage();
    updateMainImage();

  }


  // ==========================================================
  // Buttons
  // ==========================================================

  mainImage.addEventListener(
    "click",
    openLightbox
  );


  zoomButton.addEventListener(
    "click",
    openLightbox
  );


  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );


  previousButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      showPreviousImage();

    }
  );


  nextButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      showNextImage();

    }
  );


  // ==========================================================
  // Click outside image closes lightbox
  // ==========================================================

  lightbox.addEventListener(
    "click",
    (event) => {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );


  // ==========================================================
  // Keyboard navigation
  // ==========================================================

  document.addEventListener(
    "keydown",
    (event) => {

      if (!lightbox.classList.contains("open")) {
        return;
      }


      if (event.key === "Escape") {
        closeLightbox();
      }


      if (event.key === "ArrowRight") {
        showNextImage();
      }


      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

    }
  );


  // ==========================================================
  // Mobile swipe navigation
  // ==========================================================

  let touchStartX = 0;


  lightbox.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  lightbox.addEventListener(
    "touchend",
    (event) => {

      const touchEndX =
        event.changedTouches[0].screenX;

      const difference =
        touchStartX - touchEndX;


      // Swipe left
      if (difference > 50) {
        showNextImage();
      }


      // Swipe right
      if (difference < -50) {
        showPreviousImage();
      }

    },
    { passive: true }
  );

};
