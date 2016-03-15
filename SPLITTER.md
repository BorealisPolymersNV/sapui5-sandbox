<!DOCTYPE html>
<html style="height:100%">
<!--
============================================================================
Test of page layout with splitter and auto-adjustment to window size
By Sonny
============================================================================

-->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>Splitt pane test</title>
    <meta name="keywords" content="Control Table" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link href="/XMII/CM/ESLB/Common/CSS/Content.css" rel="stylesheet" type="text/css" />

    <script language="javascript" src="/XMII/CM/ESLB/Common/JSFiles/UtilityFunctions.js" 
type="text/javascript"></script>
    <script language="javascript" src="/XMII/CM/ESLB/Common/Utility/ExportAsExcel.js" 
type="text/javascript"></script>
    <script language="javascript" src="/XMII/CM/ESLB/Common/JSFiles/shiftbook.js" 
type="text/javascript"></script>

    <script id="sap-ui-bootstrap"
            src="/sapui5/resources/sap-ui-core.js"
            data-sap-ui-theme="sap_goldreflection"
            data-sap-ui-libs="sap.ui.core,sap.ui.commons,sap.ui.table,sap.ui.richtexteditor">
    </script>

    <style>
        .formBorealis {
            margin-left: 10px;
            margin-right: 10px;
        }
        html, body {
            height: 100%;
        }
    </style>

    <script>

function TestTopLink(){
	window.top.location.href = 
"http://w62.mignetwork.net:56200/XMII/Illuminator?service=logout&target=http:%2F%2Fst0660/info/MiiChgUsr/w/index.html"; 

}

	function gReplace(txt){return txt.replace(/(?:\r\n|\r|\n)/g,' » ')}

        var oModel2 = new sap.ui.model.xml.XMLModel();
        var oDropdownBox1 = new sap.ui.commons.DropdownBox();
        var oDropdownBox2 = new sap.ui.commons.DropdownBox();
        var datePicker = new sap.ui.commons.DatePicker();



        //--------------------------------- Table 
--------------------------------------------------------------------------------------
        var oTable = new sap.ui.table.Table("id_msgTable", {
            editable: true,
            //visible:false,
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
            //visibleRowCount :30,
            width: "100%"

        });
        //oTable.setSelectionMode(sap.ui.table.SelectionMode.Multi);
        oTable.attachRowSelectionChange(displayFormData, this);

        oTable.setToolbar(new sap.ui.commons.Toolbar({
            items: [
                  new sap.ui.commons.Label({ text: "Test table", design: "Bold", width: "800px" 
}),
                  new sap.ui.commons.Button({ icon: 
"/XMII/CM/ESLB/Common/Image/IconsPES/exportCSV.png", tooltip: "{i18n>Tooltip_Export_in_CSV}" }),
                new sap.ui.commons.Button({ icon: 
"/XMII/CM/ESLB/Common/Image/IconsPES/exportHTML.png", tooltip: "{i18n>Tooltip_Export_in_HTML}" })
            ]
        }));

        //.............Define the columns and the control templates to be used...........//

        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_ID}" }),
            template: new sap.ui.commons.TextField().bindProperty("value", "idMessage"),
            sortProperty: "idMessage",
            filterProperty: "idMessage",
            width: "50px"
        }));

        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_TITLE}" }),
            template: new sap.ui.commons.TextView().bindProperty("text", "messageTitle"),
            sortProperty: "messageTitle",
            filterProperty: "messageTitle",
            width: "100px",
        }));

          oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_MESSAGE}" }),
            template: new sap.ui.commons.TextView().bindProperty("text", "messageText"),
            sortProperty: "messageText",
            filterProperty: "messageText",
	visible:false    //  VISIBLE FALSE
        }));


        oTable.addColumn(new sap.ui.table.Column({
	            label: new sap.ui.commons.Label({ text: "Text" }),
	            template: new sap.ui.commons.TextView({
			tooltip: new sap.ui.commons.RichTooltip().bindProperty("text", 
"messageText") 
		}).bindProperty("text",
	                	{
		                    parts:
	            	            [{ path: "messageText", type: new sap.ui.model.type.String() 
},
	                        	 { path: "messageText", type: new 
sap.ui.model.type.String() }
		                        ],
	            	        formatter: function (messageText)
	                        	{
					try {
						return gReplace(messageText);
					}
					catch(err) {
						return ;
					} 
	                        	}
		                }
	            ),
	            width: "400px",
	            useRawValues: true,
	            filterProperty: "messageText",
		tooltip: "Hej!"
        }));


        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_AREA}" }),
            template: new sap.ui.commons.TextField({ editable: true }).bindProperty("value", 
"area"),
            sortProperty: "area",
            filterProperty: "area",
            width: "70px",
        }));

        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_TYPE}" }),
            template: new sap.ui.commons.TextField({ editable: true }).bindProperty("value", 
"TypeDescr"),
            sortProperty: "TypeDescr",
            filterProperty: "TypeDescr",
            width: "70px",
        }));

        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_STATUS}" }),
            template: new sap.ui.commons.TextField({ editable: true }).bindProperty("value", 
"StateDescr"),
            sortProperty: "StateDescr",
            filterProperty: "StateDescr",
            width: "70px",
        }));

        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_MSGDATE}" }),
            template: new sap.ui.commons.TextView().bindProperty("text", {
                parts: [{ path: "msgdatetime", type: new sap.ui.model.type.String() }],
                formatter: function (msgdatetime) {

                    if (msgdatetime != null) {
                        msgdatetime = msgdatetime.replace("T", " ");
                        msgdatetime = msgdatetime.substr(0, 16);
                        return msgdatetime;
                    }
                },
                useRawValues: true
            }),
            width: "150px",
            sortProperty: "msgdatetime",
            filterProperty: "msgdatetime",
	tooltip: "Hej!"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_EQUIPMENT}" }),
            template: new sap.ui.commons.TextField({ editable: true }).bindProperty("value", 
"equipment"),
            sortProperty: "equipment",
            filterProperty: "equipment",
            width: "80px",
        }));

        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "{i18n>TBL_COL_EQUIPMENT_DSCR}" }),
            template: new sap.ui.commons.TextView().bindProperty("text", "equipmentdescr"),
            sortProperty: "equipmentdescr",
            filterProperty: "equipmentdescr",
            width: "320px"
        }));

        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "version"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "changedBy"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "changedAt"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "equipmentNumber"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "idInfoState"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "funclocdescr"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "guid"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "createdBy"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextField().bindProperty("value", "createdAt"),
            width: "0px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "fullname" }),
            template: new sap.ui.commons.TextField({ editable: true }).bindProperty("value", 
"createdByFullName"),
            width: "0px",
        }));
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: "fullname" }),
            template: new sap.ui.commons.TextField({ editable: true }).bindProperty("value", 
"changedByFullName"),
            width: "0px",
        }));

        oTable.ondblclick = function () {
            ToggleDetails();
        };



        ////##################################################################################
        function initializetable() {
            language = document.getElementById('txt_Language').value;
            IDFACTORY = document.getElementById('txt_BMFactory').value;
            LOGIN = document.getElementById('txt_LoginName').value;
            ROOTFUNCLOC = document.getElementById('txt_ROOTFUNCLOC').value;
            PLANT = document.getElementById('txt_PLANT').value;
            AREA = document.getElementById('txt_AREA').value;
            LoginRole = document.getElementById('txt_LoginRole').value;
            LOGINNAME = document.getElementById('txt_FullLoginName').value;

            onReady();
            getTbdata();
            initializedata();

        }

        //........ ...............End of Table.......................................//
        //..................Start of DropdownBox for Type..................//

        oDropdownBox1 = new sap.ui.commons.DropdownBox();
        oDropdownBox1.setWidth("200px");
        var mycombomodulList = new sap.ui.model.xml.XMLModel();
        oDropdownBox1.setModel(mycombomodulList);
        var myModulList = new sap.ui.core.ListItem();
        myModulList.bindProperty("text", "descr");
        myModulList.bindProperty("key", "idInfoType");
        oDropdownBox1.bindItems("/Rowset/0/Row", myModulList);

        //..........................End of DropdownBox for Type........................//

        //.........................Start of DropdownBox for Area......................//

        oDropdownBox3 = new sap.ui.commons.DropdownBox();
        oDropdownBox3.setWidth("200px");


        var areaList = new sap.ui.core.ListItem();
        areaList.bindProperty("text", "area");
        areaList.bindProperty("key", "idSubFactory");
        oDropdownBox3.bindItems("/Rowset/0/Row", areaList);

        //.......................End of DropdownBox for Area...........................//

        //.......................End of Date Picker............................//

        //.......................Start Of Toggle Property......................//
        var toggleValue = true;
        var panelBtn = new sap.ui.commons.Button({ text: "{i18n>BTN_TOGGLE_MESSAGE}", style: 
sap.ui.commons.ButtonStyle.Default, press: toggleFunction });


        /* oTable.ondblclick = function(){
                oButtonUpdate.setEnabled(true);
                oButtonCreate.setEnabled(false);
                oButtonDelete.setEnabled(true);
                toggleFunction();

              }
        */

        /*
        function toggleFunction1(){

            if(toggleValue == true){
            oTable.setVisibleRowCount(5);
            oLayout1.setVisible(true);

                toggleValue = false;
            }
            else{
            oTable.setVisibleRowCount(10);

            oLayout1.setVisible(false);
                toggleValue = true;

                   }
                }
        */
        //.......................End Of Toggle Property......................//


        /* var Status = new sap.ui.commons.TextField({ id:"id_State",  value:"",});
        Status.placeAt("status");
        */

        var oButtonCreate = new sap.ui.commons.Button({ text: "{i18n>BTN_CREATE}", margin: "4px", 
press: addData });
        var oButtonUpdate = new sap.ui.commons.Button({ text: "{i18n>BTN_UPDATE}", enabled: 
false, width: "70px", margin: "4px", press: updateData });
        var oButtonDelete = new sap.ui.commons.Button({ text: "{i18n>BTN_DELETE}", enabled: 
false, width: "70px", margin: "4px", press: openMessageBox });
        var oButtonClear = new sap.ui.commons.Button({ text: "{i18n>BTN_CLEAR}", width: "70px", 
margin: "4px", press: clearData });
        var oButtonLinked = new sap.ui.commons.Button({ text: 
"{i18n>BTN_PREPARE_LINKED_MESSAGE}", enabled: false, margin: "4px", press: linkedMessage });
        var oButtonDateCalender = new sap.ui.commons.Button({ icon: 
"/XMII/CM/ESLB/Common/Images/calendar.gif", margin: "4px", press: GetDateFromPicker });
        var startDateField = new sap.ui.commons.TextField({ id: "id_startdate", tooltip: 
"{i18n>AlertStartDate}", width: "165px" });

        var oLabelLinked = new sap.ui.commons.Label({ text: "{i18n>LBL_LINKED_MESSAGE}", visible: 
true });
        var linkedField = new sap.ui.commons.TextField({ id: "id_linkedmessage", editable: false, 
visible: true, width: "165px" });
        var linkedPopUp = new sap.ui.commons.Button({ icon: 
"/XMII/CM/ESLB/Common/Image/icons/application_link.png", visible: true, press: LinkedMessagePopup 
});

        var EquipDscr = new sap.ui.commons.TextField({ id: "id_equipmentdesc", editable: false, 
width: "200px" });
        var FunLoc = new sap.ui.commons.TextField({ id: "id_functionloc", editable: false, width: 
"200px" });
        var EquipNo = new sap.ui.commons.TextField({ id: "id_equipmentnumberid", editable: false, 
width: "200px" });

        var versionButton = new sap.ui.commons.Button({ icon: 
"/XMII/CM/ESLB/Common/Image/icons/book_link.png", press: getVersions });

        //....................................Start Of Layout 
