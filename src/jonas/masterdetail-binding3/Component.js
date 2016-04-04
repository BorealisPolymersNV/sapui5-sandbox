sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"masterdetail/model/models",
		"masterdetail/controller/ListSelector"
	], function (UIComponent, Device, models, ListSelector) {
  "use strict";

  return UIComponent.extend("masterdetail.Component", {

    metadata: {
      manifest: "json"
    },

    init: function () {
      this.oListSelector = new ListSelector();
      this.setModel(models.createDeviceModel(), "device");
      UIComponent.prototype.init.apply(this, arguments);
      this.getRouter().initialize();
    },

    destroy: function () {
      this.oListSelector.destroy();
      UIComponent.prototype.destroy.apply(this, arguments);
    },

  });

});