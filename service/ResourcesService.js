'use strict';


/**
 *
 * resource Resource 
 * returns Resource
 **/
exports.createResource = function(resource) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mail" : "mail",
  "name" : "name",
  "id" : 0,
  "type" : { }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id Long 
 * calendarEventId String 
 * no response value expected for this operation
 **/
exports.createResourceInvitationAsync = function(id,calendarEventId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * id Long 
 * no response value expected for this operation
 **/
exports.deleteResource = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * id Long 
 * calendarEventId String 
 * no response value expected for this operation
 **/
exports.deleteResourceInvitationAsync = function(id,calendarEventId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * type String Type [ ROOM, EQUIPMENT ]<br>TypeWorkGroupEnum (optional)
 * available Boolean  (optional)
 * beginDate Date  (optional)
 * endDate Date  (optional)
 * returns List
 **/
exports.findResources = function(type,available,beginDate,endDate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "mail" : "mail",
  "name" : "name",
  "id" : 0,
  "type" : { }
}, {
  "mail" : "mail",
  "name" : "name",
  "id" : 0,
  "type" : { }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id Long 
 * beginDate Date  (optional)
 * endDate Date  (optional)
 * returns Boolean
 **/
exports.isResourceAvailable = function(id,beginDate,endDate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = true;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id Long 
 * returns Resource
 **/
exports.readResource = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mail" : "mail",
  "name" : "name",
  "id" : 0,
  "type" : { }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id Long 
 * resource Resource 
 * returns Resource
 **/
exports.updateResource = function(id,resource) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mail" : "mail",
  "name" : "name",
  "id" : 0,
  "type" : { }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

