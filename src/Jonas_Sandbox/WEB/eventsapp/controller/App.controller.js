sap.ui.define([
	"borealis/events/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("borealis.events.controller.App", {

   _loadEvents: function () {
      var self = this;
      var path = '/XMII/Illuminator';

     console.log('Performing ajax call', path + '?'); // + params);

      $.ajax({
          url: path,
          contentType: 'text/json',
          method: 'GET',
          data: {
            'QueryTemplate': 'ESLB_Event_UI/getEvents',
            'IsTesting': 'T',
            'Content-Type': 'text/json',
            'Param.1': '19835'
          }
        })
        .done(function (res) {
           var oModel = new JSONModel({Events: res.Rowsets.Rowset[0].Row});
            self.getView().setModel(oModel);
            self.getView().bindElement("/Events");

            console.log('DONE', JSON.stringify(res.Rowsets.Rowset[0].Row[0]));
        })
        .fail(console.log.bind(console, 'ERROR'))
        .always(console.log.bind(console, 'FINISHED'))
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
		}
	});

});