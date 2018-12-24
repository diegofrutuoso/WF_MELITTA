/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/matchers/Interactable","sap/ui/test/matchers/Visible","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/ui/test/matchers/matchers"],function(U,I,V,c,q){"use strict";var M=U.extend("sap.ui.test.matchers.MatcherFactory",{getInteractabilityMatchers:function(i){return[i?new I():new V()];},getFilteringMatchers:function(o){var m=_(o);if(o.matchers){if(q.isPlainObject(o.matchers)){m=m.concat(_(o.matchers));}else if(q.isArray(o.matchers)){o.matchers.forEach(function(v){if(q.isPlainObject(v)){m=m.concat(_(v));}else{m.push(v);}});}else{m=m.concat(o.matchers);}}return m;}});function _(m){if(m["isMatching"]){return[m];}var s=["aggregationContainsPropertyEqual","aggregationEmpty","aggregationFilled","aggregationLengthEquals","ancestor","bindingPath","I18NText","labelFor","properties","propertyStrictEquals"];return Object.keys(m).filter(function(a){return s.indexOf(a)>-1;}).map(function(a){var b=c(a);var d=sap.ui.test.matchers[b];var e=q.isArray(m[a])?m[a]:[m[a]];return e.map(function(o){if(q.isArray(o)){return new function(){return d.apply(this,o);}();}else{return new d(o);}});}).reduce(function(r,a){return r.concat(a);},[]);}return M;});