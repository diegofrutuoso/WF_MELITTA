sap.ui.controller("workflowdemo.ListPurchaseOrderApproval", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf workflowdemo.ListPurchaseOrderApproval
*/
	onInit: function() {

//		var oData = {
//				itens:[
//					{
//						id: "1",
//						fornecedor: "Diego F. Machado",
//						valor: "20000",
//						vencto: "21/10/2019",
//						rua: "Aluisio Azevedo",
//						numero: "99",
//						adicional: "Bloco A Apto 111",
//						cep: "02021-030",
//						produtos:[
//							{
//								material: "Consultoria ABAP",
//								data: "10/2018",
//								quantidade: "1"
//							},
//							{
//								material: "Consultoria WF",
//								data: "09/2018",
//								quantidade: "1"
//							},
//							{
//								material: "Consultoria PO",
//								data: "08/2018",
//								quantidade: "1"
//							},
//							{
//								material: "Consultoria UI5",
//								data: "07/2018",
//								quantidade: "1"
//							}
//						]
//					},
//					{
//						id: "2",
//						fornecedor: "Ultracon Consultoria",
//						valor: "59652",
//						vencto: "22/12/2018",
//						rua: "Algoz dos Verdes",
//						numero: "1530",
//						adicional: "14 Andar",
//						cep: "15894-363",
//						produtos:[
//							{
//								material: "Consultoria MM",
//								data: "10/2018",
//								quantidade: "2"
//							},
//							{
//								material: "Consultoria SD",
//								data: "10/2018",
//								quantidade: "1"
//							}
//						]						
//					},
//					{
//						id: "3",
//						fornecedor: "Ri Happy",
//						valor: "199",
//						vencto: "01/01/2019",
//						rua: "Shopping Center Norte",
//						numero: "S/N",
//						adicional: "",
//						cep: "02025-856",
//						produtos:[
//							{
//								material: "Max Steel Turbo Power",
//								data: "10/2018",
//								quantidade: "23"
//							},
//							{
//								material: "Bola de Couro",
//								data: "12/2018",
//								quantidade: "103"
//							},
//							{
//								material: "Barbie Blogueira",
//								data: "10/2018",
//								quantidade: "29"
//							}
//						]						
//					}
//				]
//			}
		
	},
	
	handleItemPress: function (oEvt) {
			
	 	var selectedPC = oEvt.getSource().getBindingContext();
	 	
	 	var oList = sap.ui.getCore().byId("idListPedComp");
	 	var pathList = selectedPC.sPath + "/produtos";
	 	

		var oItem = new sap.m.StandardListItem({
			title: "{material}",
			description: "Qtd: " + "{quantidade}",
		});
	 	
	 	oList.bindAggregation("items", {
	 	    path : pathList,
	 	    template: oItem
	 	});
	 	
	 	var oDetails = sap.ui.getCore().byId("idDetails");
	 	oDetails.bindElement({ path: selectedPC.sPath });
	 	
	 	app.to("idDetails");
	},
	
	handleRej: function (evt) {
		var oList = evt.getSource().getParent();
		oList.removeAggregation("items", oList.getSwipedItem());
		oList.swipeOut();
		
		sap.m.MessageToast.show("Pedido Reprovado",{
			my: "center center",
			at: "center center"
		});
	},
	
	handleAce: function (evt) {
		var oList = evt.getSource().getParent();
		
		var oItem = oList.getSwipedItem();
		
		var model = sap.ui.getCore().getModel();
		
		var sIdx = oItem.sId;
		
		sIdx = sIdx.substring(sIdx.indexOf("list0-")+ 6);
		
		sIdx = sIdx;
		
		model.oData.itens.splice(sIdx,1);
		
		model.oData.total = model.oData.total - 1;
		
		model.refresh();
		oList.swipeOut();
		
		sap.m.MessageToast.show("Pedido Aprovado",{
			my: "center center",
			at: "center center"
		});
	}	
	
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