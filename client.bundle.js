(()=>{"use strict";var e={552:(e,t,n)=>{n.d(t,{A:()=>s});var a=n(354),o=n.n(a),r=n(314),i=n.n(r)()(o());i.push([e.id,"body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n  background-color: #f0f0f0;\n}\n\n.hidden {\n  display: none;\n}\n\n#signaling {\n  margin: 20px auto;\n  width: 80%;\n  max-width: 600px;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n#signaling div {\n  margin-bottom: 20px;\n}\n\ntextarea {\n  width: 100%;\n  height: 100px;\n  margin: 10px 0;\n  resize: vertical;\n}\n\nbutton {\n  padding: 10px 20px;\n  margin: 5px;\n  cursor: pointer;\n}\n\n#gameCanvas {\n  border: 2px solid #000;\n  background-color: #4CAF50; /* Green field */\n}\n\n#instructions {\n  margin-top: 10px;\n}\n","",{version:3,sources:["webpack://./styles.css"],names:[],mappings:"AAAA;EACE,8BAA8B;EAC9B,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,gBAAgB;EAChB,yBAAyB;EACzB,aAAa;EACb,kBAAkB;EAClB,uCAAuC;AACzC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,yBAAyB,EAAE,gBAAgB;AAC7C;;AAEA;EACE,gBAAgB;AAClB",sourcesContent:["body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n  background-color: #f0f0f0;\n}\n\n.hidden {\n  display: none;\n}\n\n#signaling {\n  margin: 20px auto;\n  width: 80%;\n  max-width: 600px;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n#signaling div {\n  margin-bottom: 20px;\n}\n\ntextarea {\n  width: 100%;\n  height: 100px;\n  margin: 10px 0;\n  resize: vertical;\n}\n\nbutton {\n  padding: 10px 20px;\n  margin: 5px;\n  cursor: pointer;\n}\n\n#gameCanvas {\n  border: 2px solid #000;\n  background-color: #4CAF50; /* Green field */\n}\n\n#instructions {\n  margin-top: 10px;\n}\n"],sourceRoot:""}]);const s=i},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",a=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),a&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),a&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,a,o,r){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(a)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);a&&i[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),t.push(d))}},t}},354:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var a=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),r="/*# ".concat(o," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},72:e=>{var t=[];function n(e){for(var n=-1,a=0;a<t.length;a++)if(t[a].identifier===e){n=a;break}return n}function a(e,a){for(var r={},i=[],s=0;s<e.length;s++){var c=e[s],l=a.base?c[0]+a.base:c[0],d=r[l]||0,u="".concat(l," ").concat(d);r[l]=d+1;var p=n(u),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)t[p].references++,t[p].updater(h);else{var f=o(h,a);a.byIndex=s,t.splice(s,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var r=a(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<r.length;i++){var s=n(r[i]);t[s].references--}for(var c=a(e,o),l=0;l<r.length;l++){var d=n(r[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}r=c}}},659:e=>{var t={};e.exports=function(e,n){var a=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var a="";n.supports&&(a+="@supports (".concat(n.supports,") {")),n.media&&(a+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(a+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),a+=n.css,o&&(a+="}"),n.media&&(a+="}"),n.supports&&(a+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(a,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={id:a,exports:{}};return e[a](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0;var a=n(72),o=n.n(a),r=n(825),i=n.n(r),s=n(659),c=n.n(s),l=n(56),d=n.n(l),u=n(540),p=n.n(u),h=n(113),f=n.n(h),A=n(552),y={};y.styleTagTransform=f(),y.setAttributes=d(),y.insert=c().bind(null,"head"),y.domAPI=i(),y.insertStyleElement=p(),o()(A.A,y),A.A&&A.A.locals&&A.A.locals;const g=document.getElementById("gameCanvas");class m{constructor(e){this.id=e.id,this.x=e.x,this.y=e.y,this.color=e.color}fromState(e){this.x=e.x,this.y=e.y}toState(){return{id:this.id,x:this.x,y:this.y,color:this.color}}update(e){console.log(e),e.has("up")?this.y-=1:e.has("down")&&(this.y+=1),e.has("left")?this.x-=1:e.has("right")&&(this.x+=1)}}class v{constructor(e){this.x=e.x,this.y=e.y,this.vx=e.vx,this.vy=e.vy}fromState(e){this.x=e.x,this.y=e.y,this.vx=e.vx,this.vy=e.vy}toState(){return{x:this.x,y:this.y,vx:this.vx,vy:this.vy}}update(){this.x+=this.vx,this.y+=this.vy,this.vx*=.95,this.vy*=.95}}class x{constructor(e){this.ball=new v(e.ball),this.players=e.players.map((e=>new m(e)))}fromState(e){this.ball.fromState(e.ball);for(let t=0;t<e.players.length;t++)this.players[t].fromState(e.players[t])}toState(){return{ball:this.ball.toState(),players:this.players.map((e=>e.toState()))}}updateHost(e){this.ball.update(),(this.ball.x<=15||this.ball.x>=g.width-15)&&(this.ball.vx=-this.ball.vx),(this.ball.y<=15||this.ball.y>=g.height-15)&&(this.ball.vy=-this.ball.vy);for(const t of this.players){let n;n=t.id in e?e[t.id]:new Set,t.update(n),t.x=Math.max(0,Math.min(g.width,t.x)),t.y=Math.max(0,Math.min(g.height,t.y));const a=this.ball.x-t.x,o=this.ball.y-t.y;if(Math.sqrt(a*a+o*o)<25){const e=5,t=Math.atan2(o,a);this.ball.vx+=e*Math.cos(t),this.ball.vy+=e*Math.sin(t)}}}draw(e){if(e){e.clearRect(0,0,g.width,g.height),e.beginPath(),e.arc(this.ball.x,this.ball.y,15,0,2*Math.PI),e.fillStyle="red",e.fill(),e.closePath();for(const t of this.players)e.beginPath(),e.arc(t.x,t.y,10,0,2*Math.PI),e.fillStyle=t.color,e.fill(),e.closePath()}}}const b=document.getElementById("signaling"),E=(document.getElementById("playerAnswerSection"),document.getElementById("playerOffer")),C=document.getElementById("playerCreateAnswer"),w=document.getElementById("playerAnswer"),B=document.getElementById("game"),S=document.getElementById("gameCanvas").getContext("2d");let k,M,I=!1,P=new Set;function L(e){switch(e){case"ArrowUp":return"up";case"ArrowDown":return"down";case"ArrowLeft":return"left";case"ArrowRight":return"right";default:return null}}function T(){"open"===k.readyState&&k.send(JSON.stringify(Array.from(P)))}C.onclick=()=>{return e=void 0,t=void 0,a=function*(){const e=E.value;if(!e)return void alert("Please paste the host offer.");const t=new RTCSessionDescription(JSON.parse(e)),n=new RTCPeerConnection;n.ondatachannel=e=>{k=e.channel,console.log("Data channel created for host"),k.onmessage=e=>{console.log("Received message from host:",e.data),M=JSON.parse(e.data),I||(B.classList.remove("hidden"),b.classList.add("hidden"),function(){const e=new x(M);!function t(){e.fromState(M),e.draw(S),requestAnimationFrame(t)}()}(),window.addEventListener("keydown",(e=>{const t=L(e.key);t&&(P.add(t),console.log("Keydown: "+t),T())})),window.addEventListener("keyup",(e=>{const t=L(e.key);t&&(P.delete(t),console.log("Keyup: "+t),T())})),I=!0)},k.onopen=()=>{console.log("Data channel to host opened")},k.onclose=()=>{console.log("Data channel to host closed")}},n.onicecandidate=e=>{e.candidate},yield n.setRemoteDescription(t);const a=yield n.createAnswer();var o,r,i;yield n.setLocalDescription(a),yield(o=n,new Promise((e=>{if("complete"===o.iceGatheringState)e();else{const t=()=>{"complete"===o.iceGatheringState&&(o.removeEventListener("icegatheringstatechange",t),e())};o.addEventListener("icegatheringstatechange",t)}}))),w.value=JSON.stringify(n.localDescription),r=w.value,i="Failed to copy player answer. Please copy it manually.",navigator.clipboard?navigator.clipboard.writeText(r).then((()=>{console.log("Player answer has been copied to your clipboard.")})).catch((e=>{console.error(i,e),alert(i)})):alert("Clipboard API not supported. Please copy manually.")},new((n=void 0)||(n=Promise))((function(o,r){function i(e){try{c(a.next(e))}catch(e){r(e)}}function s(e){try{c(a.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((a=a.apply(e,t||[])).next())}));var e,t,n,a}})();
//# sourceMappingURL=client.bundle.js.map