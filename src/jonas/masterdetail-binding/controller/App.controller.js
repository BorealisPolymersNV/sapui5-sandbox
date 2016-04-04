sap.ui.define([
		"masterdetail/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
  "use strict";

  return BaseController.extend("masterdetail.controller.App", {

    onInit: function () {
      // JC, using console.debug, jQuery.sap.log.debug is cluttered with SAP logging
      console.debug('App.controller.js.onInit');

      var oViewModel,
        fnSetAppNotBusy,
        //oListSelector = this.getOwnerComponent().oListSelector,
        iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

      oViewModel = new JSONModel({
        busy: true,
        delay: 0
      });
      
      this.setModel(oViewModel, "appView");

      fnSetAppNotBusy = function () {
        oViewModel.setProperty("/busy", false);
        oViewModel.setProperty("/delay", iOriginalBusyDelay);
      };

      this.getOwnerComponent().getModel().metadataLoaded()
        .then(fnSetAppNotBusy);

      // Makes sure that master view is hidden in split app
      // after a new list entry has been selected.
      /*oListSelector.attachListSelectionChange(function () {
        this.byId("idAppControl").hideMaster();
      }, this);*/

    }

  });

});