Form.....................................//

        var oLayout1 = new sap.ui.layout.VerticalLayout({
            visible: true,
            content: [
		new sap.ui.commons.HorizontalDivider(),
		new sap.ui.layout.HorizontalLayout({
	                content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
			oButtonCreate,
	           	           	new sap.ui.commons.Label({ text: " ", width: "5px" }),
                        	    oButtonUpdate,
	                            new sap.ui.commons.Label({ text: " ", width: "5px" }),
            	                oButtonDelete,
	                       	    new sap.ui.commons.Label({ text: " ", width: "5px" }),
            	                oButtonClear,
                        		    new sap.ui.commons.Label({ text: " ", width: "420px" 
}),
                        	    oButtonLinked]
            }),
                new sap.ui.commons.Label({ text: " " }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		  new sap.ui.commons.Label({ text: "{i18n>LBL_TITLE}", required: true, width: 
"230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_TEXT}" })]
                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		new sap.ui.commons.TextField({ id: "id_msgtitle", tooltip: "{i18n>AlertTitle}", 
maxLength: 120, width: "200px", }),
                            new sap.ui.commons.Label({ text: " ", width: "30px" }),
		new sap.ui.commons.TextArea({ id: "id_msgtext", tooltip: "{i18n>AlertText}", 
maxLength: 1000, width: "660px", height: "60px" })
		//new sap.ui.richtexteditor.RichTextEditor({ id: "id_msgtext", tooltip: 
"{i18n>AlertText}", maxLength: 1000, width: "660px", height: "200px", showGroupLink: true })
]

                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		new sap.ui.commons.Label({ text: "{i18n>LBL_AREA}", required: true, width: 
"230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_EQUIPMENT}", width: 
"230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_DESCRIPTION}" })]
                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		   oDropdownBox3,
                            new sap.ui.commons.Label({ text: " ", width: "30px" }),
                            new sap.ui.commons.TextField({ id: "id_equipment", tooltip: 
"{i18n>AlertEquipment}", maxLength: 40, width: "165px" }),
                            new sap.ui.commons.Button({ icon: 
"/XMII/CM/ESLB/Common/Images/Choice.gif", id: "popup", press: EquipmentPopUp }),
                            new sap.ui.commons.Label({ text: " ", width: "30px" }),
                            EquipDscr]
                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		   new sap.ui.commons.Label({ text: "{i18n>LBL_FUNCTIONAL_LOCATION}", width: 
"230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_EQUIPMENT_NUMBER_ID}" })]
                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
			FunLoc,
                                new sap.ui.commons.Label({ text: " ", width: "30px" }),
                                EquipNo]
                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
			new sap.ui.commons.Label({ text: "{i18n>LBL_TYPE}", required: true, 
width: "690px" }),
                                new sap.ui.commons.Label({ text: "{i18n>LBL_STATUS}" })]
                }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
			oDropdownBox1,
                                new sap.ui.commons.Label({ text: " ", width: "490px" }),
                                new sap.ui.commons.TextField({ id: "id_status", editable: false, 
width: "200px" })
                    ]
                }),
                 new sap.ui.layout.HorizontalLayout({
                    content:[
		  new sap.ui.commons.Label({ text: " ", width: "5px" }),
	               new sap.ui.commons.Label({ text: "{i18n>LBL_START_DATE}", required: true 
})
]	     }),				

                 new sap.ui.layout.HorizontalLayout({
                    content:[
	                new sap.ui.commons.Label({ text: " ", width: "5px" }),
            		    new sap.ui.layout.HorizontalLayout({
	                    content: [startDateField, oButtonDateCalender]
            		    }),
]	     }),				



                 new sap.ui.layout.HorizontalLayout({
                    	content:[ new sap.ui.commons.Label({ text: " ", width: "5px" }),
		oLabelLinked
]	     }),

                 new sap.ui.layout.HorizontalLayout({
                    content:[ new sap.ui.commons.Label({ text: " ", width: "5px" }), 
	                     new sap.ui.layout.HorizontalLayout({
            	            content: [linkedField, linkedPopUp]  })
]	     }),



                new sap.ui.commons.Label({ text: " " }),
                new sap.ui.layout.HorizontalLayout({
                    content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		new sap.ui.commons.Label({ text: "{i18n>LBL_ID}", width: "230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_CREATED_SHIFT}", width: 
"230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_CREATED_AT}", width: 
"230px" }),
                            new sap.ui.commons.Label({ text: "{i18n>LBL_CREATED_BY}" })]
                }),
                 new sap.ui.layout.HorizontalLayout({
                     content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		new sap.ui.commons.TextField({ id: "id_id", editable: false, width: "200px" }),
                             new sap.ui.commons.Label({ text: " ", width: "30px" }),
                             new sap.ui.commons.TextField({ id: "id_createdshift", editable: 
false, width: "200px" }),
                             new sap.ui.commons.Label({ text: " ", width: "30px" }),
                             new sap.ui.commons.TextField({ id: "id_createdat", editable: false, 
width: "200px" }),
                             new sap.ui.commons.Label({ text: " ", width: "30px" }),
                             new sap.ui.commons.TextField({ id: "id_createdby", editable: false, 
width: "200px" })]
                 }),
                 new sap.ui.layout.HorizontalLayout({
                     content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		new sap.ui.commons.Label({ text: "{i18n>LBL_VERSION}", width: "460px" }),
                             new sap.ui.commons.Label({ text: "{i18n>LBL_MODIFIED_AT}", width: 
"230px" }),
                             new sap.ui.commons.Label({ text: "{i18n>LBL_MODIFIED_BY}" })]
                 }),
                 new sap.ui.layout.HorizontalLayout({
                     content: [new sap.ui.commons.Label({ text: " ", width: "5px" }),
		new sap.ui.commons.TextField({ id: "id_version", editable: false, width: "165px" 
}),
                             versionButton,
                             new sap.ui.commons.Label({ text: " ", width: "260px" }),
                             new sap.ui.commons.TextField({ id: "id_modifiedat", editable: false, 
width: "200px" }),
                             new sap.ui.commons.Label({ text: " ", width: "30px" }),
                             new sap.ui.commons.TextField({ id: "id_modifiedby", editable: false, 
width: "200px" })]
                 })

            ]
        });

        /*
        var toolbar = new sap.ui.commons.Toolbar({visible:false,items: [
                      panelBtn
              ]});
        toolbar.placeAt("panel1");
        oLayout1.placeAt("layout");

        */

        /*
            oPanel.addButton(panelBtn);
            oPanel.addContent(oLayout1);
            oPanel.placeAt("panel1");
        */
        //...................................................End Of Layout 
