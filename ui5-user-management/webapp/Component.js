sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "ui5/user/management/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("ui5.user.management.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        }
    });
});
