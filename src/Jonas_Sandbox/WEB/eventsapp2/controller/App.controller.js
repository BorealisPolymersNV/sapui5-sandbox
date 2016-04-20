/*eslint consistent-this: ["error", "self"]*/

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
         var oModel = new JSONModel({Events: res.Rowsets.Rowset[0].Row});
          self.getView().setModel(oModel);
          self.getView().bindElement("/Events");

          Common.debug('DONE', JSON.stringify(res.Rowsets.Rowset[0].Row));
      };

			Common.xhr('getEvents', 'GET', params, done);
    },

		onInit: function() {
			this._loadEvents();

			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			fnSetAppNotBusy();

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			Common.debug('MANIFEST', this.getMyConf());
		}
	});

});