Form.......................................//


        //-------Fix to prevent that current field to lose content if window loses focus --------
        //         Change: C0017    By Sonny , 2014-11-25
       $(window).blur(function () {
            sap.ui.getCore().getElementById('id_equipmentdesc').focus();

        });
     
//----------------------------------------------------------------------------------------------

        /** 
#################################.........................................................###############################

                                                            Start of Scripting functions

        //** 
#################################.......................................................############################### 
*/
        var datePicker = "";
        var language = "";
        var SITE = "";
        var NAME = "";
        var DESCR = "";
        var AREA = "";
        var ROOTFUNCLOC = "";
        var PLANT = "";
        var IDSHIFTDATA = "";
        var IDFACTORY = "";
        var shortDescrShift = "";
        var LinkedMessageId = 0;
        var LOGIN = "";
        var IDMESSAGE = "";
        var CREATEDBY = "";
        var modelrowcount = 0;
        var msgdatetime = "";
        var funclocdescr = "";
        var toplogbook = "";
        var LoginRole = "";
        var checkIfTopLogbook = "";
        var LOGINNAME = "";
        var oModel2 = new sap.ui.model.xml.XMLModel();

        var approvedSTL = "ESLB_Shift_Team_Leader";
        var approvedDayTeam = "ESLB_Day_Team";
        var approvedKA_DeHy = "ESLB_at_KA_DeHy";
        var approvedST_Cracker = "ESLB_at_ST_Cracker";
        var approvedOperator = "ESLB_Operator";
        var approvedReadOnly = "ESLB_Read_Only";

        //------------------------

        function refreshUI5Data() {


            if (IDFACTORY == "")
            { alert("Logbook Id missing"); return; }

            if (IDSHIFTDATA == "")
            { alert("No Shift Planning exist"); return; }


            var param2 = "InfoType_lang.shortDescr" + language.toUpperCase();
            var param3 = "InfoState_lang.shortDescr" + language.toUpperCase();
            var param4 = "Order By msgdatetime desc";


            $.ajax({
                type: "GET",
                async: false,
                url: "/XMII/Illuminator",
                dataType: "xml",
                context: this,
                data: {
                    "QueryTemplate": "ESLB/ESB/Shiftbook/Messages/GetMessagesActualShiftQuery",
                    "Content-Type": "text/xml",
                    "OutputParameter": "output",
                    "Param.1": IDFACTORY,
                    "Param.2": param2,
                    "Param.3": param3,
                    "Param.4": param4,
                    "Param.5": PLANT,
                    "Param.6": IDSHIFTDATA
                },
                success: function (xmlData) {

                    oModel2.setData(xmlData);

                    if ($(xmlData).find("FatalError").size() > 0) {
                        openAlertBox("Title", $(xmlData).find("FatalError").text());
                        return;
                    }
                    if ($(xmlData).find("Message").size() > 0) {
                        openAlertBox("Title", $(xmlData).find("Message").text());
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    jQuery.sap.log.info("Error: " + textStatus + " --- Additionally Information: 
" + errorThrown);
                    alert(jqXHR.responseText);
                },
                complete: function (xmlData) {

                }
            });


            //............End of Get Table Data Function..............//

        }


        window.setInterval(function () {

            //////!!!!!               refreshUI5Data();

        }, 30000);


        //-----------------------

        // Equipment Enter
        sap.ui.getCore().getElementById('id_equipment').onsapenter = function () {
            sap.ui.getCore().getElementById('id_equipmentdesc').focus();
            EquipmentPopUp();
        }


        function initializedata() {

            // ......................start of AJAX ....get Factory Information 
......................//
            oDate();

            language = document.getElementById('txt_Language').value;
            IDFACTORY = document.getElementById('txt_BMFactory').value;
            LOGIN = document.getElementById('txt_LoginName').value;
            ROOTFUNCLOC = document.getElementById('txt_ROOTFUNCLOC').value;
            PLANT = document.getElementById('txt_PLANT').value;
            AREA = document.getElementById('txt_AREA').value;
            LoginRole = document.getElementById('txt_LoginRole').value;
            LOGINNAME = document.getElementById('txt_FullLoginName').value;



            oDropdownBox1.setValue(document.getElementById('txt_Combo_General').value);
            oDropdownBox3.setValue(AREA);

            var Initialdate = datePicker.getValue();
            sap.ui.getCore().getElementById('id_startdate').setValue(Initialdate);


            onReady();
            getTbdata();


            // end of toplogbook
            oButtonCreate.setVisible(false);
            oButtonUpdate.setVisible(false);
            oButtonDelete.setVisible(false);
            oButtonClear.setVisible(false);
            oButtonLinked.setVisible(false);
            oButtonDateCalender.setEnabled(false);
            startDateField.setEditable(false);
            sap.ui.getCore().getElementById('id_msgtitle').setEditable(false);
            sap.ui.getCore().getElementById('id_msgtext').setEditable(false);
            sap.ui.getCore().getElementById('id_equipment').setEditable(false);
            sap.ui.getCore().getElementById('popup').setEnabled(false);
            oDropdownBox1.setEditable(false);
            oDropdownBox3.setEditable(false);

            //  Readonly for day team
            if ((LoginRole.search(approvedDayTeam) != -1) || (LoginRole.search(approvedReadOnly) 
!= -1)) {
                oButtonCreate.setVisible(false);
                oButtonUpdate.setVisible(false);
                oButtonDelete.setVisible(false);
                oButtonClear.setVisible(false);
                oButtonLinked.setVisible(false);
                oButtonDateCalender.setEnabled(false);
                startDateField.setEditable(false);
                sap.ui.getCore().getElementById('id_msgtitle').setEditable(false);
                sap.ui.getCore().getElementById('id_msgtext').setEditable(false);
                sap.ui.getCore().getElementById('id_equipment').setEditable(false);
                sap.ui.getCore().getElementById('popup').setEnabled(false);
                oDropdownBox1.setEditable(false);
                oDropdownBox3.setEditable(false);
            }
            // End of day team read only


            if (toplogbook == null || toplogbook == "" || toplogbook == "NA") {
                toplogbook = IDFACTORY;  // set it for other logic
            }

            //alert(toplogbook);
            if (toplogbook == 8 && (LoginRole.search(approvedST_Cracker) != -1)) {
                if ((checkIfTopLogbook == null || checkIfTopLogbook == "" || checkIfTopLogbook == 
"NA") && (LoginRole.search(approvedSTL) == -1)) {
                    // make read only  top logbook for Non STL
                    //alert("Read only not STL or Day Team");
                }
                else {
                    // Write access to user
                    //alert("Cracker worker");
                    if ((LoginRole.search(approvedSTL) != -1) || 
(LoginRole.search(approvedOperator) != -1)) {
                        oButtonCreate.setVisible(true);
                        oButtonUpdate.setVisible(true);
                        oButtonDelete.setVisible(true);
                        oButtonClear.setVisible(true);
                        oButtonLinked.setVisible(true);
                        oButtonDateCalender.setEnabled(true);
                        startDateField.setEditable(true);
                        sap.ui.getCore().getElementById('id_msgtitle').setEditable(true);
                        sap.ui.getCore().getElementById('id_msgtext').setEditable(true);
                        sap.ui.getCore().getElementById('id_equipment').setEditable(true);
                        sap.ui.getCore().getElementById('popup').setEnabled(true);
                        oDropdownBox1.setEditable(true);
                        oDropdownBox3.setEditable(true);
                    }
                }
            }

            if (toplogbook == 23 && (LoginRole.search(approvedKA_DeHy) != -1)) {
                if ((checkIfTopLogbook == null || checkIfTopLogbook == "" || checkIfTopLogbook == 
"NA") && (LoginRole.search(approvedSTL) == -1)) {
                    // make read only
                }
                else {
                    // Write access to user
                    if ((LoginRole.search(approvedSTL) != -1) || 
(LoginRole.search(approvedOperator) != -1)) {
                        oButtonCreate.setVisible(true);
                        oButtonUpdate.setVisible(true);
                        oButtonDelete.setVisible(true);
                        oButtonClear.setVisible(true);
                        oButtonLinked.setVisible(true);
                        oButtonDateCalender.setEnabled(true);
                        startDateField.setEditable(true);
                        sap.ui.getCore().getElementById('id_msgtitle').setEditable(true);
                        sap.ui.getCore().getElementById('id_msgtext').setEditable(true);
                        sap.ui.getCore().getElementById('id_equipment').setEditable(true);
                        sap.ui.getCore().getElementById('popup').setEnabled(true);
                        oDropdownBox1.setEditable(true);
                        oDropdownBox3.setEditable(true);
                    }
                }
            }
            // End of page control

            // .........................Start of AJAX for TYpe List Combo box 1 //

            var param2 = "shortdescr";
            param2 = param2 + language;



            $.ajax({
                type: "POST",
                async: false,
                url: "/XMII/Illuminator",
                dataType: "xml",
                data: {
                    "QueryTemplate": "ESLB/ESB/Shiftbook/Messages/GetMessageTypeListQuery",
                    "Content-Type": "text/xml",
                    "Param.1": IDFACTORY,
                    "Param.2": param2
                },
                success: function (xmlData) {
                    mycombomodulList.setData(xmlData);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    jQuery.sap.log.info("Error: " + textStatus + " --- Additionally Information: 
" + errorThrown);
                    alert(jqXHR.responseText);
                },
                complete: function (xmlData) {
                }
            });

            // .........................End of AJAX for TYpe List Combo box 1



            /*	if(modelrowcount >18)
                {oTable.setVisibleRowCount(18);}
                if(modelrowcount <18 )
                {oTable.setVisibleRowCount(modelrowcount+1);}
                if(modelrowcount ==0 )
                {oTable.setVisibleRowCount(2);}
*/

        }


        //............End of Get initial Data Function..............//


        //............Start of Get Table Data Function..............//

        function getTbdata() {

            ////            oPanelTable.setVisible(true);
            ////          toolbar.setVisible(true);
            //oPanel.setVisible(true);

            if (IDFACTORY == "")
            { alert("Logbook Id missing"); return; }

            if (IDSHIFTDATA == "")
            { alert("No Shift Planning exist"); return; }


            var param2 = "InfoType_lang.shortDescr" + language.toUpperCase();
            var param3 = "InfoState_lang.shortDescr" + language.toUpperCase();
            var param4 = "Order By idMessage desc";


            $.ajax({
                type: "GET",
                async: false,
                url: "/XMII/Illuminator",
                dataType: "xml",
                context: this,
                data: {
                    "QueryTemplate": "ESLB/ESB/Shiftbook/Messages/GetMessagesActualShiftQuery",
                    "Content-Type": "text/xml",
                    "OutputParameter": "output",
                    "Param.1": IDFACTORY,
                    "Param.2": param2,
                    "Param.3": param3,
                    "Param.4": param4,
                    "Param.5": PLANT,
                    "Param.6": IDSHIFTDATA
                },
                success: function (xmlData) {

                    oModel2.setData(xmlData);
                    oTable.setModel(oModel2);
                    modelrowcount = ($(xmlData).find("Row").size());


                    if ($(xmlData).find("FatalError").size() > 0) {
                        openAlertBox("Title", $(xmlData).find("FatalError").text());
                        return;
                    }
                    if ($(xmlData).find("Message").size() > 0) {
                        openAlertBox("Title", $(xmlData).find("Message").text());
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    jQuery.sap.log.info("Error: " + textStatus + " --- Additionally Information: 
" + errorThrown);
                    alert(jqXHR.responseText);
                },
                complete: function (xmlData) {
                    oTable.setModel(oModel2).bindRows("/Rowset/0/Row");

                }
            });
        }

        //............End of Get Table Data Function..............//

        //............Start of Display Form Data Function..............//

        function displayFormData() {

            oButtonUpdate.setEnabled(true);
            oButtonDelete.setEnabled(true);
            oButtonLinked.setEnabled(true);
            oButtonCreate.setEnabled(false);

            var oTable = sap.ui.getCore().byId("id_msgTable");
            var i = oTable.getSelectedIndex();
            var selectedRow = oTable.getContextByIndex(i);

            if (selectedRow != null) {
                CREATEDBY = selectedRow.getProperty('createdByFullName');

                IDMESSAGE = selectedRow.getProperty('idMessage');
                funclocdescr = selectedRow.getProperty('funclocdescr');
                
sap.ui.getCore().getElementById('id_msgtitle').setValue(selectedRow.getProperty('messageTitle'));
                
sap.ui.getCore().getElementById('id_msgtext').setValue(selectedRow.getProperty('messageText'));
                
sap.ui.getCore().getElementById('id_equipment').setValue(selectedRow.getProperty('equipment'));
                
sap.ui.getCore().getElementById('id_equipmentdesc').setValue(selectedRow.getProperty('equipmentdescr'));
                
sap.ui.getCore().getElementById('id_equipmentnumberid').setValue(selectedRow.getProperty('equipmentNumber'));
                
sap.ui.getCore().getElementById('id_functionloc').setValue(selectedRow.getProperty('funcloc'));
                
sap.ui.getCore().getElementById('id_id').setValue(selectedRow.getProperty('idMessage'));
                
sap.ui.getCore().getElementById('id_createdby').setValue(selectedRow.getProperty('createdByFullName'));
                
sap.ui.getCore().getElementById('id_version').setValue(selectedRow.getProperty('version'));
                
sap.ui.getCore().getElementById('id_modifiedby').setValue(selectedRow.getProperty('changedByFullName'));
                
sap.ui.getCore().getElementById('id_createdshift').setValue(selectedRow.getProperty('shortDescrShift'));

                var createdAtDisplay = selectedRow.getProperty('createdAt');
                var changedAtDisplay = selectedRow.getProperty('changedAt');
                if (changedAtDisplay != "TimeUnavailable") {
                    changedAtDisplay = changedAtDisplay.replace("T", " ");
                    changedAtDisplay = changedAtDisplay.substr(0, 16);
                }
                createdAtDisplay = createdAtDisplay.replace("T", " ");
                createdAtDisplay = createdAtDisplay.substr(0, 16);

                sap.ui.getCore().getElementById('id_createdat').setValue(createdAtDisplay);
                sap.ui.getCore().getElementById('id_modifiedat').setValue(changedAtDisplay);

                msgdatetime = selectedRow.getProperty('msgdatetime');

                var displayStartDate = selectedRow.getProperty('msgdatetime');
                displayStartDate = displayStartDate.replace("T", " ");
                displayStartDate = displayStartDate.substr(0, 16);

                sap.ui.getCore().getElementById('id_startdate').setValue(displayStartDate);

                Status.setValue(selectedRow.getProperty('idInfoState')); //hidden field
                
sap.ui.getCore().getElementById('id_status').setValue(selectedRow.getProperty('StateDescr'));

                oDropdownBox1.setValue(selectedRow.getProperty('TypeDescr'));
                oDropdownBox3.setValue(selectedRow.getProperty('area'));

                document.getElementById('txt_EquipNo').value = 
selectedRow.getProperty('equipmentNumber');
                document.getElementById('txt_EquipmentDscr').value = 
selectedRow.getProperty('equipmentdescr');
                document.getElementById('txt_FunctionalLoc').value = 
selectedRow.getProperty('funcloc');

                
sap.ui.getCore().getElementById('id_linkedmessage').setValue(selectedRow.getProperty('refMessage'));

                /*
                // check if Linked message visibility
                if(selectedRow.getProperty('refMessage') >1)
                {
                    oLabelLinked.setVisible(true);
                    linkedField.setVisible(true);
                    linkedPopUp.setVisible(true);
                
sap.ui.getCore().getElementById('id_linkedmessage').setValue(selectedRow.getProperty('refMessage')) 
; }
                else
                {
                    oLabelLinked.setVisible(false);
                    linkedField.setVisible(false);
                    linkedPopUp.setVisible(false);
                }// end linked msg
                */

            }
        }
        //............End of Display Form Data Function..............//

        //............Start of Add Data Function..............//

        function addData() {

            var equipmentNumber = document.getElementById('txt_EquipNo').value;
            var equipmentdescr = document.getElementById('txt_EquipmentDscr').value;
            var Funloc = document.getElementById('txt_FunctionalLoc').value;

            var idRefMessage = sap.ui.getCore().getElementById('id_linkedmessage').getValue();
            var equipment = sap.ui.getCore().getElementById('id_equipment').getValue();
            var MessageTitle = sap.ui.getCore().getElementById('id_msgtitle').getValue();
            var ID = sap.ui.getCore().getElementById('id_id').getValue();
            var MessageText = sap.ui.getCore().getElementById('id_msgtext').getValue();
            var version = sap.ui.getCore().getElementById('id_version').getValue();

            var CreatedAt = sap.ui.getCore().getElementById('id_startdate').getValue();
            CreatedAt = CreatedAt.replace(" ", "T");
            CreatedAt = CreatedAt + ":00";

            var idType = oDropdownBox1.getSelectedKey();
            var idStatus = "39";
            var area = oDropdownBox3.getValue();
            var CreatedShift = sap.ui.getCore().getElementById('id_createdshift').getValue();
            if (CreatedAt.length != 19) { 
alert(document.getElementById('txt_AlertDateValidation').value); return; }

            if (idType > 1 && idStatus > 1 && IDSHIFTDATA > 1 && MessageTitle != "" && 
MessageTitle != " " && area != "") {
                //addHistoryData(idStatus);
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/XMII/Illuminator",
                    dataType: "xml",
                    context: this,
                    data: {
                        "QueryTemplate": "ESLB/ESB/Shiftbook/Messages/CreateNewMessageXacQuery",
                        "Content-Type": "text/xml",
                        "DateFormat": "yyyy-MM-dd HH:mm:ss",
                        "Param.1": IDFACTORY,
                        "Param.2": IDSHIFTDATA,
                        "Param.3": Funloc,
                        "Param.4": idType,
                        "Param.5": idStatus,
                        "Param.6": MessageText,
                        "Param.7": MessageTitle,
                        "Param.8": idRefMessage,
                        "Param.9": area,
                        "Param.10": CreatedAt,
                        "Param.11": equipment,
                        "Param.12": equipmentdescr,
                        "Param.13": equipmentNumber,
                        "Param.14": LOGINNAME

                    },
                    success: function (xmlData) {
                        if ($(xmlData).find("FatalError").size() > 0) {
                            openAlertBox(document.getElementById('txt_AlertTechnical').value, 
$(xmlData).find("FatalError").text());
                            return;
                        }

                        if ($(xmlData).find("Message").size() > 0) {
                            //openAlertBox("Title",$(xmlData).find("Message").text());
                            return;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        jQuery.sap.log.info("Error: " + textStatus + " --- Additionally 
Information: " + errorThrown);
                        alert(jqXHR.responseText);
                    },
                    complete: function (xmlData) {
                        getTbdata();
                        clearData();
                    }
                });
            } else { alert(document.getElementById('txt_AlertValidation').value); return; }
        }
        //............End of Add Data Function..............//


        //............Start of Add HISTORY Data Function..............//

        function addHistoryData() {

            var oTable = sap.ui.getCore().byId("id_msgTable");
            var i = oTable.getSelectedIndex();
            var selectedRow = oTable.getContextByIndex(i);

            var funclocdescr = selectedRow.getProperty('funclocdescr');
            var guid = selectedRow.getProperty('guid');

            var createdBy = selectedRow.getProperty('createdBy');
            var CreatedAt = selectedRow.getProperty('createdAt'); // get this value from data 
grid
            var changedAt = selectedRow.getProperty('changedAt');
            var changedBy = selectedRow.getProperty('changedBy');
            var createdByFullName = selectedRow.getProperty('createdByFullName');
            var changedByFullName = selectedRow.getProperty('changedByFullName');

            if (changedBy == "---") { changedBy = ""; }
            if (changedByFullName == "---") { changedByFullName = ""; }
            if (createdByFullName == "---") { createdByFullName = ""; }
            if (changedAt == "TimeUnavailable") { changedAt = ""; }

            var MsgID = selectedRow.getProperty('idMessage');

            var equipmentNumber = document.getElementById('txt_EquipNo').value;
            var equipmentdescr = document.getElementById('txt_EquipmentDscr').value;
            var Funloc = document.getElementById('txt_FunctionalLoc').value;

            var idRefMessage = selectedRow.getProperty('refMessage');
            var equipment = selectedRow.getProperty('equipment');
            var MessageTitle = selectedRow.getProperty('messageTitle');
            var MessageText = selectedRow.getProperty('messageText');
            var version = selectedRow.getProperty('version');

            var idType = selectedRow.getProperty('idInfoType');
            var idStatus = selectedRow.getProperty('idInfoState');
            var area = selectedRow.getProperty('area');

            if (idType > 1 && idStatus > 1 && IDSHIFTDATA > 1 && MessageTitle != "" && 
MessageTitle != " " && area != "") {

                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/XMII/Illuminator",
                    dataType: "xml",
                    context: this,
                    data: {
                        "QueryTemplate": 
"ESLB/ESB/Shiftbook/Messages/InsertMessageVersionHistoryQuery",
                        "Content-Type": "text/xml",
                        "DateFormat": "yyyy-MM-dd HH:mm:ss",
                        "Param.1": IDFACTORY,
                        "Param.2": IDSHIFTDATA,
                        "Param.3": Funloc,
                        "Param.4": idType,
                        "Param.5": idStatus,
                        "Param.6": MessageText,
                        "Param.7": MessageTitle,
                        "Param.8": idRefMessage,
                        "Param.9": createdBy,
                        "Param.10": guid,
                        "Param.11": area,
                        "Param.12": msgdatetime,
                        "Param.13": equipment,
                        "Param.14": equipmentdescr,
                        "Param.15": equipmentNumber,
                        "Param.16": version,
                        "Param.17": MsgID,
                        "Param.18": CreatedAt,
                        "Param.19": funclocdescr,
                        "Param.20": changedAt,
                        "Param.21": changedBy,
                        "Param.22": createdByFullName,
                        "Param.23": changedByFullName
                    },
                    success: function (xmlData) {
                        if ($(xmlData).find("FatalError").size() > 0) {
                            openAlertBox(document.getElementById('txt_AlertTechnical').value, 
$(xmlData).find("FatalError").text());
                            return;
                        }

                        if ($(xmlData).find("Message").size() > 0) {
                            //openAlertBox("Title",$(xmlData).find("Message").text());
                            return;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        jQuery.sap.log.info("Error: " + textStatus + " --- Additionally 
Information: " + errorThrown);
                        alert(jqXHR.responseText);
                    },
                    complete: function (xmlData) {

                    }
                });
            } else { alert(document.getElementById('txt_AlertValidation').value); return; }
        }
        //............End of Add HISTORY Data Function..............//


        //............Start of Update Data Function..............//

        function updateData() {

            var oTable = sap.ui.getCore().byId("id_msgTable");
            var i = oTable.getSelectedIndex();
            var selectedRow = oTable.getContextByIndex(i);
            if (selectedRow == null)
            { alert(document.getElementById('txt_AlertNoRowSelection').value); return; }

            var equipmentNumber = document.getElementById('txt_EquipNo').value;
            var equipmentdescr = document.getElementById('txt_EquipmentDscr').value;
            var Funloc = document.getElementById('txt_FunctionalLoc').value;
            var MessageTitle = sap.ui.getCore().getElementById('id_msgtitle').getValue();
            var MsgID = sap.ui.getCore().getElementById('id_id').getValue();
            var MessageText = sap.ui.getCore().getElementById('id_msgtext').getValue();
            var equipment = sap.ui.getCore().getElementById('id_equipment').getValue();
            var idRefMessage = sap.ui.getCore().getElementById('id_linkedmessage').getValue();
            var CreatedShift = sap.ui.getCore().getElementById('id_createdshift').getValue();
            var idStatus = sap.ui.getCore().getElementById('id_State').getValue();
            var idType = oDropdownBox1.getSelectedKey();
            var area = oDropdownBox3.getValue();
            var MsgDate = sap.ui.getCore().getElementById('id_startdate').getValue();
            MsgDate = MsgDate.replace(" ", "T");
            MsgDate = MsgDate + ":00";

            var version = parseInt(sap.ui.getCore().getElementById('id_version').getValue());
            if (version != parseInt(selectedRow.getProperty('version')))
            { alert(document.getElementById('txt_AlertVersion').value); return; }
            //alert(document.getElementById('txt_AlertLatestVersion').value));
            if (MsgDate.length != 19) { 
alert(document.getElementById('txt_AlertDateValidation').value); return; }
            if (idType > 1 && idStatus > 1 && IDSHIFTDATA > 1 && MessageTitle != "" && 
MessageTitle != " " && area != "") {

                addHistoryData(idStatus);  // Add existing version to history before update
                //alert(LOGINNAME);
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/XMII/Illuminator",
                    dataType: "xml",
                    context: this,
                    data: {
                        "QueryTemplate": "ESLB/ESB/Shiftbook/Messages/UpdateMessageXacQuery",
                        "Content-Type": "text/xml",
                        "DateFormat": "yyyy-MM-dd HH:mm:ss",
                        "Param.1": IDFACTORY,
                        "Param.2": MsgID,
                        "Param.3": Funloc,
                        "Param.4": idType,
                        "Param.5": idStatus,
                        "Param.6": MessageText,
                        "Param.7": MessageTitle,
                        "Param.8": idRefMessage,
                        "Param.9": version,
                        "Param.10": area,
                        "Param.11": MsgDate,
                        "Param.12": equipment,
                        "Param.13": equipmentdescr,
                        "Param.14": equipmentNumber,
                        "Param.15": LOGINNAME
                    },
                    success: function (xmlData) {
                        if ($(xmlData).find("FatalError").size() > 0) {
                            openAlertBox(document.getElementById('txt_AlertTechnical').value, 
$(xmlData).find("FatalError").text());
                            return;
                        }
                        if ($(xmlData).find("Message").size() > 0) {
                            //openAlertBox("Title",$(xmlData).find("Message").text());
                            getTbdata();
                            return;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        jQuery.sap.log.info("Error: " + textStatus + " --- Additionally 
Information: " + errorThrown);
                        alert(jqXHR.responseText);
                    },
                    complete: function (xmlData) {
                        getTbdata();
                        clearData();
                    }
                });
            } else { alert(document.getElementById('txt_AlertValidation').value); return; }
        }
        //............End of Update Data Function..............//


        //......................Start Of Delete  Data Function.........................//
        function deleteData() {

            if (IDMESSAGE > 1) {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/XMII/Illuminator",
                    dataType: "xml",
                    context: this,
                    data: {
                        "QueryTemplate": "ESLB/ESB/Shiftbook/Messages/DeleteMessageQuery",
                        "Content-Type": "text/xml",
                        "Param.1": IDMESSAGE
                    },
                    success: function (xmlData) {
                        if ($(xmlData).find("FatalError").size() > 0) {
                            openAlertBox(document.getElementById('txt_AlertTechnical').value, 
$(xmlData).find("FatalError").text());
                            return;
                        }
                        if ($(xmlData).find("Message").size() > 0) {
                            //openAlertBox("Title",$(xmlData).find("Message").text());
                            return;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        jQuery.sap.log.info("Error: " + textStatus + " --- Additionally 
Information: " + errorThrown);
                        alert(jqXHR.responseText);
                    },
                    complete: function (xmlData) {
                        getTbdata();
                        clearData();
                    }
                });
            } else { alert(document.getElementById('txt_AlertDelete').value); return }
        }
        //......................End Of Delete  Data Function.........................//

        //............Start of Clear Data Function..............//
        function clearData() {
            oDate();
            sap.ui.getCore().getElementById('id_msgtitle').setValue("");
            sap.ui.getCore().getElementById('id_msgtext').setValue("");
            sap.ui.getCore().getElementById('id_equipment').setValue("");
            sap.ui.getCore().getElementById('id_equipmentdesc').setValue("");
            sap.ui.getCore().getElementById('id_equipmentnumberid').setValue("");
            sap.ui.getCore().getElementById('id_id').setValue("");
            sap.ui.getCore().getElementById('id_functionloc').setValue("");
            sap.ui.getCore().getElementById('id_linkedmessage').setValue("");
            sap.ui.getCore().getElementById('id_id').setValue("");
            sap.ui.getCore().getElementById('id_createdby').setValue("");
            sap.ui.getCore().getElementById('id_createdat').setValue("");
            sap.ui.getCore().getElementById('id_version').setValue("");
            sap.ui.getCore().getElementById('id_modifiedat').setValue("");
            sap.ui.getCore().getElementById('id_modifiedby').setValue("");
            sap.ui.getCore().getElementById('id_createdshift').setValue("");

            sap.ui.getCore().getElementById('id_msgtitle').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_msgtext').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_equipment').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_equipmentdesc').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_equipmentnumberid').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_id').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_functionloc').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_linkedmessage').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_createdby').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_createdat').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_version').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_modifiedat').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_modifiedby').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_functionloc').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_createdshift').setPlaceholder(" ");

            document.getElementById('txt_EquipNo').value = "";
            document.getElementById('txt_EquipmentDscr').value = "";
            document.getElementById('txt_FunctionalLoc').value = "";

            var Initialdate = datePicker.getValue();
            sap.ui.getCore().getElementById('id_startdate').setValue(Initialdate);

            sap.ui.getCore().getElementById('id_status').setValue("");
            sap.ui.getCore().getElementById('id_status').setPlaceholder(" ");
            oDropdownBox1.setValue(document.getElementById('txt_Combo_General').value);
            oDropdownBox3.setValue(AREA);
            oTable.clearSelection();

            oButtonUpdate.setEnabled(false);
            oButtonDelete.setEnabled(false);
            oButtonLinked.setEnabled(false);
            oButtonCreate.setEnabled(true);

            /*
                oLabelLinked.setVisible(false);
                linkedField.setVisible(false);
                linkedPopUp.setVisible(false);
            */

        }
        //............End of Clear Data Function..............//

        //............start of Linked message Function..............//
        function linkedMessage() {
            oLabelLinked.setVisible(true);
            linkedField.setVisible(true);
            linkedPopUp.setVisible(true);
            var oTable = sap.ui.getCore().byId("id_msgTable");
            var i = oTable.getSelectedIndex();
            var selectedRow = oTable.getContextByIndex(i);

            if (selectedRow != null) {
                
sap.ui.getCore().getElementById('id_linkedmessage').setValue(selectedRow.getProperty('idMessage'));
            }

            sap.ui.getCore().getElementById('id_msgtext').setValue("");
            sap.ui.getCore().getElementById('id_equipment').setValue("");
            sap.ui.getCore().getElementById('id_equipmentdesc').setValue("");
            sap.ui.getCore().getElementById('id_equipmentnumberid').setValue("");
            sap.ui.getCore().getElementById('id_id').setValue("");
            sap.ui.getCore().getElementById('id_id').setValue("");
            sap.ui.getCore().getElementById('id_createdby').setValue("");
            sap.ui.getCore().getElementById('id_createdat').setValue("");
            sap.ui.getCore().getElementById('id_version').setValue("");
            sap.ui.getCore().getElementById('id_modifiedat').setValue("");
            sap.ui.getCore().getElementById('id_modifiedby').setValue("");
            sap.ui.getCore().getElementById('id_functionloc').setValue("");
            sap.ui.getCore().getElementById('id_createdshift').setValue("");

            sap.ui.getCore().getElementById('id_msgtext').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_equipment').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_equipmentdesc').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_equipmentnumberid').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_id').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_id').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_createdby').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_createdat').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_version').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_modifiedat').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_modifiedby').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_functionloc').setPlaceholder(" ");
            sap.ui.getCore().getElementById('id_createdshift').setPlaceholder(" ");
            var Initialdate = datePicker.getValue();
            sap.ui.getCore().getElementById('id_startdate').setValue(Initialdate);
            oDropdownBox2.setValue("");
            oButtonUpdate.setEnabled(false);
            oButtonLinked.setEnabled(false);
            oButtonCreate.setEnabled(true);
        }
        //............End of Linked message Function..............//

        function GetDateFromPicker(StrFormat) {

            var StrPattern = "start";
            var StrFormat = "yyyy-MM-dd";
            var url = "/XMII/CM/ESLB/Common/Utilities/Popup/DateTimePickerUI5.irpt?DateFormat=" + 
StrFormat + "&DatePatterns=" + StrPattern;
            window.open(url, 'ESB_DatePicker', 
'menubar=no,left=500,top=400,width=200,height=200,status=yes,dependent=yes').focus();

        }

        //........................Start Of Get Version Function....................//
        function getVersions() {


            var version = sap.ui.getCore().getElementById('id_version').getValue();
            var param2 = "InfoType_lang.shortDescr" + language.toUpperCase();
            var param3 = "InfoState_lang.shortDescr" + language.toUpperCase();
            var MsgID = sap.ui.getCore().getElementById('id_id').getValue();
            //	var param4= "Order By msgdatetime desc" ;
            var param4 = "Order By version desc";
            var url = "/XMII/CM/ESLB/ESB/Shiftbook/Messages/MessagesVersionHistory.irpt"
            url += "?BM_Factory=" + IDFACTORY;
            url += "&IDSHIFTDATA=" + IDSHIFTDATA;
            url += "&PLANT=" + PLANT;
            url += "&ID=" + MsgID;
            url += "&param2=" + param2;
            url += "&param3=" + param3;
            url += "&param4=" + param4;
            url += "&shortDescrShift=" + shortDescrShift;


            if (version >= 1) {
                window.open(url, 'ESB_EquipmentPopup', 'menubar=no,left=100,resizable=yes, 
top=50,width=920,height=680,status=yes,dependent=yes').focus();
            }
        }
        //........................End Of Get Version Function....................//

        //...................Start of Export Data Function................//
        function exportData(Set) {

            var param2 = "InfoType_lang.shortDescr" + language.toUpperCase();
            var param3 = "InfoState_lang.shortDescr" + language.toUpperCase();
            var param4 = "Order By idMessage desc";

            var url = "ESLB/ESB/Shiftbook/Messages/GetMessagesActualShiftQuery"

            var param1 = IDFACTORY;
            var param2 = param2;
            var param3 = param3;
            var param4 = param4;
            var param5 = PLANT;
            var param6 = IDSHIFTDATA;
            var param8 = null;

            var queryTemplate = url;
            if (Set == 1) {
                getExportAsExcel(queryTemplate, param1, param2, param3, param4, param5, param6, 
param8);
                //window.open("/XMII/Illuminator?QueryTemplate=" + queryTemplate + 
"&#38;Content-Type=text/csv");
            }
            if (Set == 2)

            { window.open("/XMII/Illuminator?QueryTemplate=" + queryTemplate + 
"&#38;Content-Type=text/html"); }


        }

        //...................End of Export Data Function................//

        // a callback that will be called when the message box is closed again
        function fnCallbackMessageBox(sResult) {

            if (sResult == "YES")
            { deleteData(); }
            if (sResult == "NO")
            { return; }
        }

        function openMessageBox() {

            // confirm only same user delete record
            if (CREATEDBY != LOGINNAME)

            { alert("This record is created by " + CREATEDBY + ", only " + CREATEDBY + " can 
delete it"); return; }
            // this is required since there is no direct access to the box's icons like 
MessageBox.Icon.WARNING
            jQuery.sap.require("sap.ui.commons.MessageBox");

            sap.ui.commons.MessageBox.show("Message Id : " + IDMESSAGE + ", Confirm to Delete 
record?",
                    sap.ui.commons.MessageBox.Icon.WARNING,
                    "This Action will delete it permanently",
                    [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                    fnCallbackMessageBox,
                    sap.ui.commons.MessageBox.Action.YES);
        }



        // --------------------        create a horizontal Splitter 
--------------------------------------------
        var oSplitterH = new sap.ui.commons.Splitter("splitterH");
        oSplitterH.setSplitterOrientation(sap.ui.commons.Orientation.horizontal);
        oSplitterH.setSplitterPosition("100%");
        oSplitterH.setMinSizeFirstPane("10%");
        oSplitterH.setMinSizeSecondPane("0%");
        oSplitterH.setWidth("100%");
        oSplitterH.setHeight("100%");

        //adding Labels to both panes
        //var oLabel1 = new sap.ui.commons.Label({text: "First Pane"});
        //oSplitterH.addFirstPaneContent(oLabel1);
        oSplitterH.addFirstPaneContent(oTable);
        //var oLabel2 = new sap.ui.commons.Label({text: "Second Pane"});
        oSplitterH.addSecondPaneContent(oLayout1);

        oSplitterH.placeAt("sample1");

        //------------------------ ToggleDetails 
-------------------------------------------------------------------------------
        function ToggleDetails() {
            if (document.getElementById("myButton1").innerHTML == "View Details") {
                oSplitterH.setSplitterPosition("40%");
                document.getElementById("myButton1").innerHTML = "Hide Details";
            }
            else {
                oSplitterH.setSplitterPosition("100%");
                document.getElementById("myButton1").innerHTML = "View Details";
            }
        }


    </script>



</head>

<body style="height:100%">

    <div style="height: 100%; background: gray;">
        <div id="sample1" style="width: 100%; background: white; height: calc(100% - 20px); 
"></div>
        <div style="width: 100%; ">
           &nbsp; <button id="myButton1" onclick="ToggleDetails()">View Details</button>
<!--           &nbsp; <button id="myButton2" onclick="TestTopLink()">Change user</button>  -->
        </div>
    </div>

    <div id="DateDiv" style="display: none;" class="formBorealis"></div>
    <div id="status" style="display: none;" class="formBorealis"></div>

    <input type="hidden" id="mylanguage" value="{language}" />

    <input type="hidden" id="txt_shortDescrShift" value="{shortDescrShift}" />
    <input type="hidden" id="txt_popup" value="" />

    <input type="hidden" id="txt_EquipNo" value=" " />
    <input type="hidden" id="txt_FunctionalLoc" value=" " />
    <input type="hidden" id="txt_EquipmentDscr" value=" " />

    <input type="hidden" id="txt_BMFactory" value="{BM_Factory}" />
    <input type="hidden" id="txt_LoginName" value="{IllumLoginName}" />
    <input type="hidden" id="txt_LoginName" value="{IllumLoginName}" />
    <input type="hidden" id="txt_Language" value="{Language}" />
    <input type="hidden" id="txt_PLANT" value="{PLANT}" />
    <input type="hidden" id="txt_ROOTFUNCLOC" value="{ROOTFUNCLOC}" />
    <input type="hidden" id="txt_AREA" value="{AREA}" />
    <input type="hidden" id="txt_LoginRole" value="{IllumLoginRoles}" />
    <input type="hidden" id="txt_FullLoginName" value="{FullName}" />

    <input type="hidden" id="txt_AREA" value="{##txt_AlertLatestVersion}" />
    <input type="hidden" id="txt_AlertTechnical" value="{##AlertTechnicalError}" />
    <input type="hidden" id="txt_AlertDateValidation" value="{##AlertDateValidation}" />
    <input type="hidden" id="txt_AlertValidation" value="{##AlertValidation}" />
    <input type="hidden" id="txt_AlertPopUp" value="{##AlertPopUp}" />
    <input type="hidden" id="txt_AlertDelete" value="{##AlertDelete}" />
    <input type="hidden" id="txt_AlertNoFactory" value="{##AlertNoFactoryInfo}" />
    <input type="hidden" id="txt_AlertActualShiftNotAvailable" 
value="{##AlertActualShiftNotAvailable}" />
    <input type="hidden" id="txt_Combo_General" value="{##Combo_General}" />
    <input type="hidden" id="txt_AlertVersion" value="{##AlertVersion}" />
    <input type="hidden" id="txt_AlertNoRowSelection" value="{##AlertNoRowSelection}" />

    <script>
        initializedata();
    </script>

</body>

</html>



/************************************************************************/



<!DOCTYPE html>
<html style="height:100%">
<!-- 
============================================================================
Test of page layout with splitter and auto-adjustment to window size
By Sonny 
============================================================================

-->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>Splitt pane test</title>
    <meta name="keywords" content="Control Table" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link href="/XMII/CM/ESLB/Common/CSS/Content.css" rel="stylesheet" type="text/css" />

    <script language="javascript" src="/XMII/CM/ESLB/Common/JSFiles/UtilityFunctions.js" 
type="text/javascript"></script>
    <script language="javascript" src="/XMII/CM/ESLB/Common/Utility/ExportAsExcel.js" 
type="text/javascript"></script>
    <script language="javascript" src="/XMII/CM/ESLB/Common/JSFiles/shiftbook.js" 
type="text/javascript"></script>

    <script id="sap-ui-bootstrap"
            src="/sapui5/resources/sap-ui-core.js"
            data-sap-ui-theme="sap_goldreflection"
            data-sap-ui-libs="sap.ui.core,sap.ui.commons,sap.ui.table">
    </script>

    <style>
        .formBorealis {
            margin-left: 10px;
            margin-right: 10px;
        }
    </style>

    <script id='SplitterH'>


//--------------------------------- Table 
--------------------------------------------------------------------------------------
  var oTable = new sap.ui.table.DataTable("id_msgTable", {
            editable : true,
	//visible:false,
	visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto, 
            //visibleRowCount :30,
	width:"100%"

    });
		 //oTable.setSelectionMode(sap.ui.table.SelectionMode.Multi);
		 //oTable.attachRowSelectionChange(displayFormData,this);

  		oTable.setToolbar(new sap.ui.commons.Toolbar({items: [
   			  new sap.ui.commons.Label({text: "Test table",design:"Bold", 
width:"800px"}),
			  new sap.ui.commons.Button({icon: 
"/XMII/CM/ESLB/Common/Image/IconsPES/exportCSV.png",tooltip: "{i18n>Tooltip_Export_in_CSV}"}),
 			new sap.ui.commons.Button({icon: 
"/XMII/CM/ESLB/Common/Image/IconsPES/exportHTML.png", tooltip: "{i18n>Tooltip_Export_in_HTML}"})
  	  ]}));

 //.............Define the columns and the control templates to be used...........//

oTable.addColumn( new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Col 1"}),
              template: new sap.ui.commons.TextField().bindProperty("value", "idMessage"),
       		  sortProperty: "idMessage",
              filterProperty: "idMessage",
              width: "50px"
          }));
oTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Col 2"}),
              template: new sap.ui.commons.TextView().bindProperty("text", "messageTitle"),
              sortProperty: "messageTitle",
              filterProperty: "messageTitle",
              width: "100px",
          }));

