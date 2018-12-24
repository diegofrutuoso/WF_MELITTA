/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(__global){"use strict";function pathOnly(h){var p=h.search(/[?#]/);return p<0?h:h.slice(0,p);}function docBase(){return pathOnly(document.baseURI);}var resolveURL=(function(_){try{if(!/localhost/.test(new _('index.html','http://localhost:8080/'))){_=null;}}catch(e){_=null;}if(_){return function(u,B){return new _(u,B?new _(B,docBase()):docBase()).toString();};}var d=document.implementation.createHTMLDocument("Dummy doc for resolveURI");var b=d.createElement('base');b.href=docBase();d.head.appendChild(b);var a=d.createElement("A");d.body.appendChild(a);return function(u,B){b.href=docBase();if(B!=null){a.href=B;b.href=a.href;}a.href=u;return a.href;};}(__global.URL||__global.webkitURL));function noop(){}function forEach(o,c){Object.keys(o).forEach(function(k){c(k,o[k]);});}var log={debug:noop,info:noop,warning:noop,error:noop,isLoggable:noop};var assert=noop;var measure;var translate;var strictModuleDefinitions=true;var bGlobalAsyncMode=false;var bExposeAsAMDLoader=false;var syncCallBehavior=0;var DEFAULT_BASE_URL="./";var vOriginalDefine;var vOriginalRequire;var mUrlPrefixes=Object.create(null);mUrlPrefixes['']={url:DEFAULT_BASE_URL,absoluteUrl:resolveURL(DEFAULT_BASE_URL,document.baseURI)};var mMaps=Object.create(null),mShims=Object.create(null),mDepCache=Object.create(null),bDebugSources=false,fnIgnorePreload;var mModules=Object.create(null),bForceSyncDefines=null,_execStack=[],sLogPrefix="",iAnonymousModuleCount=0,MAX_EXEC_SCRIPT_LENGTH=512*1024;function urnToUI5(n){if(!/\.js$/.test(n)){return undefined;}n=n.slice(0,-3);if(/^jquery\.sap\./.test(n)){return n;}return n.replace(/\//g,".");}function urnToIDAndType(r){var b=r.lastIndexOf('/'),d=r.lastIndexOf('.');if(d>b){return{id:r.slice(0,d),type:r.slice(d)};}return{id:r,type:''};}var rJSSubTypes=/(\.controller|\.fragment|\.view|\.designtime|\.support)?.js$/;function urnToBaseIDAndSubType(r){var m=rJSSubTypes.exec(r);if(m){return{baseID:r.slice(0,m.index),subType:m[0]};}}var rDotSegmentAnywhere=/(?:^|\/)\.+(?=\/|$)/;var rDotSegment=/^\.*$/;function normalize(r,b){var p=r.search(rDotSegmentAnywhere),s,S,i,j,l;if(p<0){return r;}if(p===0){if(b==null){throw new Error("relative name not supported ('"+r+"'");}r=b.slice(0,b.lastIndexOf('/')+1)+r;}s=r.split('/');for(i=0,j=0,l=s.length;i<l;i++){S=s[i];if(rDotSegment.test(S)){if(S==='.'||S===''){continue;}else if(S==='..'){if(j===0){throw new Error("Can't navigate to parent of root ('"+r+"')");}j--;}else{throw new Error("Illegal path segment '"+S+"' ('"+r+"')");}}else{s[j++]=S;}}s.length=j;return s.join('/');}function registerResourcePath(r,u){r=String(r||"");if(u==null){if(r){if(mUrlPrefixes[r]){delete mUrlPrefixes[r];log.info("registerResourcePath ('"+r+"') (registration removed)");}return;}u=DEFAULT_BASE_URL;log.info("registerResourcePath ('"+r+"') (default registration restored)");}u=pathOnly(String(u));if(u.slice(-1)!=='/'){u+='/';}mUrlPrefixes[r]={url:u,absoluteUrl:resolveURL(u)};}function getResourcePath(r,s){var n=r,p=r.length,P;while(p>0&&!mUrlPrefixes[n]){p=n.lastIndexOf('/');n=p>0?n.slice(0,p):'';}assert((p>0||n==='')&&mUrlPrefixes[n],"there always must be a mapping");P=mUrlPrefixes[n].url+r.slice(p+1);if(P.slice(-1)==='/'){P=P.slice(0,-1);}return P+(s||'');}function getSyncCallBehavior(){return syncCallBehavior;}function guessResourceName(u){var n,U,r;u=pathOnly(resolveURL(u));for(n in mUrlPrefixes){U=mUrlPrefixes[n].absoluteUrl.slice(0,-1);if(u.indexOf(U)===0){r=n+u.slice(U.length);if(r.charAt(0)==='/'){r=r.slice(1);}if(mModules[r]&&mModules[r].data){return r;}}}}function findMapForContext(c){var p,m;if(c!=null){c=urnToIDAndType(c).id;p=c.length;m=mMaps[c];while(p>0&&m==null){p=c.lastIndexOf('/');if(p>0){c=c.slice(0,p);m=mMaps[c];}}}return m||mMaps['*'];}function getMappedName(r,R){var m=findMapForContext(R),P,p;r=normalize(r,R);if(m!=null){P=urnToIDAndType(r).id;p=P.length;while(p>0&&m[P]==null){p=P.lastIndexOf('/');P=p>0?P.slice(0,p):'';}if(p>0){if(log.isLoggable()){log.debug('module ID '+r+" mapped to "+m[P]+r.slice(p));}return m[P]+r.slice(p);}}return r;}function getGlobalObject(o,n,l,c){for(var i=0;o&&i<l;i++){if(!o[n[i]]&&c){o[n[i]]={};}o=o[n[i]];}return o;}function getGlobalProperty(n){var N=n?n.split("."):[];if(syncCallBehavior&&N.length>1){log.error("[nosync] getGlobalProperty called to retrieve global name '"+n+"'");}return getGlobalObject(__global,N,N.length);}function setGlobalProperty(n,v){var N=n?n.split("."):[],o;if(N.length>0){o=getGlobalObject(__global,N,N.length-1,true);o[N[N.length-1]]=v;}}var INITIAL=0,PRELOADED=-1,LOADING=1,LOADED=2,EXECUTING=3,READY=4,FAILED=5,NOT_YET_DETERMINED={};function Module(n){this.name=n;this.state=INITIAL;this.settled=false;this.url=this._deferred=this.data=this.group=this.error=this.pending=null;this.content=NOT_YET_DETERMINED;}Module.prototype.deferred=function(){if(this._deferred==null){var d=this._deferred={};d.promise=new Promise(function(r,a){d.resolve=r;d.reject=a;});d.promise.catch(noop);}return this._deferred;};Module.prototype.api=function(){if(this._api==null){this._exports={};this._api={id:this.name.slice(0,-3),exports:this._exports,url:this.url,config:noop};}return this._api;};Module.prototype.ready=function(v){assert(!this.settled,"Module "+this.name+" is already settled");this.state=READY;this.settled=true;if(arguments.length>0){this.content=v;}this.deferred().resolve(this.value());if(this.aliases){v=this.value();this.aliases.forEach(function(a){Module.get(a).ready(v);});}};Module.prototype.fail=function(e){assert(!this.settled,"Module "+this.name+" is already settled");this.settled=true;if(this.state!==FAILED){this.state=FAILED;this.error=e;this.deferred().reject(e);if(this.aliases){this.aliases.forEach(function(a){Module.get(a).fail(e);});}}};Module.prototype.addPending=function(d){(this.pending||(this.pending=[])).push(d);};Module.prototype.addAlias=function(a){(this.aliases||(this.aliases=[])).push(a);Module.get(a).addPending(this.name);};Module.prototype.preload=function(u,d,b){if(this.state===INITIAL&&!(fnIgnorePreload&&fnIgnorePreload(this.name))){this.state=PRELOADED;this.url=u;this.data=d;this.group=b;}return this;};Module.prototype.value=function(){if(this.state===READY){if(this.content===NOT_YET_DETERMINED){var s=mShims[this.name],e=s&&(Array.isArray(s.exports)?s.exports[0]:s.exports);this.content=getGlobalProperty(e||urnToUI5(this.name));}return this.content;}return undefined;};Module.prototype.dependsOn=function(d){var a=d.name,v=Object.create(null);function b(m){if(!v[m]){v[m]=true;var p=mModules[m]&&mModules[m].pending;return Array.isArray(p)&&(p.indexOf(a)>=0||p.some(b));}return false;}return this.name===a||b(this.name);};Module.get=function(m){return mModules[m]||(mModules[m]=new Module(m));};function ensureStacktrace(e){if(!e.stack){try{throw e;}catch(a){return a;}}return e;}function makeNestedError(m,c){var e=new Error(m+": "+c.message);e.cause=c;e.loadError=c.loadError;ensureStacktrace(e);ensureStacktrace(c);if(e.stack&&c.stack){try{e.stack=e.stack+"\nCaused by: "+c.stack;}catch(a){}}return e;}function declareModule(m){var M;assert(/\.js$/.test(m),"must be a Javascript module");M=Module.get(m);if(M.state>INITIAL){return M;}if(log.isLoggable()){log.debug(sLogPrefix+"declare module '"+m+"'");}M.state=READY;return M;}function defineModuleSync(r,v){Module.get(r).ready(v);}var queue=new function ModuleDefinitionQueue(){var q=[],r=0,t;this.push=function(n,d,f,_){if(log.isLoggable()){log.debug("pushing define from "+(document.currentScript&&document.currentScript.src));}q.push({name:n,deps:d,factory:f,_export:_,guess:document.currentScript&&document.currentScript.getAttribute('data-sap-ui-module')});if(!t){t=setTimeout(this.process.bind(this,null));}};this.clear=function(){q=[];if(t){clearTimeout(t);t=null;}};this.process=function(R){var l=log.isLoggable(),c=r++,Q=q,m=null;this.clear();if(R){if(R.execError){if(l){log.debug("module execution error detected, ignoring queued define calls ("+Q.length+")");}R.fail(R.execError);return;}}m=R&&R.name;Q.forEach(function(e){if(e.name==null){if(m!=null){e.name=m;m=null;}else{if(strictModuleDefinitions){var E=new Error("Modules that use an anonymous define() call must be loaded with a require() call; "+"they must not be executed via script tag or nested into other modules. ");if(R){R.fail(E);}else{throw E;}}e.name='~anonymous~'+(++iAnonymousModuleCount)+'.js';log.error("Modules that use an anonymous define() call must be loaded with a require() call; "+"they must not be executed via script tag or nested into other modules. "+"All other usages will fail in future releases or when standard AMD loaders are used. "+"Now using substitute name "+e.name);}}else if(R&&e.name===R.name){if(m==null&&!strictModuleDefinitions){log.error("Duplicate module definition: both, an unnamed module and a module with the expected name exist."+"This use case will fail in future releases or when standard AMD loaders are used. ");}m=null;}});if(m&&Q.length>0){if(l){log.debug("No queued module definition matches the ID of the request. "+"Now assuming that the first definition '"+Q[0].name+"' is an alias of '"+m+"'");}Module.get(Q[0].name).addAlias(m);m=null;}if(l){log.debug("processing define queue "+c+(R?" for "+R.name:"")+" with "+Q.map(function(e){return e.name;}));}Q.forEach(function(e){executeModuleDefinition(e.name,e.deps,e.factory,e._export,true);if(l){log.debug("define called for "+e.name);}});if(m!=null&&!R.settled){if(l){log.debug("no queued module definition for the requested module found, assume the module to be ready");}R.data=undefined;R.ready();}if(l){log.debug("processing define queue done "+c);}};}();function loadSyncXHR(m){var x=new XMLHttpRequest();function a(b){b=b||ensureStacktrace(new Error(x.status+" - "+x.statusText));b.status=x.status;b.statusText=x.statusText;b.loadError=true;return b;}x.addEventListener('load',function(e){if(x.status===200||x.status===0){m.state=LOADED;m.data=x.responseText;}else{m.error=a();}});x.addEventListener('error',function(e){m.error=a();});x.open('GET',m.url,false);try{x.send();}catch(b){m.error=a(b);}}if('currentScript'in document){window.addEventListener('error',function onUncaughtError(e){var m=document.currentScript&&document.currentScript.getAttribute('data-sap-ui-module');var M=m&&Module.get(m);if(M&&M.execError==null){if(log.isLoggable()){log.debug("unhandled exception occurred while executing "+m+": "+e.message);}M.execError=e.error||{name:'Error',message:e.message};return false;}});}function loadScript(m,a){var s;function o(e){if(log.isLoggable()){log.debug("Javascript resource loaded: "+m.name);}s.removeEventListener('load',o);s.removeEventListener('error',b);queue.process(m);}function b(e){s.removeEventListener('load',o);s.removeEventListener('error',b);if(a){log.warning("retry loading Javascript resource: "+m.name);if(s&&s.parentNode){s.parentNode.removeChild(s);}m.url=a;loadScript(m,null);return;}log.error("failed to load Javascript resource: "+m.name);m.fail(ensureStacktrace(new Error("failed to load '"+m.name+"' from "+m.url+": script load error")));}s=document.createElement('SCRIPT');s.src=m.url;s.setAttribute("data-sap-ui-module",m.name);if(a!==undefined){s.addEventListener('load',o);s.addEventListener('error',b);}document.head.appendChild(s);}function preloadDependencies(m){var k=mDepCache[m];if(Array.isArray(k)){log.debug("preload dependencies for "+m+": "+k);k.forEach(function(d){d=getMappedName(d,m);if(/\.js$/.test(d)){requireModule(null,d,true);}});}}function requireModule(r,m,a,s){var l=log.isLoggable(),S=urnToBaseIDAndSubType(m),o=mShims[m],M,e,i,b,E;if(!S){throw new Error("can only require Javascript module, not "+m);}if(m[0]=="/"){log.error("Module names that start with a slash should not be used, as they are reserved for future use.");}M=Module.get(m);if(o&&o.deps&&!s){if(l){log.debug("require dependencies of raw module "+m);}return requireAll(M,o.deps,function(){return requireModule(r,m,a,true);},function(c){M.fail(c);if(a){return;}throw c;},a);}if(l){log.debug(sLogPrefix+"require '"+m+"' of type '"+S.subType+"'");}if(M.state!==INITIAL){if(M.state===PRELOADED){M.state=LOADED;M.async=a;E=true;measure&&measure.start(m,"Require module "+m+" (preloaded)",["require"]);execModule(m,a);measure&&measure.end(m);}if(M.state===READY){if(l){log.debug(sLogPrefix+"module '"+m+"' has already been loaded (skipped).");}return a?Promise.resolve(M.value()):M.value();}else if(M.state===FAILED){if(a){return M.deferred().promise;}else{throw(E?M.error:makeNestedError("found in negative cache: '"+m+"' from "+M.url,M.error));}}else{if(a){if(r&&M.dependsOn(r)){if(log.isLoggable()){log.debug("cycle detected between '"+r.name+"' and '"+m+"', returning undefined for '"+m+"'");}return Promise.resolve(undefined);}return M.deferred().promise;}if(!a&&!M.async){if(log.isLoggable()){log.debug("cycle detected between '"+(r?r.name:"unknown")+"' and '"+m+"', returning undefined for '"+m+"'");}return undefined;}log.warning("Sync request triggered for '"+m+"' while async request was already pending."+" Loading a module twice might cause issues and should be avoided by fully migrating to async APIs.");}}measure&&measure.start(m,"Require module "+m,["require"]);M.state=LOADING;M.async=a;e=bDebugSources?["-dbg",""]:[""];if(!a){for(i=0;i<e.length&&M.state!==LOADED;i++){M.url=getResourcePath(S.baseID,e[i]+S.subType);if(l){log.debug(sLogPrefix+"loading "+(e[i]?e[i]+" version of ":"")+"'"+m+"' from '"+M.url+"'");}if(syncCallBehavior){b="[nosync] loading module '"+M.url+"'";if(syncCallBehavior===1){log.error(b);}else{throw new Error(b);}}ui5Require.load({completeLoad:noop,async:false},M.url,S.baseID);loadSyncXHR(M);}if(M.state===LOADING){M.fail(makeNestedError("failed to load '"+m+"' from "+M.url,M.error));}else if(M.state===LOADED){execModule(m,a);}measure&&measure.end(m);if(M.state!==READY){if(fnIgnorePreload){loadScript(M);}throw M.error;}return M.value();}else{M.url=getResourcePath(S.baseID,e[0]+S.subType);var A=bDebugSources?getResourcePath(S.baseID,e[1]+S.subType):M.url;ui5Require.load({completeLoad:noop,async:true},A,S.baseID);loadScript(M,A);preloadDependencies(m);return M.deferred().promise;}}function execModule(sModuleName,bAsync){var oModule=mModules[sModuleName],oShim=mShims[sModuleName],bLoggable=log.isLoggable(),sOldPrefix,sScript,vAMD,oMatch,bOldForceSyncDefines;if(oModule&&oModule.state===LOADED&&typeof oModule.data!=="undefined"){vAMD=(oShim===true||(oShim&&oShim.amd))&&typeof __global.define==="function"&&__global.define.amd;bOldForceSyncDefines=bForceSyncDefines;try{if(vAMD){delete __global.define.amd;}bForceSyncDefines=!bAsync;if(bLoggable){log.debug(sLogPrefix+"executing '"+sModuleName+"'");sOldPrefix=sLogPrefix;sLogPrefix=sLogPrefix+": ";}oModule.state=EXECUTING;_execStack.push({name:sModuleName,used:false});if(typeof oModule.data==="function"){oModule.data.call(__global);}else if(Array.isArray(oModule.data)){ui5Define.apply(null,oModule.data);}else{sScript=oModule.data;if(sScript){oMatch=/\/\/[#@] source(Mapping)?URL=(.*)$/.exec(sScript);if(oMatch&&oMatch[1]&&/^[^/]+\.js\.map$/.test(oMatch[2])){sScript=sScript.slice(0,oMatch.index)+oMatch[0].slice(0,-oMatch[2].length)+resolveURL(oMatch[2],oModule.url);}if(!oMatch||oMatch[1]){sScript+="\n//# sourceURL="+resolveURL(oModule.url)+"?eval";}}if(typeof translate==="function"){sScript=translate(sScript,sModuleName);}if(__global.execScript&&(!oModule.data||oModule.data.length<MAX_EXEC_SCRIPT_LENGTH)){try{oModule.data&&__global.execScript(sScript);}catch(e){_execStack.pop();eval(oModule.data);throw e;}}else{__global.eval(sScript);}}_execStack.pop();queue.process(oModule);if(bLoggable){sLogPrefix=sOldPrefix;log.debug(sLogPrefix+"finished executing '"+sModuleName+"'");}}catch(err){if(bLoggable){sLogPrefix=sOldPrefix;}oModule.data=undefined;oModule.fail(err);}finally{if(vAMD){__global.define.amd=vAMD;}bForceSyncDefines=bOldForceSyncDefines;}}}function requireAll(r,d,c,e,a){var b,m=[],l=log.isLoggable(),i,D,E,p;try{if(r instanceof Module){b=r.name;}else{b=r;r=null;}d=d.slice();for(i=0;i<d.length;i++){d[i]=getMappedName(d[i]+'.js',b);}if(r){d.forEach(function(g){if(!/^(require|exports|module)\.js$/.test(g)){r.addPending(g);}});}for(i=0;i<d.length;i++){D=d[i];if(l){log.debug(sLogPrefix+"require '"+D+"'");}if(r){switch(D){case'require.js':m[i]=createContextualRequire(b,true);break;case'module.js':m[i]=r.api();break;case'exports.js':r.api();m[i]=r._exports;break;default:break;}}if(!m[i]){m[i]=requireModule(r,D,a);}if(l){log.debug(sLogPrefix+"require '"+D+"': done.");}}}catch(f){E=f;}if(a){p=E?Promise.reject(E):Promise.all(m);return p.then(c,e);}else{if(E){e(E);}else{return c(m);}}}function executeModuleDefinition(r,d,f,e,a){var l=log.isLoggable();r=normalize(r);if(l){log.debug("define("+r+", "+"['"+d.join("','")+"']"+")");}var m=declareModule(r);var b=false;function s(){if(m.settled){if(m.state>=READY&&a&&m.async===false){log.warning("Repeated module execution skipped after async/sync conflict for "+m.name);return true;}if(strictModuleDefinitions&&a){log.warning("Module '"+m.name+"' has been defined more than once. "+"All but the first definition will be ignored, don't try to define the same module again.");return true;}if(!b){log.error("Module '"+m.name+"' is executed more than once. "+"This is an unsupported scenario and will fail in future versions of UI5 or "+"when a standard AMD loader is used. Don't define the same module again.");b=true;}}}if(s()){return;}m.content=undefined;requireAll(m,d,function(M){if(s()){return;}if(l){log.debug("define("+r+"): calling factory "+typeof f);}if(e&&syncCallBehavior!==2){var p=r.split('/');if(p.length>1){getGlobalObject(__global,p,p.length-1,true);}}if(typeof f==='function'){try{var c=f.apply(__global,M);if(m._api&&m._api.exports!==undefined&&m._api.exports!==m._exports){c=m._api.exports;}else if(c===undefined&&m._exports){c=m._exports;}m.content=c;}catch(g){m.fail(g);if(a){return;}throw g;}}else{m.content=f;}if(e&&syncCallBehavior!==2){if(m.content==null){log.error("Module '"+r+"' returned no content, but should export to global?");}else{if(l){log.debug("exporting content of '"+r+"': as global object");}var h=urnToUI5(r);setGlobalProperty(h,m.content);}}m.ready();},function(E){m.fail(E);if(!a){throw E;}},a);}function ui5Define(m,d,f,e){var r,c;if(typeof m==='string'){r=m+'.js';}else{e=f;f=d;d=m;r=null;}if(!Array.isArray(d)){e=f;f=d;if(typeof f==='function'&&f.length>0){d=['require','exports','module'].slice(0,f.length);}else{d=[];}}if(bForceSyncDefines===false||(bForceSyncDefines==null&&bGlobalAsyncMode)){queue.push(r,d,f,e);if(r!=null){var M=Module.get(r);if(M.state===INITIAL){M.state=EXECUTING;M.async=true;}}return;}c=_execStack.length>0?_execStack[_execStack.length-1]:null;if(!r){if(c&&!c.used){r=c.name;c.used=true;}else{r='~anonymous~'+(++iAnonymousModuleCount)+'.js';if(c){r=c.name.slice(0,c.name.lastIndexOf('/')+1)+r;}log.error("Modules that use an anonymous define() call must be loaded with a require() call; "+"they must not be executed via script tag or nested into other modules. "+"All other usages will fail in future releases or when standard AMD loaders are used "+"or when ui5loader runs in async mode. Now using substitute name "+r);}}else if(c&&!c.used&&r!==c.name){log.debug("module names don't match: requested: "+m+", defined: ",c.name);Module.get(c.name).addAlias(m);}executeModuleDefinition(r,d,f,e,false);}function amdDefine(m,d,f){var a=arguments;var e=typeof a[a.length-1]==="boolean";if(e){a=Array.prototype.slice.call(a,0,a.length-1);}ui5Define.apply(this,a);}amdDefine.amd={};function createContextualRequire(c,a){var r=function(d,C,e){var m;assert(typeof d==='string'||Array.isArray(d),"dependency param either must be a single string or an array of strings");assert(C==null||typeof C==='function',"callback must be a function or null/undefined");assert(e==null||typeof e==='function',"error callback must be a function or null/undefined");if(typeof d==='string'){m=getMappedName(d+'.js',c);var M=Module.get(m);if(a&&M.state!==EXECUTING&&M.state!==READY){throw new Error("Module '"+m+"' has not been loaded yet. "+"Use require(['"+m+"']) to load it.");}return M.value();}requireAll(c,d,function(b){if(typeof C==='function'){if(bGlobalAsyncMode){C.apply(__global,b);}else{setTimeout(function(){C.apply(__global,b);},0);}}},function(E){if(typeof e==='function'){if(bGlobalAsyncMode){e.call(__global,E);}else{setTimeout(function(){e.call(__global,E);},0);}}else{throw E;}},bGlobalAsyncMode);};r.toUrl=function(n){var m=ensureTrailingSlash(getMappedName(n,c),n);return toUrl(m);};return r;}function ensureTrailingSlash(n,i){if(i.slice(-1)==="/"&&n.slice(-1)!=="/"){return n+"/";}return n;}function toUrl(n){if(n.indexOf("/")===0){throw new Error("The provided argument '"+n+"' may not start with a slash");}return ensureTrailingSlash(getResourcePath(n),n);}var ui5Require=createContextualRequire(null,false);var amdRequire=createContextualRequire(null,true);function requireSync(m){m=getMappedName(m+'.js');return requireModule(null,m,false);}function predefine(m,d,f,e){if(typeof m!=='string'){throw new Error("predefine requires a module name");}m=normalize(m);Module.get(m+'.js').preload("<unknown>/"+m,[m,d,f,e],null);}function preload(m,g,u){g=g||null;u=u||"<unknown>";for(var n in m){n=normalize(n);Module.get(n).preload(u+"/"+n,m[n],g);}}function dumpInternals(t){var s=[PRELOADED,INITIAL,LOADED,READY,FAILED,EXECUTING,LOADING];var a={};a[PRELOADED]='PRELOADED';a[INITIAL]='INITIAL';a[LOADING]='LOADING';a[LOADED]='LOADED';a[EXECUTING]='EXECUTING';a[READY]='READY';a[FAILED]='FAILED';if(t==null){t=PRELOADED;}var i=log.isLoggable('INFO')?log.info.bind(log):console.info.bind(console);var m=Object.keys(mModules).sort();s.forEach(function(b){if(b<t){return;}var c=0;i(a[b]+":");m.forEach(function(M,d){var o=mModules[M];if(o.state===b){var e;if(o.state===LOADING){var p=o.pending&&o.pending.reduce(function(f,g){var D=Module.get(g);if(D.state!==READY){f.push(g+"("+a[D.state]+")");}return f;},[]);if(p&&p.length>0){e="waiting for "+p.join(", ");}}else if(o.state===FAILED){e=(o.error.name||"Error")+": "+o.error.message;}i("  "+(d+1)+" "+M+(e?" ("+e+")":""));c++;}});if(c===0){i("  none");}});}function getUrlPrefixes(){var u=Object.create(null);forEach(mUrlPrefixes,function(n,U){u[n]=U.url;});return u;}function unloadResources(n,p,u,d){var m=[],U,M;if(p==null){p=true;}if(p){for(U in mModules){M=mModules[U];if(M&&M.group===n){m.push(U);}}}else{if(mModules[n]){m.push(n);}}m.forEach(function(U){var M=mModules[U];if(M&&d&&U.match(/\.js$/)){setGlobalProperty(urnToUI5(U),undefined);}if(M&&(u||M.state===PRELOADED)){delete mModules[U];}});}function getModuleContent(n,u){if(n){n=getMappedName(n);}else{n=guessResourceName(u);}var m=n&&mModules[n];if(m){m.state=LOADED;return m.data;}else{return undefined;}}function getAllModules(){var s=Object.create(null);forEach(mModules,function(u,m){s[u]={state:m.state,ui5:urnToUI5(u)};});return s;}function loadJSResourceAsync(r,i){r=getMappedName(r);var p=requireModule(null,r,true);return i?p.catch(noop):p;}var mUI5ConfigHandlers={baseUrl:function(u){registerResourcePath("",u);},paths:registerResourcePath,shim:function(m,s){if(Array.isArray(s)){s={deps:s};}mShims[m+'.js']=s;},amd:function(v){v=!!v;if(bExposeAsAMDLoader!==v){bExposeAsAMDLoader=v;if(v){vOriginalDefine=__global.define;vOriginalRequire=__global.require;__global.define=amdDefine;__global.require=amdRequire;bGlobalAsyncMode=true;}else{__global.define=vOriginalDefine;__global.require=vOriginalRequire;}}},async:function(a){if(bGlobalAsyncMode&&!a){throw new Error("Changing the ui5loader config from async to sync is not supported. Only a change from sync to async is allowed.");}bGlobalAsyncMode=!!a;},debugSources:function(d){bDebugSources=!!d;},depCache:function(m,d){mDepCache[m+'.js']=d.map(function(a){return a+'.js';});},depCacheUI5:function(m,d){mDepCache[m]=d;},ignoreBundledResources:function(f){if(f==null||typeof f==='function'){fnIgnorePreload=f;}},map:function(c,m){if(m==null){delete mMaps[c];}else if(typeof m==='string'){mMaps['*'][c]=m;}else{mMaps[c]=mMaps[c]||Object.create(null);forEach(m,function(a,n){mMaps[c][a]=n;});}},reportSyncCalls:function(r){if(r===0||r===1||r===2){syncCallBehavior=r;}},noConflict:function(v){log.warning("Config option 'noConflict' has been deprecated, use option 'amd' instead, if still needed.");mUI5ConfigHandlers.amd(!v);}};var mAMDConfigHandlers={baseUrl:mUI5ConfigHandlers.baseUrl,paths:function(m,u){registerResourcePath(m,resolveURL(u,getResourcePath("")+"/"));},map:mUI5ConfigHandlers.map,shim:mUI5ConfigHandlers.shim};function handleConfigObject(c,h){function p(k,v){var a=h[k];if(typeof a==='function'){if(a.length===1){a(v);}else if(v!=null){forEach(v,a);}}else{log.warning("configuration option "+k+" not supported (ignored)");}}if(c.baseUrl){p("baseUrl",c.baseUrl);}forEach(c,function(k,v){if(k!=="baseUrl"){p(k,v);}});}function ui5Config(c){if(c===undefined){return{amd:bExposeAsAMDLoader,async:bGlobalAsyncMode,noConflict:!bExposeAsAMDLoader};}handleConfigObject(c,mUI5ConfigHandlers);}function amdConfig(c){if(c===undefined){return undefined;}handleConfigObject(c,mAMDConfigHandlers);}ui5Require.preload=preload;ui5Require.load=function(c,u,i){};var privateAPI={amdDefine:amdDefine,amdRequire:amdRequire,config:ui5Config,declareModule:function(r){declareModule(normalize(r));},defineModuleSync:defineModuleSync,dump:dumpInternals,getAllModules:getAllModules,getModuleContent:getModuleContent,getModuleState:function(r){return mModules[r]?mModules[r].state:INITIAL;},getResourcePath:getResourcePath,getSyncCallBehavior:getSyncCallBehavior,getUrlPrefixes:getUrlPrefixes,loadJSResourceAsync:loadJSResourceAsync,resolveURL:resolveURL,toUrl:toUrl,unloadResources:unloadResources};Object.defineProperties(privateAPI,{logger:{get:function(){return log;},set:function(v){log=v;}},measure:{get:function(){return measure;},set:function(v){measure=v;}},assert:{get:function(){return assert;},set:function(v){assert=v;}},translate:{get:function(){return translate;},set:function(v){translate=v;}}});__global.sap=__global.sap||{};sap.ui=sap.ui||{};sap.ui.loader={config:ui5Config,_:privateAPI};amdRequire.config=amdConfig;sap.ui.define=ui5Define;sap.ui.predefine=predefine;sap.ui.require=ui5Require;sap.ui.requireSync=requireSync;}(window));
