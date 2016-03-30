sap.ui.define([
	"sap/ui/core/mvc/Controller", 
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("wt.controller.App", {

    onInit: function (oEvent) {
      var oModel = new JSONModel(jQuery.sap.getModulePath("mockdata", "/products.json"));
      this.getView().setModel(oModel);
      this.getView().bindElement("/Products");
    },

    onShowHello: function () {
      /* eslint-disable no-alert */
      alert("Hello World");
      /* eslint-enable no-alert */
    }
  });

});