# Shokher Alna Product Status Guide

Use these four statuses for future products.

## Active
`"status": "Active"`

Visible everywhere. Ordering works only when `orderEnabled` is true.

## Out of Stock
`"status": "Out of Stock"`

Visible with an Out of Stock badge. Product page stays visible. Ordering is automatically disabled. Use when you expect to restock.

## Not Available
`"status": "Not Available"`

Visible with a Not Available badge. Ordering is disabled. Use for temporary/unusual unavailability.

## Discontinued
`"status": "Discontinued"`

Hidden from customer-facing category pages, Best Sellers, New Arrivals and collection slideshows. Direct product URL shows a no-longer-available message. Keep the product record and image folder in GitHub for reference.

## Legacy compatibility

Existing values still work:
- `active`
- `out-of-stock`
- `hidden`
- `discontinued`

`hidden` is treated as Discontinued, so you do not need to edit all old products.

## Restocking workflow

Sold out:
`"status": "Out of Stock"`

Restocked:
`"status": "Active"`

Temporarily unavailable:
`"status": "Not Available"`

Stop selling permanently:
`"status": "Discontinued"`

## Ordering

For normal ordering:
`"status": "Active"` and `"orderEnabled": true`

Any non-active inventory status disables ordering automatically, even if `orderEnabled` is still true.
