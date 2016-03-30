var sql = require('mssql');

var log = console.log.bind(console, 'LOG');
var error = console.log.bind(console, 'ERROR');

sql.connect("mssql://SAPMII_ESLB-Sandbox2_RW:Mfb93(aQPS@sapmii_db_w.mignetwork.net/SAPMII_ESLB-Sandbox2")
    .then(function() {
    
        new sql.Request().query('select * from EventDef')
            .then(log)
    .catch(error);
 
}).catch(error);
