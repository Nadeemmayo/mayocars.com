/* =========================================================
   MAYO CARS — Site data
   ---------------------------------------------------------
   HOW TO EDIT
   • Contact numbers / social links: edit SITE below.
   • New car prices: edit the "variants" price of each car.
   • Add a used car: copy one block in USED_CARS, change the id
     and details. Ids must be unique.
   • Real photos: upload images to /images/cars/ and list them in
     photos:[] e.g. photos:["images/cars/corolla-front.jpg", ...]
     When photos is empty, studio illustrations are shown.
   ========================================================= */

var SITE = {
  name: "Mayo Cars",
  domain: "mayocars.com",
  owner: "Wakeel Mayo",
  phone1: "+92 347 4209912",
  phone2: "+92 305 4512133",
  whatsapp: "923474209912",
  email: "wakeelmayo@gmail.com",
  areas: ["Lahore", "Raiwind", "Kasur", "Islamabad"],
  social: { facebook: "#", instagram: "#", tiktok: "#" },
  pricesCheckedOn: "October 2026"
};

/* ---------------- NEW CARS (2026 models, ex-factory) ---------------- */
var NEW_CARS = [
  { id:"suzuki-alto", make:"Suzuki", model:"Alto", body:"hatch", color:"#d4d7dd", year:2026,
    engine:"658 cc", trans:"Manual / AGS", fuel:"Petrol", seats:5, segment:"City hatchback",
    variants:[{name:"VXR",price:2994861},{name:"VXR AGS",price:3166480},{name:"VXL AGS",price:3326446}],
    highlights:["Very low fuel cost","Cheapest to maintain","Easy parking in Lahore traffic","Strong resale value"],
    desc:"Pakistan's best-selling small car. The Alto is the smart first car for families and daily office use in Lahore and Raiwind — light on fuel, cheap parts and easy resale.", photos:[] },

  { id:"suzuki-cultus", make:"Suzuki", model:"Cultus", body:"hatch", color:"#8b1e2d", year:2026,
    engine:"998 cc", trans:"Manual / AGS", fuel:"Petrol", seats:5, segment:"Family hatchback",
    variants:[{name:"VXR",price:4089490},{name:"VXL",price:4359160},{name:"VXL AGS",price:4591460}],
    highlights:["Roomier than Alto","1000 cc fuel economy","Automatic (AGS) option","Popular for ride-hailing"],
    desc:"A practical 1000 cc hatchback with more cabin space than the Alto and a simple, reliable engine. A favourite for small families and ride-hailing drivers.", photos:[] },

  { id:"suzuki-swift", make:"Suzuki", model:"Swift", body:"hatch", color:"#1d4ed8", year:2026,
    engine:"1197 cc", trans:"Manual / CVT", fuel:"Petrol", seats:5, segment:"Premium hatchback",
    variants:[{name:"GL",price:4460160},{name:"GL CVT",price:4605600},{name:"GLX CVT",price:4766190}],
    highlights:["Sporty looks","Smooth CVT automatic","Touchscreen infotainment","Good highway stability"],
    desc:"The Swift brings sporty styling and a smooth CVT automatic to the hatchback class. Great for young buyers and city-plus-motorway driving.", photos:[] },

  { id:"suzuki-fronx", make:"Suzuki", model:"Fronx", body:"crossover", color:"#9a3412", year:2026,
    engine:"1462 cc", trans:"Manual / Automatic", fuel:"Petrol / Hybrid", seats:5, segment:"Compact crossover",
    variants:[{name:"GL 5MT",price:5999999},{name:"GL 4AT",price:6099999},{name:"GLX 6AT",price:6399999},{name:"GLX 6AT Hybrid ADAS",price:6799999}],
    highlights:["Crossover styling","Hybrid option with ADAS","Higher ground clearance","6-speed automatic"],
    desc:"Suzuki's stylish compact crossover with higher seating, a 1.5 litre engine and a hybrid variant with driver-assist (ADAS) features.", photos:[] },

  { id:"toyota-yaris", make:"Toyota", model:"Yaris", body:"sedan", color:"#e5e7eb", year:2026,
    engine:"1329 cc / 1496 cc", trans:"Manual / CVT", fuel:"Petrol", seats:5, segment:"Compact sedan",
    variants:[{name:"1.3 GLi MT",price:4649000},{name:"1.3 GLi CVT",price:4809000},{name:"1.3 Ativ MT",price:4829000},{name:"1.3 Ativ CVT",price:5719000},{name:"1.5 Ativ X CVT",price:5999000}],
    highlights:["Toyota reliability","Fuel efficient","Comfortable sedan ride","Wide service network"],
    desc:"Toyota's compact sedan offers Toyota reliability and comfort at an entry price. A popular choice for families moving up from a hatchback.", photos:[] },

  { id:"toyota-corolla", make:"Toyota", model:"Corolla Altis", body:"sedan", color:"#f8fafc", year:2026,
    engine:"1598 cc / 1798 cc", trans:"Manual / CVT", fuel:"Petrol", seats:5, segment:"Family sedan",
    variants:[{name:"1.6 MT",price:6099000},{name:"1.6 AT",price:6699000},{name:"Altis 1.8 CVT",price:7029000},{name:"1.6 AT Special Edition",price:7339000},{name:"Altis Grande 1.8 CVT",price:7669000}],
    highlights:["Pakistan's favourite sedan","Excellent resale","Spacious cabin","Easy parts & service"],
    desc:"The Corolla is Pakistan's most trusted family sedan — strong resale, easy maintenance and comfort for long trips between Lahore and Islamabad.", photos:[] },

  { id:"toyota-corolla-cross", make:"Toyota", model:"Corolla Cross", body:"crossover", color:"#475569", year:2026,
    engine:"1798 cc", trans:"CVT", fuel:"Petrol / Hybrid", seats:5, segment:"Crossover SUV",
    variants:[{name:"1.8 Petrol",price:7235000},{name:"1.8 Petrol X",price:7935000},{name:"Smart Hybrid",price:9299000},{name:"Premium Hybrid",price:9729000}],
    highlights:["Locally assembled hybrid","Excellent fuel average (hybrid)","SUV seating position","Toyota safety features"],
    desc:"Toyota's crossover with an available self-charging hybrid. It combines SUV practicality with sedan-like running costs.", photos:[] },

  { id:"toyota-fortuner", make:"Toyota", model:"Fortuner", body:"suv", color:"#111827", year:2026,
    engine:"2694 cc petrol / 2755 cc diesel", trans:"Automatic", fuel:"Petrol / Diesel", seats:7, segment:"Full-size SUV",
    variants:[{name:"Starting price",price:12435000},{name:"Top variant",price:20499000}],
    highlights:["7 seats","Body-on-frame toughness","4x4 options","Strong road presence"],
    desc:"A rugged 7-seater SUV for families, businesses and northern-area trips. Built on a tough ladder frame with petrol and diesel options.", photos:[] },

  { id:"toyota-hilux", make:"Toyota", model:"Hilux Revo", body:"pickup", color:"#9ca3af", year:2026,
    engine:"2755 cc diesel", trans:"Manual / Automatic", fuel:"Diesel", seats:5, segment:"Double-cab pickup",
    variants:[{name:"Starting price",price:12329000},{name:"Top variant",price:15839000}],
    highlights:["Legendary durability","4x4 capability","Loading bed","Popular with farms & business"],
    desc:"The Hilux Revo is the go-to double-cab pickup for business, farming and off-road use around Kasur, Raiwind and beyond.", photos:[] },

  { id:"honda-city", make:"Honda", model:"City", body:"sedan", color:"#7f1d1d", year:2026,
    engine:"1199 cc / 1497 cc", trans:"CVT", fuel:"Petrol", seats:5, segment:"Compact sedan",
    variants:[{name:"1.2 CVT",price:4737000},{name:"1.5 Aspire CVT",price:6069000},{name:"1.5 Aspire S CVT",price:6149000}],
    highlights:["Spacious rear seat","Smooth CVT","Honda build quality","Good resale"],
    desc:"Honda's compact sedan with a roomy cabin and smooth CVT automatic — comfortable for city driving and family use.", photos:[] },

  { id:"honda-civic", make:"Honda", model:"Civic", body:"sedan", color:"#0f172a", year:2026,
    engine:"1498 cc turbo", trans:"CVT", fuel:"Petrol", seats:5, segment:"Executive sedan",
    variants:[{name:"Standard",price:8499000},{name:"Oriel",price:8834000},{name:"RS",price:10100000}],
    highlights:["1.5 turbo performance","Premium interior","Honda Sensing (RS)","Head-turning design"],
    desc:"The Civic is the sporty executive sedan of choice — turbo power, a premium cabin and a strong brand image.", photos:[] },

  { id:"kia-sportage", make:"KIA", model:"Sportage L", body:"suv", color:"#14532d", year:2026,
    engine:"1.6 turbo hybrid", trans:"Automatic", fuel:"Hybrid", seats:5, segment:"Compact SUV",
    variants:[{name:"FWD HEV",price:12199000},{name:"AWD HEV",price:13299000}],
    highlights:["New-generation design","Hybrid efficiency","AWD option","Panoramic dual screens"],
    desc:"The new-generation Sportage L hybrid brings bold design, dual curved screens and hybrid efficiency to the compact SUV segment.", photos:[] },

  { id:"hyundai-tucson", make:"Hyundai", model:"Tucson Hybrid", body:"suv", color:"#1e3a8a", year:2026,
    engine:"1.6 turbo hybrid", trans:"Automatic", fuel:"Hybrid", seats:5, segment:"Compact SUV",
    variants:[{name:"Starting price",price:12202000}],
    highlights:["Hybrid powertrain","Modern tech cabin","Smooth ride","Safety features"],
    desc:"Hyundai's hybrid SUV with a modern cabin, smooth ride and excellent efficiency for its size.", photos:[] },

  { id:"changan-alsvin", make:"Changan", model:"Alsvin", body:"sedan", color:"#b91c1c", year:2026,
    engine:"1.3 L / 1.5 L", trans:"Manual / DCT", fuel:"Petrol", seats:5, segment:"Compact sedan",
    variants:[{name:"1.3 MT Comfort",price:4189000},{name:"1.5 DCT Lumiere",price:4499000},{name:"Black Edition",price:4999000}],
    highlights:["Feature-rich for price","Sunroof (Lumiere)","Dual-clutch automatic","Large touchscreen"],
    desc:"Changan's Alsvin packs a lot of features — sunroof, big screen and DCT automatic — into an affordable sedan.", photos:[] }
];

