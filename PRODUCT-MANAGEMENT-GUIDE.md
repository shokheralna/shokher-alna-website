# Shokher Alna Product Management Guide

This is the main future-reference guide for adding products.

## 1. Add a new product

Every product needs:
1. A unique product ID.
2. A record in the existing product data JSON.
3. A matching folder under `assets/products/<category>/`.
4. A `main.jpg` image.

Example new bag:

    ID: B031
    Name: Example Bag

Create:

    assets/products/bags/B031-Example-Bag/

Then upload:

    assets/products/bags/B031-Example-Bag/main.jpg

Keep the ID unique and continue the existing numbering convention.

## 2. Product data

Copy an existing product record and edit it carefully:

    {
      "id": "B031",
      "name": "Example Bag",
      "category": "bags",
      "folder": "assets/products/bags/B031-Example-Bag",
      "price": "60",
      "status": "Active",
      "featured": false,
      "bestSeller": false,
      "newArrival": true,
      "orderEnabled": true,
      "description": "Customer-facing product description."
    }

JSON punctuation matters. Do not accidentally remove commas, quotation marks or brackets.

## 3. What the settings do

    "bestSeller": true

Shows the product in Best Sellers.

    "newArrival": true

Shows it in New Arrivals.

    "orderEnabled": true

Enables the order call-to-action such as `Order via WhatsApp →`.

If it is false, the card can say `Ordering not enabled`.

    "featured": true

Controls featured behavior where the current site uses that flag.

    "status": "Active"

Uses the site's current active-product convention.

A product can be both:

    "bestSeller": true,
    "newArrival": true

The flags are independent.

## 4. Main image

Use exactly:

    main.jpg

inside the product folder.

Example:

    assets/products/bags/B031-Example-Bag/main.jpg

If the product exists in the data but `main.jpg` is missing, the site may display its placeholder such as `UPLOAD MAIN.JPG`.

Avoid changing `.jpg` to `.jpeg`, `.JPG` or `.png` unless the website code is also updated.

## 5. Additional photos

Create:

    gallery/

inside the product folder and use:

    01.jpg
    02.jpg
    03.jpg
    04.jpg
    ...

Example:

    assets/products/bags/B031-Example-Bag/
        main.jpg
        gallery/
            01.jpg
            02.jpg
            03.jpg
            04.jpg

The current automatic gallery system is designed to check numbered gallery images up to 20.

Keep numbering continuous whenever possible.

## 6. Several colors/shapes of the same product

Do NOT create a variant folder under the current setup.

If the name/listing/price is the same, keep one product and put the other colors or shapes in `gallery/`.

Example:

    B031-Example-Bag/
        main.jpg
        gallery/
            01.jpg
            02.jpg
            03.jpg
            04.jpg
            05.jpg
            06.jpg

Create separate product IDs only when the versions genuinely need separate listings—for example different prices or separately identifiable products.

## 7. New Arrivals

For a new product:

    "newArrival": true

When it is no longer new:

    "newArrival": false

Nothing else needs to be deleted.

## 8. Best Sellers

To add:

    "bestSeller": true

To remove:

    "bestSeller": false

Example from testing: B006 Patchwork Hut appeared in Best Sellers once `bestSeller` was true.

## 9. WhatsApp ordering

For an orderable product:

    "orderEnabled": true

If the page says `Ordering not enabled`, check this property first.

During testing B006 had:

    "orderEnabled": false

which caused that message.

## 10. Product description

Replace placeholders such as:

    "Product details will be added later."

with a short customer-facing description, preferably 1–2 sentences describing design, craftsmanship, material or use.

## 11. Full new-product checklist

1. Choose category.
2. Assign next unique ID.
3. Create product folder.
4. Upload `main.jpg`.
5. Create `gallery/` when additional photos exist.
6. Upload `01.jpg`, `02.jpg`, etc.
7. Copy an existing product record in the data file.
8. Change ID.
9. Change name.
10. Change category.
11. Change folder path.
12. Enter price.
13. Set status.
14. Set `featured`.
15. Set `bestSeller`.
16. Set `newArrival`.
17. Set `orderEnabled`.
18. Write description.
19. Commit changes.
20. Allow GitHub Pages to deploy.
21. Hard-refresh the live website.
22. Check category/product card.
23. Open product detail page.
24. Test thumbnails.
25. Test enlargement and image navigation.
26. Test WhatsApp ordering.

## 12. Product page URL

Individual products use the reusable page:

    pages/product.html?id=B030

Do not create `B030.html`, `B031.html`, etc.

## 13. Troubleshooting

### Product appears but no image
Check `main.jpg`, exact folder path, spelling, capitalization and extension.

### Best Seller missing
Check `"bestSeller": true`, valid JSON, and active status.

### New Arrival missing
Check `"newArrival": true`.

### Ordering not enabled
Check `"orderEnabled": true`.

### Gallery missing
Confirm:

    gallery/01.jpg
    gallery/02.jpg
    gallery/03.jpg

and exact `.jpg` filenames.

### Product URL gives 404
Confirm `pages/product.html` exists in GitHub and the URL points to that exact filename.

### GitHub shows image but website does not
The upload succeeded, but the site may be requesting a different path. Check the product `folder`, filename, extension, capitalization, deployment and browser cache.

## 14. Do not do these

- Do not reuse IDs.
- Do not make separate HTML pages for every product.
- Do not randomly rename `main.jpg`.
- Do not create variant folders under the current architecture.
- Do not delete product folders simply because something sells out.
- Do not forget `orderEnabled: true` for orderable products.
- Do not forget to commit changes.
