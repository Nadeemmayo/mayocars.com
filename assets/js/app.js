/* =========================================================
   MAYO CARS — Main script (header, drawer, listings, pages)
   ========================================================= */
(function(){
  var $ = function(s,c){return (c||document).querySelector(s)};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var qs = new URLSearchParams(location.search);

  /* ---------- Formatting ---------- */
  function trim(n){ return String(+n.toFixed(2)); }
  function lac(n){ return n>=10000000 ? trim(n/10000000)+' Crore' : trim(n/100000)+' Lacs'; }
  function rs(n){ return 'Rs '+Number(n).toLocaleString('en-US'); }
  function km(n){ return Number(n).toLocaleString('en-US')+' km'; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]}); }
  function minPrice(c){ return Math.min.apply(null,c.variants.map(function(v){return v.price})); }
  function maxPrice(c){ return Math.max.apply(null,c.variants.map(function(v){return v.price})); }
  function wa(text){ return 'https://wa.me/'+SITE.whatsapp+'?text='+encodeURIComponent(text); }
  function title(c){ return c.year+' '+c.make+' '+c.model+(c.variant?' '+c.variant:''); }
  window.Mayo = {lac:lac, rs:rs, wa:wa};

  /* ---------- Media: real photos or studio illustration ---------- */
  /* photos: "key" (set in PHOTOS, Wikimedia Commons) or ["images/cars/x.jpg", ...] (own photos) */
  function photoList(c){
    if(!c.photos) return [];
    if(typeof c.photos==='string') return (PHOTOS[c.photos]||[]).map(function(f){return {src:localPhoto(f), thumb:localPhoto(f), alt:commonsUrl(f,1280), page:commonsPage(f)}});
    return c.photos.map(function(p){return {src:p, thumb:p, alt:null, page:null}});
  }
  function art(c,i){
    var view = MayoArt.views[i%MayoArt.views.length];
    return MayoArt.svg({body:c.body, color:c.colorHex||c.color, view:view.key, make:c.make, label:c.make+' '+c.model+' '+view.label});
  }
  window.MayoFallback = function(img){
    var alt=img.getAttribute('data-alt'); if(alt){ img.removeAttribute('data-alt'); img.src=alt; return; }
    var k=img.getAttribute('data-car'), i=+img.getAttribute('data-i')||0;
    var c=NEW_CARS.concat(USED_CARS).filter(function(x){return x.id===k})[0];
    if(c && img.parentNode){ var d=document.createElement('div'); d.innerHTML=art(c,i); img.parentNode.replaceChild(d.firstChild,img); }
  };
  function media(c, i, big){
    i=i||0; var ps=photoList(c);
    if(ps.length){
      var p=ps[i%ps.length];
      return '<img src="'+esc(big?p.src:p.thumb)+'" alt="'+esc(c.make+' '+c.model+(c.year?' '+c.year:'')+' photo '+(i+1))+'" loading="lazy" decoding="async" data-car="'+c.id+'" data-i="'+i+'"'+(p.alt?' data-alt="'+esc(p.alt)+'"':'')+' onerror="MayoFallback(this)">';
    }
    return art(c,i);
  }
  function viewCount(c){ var n=photoList(c).length; return n || MayoArt.views.length; }
  function viewLabel(c,i){ return photoList(c).length ? 'Photo' : MayoArt.views[i].label; }
  function photoPage(c,i){ var ps=photoList(c); return ps.length ? ps[i%ps.length].page : null; }
  window.MayoPhoto = function(key,i){ var a=PHOTOS[key]||[]; return a.length?localPhoto(a[(i||0)%a.length]):''; };
  window.MayoPhotoAlt = function(key,i){ var a=PHOTOS[key]||[]; return a.length?commonsUrl(a[(i||0)%a.length],960):''; };
  window.MayoImgErr = function(img){ var alt=img.getAttribute('data-alt'); if(alt){ img.removeAttribute('data-alt'); img.src=alt; } else { img.remove(); } };

  /* ---------- Cards ---------- */
  function usedCard(c){
    return '<article class="car-card reveal">'+
      '<a href="car-detail.html?id='+c.id+'" class="car-media" aria-label="'+esc(title(c))+'">'+
        (c.featured?'<span class="tag feat"><i class="fa-solid fa-crown"></i> Featured</span>':'<span class="tag">Used</span>')+
        '<span class="tag demo">Demo</span>'+media(c,0)+'</a>'+
      '<div class="car-body">'+
        '<span class="sub"><i class="fa-solid fa-location-dot"></i> '+esc(c.city)+(c.area?' · '+esc(c.area):'')+'</span>'+
        '<h3><a href="car-detail.html?id='+c.id+'">'+esc(title(c))+'</a></h3>'+
        '<div class="price">PKR '+lac(c.price)+'</div>'+
        '<div class="specs"><span><i class="fa-regular fa-calendar"></i>'+c.year+'</span><span><i class="fa-solid fa-gauge"></i>'+km(c.km)+'</span><span><i class="fa-solid fa-gas-pump"></i>'+c.fuel+'</span><span><i class="fa-solid fa-gears"></i>'+c.trans+'</span></div>'+
        '<div class="car-actions"><a class="btn btn-ghost" href="car-detail.html?id='+c.id+'">Details</a><a class="btn btn-wa" target="_blank" rel="noopener" href="'+wa('Assalam o Alaikum, I am interested in '+title(c)+' (PKR '+lac(c.price)+') listed on mayocars.com. Is it available?')+'"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></div>'+
      '</div></article>';
  }
  function newCard(c){
    var mn=minPrice(c), mx=maxPrice(c);
    return '<article class="car-card reveal">'+
      '<a href="car-detail.html?type=new&id='+c.id+'" class="car-media" aria-label="'+esc(c.make+' '+c.model)+'"><span class="tag new">New '+c.year+'</span>'+media(c,0)+'</a>'+
      '<div class="car-body">'+
        '<span class="sub">'+esc(c.segment)+'</span>'+
        '<h3><a href="car-detail.html?type=new&id='+c.id+'">'+esc(c.make+' '+c.model+' '+c.year)+'</a></h3>'+
        '<div class="price">PKR '+lac(mn)+(mx>mn?' <small>– '+lac(mx)+'</small>':'')+'</div>'+
        '<div class="specs"><span><i class="fa-solid fa-gauge-high"></i>'+esc(c.engine)+'</span><span><i class="fa-solid fa-gears"></i>'+esc(c.trans)+'</span><span><i class="fa-solid fa-layer-group"></i>'+c.variants.length+' variant'+(c.variants.length>1?'s':'')+'</span></div>'+
        '<div class="car-actions"><a class="btn btn-ghost" href="car-detail.html?type=new&id='+c.id+'">Prices & Specs</a><a class="btn btn-wa" target="_blank" rel="noopener" href="'+wa('Assalam o Alaikum, I want to book a new '+c.make+' '+c.model+'. Please share the latest price and delivery time.')+'"><i class="fa-brands fa-whatsapp"></i> Book</a></div>'+
      '</div></article>';
  }
  function render(el, html, emptyMsg){
    if(!el) return;
    el.innerHTML = html || '<div class="empty" style="grid-column:1/-1"><i class="fa-solid fa-car-burst"></i><p>'+(emptyMsg||'No cars found. Try changing the filters.')+'</p></div>';
    reveal();
  }

  /* ---------- Header / drawer / misc ---------- */
  function initChrome(){
    var header=$('.site-header'), drawer=$('#drawer'), overlay=$('#overlay'), top=$('#toTop');
    window.addEventListener('scroll',function(){
      if(header) header.classList.toggle('scrolled', scrollY>20);
      if(top) top.classList.toggle('show', scrollY>500);
    });
    function open(){drawer.classList.add('show');overlay.classList.add('show');document.body.style.overflow='hidden'}
    function close(){drawer.classList.remove('show');overlay.classList.remove('show');document.body.style.overflow='';var f=$('.filters');if(f)f.classList.remove('show')}
    $$('[data-open-drawer]').forEach(function(b){b.addEventListener('click',open)});
    $$('[data-close-drawer]').forEach(function(b){b.addEventListener('click',close)});
    if(overlay) overlay.addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
    if(top) top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
    var y=$('#year'); if(y) y.textContent=new Date().getFullYear();
    $$('[data-type-icon]').forEach(function(el){el.innerHTML=MayoArt.icon(el.getAttribute('data-type-icon'))});
  }
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08}) : null;
  function reveal(){ $$('.reveal:not(.in)').forEach(function(el){ io?io.observe(el):el.classList.add('in') }); }
  function toast(msg){ var t=$('#toast'); if(!t)return; t.textContent=msg; t.classList.add('show'); setTimeout(function(){t.classList.remove('show')},2600); }

  /* ---------- Forms → WhatsApp ---------- */
  function initWaForms(){
    $$('form[data-wa]').forEach(function(f){
      f.addEventListener('submit',function(e){
        e.preventDefault();
        if(!f.reportValidity()) return;
        var lines=['*'+f.getAttribute('data-wa')+'* — mayocars.com',''];
        $$('input,select,textarea',f).forEach(function(el){
          if(!el.name || el.type==='submit') return;
          if((el.type==='radio'||el.type==='checkbox') && !el.checked) return;
          if(!el.value) return;
          lines.push('• '+el.name+': '+el.value);
        });
        window.open(wa(lines.join('\n')),'_blank');
        toast('Opening WhatsApp… send the message to complete.');
      });
    });
  }

  /* ---------- Search form (home) ---------- */
  function initSearch(){
    var f=$('#searchForm'); if(!f) return;
    $$('.tab').forEach(function(t){
      t.addEventListener('click',function(){
        $$('.tab').forEach(function(x){x.classList.remove('active')}); t.classList.add('active');
        f.setAttribute('action', t.getAttribute('data-target'));
      });
    });
  }

  /* ---------- Filters (used listing) ---------- */
  function fillSelect(sel, values, label){
    if(!sel) return;
    var cur=sel.value;
    sel.innerHTML='<option value="">'+label+'</option>'+values.map(function(v){return '<option'+(v==cur?' selected':'')+'>'+esc(v)+'</option>'}).join('');
  }
  function uniq(arr){ return arr.filter(function(v,i,a){return a.indexOf(v)===i}).sort(); }

  function usedPage(){
    var grid=$('#usedGrid'); if(!grid) return;
    var form=$('#filterForm');
    var fixedCity = grid.getAttribute('data-city');
    fillSelect(form.make, uniq(USED_CARS.map(function(c){return c.make})), 'All makes');
    fillSelect(form.city, uniq(USED_CARS.map(function(c){return c.city})), 'All cities');
    fillSelect(form.body, ['sedan','hatch','suv','crossover','pickup'], 'All body types');
    ['make','city','body','trans','fuel','price','q','year'].forEach(function(k){ if(qs.get(k) && form[k]) form[k].value=qs.get(k); });
    if(qs.get('model') && form.q) form.q.value=qs.get('model');
    if(qs.get('type') && form.body) form.body.value = qs.get('type')==='hatchback'?'hatch':qs.get('type');
    if(fixedCity && form.city){ form.city.value=fixedCity; }
    function apply(){
      var v={}; ['make','city','body','trans','fuel','price','q','year'].forEach(function(k){v[k]=form[k]?form[k].value:''});
      var list=USED_CARS.filter(function(c){
        if(v.make && c.make!==v.make) return false;
        if(v.city && c.city!==v.city) return false;
        if(v.body && c.body!==v.body) return false;
        if(v.trans && c.trans!==v.trans) return false;
        if(v.fuel && c.fuel!==v.fuel) return false;
        if(v.year && c.year<+v.year) return false;
        if(v.price){ var p=v.price.split('-'); if(p[0] && c.price<+p[0]) return false; if(p[1] && c.price>+p[1]) return false; }
        if(v.q && (c.make+' '+c.model+' '+c.variant).toLowerCase().indexOf(v.q.toLowerCase())<0) return false;
        return true;
      });
      var s=$('#sortBy')?$('#sortBy').value:'';
      list.sort(function(a,b){
        if(s==='price-asc') return a.price-b.price;
        if(s==='price-desc') return b.price-a.price;
        if(s==='year-desc') return b.year-a.year;
        if(s==='km-asc') return a.km-b.km;
        return (b.featured?1:0)-(a.featured?1:0);
      });
      $('#resultCount').innerHTML='<b>'+list.length+'</b> car'+(list.length!==1?'s':'')+' found';
      render(grid, list.map(usedCard).join(''));
    }
    form.addEventListener('input',apply); form.addEventListener('change',apply);
    form.addEventListener('submit',function(e){e.preventDefault();apply();var f=$('.filters');if(f)f.classList.remove('show');$('#overlay').classList.remove('show')});
    var rb=$('#resetFilters'); if(rb) rb.addEventListener('click',function(){form.reset(); if(fixedCity)form.city.value=fixedCity; apply()});
    if($('#sortBy')) $('#sortBy').addEventListener('change',apply);
    var ft=$('.filter-toggle'); if(ft) ft.addEventListener('click',function(){$('.filters').classList.add('show');$('#overlay').classList.add('show')});
    apply();
  }

  function newPage(){
    var grid=$('#newGrid'); if(!grid) return;
    var mk=$('#newMake'), bd=$('#newBody'), bud=$('#newBudget'), s=$('#newSort');
    fillSelect(mk, uniq(NEW_CARS.map(function(c){return c.make})), 'All makes');
    if(qs.get('make')) mk.value=qs.get('make');
    function apply(){
      var list=NEW_CARS.filter(function(c){
        if(mk.value && c.make!==mk.value) return false;
        if(bd.value && c.body!==bd.value) return false;
        if(bud.value){ var p=bud.value.split('-'); var m=minPrice(c); if(p[0]&&m<+p[0])return false; if(p[1]&&m>+p[1])return false; }
        return true;
      });
      list.sort(function(a,b){ return s.value==='price-desc'? minPrice(b)-minPrice(a) : minPrice(a)-minPrice(b); });
      $('#newCount').innerHTML='<b>'+list.length+'</b> model'+(list.length!==1?'s':'');
      render(grid, list.map(newCard).join(''));
    }
    [mk,bd,bud,s].forEach(function(el){el.addEventListener('change',apply)});
    apply();
    var pt=$('#priceTable');
    if(pt){ pt.innerHTML = priceRows(); }
  }
  function priceRows(){
    return NEW_CARS.map(function(c){
      return c.variants.map(function(v,i){
        return '<tr>'+(i===0?'<td rowspan="'+c.variants.length+'"><a href="car-detail.html?type=new&id='+c.id+'"><b>'+esc(c.make+' '+c.model)+'</b></a></td>':'')+'<td>'+esc(v.name)+'</td><td class="r">'+rs(v.price)+'</td></tr>';
      }).join('');
    }).join('');
  }

  /* ---------- Gallery ---------- */
  function gallery(c){
    var n=viewCount(c), cur=0, box=$('#gallery');
    var thumbs=''; for(var i=0;i<n;i++) thumbs+='<button type="button" data-i="'+i+'" aria-label="'+esc(viewLabel(c,i))+'">'+media(c,i)+'</button>';
    box.innerHTML='<div class="g-main"><div id="gMain"></div><button class="nav-btn prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button><button class="nav-btn next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button><span class="view-label" id="gLabel"></span></div><div class="g-thumbs">'+thumbs+'</div><p class="g-credit" id="gCredit"></p>';
    function show(i){ cur=(i+n)%n; $('#gMain').innerHTML=media(c,cur,true); var el=$('#gMain').firstChild; if(el&&el.style) el.style.cssText='width:100%;height:100%;object-fit:cover';
      var pg=photoPage(c,cur); $('#gLabel').innerHTML=esc(viewLabel(c,cur))+' '+(cur+1)+' / '+n; var cr=$('#gCredit'); if(cr) cr.innerHTML = pg ? '<i class="fa-regular fa-copyright"></i> Photo: <a href="'+pg+'" target="_blank" rel="noopener">Wikimedia Commons</a> (free licence) · representative image' : '';
      $$('.g-thumbs button').forEach(function(b,j){b.classList.toggle('active',j===cur)}); }
    $$('.g-thumbs button').forEach(function(b){b.addEventListener('click',function(){show(+b.getAttribute('data-i'))})});
    $('.g-main .prev').addEventListener('click',function(){show(cur-1)});
    $('.g-main .next').addEventListener('click',function(){show(cur+1)});
    var sx=null; $('.g-main').addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
    $('.g-main').addEventListener('touchend',function(e){ if(sx===null)return; var dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>40) show(cur+(dx<0?1:-1)); sx=null; });
    show(0);
  }

  function detailPage(){
    var root=$('#detail'); if(!root) return;
    var id=qs.get('id'), isNew=qs.get('type')==='new';
    var c = isNew ? NEW_CARS.filter(function(x){return x.id===id})[0] : USED_CARS.filter(function(x){return x.id===id})[0];
    if(!c && !id){ c=USED_CARS[0]; isNew=false; }
    if(!c){ c=NEW_CARS.filter(function(x){return x.id===id})[0]; if(c) isNew=true; }
    if(!c){ root.innerHTML='<div class="empty"><i class="fa-solid fa-car-burst"></i><p>Sorry, this car was not found. It may have been sold.</p><p style="margin-top:14px"><a class="btn btn-red" href="used-cars.html">Browse used cars</a></p></div>'; return; }

    var name = isNew ? c.make+' '+c.model+' '+c.year : title(c);
    document.title = name+(isNew?' Price in Pakistan & Specs':' for Sale in '+c.city)+' | Mayo Cars';
    var md=$('meta[name=description]'); if(md) md.setAttribute('content', isNew ? name+' latest price in Pakistan: '+c.variants.map(function(v){return v.name+' '+rs(v.price)}).join(', ')+'. Book with Mayo Cars.' : name+' for sale in '+c.city+' — PKR '+lac(c.price)+', '+km(c.km)+'. Contact Mayo Cars on WhatsApp.');
    $('#crumbName').textContent=name;
    $('#crumbType').innerHTML = isNew ? '<a href="new-cars.html">New Cars</a>' : '<a href="used-cars.html">Used Cars</a>';
    $('#dTitle').textContent=name;

    var waMsg = isNew ? 'Assalam o Alaikum, I want to book a new '+c.make+' '+c.model+'. Please share the latest price and delivery time.' : 'Assalam o Alaikum, I am interested in '+name+' (PKR '+lac(c.price)+') on mayocars.com. Is it available?';
    var side='';
    if(isNew){
      side+='<div class="panel"><span class="tag new" style="position:static;display:inline-block;margin-bottom:8px">New '+c.year+'</span><h1 class="d-title">'+esc(name)+'</h1>'+
        '<div class="d-price">PKR '+lac(minPrice(c))+(maxPrice(c)>minPrice(c)?' – '+lac(maxPrice(c)):'')+'</div>'+
        '<div class="d-loc">Ex-factory price · checked '+SITE.pricesCheckedOn+'</div></div>';
    } else {
      side+='<div class="panel"><span class="tag" style="position:static;display:inline-block;margin-bottom:8px">Used · Demo listing</span><h1 class="d-title">'+esc(name)+'</h1>'+
        '<div class="d-price">PKR '+lac(c.price)+'</div><div class="d-loc"><i class="fa-solid fa-location-dot"></i> '+esc(c.area+', '+c.city)+'</div></div>';
    }
    side+='<div class="panel"><div class="seller"><div class="av">WM</div><div><b>'+esc(SITE.owner)+'</b><span>Mayo Cars · '+SITE.areas.join(', ')+'</span></div></div>'+
      '<div class="stack"><a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="'+wa(waMsg)+'"><i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp</a>'+
      '<a class="btn btn-red btn-block" href="tel:'+SITE.phone1.replace(/\s/g,'')+'"><i class="fa-solid fa-phone"></i> Call '+SITE.phone1+'</a>'+
      '<a class="btn btn-ghost btn-block" href="tel:'+SITE.phone2.replace(/\s/g,'')+'"><i class="fa-solid fa-phone"></i> '+SITE.phone2+'</a>'+
      '<a class="btn btn-ghost btn-block" href="compare.html?a='+c.id+'"><i class="fa-solid fa-code-compare"></i> Compare this car</a></div></div>'+
      '<div class="note"><i class="fa-solid fa-shield-halved"></i>Safety tip: inspect the car and verify documents before paying any amount. '+(isNew?'Prices are ex-factory; taxes, registration and freight are extra and can change.':'This is a demo listing for preview.')+'</div>';
    $('#dSide').innerHTML=side;

    var main='';
    if(isNew){
      main+='<div class="panel"><h2>'+esc(c.make+' '+c.model)+' '+c.year+' Price List</h2><div class="table-wrap"><table class="table"><thead><tr><th>Variant</th><th style="text-align:right">Ex-factory price</th></tr></thead><tbody>'+
        c.variants.map(function(v){return '<tr><td>'+esc(v.name)+'</td><td class="r">'+rs(v.price)+'<br><small style="color:var(--muted);font-weight:500">PKR '+lac(v.price)+'</small></td></tr>'}).join('')+'</tbody></table></div></div>';
      main+='<div class="panel"><h2>Key Specifications</h2><div class="kv">'+
        '<div><i class="fa-solid fa-gauge-high"></i><span>Engine</span><b>'+esc(c.engine)+'</b></div>'+
        '<div><i class="fa-solid fa-gears"></i><span>Transmission</span><b>'+esc(c.trans)+'</b></div>'+
        '<div><i class="fa-solid fa-gas-pump"></i><span>Fuel</span><b>'+esc(c.fuel)+'</b></div>'+
        '<div><i class="fa-solid fa-users"></i><span>Seats</span><b>'+c.seats+'</b></div>'+
        '<div><i class="fa-solid fa-car-side"></i><span>Body</span><b>'+esc(c.segment)+'</b></div>'+
        '<div><i class="fa-solid fa-industry"></i><span>Assembly</span><b>Local</b></div></div></div>';
      main+='<div class="panel"><h2>Why buy the '+esc(c.model)+'?</h2><p style="color:var(--muted);margin-bottom:14px">'+esc(c.desc)+'</p><div class="chips">'+c.highlights.map(function(h){return '<span class="chip"><i class="fa-solid fa-circle-check"></i>'+esc(h)+'</span>'}).join('')+'</div></div>';
    } else {
      main+='<div class="panel"><h2>Overview</h2><div class="kv">'+
        '<div><i class="fa-regular fa-calendar"></i><span>Model year</span><b>'+c.year+'</b></div>'+
        '<div><i class="fa-solid fa-gauge"></i><span>Mileage</span><b>'+km(c.km)+'</b></div>'+
        '<div><i class="fa-solid fa-gas-pump"></i><span>Fuel</span><b>'+c.fuel+'</b></div>'+
        '<div><i class="fa-solid fa-gears"></i><span>Transmission</span><b>'+c.trans+'</b></div>'+
        '<div><i class="fa-solid fa-gauge-high"></i><span>Engine</span><b>'+c.engine+'</b></div>'+
        '<div><i class="fa-solid fa-palette"></i><span>Colour</span><b>'+esc(c.color)+'</b></div></div></div>';
      main+='<div class="panel"><h2>Car Details</h2><div class="table-wrap"><table class="table"><tbody>'+
        [['Make',c.make],['Model',c.model],['Variant',c.variant],['Registered in',c.reg],['Assembly',c.assembly],['Ownership',c.owner],['Location',c.area+', '+c.city],['Ad ref',c.id.toUpperCase()]].map(function(r){return '<tr><th>'+r[0]+'</th><td>'+esc(r[1])+'</td></tr>'}).join('')+
        '</tbody></table></div></div>';
      main+='<div class="panel"><h2>Features</h2><div class="chips">'+c.features.map(function(h){return '<span class="chip"><i class="fa-solid fa-circle-check"></i>'+esc(h)+'</span>'}).join('')+'</div></div>';
      main+='<div class="panel"><h2>Seller\'s Comments</h2><p style="color:var(--muted)">'+esc(c.desc)+'</p></div>';
    }
    $('#dMain').innerHTML=main;
    gallery(c);

    var sim = isNew ? NEW_CARS.filter(function(x){return x.id!==c.id && (x.body===c.body||x.make===c.make)}).slice(0,3).map(newCard)
                    : USED_CARS.filter(function(x){return x.id!==c.id && (x.body===c.body||x.city===c.city)}).slice(0,3).map(usedCard);
    render($('#similar'), sim.join(''));

    var ld = isNew ? {"@context":"https://schema.org","@type":"Product","name":name,"brand":{"@type":"Brand","name":c.make},"description":c.desc,"offers":{"@type":"AggregateOffer","priceCurrency":"PKR","lowPrice":minPrice(c),"highPrice":maxPrice(c),"offerCount":c.variants.length}}
                   : {"@context":"https://schema.org","@type":"Car","name":name,"brand":{"@type":"Brand","name":c.make},"model":c.model,"vehicleModelDate":String(c.year),"mileageFromOdometer":{"@type":"QuantitativeValue","value":c.km,"unitCode":"KMT"},"fuelType":c.fuel,"vehicleTransmission":c.trans,"color":c.color,"offers":{"@type":"Offer","priceCurrency":"PKR","price":c.price,"availability":"https://schema.org/InStock"}};
    var s=document.createElement('script'); s.type='application/ld+json'; s.textContent=JSON.stringify(ld); document.head.appendChild(s);
  }

  /* ---------- Compare ---------- */
  function comparePage(){
    var root=$('#compare'); if(!root) return;
    var all = NEW_CARS.map(function(c){return {key:'n:'+c.id, label:'New · '+c.make+' '+c.model, car:c, isNew:true}})
      .concat(USED_CARS.map(function(c){return {key:'u:'+c.id, label:'Used · '+title(c)+' ('+c.city+')', car:c, isNew:false}}));
    var picks=['n:toyota-corolla','n:honda-civic','n:toyota-yaris'];
    var a=qs.get('a'); if(a){ var f=all.filter(function(x){return x.car.id===a})[0]; if(f) picks[0]=f.key; }
    var opts=function(sel){return '<option value="">— Select a car —</option>'+all.map(function(x){return '<option value="'+x.key+'"'+(x.key===sel?' selected':'')+'>'+esc(x.label)+'</option>'}).join('')};
    $('#cmpPick').innerHTML=[0,1,2].map(function(i){return '<div class="cmp-slot"><div class="field"><label>Car '+(i+1)+'</label><select data-slot="'+i+'">'+opts(picks[i])+'</select></div><div class="car-media" id="cmpImg'+i+'"></div></div>'}).join('');
    function row(label, fn, best){
      var vals=picks.map(function(k){var x=all.filter(function(y){return y.key===k})[0]; return x?fn(x):null});
      var nums=vals.map(function(v){return v&&typeof v.n==='number'?v.n:null}).filter(function(v){return v!==null});
      var bestV = best && nums.length>1 ? (best==='min'?Math.min.apply(null,nums):Math.max.apply(null,nums)) : null;
      return '<tr><th>'+label+'</th>'+vals.map(function(v){ if(!v) return '<td>—</td>'; return '<td'+(bestV!==null&&v.n===bestV?' class="best"':'')+'>'+v.t+'</td>'}).join('')+'</tr>';
    }
    function draw(){
      picks.forEach(function(k,i){var x=all.filter(function(y){return y.key===k})[0]; $('#cmpImg'+i).innerHTML = x?media(x.car,0):''; });
      var t='<div class="table-wrap"><table class="table cmp-table"><tbody>'+
        row('Car',function(x){return {t:'<b>'+esc(x.isNew?x.car.make+' '+x.car.model:title(x.car))+'</b>'}})+
        row('Condition',function(x){return {t:x.isNew?'<span style="color:var(--green);font-weight:600">New '+x.car.year+'</span>':'Used ('+x.car.year+')'}})+
        row('Price',function(x){var p=x.isNew?minPrice(x.car):x.car.price; return {t:'PKR '+lac(p)+(x.isNew?' <small>(from)</small>':''),n:p}},'min')+
        row('Engine',function(x){return {t:esc(x.car.engine)}})+
        row('Transmission',function(x){return {t:esc(x.car.trans)}})+
        row('Fuel',function(x){return {t:esc(x.car.fuel)}})+
        row('Body type',function(x){return {t:esc(x.isNew?x.car.segment:x.car.body)}})+
        row('Mileage',function(x){return x.isNew?{t:'0 km (new)',n:0}:{t:km(x.car.km),n:x.car.km}},'min')+
        row('Seats',function(x){return {t:String(x.car.seats||5)}})+
        row('Location',function(x){return {t:x.isNew?'Booking via Mayo Cars':esc(x.car.city)}})+
        row('Highlights',function(x){return {t:(x.isNew?x.car.highlights:x.car.features).slice(0,4).map(esc).join('<br>')}})+
        row('',function(x){return {t:'<a class="btn btn-red btn-sm" href="car-detail.html?'+(x.isNew?'type=new&':'')+'id='+x.car.id+'">View details</a>'}})+
        '</tbody></table></div>';
      $('#cmpTable').innerHTML=t;
    }
    $$('#cmpPick select').forEach(function(s){s.addEventListener('change',function(){picks[+s.getAttribute('data-slot')]=s.value;draw()})});
    draw();
  }

  /* ---------- Finance calculator ---------- */
  function financePage(){
    var root=$('#calc'); if(!root) return;
    var price=$('#cPrice'), down=$('#cDown'), rate=$('#cRate'), years=$('#cYears'), pick=$('#cCar');
    pick.innerHTML='<option value="">Choose a new car (optional)</option>'+NEW_CARS.map(function(c){return c.variants.map(function(v){return '<option value="'+v.price+'">'+esc(c.make+' '+c.model+' — '+v.name)+'</option>'}).join('')}).join('');
    pick.addEventListener('change',function(){ if(pick.value){ price.value=pick.value; calc(); } });
    function calc(){
      var P=+price.value, dp=P*(+down.value)/100, L=P-dp, r=(+rate.value)/1200, n=(+years.value)*12;
      var emi = r===0 ? L/n : L*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
      var total=emi*n;
      $('#vPrice').textContent=rs(P); $('#vDown').textContent=down.value+'% · '+rs(Math.round(dp));
      $('#vRate').textContent=rate.value+'%'; $('#vYears').textContent=years.value+' year'+(years.value>1?'s':'');
      $('#rEmi').textContent=rs(Math.round(emi)); $('#rLoan').textContent=rs(Math.round(L));
      $('#rInt').textContent=rs(Math.round(total-L)); $('#rTotal').textContent=rs(Math.round(total+dp));
      $('#rWa').href=wa('Assalam o Alaikum, I want to buy a car on instalments. Car price: '+rs(P)+', down payment '+down.value+'%, '+years.value+' years. Estimated monthly: '+rs(Math.round(emi))+'. Please guide me.');
    }
    [price,down,rate,years].forEach(function(el){el.addEventListener('input',calc)});
    if(qs.get('price')) price.value=qs.get('price');
    calc();
  }

  /* ---------- Blog ---------- */
  function blogPage(){
    var g=$('#blogGrid');
    if(g){
      g.innerHTML=POSTS.map(function(p){return '<a class="post reveal" href="blog-post.html?id='+p.id+'"><div class="thumb" style="background:'+p.grad+'"><img src="'+MayoPhoto(p.photo,0)+'" data-alt="'+MayoPhotoAlt(p.photo,0)+'" alt="" loading="lazy" onerror="MayoImgErr(this)"><i class="fa-solid '+p.icon+'"></i><span>'+esc(p.cat)+'</span></div><div class="pb"><span class="meta"><i class="fa-regular fa-calendar"></i> '+new Date(p.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.excerpt)+'</p><span class="link-arrow" style="margin-top:12px">Read more <i class="fa-solid fa-arrow-right"></i></span></div></a>'}).join('');
      reveal();
    }
    var art=$('#post');
    if(art){
      var p=POSTS.filter(function(x){return x.id===qs.get('id')})[0]||POSTS[0];
      document.title=p.title+' | Mayo Cars Blog';
      var md=$('meta[name=description]'); if(md) md.setAttribute('content',p.excerpt);
      $('#postTitle').textContent=p.title; $('#crumbName').textContent=p.title;
      $('#postMeta').innerHTML='<i class="fa-regular fa-calendar"></i> '+new Date(p.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})+' &nbsp;·&nbsp; '+esc(p.cat)+' &nbsp;·&nbsp; By '+esc(SITE.owner);
      art.innerHTML=p.body.map(function(b){
        if(b[0]==='p') return '<p>'+esc(b[1])+'</p>';
        if(b[0]==='h2') return '<h2>'+esc(b[1])+'</h2>';
        if(b[0]==='ul') return '<ul>'+b[1].map(function(li){return '<li>'+esc(li)+'</li>'}).join('')+'</ul>';
        if(b[0]==='prices') return '<div class="table-wrap" style="margin:16px 0"><table class="table"><thead><tr><th>Model</th><th>Variant</th><th style="text-align:right">Ex-factory price</th></tr></thead><tbody>'+priceRows()+'</tbody></table></div>';
        return '';
      }).join('')+'<div class="cta" style="margin-top:28px;padding:28px"><div><h2 style="font-size:22px">Need help choosing a car?</h2><p>Message Mayo Cars on WhatsApp — free advice, no pressure.</p></div><div class="btns"><a class="btn btn-gold" target="_blank" rel="noopener" href="'+wa('Assalam o Alaikum, I read your article "'+p.title+'" and need some advice.')+'"><i class="fa-brands fa-whatsapp"></i> WhatsApp us</a></div></div>';
      var more=$('#morePosts');
      if(more) more.innerHTML=POSTS.filter(function(x){return x.id!==p.id}).slice(0,3).map(function(q){return '<a class="post reveal" href="blog-post.html?id='+q.id+'"><div class="thumb" style="background:'+q.grad+'"><img src="'+MayoPhoto(q.photo,0)+'" data-alt="'+MayoPhotoAlt(q.photo,0)+'" alt="" loading="lazy" onerror="MayoImgErr(this)"><i class="fa-solid '+q.icon+'"></i><span>'+esc(q.cat)+'</span></div><div class="pb"><h3>'+esc(q.title)+'</h3><p>'+esc(q.excerpt)+'</p></div></a>'}).join('');
      reveal();
    }
  }

  /* ---------- Home ---------- */
  function homePage(){
    var f=$('#homeUsed'); if(f) render(f, USED_CARS.filter(function(c){return c.featured}).slice(0,6).map(usedCard).join(''));
    var n=$('#homeNew'); if(n) render(n, ['suzuki-alto','toyota-corolla','honda-civic','kia-sportage'].map(function(id){return NEW_CARS.filter(function(c){return c.id===id})[0]}).filter(Boolean).map(newCard).join(''));
    $$('[data-photo]').forEach(function(el){ var u=MayoPhoto(el.getAttribute('data-photo'), +el.getAttribute('data-photo-i')||0, +el.getAttribute('data-photo-w')||1000); if(u){ var im=new Image(); im.onload=function(){ el.style.backgroundImage='url("'+u+'")'; el.classList.add('has-photo'); }; im.src=u; } });
    $$('[data-count-make]').forEach(function(el){var m=el.getAttribute('data-count-make'); var u=USED_CARS.filter(function(c){return c.make===m}).length, nn=NEW_CARS.filter(function(c){return c.make===m}).length; el.textContent=nn+' new · '+u+' used';});
    $$('[data-count-city]').forEach(function(el){var m=el.getAttribute('data-count-city'); var u=USED_CARS.filter(function(c){return c.city===m}).length; el.textContent= el.tagName==='SMALL' ? (u? u+' car'+(u!==1?'s':''):'') : u+' car'+(u!==1?'s':'')+' available now';});
  }

  document.addEventListener('DOMContentLoaded',function(){
    initChrome(); initWaForms(); initSearch();
    homePage(); usedPage(); newPage(); detailPage(); comparePage(); financePage(); blogPage();
    reveal();
  });
})();
