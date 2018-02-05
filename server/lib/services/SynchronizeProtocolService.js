/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to implement logic of SynchronizeProtocol request.
 */

'use strict';

const Async = require('async');
const IHttpClient = require('../utils/IHttpClient');
const Constants = require('../commons/Constants');
const IUtils = require('../utils/IUtils');
const IService = require('../services/IService');
const Setting = require('../Setting');
const Path = require('path');

const log = require('../utils/PGLog').getLogger('SynchronizeService');

// ============================================================

const service = function(requestParams, callback) {
    let httpClient = new IHttpClient();
    Async.waterfall([
        function(innerCB) {
            let param = {
                MachineName: requestParams.MachineName
            };
            httpClient.sendHeadRequest(Constants.API_QUERYPROTOCOLSTATUS, param, (errMsg, result) => {
                if (!!errMsg) {
                    log.error('Fail to send QueryProtocolStatus request to PG.');
                    innerCB(errMsg);
                    return;
                }
                innerCB(null, result);
            });
        },
        function(result, innerCB) {
            if (!result || result.statusCode != 200) {
                innerCB('Fail to send QueryProtocolStatus request to PG.');
                return;
            }
            let resHeaders = result.headers;
            if (!resHeaders || !resHeaders['distribution-status']) {
                innerCB('Fail to send QueryProtocolStatus request to PG.');
                return;
            }
            let notifiedCode = resHeaders['distribution-status'];
            let protocolExists = IUtils.hasProtocols(notifiedCode, 1);
            if (!protocolExists) {
                let msg = Constants.MSG_THERE_IS_NO_MATCHED_PROTOCOLS;
                log.info(msg);
                innerCB(msg);
                return;
            }
            innerCB(null);
        },
        function(innerCB) {
            let param = {
                MachineName: requestParams.MachineName
            };
            httpClient.sendGetRequest(Constants.API_GETLOCALPROTOCOL, param, (err, resultArray) => {
                if (!!err || !resultArray || resultArray.length <= 0) {
                    let msg = 'Fail to send GetLocalProtocol request to PG.';
                    log.error(msg);
                    innerCB(msg);
                    return;
                }

                let filteredArray = [];
                for (let i = 0; i < resultArray.length; ++i) {
                    let contentType =resultArray[i].headers['content-type'];
                    if (resultArray[i].statusCode != 200) {
                        let msg = 'One GetLocalProtocol failed.';
                        log.error(msg);
                        innerCB(msg);
                        return;
                    } else if (contentType === Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE_ZIP) {
                        filteredArray.push(resultArray[i]);
                    }
                }
                if (filteredArray.length <= 0) {
                    let msg = Constants.MSG_THERE_IS_NO_MATCHED_PROTOCOLS;
                    log.info(msg);
                    innerCB(msg);
                    return;
                }
                innerCB(null, filteredArray);
            });
        },
        function(zipArray, innerCB) {
            let param = {
                MachineName: requestParams.MachineName
            };
            httpClient.sendPostRequest(Constants.API_CLEARLOCALQUEUE, param, (err, result) => {
                if (!!err || !result || result.statusCode != 200) {
                    let msg = 'Fail to send ClearLocalQueue request to PG.';
                    log.error(msg);
                    innerCB(msg);
                    return;
                }
                innerCB(null, zipArray);
            });
        },
        function(zipArray, innerCB) {
            IService.unzipZippedFile(zipArray, (errMsg, filesArray) => {
                if (!!errMsg) {
                    log.error('Fail to unzip files');
                    innerCB(errMsg);
                    return;
                }
                innerCB(null, filesArray);
            });
        },
        function(filesArray, innerCB) {
            IService.parseFiles(filesArray, (errMsg, result) => {
                if (!!errMsg) {
                    log.error('Fail to parse files.');
                    innerCB(errMsg);
                    return;
                }
                innerCB(null, result);
            });
        }
    ],
        function(errMsg, resultArray) {
            let tempFolderName = Path.join(process.cwd(), Setting.CTConfig.tempFolderPath);
            IUtils.cleanTempFolder(tempFolderName, (cerr) => {
                callback(errMsg, resultArray);
            });
        }
    );
};

exports.service = service;
