		sap.ui.getCore().attachInit(function () {
			sap.ui.require([
				"myCompany/myApp/localService/mockserver",
				"sap/m/Shell",
				"sap/ui/core/ComponentContainer"
			], function (server, Shell, ComponentContainer) {
				// set up test service for local testing
				server.init();
				// initialize the UI component
				new Shell({
					app: new ComponentContainer({
						height : "100%",
						name : "myCompany.myApp"
					})
				}).placeAt("content");
			});
		});

