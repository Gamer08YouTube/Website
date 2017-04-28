/*
 2014 Artem Sapegin (sapegin.me)
 @license MIT
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery"],d):d(jQuery)})(function(d,p){function q(a,b){this.container=a;this.options=b;this.init()}function r(a,b){this.widget=a;this.options=d.extend({},b);this.detectService();this.service&&this.init()}function v(a){function b(a,b){return b.toUpper()}var c={};a=a.data();for(var d in a){var f=a[d];"yes"===f?f=!0:"no"===f&&(f=!1);c[d.replace(/-(\w)/g,b)]=f}return c}function k(a,b){return t(a,b,encodeURIComponent)}function t(a,b,c){return a.replace(/\{([^\}]+)\}/g,
function(a,d){return d in b?c?c(b[d]):b[d]:a})}function m(a,b){var c="social-likes__"+a;return c+" "+c+"_"+b}function w(a,b){function c(g){"keydown"===g.type&&27!==g.which||d(g.target).closest(a).length||(a.removeClass("social-likes_opened"),e.off(f,c),d.isFunction(b)&&b())}var e=d(document),f="click touchstart keydown";e.on(f,c)}function x(a){if(document.documentElement.getBoundingClientRect){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),10),d=a[0].getBoundingClientRect();10>d.left?a.css("left",
10-d.left+b):d.right>window.innerWidth-10&&a.css("left",window.innerWidth-d.right-10+b);10>d.top?a.css("top",10-d.top+c):d.bottom>window.innerHeight-10&&a.css("top",window.innerHeight-d.bottom-10+c)}a.addClass("social-likes_opened")}var l="https:"===location.protocol?"https:":"http:",u="https:"===l,h={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(a){return a.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",
popupWidth:600,popupHeight:500},twitter:{counterUrl:"https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){/[\.\?:\-\u2013\u2014]\s*$/.test(this.options.title)||(this.options.title+=":");return!0}},mailru:{counterUrl:l+"//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",convertNumber:function(a){for(var b in a)if(a.hasOwnProperty(b))return a[b].shares},
popupUrl:l+"//connect.mail.ru/share?share_url={url}&title={title}",popupWidth:550,popupHeight:360},vkontakte:{counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(a,b){var c=h.vkontakte;c._||(c._=[],window.VK||(window.VK={}),window.VK.Share={count:function(a,b){c._[a].resolve(b)}});var e=c._.length;c._.push(b);d.getScript(k(a,{index:e})).fail(b.reject)},popupUrl:l+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},odnoklassniki:{counterUrl:u?
p:"http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",counter:function(a,b){var c=h.odnoklassniki;c._||(c._=[],window.ODKL||(window.ODKL={}),window.ODKL.updateCount=function(a,b){c._[a].resolve(b)});var e=c._.length;c._.push(b);d.getScript(k(a,{index:e})).fail(b.reject)},popupUrl:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:550,popupHeight:360},plusone:{counterUrl:u?p:"http://share.yandex.ru/gpp.xml?url={url}",counter:function(a,
b){var c=h.plusone;c._?b.reject():(window.services||(window.services={}),window.services.gplus={cb:function(a){"string"===typeof a&&(a=a.replace(/\D/g,""));c._.resolve(parseInt(a,10))}},c._=b,d.getScript(k(a)).fail(b.reject))},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:l+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:l+"//pinterest.com/pin/create/button/?url={url}&description={title}",
popupWidth:630,popupHeight:270}},n={promises:{},fetch:function(a,b,c){n.promises[a]||(n.promises[a]={});var e=n.promises[a];if(c.forceUpdate||!e[b]){var f=d.extend({},h[a],c),g=d.Deferred();(a=f.counterUrl&&k(f.counterUrl,{url:b}))&&d.isFunction(f.counter)?f.counter(a,g):f.counterUrl?d.getJSON(a).done(function(a){try{var b=a;d.isFunction(f.convertNumber)&&(b=f.convertNumber(a));g.resolve(b)}catch(c){g.reject()}}).fail(g.reject):g.reject();e[b]=g.promise()}return e[b]}};d.fn.socialLikes=function(a){return this.each(function(){var b=
d(this),c=b.data("social-likes");c?d.isPlainObject(a)&&c.update(a):(c=new q(b,d.extend({},d.fn.socialLikes.defaults,a,v(b))),b.data("social-likes",c))})};d.fn.socialLikes.defaults={url:window.location.href.replace(window.location.hash,""),title:document.title,counters:!0,zeroes:!1,wait:500,timeout:1E4,popupCheckInterval:500,singleTitle:"Share",initHtml:!0};q.prototype={init:function(){this.container.addClass("social-likes");this.single=this.container.hasClass("social-likes_single");this.initUserButtons();
this.number=this.countersLeft=0;this.container.on("counter.social-likes",d.proxy(this.updateCounter,this));var a=this.container.children();this.makeSingleButton();this.buttons=[];a.each(d.proxy(function(a,c){var e=new r(d(c),this.options);this.buttons.push(e);e.options.counterUrl&&this.countersLeft++},this));this.options.counters?(this.timer=setTimeout(d.proxy(this.appear,this),this.options.wait),this.timeout=setTimeout(d.proxy(this.ready,this,!0),this.options.timeout)):this.appear()},initUserButtons:function(){!this.userButtonInited&&
window.socialLikesButtons&&d.extend(!0,h,socialLikesButtons);this.userButtonInited=!0},makeSingleButton:function(){if(this.single){var a=this.container;a.addClass("social-likes_vertical");a.wrap(d("<div>",{"class":"social-likes_single-w"}));a.wrapInner(d("<div>",{"class":"social-likes__single-container"}));var b=a.parent(),c=d("<div>",{"class":m("widget","single")}),e=d(t('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>',{buttonCls:m("button","single"),iconCls:m("icon","single"),
title:this.options.singleTitle}));c.append(e);b.append(c);c.on("click",function(){c.toggleClass("social-likes__widget_active");c.hasClass("social-likes__widget_active")?(a.css({left:-(a.width()-c.width())/2,top:-a.height()}),x(a),w(a,function(){c.removeClass("social-likes__widget_active")})):a.removeClass("social-likes_opened");return!1});this.widget=c}},update:function(a){if(a.forceUpdate||a.url!==this.options.url){this.number=0;this.countersLeft=this.buttons.length;this.widget&&this.widget.find(".social-likes__counter").remove();
d.extend(this.options,a);for(var b=0;b<this.buttons.length;b++)this.buttons[b].update(a)}},updateCounter:function(a,b,c){c&&(this.number+=c,this.single&&this.getCounterElem().text(this.number));this.countersLeft--;0===this.countersLeft&&(this.appear(),this.ready())},appear:function(){this.container.addClass("social-likes_visible")},ready:function(a){this.timeout&&clearTimeout(this.timeout);this.container.addClass("social-likes_ready");a||this.container.trigger("ready.social-likes",this.number)},getCounterElem:function(){var a=
this.widget.find(".social-likes__counter_single");a.length||(a=d("<span>",{"class":m("counter","single")}),this.widget.append(a));return a}};r.prototype={init:function(){this.detectParams();if(this.options.initHtml)this.initHtml();else this.widget.on("click",d.proxy(this.click,this));setTimeout(d.proxy(this.initCounter,this),0)},update:function(a){d.extend(this.options,{forceUpdate:!1},a);this.widget.find(".social-likes__counter").remove();this.initCounter()},detectService:function(){var a=this.widget.data("service");
if(!a){for(var b=this.widget[0],b=b.classList||b.className.split(" "),c=0;c<b.length;c++){var e=b[c];if(h[e]){a=e;break}}if(!a)return}this.service=a;d.extend(this.options,h[a])},detectParams:function(){var a=this.widget.data();if(a.counter){var b=parseInt(a.counter,10);isNaN(b)?this.options.counterUrl=a.counter:this.options.counterNumber=b}a.title&&(this.options.title=a.title);a.url&&(this.options.url=a.url)},initHtml:function(){var a=this.options,b=this.widget,c=b.find("a");c.length&&this.cloneDataAttrs(c,
b);c=d("<span>",{"class":this.getElementClassNames("button"),text:b.text()});if(a.clickUrl)a=k(a.clickUrl,{url:a.url,title:a.title}),a=d("<a>",{href:a}),this.cloneDataAttrs(b,a),b.replaceWith(a),this.widget=b=a;else b.on("click",d.proxy(this.click,this));b.removeClass(this.service);b.addClass(this.getElementClassNames("widget"));c.prepend(d("<span>",{"class":this.getElementClassNames("icon")}));b.empty().append(c);this.button=c},initCounter:function(){this.options.counters&&(this.options.counterNumber?
this.updateCounter(this.options.counterNumber):n.fetch(this.service,this.options.url,{counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate}).always(d.proxy(this.updateCounter,this)))},cloneDataAttrs:function(a,b){var c=a.data(),d;for(d in c)c.hasOwnProperty(d)&&b.data(d,c[d])},getElementClassNames:function(a){return m(a,this.service)},updateCounter:function(a){a=parseInt(a,10)||0;var b={"class":this.getElementClassNames("counter"),text:a};a||this.options.zeroes||(b["class"]+=" social-likes__counter_empty",
b.text="");b=d("<span>",b);this.widget.append(b);this.widget.trigger("counter.social-likes",[this.service,a])},click:function(a){var b=this.options,c=!0;d.isFunction(b.click)&&(c=b.click.call(this,a));c&&(a=k(b.popupUrl,{url:b.url,title:b.title}),a=this.addAdditionalParamsToUrl(a),this.openPopup(a,{width:b.popupWidth,height:b.popupHeight}));return!1},addAdditionalParamsToUrl:function(a){var b=d.param(d.extend(this.widget.data(),this.options.data));if(d.isEmptyObject(b))return a;var c=-1===a.indexOf("?")?
"?":"&";return a+c+b},openPopup:function(a,b){var c=Math.round(screen.width/2-b.width/2),e=0;screen.height>b.height&&(e=Math.round(screen.height/3-b.height/2));var f=window.open(a,"sl_"+this.service,"left="+c+",top="+e+",width="+b.width+",height="+b.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");if(f){f.focus();this.widget.trigger("popup_opened.social-likes",[this.service,f]);var g=setInterval(d.proxy(function(){f.closed&&(clearInterval(g),this.widget.trigger("popup_closed.social-likes",
this.service))},this),this.options.popupCheckInterval)}else location.href=a}};d(function(){d(".social-likes").socialLikes()})});
