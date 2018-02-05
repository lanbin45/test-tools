/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to implement logic of CreateProtocol request.
 */

'use strict';

const path = require('path');
const Async = require('async');
const Utility = require('../Utility');
const Constants = require('../commons/Constants');
const Message = require('../commons/Message');
const Response = require('../model/PGResponse');
const ExamPlanCommon = require('../model/ExamPlanCommon');
const ScanParameters = require('../model/ScanParameters');
const ReconParameters = require('../model/ReconParameters');
const ExamPlan = require('../model/ExamPlan');
const ExamPlanChangelog = require('../model/ExamPlanChangelog');
const ExamPlanSummary = require('../model/ExamPlanSummary');
const MachineInfo = require('../model/MachineInfo');
const IHttpClient = require('../utils/IHttpClient');
const PGXml = require('../utils/PGXml');
const PGUtil = require('../utils/PGUtil');
const PGFile = require('../utils/PGFile');
const PGZip = require('../utils/PGZip');
const log = require('../utils/PGLog').getLogger('CreateProtocolService');

// ============================================================

const service = function(requestParams, callback) {
    const uploadDir = PGUtil.getUploadFolder();
    let machineName = '';
    Async.waterfall([
        // Parse request body and create ExamPlan object
        (innerCB) => {
            let ep = createExamPlan(requestParams);
            if (!ep) {
                innerCB(Response.MSG_INTERNAL_SERVER_ERROR);
            } else {
                machineName = ep.machineName;
                innerCB(null, ep);
            }
        },
        // Create all protocol files in temp dir
        (ep, innerCB) => {
            try {
                const summaryRoot = ep.toSummaryRoot();
                const changelogRoot = ep.toChangelogRoot();

                let tempZipDir = new PGFile(path.join(uploadDir, 'zip'));
                tempZipDir.ensureDirSync();
                let sumamryFilePath = path.join(tempZipDir.getAbsolutePath(), ep.getSummaryFileName());
                PGXml.saveAsXmlFile(summaryRoot, sumamryFilePath);
                let changelogFilePath = path.join(tempZipDir.getAbsolutePath(), ep.getChangelogFileName());
                PGXml.saveAsXmlFile(changelogRoot, changelogFilePath);
                let sourceFilePath = path.join(tempZipDir.getAbsolutePath(), ep.getSourceFileName());
                PGXml.saveAsXmlFile(summaryRoot, sourceFilePath);

                let zipParam = {
                    targetPath: path.join(uploadDir, ep.getZipFileName()),
                    srcPath: tempZipDir.getAbsolutePath()
                };
                innerCB(null, zipParam);
            } catch (error) {
                log.error('Caught an exception. Failed to create ExamPlan.');
                log.trace(error);
                innerCB(Response.MSG_INTERNAL_SERVER_ERROR);
            }
        },
        // Create request body for Protocol Gateway
        (zipParam, innerCB) => {
            PGZip.zipDirectory(zipParam, (err, zipFilePath) => {
                if (err) {
                    innerCB(Response.MSG_INTERNAL_SERVER_ERROR);
                } else {
                    innerCB(null, zipFilePath);
                }
            });
        },
        // Send protocol and get response
        (zipFilePath, innerCB) => {
            sendApprovalLocalProtocolRequest(machineName, zipFilePath, innerCB);
        }
    ], (pgRes) => {
        // Delete temp upload directory
        PGUtil.deleteLocalFile(uploadDir, function(err) {
            if (!!err) {
                log.warn(Message.LOG_ERROR_MSG_FAIL_DELETE_TEMP_FILE, uploadDir);
                log.trace(err);
            }
            callback(pgRes);
        });
    });
};

/**
 * Create an ExamPlan object from request parameters.
 * 
 * @param {Object} params
 * @param {String} uid 
 * @param {String} version 
 * @param {String} tempUid 
 * @return {ExamPlan} an ExamPlan object; return undefined if error occurs
 */
const createExamPlan = (params) => {
    try {
        if (!params || Object.keys(params).length === 0) {
            log.error('Failed to create ExamPlan. Empty input parameters.');
            return;
        }

        let common = new ExamPlanCommon(params['protocol']);
        let scanParameters = new ScanParameters(params['scanDetails']);
        scanParameters.addDoseParams(params['dose']);
        let reconParameters = new ReconParameters(params['reconDetails']);
        let epSummary = new ExamPlanSummary(common, scanParameters, reconParameters);

        let machineInfo;
        if (!Utility.scannerList || !params.machineName || !Utility.scannerList[params.machineName]) {
            log.warn('Request scanner name is empty or does not exist.');
            machineInfo = new MachineInfo();
        } else {
            machineInfo = Utility.scannerList[params.machineName];
        }
        let changelog = new ExamPlanChangelog(common.epName, machineInfo, params.uid, params.version, params.tempUID);
        let ep = new ExamPlan(epSummary, changelog);
        return ep;
    } catch (error) {
        log.error('Caught an exception. Failed to create ExamPlan.');
        log.trace(error);
    }
};

/**
 * Send ApprovalLocalProtocol request to Protocol Gateway
 * 
 * @param {String} machineName scanner name of the protocol to send
 * @param {String} zipFilePath path of zip file to send
 * @param {Function} callback 
 */
const sendApprovalLocalProtocolRequest = (machineName, zipFilePath, callback) => {
    try {
        if (!PGUtil.isString(machineName) || !machineName) {
            log.error('Invalid Scanner Name: ', machineName);
            callback(Response.MSG_BAD_REQUEST_PARAMS);
            return;
        }

        if (!PGUtil.isString(zipFilePath) || !zipFilePath) {
            log.error('Invalid zip file path: ', zipFilePath);
            callback(Response.MSG_INTERNAL_SERVER_ERROR);
            return;
        }

        let zipFile = new PGFile(zipFilePath);
        if (!zipFile.exists()) {
            log.error('An zip file should be attached as request body.');
            callback(Response.MSG_INTERNAL_SERVER_ERROR);
            return;
        }
    } catch (error) {
        log.error('Caught an exception.');
        log.trace(error);
        callback(Response.MSG_INTERNAL_SERVER_ERROR);
        return;
    }

    const client = new IHttpClient();
    let requestParams = {};
    requestParams['DataType'] = Constants.PROTOCOL_DATATYPE_EXAMPLAN;
    requestParams['ActionType'] = Constants.REQUEST_ACTION_TYPE_APPROVAL;
    requestParams['MachineName'] = machineName;
    requestParams['ZippedFile'] = zipFilePath;
    client.sendPostRequest(Constants.API_APPROVELOCALPROTOCOL, requestParams, (err, result) => {
        if (err) {
            log.error(err.stack || err);
            callback(Response.MSG_INTERNAL_SERVER_ERROR);
        } else {
            let res;
            if (result.statusCode !== Message.RESPONSE_CODE_SUCCESS) {
                res = Response.withMessage(Message.RESPONSE_MSG_FAILED_TO_CREATE_PROTOCOL, result.statusCode);
                log.error(JSON.stringify(result));
            }
            callback(res);
        }
    });
};

exports.service = service;
exports.createExamPlan = createExamPlan;
exports.sendApprovalLocalProtocolRequest = sendApprovalLocalProtocolRequest;
