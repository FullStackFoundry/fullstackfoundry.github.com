/*!
 * stroll.js 1.2 - CSS scroll effects
 * http://lab.hakim.se/scroll-effects
 * MIT licensed
 * 
 * Copyright (C) 2012 Hakim El Hattab, http://hakim.se
 */
(function(){var h=500;
var b=!!("ontouchstart" in window);var j=[];var d=false;function i(){if(d){requestAnimFrame(i);for(var n=0,m=j.length;n<m;n++){j[n].update();}}}function l(n,m){if(!n.nodeName||/^(ul|li)$/i.test(n.nodeName)===false){return false;
}else{if(e(n)){g(n);}}var o=b?new c(n):new k(n);if(m&&m.live){o.syncInterval=setInterval(function(){o.sync.call(o);},h);}o.sync();j.push(o);if(j.length===1){d=true;
i();}}function g(n){for(var m=0;m<j.length;m++){var o=j[m];if(o.element==n){o.destroy();j.splice(m,1);m--;}}if(j.length===0){d=false;}}function e(o){for(var n=0,m=j.length;
n<m;n++){if(j[n].element==o){return true;}}return false;}function f(q,r,o){var p,m;if(typeof q==="string"){var n=document.querySelectorAll(q);for(p=0,m=n.length;
p<m;p++){r.call(null,n[p],o);}}else{if(typeof q==="object"&&typeof q.length==="number"){for(p=0,m=q.length;p<m;p++){r.call(null,q[p],o);}}else{if(q.nodeName){r.call(null,q,o);
}else{throw"Stroll target was of unexpected type.";}}}}function a(){return !!document.body.classList;}function k(m){this.element=m;}k.prototype.sync=function(){this.items=Array.prototype.slice.apply(this.element.children);
this.listHeight=this.element.offsetHeight;for(var n=0,m=this.items.length;n<m;n++){var o=this.items[n];o._offsetHeight=o.offsetHeight;o._offsetTop=o.offsetTop;
o._offsetBottom=o._offsetTop+o._offsetHeight;o._state="";}this.update(true);};k.prototype.update=function(q){var r=this.element.pageYOffset||this.element.scrollTop,p=r+this.listHeight;
if(r!==this.lastTop||q){this.lastTop=r;for(var n=0,m=this.items.length;n<m;n++){var o=this.items[n];if(o._offsetBottom<r){if(o._state!=="past"){o._state="past";
o.classList.add("past");o.classList.remove("future");}}else{if(o._offsetTop>p){if(o._state!=="future"){o._state="future";o.classList.add("future");o.classList.remove("past");
}}else{if(o._state){if(o._state==="past"){o.classList.remove("past");}if(o._state==="future"){o.classList.remove("future");}o._state="";}}}}}};k.prototype.destroy=function(){clearInterval(this.syncInterval);
for(var n=0,m=this.items.length;n<m;n++){var o=this.items[n];o.classList.remove("past");o.classList.remove("future");}};function c(m){this.element=m;this.element.style.overflow="hidden";
this.top={value:0,natural:0};this.touch={value:0,offset:0,start:0,previous:0,lastMove:Date.now(),accellerateTimeout:-1,isAccellerating:false,isActive:false};
this.velocity=0;}c.prototype=new k();c.prototype.sync=function(){this.items=Array.prototype.slice.apply(this.element.children);this.listHeight=this.element.offsetHeight;
var o;for(var n=0,m=this.items.length;n<m;n++){o=this.items[n];o._offsetHeight=o.offsetHeight;o._offsetTop=o.offsetTop;o._offsetBottom=o._offsetTop+o._offsetHeight;
o._state="";o.style.opacity=1;}this.top.natural=this.element.scrollTop;this.top.value=this.top.natural;this.top.max=o._offsetBottom-this.listHeight;this.update(true);
this.bind();};c.prototype.bind=function(){var m=this;this.touchStartDelegate=function(n){m.onTouchStart(n);};this.touchMoveDelegate=function(n){m.onTouchMove(n);
};this.touchEndDelegate=function(n){m.onTouchEnd(n);};this.element.addEventListener("touchstart",this.touchStartDelegate,false);this.element.addEventListener("touchmove",this.touchMoveDelegate,false);
this.element.addEventListener("touchend",this.touchEndDelegate,false);};c.prototype.onTouchStart=function(n){n.preventDefault();if(n.touches.length===1){this.touch.isActive=true;
this.touch.start=n.touches[0].clientY;this.touch.previous=this.touch.start;this.touch.value=this.touch.start;this.touch.offset=0;if(this.velocity){this.touch.isAccellerating=true;
var m=this;this.touch.accellerateTimeout=setTimeout(function(){m.touch.isAccellerating=false;m.velocity=0;},500);}else{this.velocity=0;}}};c.prototype.onTouchMove=function(n){if(n.touches.length===1){var m=this.touch.value;
this.touch.value=n.touches[0].clientY;this.touch.lastMove=Date.now();var o=(this.touch.value>this.touch.previous&&this.velocity<0)||(this.touch.value<this.touch.previous&&this.velocity>0);
if(this.touch.isAccellerating&&o){clearInterval(this.touch.accellerateTimeout);this.velocity+=(this.touch.previous-this.touch.value)/10;}else{this.velocity=0;
this.touch.isAccellerating=false;this.touch.offset=Math.round(this.touch.start-this.touch.value);}this.touch.previous=m;}};c.prototype.onTouchEnd=function(n){var m=this.touch.start-this.touch.value;
if(!this.touch.isAccellerating){this.velocity=(this.touch.start-this.touch.value)/10;}if(Date.now()-this.touch.lastMove>200||Math.abs(this.touch.previous-this.touch.value)<5){this.velocity=0;
}this.top.value+=this.touch.offset;this.touch.offset=0;this.touch.start=0;this.touch.value=0;this.touch.isActive=false;this.touch.isAccellerating=false;
clearInterval(this.touch.accellerateTimeout);if(Math.abs(this.velocity)>4||Math.abs(m)>10){n.preventDefault();}};c.prototype.update=function(q){var r=this.top.value+this.velocity+this.touch.offset;
if(this.velocity||this.touch.offset){this.element.scrollTop=r;r=Math.max(0,Math.min(this.element.scrollTop,this.top.max));this.top.value=r-this.touch.offset;
}if(!this.touch.isActive||this.touch.isAccellerating){this.velocity*=0.95;}if(Math.abs(this.velocity)<0.15){this.velocity=0;}if(r!==this.top.natural||q){this.top.natural=r;
this.top.value=r-this.touch.offset;var p=r+this.listHeight;for(var n=0,m=this.items.length;n<m;n++){var o=this.items[n];if(o._offsetBottom<r){if(this.velocity<=0&&o._state!=="past"){o.classList.add("past");
o._state="past";}}else{if(o._offsetTop>p){if(this.velocity>=0&&o._state!=="future"){o.classList.add("future");o._state="future";}}else{if(o._state){if(o._state==="past"){o.classList.remove("past");
}if(o._state==="future"){o.classList.remove("future");}o._state="";}}}}}};c.prototype.destroy=function(){k.prototype.destroy.apply(this);this.element.removeEventListener("touchstart",this.touchStartDelegate,false);
this.element.removeEventListener("touchmove",this.touchMoveDelegate,false);this.element.removeEventListener("touchend",this.touchEndDelegate,false);};window.stroll={bind:function(n,m){if(a()){f(n,l,m);
}},unbind:function(m){if(a()){f(m,g);}}};window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(m){window.setTimeout(m,1000/60);
};})();})();

