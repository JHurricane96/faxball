(()=>{"use strict";var n={552:(n,e,t)=>{t.d(e,{A:()=>s});var r=t(354),o=t.n(r),a=t(314),i=t.n(a)()(o());i.push([n.id,"body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n  background-color: #f0f0f0;\n}\n\n.hidden {\n  display: none;\n}\n\n#signaling {\n  margin: 20px auto;\n  width: 80%;\n  max-width: 600px;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n#signaling div {\n  margin-bottom: 20px;\n}\n\ntextarea {\n  width: 100%;\n  height: 100px;\n  margin: 10px 0;\n  resize: vertical;\n}\n\nbutton {\n  padding: 10px 20px;\n  margin: 5px;\n  cursor: pointer;\n}\n\n#gameCanvas {\n  border: 2px solid #000;\n  background-color: #4CAF50; /* Green field */\n}\n\n#instructions {\n  margin-top: 10px;\n}\n","",{version:3,sources:["webpack://./styles.css"],names:[],mappings:"AAAA;EACE,8BAA8B;EAC9B,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,gBAAgB;EAChB,yBAAyB;EACzB,aAAa;EACb,kBAAkB;EAClB,uCAAuC;AACzC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,yBAAyB,EAAE,gBAAgB;AAC7C;;AAEA;EACE,gBAAgB;AAClB",sourcesContent:["body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n  background-color: #f0f0f0;\n}\n\n.hidden {\n  display: none;\n}\n\n#signaling {\n  margin: 20px auto;\n  width: 80%;\n  max-width: 600px;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n#signaling div {\n  margin-bottom: 20px;\n}\n\ntextarea {\n  width: 100%;\n  height: 100px;\n  margin: 10px 0;\n  resize: vertical;\n}\n\nbutton {\n  padding: 10px 20px;\n  margin: 5px;\n  cursor: pointer;\n}\n\n#gameCanvas {\n  border: 2px solid #000;\n  background-color: #4CAF50; /* Green field */\n}\n\n#instructions {\n  margin-top: 10px;\n}\n"],sourceRoot:""}]);const s=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var A=0;A<n.length;A++){var p=[].concat(n[A]);r&&i[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),t&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=t):p[2]=t),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),e.push(p))}},e}},354:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */");return[e].concat([a]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],s=0;s<n.length;s++){var c=n[s],A=r.base?c[0]+r.base:c[0],p=a[A]||0,u="".concat(A," ").concat(p);a[A]=p+1;var d=t(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==d)e[d].references++,e[d].updater(f);else{var l=o(f,r);r.byIndex=s,e.splice(s,0,{identifier:u,updater:l,references:1})}i.push(u)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=t(a[i]);e[s].references--}for(var c=r(n,o),A=0;A<a.length;A++){var p=t(a[A]);0===e[p].references&&(e[p].updater(),e.splice(p,1))}a=c}}},659:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return n[r](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var r=t(72),o=t.n(r),a=t(825),i=t.n(a),s=t(659),c=t.n(s),A=t(56),p=t.n(A),u=t(540),d=t.n(u),f=t(113),l=t.n(f),g=t(552),v={};v.styleTagTransform=l(),v.setAttributes=p(),v.insert=c().bind(null,"head"),v.domAPI=i(),v.insertStyleElement=d(),o()(g.A,v),g.A&&g.A.locals&&g.A.locals})();
//# sourceMappingURL=index.bundle.js.map