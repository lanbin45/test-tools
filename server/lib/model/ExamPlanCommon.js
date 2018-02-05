/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Group = require('../model/Group');
const Param = require('../model/Param');

// ============================================================

/**
 * Class ExamPlanCommon
 * 
 * This class is used to store all data in ExamPlan <Common> group.
 * 
 * @param {Object} obj
 */
function ExamPlanCommon(obj) {
    /* -- Properties --*/
    /** @type {String} */
    this.epType = 'User'; // default
    /** @type {String} */
    this.epName = '';
    /** @type {String} */
    this.patientType = 'Adult';
    /** @type {String} */
    this.organ = 'Head';
    /** @type {String} */
    this.epNo = '';
    /** @type {String} */
    this.patientPosition = 'SU';
    /** @type {String} */
    this.masterEPName = '';
    /** @type {String} */
    this.patientInsertionDirection = ''; // TODO ???
    /** @type {String} */
    this.basePosition = ''; // TODO ???
    /** @type {String} */
    this.iconProtocol = '';

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
 * Convert an instance to a Group object.
 *
 * @return {Group}
 */
ExamPlanCommon.prototype.toGroup = function() {
    let group = new Group('Common');
    group.displayName = 'Common';
    group.paramArray = [];

    group.paramArray.push(new Param('EPType', this.epType || '', 'EP Type'));
    group.paramArray.push(new Param('EPName', this.epName || '', 'EP Name'));
    group.paramArray.push(new Param('PatientType', this.patientType || '', 'Patient Type'));
    group.paramArray.push(new Param('Organ', this.organ || '', 'Organ'));
    group.paramArray.push(new Param('EPNumber', this.epNo || '', 'EP No'));
    group.paramArray.push(new Param('MasterEPName', this.masterEPName || '', 'Master'));
    group.paramArray.push(new Param('PatientInsertionDirection', this.patientInsertionDirection || '', 'Patient Insertion Direction'));
    group.paramArray.push(new Param('PatientPosition', this.patientPosition || '', 'Patient Position'));
    group.paramArray.push(new Param('BasePosition', this.basePosition || '', 'Base Position'));
    group.paramArray.push(new Param('IconProtocol', this.iconProtocol || '', 'Icon Protocol'));

    return group;
};

/**
 * Convert an instance to an object to display on UI.
 *
 * @return {Object}
 */
ExamPlanCommon.prototype.toObject = function() {
    let paramToDisplay = {
        epName: this.epName,
        epType: this.epType,
        epNo: this.epNo,
        patientType: this.patientType,
        organ: this.organ,
        patientPosition: this.patientPosition
    };
    return paramToDisplay;
};

/**
 * Convert an instance to json string to display on UI.
 *
 * @return {String}
 */
ExamPlanCommon.prototype.toString = function() {
    return JSON.stringify(this.toObject());
};

// ============================================================

module.exports = ExamPlanCommon;