/* ---------------- USED CARS (DEMO LISTINGS) ----------------
   These are sample listings for the demo. Replace with real cars. */
var USED_CARS = [
  { id:"u101", make:"Toyota", model:"Corolla", variant:"Altis 1.6 X CVT", year:2022, km:48000, city:"Lahore", area:"DHA Phase 6",
    price:5850000, trans:"Automatic", fuel:"Petrol", engine:"1598 cc", color:"Super White", colorHex:"#f8fafc", body:"sedan",
    reg:"Lahore", assembly:"Local", owner:"1st owner", featured:true,
    features:["Push start","Alloy rims","Navigation","Reverse camera","Cruise control","Airbags"],
    desc:"Bumper-to-bumper genuine, company maintained. All services from Toyota dealership with record. Tyres 80%. First owner, Lahore registered.", photos:[] },

  { id:"u102", make:"Honda", model:"Civic", variant:"Oriel 1.5 Turbo", year:2021, km:52000, city:"Lahore", area:"Johar Town",
    price:7200000, trans:"Automatic", fuel:"Petrol", engine:"1498 cc", color:"Crystal Black", colorHex:"#0f172a", body:"sedan",
    reg:"Islamabad", assembly:"Local", owner:"1st owner", featured:true,
    features:["Sunroof","Push start","Climate control","LED headlights","Paddle shifters","Airbags"],
    desc:"Islamabad number, total genuine with a few touch-ups. Sunroof, Honda dealership maintained. Very neat interior.", photos:[] },

  { id:"u103", make:"Suzuki", model:"Alto", variant:"VXL AGS", year:2023, km:18000, city:"Raiwind", area:"Raiwind City",
    price:2975000, trans:"Automatic", fuel:"Petrol", engine:"658 cc", color:"Silver", colorHex:"#c0c6d0", body:"hatch",
    reg:"Lahore", assembly:"Local", owner:"1st owner", featured:true,
    features:["AGS automatic","Power windows","ABS","Airbags","Keyless entry"],
    desc:"Lady-driven, only 18,000 km. Complete file and all Suzuki services. Just buy and drive.", photos:[] },

  { id:"u104", make:"Honda", model:"City", variant:"1.2 CVT", year:2022, km:35000, city:"Kasur", area:"Kasur City",
    price:4150000, trans:"Automatic", fuel:"Petrol", engine:"1199 cc", color:"Modern Steel", colorHex:"#6b7280", body:"sedan",
    reg:"Lahore", assembly:"Local", owner:"2nd owner", featured:false,
    features:["CVT","Touchscreen","Reverse camera","Airbags","ABS"],
    desc:"Excellent condition, minor touch-ups only. Engine and gearbox perfect. Fuel average 14–15 km/l in city.", photos:[] },

  { id:"u105", make:"Toyota", model:"Yaris", variant:"Ativ X CVT 1.5", year:2023, km:22000, city:"Islamabad", area:"F-11",
    price:5200000, trans:"Automatic", fuel:"Petrol", engine:"1496 cc", color:"Attitude Black", colorHex:"#1f2937", body:"sedan",
    reg:"Islamabad", assembly:"Local", owner:"1st owner", featured:true,
    features:["Push start","Alloy rims","Climate control","Reverse camera","Airbags"],
    desc:"Islamabad registered, total genuine, Toyota warranty book complete. Top variant.", photos:[] },

  { id:"u106", make:"Suzuki", model:"Cultus", variant:"VXL", year:2021, km:61000, city:"Lahore", area:"Wapda Town",
    price:3350000, trans:"Manual", fuel:"Petrol", engine:"998 cc", color:"Pearl Red", colorHex:"#9f1239", body:"hatch",
    reg:"Lahore", assembly:"Local", owner:"1st owner", featured:false,
    features:["Power windows","Power steering","ABS","Airbags","Alloy rims"],
    desc:"Family-used, well maintained. Some touch-ups. AC chilled, engine smooth. Original book and file.", photos:[] },

  { id:"u107", make:"KIA", model:"Sportage", variant:"AWD 2.0", year:2021, km:55000, city:"Islamabad", area:"DHA Phase 2",
    price:7250000, trans:"Automatic", fuel:"Petrol", engine:"1999 cc", color:"Snow White Pearl", colorHex:"#f1f5f9", body:"suv",
    reg:"Islamabad", assembly:"Local", owner:"1st owner", featured:true,
    features:["AWD","Panoramic sunroof","Leather seats","Push start","Reverse camera","Airbags"],
    desc:"Top-of-the-line AWD with panoramic roof. KIA dealership maintained, total genuine except bumpers.", photos:[] },

  { id:"u108", make:"Toyota", model:"Fortuner", variant:"2.8 Sigma 4", year:2019, km:98000, city:"Lahore", area:"Gulberg",
    price:11500000, trans:"Automatic", fuel:"Diesel", engine:"2755 cc", color:"Phantom Brown", colorHex:"#3f2a1e", body:"suv",
    reg:"Lahore", assembly:"Local", owner:"2nd owner", featured:true,
    features:["4x4","7 seats","Leather seats","Push start","Cruise control","Airbags"],
    desc:"Diesel 4x4, driven mostly on motorway. Full service history. Strong engine, no work required.", photos:[] },

  { id:"u109", make:"Suzuki", model:"Wagon R", variant:"VXL", year:2020, km:70000, city:"Raiwind", area:"Raiwind Road",
    price:2350000, trans:"Manual", fuel:"Petrol", engine:"998 cc", color:"Graphite Grey", colorHex:"#4b5563", body:"hatch",
    reg:"Lahore", assembly:"Local", owner:"2nd owner", featured:false,
    features:["Power windows","Power steering","Airbags","ABS"],
    desc:"Economical family car, smooth engine, AC working. Few touch-ups. Ideal for daily use.", photos:[] },

  { id:"u110", make:"Hyundai", model:"Tucson", variant:"FWD A/T GLS Sport", year:2022, km:40000, city:"Islamabad", area:"Bahria Town",
    price:7800000, trans:"Automatic", fuel:"Petrol", engine:"1999 cc", color:"Phantom Black", colorHex:"#111827", body:"suv",
    reg:"Islamabad", assembly:"Local", owner:"1st owner", featured:false,
    features:["Panoramic sunroof","Push start","Leather seats","Reverse camera","Airbags"],
    desc:"Excellent condition Tucson, Hyundai dealership maintained, total genuine. New tyres.", photos:[] },

  { id:"u111", make:"Toyota", model:"Hilux", variant:"Revo V Automatic 2.8", year:2020, km:85000, city:"Kasur", area:"Kasur Bypass",
    price:9800000, trans:"Automatic", fuel:"Diesel", engine:"2755 cc", color:"Silver Metallic", colorHex:"#9ca3af", body:"pickup",
    reg:"Lahore", assembly:"Local", owner:"1st owner", featured:false,
    features:["4x4","Push start","Leather seats","Navigation","Airbags"],
    desc:"Farm owner's vehicle, very well maintained. 4x4 working perfectly. Strong diesel engine.", photos:[] },

  { id:"u112", make:"Changan", model:"Alsvin", variant:"1.5 Lumiere DCT", year:2023, km:25000, city:"Lahore", area:"Bahria Town",
    price:3900000, trans:"Automatic", fuel:"Petrol", engine:"1480 cc", color:"Red", colorHex:"#b91c1c", body:"sedan",
    reg:"Lahore", assembly:"Local", owner:"1st owner", featured:false,
    features:["Sunroof","Push start","Touchscreen","Cruise control","Airbags"],
    desc:"Top variant with sunroof, total genuine, under 25,000 km. Changan dealership services.", photos:[] }
];

