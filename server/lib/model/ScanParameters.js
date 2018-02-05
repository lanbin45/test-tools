/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Group = require('../model/Group');
const Param = require('../model/Param');

// ============================================================

/**
 * Class ScanMode
 * 
 * This class is used to store all parameters in ExamPlan <ScanMode> group.
 * 
 * @param {Object} obj
 */
function ScanParameters(obj) {
    /* -- Properties --*/
    /** @type {String} */
    this.scanMode = 'Helical';
    /** @type {String} */
    this.mA = '50';
    /** @type {String} */
    this.noOfScan = '1';
    /** @type {String} */
    this.startMode = 'P';
    /** @type {String} */
    this.startTime = '0';
    /** @type {String} */
    this.waitTime = '0';
    /** @type {String} */
    this.collimation = '5';
    /** @type {String} */
    this.pitch = '0.1';
    /** @type {String} */
    this.kV = '80';
    /** @type {String} */
    this.rotationTime = '0.5';
    /** @type {String} */
    this.totalScanTime = '4.0';
    /** @type {String} */
    this.range = '200';
    /** @type {String} */
    this.direction = 'IN';

    // dose
    /** @type {String} */
    this.ctdi = '15';
    /** @type {String} */
    this.notificationCTDI = '70';
    /** @type {String} */
    this.dlp = '400';
    /** @type {String} */
    this.notificationDLP = '800';

    /** @type {String} */
    this.cfov = 'L';
    /** @type {String} */
    this.ce = 'ON';
    /** @type {String} */
    this.sureExpPatientType = '';
    /** @type {String} */
    this.sureExpOrgan = '';
    /** @type {String} */
    this.sureExpName = '';
    /** @type {String} */
    this.ecgMode = 'OFF';
    /** @type {String} */
    this.noOfRotations = '***';
    /** @type {String} */
    this.zAxisEfficiency = '-';
    /** @type {String} */
    this.rtStackMode = '4-Stack';
    /** @type {String} */
    this.backsideExp = 'OFF';
    /** @type {String} */
    this.respiratory = 'OFF';
    /** @type {String} */
    this.protocolComment = '';
    /** @type {String} */
    this.prescanVoice = 'OFF';
    /** @type {String} */
    this.postscanVoice = 'OFF';
    /** @type {String} */
    this.focus = 'Small';
    /** @type {String} */
    this.comment1 = '';
    /** @type {String} */
    this.comment2 = '';
    /** @type {String} */
    this.injector = 'OFF';
    /** @type {String} */
    this.ecg = 'OFF';
    /** @type {String} */
    this.orbit = 'OFF';
    /** @type {String} */
    this.maxScanRange = '1895.0';
    /** @type {String} */
    this.handSw = 'OFF';
    /** @type {String} */
    this.instaView = 'ON';

    /* -- Constructor --*/
    if (obj) {
        for (let key in this) {
            if (this.hasOwnProperty(key) && obj[key] !== null && obj[key] !== undefined) {
                this[key] = obj[key];
            }
        }
    }
}

/**
 * Add dose parameters.
 *
 * @param {Object} doseParams
 * {
 *     "ctdi":15,
 *     "dlp":400,
 *     "notificationCTDI":70,
 *     "notificationDLP":800
 * }
 */
ScanParameters.prototype.addDoseParams = function(doseParams) {
    if (doseParams) {
        this.ctdi = doseParams.ctdi || '';
        this.dlp = doseParams.dlp || '';
        this.notificationCTDI = doseParams.notificationCTDI || '';
        this.notificationDLP = doseParams.notificationDLP || '';
    }
};

/**
 * Convert an instance to a Group object.
 *
 * @return {Group}
 */
