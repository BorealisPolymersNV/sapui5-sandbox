/* globals $ _ borealis */
/* eslint consistent-this: ["error", "self"] */
/* eslint no-warning-comments: 0 */

jQuery.sap.declare("borealis.events.util.Common");

borealis.events.util.Common = {

	// TODO: move to separate file? (manifest as one alternative)
	appConfig: {
		useMockData: true
	},

	// This makes it possible to control the logging level for our classes
	// separately (avoiding all the OpenUI5 stuff)
	log : console.log.bind(console),
	debug : console.log.bind(console, 'DEBUG'),
	error : console.log.bind(console, 'ERROR'),

	xhr: function (miiObj, method, params, doneCB) {
		"use strict";

		var self = this;

		// Simple solution for returning mock data instead of performing ajax call
		if (this.appConfig.useMockData) {
			this.debug('Common:xhr:using mock data');

			var path = jQuery.sap.getModulePath('') + '/../localService/mockdata/' + miiObj + '.json';
			$.getJSON(path, function(jsonArray){
				doneCB({Rowsets: {
					Rowset: [ {Row: jsonArray } ]
					}
				});
			})
			.fail(console.log.bind(console, 'ERROR'));

			return;
		}

		var data = _.merge(params,  {
			'QueryTemplate': 'ESLB_Event_UI/' + miiObj,
			'IsTesting': 'T',
			'Content-Type': 'text/json'
		});

	  var path = '/XMII/Illuminator';

		this.debug('Common:xhr:Performing ajax call', path + '?');

		 $.ajax({
				 url: path,
				 contentType: 'text/json',
				 method: method,
				 data: data
			 })
			 .done(function (res) {
          self.debug('ajax result:', res);
					doneCB(res);
			 })
			 .fail(console.log.bind(console, 'ERROR'))
			 .always(console.log.bind(console, 'FINISHED'));
	 }
};
