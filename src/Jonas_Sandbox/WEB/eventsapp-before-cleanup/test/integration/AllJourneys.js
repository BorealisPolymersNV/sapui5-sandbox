jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"borealis/events/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"borealis/events/test/integration/pages/Worklist",
	"borealis/events/test/integration/pages/Object",
	"borealis/events/test/integration/pages/NotFound",
	"borealis/events/test/integration/pages/Browser",
	"borealis/events/test/integration/pages/App"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "borealis.events.view."
	});

	sap.ui.require([
		"borealis/events/test/integration/WorklistJourney",
		"borealis/events/test/integration/ObjectJourney",
		"borealis/events/test/integration/NavigationJourney",
		"borealis/events/test/integration/NotFoundJourney"
	], function() {
		QUnit.start();
	});
});