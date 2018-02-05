/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file defines a class to send http or https request.
 */

'use strict';

const path = require('path');
const Async = require('async');
const FS = require('fs-extra');
const request = require('request');
const Setting = require('../Setting');
const Constants = require('../commons/Constants');
const PGUtil = require('../utils/PGUtil');
const log = require('../utils/PGLog').getLogger('IHttpClient');
const certFile = path.resolve(__dirname, '../cert/vitality-cert.pem');
const keyFile = path.resolve(__dirname, '../cert/vitality-key.pem');
const certStream = FS.readFileSync(certFile);
const keyStream = FS.readFileSync(keyFile);
const tempFolder = path.join(process.cwd(), Setting.CTConfig.tempFolderPath);
const protocolType = Setting.PGConfig.SSL ? 'https' : 'http';

// ============================================================
/**
 * This class is used to send http/https requsts to PG.
 */
class IHtttpClient {
    constructor() {
        this.baseUrl =
        `${protocolType}://${Setting.PGConfig.host}:${Setting.PGConfig.port}/${Setting.PGConfig.appName}/`;
    }

    sendPostRequest(apiUrl, requestOptions, callback) {
        if (!apiUrl || !requestOptions) {
            let msg = 'Fail to send POST request: form data should not be empty.';
            log.error(msg);
            callback(msg);
            return;
        }
        let formData = getFormDataByAPIName(apiUrl, requestOptions);
        if (!formData) {
            let msg = 'Fail to get form data.';
            log.error(msg);
            callback(msg);
            return;
        }

        let requestOpts = {};
        requestOpts['url'] = encodeURI(this.baseUrl + apiUrl);
        requestOpts['formData'] = formData;
        if (Setting.PGConfig.SSL) {
            requestOpts['cert'] = certStream;
            requestOpts['key'] = keyStream;
        }

        request.post(requestOpts, (err, response, body) => {
            if (!!err) {
                let msg = 'Fail to send a POST request: ' + requestOpts.url;
                log.error(msg);
                callback(msg);
                return;
            }
            let result = {
                statusCode: response.statusCode,
                headers: response.headers,
                body: body
            };
            callback(null, result);
        });
    };

    sendHeadRequest(apiUrl, requestOptions, callback) {
        if (!apiUrl || !requestOptions || !requestOptions.MachineName) {
            let msg = 'Fail to send HEAD rquest: query parameters should not be empty.';
            log.error(msg);
            callback(msg);
            return;
        }

        let pgUrl = this.baseUrl + apiUrl + `?MachineName=${requestOptions.MachineName}`;
        let encodedUrl = encodeURI(pgUrl);
        let requestOpts = {};
        requestOpts['url'] = encodedUrl;
        if (Setting.PGConfig.SSL) {
            requestOpts['cert'] = certStream;
            requestOpts['key'] = keyStream;
        }

        request.head(requestOpts, (err, response) => {
            if (!!err) {
                let msg = 'Fail to send HEAD request: ' + requestOpts.url;
                log.error(msg);
                callback(msg);
                return;
            }
            let result = {
                statusCode: response.statusCode,
                headers: response.headers
            };
            callback(null, result);
        });
    };

    sendGetRequest(apiUrl, requestOptions, callback) {
        if (!apiUrl || !requestOptions || !requestOptions.MachineName) {
            let msg = 'Fail to send GET request: query parameters should not be empty';
            log.error(msg);
            callback(msg);
            return;
        }

        let pgUrl = this.baseUrl + apiUrl + `?MachineName=${requestOptions.MachineName}&ApprovalStatus=Success`;
        let encodedUrl = encodeURI(pgUrl);
        let requestOpts = {};
        requestOpts['url'] = encodedUrl;
        if (Setting.PGConfig.SSL) {
            requestOpts['cert'] = certStream;
            requestOpts['key'] = keyStream;
        }

        let resultArray = [];
        let continuous = true;
        let index = 1;
        Async.whilst(
            function() {
                return continuous;
            },
            function(innerCB) {
                let zipPath = path.join(tempFolder, 'ZippedFile' + index + '.zip');
                request.get(requestOpts, (err, response, body) => {
                    if (!!err) {
                        let msg = 'Fail to send GET request: ' + requestOpts.url;
                        log.error(msg);
                        innerCB(err);
                        return;
                    }
                    let result = {
                        statusCode: response.statusCode,
                        headers: response.headers,
                        body: body,
                        zipPath: zipPath
                    };
                    resultArray.push(result);
                    // todo
                    let returnedContinous = response.headers.continuous;
                    continuous = !!returnedContinous && returnedContinous === 'True' ? true : false;
                    ++index;
                    innerCB(null);
                }).pipe(FS.createWriteStream(zipPath));
            },
            function(err) {
                callback(err, resultArray);
            }
        );
    };
};

/**
 * Get form data for different PG API.
 * @param {String} apiName 
 * @param {Object} requestOptions
 * @return {Object} form data
 */
function getFormDataByAPIName(apiName, requestOptions) {
    try {
        if (!apiName || !requestOptions) {
            log.error('API name or form data should not be empty.');
            return;
        }
        let formData = {};
        if (Constants.API_APPROVELOCALPROTOCOL === apiName) {
            formData['DataType'] = requestOptions['DataType'] || Constants.PROTOCOL_DATATYPE_EXAMPLAN;
            formData['ActionType'] = requestOptions['ActionType'] || Constants.REQUEST_ACTION_TYPE_APPROVAL;
            formData['MachineName'] = requestOptions['MachineName'];
            // todo file exists or access previlige?

            if (!PGUtil.isString(requestOptions.ZippedFile) || !FS.existsSync(requestOptions.ZippedFile)) {
                log.error('An zip file should be attached as request body.');
                return;
            }
            formData['ZippedFile'] = FS.createReadStream(requestOptions.ZippedFile);
        } else if (Constants.API_SETPROTOCOLPOOL === apiName) {
            formData['ProtocolPoolSettingName'] = requestOptions['ProtocolPoolSettingName'];
            formData['SoftwareVersion'] = requestOptions['SoftwareVersion'];
            formData['XRayMode'] = requestOptions['XRayMode'];
            formData['SystemName'] = requestOptions['SystemName'];
            formData['ModelName'] = requestOptions['ModelName'];
            formData['Modality'] = requestOptions['Modality'];
            formData['Vendor'] = requestOptions['Vendor'];
            formData['MachineName'] = requestOptions['MachineName'];
            formData['EPType'] = requestOptions['EPType'];
        } else if (Constants.API_CLEARLOCALQUEUE === apiName) {
            formData['ApplyingStatus'] = 'B100';
            formData['MachineName'] = requestOptions['MachineName'];
        } else if (Constants.API_CLEARTRANSFERQUEUE === apiName) {
            formData['ApplyingStatus'] = 'B100';
            formData['MachineName'] = requestOptions['MachineName'];
        } else {
            log.error(`API ${apiName} is not support.`);
            return;
        }
        return formData;
    } catch (error) {
        log.error('Caught an exception.');
        log.trace(error);
    }
}

module.exports = IHtttpClient;
