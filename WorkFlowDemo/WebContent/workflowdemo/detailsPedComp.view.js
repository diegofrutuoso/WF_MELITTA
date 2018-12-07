sap.ui.jsview("workflowdemo.detailsPedComp", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf workflowdemo.detailsPedComp
	*/ 
	getControllerName : function() {
		return "workflowdemo.detailsPedComp";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf workflowdemo.detailsPedComp
	*/ 
	createContent : function(oController) {
		
		var oLabel = new sap.m.Label({
			text: "{fornecedor}"
		});
		
 		var oPage = new sap.m.Page({
			title: "Detalhes Pedido Compra",
			showNavButton:true,
			navButtonPress: function(oEvt){app.back();},			
			content: [
				oLabel
			]
		});
 		
 		return oPage;
	}

});