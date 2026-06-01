sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("approval.center.controller.App", {
        onInit: function () {
        },
        
        onSearch: function (oEvent) {
            // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter("WorkflowHeaderID", FilterOperator.Contains, sQuery);
                aFilters.push(filter);
            }

            // update list binding
            var oTable = this.byId("approvalsTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters, "Application");
        }
    });
});
