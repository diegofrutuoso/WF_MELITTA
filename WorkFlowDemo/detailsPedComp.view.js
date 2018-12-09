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
		
		var oNomeL = new sap.m.Label({
			text: "Nome"
		});
		
		var oNome = new sap.m.Text({
			text: "{fornecedor}"
		});

		var oRuaL = new sap.m.Label({
			text: "Logradouro"
		});
		
		var oRua = new sap.m.Text({
			text: "{rua}" + " - " + "{numero}" + " - " + "{adicional}"
		});
		
		var oCepL = new sap.m.Label({
			text: "CEP"
		});

		var oCep = new sap.m.Text({
			text: "{cep}" 
		});
		
		var oForm = new sap.ui.layout.form.SimpleForm("idFormDisplay",{
			title: "Endereço",
			layout: "ResponsiveGridLayout",
			labelSpanXL:3,
			labelSpanL:3,
			labelSpanM:3,
			labelSpanS:12,
			adjustLabelSpan:false,
			emptySpanXL:4,
			emptySpanL:4,
			emptySpanM:4,
			emptySpanS:0,
			columnsXL:1,
			columnsL:1,
			columnsM:1,
			content: [
				oNomeL,
				oNome,
				oRuaL,
				oRua,
				oCepL,
				oCep
			]
			
		});
		
		var oVbox = new sap.m.VBox("idVbox",{
			items:[
				oForm
//				oNome,
//				oRua,
//				oCep
			]
		});
		
		oVbox.addStyleClass("sapUiSmallMargin");
		
		var oAddress = new sap.m.IconTabFilter("tabAddress",{
			icon: "sap-icon://activity-individual",
			content: [
				oVbox
			]
		});
		
		var oListPedComp = new sap.m.List("idListPedComp",{
			headerText:"Itens do Pedido",
		});
		
			
		var oPurchase = new sap.m.IconTabFilter("tabPurchase",{
			icon: "sap-icon://basket",
			content: [
				oListPedComp
			]
		});
		
		var oIconTabBar = new sap.m.IconTabBar("idIconTabBarMulti",{
			items:[
				oAddress,
				oPurchase
			]
			
		});
		
		oIconTabBar.addStyleClass("sapUiResponsiveContentPadding");
		
 		var oPage = new sap.m.Page({
			title: "Detalhes Pedido Compra",
			showNavButton:true,
			navButtonPress: function(oEvt){app.back();},			
			content: [
				oIconTabBar
			]
		});
 		
 		oPage.setFooter(new sap.m.Toolbar({
 		      content: [
 		        new sap.m.ToolbarSpacer(),
 		        new sap.m.Button({
 		          text: "Reprovar",
 		          type: "Reject",
 		          press: [oController.handleReprovar, oController]
 		        }),
 		       new sap.m.Button({
  		          text: "Aprovar",
  		          type: "Accept",
  		          press: [oController.handleReprovar, oController]
  		        })
 		      ]
 		    }));
 		
 		return oPage;
	}

});