oTable.ondblclick = function () {
    	ToggleDetails();
};


//....................................Start Of Layout Form.....................................//
var oButtonCreate =new sap.ui.commons.Button({text: "CREATE", margin:"4px"});
var oButtonUpdate =  new sap.ui.commons.Button({text: "UPDATE",enabled:false, width: "70px", 
margin:"4px"});
var oButtonDelete =  new sap.ui.commons.Button({text: "DELETE",enabled:false, width: "70px", 
margin:"4px"});
var oButtonClear = new sap.ui.commons.Button({text: "CLEAR", width: "70px", margin:"4px"});

var oLayout1 = new sap.ui.layout.VerticalLayout( {visible:true,
	content:[
	           new sap.ui.commons.HorizontalDivider(),
		new sap.ui.layout.HorizontalLayout( {
			content:[	oButtonCreate,
						new sap.ui.commons.Label({text: " ", 
width:"5px"}),
						oButtonUpdate,
						new sap.ui.commons.Label({text: " ", 
width:"5px"}),
						oButtonDelete,
						new sap.ui.commons.Label({text: " ", 
width:"5px"}),
						oButtonClear]
			}),
		new sap.ui.commons.Label({text: " "}),
		new sap.ui.layout.HorizontalLayout( {
			content:[new sap.ui.commons.Label({text: "Test", required:true, 
width:"230px"}),
					new sap.ui.commons.Label({text: "Textttt"})]
		}),
		new sap.ui.layout.HorizontalLayout({
			content:[ new sap.ui.commons.TextField({id:"id_msgtitle",tooltip: 
"Test",maxLength:120 ,  width: "200px",}),
					new sap.ui.commons.Label({text: " ", width:"30px"}),
					new sap.ui.commons.TextArea({id:"id_msgtext",tooltip: 
"Texttt",maxLength: 1000,width: "660px", height:"60px"	})]
		}),

		new sap.ui.commons.Label({text: " "}),
		new sap.ui.layout.HorizontalLayout( {
			content:[new sap.ui.commons.Label({text: "Test2", required:true, 
width:"230px"}),
					new sap.ui.commons.Label({text: "Textttt2"})]
		}),
		new sap.ui.layout.HorizontalLayout({
			content:[ new sap.ui.commons.TextField({id:"id_msgtitle2",tooltip: 
"Test",maxLength:120 ,  width: "200px",}),
					new sap.ui.commons.Label({text: " ", width:"30px"}),
					new sap.ui.commons.TextArea({id:"id_msgtext2",tooltip: 
"Texttt",maxLength: 1000,width: "660px", height:"60px"	})]
		})



	]
});