ScanParameters.prototype.toGroup = function() {
    let group = new Group('Scan Parameters');
    group.displayName = 'Scan Parameters';
    group.paramArray = [];

    group.paramArray.push(new Param('ScanMode', this.scanMode, 'Scan mode'));
    group.paramArray.push(new Param('mA', this.mA, 'mA'));
    group.paramArray.push(new Param('NoOfScan', this.noOfScan, '# of scan'));
    group.paramArray.push(new Param('StartMode', this.startMode, 'Start'));
    group.paramArray.push(new Param('StartTime', this.startTime, 'Start time (s)'));
    group.paramArray.push(new Param('WaitTime', this.waitTime, 'Wait time (s)'));
    group.paramArray.push(new Param('Collimation', this.collimation, 'Collimation'));
    group.paramArray.push(new Param('Pitch', this.pitch, 'Pitch'));
    group.paramArray.push(new Param('kV', this.kV, 'kV'));
    group.paramArray.push(new Param('RotationTime', this.rotationTime, 'Rotation time (s)'));
    group.paramArray.push(new Param('TotalScanTime', this.totalScanTime, 'Total scan time (s)'));
    group.paramArray.push(new Param('Range', this.range, 'Range (mm)'));
    group.paramArray.push(new Param('Direction', this.direction, 'Direction'));
    group.paramArray.push(new Param('CFOV', this.cfov, 'CFOV'));
    group.paramArray.push(new Param('CE', this.ce, 'CE'));
    group.paramArray.push(new Param('CTDI', this.ctdi, 'CTDIvol (mGy)'));
    group.paramArray.push(new Param('NotificationCTDI', this.notificationCTDI, 'Notification CTDIvol (mGy)'));
    group.paramArray.push(new Param('DLP', this.dlp, 'DLP (mGy.cm)'));
    group.paramArray.push(new Param('NotificationDLP', this.notificationDLP, 'Notification DLP (mGy.cm)'));
    group.paramArray.push(new Param('SureExpPatientType', this.sureExpPatientType, 'Sure Exposure Patient Type'));
    group.paramArray.push(new Param('SureExpOrgan', this.sureExpOrgan, 'Sure Exposure Organ'));
    group.paramArray.push(new Param('SureExpName', this.sureExpName, 'Sure Exposure Name'));
    group.paramArray.push(new Param('ECG Mode', this.ecgMode, 'ECG Mode'));
    group.paramArray.push(new Param('# of Rotations', this.noOfRotations, '# of Rotations'));
    group.paramArray.push(new Param('Z Axis Efficiency', this.zAxisEfficiency, 'Z-Axis Efficiency'));
    group.paramArray.push(new Param('RT Stack Mode', this.rtStackMode, 'RT Stack Mode'));
    group.paramArray.push(new Param('Backside Exp.', this.backsideExp, 'Backside Exp.'));
    group.paramArray.push(new Param('Respiratory', this.respiratory, 'Respiratory'));
    group.paramArray.push(new Param('Protocol Comment', this.protocolComment, 'Protocol Comment'));
    group.paramArray.push(new Param('Prescan Voice', this.prescanVoice, 'Prescan Voice'));
    group.paramArray.push(new Param('Postscan Voice', this.postscanVoice, 'Postscan Voice'));
    group.paramArray.push(new Param('Focus', this.focus, 'Focus'));
    group.paramArray.push(new Param('Comment 1', this.comment1, 'Comment 1'));
    group.paramArray.push(new Param('Comment 2', this.comment2, 'Comment 2'));
    group.paramArray.push(new Param('Injector', this.injector, 'Injector'));
    group.paramArray.push(new Param('ECG', this.ecg, 'ECG'));
    group.paramArray.push(new Param('Orbit', this.orbit, 'Orbit'));
    group.paramArray.push(new Param('Max Scan Range', this.maxScanRange, 'Max. Range'));
    group.paramArray.push(new Param('Hand SW', this.handSw, 'Hand SW'));
    group.paramArray.push(new Param('InstaView', this.instaView, 'Insta View'));

    return group;
};

/**
 * Convert an instance to an object with scan parameters displayed on UI.
 *
 * @return {Object}
 */
ScanParameters.prototype.toScanDetails = function() {
    let paramsToDisplay = {
        scanMode: this.scanMode,
        kV: this.kV,
        mA: this.mA,
        range: this.range,
        collimation: this.collimation,
        pitch: this.pitch,
        rotationTime: this.rotationTime,
        ce: this.ce,
        direction: this.direction
    };
    return paramsToDisplay;
};

/**
 * Convert an instance to an object with dose info displayed on UI.
 *
 * @return {Object}
 */
ScanParameters.prototype.toDose = function() {
    let paramsToDisplay = {
        ctdi: this.ctdi,
        dlp: this.dlp,
        notificationCTDI: this.notificationCTDI,
        notificationDLP: this.notificationDLP
    };
    return paramsToDisplay;
};

/**
 * Convert an instance to json string to display on UI.
 *
 * @return {String}
 */
// ScanParameters.prototype.toString = function() {
//     return JSON.stringify(this.toObject());
// };

// ============================================================

module.exports = ScanParameters;
