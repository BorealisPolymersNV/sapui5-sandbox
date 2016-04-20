/*eslint consistent-this: ["error", "self"]*/

sap.ui.define([
	"borealis/events/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"borealis/events/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"borealis/events/util/Common"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator,
							MessageToast, MessageBox, Common) {
  "use strict";

  return BaseController.extend("borealis.events.controller.Eventlist", {

    formatter: formatter,

    // lifecycle methods
    // -----------------

    onInit: function () {
      console.log('Eventlist.contoller.js:onInit');

      var oViewModel,
        iOriginalBusyDelay,
        oTable = this.byId("table");

      iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
      this._oTable = oTable;

      // Model used to manipulate control states
      oViewModel = new JSONModel({
        tableBusyDelay: 0
      });
      this.setModel(oViewModel, "worklistView");

      oTable.attachEventOnce("updateFinished", function () {
        // Restore original busy indicator delay for worklist's table
        oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
      });

    },

    // event handlers
    // -------------

    onPress: function (oEvent) {
			Common.debug('onPress:', oEvent.getSource());
      this._showObject(oEvent.getSource());
    },

    onRefresh: function () {
      this._oTable.getBinding("items").refresh();
    },

    // internal methods
    // ----------------

    _showObject: function (oItem) {
      this.getRouter().navTo("object", {
        objectId: oItem.getBindingContext().getProperty("ProductID")
      });
    },

    _showErrorMessage: function (sMsg) {
      MessageBox.error(sMsg, {
        styleClass: this.getOwnerComponent().getContentDensityClass()
      });
    }

  });
});
