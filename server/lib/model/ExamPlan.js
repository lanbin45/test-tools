/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const assert = require('assert');
const Constants = require('../commons/Constants');
const ExamPlanSummary = require('../model/ExamPlanSummary');
const ExamPlanChangelog = require('../model/ExamPlanChangelog');

// ============================================================

/**
 * Class ExamPlan
 * 
 * This class is used to store all data of an ExamPlan.
 */
class ExamPlan {
    constructor(summary, changelog) {
        /** @type {ExamPlanSummay} */
        if (summary) {
            this.summary = summary;
        }
        /** @type {ExamPlanChangelog} */
        if (changelog) {
            this.changelog = changelog;
        }
    }

    get summary() {
        return this._summary;
    }

    set summary(summary) {
        assert(summary instanceof ExamPlanSummary, 'Invalid ExamPlan summary.');
        this._summary = summary;
    }

    get changelog() {
        return this._changelog;
    }

    set changelog(changelog) {
        assert(changelog instanceof ExamPlanChangelog, 'Invalid ExamPlan changelog.');
        this._changelog = changelog;
    }

    /**
     * Get EP Number.
     *
     * @return {String}
     */
    get epNo() {
        let epNo = '';
        if (this.summary && this.summary.epNo) {
            epNo = this.summary.epNo;
        }
        return epNo;
    }

    get machineName() {
        let machineName = '';
        if (this.changelog && this.changelog.machineName) {
            machineName = this.changelog.machineName;
        }
        return machineName;
    }

    /**
     * Get summary file name.
     *
     * @return {String}
     */
    getSummaryFileName() {
        let epNo = this.epNo;
        return Constants.PATH_FILE_NAME_PREFIX_EXAMPLAN + epNo + Constants.PATH_FILE_NAME_SUFFIX_SUMMARY;
    }

    /**
     * Get changelog file name.
     *
     * @return {String}
     */
    getChangelogFileName() {
        let epNo = this.epNo;
        return Constants.PATH_FILE_NAME_PREFIX_EXAMPLAN + epNo + Constants.PATH_FILE_NAME_SUFFIX_CHANGE_LOG;
    }

    /**
     * Get changelog file name.
     *
     * @return {String}
     */
    getSourceFileName() {
        let epNo = this.epNo;
        return Constants.PATH_FILE_NAME_PREFIX_EXAMPLAN + epNo + Constants.PATH_FILE_NAME_SUFFIX_SOURCE;
    };

    /**
     * Get zip file name.
     *
     * @return {String}
     */
    getZipFileName() {
        let epNo = this.epNo;
        return Constants.PATH_FILE_NAME_PREFIX_EXAMPLAN + epNo + Constants.PATH_ZIP;
    }

    /**
     * Convert an instance to a Root object of ExamPlan summary.
     *
     * @return {Root}
     */
    toSummaryRoot() {
        if (!this.summary) {
            return;
        }
        return this.summary.toRoot();
    }

    /**
     * Convert an instance to a Root object of ExamPlan changelog.
     *
     * @return {Root}
     */
    toChangelogRoot() {
        if (!this.changelog) {
            return;
        }
        return this.changelog.toRoot();
    }

    // /**
    //  * Convert an instance to json string to display on UI.
    //  *
    //  * @return {String}
    //  */
    // toString() {
    //     // TODO NOT IMPLEMENTED
    //     return '';
    // }
}

// ============================================================
module.exports = ExamPlan;
