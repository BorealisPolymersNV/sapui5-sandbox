/*global history */
sap.ui.define([
		"sap/ui/demo/masterdetail/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/GroupHeaderListItem",
		"sap/ui/Device",
		"sap/ui/demo/masterdetail/model/formatter"
	], function (BaseController, JSONModel, Filter, FilterOperator, GroupHeaderListItem, Device, formatter) {
  "use strict";

  return BaseController.extend("sap.ui.demo.masterdetail.controller.Master", {

    formatter: formatter,

    onInit: function () {
      console.debug('Master.controller.js:onInit');


      // Control state model
      var oList = this.byId("list"),
        oViewModel = this._createViewModel(),
        // Put down master list's original value for busy indicator delay,
        // so it can be restored later on. Busy handling on the master list is
        // taken care of by the master list itself.
        iOriginalBusyDelay = oList.getBusyIndicatorDelay();


      this._oList = oList;
      // keeps the filter and search state
      this._oListFilterState = {
        aFilter: [],
        aSearch: []
      };

      this.setModel(oViewModel, "masterView");
      // Make sure, busy indication is showing immediately so there is no
      // break after the busy indication for loading the view's meta data is
      // ended (see promise 'oWhenMetadataIsLoaded' in AppController)
      oList.attachEventOnce("updateFinished", function () {
        // Restore original busy indicator delay for the list
        oViewModel.setProperty("/delay", iOriginalBusyDelay);
      });

      this.getView().addEventDelegate({
        onBeforeFirstShow: function () {
          this.getOwnerComponent().oListSelector.setBoundMasterList(oList);
        }.bind(this)
      });

      this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
      this.getRouter().attachBypassed(this.onBypassed, this);
    },


    onUpdateFinished: function (oEvent) {
      console.debug('Master.controller.js:onUpdateFinished');

      // update the master list object counter after new data is loaded
      this._updateListItemCount(oEvent.getParameter("total"));
    },

    onRefresh: function () {
      console.debug('Master.controller.js:onRefresh');
      this._oList.getBinding("items").refresh();
    },

    onSelectionChange: function (oEvent) {
      console.debug('Master.controller.js:onSelectionChange', oEvent,
        oEvent.getParameter("listItem"), oEvent.getSource());

      // depends on the device-dependent mode
      this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
    },

    // Event handler for the bypassed event, which is fired when no routing pattern matched.
    // If there was an object selected in the master list, that selection is removed.
    onBypassed: function () {
      console.debug('Master.controller.js:onBypassed');

      this._oList.removeSelections(true);
    },

    // internal methods                                     
    // ----------------


    _createViewModel: function () {
      return new JSONModel({
        isFilterBarVisible: false,
        filterBarLabel: "",
        delay: 0,
        title: this.getResourceBundle().getText("masterTitleCount", [0]),
        noDataText: this.getResourceBundle().getText("masterListNoDataText"),
        sortBy: "Name",
        groupBy: "None"
      });
    },

    // If the master route was hit (empty hash) we have to set
    // the hash to to the first item in the list as soon as the
    // listLoading is done and the first item in the list is known
    _onMasterMatched: function () {
      this.getOwnerComponent().oListSelector.oWhenListLoadingIsDone.then(
        function (mParams) {
          if (mParams.list.getMode() === "None") {
            return;
          }
          var sObjectId = mParams.firstListitem.getBindingContext().getProperty("ObjectID");
          this.getRouter().navTo("object", {
            objectId: sObjectId
          }, true);
        }.bind(this),
        function (mParams) {
          if (mParams.error) {
            return;
          }
          this.getRouter().getTargets().display("detailNoObjectsAvailable");
        }.bind(this)
      );
    },

    // Shows the selected item on the detail page. On phones a additional history entry is created
    // @param {sap.m.ObjectListItem} oItem selected Item
    _showDetail: function (oItem) {
      var bReplace = !Device.system.phone;
      this.getRouter().navTo("object", {
        objectId: oItem.getBindingContext().getProperty("ObjectID")
      }, bReplace);
    },

    // Sets the item count on the master list header
    // @param {integer} iTotalItems the total number of items in the list
    _updateListItemCount: function (iTotalItems) {
      var sTitle;
      // only update the counter if the length is final
      if (this._oList.getBinding("items").isLengthFinal()) {
        sTitle = this.getResourceBundle().getText("masterTitleCount", [iTotalItems]);
        this.getModel("masterView").setProperty("/title", sTitle);
      }
    },

  });

});