/* ---------------- BLOG POSTS ---------------- */
var POSTS = [
  { id:"used-car-checklist", title:"Used Car Buying Checklist for Lahore Buyers (2026)", cat:"Buying Guide", date:"2026-10-10", icon:"fa-clipboard-check", grad:"linear-gradient(135deg,#e11d2e,#7f1d1d)",
    excerpt:"15 things to check before you pay for a used car in Lahore — documents, paint, engine and test drive.",
    body:[
      ["p","Buying a used car can save you lakhs of rupees, but only if you check it properly. Use this checklist before you pay any token money."],
      ["h2","1. Documents first"],
      ["ul",["Original registration book (no duplicate unless explained)","Original file, invoice and transfer letters","Token tax paid up to date","Match chassis and engine numbers with the book","Verify the number online on the Excise & Taxation (MTMIS) portal"]],
      ["h2","2. Body and paint"],
      ["p","Look along the side of the car in daylight. Uneven shine, overspray on rubber seals and different panel gaps all point to repaint or accident repair. A paint thickness gauge gives the clearest answer."],
      ["h2","3. Engine and gearbox"],
      ["ul",["Start the engine cold — listen for knocking or ticking","Check for oil leaks and blue or white smoke","For automatics, gear shifts should be smooth with no jerks","Check coolant colour and level"]],
      ["h2","4. Test drive"],
      ["p","Drive at least 15 minutes on city roads and a stretch of Ring Road or the motorway. Check brakes, steering pull, suspension noise over speed breakers and AC cooling."],
      ["h2","5. Get an inspection"],
      ["p","A professional inspection costs little compared to the price of a car. Mayo Cars can arrange an inspection in Lahore, Raiwind, Kasur and Islamabad — just send us a WhatsApp message."]
    ]},
  { id:"new-car-prices-oct-2026", title:"New Car Prices in Pakistan — October 2026 Update", cat:"Prices", date:"2026-10-08", icon:"fa-tags", grad:"linear-gradient(135deg,#0b1220,#1e3a8a)",
    excerpt:"Latest ex-factory prices of Suzuki, Toyota, Honda, KIA, Hyundai and Changan cars in Pakistan.",
    body:[
      ["p","Here is a quick look at the latest ex-factory prices of popular new cars in Pakistan, as announced by the manufacturers in September–October 2026. Taxes, registration and freight are extra."],
      ["prices",""],
      ["p","Prices change often. Before booking, message Mayo Cars on WhatsApp to confirm the latest price and delivery time."]
    ]},
  { id:"sell-car-best-price", title:"How to Sell Your Car at the Best Price in Lahore", cat:"Selling Tips", date:"2026-10-05", icon:"fa-sack-dollar", grad:"linear-gradient(135deg,#f5b301,#b45309)",
    excerpt:"Simple steps that add real value: cleaning, documents, honest pricing and good photos.",
    body:[
      ["p","A well-prepared car sells faster and at a better price. Here is what works in the Lahore market."],
      ["h2","Prepare the car"],
      ["ul",["Get a full detailing — interior and exterior","Fix small issues like bulbs, wipers and AC gas","Keep all service records together"]],
      ["h2","Price it right"],
      ["p","Check similar cars (same year, variant, mileage and city). Overpriced cars sit for weeks; a fair price gets serious buyers fast."],
      ["h2","Take good photos"],
      ["p","Shoot in daylight: front angle, side, rear, interior, dashboard with odometer and engine bay. Clean photos get many more calls."],
      ["h2","Let Mayo Cars help"],
      ["p","Send your car's details on WhatsApp. We list it, bring genuine buyers and help with a safe transfer."]
    ]},
  { id:"hybrid-vs-petrol", title:"Hybrid vs Petrol Car — Which One Should You Buy in 2026?", cat:"Comparison", date:"2026-09-28", icon:"fa-leaf", grad:"linear-gradient(135deg,#16a34a,#14532d)",
    excerpt:"Running costs, maintenance, resale and who should go hybrid in Pakistan.",
    body:[
      ["p","Hybrids like the Corolla Cross Hybrid, Sportage L HEV and Tucson Hybrid are now locally available. Are they worth the extra price?"],
      ["h2","Fuel savings"],
      ["p","Hybrids save the most in stop-and-go city traffic, which is exactly how most of us drive in Lahore. If you drive a lot every day, savings add up quickly."],
      ["h2","Purchase price"],
      ["p","Hybrid variants cost more upfront. Work out how many kilometres you drive per month to see how long it takes to recover the difference."],
      ["h2","Who should buy a hybrid?"],
      ["ul",["Daily long commuters","Families who keep cars 5+ years","Buyers who want the latest technology"]],
      ["p","Not sure? Message us and we'll help you compare the total cost of both options."]
    ]},
  { id:"car-finance-guide", title:"Car Financing in Pakistan — A Simple Guide", cat:"Finance", date:"2026-09-20", icon:"fa-building-columns", grad:"linear-gradient(135deg,#7c3aed,#4c1d95)",
    excerpt:"Down payment, tenure, markup and documents — what to know before applying for a car loan.",
    body:[
      ["p","Most banks in Pakistan offer car financing for new and used cars. Here are the basics."],
      ["h2","Down payment"],
      ["p","Banks usually ask for a minimum down payment as a percentage of the car price, set by State Bank rules. A bigger down payment means smaller monthly instalments."],
      ["h2","Tenure and markup"],
      ["p","Tenure is typically 1 to 5 years. Markup depends on KIBOR plus the bank's spread, so check the current rate with the bank."],
      ["h2","Documents usually required"],
      ["ul",["CNIC copy","Salary slips or bank statements","Proof of income for business persons","Photographs"]],
      ["p","Use our instalment calculator to estimate your monthly payment, then contact us to arrange the car."]
    ]},
  { id:"best-family-cars", title:"Best Family Cars Under 60 Lakh in Pakistan", cat:"Buying Guide", date:"2026-09-12", icon:"fa-people-roof", grad:"linear-gradient(135deg,#0891b2,#164e63)",
    excerpt:"Our pick of comfortable, reliable family cars for every budget up to 60 lakh.",
    body:[
      ["p","Looking for a reliable car for the family? These new and used options give the best mix of space, comfort and resale."],
      ["h2","New cars"],
      ["ul",["Suzuki Cultus and Swift — affordable and economical","Toyota Yaris — Toyota reliability at an entry price","Honda City 1.2 — roomy rear seat","Changan Alsvin — feature-rich for the price"]],
      ["h2","Used cars"],
      ["ul",["Toyota Corolla (2019–2022)","Honda City (2021–2023)","Toyota Yaris (2021–2023)"]],
      ["p","Browse our listings or tell us your budget on WhatsApp — we'll shortlist cars for you."]
    ]}
];

var BRAND_COLORS = { Toyota:"#eb0a1e", Honda:"#0f172a", Suzuki:"#1d4ed8", KIA:"#05141f", Hyundai:"#002c5f", Changan:"#0e5a9c", MG:"#b91c1c", Haval:"#334155" };
