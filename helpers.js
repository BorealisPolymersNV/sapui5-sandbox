(function(){

  var helpers = {};

  helpers.ielog = function(msg, len) {
    if(! msg.length) return;
    var s = msg.slice(0,len);
    console.log(s);
    helpers.ielog(msg.slice(len, msg.length), len);
  };

  helpers.logxml = function(xml) {
   helpers.ielog(new XMLSerializer().serializeToString(xml), 255);
  }

  window['helpers'] = helpers;

})();

