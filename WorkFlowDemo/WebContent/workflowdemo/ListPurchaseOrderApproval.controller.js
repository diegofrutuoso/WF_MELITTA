sap.ui.controller("workflowdemo.ListPurchaseOrderApproval", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf workflowdemo.ListPurchaseOrderApproval
*/
	onInit: function() {

		var oData = {
				itens:[
					{
						id: "1",
						fornecedor: "Diego F. Machado",
						valor: "20000",
						vencto: "21/10/2019"
					},
					{
						id: "2",
						fornecedor: "Ultracon Consultoria",
						valor: "59652",
						vencto: "22/12/2018"
					},
					{
						id: "3",
						fornecedor: "Ri Happy",
						valor: "199",
						vencto: "01/01/2019"
					}
				]
			}
		
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(oData);
		
		sap.ui.getCore().setModel(oModel);
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf workflowdemo.ListPurchaseOrderApproval
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf workflowdemo.ListPurchaseOrderApproval
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf workflowdemo.ListPurchaseOrderApproval
*/
//	onExit: function() {
//
//	}
	
});