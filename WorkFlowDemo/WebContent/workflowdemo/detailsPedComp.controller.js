sap.ui.controller("workflowdemo.detailsPedComp", {

	handleReprovar: function(oEvt){
		sap.m.MessageToast.show("Pedido Reprovado",{
			my: "center center",
			at: "center center"
		});
		
		var myPath = this.getView().getBindingContext().getPath();
		
		var model = sap.ui.getCore().getModel();
		
		var obj = model.getObject(myPath);
		
		var idx = myPath;
		
		idx = idx.match(/[0-9]+/g);
		
		model.oData.itens.splice(idx,1);
		
		model.oData.total = model.oData.total - 1;
		
		model.refresh();

		app.back();
	},

	handleAprovar: function(oEvt){
		sap.m.MessageToast.show("Pedido Aprovado",{
			my: "center center",
			at: "center center"
		});
		
		var myPath = this.getView().getBindingContext().getPath();
		
		var model = sap.ui.getCore().getModel();
		
		var obj = model.getObject(myPath);
		
		var idx = myPath;
		
		idx = idx.match(/[0-9]+/g);
		
		model.oData.itens.splice(idx,1);

		model.oData.total = model.oData.total - 1;
		
		model.refresh();

		app.back();
	},
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf workflowdemo.detailsPedComp
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf workflowdemo.detailsPedComp
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf workflowdemo.detailsPedComp
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf workflowdemo.detailsPedComp
*/
//	onExit: function() {
//
//	}

});