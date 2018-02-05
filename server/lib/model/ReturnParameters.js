/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Group = require('../model/Group');
const Param = require('../model/Param');

// ============================================================

/**
 * Class ReturnParameters
 * 
 * This class is used to store returned parameters of sychronize/transfer API.
 * 
 * @param {Object} obj
 */
function ReturnParameters(obj) {
    /* -- Properties --*/
    /** @type {String} */
    this.tempUID = null;
    /** @type {String} */
    this.version = null;
    /** @type {String} */
    this.uid = null;
    /** @type {String} */
    this.epName = null;
    /** @type {String} */
    this.patientType = null;
    /** @type {String} */
    this.organ = null;
    /** @type {String} */
    this.epNo = null;
    /** @type {String} */
    this.epType = null;
    /** @type {String} */
    this.patientPosition = null;

    /** @type {String} */
    this.ce = null;
    /** @type {String} */
    this.collimation = null;
    /** @type {String} */
    this.direction = null;
    /** @type {String} */
    this.kV = null;
    /** @type {String} */
    this.mA = null;
    /** @type {String} */
    this.pitch = null;
    /** @type {String} */
    this.range = null;
    /** @type {String} */
    this.rotationTime = null;
    /** @type {String} */
    this.scanMode = null;

     /** @type {String} */
     this.centerxy = null;
    /** @type {String} */
    this.dFOV = null;
    /** @type {String} */
    this.startPosition = null;
    /** @type {String} */
    this.endPosition = null;

    /** @type {String} */
    this.noOfImages= null;
    /** @type {String} */
    this.sliceInterval = null;
    /** @type {String} */
    this.sliceThickness = null;
    /** @type {String} */
    this.totalImages = null;
    /** @type {String} */
    this.urgentRecon = null;
    /** @type {String} */
    this.variArea = null;
    /** @type {String} */
    this.ww1 = null;
    /** @type {String} */
    this.ww2 = null;
    /** @type {String} */
    this.ww3 = null;
    /** @type {String} */
    this.wl1 = null;
    /** @type {String} */
    this.wl2 = null;
    /** @type {String} */
    this.wl3 = null;

    /** @type {String} */
    this.ctdi = null;
    /** @type {String} */
    this.notificationCTDI = null;
    /** @type {String} */
    this.dlp = null;
    /** @type {String} */
    this.notificationDLP = null;

    /* -- Constructor --*/
    if (obj) {
        for (let key in this) {
            if (this.hasOwnProperty(key) && obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== undefined) {
                this[key] = obj[key];
            }
        }
    }
}

/**
 * Convert an instance to json string to display on UI.
 *
 * @return {String}
 */
ReturnParameters.prototype.toObj = function() {
    let paramObj = {
        tempUID: this.tempUID,
        version: this.version,
        uid: this.uid,
        epName: this.epName,
        patientType: this.patientType,
        organ: this.organ,
        epNo: this.epNo,
        epType: this.epType,
        patientPosition: this.patientPosition,
        ce: this.ce,
        collimation: this.collimation,
        direction: this.direction,
        kV: this.kV,
        mA: this.mA,
        pitch: this.pitch,
        range: this.range,
        rotationTime: this.rotationTime,
        scanMode: this.scanMode,
        centerxy: this.centerxy,
        dFOV: this.dFOV,
        startPosition: this.startPosition,
        endPosition: this.endPosition,
        noOfImages: this.noOfImages,
        sliceInterval: this.sliceInterval,
        sliceThickness: this.sliceThickness,
        totalImages: this.totalImages,
        urgentRecon: this.urgentRecon,
        variArea: this.variArea,
        ww1: this.ww1,
        ww2: this.ww2,
        ww3: this.ww3,
        wl1: this.wl1,
        wl2: this.wl2,
        wl3: this.wl3,
        ctdi: this.ctdi,
        notificationCTDI: this.notificationCTDI,
        dlp: this.dlp,
        notificationDLP: this.notificationDLP
    };
    return paramObj;
};

// ============================================================

module.exports = ReturnParameters;
