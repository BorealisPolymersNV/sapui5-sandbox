var sql = require('mssql');

var log = console.log.bind(console, 'LOG');
var error = console.log.bind(console, 'ERROR');

var conn = new sql.connect("mssql://SAPMII_ESLB-Sandbox2_RW:Mfb93(aQPS@sapmii_db_w.mignetwork.net/SAPMII_ESLB-Sandbox2")
  .then(function () {
    return new sql.Request().query('select * from EventDef');
  })
  .then(function(res){
    log(res);
    return sql.close();
  })
  .catch(error);
