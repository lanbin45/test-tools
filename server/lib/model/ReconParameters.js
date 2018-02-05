/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Group = require('../model/Group');
const Param = require('../model/Param');

// ============================================================

/**
 * Class ReconParameters
 * 
 * This class is used to store all parameters in ExamPlan <ReconParameters> group.
 * 
 * @param {Object} obj
 */
function ReconParameters(obj) {
    /* -- Properties --*/
    /** @type {String} */
    this.name = 'Axial1';
    /** @type {String} */
    this.sliceThickness = '3';
    /** @type {String} */
    this.sliceInterval = '3';
    /** @type {String} */
    this.urgentRecon = 'ON';
    /** @type {String} */
    this.variArea = 'YES';
    /** @type {String} */
    this.dFOV = '200';
    /** @type {String} */
    this.centerxy = '256,256';
    /** @type {String} */
    this.startPosition = '0.0';
    /** @type {String} */
    this.endPosition = '200.0';
    /** @type {String} */
    this.seriesDescription = '';
    /** @type {String} */
    this.noOfImages = '100';
    /** @type {String} */
    this.sureIQPatientType = '';
    /** @type {String} */
    this.sureIQOrgan = '';
    /** @type {String} */
    this.sureIQName = '';
    /** @type {String} */
    this.filming = 'OFF';
    /** @type {String} */
    this.fc = '13';
    /** @type {String} */
    this.viewing = 'VFF';
    /** @type {String} */
    this.osr = 'OFF';
    /** @type {String} */
    this.reconProcess = 'OFF';
    /** @type {String} */
    this.boost3D = 'OFF';
    /** @type {String} */
    this.interp = 'V-TCOT';
    /** @type {String} */
    this.semar = 'OFF';
    /** @type {String} */
    this.filter = 'OFF';
    /** @type {String} */
    this.ww1 = '3500';
    /** @type {String} */
    this.ww2 = '400';
    /** @type {String} */
    this.ww3 = '-600';
    /** @type {String} */
    this.wl1 = '1600';
    /** @type {String} */
    this.wl2 = '350';
    /** @type {String} */
    this.wl3 = '40';
    /** @type {String} */
    this.reconType = '-';
    /** @type {String} */
    this.movingCorrection = '***';
    /** @type {String} */
    this.reconTimeInterval = '';
    /** @type {String} */
    this.autoView = 'OFF';
    /** @type {String} */
    this.totalImages = '100';

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
 * Convert an instance to a Group object.
 *
 * @return {Group}
 */
ReconParameters.prototype.toGroup = function() {
    let reconGroup = new Group('Recon Parameters');
    reconGroup.displayName = 'Recon Parameters';

    let group = new Group('Axial1');
    group.displayName = 'Axial1';
    group.paramArray = [];

    group.paramArray.push(new Param('SliceThickness', this.sliceThickness, 'Slice Thickness'));
    group.paramArray.push(new Param('SliceInterval', this.sliceInterval, 'Slice interval'));
    group.paramArray.push(new Param('UrgentRecon', this.urgentRecon, 'Urgent Recon'));
    group.paramArray.push(new Param('Vari-Area', this.variArea, 'Vari-Area'));
    group.paramArray.push(new Param('D-FOV', this.dFOV, 'D-FOV'));
    group.paramArray.push(new Param('CenterXY', this.centerxy, 'Center X , Y'));
    group.paramArray.push(new Param('StartPosition', this.startPosition, 'Start Position (mm)'));
    group.paramArray.push(new Param('EndPosition', this.endPosition, 'End Position (mm)'));
    group.paramArray.push(new Param('SeriesDescription', this.seriesDescription, 'Series Description'));
    group.paramArray.push(new Param('NoOfImages', this.noOfImages, '# Of Images'));
    group.paramArray.push(new Param('SureIQPatientType', this.sureIQPatientType, 'Sure IQ Patient Type'));
    group.paramArray.push(new Param('SureIQOrgan', this.sureIQOrgan, 'Sure IQ Organ'));
    group.paramArray.push(new Param('SureIQName', this.sureIQName, 'Sure IQ Name'));
    group.paramArray.push(new Param('Filming', this.filming, 'Filming'));
    group.paramArray.push(new Param('FC', this.fc, 'FC'));
    group.paramArray.push(new Param('Viewing', this.viewing, 'Viewing'));
    group.paramArray.push(new Param('OSR', this.osr, 'OSR'));
    group.paramArray.push(new Param('ReconProcess', this.reconProcess, 'Recon Process'));
    group.paramArray.push(new Param('Boost3D', this.boost3D, 'Boost3D'));
    group.paramArray.push(new Param('Interp', this.interp, 'Interp'));
    group.paramArray.push(new Param('SEMAR', this.semar, 'SEMAR'));
    group.paramArray.push(new Param('Filter', this.filter, 'Filter'));
    group.paramArray.push(new Param('WW1', this.ww1, 'WW1'));
    group.paramArray.push(new Param('WW2', this.ww2, 'WW2'));
    group.paramArray.push(new Param('WW3', this.ww3, 'WW3'));
    group.paramArray.push(new Param('WL1', this.wl1, 'WL1'));
    group.paramArray.push(new Param('WL2', this.wl2, 'WL2'));
    group.paramArray.push(new Param('WL3', this.wl3, 'WL3'));
    group.paramArray.push(new Param('Recon Type', this.reconType, 'Recon Type'));
    group.paramArray.push(new Param('Moving Correction', this.movingCorrection, 'Moving Correction'));
    group.paramArray.push(new Param('Recon Time Interval', this.reconTimeInterval, 'Time Interval (mm)'));
    group.paramArray.push(new Param('AutoView', this.autoView, 'Auto-View'));
    group.paramArray.push(new Param('TotalImages', this.totalImages, 'TotalImages'));

    reconGroup.addGroup(group);
    return reconGroup;
};

/**
 * Convert an instance to an object with parameters displayed on UI.
 *
 * @return {Object}
 */
ReconParameters.prototype.toObject = function() {
    let paramsToDisplay = {
        sliceThickness: this.sliceThickness,
        sliceInterval: this.sliceInterval,
        urgentRecon: this.urgentRecon,
        variArea: this.variArea,
        dFOV: this.dFOV,
        centerxy: this.centerxy,
        startPosition: this.startPosition,
        endPosition: this.endPosition,
        noOfImages: this.noOfImages,
        totalImages: this.totalImages,
        ww1: this.ww1,
        wl1: this.wl1,
        ww2: this.ww2,
        wl2: this.wl2,
        ww3: this.ww3,
        wl3: this.wl3
    };
    return paramsToDisplay;
};

/**
 * Convert an instance to json string to display on UI.
 *
 * @return {String}
 */
ReconParameters.prototype.toString = function() {
    return JSON.stringify(this.toObject());
};

// ============================================================

module.exports = ReconParameters;
