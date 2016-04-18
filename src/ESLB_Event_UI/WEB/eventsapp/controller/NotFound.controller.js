sap.ui.define([
	"borealis/events/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("borealis.events.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed: function() {
			this.getRouter().navTo("worklist");
		}

	});

});