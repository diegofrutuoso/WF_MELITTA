/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/Button','sap/ui/commons/Menu','sap/ui/core/Control','./ExactAttribute','./ExactList','./library','./ExactBrowserRenderer','sap/ui/core/Popup'],function(B,M,C,E,a,l,b,P){"use strict";var D=P.Dock;var c=l.ExactOrder;var d=C.extend("sap.ui.ux3.ExactBrowser",{metadata:{library:"sap.ui.ux3",properties:{title:{type:"string",group:"Misc",defaultValue:null},headerTitle:{type:"string",group:"Misc",defaultValue:null},topListOrder:{type:"sap.ui.ux3.ExactOrder",defaultValue:c.Select},enableListClose:{type:"boolean",group:"Misc",defaultValue:false},listHeight:{type:"int",group:"Appearance",defaultValue:290},showHeader:{type:"boolean",group:"Misc",defaultValue:false},showTopList:{type:"boolean",group:"Misc",defaultValue:true},enableReset:{type:"boolean",group:"Misc",defaultValue:true},enableSave:{type:"boolean",group:"Misc",defaultValue:false},topListWidth:{type:"int",group:"Misc",defaultValue:168}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.ui.ux3.ExactAttribute",multiple:true,singularName:"attribute",forwarding:{idSuffix:"-rootAttribute",aggregation:"attributes"}},optionsMenu:{type:"sap.ui.commons.Menu",multiple:false},controls:{type:"sap.ui.core.Control",multiple:true,singularName:"control",visibility:"hidden"},rootAttribute:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{followUpControl:{type:"sap.ui.core.Control",multiple:false}},events:{attributeSelected:{parameters:{attribute:{type:"sap.ui.ux3.ExactAttribute"},allAttributes:{type:"object"}}},save:{}}}});d.prototype.init=function(){var t=this;this.data("sap-ui-fastnavgroup","true",true);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._attributeRoot=new E(this.getId()+"-rootAttribute");this.setAggregation("rootAttribute",this._attributeRoot);this._rootList=new a(this.getId()+"-rootlist");this._rootList.setData(this._attributeRoot);this.addAggregation("controls",this._rootList);this._resetButton=new B(this.getId()+"-RstBtn",{text:this._rb.getText("EXACT_BRWSR_RESET"),lite:true});this._resetButton.addStyleClass("sapUiUx3ExactBrwsrReset");this.addAggregation("controls",this._resetButton);this._resetButton.attachPress(function(){t.reset();});this._saveButton=new B(this.getId()+"-SvBtn",{text:this._rb.getText("EXACT_BRWSR_SAVE"),lite:true});this._saveButton.addStyleClass("sapUiUx3ExactBrwsrSave");this.addAggregation("controls",this._saveButton);this._saveButton.attachPress(function(){t.fireSave();});this._rootList.attachAttributeSelected(function(e){t.fireAttributeSelected({attribute:e.getParameter("attribute"),allAttributes:e.getParameter("allAttributes")});});this._rootList.attachEvent("_headerPress",function(e){var m=t.getOptionsMenu();if(m){var o=e.getParameter("domRef");m.open(e.getParameter("keyboard"),o,D.BeginTop,D.BeginBottom,o);}});};d.prototype.exit=function(){this._rootList.destroy();this._attributeRoot.destroy();this._rootList=null;this._attributeRoot=null;this._resetButton=null;this._saveButton=null;this._saveDialog=null;this._saveTextField=null;this._rb=null;};d.prototype.onThemeChanged=function(e){if(this.getDomRef()){this.invalidate();}};d.prototype.getTitle=function(){return this._rootList.getTopTitle();};d.prototype.setTitle=function(t){this._rootList.setTopTitle(t);return this;};d.prototype.setTopListOrder=function(L){this.setProperty("topListOrder",L,true);this._attributeRoot.setListOrder(L);return this;};d.prototype.getTopListWidth=function(){return this._attributeRoot.getWidth();};d.prototype.setTopListWidth=function(w){this._attributeRoot.setWidth(w);return this;};d.prototype.getHeaderTitle=function(){var t=this.getProperty("headerTitle");return t?t:this._rb.getText("EXACT_BRWSR_TITLE");};d.prototype.getEnableListClose=function(){return this._rootList.getShowClose();};d.prototype.setEnableListClose=function(e){this._rootList.setShowClose(e);return this;};d.prototype.getListHeight=function(){return this._rootList.getTopHeight();};d.prototype.setListHeight=function(L){this._rootList.setTopHeight(L);return this;};d.prototype.reset=function(){this._rootList._closeAll();};d.prototype.hasOptionsMenu=function(){return!!this.getOptionsMenu();};return d;});
