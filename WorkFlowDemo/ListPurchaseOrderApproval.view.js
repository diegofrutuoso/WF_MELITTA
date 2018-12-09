sap.ui.jsview("workflowdemo.ListPurchaseOrderApproval", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf workflowdemo.ListPurchaseOrderApproval
	*/ 
	getControllerName : function() {
		return "workflowdemo.ListPurchaseOrderApproval";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf workflowdemo.ListPurchaseOrderApproval
	*/ 
	createContent : function(oController) {
		
		var oList = new sap.m.List({
			headerText:"Pendentes",
			swipeContent: [
				new sap.m.Button({
					text: "Reprovar",
					type: "Reject"
				})
			]
		});
		
		oList.bindAggregation(
				"items",
				"/itens",
				 new sap.m.StandardListItem({
					title: "{fornecedor}",
					description: " Venct " + "{vencto}" + "  -  R$" + "{valor}",
					type: sap.m.ListType.Navigation,
					press: [oController.handleItemPress, oController]
				})
		);
		
 		var oPage = new sap.m.Page({
			title: "Pedidos de Compra",
			showNavButton:true,
			navButtonPress: function(oEvt){app.back();},
			content: [
				oList
			]
		});
 		
 		return oPage;
	}

});