/*global history */

//
// BaseController
// ==============
//
// Controller classes that is extended by the other controllers
//

sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History"
	], function (Controller, History) {
  "use strict";

  return Controller.extend("masterdetail.controller.BaseController", {
    
    // returns {sap.ui.core.routing.Router} the router for this component
    getRouter: function () {
      // JC, using console.debug, jQuery.sap.log.debug is cluttered with SAP logging
      console.debug('BaseController.js:getRouter');

      return this.getOwnerComponent().getRouter();
    },

    // returns {sap.ui.model.Model} the model instance
    getModel: function (sName) {
      console.debug('BaseController.js:getModel:', sName);

      return this.getView().getModel(sName);
    },

    // returns {sap.ui.mvc.View} the view instance
    setModel: function (oModel, sName) {
      console.debug('BaseController.js:setModel:',oModel, sName);

      return this.getView().setModel(oModel, sName);
    },

    // returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
    getResourceBundle: function () {
      console.debug('BaseController.js:getResourceBundle');

      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },

    onNavBack: function () {
      console.debug('BaseController.js:onNavBack');

      var sPreviousHash = History.getInstance().getPreviousHash();

      if (sPreviousHash !== undefined) {
        history.go(-1);
      } else {
        var bReplace = true;
        this.getRouter().navTo("master", {}, bReplace);
      }
    }

  });

});