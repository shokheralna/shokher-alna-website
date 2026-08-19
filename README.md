# Shokher Alna Website

Future-reference documentation for the Shokher Alna GitHub Pages catalog.

## Structure
- `index.html` — homepage
- `style.css` — site styling
- `script.js` — main site behavior
- `data/` — product data
- `pages/product.html` — reusable individual product page
- `assets/hero/hero.png` — homepage hero
- `assets/logo/logo.png` — logo
- `assets/products/` — product photographs organized by category

## Current features
- Responsive branded homepage
- Bags, Jewelry, Sarees, Clothing and Handpicked Finds
- Automatic category imagery using product images
- New Arrivals and Best Sellers driven by product-data flags
- Reusable product detail page using `?id=PRODUCT_ID`
- Main product photograph and thumbnail gallery
- Enlarged/lightbox gallery with image navigation
- Per-product WhatsApp ordering control
- Multiple colors/shapes can share one listing and gallery

## Product page
Do NOT create one HTML file per product. The reusable page is:

    pages/product.html?id=B030

The product ID tells the page which product to load.

## Guides
Read `PRODUCT-MANAGEMENT-GUIDE.md` before adding products.
Read `SIMPLE-GALLERY-GUIDE.md` for photographs.
Read `WEBSITE-MAINTENANCE-CHECKLIST.md` after major changes.
