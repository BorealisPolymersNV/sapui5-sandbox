sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("wt.App", {

		onShowHello : function () {
			/* eslint-disable no-alert */
			alert("Hello World");
			/* eslint-enable no-alert */
		}
	});

});
