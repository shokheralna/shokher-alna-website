# Shokher Alna — Simple Product Gallery

Each product uses ONE folder only.

Example:

assets/products/bags/B030-Guzrati-Metal-Bag/
  main.jpg
  gallery/
    01.jpg
    02.jpg
    03.jpg
    04.jpg
    05.jpg
    ...
    20.jpg

## Rules

- `main.jpg` = the main product image shown on product cards.
- `gallery/01.jpg`, `02.jpg`, etc. = all other photos.
- Different colors, shapes, angles, backs, close-ups, and lifestyle photos can all go in the same gallery.
- You do NOT need a `variants` folder.
- You do NOT need to list each gallery image in `products.js`.
- The website checks automatically for `01.jpg` through `20.jpg`.
- If you have only 6 gallery photos, upload `01.jpg` through `06.jpg` and stop there.

## Example for one product with multiple colors

main.jpg          -> best overall image
gallery/01.jpg    -> red version front
gallery/02.jpg    -> red version back
gallery/03.jpg    -> green version front
gallery/04.jpg    -> green version back
gallery/05.jpg    -> another shape
gallery/06.jpg    -> close-up detail

The customer can click any thumbnail to switch the large image.

## WhatsApp

The order message includes:
- product name
- price
- product page link

If the customer wants a particular version shown in the gallery, they can mention the photo number.
