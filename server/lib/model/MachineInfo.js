/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Group = require('../model/Group');
const Param = require('../model/Param');
const PGUtil = require('../utils/PGUtil');

const DEFAULT_SCANNER_NAME = 'Aquilion_MN1';
// ============================================================

/**
 * Class MachineInfo
 * This class store information of a scanner.
 * 
 * @param {String} machineName 
 * @param {String} modelName 
 */
class MachineInfo {
    constructor(machineName, modelName) {
        this.machineName = machineName;
        this.softwareVersion = 'V7.8SP0000E';
        this.scannerType = '1';
        if (modelName === 'TSX-301C') {
            this.modelName = modelName;
            this.systemName = 'Aquilion ONE';
            this.xrayMode = 'CXB-750F/90kW(T)';
        } else if (modelName === 'TSX-303A') {
            this.modelName = modelName;
            this.systemName = 'Aquilion PRIME';
            this.xrayMode = 'CXB-750H/60kW(S42kW)(T)';
        } else {
            this.modelName = (PGUtil.isString(modelName) && !!modelName) ? modelName : 'TSX-301C';
            this.systemName = 'Aquilion ONE';
            this.xrayMode = 'CXB-750F/90kW(T)';
        }
    }

    get machineName() {
        return this._machineName;
    }

    set machineName(machineName) {
        this._machineName = validMachineName(machineName);
    }

    /**
     * Convert scanner information to <ScannerInfo> group in changelog.
     * 
     * @return {Group}
     * @memberof MachineInfo
     */
    toGroup() {
        let group = new Group('ScannerInfo');
        group.addParam(new Param('ScannerSystemName', this.systemName));
        group.addParam(new Param('ScannerModelName', this.modelName));
        group.addParam(new Param('ScannerXRayMode', this.xrayMode));
        group.addParam(new Param('ScannerSoftwareVersion', this.softwareVersion));
        group.addParam(new Param('ScannerEPType', this.scannerType));

        return group;
    }

    getTempUID() {
        return validMachineName(this.machineName) + '_' + new Date().toISOString();
    }
}

/**
 * If given name is a valid machine name, return it; otherwise return default machine name.
 * 
 * @param {String} machineName 
 * @return {String}
 */
function validMachineName(machineName) {
    if (PGUtil.isString(machineName) && !!machineName) {
        return machineName;
    } else {
        return DEFAULT_SCANNER_NAME;
    }
}

// ============================================================
module.exports = MachineInfo;
