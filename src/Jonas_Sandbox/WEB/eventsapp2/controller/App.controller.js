/*eslint consistent-this: ["error", "self"]*/
/* eslint no-warning-comments: 0 */

sap.ui.define([
	"borealis/events/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"borealis/events/util/Common"
], function(BaseController, JSONModel, Common) {
	"use strict";

	return BaseController.extend("borealis.events.controller.App", {

   _loadEvents: function () {
      var self = this;

			var params = {
				'Param.1': '23'
			};

      var done = function (res) {
         var oModel = new JSONModel({Events: res});
          self.getView().setModel(oModel);
          self.getView().bindElement("/Events");

					var oViewModel,
						fnSetAppNotBusy,
						iOriginalBusyDelay = self.getView().getBusyIndicatorDelay();

					oViewModel = new JSONModel({
						busy: true,
						delay: 0
					});
					self.setModel(oViewModel, "appView");

					fnSetAppNotBusy = function() {
						oViewModel.setProperty("/busy", false);
						oViewModel.setProperty("/delay", iOriginalBusyDelay);
					};

					// TODO: should be attached to something indicating the the data has been loaded
					fnSetAppNotBusy();
      };

			Common.xhr('getEvents', 'GET', params, done);
    },

		onInit: function() {
			this._loadEvents();

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
	});

});
