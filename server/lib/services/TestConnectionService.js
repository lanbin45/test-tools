/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to implement logic of TestConnection request.
 */

'use strict';

const path = require('path');
const util = require('util');
const Async = require('async');
const Setting = require('../Setting');
const Utility = require('../Utility');
const Constants = require('../commons/Constants');
const Message = require('../commons/Message');
const MachineInfo = require('../model/MachineInfo');
const Response = require('../model/PGResponse');
const IHttpClient = require('../utils/IHttpClient');
const PGUtil = require('../utils/PGUtil');
const log = require('../utils/PGLog').getLogger('TestConnectionService');


// ============================================================

const service = function(requestParams, callback) {
    generateMachineInfo();
    callback(null);
};

// TODO TEMP CODE FOR TESTING
const generateMachineInfo = () => {
    const machineInfoArray = [{
        machineName: 'Aquilion_MN1',
        modelName: 'TSX-301C'
    }, {
        machineName: 'Aquilion_MN2',
        modelName: 'TSX-301C'
    }, {
        machineName: 'AquilionPrime_MN1',
        modelName: 'TSX-303A'
    }, {
        machineName: 'AquilionPrime_MN2',
        modelName: 'TSX-303A'
    }];

    machineInfoArray.forEach((machine) => {
        Utility.scannerList[machine.machineName] = new MachineInfo(machine.machineName, machine.modelName);
    });
};

exports.service = service;
