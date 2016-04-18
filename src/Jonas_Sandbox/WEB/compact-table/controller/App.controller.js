sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("wt.controller.App", {
    
    debug: console.log.bind(console, 'DEBUG'),

    _loadEvents: function () {
      var self = this;
      var path = '/XMII/Illuminator';

      this.debug('Performing ajax call', path + '?'); // + params);

      $.ajax({
          url: path,
          contentType: 'text/json',
          method: 'GET',
          data: {
            'QueryTemplate': 'ESLB_Event_UI/getEvents',
            'IsTesting': 'T',
            'Content-Type': 'text/json',
            'Param.1': '23'
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

    onInit: function (oEvent) {
      var oModel = new JSONModel("./mockdata/products.json");
      this.getView().setModel(oModel);
      this.getView().bindElement("/Products");
      
      this._loadEvents();
    },

    onShowHello: function () {
      /* eslint-disable no-alert */
      alert("Hello World");
      /* eslint-enable no-alert */
    }
  });

});