// --------------------        create a horizontal Splitter 
--------------------------------------------
		var oSplitterH = new sap.ui.commons.Splitter("splitterH");
		oSplitterH.setSplitterOrientation(sap.ui.commons.Orientation.horizontal);
		oSplitterH.setSplitterPosition("100%");
		oSplitterH.setMinSizeFirstPane("10%");
		oSplitterH.setMinSizeSecondPane("0%");
		oSplitterH.setWidth("100%");
		oSplitterH.setHeight("100%");

		//adding Labels to both panes
		//var oLabel1 = new sap.ui.commons.Label({text: "First Pane"});
		//oSplitterH.addFirstPaneContent(oLabel1);
		oSplitterH.addFirstPaneContent(oTable);
		//var oLabel2 = new sap.ui.commons.Label({text: "Second Pane"});
		 oSplitterH.addSecondPaneContent(oLayout1);

	            oSplitterH.placeAt("sample1");

//------------------------ ToggleDetails 
-------------------------------------------------------------------------------
 function ToggleDetails() {
	if (document.getElementById("myButton1").innerHTML=="View Details") {
		  oSplitterH.setSplitterPosition("30%");
		  document.getElementById("myButton1").innerHTML="Hide Details";}
	else {
		oSplitterH.setSplitterPosition("100%");
		document.getElementById("myButton1").innerHTML="View Details"; }
	}
</script>



</head>

<body style="height:100%">

	<div style="height: calc(100%); background: gray;">
		<div id="sample1" style="width: 100%; background: white; height: calc(100% - 
20px); "></div>
		<div style="width: 100%; ">
			<button id="myButton1" onclick="ToggleDetails()">View Details</button>
		</div>
	</div>

</body>
</html>
