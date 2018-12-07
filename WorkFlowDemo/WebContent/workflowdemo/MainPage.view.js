sap.ui.jsview("workflowdemo.MainPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf workflowdemo.MainPage
	*/ 
	getControllerName : function() {
		return "workflowdemo.MainPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf workflowdemo.MainPage
	*/ 
	createContent : function(oController) {
		
		var oBar = new sap.m.Bar({
			contentLeft: [ 
				new sap.m.Button({
				text: "Voltar",
				type: sap.m.ButtonType.Back
			})
				
			],
			contentMiddle: [
				new sap.ui.commons.Image( {
			          src : "./images/melitta.png",
			          height : "45px",
			          width: "90px"
				})],
			contentRight: []
		});
		
 		var oPage = new sap.m.Page({
			title: "Aprovações",
			content: [
			
			]
		});
 		
 		oPage.setCustomHeader(oBar);
		
		return oPage;
	}

});