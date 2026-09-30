(function(){
  var d=document, $=function(s,c){return (c||d).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
  var MAIL='biuro@finezja.org', TEL='+48665188619';
  var zl=function(n){return n.toLocaleString('pl-PL',{maximumFractionDigits:0})+' zł'};

  /* menu mobilne */
  var bg=$('.burger');
  if(bg)bg.addEventListener('click',function(){var o=d.body.classList.toggle('menu-open');bg.setAttribute('aria-expanded',o)});
  $$('.nav a').forEach(function(a){a.addEventListener('click',function(){d.body.classList.remove('menu-open')})});

  /* dni do balu */
  $$('[data-countdown]').forEach(function(el){
    var t=new Date(el.getAttribute('data-countdown')+'T19:00:00'), now=new Date();
    var days=Math.ceil((t-now)/864e5);
    if(days>1)el.textContent='za '+days+' dni';
    else if(days===1)el.textContent='jutro';
    else if(days===0)el.textContent='dziś';
    else el.textContent='odbył się';
  });

  /* galeria: filtr + podgląd */
  var fl=$('.filters');
  if(fl){
    fl.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      $$('button',fl).forEach(function(x){x.setAttribute('aria-pressed',x===b)});
      var k=b.getAttribute('data-f');
      $$('.masonry a').forEach(function(a){a.hidden=!(k==='all'||a.getAttribute('data-k')===k)});
    });
  }
  var lb=$('.lb');
  if(lb){
    var list=[],i=0,img=$('img',lb),cap=$('p',lb);
    function show(n){var vis=list.filter(function(a){return !a.hidden});if(!vis.length)return;i=(n+vis.length)%vis.length;img.src=vis[i].getAttribute('href');img.alt=vis[i].getAttribute('data-alt')||'';cap.textContent=img.alt;lb.classList.add('on');d.body.style.overflow='hidden'}
    function vis(){return list.filter(function(a){return !a.hidden})}
    list=$$('[data-lb]');
    list.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();show(vis().indexOf(a))})});
    function close(){lb.classList.remove('on');d.body.style.overflow=''}
    $('.x',lb).addEventListener('click',close);
    $('.pv',lb).addEventListener('click',function(){show(i-1)});
    $('.nx',lb).addEventListener('click',function(){show(i+1)});
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
  }

  /* kalkulator menu weselnego – ceny sezonu 2026 z finezja.org */
  var wc=$('#wcalc');
  if(wc){
    var r=$('input[type=range]',wc),o=$('output',wc);
    function calc(){
      var g=+r.value;o.textContent=g;
      $('#w-min').textContent=zl(g*330);$('#w-max').textContent=zl(g*380);
      var l=$('#w-link');if(l)l.href='../kontakt/?okazja=wesele&goscie='+g+'#zapytanie';
    }
    r.addEventListener('input',calc);calc();
  }

  /* catering – zamówienie z menu 2026 */
  var cat=$('#catering');
  if(cat){
    var cart={},items={};
    $$('.item',cat).forEach(function(it){items[it.dataset.id]={n:it.dataset.n,p:+it.dataset.p,u:it.dataset.u,el:it}});
    function render(){
      var ul=$('#cart-list'),sum=0,cnt=0,html='';
      Object.keys(cart).forEach(function(id){var q=cart[id],x=items[id];if(!q)return;sum+=q*x.p;cnt+=q;html+='<li><span>'+q+' × '+x.n+'</span><b>'+zl(q*x.p)+'</b></li>'});
      ul.innerHTML=html||'<li class="empty">Dodaj pozycje z menu przyciskiem +</li>';
      $('#cart-sum').textContent=zl(sum);
      var note=$('#cart-note');
      if(!sum){note.className='note';note.textContent='Dowóz do 5 km gratis przy zamówieniu od 300 zł.'}
      else if(sum>=300){note.className='note ok';note.textContent='Dowóz do 5 km gratis – zamówienie przekracza 300 zł.'}
      else{note.className='note';note.textContent='Brakuje '+zl(300-sum)+' do darmowego dowozu (do 5 km). Odbiór własny – bez dopłaty.'}
      $$('.item',cat).forEach(function(it){var q=cart[it.dataset.id]||0;$('.qty span',it).textContent=q;it.classList.toggle('in',q>0)});
      var bar=$('.cart-bar');if(bar){bar.classList.toggle('on',cnt>0);d.body.classList.toggle('has-cartbar',cnt>0);$('b',bar).textContent=zl(sum)}
      var btns=$$('.cart [data-send]');btns.forEach(function(b){b.toggleAttribute('disabled',!sum);b.style.opacity=sum?1:.45});
      return sum;
    }
    cat.addEventListener('click',function(e){
      var b=e.target.closest('.qty button');if(!b)return;
      var id=b.closest('.item').dataset.id;cart[id]=Math.max(0,(cart[id]||0)+(b.dataset.d==='+'?1:-1));render();
    });
    function text(){
      var t='Dzień dobry, chcę zamówić catering:\n';
      Object.keys(cart).forEach(function(id){if(cart[id])t+='- '+cart[id]+' × '+items[id].n+' ('+items[id].u+')\n'});
      t+='Razem wg cennika: '+$('#cart-sum').textContent+'\n';
      var dt=$('#c-date').value,how=$('#c-how').value;
      t+='Termin: '+(dt||'do ustalenia')+'\nOdbiór: '+how+'\n';
      return t;
    }
    $$('.cart [data-send]').forEach(function(b){b.addEventListener('click',function(){
      if(!render())return;
      var t=text();
      if(b.dataset.send==='sms')location.href='sms:'+TEL+'?body='+encodeURIComponent(t);
      else location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Zamówienie cateringu')+'&body='+encodeURIComponent(t);
    })});
    var cd=$('#c-date');
    if(cd){
      cd.min=new Date(Date.now()+864e5).toISOString().slice(0,10);
      cd.addEventListener('change',function(){
        var h=$('#c-hint');if(!cd.value){h.classList.remove('on');return}
        var t=new Date(cd.value+'T12:00:00'),wd=t.getDay();
        /* zamówienia przyjmujemy do środy – liczymy środę tego samego tygodnia (pn–nd) */
        var back=(wd+7-3)%7; if(back===0)back=7;
        var wed=new Date(t);wed.setDate(t.getDate()-back);
        var today=new Date();today.setHours(0,0,0,0);
        var f='środy, '+wed.toLocaleDateString('pl-PL',{day:'numeric',month:'long'});
        h.innerHTML=(wed<today?'<b>Termin zamówień minął</b> – zamówienia na ten dzień przyjmowaliśmy do '+f+'. Zadzwoń, sprawdzimy, czy da się jeszcze coś zrobić.':'Zamówienie na ten dzień złóż najpóźniej do <b>'+f+'</b>.');
        h.classList.add('on');
      });
    }
    render();
  }

  /* formularz zapytania o termin */
  var q=$('#zapytanie form');
  if(q){
    var ps=new URLSearchParams(location.search);
    if(ps.get('okazja')&&q.okazja)q.okazja.value=ps.get('okazja');
    if(ps.get('goscie')&&q.goscie)q.goscie.value=ps.get('goscie');
    var dt=q.data;
    if(dt){
      dt.min=new Date().toISOString().slice(0,10);
      dt.addEventListener('change',function(){
        var h=$('#t-hint',q.parentNode);if(!dt.value){h.classList.remove('on');return}
        var t=new Date(dt.value+'T12:00:00'),m=t.getMonth(),wd=t.getDay();
        var day=t.toLocaleDateString('pl-PL',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
        var months=Math.round((t-new Date())/(864e5*30.44));
        var s='<b>'+day.charAt(0).toUpperCase()+day.slice(1)+'</b> – za ok. '+(months<1?'kilka tygodni':months+' mies.')+(months<1?'. ':' ');
        if(wd===6&&m>=4&&m<=8)s+='To sobota w sezonie weselnym: takie terminy rozchodzą się zwykle 12–18 miesięcy wcześniej, warto zapytać od razu.';
        else if(wd===5||m<4||m>8)s+='Piątki i terminy poza sezonem są zwykle dostępne z krótszym wyprzedzeniem, często w niższej cenie.';
        else s+='Potwierdzimy dostępność telefonicznie lub mailowo.';
        h.innerHTML=s;h.classList.add('on');
      });
    }
    q.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=$('.form-msg',q);
      if(!q.imie.value.trim()||!(q.tel.value.trim()||q.email.value.trim())){msg.className='form-msg on err';msg.textContent='Podaj imię i telefon albo e-mail – odezwiemy się z odpowiedzią.';return}
      if(!q.zgoda.checked){msg.className='form-msg on err';msg.textContent='Zaznacz zgodę na kontakt w sprawie zapytania.';return}
      msg.className='form-msg on ok';
      msg.textContent='Dziękujemy, '+q.imie.value.trim()+'. Odezwiemy się w godzinach pracy biura. (Wersja demonstracyjna – formularz jeszcze nie wysyła wiadomości.)';
      q.reset();var h=$('#t-hint',q.parentNode);if(h)h.classList.remove('on');
    });
  }
})();
