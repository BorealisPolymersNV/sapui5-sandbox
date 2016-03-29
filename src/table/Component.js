sap.ui.define(['sap/ui/core/UIComponent'],
	function (UIComponent) {
		"use strict";

		var Component = UIComponent.extend("sap.m.tutorial.walkthrough.05.Component", {

			metadata: {
				config: {
					sample: {
						iframe: "index.html",
						stretch: true,
						files: [
							"App.controller.js",
							"App.view.xml",
							"index.html"
						]
					}
				}
			}

		});

		return Component;

	});
