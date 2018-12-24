/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/Plugin','sap/ui/dt/plugin/ElementMover','sap/ui/dt/OverlayUtil','sap/ui/dt/OverlayRegistry',"sap/ui/events/KeyCodes"],function(P,E,O,a,K){"use strict";var C=P.extend("sap.ui.dt.plugin.CutPaste",{metadata:{library:"sap.ui.dt",properties:{movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]},elementMover:{type:"any"}},associations:{}}});C.prototype.init=function(){this.setElementMover(new E());};C.prototype.registerElementOverlay=function(o){var e=o.getElement();o.attachBrowserEvent("keydown",this._onKeyDown,this);if(this.getElementMover().isMovableType(e)&&this.getElementMover().checkMovable(o)&&!O.isInAggregationBinding(o,e.sParentAggregationName)){o.setMovable(true);}if(this.getElementMover().getMovedOverlay()){this.getElementMover().activateTargetZonesFor(this.getElementMover().getMovedOverlay());}};C.prototype.deregisterElementOverlay=function(o){o.setMovable(false);o.detachBrowserEvent("keydown",this._onKeyDown,this);if(this.getElementMover().getMovedOverlay()){this.getElementMover().deactivateTargetZonesFor(this.getElementMover().getMovedOverlay());}};C.prototype.setMovableTypes=function(m){this.getElementMover().setMovableTypes(m);return this.setProperty("movableTypes",m);};C.prototype.setElementMover=function(e){e.setMovableTypes(this.getMovableTypes());return this.setProperty("elementMover",e);};C.prototype.getCuttedOverlay=function(){return this.getElementMover().getMovedOverlay();};C.prototype.isElementPasteable=function(t){var T=this._getTargetZoneAggregation(t);if((T)||(O.isInTargetZoneAggregation(t))){return true;}else{return false;}};C.prototype._onKeyDown=function(e){var o=a.getOverlay(e.currentTarget.id);var c=sap.ui.Device.os.macintosh?e.metaKey:e.ctrlKey;if((e.keyCode===K.X)&&(e.shiftKey===false)&&(e.altKey===false)&&(c===true)){this.cut(o);e.stopPropagation();}else if((e.keyCode===K.V)&&(e.shiftKey===false)&&(e.altKey===false)&&(c===true)){if(this.getElementMover().getMovedOverlay()){this.paste(o);}e.stopPropagation();}else if(e.keyCode===K.ESCAPE){this.stopCutAndPaste();e.stopPropagation();}};C.prototype.cut=function(o){this.stopCutAndPaste();if(o.isMovable()){this.getElementMover().setMovedOverlay(o);o.addStyleClass("sapUiDtOverlayCutted");this.getElementMover().activateAllValidTargetZones(this.getDesignTime());}};C.prototype._executePaste=function(t){var c=this.getElementMover().getMovedOverlay();if(!c){return false;}var r=false;if(!this._isForSameElement(c,t)){var T=this._getTargetZoneAggregation(t);if(T){this.getElementMover().insertInto(c,T);r=true;}else if(O.isInTargetZoneAggregation(t)){this.getElementMover().repositionOn(c,t);r=true;}}if(r){c.setSelected(true);setTimeout(function(){c.focus();},0);}return r;};C.prototype.paste=function(t){var p=this._executePaste(t);if(p===true){this.stopCutAndPaste();}};C.prototype.stopCutAndPaste=function(){var c=this.getElementMover().getMovedOverlay();if(c){c.removeStyleClass("sapUiDtOverlayCutted");this.getElementMover().setMovedOverlay(null);this.getElementMover().deactivateAllTargetZones(this.getDesignTime());}};C.prototype._isForSameElement=function(c,t){return t.getElement()===c.getElement();};C.prototype._getTargetZoneAggregation=function(t){var A=t.getAggregationOverlays();var p=A.filter(function(o){return o.isTargetZone();});if(p.length>0){return p[0];}else{return null;}};return C;},true);
