window.SHOKHER_ALNA_CONFIG = {
  businessName: "Shokher Alna",
  tagline: "Traditional & Elegant Fashion",

  // WhatsApp number must include the country code and contain digits only.
  whatsappNumber: "19293707785",

  instagramUrl: "https://www.instagram.com/shokher_alna_usa/",
  facebookUrl: "https://www.facebook.com/ShokherAlnaUsa",

  freeShippingThreshold: 100,
  pickupLocation: "Jackson Heights"
};

window.buildWhatsAppOrderUrl = function(product) {
  const config = window.SHOKHER_ALNA_CONFIG;
  const priceLine = product.price ? `Price: $${product.price}` : "Please confirm the price.";
  const productPage = window.location.href;

  const message = [
    "Hello Shokher Alna! 👋",
    "",
    "I am interested in ordering:",
    product.name,
    priceLine,
    "",
    `Product page: ${productPage}`,
    "",
    "Is this item currently available?"
  ].join("\n");

  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
