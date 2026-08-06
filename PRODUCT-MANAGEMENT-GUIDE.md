# Shokher Alna Product Management Guide

## 1. Where product images go

Every product has its own folder under one of these category folders:

- `assets/products/bags/`
- `assets/products/jewelry/`
- `assets/products/sarees/`
- `assets/products/clothing/`
- `assets/products/handpicked-finds/`

Example:

```text
assets/products/bags/B030-Guzrati-Metal-Bag/
```

Upload images using these exact filenames:

```text
main.jpg
back.jpg
side.jpg
detail.jpg
```

Only `main.jpg` is required for homepage product cards.

## 2. How to show or hide a product

Open:

```text
data/products.js
```

Find the product and edit its `status`.

### Show normally

```js
"status": "active"
```

### Show but disable ordering

```js
"status": "out-of-stock"
```

### Remove from the website completely

```js
"status": "hidden"
```

### Keep a permanent discontinued record

```js
"status": "discontinued"
```

Hidden and discontinued products do not appear on the website.

## 3. Homepage sections

To show a product under Best Sellers:

```js
"bestSeller": true
```

To show it under New Arrivals:

```js
"newArrival": true
```

To stop showing it in either section, change the value to `false`.

## 4. Enable or disable WhatsApp ordering

```js
"orderEnabled": true
```

or:

```js
"orderEnabled": false
```

Out-of-stock items automatically disable ordering.

## 5. WhatsApp and social information

Open:

```text
data/config.js
```

Current WhatsApp number:

```text
+1 929-370-7785
```

The website prepares a WhatsApp message containing:

- Product name
- Price, when available
- Current product-page link
- Availability question