/*
SPINNER
*/
//fgnass.github.com/spin.js#v1.2.7
!function(e,t,n){function o(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function u(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function f(e,t,n,r){var o=["opacity",t,~~(e*100),n,r].join("-"),u=.01+n/r*100,f=Math.max(1-(1-e)/t*(100-u),e),l=s.substring(0,s.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return i[o]||(a.insertRule("@"+c+"keyframes "+o+"{"+"0%{opacity:"+f+"}"+u+"%{opacity:"+e+"}"+(u+.01)+"%{opacity:1}"+(u+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",a.cssRules.length),i[o]=1),o}function l(e,t){var i=e.style,s,o;if(i[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(o=0;o<r.length;o++){s=r[o]+t;if(i[s]!==n)return s}}function c(e,t){for(var n in t)e.style[l(e,n)||n]=t[n];return e}function h(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function p(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var r=["webkit","Moz","ms","O"],i={},s,a=function(){var e=o("style",{type:"text/css"});return u(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"},v=function m(e){if(!this.spin)return new m(e);this.opts=h(e||{},m.defaults,d)};v.defaults={},h(v.prototype,{spin:function(e){this.stop();var t=this,n=t.opts,r=t.el=c(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),i=n.radius+n.length+n.width,u,a;e&&(e.insertBefore(r,e.firstChild||null),a=p(e),u=p(r),c(r,{left:(n.left=="auto"?a.x-u.x+(e.offsetWidth>>1):parseInt(n.left,10)+i)+"px",top:(n.top=="auto"?a.y-u.y+(e.offsetHeight>>1):parseInt(n.top,10)+i)+"px"})),r.setAttribute("aria-role","progressbar"),t.lines(r,t.opts);if(!s){var f=0,l=n.fps,h=l/n.speed,d=(1-n.opacity)/(h*n.trail/100),v=h/n.lines;(function m(){f++;for(var e=n.lines;e;e--){var i=Math.max(1-(f+e*v)%h*d,n.opacity);t.opacity(r,n.lines-e,i,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/l))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function i(e,r){return c(o(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:r,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*n+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var n=0,r;for(;n<t.lines;n++)r=c(o(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:s&&f(t.opacity,t.trail,n,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&u(r,c(i("#000","0 0 4px #000"),{top:"2px"})),u(e,u(r,i(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),function(){function e(e,t){return o("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}var t=c(o("group"),{behavior:"url(#default#VML)"});!l(t,"transform")&&t.adj?(a.addRule(".spin-vml","behavior:url(#default#VML)"),v.prototype.lines=function(t,n){function s(){return c(e("group",{coordsize:i+" "+i,coordorigin:-r+" "+ -r}),{width:i,height:i})}function l(t,i,o){u(a,u(c(s(),{rotation:360/n.lines*t+"deg",left:~~i}),u(c(e("roundrect",{arcsize:n.corners}),{width:r,height:n.width,left:n.radius,top:-n.width>>1,filter:o}),e("fill",{color:n.color,opacity:n.opacity}),e("stroke",{opacity:0}))))}var r=n.length+n.width,i=2*r,o=-(n.width+n.length)*2+"px",a=c(s(),{position:"absolute",top:o,left:o}),f;if(n.shadow)for(f=1;f<=n.lines;f++)l(f,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(f=1;f<=n.lines;f++)l(f);return u(t,a)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}):s=l(t,"animation")}(),typeof define=="function"&&define.amd?define(function(){return v}):e.Spinner=v}(window,document);
(function($) {
	$.fn.spin = function(opts, color) {
		var presets = {
			"tiny": { lines: 8, length: 2, width: 2, radius: 3 },
			"small": { lines: 8, length: 4, width: 3, radius: 5 },
			"large": { lines: 10, length: 8, width: 4, radius: 8 }
		};
		if (Spinner) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data();
				
				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
				if (opts !== false) {
					if (typeof opts === "string") {
						if (opts in presets) {
							opts = presets[opts];
						} else {
							opts = {};
						}
						if (color) {
							opts.color = color;
						}
					}
					data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
				}
			});
		} else {
			throw "Spinner class not available.";
		}
	};
})(jQuery);