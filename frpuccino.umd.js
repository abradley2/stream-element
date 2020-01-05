!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).frpuccino=e()}}(function(){var e,t=function(e){var t;return function(n){return t||e(t={exports:{},parent:n},t.exports),t.exports}},n=t(function(e,t){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(o),i=require("@most/core"),u=n(b),d=n(g),c=require("@most/scheduler"),l=n(A),s=r({});function f(e,t){return m(t).map(e).createTask}function m(e){return{createTask:e,map:function(t){return m((n,r)=>e({event:(e,r)=>{r.eventStream&&n.event(e,{eventStream:i.map(e=>({action:t(e.action)}),r.eventStream)})},end:e=>{n.end(e)},error:(e,t)=>{n.error(e,t)}},r))}}}function p(e){const[t,n]=Array.isArray(e)?e:[e,null];return[t,(Array.isArray(n)?n:[n]).filter(e=>!!e)]}let v;function h(e,t){return Object.keys(l.default).forEach(n=>{t[n]?e[n]=t[n]:e[n]&&(e[n]=void 0)}),!0}t.ACTION="ACTION",t.mapElement=function(e,t){const n=t.eventStream,r=i.map(e,n);return t.eventStream=r,t},t.mapTaskCreator=f,t.taskGenerator=m,t.getModel=function(e){return p(e)[0]},t.getTasks=function(e){return p(e)[1]},t.getUpdateResult=p,t.mapUpdateResult=function(e,t,n){const[r,o]=p(n),a=o.map(e=>f(t,e));return[e(r),a]},t.createApplication=function(e){const{mount:n,init:r,update:o,view:l,runTasks:f,mapUrlChange:m}=e,p=e.scheduler||c.newDefaultScheduler(),b=d.default(),g=()=>{b.emit(t.ACTION,{action:m(window.location),time:p.currentTime()})};m&&(window.addEventListener("urlchange",g),v||(a.default(),v=!0));const A={run:(n,r)=>{const o=e=>n.event(r.currentTime(),e);return b.on(t.ACTION,o),{dispose:()=>{b.off(t.ACTION,o),e.mapUrlChange&&b.off(t.ACTION,g)}}}};let N=i.loop((e,t)=>{let n,r;const a=o(e,t.action);Array.isArray(a)?[r,n]=a:r=a;const u=l(r);return{seed:r,value:{view:u,task:n,eventStream:i.take(1,i.map(e=>({action:e}),u.eventStream))}}},r,A);m&&(N=i.startWith({eventStream:i.now({action:m(window.location)})},N));const y={event:function(e,r){if(r.view&&u.default(n,r.view,{onBeforeElUpdated:h}),r.task&&!1!==f){const e=Array.isArray(r.task)?r.task:[r.task],t=c.newTimeline();e.forEach(e=>{const n=e(y,p);t.add(n)}),t.runTasks(0,e=>e.run())}const o=r.eventStream.run({event:(e,n)=>{n.time||(n.time=e),b.emit(t.ACTION,n)},end:()=>{o.dispose()},error:(e,t)=>{throw console.error(t),t}},p)},end:()=>{},error:(e,t)=>{throw console.error(t),t}};return{applicationStream:N,applicationSink:y,scheduler:p,eventSource:b,run:e=>{const n=N.run(y,p);return b.emit(t.ACTION,{time:p.currentTime(),action:e}),n},record:()=>{const e=s.record(b,p);return t=>e(t)}}},t.createElement=function(e,t,...n){const r=document.createElement(e);return r.eventStream=i.empty(),t&&Object.keys(t).forEach(function(e){const n=t[e];if(l.default[e]&&n){const t=n.constructor===Function?n:()=>n;r.eventStream=i.merge(r.eventStream,i.map(t,function(e,t,n){let r,o;return t&&(t[e]=(e=>{r&&r.event(o.currentTime(),e)}),t[e].mapFn=n),{run:(e,t)=>(r=e,o=t,{dispose:()=>{r=void 0}})}}(e,r,t)))}else-1===["className","id"].indexOf(e)?null!=n&&r.setAttribute(e,n):r[e]=n}),n.forEach(function e(t){if("number"!=typeof t){if(t)if(t&&t.constructor===String){const e=document.createTextNode(t);r.appendChild(e)}else Array.isArray(t)?t.forEach(e):(r.appendChild(t),r.eventStream=i.merge(r.eventStream,t.eventStream),t.eventStream=null)}else{const e=document.createTextNode(t.toString());r.appendChild(e)}}),r},t.render=function(e,t){0===e.children.length&&e.appendChild(t);const n=e.children[0];u.default(n,t,{onBeforeElUpdated:h})}}),r=t(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n({}),o=require("@most/scheduler"),a=require("@most/core");t.record=function(e,t){let n;const i=[],u=e=>{!n&&e.time&&(n=e.time),i.push(e)};return e.on(r.ACTION,u),function(d){const{mount:c,update:l,view:s,init:f,mapUrlChange:m}=d;e.off(r.ACTION,u);const p=o.schedulerRelativeTo(-1*(n-t.currentTime()),t),v=r.createApplication({view:s,update:l,init:f,mount:c,mapUrlChange:m,scheduler:p,runTasks:!1}),{applicationSink:h,applicationStream:b}=v,g=a.mergeArray(i.map(e=>a.now({action:e.action})));return v.run=(()=>a.merge(b,a.now({eventStream:g})).run(h,p)),v}}}),o=function(e){const t=()=>{const e=new window.CustomEvent("urlchange",{detail:document.location});window.dispatchEvent(e)},n=()=>{t()},r=n=>{let r=n.target;for(;r!==document.body;){if("A"===r.nodeName.toUpperCase()){const o=r.getAttribute("data-link");if("replaceState"!==o&&"pushState"!==o)break;n.preventDefault(),window.history[o](e?e(r):window.history.state,r.getAttribute("data-title")||document.title,r.href),t();break}r=r.parentNode}};return window.addEventListener("popstate",n),document.body.addEventListener("click",r),function(){window.removeEventListener("popstate",n),document.body.removeEventListener("click",r)}},a="undefined"==typeof document?void 0:document,i=!!a&&"content"in a.createElement("template"),u=!!a&&a.createRange&&"createContextualFragment"in a.createRange();function d(e,t){var n=e.nodeName,r=t.nodeName;return n===r||!!(t.actualize&&n.charCodeAt(0)<91&&r.charCodeAt(0)>90)&&n===r.toUpperCase()}function c(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var l={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();"OPTGROUP"===r&&(r=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==r||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}c(e,t,"selected")},INPUT:function(e,t){c(e,t,"checked"),c(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var o=r.nodeValue;if(o==n||!n&&o==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,r,o=-1,a=0,i=e.firstChild;i;)if("OPTGROUP"===(r=i.nodeName&&i.nodeName.toUpperCase()))i=(n=i).firstChild;else{if("OPTION"===r){if(i.hasAttribute("selected")){o=a;break}a++}!(i=i.nextSibling)&&n&&(i=n.nextSibling,n=null)}e.selectedIndex=o}}},s=1,f=3,m=8;function p(){}function v(e){return e.id}var h,b=(h=function(e,t){var n,r,o,a,i=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var u=0;u<i.length;u++)r=(n=i[u]).name,o=n.namespaceURI,a=n.value,o?(r=n.localName||r,e.getAttributeNS(o,r)!==a&&("xmlns"===n.prefix&&(r=n.name),e.setAttributeNS(o,r,a))):e.getAttribute(r)!==a&&e.setAttribute(r,a);for(var d=e.attributes,c=0;c<d.length;c++)r=(n=d[c]).name,(o=n.namespaceURI)?(r=n.localName||r,t.hasAttributeNS(o,r)||e.removeAttributeNS(o,r)):t.hasAttribute(r)||e.removeAttribute(r)}},function(t,n,r){if(r||(r={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var o=n;(n=a.createElement("html")).innerHTML=o}else c=(c=n).trim(),n=i?function(e){var t=a.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(c):u?function(t){return e||(e=a.createRange()).selectNode(a.body),e.createContextualFragment(t).childNodes[0]}(c):function(e){var t=a.createElement("body");return t.innerHTML=e,t.childNodes[0]}(c);var c,b=r.getNodeKey||v,g=r.onBeforeNodeAdded||p,A=r.onNodeAdded||p,N=r.onBeforeElUpdated||p,y=r.onElUpdated||p,T=r.onBeforeNodeDiscarded||p,w=r.onNodeDiscarded||p,C=r.onBeforeElChildrenUpdated||p,S=!0===r.childrenOnly,E=Object.create(null),k=[];function O(e){k.push(e)}function x(e,t,n){!1!==T(e)&&(t&&t.removeChild(e),w(e),function e(t,n){if(t.nodeType===s)for(var r=t.firstChild;r;){var o=void 0;n&&(o=b(r))?O(o):(w(r),r.firstChild&&e(r,n)),r=r.nextSibling}}(e,n))}function U(e){A(e);for(var t=e.firstChild;t;){var n=t.nextSibling,r=b(t);if(r){var o=E[r];o&&d(t,o)&&(t.parentNode.replaceChild(o,t),I(o,t))}U(t),t=n}}function I(e,t,n){var r=b(t);if(r&&delete E[r],!n){if(!1===N(e,t))return;if(h(e,t),y(e),!1===C(e,t))return}"TEXTAREA"!==e.nodeName?function(e,t){var n,r,o,i,u,c=t.firstChild,p=e.firstChild;e:for(;c;){for(i=c.nextSibling,n=b(c);p;){if(o=p.nextSibling,c.isSameNode&&c.isSameNode(p)){c=i,p=o;continue e}r=b(p);var v=p.nodeType,h=void 0;if(v===c.nodeType&&(v===s?(n?n!==r&&((u=E[n])?o===u?h=!1:(e.insertBefore(u,p),r?O(r):x(p,e,!0),p=u):h=!1):r&&(h=!1),(h=!1!==h&&d(p,c))&&I(p,c)):v!==f&&v!=m||(h=!0,p.nodeValue!==c.nodeValue&&(p.nodeValue=c.nodeValue))),h){c=i,p=o;continue e}r?O(r):x(p,e,!0),p=o}if(n&&(u=E[n])&&d(u,c))e.appendChild(u),I(u,c);else{var A=g(c);!1!==A&&(A&&(c=A),c.actualize&&(c=c.actualize(e.ownerDocument||a)),e.appendChild(c),U(c))}c=i,p=o}!function(e,t,n){for(;t;){var r=t.nextSibling;(n=b(t))?O(n):x(t,e,!0),t=r}}(e,p,r);var N=l[e.nodeName];N&&N(e,t)}(e,t):l.TEXTAREA(e,t)}!function e(t){if(t.nodeType===s||11===t.nodeType)for(var n=t.firstChild;n;){var r=b(n);r&&(E[r]=n),e(n),n=n.nextSibling}}(t);var R,P,_=t,L=_.nodeType,M=n.nodeType;if(!S)if(L===s)M===s?d(t,n)||(w(t),_=function(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}(t,(R=n.nodeName,(P=n.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==P?a.createElementNS(P,R):a.createElement(R)))):_=n;else if(L===f||L===m){if(M===L)return _.nodeValue!==n.nodeValue&&(_.nodeValue=n.nodeValue),_;_=n}if(_===n)w(t);else{if(n.isSameNode&&n.isSameNode(_))return;if(I(_,n,S),k)for(var V=0,j=k.length;V<j;V++){var B=E[k[V]];B&&x(B,B.parentNode,!1)}}return!S&&_!==t&&t.parentNode&&(_.actualize&&(_=_.actualize(t.ownerDocument||a)),t.parentNode.replaceChild(_,t)),_}),g=function(e){return e=e||Object.create(null),{on:function(t,n){(e[t]||(e[t]=[])).push(n)},off:function(t,n){e[t]&&e[t].splice(e[t].indexOf(n)>>>0,1)},emit:function(t,n){(e[t]||[]).slice().map(function(e){e(n)}),(e["*"]||[]).slice().map(function(e){e(t,n)})}}},A={};Object.defineProperty(A,"__esModule",{value:!0}),A.default={onblur:"blur",onchange:"change",oncontextmenu:"contextmenu",onfocus:"focus",oninput:"input",oninvalid:"invalid",onreset:"reset",onsearch:"search",onselect:"select",onsubmit:"submit",onkeydown:"keydown",onkeypress:"keypress",onkeyup:"keyup",onclick:"click",ondblclick:"dblclick",onmousedown:"mousedown",onmousemove:"mousemove",onmouseout:"mouseout",onmouseover:"mouseover",onmouseup:"mouseup",onwheel:"wheel",onanimationend:"animationend",onanimationstart:"animationstart",ondrag:"drag",ondragend:"dragend",ondragenter:"dragenter",ondragexit:"dragexit",ondragleave:"dragleave",ondragover:"dragover",ondragstop:"dragstop",ondrop:"drop"};var N={};function y(e){for(var t in e)N.hasOwnProperty(t)||(N[t]=e[t])}return Object.defineProperty(N,"__esModule",{value:!0}),y(n({})),y(r({})),N});
//# sourceMappingURL=frpuccino.umd.js.map