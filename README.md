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

## Adding real car photos

1. Upload photos to the `images/cars/` folder (e.g. `corolla-front.jpg`).
2. In `assets/js/data.js`, put the paths in that car's `photos` list:
   `photos:["images/cars/corolla-front.jpg","images/cars/corolla-side.jpg"]`
3. Cars without photos show the built-in studio illustrations automatically.

## Pages

Home, Used Cars, New Cars, Car Detail, Sell Your Car, Compare, Car Finance calculator,
Car Inspection, About, Contact, Blog, Blog Post, FAQs, city pages (Lahore, Raiwind, Kasur,
Islamabad), Privacy Policy, Terms, 404, `sitemap.xml`, `robots.txt`.

All forms open WhatsApp with the details filled in — no server needed.
