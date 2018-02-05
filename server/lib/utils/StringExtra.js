/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

'use strict';

var Util = require('util');

String.prototype.startWith=function(regStr){     
  var reg=new RegExp("^"+regStr);     
  return reg.test(this);        
} 
 
String.prototype.endWith=function(regStr){     
  var reg=new RegExp(regStr+"$");     
  return reg.test(this);        
}

String.format=function(){
	return Util.format.apply(null, arguments);
}


