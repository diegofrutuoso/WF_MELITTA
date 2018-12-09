sap.ui.controller("workflowdemo.MainPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf workflowdemo.MainPage
*/
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel("json/dados.json");
				
		sap.ui.getCore().setModel(oModel);
		
		var oTile = sap.ui.getCore().byId("idTile");
		oTile.bindElement({ path: "/" });
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf workflowdemo.MainPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf workflowdemo.MainPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf workflowdemo.MainPage
*/
//	onExit: function() {
//
//	}
	
	press: function(oEvt){
		
		app.to("idListPage");
		
	}

});