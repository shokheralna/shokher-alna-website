# Shokher Alna Simple Gallery Guide

## Current design
The product page shows one large focused image with thumbnails underneath. Clicking a thumbnail changes the focused image. The selected image can be enlarged, and the enlarged viewer supports moving through the product photographs.

## Required structure

    Product-Folder/
        main.jpg
        gallery/
            01.jpg
            02.jpg
            03.jpg
            04.jpg

`main.jpg` is the primary catalog image.

Additional photographs use two-digit sequential names:

    01.jpg
    02.jpg
    03.jpg

The automatic system currently checks up to 20 numbered gallery images.

## Multiple versions
Different colors/shapes belonging to the same listing can simply be added as gallery photographs. No separate variants folder is needed.

## Photography
For a cleaner storefront:
- Keep backgrounds consistent.
- Leave space around the product.
- Show the whole item in the primary photo.
- Use later images for details and alternative versions.
- Avoid cutting off bag chains, jewelry or product edges.

## Gallery troubleshooting
Verify the product folder path, `gallery` spelling, two-digit filename, `.jpg` extension, capitalization, GitHub Pages deployment and browser cache.
