/* =========================================================
   MAYO CARS — Studio car illustrations (SVG)
   Used automatically when a car has no real photos yet.
   Add real photos in assets/js/data.js -> photos:[...]
   ========================================================= */
(function(){
  var uid = 0;

  function shade(hex, amt){
    hex = hex.replace('#','');
    if(hex.length===3){hex=hex.split('').map(function(c){return c+c}).join('')}
    var n=parseInt(hex,16), r=(n>>16)&255, g=(n>>8)&255, b=n&255;
    function f(c){ c = amt<0 ? c*(1+amt) : c+(255-c)*amt; return Math.max(0,Math.min(255,Math.round(c))); }
    return '#'+[f(r),f(g),f(b)].map(function(c){return ('0'+c.toString(16)).slice(-2)}).join('');
  }

  function defs(id, color, dark){
    var bgTop = dark ? '#1b2742' : '#f3f6fb';
    var bgBot = dark ? '#0b1220' : '#d6deea';
    return '<defs>'+
      '<linearGradient id="bg'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+bgTop+'"/><stop offset=".72" stop-color="'+bgBot+'"/><stop offset="1" stop-color="'+(dark?'#070c16':'#c5cfde')+'"/></linearGradient>'+
      '<radialGradient id="spot'+id+'" cx=".5" cy=".35" r=".6"><stop offset="0" stop-color="#fff" stop-opacity="'+(dark?'.10':'.75')+'"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="paint'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+shade(color,.35)+'"/><stop offset=".45" stop-color="'+color+'"/><stop offset="1" stop-color="'+shade(color,-.45)+'"/></linearGradient>'+
      '<linearGradient id="glass'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b6b86"/><stop offset=".5" stop-color="#1c2638"/><stop offset="1" stop-color="#0d1320"/></linearGradient>'+
      '<linearGradient id="rim'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f4f9"/><stop offset=".5" stop-color="#9aa5b6"/><stop offset="1" stop-color="#5b6576"/></linearGradient>'+
      '<radialGradient id="shadow'+id+'" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="light'+id+'" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfe3ff"/></linearGradient>'+
    '</defs>';
  }

  function backdrop(id, dark){
    return '<rect width="640" height="400" fill="url(#bg'+id+')"/>'+
      '<ellipse cx="320" cy="150" rx="330" ry="170" fill="url(#spot'+id+')"/>'+
      '<path d="M0 318 Q320 300 640 318 L640 400 L0 400 Z" fill="'+(dark?'#0a101d':'#c9d2e0')+'" opacity=".55"/>';
  }

  function wheel(id, cx, cy, r){
    var spokes='';
    for(var i=0;i<5;i++){
      var a=(i*72-90)*Math.PI/180, x=cx+Math.cos(a)*r*.62, y=cy+Math.sin(a)*r*.62;
      spokes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="#4a5363" stroke-width="'+(r*.16).toFixed(1)+'" stroke-linecap="round"/>';
    }
    return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#151a23"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-3)+'" fill="none" stroke="#2a313d" stroke-width="2"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*.68).toFixed(1)+'" fill="url(#rim'+id+')"/>'+
      spokes+
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*.68).toFixed(1)+'" fill="none" stroke="#e8edf4" stroke-width="2" opacity=".7"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*.15).toFixed(1)+'" fill="#d7dde6" stroke="#5b6576" stroke-width="2"/>';
  }

  var SIDE = {
    sedan:{w:[170,470],r:44,
      body:'M70,285 C70,262 82,248 110,244 L200,236 C232,206 262,186 300,182 L390,180 C430,180 455,196 486,226 L548,236 C574,240 586,256 588,276 L590,292 Q590,302 580,302 L520,302 A50,50 0 0 0 420,302 L220,302 A50,50 0 0 0 120,302 L82,302 Q70,302 70,292 Z',
      glass:'M214,237 C240,212 266,197 300,194 L384,193 C418,193 440,206 466,231 Z',pillar:[342,194,342,234],door:[340,236,340,296],head:'M74,258 L104,250 L112,262 L78,268 Z',tail:'M572,246 L588,256 L588,268 L568,262 Z',mirror:[214,236],waist:'M100,256 L560,248'},
    hatch:{w:[180,452],r:44,
      body:'M88,288 C88,262 100,250 126,246 L208,236 C238,204 266,184 304,180 L418,178 C456,178 486,198 510,236 L532,248 C544,254 548,266 548,280 L548,294 Q548,302 538,302 L502,302 A50,50 0 0 0 402,302 L230,302 A50,50 0 0 0 130,302 L98,302 Q88,302 88,292 Z',
      glass:'M222,237 C248,210 274,194 306,191 L414,190 C446,190 472,206 494,236 Z',pillar:[352,191,352,234],door:[350,236,350,296],head:'M92,260 L120,252 L126,264 L94,270 Z',tail:'M530,246 L546,252 L546,268 L528,264 Z',mirror:[222,236],waist:'M118,258 L530,250'},
    crossover:{w:[172,468],r:47,
      body:'M70,288 C70,258 82,242 110,236 L198,226 C226,196 252,172 290,166 L440,163 C482,163 508,182 530,214 L556,232 C574,240 582,256 582,276 L582,292 Q582,302 572,302 L521,302 A53,53 0 0 0 415,302 L225,302 A53,53 0 0 0 119,302 L80,302 Q70,302 70,292 Z',
      glass:'M212,227 C236,200 258,182 292,178 L436,176 C470,176 492,192 512,224 Z',pillar:[350,177,350,226],door:[348,228,348,296],head:'M74,256 L106,246 L114,258 L78,266 Z',tail:'M566,238 L582,248 L582,264 L562,258 Z',mirror:[212,226],waist:'M100,252 L560,242'},
    suv:{w:[172,470],r:48,
      body:'M64,290 C64,256 76,236 106,230 L194,220 C220,186 244,160 282,154 L486,150 C516,150 532,164 544,192 L564,224 C578,234 584,252 584,272 L584,292 Q584,302 574,302 L524,302 A54,54 0 0 0 416,302 L226,302 A54,54 0 0 0 118,302 L76,302 Q64,302 64,292 Z',
      glass:'M206,221 C230,190 252,170 286,166 L478,163 C502,163 516,176 526,198 L538,221 Z',pillar:[356,165,356,220],door:[354,222,354,296],head:'M68,252 L102,242 L110,256 L72,264 Z',tail:'M568,232 L584,240 L584,262 L564,256 Z',mirror:[206,220],waist:'M96,250 L564,240',rails:'M286,148 L486,145'},
    pickup:{w:[172,472],r:48,
      body:'M60,290 C60,256 72,240 102,234 L190,224 C214,192 236,166 270,160 L362,158 C380,158 388,170 392,190 L396,228 L586,228 L588,292 Q588,302 578,302 L526,302 A54,54 0 0 0 418,302 L226,302 A54,54 0 0 0 118,302 L72,302 Q60,302 60,292 Z',
      glass:'M202,225 C222,196 240,174 272,170 L354,169 C366,169 372,180 374,196 L376,225 Z',pillar:[300,170,300,224],door:[298,226,298,296],head:'M64,254 L98,244 L106,258 L68,266 Z',tail:'M578,234 L588,236 L588,262 L576,260 Z',mirror:[202,224],waist:'M96,252 L586,246',bed:'M398,228 L586,228'}
  };

  function side(o,id){
    var s = SIDE[o.body]||SIDE.sedan, cy=302-(s.r>45?4:0), dark=o.dark;
    var g = '<ellipse cx="320" cy="'+(cy+s.r)+'" rx="285" ry="16" fill="url(#shadow'+id+')"/>';
    g+='<path d="'+s.body+'" fill="url(#paint'+id+')" stroke="'+shade(o.color,-.55)+'" stroke-width="1.5"/>';
    if(s.rails) g+='<path d="'+s.rails+'" stroke="#2b3240" stroke-width="5" stroke-linecap="round"/>';
    g+='<path d="'+s.glass+'" fill="url(#glass'+id+')"/>';
    g+='<path d="'+s.glass+'" fill="none" stroke="#0b0f17" stroke-width="3"/>';
    g+='<line x1="'+s.pillar[0]+'" y1="'+s.pillar[1]+'" x2="'+s.pillar[2]+'" y2="'+s.pillar[3]+'" stroke="'+shade(o.color,-.5)+'" stroke-width="9"/>';
    g+='<path d="'+s.waist+'" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none"/>';
    g+='<line x1="'+s.door[0]+'" y1="'+s.door[1]+'" x2="'+s.door[2]+'" y2="'+s.door[3]+'" stroke="'+shade(o.color,-.55)+'" stroke-width="1.5"/>';
    if(s.bed) g+='<path d="'+s.bed+'" stroke="'+shade(o.color,-.6)+'" stroke-width="4"/>';
    g+='<rect x="'+(s.door[0]-44)+'" y="'+(s.door[1]+20)+'" width="22" height="5" rx="2.5" fill="'+shade(o.color,-.5)+'"/>';
    g+='<rect x="'+(s.door[0]+46)+'" y="'+(s.door[1]+20)+'" width="22" height="5" rx="2.5" fill="'+shade(o.color,-.5)+'"/>';
    g+='<path d="M'+(s.mirror[0]-6)+','+(s.mirror[1]-2)+' l-18,-4 q-6,6 2,12 l18,0 Z" fill="'+shade(o.color,-.2)+'" stroke="'+shade(o.color,-.55)+'" stroke-width="1"/>';
    g+='<path d="'+s.head+'" fill="url(#light'+id+')" stroke="#8aa0bf" stroke-width="1"/>';
    g+='<path d="'+s.tail+'" fill="#d1121f" stroke="#7a0a12" stroke-width="1"/>';
    g+='<path d="M'+(s.w[0]+s.r+8)+','+(cy-8)+' L'+(s.w[1]-s.r-8)+','+(cy-8)+'" stroke="#141a24" stroke-opacity=".5" stroke-width="10" stroke-linecap="round"/>';
    g+=wheel(id,s.w[0],cy,s.r)+wheel(id,s.w[1],cy,s.r);
    return g;
  }

  function front(o,id,rear){
    var tall = (o.body==='suv'||o.body==='pickup') ? 26 : (o.body==='crossover'?14:0);
    var c=o.color, d=shade(c,-.55), top=124-tall;
    var g='<ellipse cx="320" cy="344" rx="250" ry="14" fill="url(#shadow'+id+')"/>';
    g+='<rect x="126" y="292" width="54" height="52" rx="10" fill="#141922"/><rect x="460" y="292" width="54" height="52" rx="10" fill="#141922"/>';
    g+='<path d="M170,206 L206,'+(top+8)+' Q212,'+top+' 228,'+top+' L412,'+top+' Q428,'+top+' 434,'+(top+8)+' L470,206 Z" fill="url(#paint'+id+')" stroke="'+d+'" stroke-width="1.5"/>';
    g+='<path d="M186,202 L216,'+(top+16)+' Q220,'+(top+11)+' 230,'+(top+11)+' L410,'+(top+11)+' Q420,'+(top+11)+' 424,'+(top+16)+' L454,202 Z" fill="url(#glass'+id+')"/>';
    g+='<path d="M232,'+(top+18)+' L300,'+(top+18)+' L250,198 L214,198 Z" fill="#fff" opacity=".08"/>';
    g+='<path d="M108,300 L108,236 Q110,206 150,200 L490,200 Q530,206 532,236 L532,300 Q532,318 514,318 L126,318 Q108,318 108,300 Z" fill="url(#paint'+id+')" stroke="'+d+'" stroke-width="1.5"/>';
    g+='<path d="M150,192 l-30,-6 q-8,10 2,18 l30,0 Z M490,192 l30,-6 q8,10 -2,18 l-30,0 Z" fill="'+shade(c,-.2)+'" stroke="'+d+'" stroke-width="1"/>';
    if(!rear){
      g+='<path d="M126,226 L226,232 L218,252 L130,248 Z" fill="url(#light'+id+')" stroke="#8aa0bf"/><path d="M514,226 L414,232 L422,252 L510,248 Z" fill="url(#light'+id+')" stroke="#8aa0bf"/>';
      g+='<path d="M136,236 L210,240" stroke="#7fb3ff" stroke-width="3"/><path d="M504,236 L430,240" stroke="#7fb3ff" stroke-width="3"/>';
      g+='<rect x="246" y="228" width="148" height="44" rx="12" fill="#121722"/>';
      for(var i=0;i<4;i++) g+='<line x1="256" y1="'+(238+i*9)+'" x2="384" y2="'+(238+i*9)+'" stroke="#3a4352" stroke-width="2"/>';
      g+='<circle cx="320" cy="250" r="11" fill="#d7dde6" stroke="#5b6576" stroke-width="2"/>';
      g+='<rect x="210" y="284" width="220" height="22" rx="10" fill="#141922"/>';
      g+='<rect x="286" y="288" width="68" height="14" rx="2" fill="#fff" stroke="#1e293b"/><text x="320" y="299" font-family="Poppins,Arial" font-size="9" font-weight="700" text-anchor="middle" fill="#0b1220">MAYO CARS</text>';
    } else {
      g+='<path d="M120,222 L214,226 L210,252 L124,250 Z" fill="#d1121f" stroke="#7a0a12"/><path d="M520,222 L426,226 L430,252 L516,250 Z" fill="#d1121f" stroke="#7a0a12"/>';
      g+='<path d="M130,232 L200,234" stroke="#ff8a8a" stroke-width="3"/><path d="M510,232 L440,234" stroke="#ff8a8a" stroke-width="3"/>';
      g+='<path d="M214,226 L426,226" stroke="'+d+'" stroke-width="2"/>';
      g+='<rect x="276" y="250" width="88" height="22" rx="3" fill="#fff" stroke="#1e293b"/><text x="320" y="266" font-family="Poppins,Arial" font-size="11" font-weight="700" text-anchor="middle" fill="#0b1220">LEA-2026</text>';
      g+='<rect x="150" y="292" width="340" height="16" rx="8" fill="#141922"/>';
      g+='<rect x="440" y="296" width="30" height="8" rx="4" fill="#7b8494"/>';
    }
    return g;
  }

  function interior(o,id){
    var c=o.trim||'#2b2f38', g='';
    g+='<rect width="640" height="400" fill="#0e131d"/>';
    g+='<path d="M0,0 L640,0 L640,150 Q320,110 0,150 Z" fill="#8fb2d9"/><path d="M0,0 L640,0 L640,150 Q320,110 0,150 Z" fill="url(#glass'+id+')" opacity=".35"/>';
    g+='<path d="M0,140 Q320,96 640,140 L640,230 Q320,200 0,230 Z" fill="'+c+'"/>';
    g+='<path d="M0,226 Q320,196 640,226 L640,400 L0,400 Z" fill="'+shade(c,-.35)+'"/>';
    g+='<path d="M20,196 Q320,164 620,196" stroke="'+shade(o.color,.1)+'" stroke-width="5" fill="none" opacity=".8"/>';
    g+='<rect x="236" y="168" width="168" height="96" rx="12" fill="#06090f" stroke="#3b4454" stroke-width="3"/>';
    g+='<rect x="246" y="178" width="148" height="76" rx="6" fill="#13325a"/>';
    g+='<path d="M256,240 L290,214 L314,228 L344,196 L384,226" stroke="#4fd1ff" stroke-width="3" fill="none"/><circle cx="270" cy="194" r="7" fill="#f5b301"/>';
    g+='<rect x="268" y="282" width="104" height="22" rx="6" fill="#1a1f29"/>';
    for(var i=0;i<4;i++) g+='<circle cx="'+(284+i*24)+'" cy="293" r="6" fill="#3b4454"/>';
    g+='<rect x="86" y="176" width="76" height="22" rx="6" fill="#1a1f29"/><rect x="478" y="176" width="76" height="22" rx="6" fill="#1a1f29"/>';
    g+='<circle cx="470" cy="300" r="92" fill="none" stroke="#11151d" stroke-width="22"/>';
    g+='<circle cx="470" cy="300" r="92" fill="none" stroke="#2c323d" stroke-width="3"/>';
    g+='<path d="M380,300 L440,300 Q470,330 500,300 L560,300" stroke="#11151d" stroke-width="18" fill="none"/>';
    g+='<circle cx="470" cy="306" r="30" fill="#1a1f29" stroke="#3b4454" stroke-width="2"/>';
    g+='<text x="470" y="311" font-family="Poppins,Arial" font-size="11" font-weight="700" text-anchor="middle" fill="#cbd5e1">'+(o.make||'').toUpperCase().slice(0,7)+'</text>';
    g+='<path d="M420,236 Q470,214 520,236 L520,250 L420,250 Z" fill="#06090f"/>';
    g+='<path d="M160,330 Q170,300 200,296 L250,296 Q262,300 262,330 L262,400 L160,400 Z" fill="'+shade(c,-.15)+'"/>';
    return g;
  }

  function wheelClose(o,id){
    var g='<rect width="640" height="400" fill="'+shade(o.color,-.25)+'"/>';
    g+='<rect width="640" height="400" fill="url(#paint'+id+')" opacity=".9"/>';
    g+='<path d="M90,400 A230,230 0 0 1 550,400 Z" fill="#0d1118"/>';
    g+='<path d="M0,96 L640,80" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>';
    g+='<path d="M0,120 L640,104" stroke="'+shade(o.color,-.55)+'" stroke-width="2"/>';
    g+='<g transform="translate(320,330)">'+wheel(id,0,0,200).replace(/stroke-width="2"/g,'stroke-width="4"')+'</g>';
    g+='<rect x="244" y="250" width="56" height="30" rx="6" fill="#d1121f" transform="rotate(-24 272 265)"/>';
    return g;
  }

  /* Public: MayoArt.svg({body,color,view,dark,make,trim}) */
  window.MayoArt = {
    svg:function(o){
      o = o||{}; o.color=o.color||'#c8102e'; o.body=o.body||'sedan'; var id='m'+(++uid);
      var v=o.view||'side', inner='';
      if(v==='interior') inner=interior(o,id);
      else if(v==='wheel') inner=wheelClose(o,id);
      else { inner = backdrop(id,o.dark) + (v==='front'?front(o,id,false):v==='rear'?front(o,id,true):side(o,id)); }
      return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.label||'Car illustration')+'" preserveAspectRatio="xMidYMid slice">'+defs(id,o.color,o.dark)+inner+'</svg>';
    },
    views:[
      {key:'side',label:'Side profile'},
      {key:'front',label:'Front view'},
      {key:'rear',label:'Rear view'},
      {key:'interior',label:'Interior / dashboard'},
      {key:'wheel',label:'Alloy wheel'}
    ],
    icon:function(body){
      var s=SIDE[body]||SIDE.sedan;
      return '<svg viewBox="40 130 570 230" xmlns="http://www.w3.org/2000/svg"><path d="'+s.body+'" fill="#0b1220"/><path d="'+s.glass+'" fill="#e11d2e"/><circle cx="'+s.w[0]+'" cy="302" r="'+(s.r-6)+'" fill="#0b1220" stroke="#fff" stroke-width="8"/><circle cx="'+s.w[1]+'" cy="302" r="'+(s.r-6)+'" fill="#0b1220" stroke="#fff" stroke-width="8"/></svg>';
    }
  };
})();
