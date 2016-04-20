sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"borealis.events.Component"
], function(Controller, Component) {
	"use strict";

	return Controller.extend("borealis.events.controller.BaseController", {
		getMyConf: function() {
			return Component.getMetadata().getManifest().appConfig;
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		}

	});

});
