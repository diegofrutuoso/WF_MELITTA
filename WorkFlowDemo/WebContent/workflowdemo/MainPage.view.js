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
				
		var oNum = new sap.m.NumericContent({
			size:"S",
			scale:"Ped",
			value:"17",
			icon:"sap-icon://locked",
			valueColor:"Good",
			indicator:"Up"
		});
		
		var oCont = new sap.m.TileContent({
			footer: "Ped. Compras",
			content:[
				oNum
			]
		});
		
		var oGenericTile = new sap.m.GenericTile({
			header: "Aprovações Pendentes",
			size: "S",
			frameType:"OneByOne",
			press:[oController.press, oController],
			tileContent: [
				oCont
			]
		});
		
		
 		var oPage = new sap.m.Page({
			title: "Aprovações",
			content: [
				oGenericTile
			]
		});
 		
 		oPage.setCustomHeader(oBar);
		
		return oPage;
	}

});