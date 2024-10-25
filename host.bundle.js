(()=>{"use strict";var t={552:(t,e,n)=>{n.d(e,{A:()=>s});var a=n(354),o=n.n(a),i=n(314),r=n.n(i)()(o());r.push([t.id,"body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n  background-color: #f0f0f0;\n}\n\n.hidden {\n  display: none;\n}\n\n#signaling {\n  margin: 20px auto;\n  width: 80%;\n  max-width: 600px;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n#signaling div {\n  margin-bottom: 20px;\n}\n\ntextarea {\n  width: 100%;\n  height: 100px;\n  margin: 10px 0;\n  resize: vertical;\n}\n\nbutton {\n  padding: 10px 20px;\n  margin: 5px;\n  cursor: pointer;\n}\n\n#gameCanvas {\n  border: 2px solid #000;\n  background-color: #4CAF50; /* Green field */\n}\n\n#instructions {\n  margin-top: 10px;\n}\n","",{version:3,sources:["webpack://./styles.css"],names:[],mappings:"AAAA;EACE,8BAA8B;EAC9B,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,gBAAgB;EAChB,yBAAyB;EACzB,aAAa;EACb,kBAAkB;EAClB,uCAAuC;AACzC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,yBAAyB,EAAE,gBAAgB;AAC7C;;AAEA;EACE,gBAAgB;AAClB",sourcesContent:["body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n  background-color: #f0f0f0;\n}\n\n.hidden {\n  display: none;\n}\n\n#signaling {\n  margin: 20px auto;\n  width: 80%;\n  max-width: 600px;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n#signaling div {\n  margin-bottom: 20px;\n}\n\ntextarea {\n  width: 100%;\n  height: 100px;\n  margin: 10px 0;\n  resize: vertical;\n}\n\nbutton {\n  padding: 10px 20px;\n  margin: 5px;\n  cursor: pointer;\n}\n\n#gameCanvas {\n  border: 2px solid #000;\n  background-color: #4CAF50; /* Green field */\n}\n\n#instructions {\n  margin-top: 10px;\n}\n"],sourceRoot:""}]);const s=r},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",a=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),a&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),a&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,a,o,i){"string"==typeof t&&(t=[[null,t,void 0]]);var r={};if(a)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(r[l]=!0)}for(var c=0;c<t.length;c++){var d=[].concat(t[c]);a&&r[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},354:t=>{t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var a=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),i="/*# ".concat(o," */");return[e].concat([i]).join("\n")}return[e].join("\n")}},72:t=>{var e=[];function n(t){for(var n=-1,a=0;a<e.length;a++)if(e[a].identifier===t){n=a;break}return n}function a(t,a){for(var i={},r=[],s=0;s<t.length;s++){var l=t[s],c=a.base?l[0]+a.base:l[0],d=i[c]||0,h="".concat(c," ").concat(d);i[c]=d+1;var u=n(h),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)e[u].references++,e[u].updater(p);else{var f=o(p,a);a.byIndex=s,e.splice(s,0,{identifier:h,updater:f,references:1})}r.push(h)}return r}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var i=a(t=t||[],o=o||{});return function(t){t=t||[];for(var r=0;r<i.length;r++){var s=n(i[r]);e[s].references--}for(var l=a(t,o),c=0;c<i.length;c++){var d=n(i[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}i=l}}},659:t=>{var e={};t.exports=function(t,n){var a=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var a="";n.supports&&(a+="@supports (".concat(n.supports,") {")),n.media&&(a+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(a+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),a+=n.css,o&&(a+="}"),n.media&&(a+="}"),n.supports&&(a+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(a,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var i=e[a]={id:a,exports:{}};return t[a](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0;var a=n(72),o=n.n(a),i=n(825),r=n.n(i),s=n(659),l=n.n(s),c=n(56),d=n.n(c),h=n(540),u=n.n(h),p=n(113),f=n.n(p),y=n(552),m={};m.styleTagTransform=f(),m.setAttributes=d(),m.insert=l().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=u(),o()(y.A,m),y.A&&y.A.locals&&y.A.locals;const A=document.getElementById("gameCanvas"),g=[document.getElementById("score-0"),document.getElementById("score-1")],v=["blue","yellow","purple","orange","pink","cyan","magenta","lime"];class x{constructor(t){this.id=t.id,this.team=t.team,this.x=t.x,this.y=t.y,this.color=t.color}fromState(t){this.x=t.x,this.y=t.y}toState(){return{id:this.id,team:this.team,x:this.x,y:this.y,color:this.color}}update(t){t.has("up")?this.y-=1:t.has("down")&&(this.y+=1),t.has("left")?this.x-=1:t.has("right")&&(this.x+=1)}}class b{constructor(t){this.x=t.x,this.y=t.y,this.vx=t.vx,this.vy=t.vy,this.radius=15}fromState(t){this.x=t.x,this.y=t.y,this.vx=t.vx,this.vy=t.vy}toState(){return{x:this.x,y:this.y,vx:this.vx,vy:this.vy}}update(){this.x+=this.vx,this.y+=this.vy,this.vx*=.95,this.vy*=.95}}class w{constructor(t){this.ball=new b(t.ball),this.players=t.players.map((t=>new x(t))),this.score=t.score,this.goalDims=[A.height/4,3*A.height/4]}fromState(t){this.ball.fromState(t.ball);for(let e=0;e<t.players.length;e++)this.players[e].fromState(t.players[e]);this.score=t.score}toState(){return{ball:this.ball.toState(),players:this.players.map((t=>t.toState())),score:this.score}}reset(){this.ball.x=A.width/2,this.ball.y=A.height/2,this.ball.vx=0,this.ball.vy=0;for(const t of this.players){const e=Math.random()*A.width/2;t.x=t.team?e+A.width/2:e,t.y=Math.random()*A.height}}updateHost(t){this.ball.update();let e=!1;if(this.ball.x<=this.ball.radius&&this.ball.y>=this.goalDims[0]&&this.ball.y<=this.goalDims[1]?(this.score[1]+=1,e=!0):this.ball.x>=A.width-this.ball.radius&&this.ball.y>=this.goalDims[0]&&this.ball.y<=this.goalDims[1]&&(this.score[0]+=1,e=!0),e)this.reset();else{(this.ball.x<=this.ball.radius||this.ball.x>=A.width-this.ball.radius)&&(this.ball.vx=-this.ball.vx),(this.ball.y<=this.ball.radius||this.ball.y>=A.height-this.ball.radius)&&(this.ball.vy=-this.ball.vy);for(const e of this.players){let n;n=e.id in t?t[e.id]:new Set,e.update(n),e.x=Math.max(0,Math.min(A.width,e.x)),e.y=Math.max(0,Math.min(A.height,e.y));const a=this.ball.x-e.x,o=this.ball.y-e.y;if(Math.sqrt(a*a+o*o)<25){const t=5,e=Math.atan2(o,a);this.ball.vx+=t*Math.cos(e),this.ball.vy+=t*Math.sin(e)}}}}draw(t){if(t){t.clearRect(0,0,A.width,A.height),t.beginPath(),t.arc(this.ball.x,this.ball.y,15,0,2*Math.PI),t.fillStyle="red",t.fill(),t.closePath();for(const e of this.players)t.beginPath(),t.arc(e.x,e.y,10,0,2*Math.PI),t.fillStyle=e.color,t.fill(),t.closePath();t.fillStyle="black",t.fillRect(0,this.goalDims[0],10,this.goalDims[1]-this.goalDims[0]),t.fillRect(A.width-10,this.goalDims[0],10,this.goalDims[1]-this.goalDims[0]),g[0].innerText=this.score[0].toString(),g[1].innerText=this.score[1].toString()}}}function E(t){switch(t){case"ArrowUp":return"up";case"ArrowDown":return"down";case"ArrowLeft":return"left";case"ArrowRight":return"right";default:return null}}const C={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};var B=function(t,e,n,a){return new(n||(n=Promise))((function(o,i){function r(t){try{l(a.next(t))}catch(t){i(t)}}function s(t){try{l(a.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,s)}l((a=a.apply(t,e||[])).next())}))};const S=document.getElementById("signaling"),M=(document.getElementById("hostOfferSection"),document.getElementById("hostOffer")),k=(document.getElementById("hostAnswerSection"),document.getElementById("hostRemoteAnswer")),I=document.getElementById("hostAddPeer"),D=document.getElementById("startGameButton"),P=document.getElementById("game"),T=document.getElementById("gameCanvas").getContext("2d"),R={};let O=new Set,L=new Map,N=new Map;B(void 0,void 0,void 0,(function*(){const t=function(t){const e=new RTCPeerConnection(C);L.set(t,e);const n=e.createDataChannel("game");return N.set(t,n),console.log("Data channel created for peer",t),n.onmessage=e=>{const n=new Set(JSON.parse(e.data));R[t]=n},n.onopen=()=>{console.log(`Data channel with peer ${t} opened`)},n.onclose=()=>{console.log(`Data channel with peer ${t} closed`)},e}(Math.random().toString(36).substr(2,9)),e=yield t.createOffer();var n,a,o;yield t.setLocalDescription(e),yield(n=t,new Promise((t=>{"complete"===n.iceGatheringState?t():n.onicecandidate=e=>{e.candidate&&(console.log("New ICE candidate",e.candidate),"srflx"===e.candidate.type&&t())}}))),M.value=JSON.stringify(t.localDescription),a=M.value,o="Failed to copy host offer. Please copy it manually.",navigator.clipboard?navigator.clipboard.writeText(a).then((()=>{console.log("Host offer has been copied to your clipboard.")})).catch((t=>{console.error(o,t),alert(o)})):alert("Clipboard API not supported. Please copy manually.")})),I.onclick=()=>B(void 0,void 0,void 0,(function*(){const t=k.value;if(!t)return void alert("Please paste the player answer.");const e=Array.from(L.keys());if(0===e.length)return void alert("No peer connections available to add.");const n=e[e.length-1],a=L.get(n);if(!a)return void alert("Peer connection not found.");const o=new RTCSessionDescription(JSON.parse(t));yield a.setRemoteDescription(o),k.value="",alert(`Peer ${n} added.`)})),D.onclick=()=>{window.addEventListener("keydown",(t=>{const e=E(t.key);e&&O.add(e)})),window.addEventListener("keyup",(t=>{const e=E(t.key);e&&O.delete(e)})),function(){let t=(e=["host",...Array.from(L.keys())],{ball:{x:A.width/2,y:A.height/2,vx:0,vy:0},players:e.map(((t,e)=>{const n=Math.random()*A.width/2;return{id:t,team:e%2,x:e%2?n+A.width/2:n,y:Math.random()*A.height,color:v[e%v.length]}})),score:[0,0]});var e;const n=new w(t);!function e(){R.host=O,n.updateHost(R),n.draw(T),t=n.toState(),function(t){const e=JSON.stringify(t);for(const[t,n]of N.entries())"open"===n.readyState&&n.send(e)}(t),requestAnimationFrame(e)}()}(),P.classList.remove("hidden"),S.classList.add("hidden"),D.classList.add("hidden")}})();
//# sourceMappingURL=host.bundle.js.map