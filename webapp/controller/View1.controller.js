sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel, ODataModel) {
    "use strict";

    const sURL = "/V2/Northwind/Northwind.svc/";
 
    return Controller.extend("project1.controller.View1", {

        onInit: function () {

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this.onRouteMatched, this);
                
        },

        onRouteMatched: async function () {
            var oModel = new ODataModel(sURL);

            const oData = await new Promise((resolve, reject) => {
                oModel.read("/Orders", {

                    urlParameters: {
                        "$expand": "Customer"
                    },
                success: function(oData, response) {
                    resolve(oData);
                },
                    error: function(error) {
                }
        });
    });         
                this.getView().setModel(new JSONModel(oData.results), "modOrders");
        },

        onObjectPage: function(oEvent){

            const newData = btoa(JSON.stringify(this.getView().getModel("modOrders").getData()));

            var oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("RouteView2", {RouteView1:newData});
              sap.m.MessageToast.show("CIAO BELLO");
        }
    });
});
