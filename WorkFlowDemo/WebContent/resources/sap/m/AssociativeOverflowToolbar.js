/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/Log','./OverflowToolbar','./OverflowToolbarRenderer','./Toolbar','sap/ui/Device'],function(L,O,a,T,D){"use strict";var A=O.extend("sap.m.AssociativeOverflowToolbar",{metadata:{associations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}},renderer:a});A.prototype.getContent=function(){var b=this.getAssociation("content")||[];return b.map(function(c){return sap.ui.getCore().byId(c);});};A.prototype.insertContent=function(c,I){var s=c.getId(),b=this.getAssociation("content").filter(function(d){return d!==s;});var i;if(I<0){i=0;}else if(I>b.length){i=b.length;}else{i=I;}if(i!==I){L.warning("AssociativeOverflowToolbar.insertContent: index '"+I+"' out of range [0,"+b.length+"], forced to "+i);}b.splice(i,0,s);this.removeAllAssociation("content");b.forEach(function(d){this.addAssociation("content",d);},this);return this;};A.prototype.exit=function(){O.prototype.exit.apply(this,arguments);return this._callToolbarMethod('destroyContent',[true]);};A.prototype.indexOfContent=function(c){var b=this.getAssociation("content")||[];return b.indexOf(c.getId());};A.prototype._handleResize=function(){if(D.system.phone){this._resetAndInvalidateToolbar();}else{this._bControlsInfoCached=false;O.prototype._handleResize.apply(this,arguments);}};A.prototype._callToolbarMethod=function(f,b){switch(f){case'addContent':return this.addAssociation("content",b[0]);case'getContent':return this.getContent();case'insertContent':return this.insertContent(b[0],b[1]);case'removeContent':return sap.ui.getCore().byId(this.removeAssociation("content",b[0],b[1],b[2]))||null;case'destroyContent':this.removeAllAssociation("content",b[0]);return this;case'removeAllContent':return this.removeAllAssociation("content",b[0]).map(function(c){return sap.ui.getCore().byId(c);});default:return T.prototype[f].apply(this,b);}};return A;});
