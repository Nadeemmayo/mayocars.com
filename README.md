# Mayo Cars — mayocars.com

Buy & sell new and used cars in Lahore, Raiwind, Kasur and Islamabad.
Owner: Wakeel Mayo · WhatsApp +92 347 4209912 · +92 305 4512133 · wakeelmayo@gmail.com

## Where to edit

| What | File |
|---|---|
| Phone, WhatsApp, email, social links | `assets/js/data.js` → `SITE` |
| New car prices & variants | `assets/js/data.js` → `NEW_CARS` |
| Used car listings (add / remove) | `assets/js/data.js` → `USED_CARS` |
| Blog articles | `assets/js/data.js` → `POSTS` |
| Colours, fonts, layout | `assets/css/style.css` |
| Facebook / Instagram / TikTok links in header & footer | search `href="#" class="fb"` etc. in the `.html` files |

## Car photos

Each car uses `photos:"key"` → a set of real model photos in `PHOTOS` (Wikimedia Commons,
free licence; credits on `photo-credits.html`).

To use your OWN photos of a car you are selling:
1. Upload them to the `images/cars/` folder (e.g. `prado-front.jpg`).
2. In `assets/js/data.js`, change that car to
   `photos:["images/cars/prado-front.jpg","images/cars/prado-side.jpg"]`

## Pages

Home, Used Cars, New Cars, Car Detail, Sell Your Car, Compare, Car Finance calculator,
Car Inspection, Photo Credits, About, Contact, Blog, Blog Post, FAQs, city pages (Lahore, Raiwind, Kasur,
Islamabad), Privacy Policy, Terms, 404, `sitemap.xml`, `robots.txt`.

All forms open WhatsApp with the details filled in — no server needed.
