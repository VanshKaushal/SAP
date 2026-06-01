sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "ui5/approval/center/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("ui5.approval.center.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        }
    });
});
