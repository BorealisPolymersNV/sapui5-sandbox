sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"sap/ui/demo/masterdetail/model/models",
		"sap/ui/demo/masterdetail/controller/ListSelector"
	], function (UIComponent, Device, models, ListSelector) {
		"use strict";

		return UIComponent.extend("sap.ui.demo.masterdetail.Component", {

			metadata : {
				manifest : "json"
			},

			init : function () {
				this.oListSelector = new ListSelector();
				this.setModel(models.createDeviceModel(), "device");
				UIComponent.prototype.init.apply(this, arguments);
				this.getRouter().initialize();
			},

			destroy : function () {
				this.oListSelector.destroy();
				UIComponent.prototype.destroy.apply(this, arguments);
			},

		});

	}
);
