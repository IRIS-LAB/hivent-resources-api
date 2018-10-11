'use strict';

var utils = require('../utils/writer.js');
var Resources = require('../service/ResourcesService');

module.exports.createResource = function createResource (req, res, next) {
  var resource = req.swagger.params['resource'].value;
  Resources.createResource(resource)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createResourceInvitationAsync = function createResourceInvitationAsync (req, res, next) {
  var id = req.swagger.params['id'].value;
  var calendarEventId = req.swagger.params['calendarEventId'].value;
  Resources.createResourceInvitationAsync(id,calendarEventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteResource = function deleteResource (req, res, next) {
  var id = req.swagger.params['id'].value;
  Resources.deleteResource(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteResourceInvitationAsync = function deleteResourceInvitationAsync (req, res, next) {
  var id = req.swagger.params['id'].value;
  var calendarEventId = req.swagger.params['calendarEventId'].value;
  Resources.deleteResourceInvitationAsync(id,calendarEventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findResources = function findResources (req, res, next) {
  var type = req.swagger.params['type'].value;
  var available = req.swagger.params['available'].value;
  var beginDate = req.swagger.params['beginDate'].value;
  var endDate = req.swagger.params['endDate'].value;
  Resources.findResources(type,available,beginDate,endDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.isResourceAvailable = function isResourceAvailable (req, res, next) {
  var id = req.swagger.params['id'].value;
  var beginDate = req.swagger.params['beginDate'].value;
  var endDate = req.swagger.params['endDate'].value;
  Resources.isResourceAvailable(id,beginDate,endDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.readResource = function readResource (req, res, next) {
  var id = req.swagger.params['id'].value;
  Resources.readResource(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateResource = function updateResource (req, res, next) {
  var id = req.swagger.params['id'].value;
  var resource = req.swagger.params['resource'].value;
  Resources.updateResource(id,resource)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
