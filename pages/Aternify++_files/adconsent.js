try{!function(e,n,t,a,i,o,s){const r=e._snigelConfig;if(r)try{a=r.settings.adconsent.objName}catch(e){}const l=void 0,c=39,u=2,p=229,d="function",f=0,g=1,v=2;function m(n,t,arguments,a){e.console[n]&&C.level>=t&&console[n].apply(console,function(e,n,t){return e=[].slice.call(e),n&&e.unshift(n),e.unshift("display: inline-block; color: #fff; background: "+t+"; padding: 1px 4px; border-radius: 3px;"),e.unshift("%cAdConsent"),e}(arguments,n.toUpperCase()+":",a))}function b(e,n){return{region:e,loaded:!1,applies:l,version:n,status:"stub"}}!function(){if(typeof e.CustomEvent===d)return!1;function t(e,t){t=t||{bubbles:!1,cancelable:!1,detail:l};var a=n.createEvent("CustomEvent");return a.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),a}t.prototype=e.Event.prototype,e.CustomEvent=t}();var y=function(n,t,a){e.__cmp(n,t,a)};y.version=c,y.cmpId=p,y.cfg={apiBaseUrl:"https://cdn.snigelweb.com/adconsent/39"},y.log={levels:{off:0,error:1,warning:2,info:3,debug:4},level:2,error:function(){m("error",1,arguments,"#ff0000")},warn:function(){m("warn",2,arguments,"#ffe600")},info:function(){m("info",3,arguments,"#3b88a3")},debug:function(){m("debug",4,arguments,"#808080")}};var C=y.log,h=C.debug,_=C.info,E=C.warn,L=C.error;y.consent={regions:{0:"NONE",1:"GDPR",2:"CCPA"},region:l,api:{__tcfapi:b(g,u),__uspapi:b(v,1)}};var S=y.consent,A=S.regions,I=S.api,k=I.__tcfapi,D=I[s];y.analytics={enabled:!1,callback:l,send:function(e){N.sendEvent(A[S.region],e,Math.floor(performance.now()))},sendEvent:function(n,t,a){_("Sending analytics event action"+(N.enabled?"":" disabled")+": "+n+", label: "+t+", value: "+a),N.enabled&&(sendFunc=N.callback||function(n){e.gtag?gtag("event",n.action,{event_category:n.category,event_label:n.label,event_value:n.value}):e.ga?ga("send",{hitType:"event",eventCategory:n.category,eventAction:n.action,eventLabel:n.label,eventValue:n.value,nonInteraction:n.nonInteraction}):E("Unable to find Google Analytics module (gtag or ga).")},sendFunc({category:"AdConsent",action:n,label:t||n,value:a||0,nonInteraction:!0}))}};var N=y.analytics,U=N.send;y.event={fired:{},dispatchCustomEvent:function(e,t,a){a&&T[e]||(T[e]=!0,h("Emitting custom event "+e+" with details: ",t),n.dispatchEvent(new CustomEvent(e,t)))},dispatchCustomEventConsent:function(e,n){var t={0:"N/A",1:"NoConsent",2:"PartialConsent",3:"FullConsent"};U(t[n]),S.region==g&&0!=e&&U("Publisher"+t[e]),w.dispatchCustomEvent("cmpConsentAvailable",{detail:{consentSummary:{mapping:{0:"not available",1:"no consent",2:"partial consent",3:"full consent"},publisherConsent:e,vendorsConsent:n,gdprApplies:k.applies,uspApplies:D.applies}}})}};var w=y.event,T=w.fired;y.gdpr={listenerId:1,tcfListeners:[],addEventListener:function(e,n,t){if(O(k,e,n)){h("Adding event listener "+G.listenerId,n);var a={id:G.listenerId++,callback:n||function(){}};G.tcfListeners.push(a),t(null,a.id,a.callback)}},removeEventListener:function(e,n,t,a,i){if(O(k,t,a)){h("Removing event listener "+i);for(var o=0;o<G.tcfListeners.length;o++)if(G.tcfListeners[o].id==i)return G.tcfListeners.splice(o,1),void B(a,!0);L("Couldn't find listener id "+i+"."),B(a,!1)}},getTCData:function(e,n,t,a){O(k,t,a)&&V(null,0,a)},processListeners:function(e){for(var n=G.tcfListeners.slice(),t=0;t<n.length;t++)e(null,n[t].id,n[t].callback)}};var q,G=y.gdpr;if(queryStrings=(q=e.location.search)?q.replace(/^\?/,"").split("&").reduce(function(e,n){var t=n.split("="),a=t[0],i=t.length>1?t[1]:l;return/\[\]$/.test(a)?(e[a=a.replace("[]","")]=e[a]||[],e[a].push(i)):e[a]=i||"",e},{}):{},logLevel=("true"==queryStrings.sn_debug?"debug":null)||("true"==queryStrings.adconsent_debug?"debug":null)||queryStrings.adconsent_log,C.level=C.levels[logLevel]||C.level,e[a])L("Stub is tried to load again!");else if(e.__tcfapi||e[s])E("A cmp is already registered in the system. AdConsent is stopping.");else{e[a]=y;var P=l,R=!1;x("__tcfapi",!0,{start:M,setGDPRApplies:Q(k,g,D),enableGoogleAnalytics:z,ping:function(e,n,t,a){B(a,{gdprApplies:k.applies,cmpLoaded:k.loaded,cmpStatus:k.status,displayStatus:"disabled",apiVersion:"2.0",cmpVersion:c,cmpId:p,gvlVersion:l,tcfPolicyVersion:u},!0)},getTCData:G.getTCData,addEventListener:function(e,n,t,a,i){G.addEventListener(t,a,V)},removeEventListener:G.removeEventListener}),x(s,!0,{start:M,setUSPApplies:Q(D,v,k),enableGoogleAnalytics:z,getUSPData:function(e,n,t,a,i){!1===D.applies?O(D,t,a)&&B(a,{version:1,uspString:"1---"},!0):j(e,n,t,i,a)}}),x("__cmp",!1,{start:M,setConsentRegion:J,setGDPRApplies:Q(k,g,D),setUSPApplies:Q(D,v,k),enableGoogleAnalytics:z})}function O(e,n,t){return!n||n===e.version||(B(t,null,!1),h("Wrong framework version detected: "+n),!1)}function V(e,n,t){var a=k.applies?l:k.applies,i={tcString:l,tcfPolicyVersion:u,cmpId:p,cmpVersion:c,gdprApplies:a,eventStatus:!1===a?"tcloaded":l,cmpStatus:k.status,listenerId:n,isServiceSpecific:!0,useNonStandardStacks:!1,publisherCC:"US",purposeOneTreatment:!1};h("Sending TCData structure:",i,t),B(t,i,!0)}function j(e,n,t,a,i){e.queue.push({command:n,version:t,parameter:a,callback:i})}function x(t,a,i){var o=t+"Locator",s=function(){if(!e.frames[o]){var t=n.body;t?(iframe=n.createElement("iframe"),iframe.style.display="none",iframe.name=o,t.appendChild(iframe)):setTimeout(s,5)}};s();var r=function(n){var i=n.data,o="string"==typeof i,s={};try{s=o?JSON.parse(i):i}catch(e){}var r=s[t+"Call"];if(r){var c=function(e,a){try{if(n&&n.source&&n.source.postMessage){var i={};i[t+"Return"]={returnValue:e,success:a===l||a,callId:r.callId},n.source.postMessage(o?JSON.stringify(i):i,"*")}}catch(e){}};a?e[t](r.command,r.version,c,r.parameter):e[t](r.command,r.parameter,c)}};if(typeof e[t]!==d){var c=function(n,o,s,r){var l=e[t];if(l.queue){for(var c in i)if(n===c){var u=!0;(0,i[c])(l,n,o,s,r);break}u||j(l,n,o,r,s)}else a?l(n,o,s,r):l(n,r,s)};e[t]=a?c:function(e,n,t){c(e,null,t,n)},e[t].queue=[],e.addEventListener?e.addEventListener("message",r,!1):e.attachEvent("onmessage",r)}}function B(e,n,t){e&&e(n,t)}function M(a,i,o,s,r){if(S.region!==l){if(!R)if(R=!0,0==S.region)w.dispatchCustomEventConsent(3,3);else if(P){var c=n.createElement("script");c.type="text/javascript",c.src=y.cfg.apiBaseUrl+"/adconsent"+P+".js",c.async=!0,c.charset="utf-8",n.head.appendChild(c)}}else!function(n){var a=null,i=t.getItem("snconsent_geo");if(i){var o=t.getItem("snconsent_geo_exp");if(o)try{parseInt(o)>=(new Date).getTime()&&(a=JSON.parse(e.atob(i)))}catch(e){}}if(a)n(a);else{var s=new XMLHttpRequest;s.open("GET","https://pro.ip-api.com/json/?fields=57354&key=33arzTfj1gigDqW"),s.timeout=5e3,s.onload=function(){var a=s.responseText.toLowerCase();t.setItem("snconsent_geo",e.btoa(a)),t.setItem("snconsent_geo_exp",(new Date).getTime()+36e5),n(JSON.parse(a))},s.onerror=s.ontimeout=function(){n(null)},s.send()}}(function(e){var n=e?e.countrycode:null;"us"===n&&"california"===e.regionname?J(l,l,l,l,v):-1!=="at be bg hr cy cz dk ee fi fr de gr hu is ie it lv li lt lu mt nl no pl pt ro sk si es se gb".indexOf(n)?J(l,l,l,l,g):(n||(U("ErrorGeotargeting"),L("Geotargeting failed")),J(l,l,l,l,f)),M()})}function F(){S.region!==g&&G.processListeners(V),S.region!==v&&function(e,n){if(e.queue){cmdQueue=e.queue,e.queue=[];for(var t=0;t<cmdQueue.length;t++){var a=cmdQueue[t];n?e(a.command,a.parameter,a.callback):e(a.command,a.version,a.callback,a.parameter)}}}(e[s])}function J(e,n,t,a,i){if(S.region===l)if(A[i]){for(objName in I){var o=I[objName];o.applies=o.region==i,o.applies?P=objName:(o.loaded=!0,o.status="loaded")}S.region=i,_("Configured consent region "+A[i]),F()}else L("Incorrect consent region "+i)}function Q(e,n,t){return function(a,i,o,s,r){r=!!r,S.region===l&&e.applies===l&&(r?J(0,0,0,0,n):(e.applies=!1,!1===t.applies&&J(0,0,0,0,f)))}}function z(e,n,t,a,i){N.enabled=i===l||!!i,N.callback=a}}(window,document,localStorage,"adconsent",0,0,"__uspapi")}catch(e){console.error(e)}