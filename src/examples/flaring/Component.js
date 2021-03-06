sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("flaring.Component", {

		metadata : {
			rootView : "flaring.Page",
			dependencies : {
				libs : [
					"sap.m",
					"sap.ui.layout"
				]
			}/*,
			config : {
				sample : {
					stretch : true,
					files : [
						"Page.view.xml",
						"Page.controller.js",
						"Change.fragment.xml",
						"Display.fragment.xml"
					]
				}
			}*/
		}
	});

	return Component;

});
