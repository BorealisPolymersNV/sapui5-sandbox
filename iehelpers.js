var ielog = function(msg, len) {
  if(! msg.length) return; 
  var s = msg.slice(0,len);
  console.log(s);
  ielog(msg.slice(len, msg.length), len);
};