/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const assert = require('assert');
const Root = require('../model/Root');
const Group = require('../model/Group');
const Param = require('../model/Param');
const ExamPlanCommon = require('../model/ExamPlanCommon');
const ScanParameters = require('../model/ScanParameters');
const ReconParameters = require('../model/ReconParameters');

// ============================================================
/**
 * Class ExamPlanSummary
 * 
 * This class is used to store all parameters of an ExamPlan summary.
 */
class ExamPlanSummary {
    constructor(common, scanParameters, reconParameters) {
        /** @type {String} */
        // this.dataType = 'ExamPlan';
        /** @type {ExamPlanCommon} */
        if (common) {
            this.common = common;
        }
        /** @type {ScanParameters} */
        if (scanParameters) {
            this.scanParameters = scanParameters;
        }
        /** @type {ReconParameter} */
        if (reconParameters) {
            this.reconParameters = reconParameters;
        }
    }

    get common() {
        return this._common;
    }

    set common(common) {
        assert(common instanceof ExamPlanCommon, 'Invalid ExamPlan Common.');
        this._common = common;
    }

    get scanParameters() {
        return this._scanParameters;
    }

    set scanParameters(scanParameters) {
        assert(scanParameters instanceof ScanParameters, 'Invalid ExamPlan ScanParameters.');
        this._scanParameters = scanParameters;
    }

    get reconParameters() {
        return this._reconParameters;
    }

    set reconParameters(reconParameters) {
        assert(reconParameters instanceof ReconParameters, 'Invalid ExamPlan ReconParameters.');
        this._reconParameters = reconParameters;
    }

    /**
     * Get EP Number.
     *
     * @return {String}
     */
    get epNo() {
        let epNo = '';
        if (this.common && this.common.epNo) {
            epNo = this.common.epNo;
        }
        return epNo;
    }

    /**
     * Get EP name.
     *
     * @return {String}
     */
    get epName() {
        let epName = '';
        if (this.common && this.common.epName) {
            epName = this.common.epName;
        }
        return epName;
    }

    /**
     * Convert an instance to a Root object.
     *
     * @return {Root}
     */
    toRoot() {
        let root = new Root('ExamPlan');

        let commonGroup;
        if (!this.common) {
            commonGroup = new Group('Common');
            commonGroup.displayName = 'Common';
        } else {
            commonGroup = this.common.toGroup();
        }
        root.addGroup(commonGroup);

        let sureIQGroup = new Group('SureIQList');
        sureIQGroup.displayName = 'SureIQ';
        root.addGroup(sureIQGroup);

        let sureExpGroup = new Group('SureExposureList');
        sureExpGroup.displayName = 'SureExposure';
        root.addGroup(sureExpGroup);

        let contrastPresetGroup = new Group('ContrastPresetList');
        contrastPresetGroup.displayName = 'ContrastPresetList';
        root.addGroup(contrastPresetGroup);

        let scanListGroup = new Group('ScanList');
        scanListGroup.displayName = 'ScanList';

        let scanModeGroup = new Group('ScanMode');
        scanModeGroup.displayName = 'Scan mode';
        if (this.scanParameters) {
            scanModeGroup.value = this.scanParameters.scanMode || '';
        } else {
            scanModeGroup.value = '';
        }
        scanModeGroup.addParam(new Param('Row', '1', 'No.'));

        let scanParamGroup;
        if (!this.scanParameters) {
            scanParamGroup = new Group('Scan Parameters');
            scanParamGroup.displayName = 'Scan Parameters';
        } else {
            scanParamGroup = this.scanParameters.toGroup();
        }
        scanModeGroup.addGroup(scanParamGroup);

        let reconParamGroup;
        if (!this.reconParameters) {
            reconParamGroup = new Group('Recon Parameters');
            reconParamGroup.displayName = 'Recon Parameters';
        } else {
            reconParamGroup = this.reconParameters.toGroup();
        }
        scanModeGroup.addGroup(reconParamGroup);

        scanListGroup.addGroup(scanModeGroup);
        root.addGroup(scanListGroup);

        return root;
    }

    /**
     * Convert an instance to json string to display on UI.
     *
     * @return {String}
     */
    // toString() {
    //     // TODO NOT IMPLEMENTED
    //     return '';
    // }
}

// ============================================================
module.exports = ExamPlanSummary;
