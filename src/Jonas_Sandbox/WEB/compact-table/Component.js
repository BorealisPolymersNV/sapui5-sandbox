sap.ui.define(['sap/ui/core/UIComponent'],
  function (UIComponent) {
    "use strict";

    var Component = UIComponent.extend("wt.Component", {

      metadata: {
        rootView: "wt.view.App",
        dependencies: {
          libs: [
              "sap.ui.table",
              "sap.ui.unified",
              "sap.m"
				]
        },

        config: {
          wt: {
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