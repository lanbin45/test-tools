/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Assert = require('assert');
const Util = require('util');
const Constants = require('../commons/Constants');
const Message = require('../commons/Message');
const PGUtil = require('../utils/PGUtil');
const PGFile = require('../utils/PGFile');

const log = require('../utils/PGLog').getLogger('PGResponse');
// ============================================================

/**
 * Internal server error
 * @static
 */
const MSG_INTERNAL_SERVER_ERROR = withMessage(
    Message.RESPONSE_MSG_INTERNAL_SERVER_ERROR,
    Message.RESPONSE_CODE_INTERNAL_SERVER_ERROR);

/**
 * Bad request parameters 
 * @static
 */
const MSG_CONFLICT_REQUEST_PARAMS = withMessage(
    Message.RESPONSE_MSG_CONFLICT,
    Message.RESPONSE_CODE_CONFLICT);


const MSG_BAD_REQUEST_PARAMS = withMessage(
    Message.RESPONSE_MSG_BAD_REQUEST_PARAMS,
    Message.RESPONSE_CODE_BAD_REQUEST_PARAMS);

const MSG_NOT_SUPPORTTED_REQUEST_PARAMS = withMessage(
    Message.RESPONSE_MSG_NOT_SUPPORTTED_PARAMS,
    Message.RESPONSE_CODE_NOT_SUPPORTTED_PARAMS);

const MSG_LOCK_CONFLICT = withMessage(
    Message.RESPONSE_MSG_LOCK_CONFLICT,
    Message.RESPONSE_CODE_LOCK_CONFLICT);

/**
 * 
 * @param {Object} params 
 *  object = {
 *      statusCode: 200,
 *      headers:{
 *          key:'value'
 *      }
 *      message: 'Success',
 *      json: '',
 *      file:{
 *          localPath:'',
 *          isLastFile: true
 *      }
 * }
 * @return {PGResponse}
 */
function createInstance(params) {
    Assert.ok(params, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    let result = new PGResponse();
    result.statusCode = !!params.statusCode ? params.statusCode : 200;
    result.headers = !!params.headers ? params.headers : {};
    result.file = !!params.file ? params.file : {};
    result.json = params.json;
    result.xml = params.xml;
    if (!!result.file && !!result.file.localPath) {
        result.isFile = true;
    } else if (!!result.json || params.isJson) {
        result.isJson = true;
    } else if (!!result.xml || params.isXml) {
        result.isXml = true;
    } else {
      result.isFile = false;
      result.message = !!params.message? params.message: Message.RESPONSE_MSG_SUCCESS;
  }
    return result;
}

/**
 * withMessage([msg]='success', [statusCode]=200)
 * Initialize for response with response message.
 *
 * @static
 * @param {String} [msg = 'success']
 *            message
 * @param {int} [statusCode=200] Opational
 *            statusCode
 * @return {PGResponse} a new PGResponse instance
 */
function withMessage(msg, statusCode) {
    let params = {};
    if (arguments.length == 1) {
        if (PGUtil.isString(arguments[0])) {
            params.message = arguments[0];
        } else {
            params.statusCode = arguments[0];
            params.message = Message.RESPONSE_MSG_SUCCESS;
        }
    } else if (arguments.length == 2) {
        params.message = arguments[0];
        params.statusCode = arguments[1];
    } else if (arguments.length == 0) {
        params.message = Message.RESPONSE_MSG_SUCCESS;
    }
    return createInstance(params);
}

/**
 * withFile(pathname, isLastFile, [statusCode]=200)
 * Initialize for response with file.
 *
 * @static
 * @param {String} pathname
 *            response file path
 * @param {boolean} isLastFile
 *            is or not the last file
 * @param {int} [statusCode=200] Opational
 *            statusCode
 * @return {PGResponse} a new PGResponse instance
 */
function withFile( pathname, isLastFile, statusCode) {
    Assert.ok(arguments.length == 2 || arguments.length == 3,
        Message.ASSERT_MSG_INVALID_ARGUMENTS);
    let params = {};
    params.file = {
        localPath: pathname,
        isLastFile: isLastFile
    };
    params.statusCode = (!!statusCode)? statusCode: 200;
    return createInstance(params);
}
/**
 * withHead([distributionStatus]=null, [statusCode]=200)
 * Initialize for HEAD request.<br>
 * statusCode is 200.
 * 
 * @static
 * @param {String} distributionStatus
 *            distributionStatus
 * @param {int} [statusCode=200] Opational
 *            statusCode
 * @return {PGResponse} a new PGResponse instance
 */
function withHead( /* [String]=null*/ distributionStatus, /* [int]=200*/ statusCode) {
    let params = {
        headers: {}
    };
    if (arguments.length == 1) {
        if (PGUtil.isString(arguments[0])) {
            params.headers[Constants.RESPONSE_HEADER_KEY_DISTRIBUTION_STATUS] = arguments[0];
            params.statusCode = 200;
        } else {
            params.statusCode = arguments[0];
        }
    } else if (arguments.length == 2) {
        params.headers[Constants.RESPONSE_HEADER_KEY_DISTRIBUTION_STATUS] = arguments[0];
        params.statusCode = arguments[1];
    }
    return createInstance(params);
}


/**
 * withHeadForVerifyConnection([isHistoryExists]=true/false, isRequestExists=true/false, [statusCode]=200)
 * Initialize for HEAD request.<br>
 * @return {PGResponse} a new PGResponse instance
 */
// function withHeadForVerifyConnection(/* [bool]*/ isHistoryExists, /* [bool]*/ isRequestExists, /* [int]=200*/ statusCode) {
//     let params = {
//         headers: {}
//     };

//     params.headers[Constants.RESPONSE_HEADER_KEY_HISTORY_EXISTED] = isHistoryExists;

//     params.headers[Constants.RESPONSE_HEADER_KEY_REQUEST_EXISTED] = isRequestExists;

//     params.statusCode = statusCode;

//     if (isHistoryExists && !isRequestExists) {
//         // params.message="TBD";
//     } else if (!isHistoryExists && isRequestExists) {
//         // params.message="TBD";
//     } else if (!isHistoryExists && !isRequestExists) {
//         // params.message="TBD";
//     } else if (isHistoryExists && isRequestExists) {
//         // params.message="TBD";
//     }


//     return createInstance(params);
// }

/**
 * withMessage([msg]='success', [statusCode]=200)
 * Initialize for response with response message.
 *
 * @static
 * @param {String} jsonString
 * @param {int} [statusCode=200] Opational
 *            statusCode
 * @return {PGResponse} a new PGResponse instance
 */
function withJson(jsonString, statusCode) {
    Assert.ok(arguments.length == 1 || arguments.length == 2,
        Message.ASSERT_MSG_INVALID_ARGUMENTS);

    let params = {};
    params.json = jsonString;
    params.statusCode = (!!statusCode)? statusCode: 200;
    params.isJson = true;
    return createInstance(params);
}

/**
 * Create xml body
 * @param {String} xmlStr
 * @param {int} [statusCode=200] Optional
 *        statusCode
 * @return {PGResponse} a new PGResponse instance
 */
function withXml(xmlStr, statusCode) {
    Assert.ok(arguments.length == 1 || arguments.length == 2,
        Message.ASSERT_MSG_INVALID_ARGUMENTS);

    let params = {};
    params.xml = xmlStr;
    params.statusCode = (!!statusCode)? statusCode: 200;
    params.isXml = true;
    return createInstance(params);
}

// ------------------------------------------------------------

/**
 * Contains the response infomation and send data to client
 * @class PGResponse
 */
function PGResponse() {
    /* -- Properties --*/
    /** @type {boolean}*/
    this.isFile = false;
    /** @type {boolean}*/
    this.isJson = false;
    /** @type {int}*/
    this.statusCode = 200;
    /** @type {String}*/
    this.message;
    /** @type {String}*/
    this.file = {};
    /** @type {String}*/
    this.headers = {};
    /* -- Constructor --*/
}
/**
 * Is response status is 200
 * @return {boolean}
 */
function isOK() {
    return Message.RESPONSE_CODE_SUCCESS == this.statusCode;
}

/**
 * Finishes sending the request. 
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function endResponse(req, res) {
    Assert.equal(arguments.length, endResponse.length, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    let result = this;
    if (result.isFile == true) {
        sendZipFileToClient(res, result);
    } else if ('HEAD' == req.method) {
        sendHeadToClient(res, result);
    } else if (result.isJson == true) {
        sendJSONToClient(res, result);
    } else if (result.isXml == true) {
        sendXmlToClient(res, result);
    } else {
        sendMessageToClient(res, result);
    }
}

/**
 * Finishes sending the request of specific format.
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function endSpecificResponse(req, res) {
    Assert.equal(arguments.length, endSpecificResponse.length, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    let result = this;
    if (result.isFile == true) {
        sendZipFileToClient(res, result);
    } else if ('HEAD' == req.method) {
        sendHeadToClient(res, result);
    } else if (result.isJson == true) {
        sendJSONToClient(res, result);
    } else if (result.isXml == true) {
        sendSpecificXmlToClient(res, result);
    } else {
        sendMessageToClient(res, result);
    }
}

/**
 * Set a single header to the response.
 * @param {String} name
 * @param {String} value
 */
function setHeader(name, value) {
    Assert.equal(arguments.length, setHeader.length, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    this.headers[name] = value;
}

/**
 * Set a single header to the response.
 * @param {String} errorCode
 */
function setErrorCodeHeader(errorCode) {
    Assert.equal(arguments.length, setErrorCodeHeader.length, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    this.setHeader(Constants.RESPNOSE_HEADER_KEY_ERROR_CODE, errorCode);
}

/**
 * @param {http.ServerResponse} res
 * @param {Object} headers
 */
function setHeaderWithParams(res, headers) {
    for (let key in headers) {
        if (!!key) {
            res.setHeader(key, headers[key]);
        }
    }
}

/**
 * @param {http.ServerResponse} res
 * @param {PGResponse} result
 */
function sendMessageToClient(res, result) {
    log.debug('sendMessageToClient: {statusCode:' + result.statusCode //
              + ', message:' + result.message + ', headers: ' + JSON.stringify(result.headers) + '}');
    res.statusCode = result.statusCode;
    // let bodyStr = createXmlMessage(result.statusCode, result.message);
    let bodyStr = result.message ? String(result.message) : '';
    let bodyBuf = Buffer.from(bodyStr, Constants.ENCODING_UTF8);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE, Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE_XML);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_LENGTH, bodyBuf.length);
    setHeaderWithParams(res, result.headers);
    res.end(bodyBuf, null);
}

/**
 * @param {http.ServerResponse} res
 * @param {PGResponse} result
 */
function sendXmlToClient(res, result) {
/*    log.debug('sendXmlToClient: {statusCode:' + result.statusCode //
        + ', body:' + result.xml + ', headers: ' + JSON.stringify(result.headers) + '}');*/
    res.statusCode = result.statusCode;

    let bodyStr = createXmlResponse(result.xml);

    let bodyBuf = new Buffer(bodyStr, Constants.ENCODING_UTF8);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE, Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE_XML);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_LENGTH, bodyBuf.length);
    setHeaderWithParams(res, result.headers);
    res.end(bodyBuf, null);
}

/**
 * Save special format xml to client
 * @param {http.ServerResponse} res
 * @param {PGResponse} result
 */
function sendSpecificXmlToClient(res, result) {
    /*    log.debug('sendXmlToClient: {statusCode:' + result.statusCode //
     + ', body:' + result.xml + ', headers: ' + JSON.stringify(result.headers) + '}');*/
    res.statusCode = result.statusCode;

    let bodyStr = createSpecificXmlResponse(result.xml);

    let bodyBuf = new Buffer(bodyStr, Constants.ENCODING_UTF8);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE, Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE_XML);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_LENGTH, bodyBuf.length);
    setHeaderWithParams(res, result.headers);
    res.end(bodyBuf, null);
}

/**
 * @param {http.ServerResponse} res
 * @param {PGResponse} result
 */
function sendJSONToClient(res, result) {
    log.debug('sendJSONToClient: {statusCode:' + result.statusCode //
              + ', body:' + result.json + ', headers: ' + JSON.stringify(result.headers) + '}');
    res.statusCode = result.statusCode;
    let bodyStr = result.json;
    let bodyBuf = new Buffer(bodyStr, Constants.ENCODING_UTF8);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE, Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE_JSON);
    res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_LENGTH, bodyBuf.length);
    setHeaderWithParams(res, result.headers);
    res.end(bodyBuf, null);
}

/**
 * @param {http.ServerResponse} res
 * @param {PGResponse} result
 */
function sendZipFileToClient(res, result) {
    log.debug('sendZipFileToClient: {statusCode:' + result.statusCode //
//        + ', fileSize:' + new PGFile(result.file.localPath).length() //
        + '}');
    res.statusCode = result.statusCode;
    if (result.file && result.file.localPath) {
        let file = new PGFile(result.file.localPath);
        file.readFile(function(err, buffer) {
            if (err) {
                log.error('Fail to read file, at '+file.getAbsolutePath());
                log.trace(err);
                sendMessageToClient(res, MSG_INTERNAL_SERVER_ERROR);
                return;
            }
            res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE,
                Constants.RESPONSE_HEADER_KEY_CONTENT_TYPE_ZIP);
            res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTINUES,
                    result.file.isLastFile ? Constants.RESPONSE_HEADER_VALUE_CONTINUES_FALSE
                    : Constants.RESPONSE_HEADER_VALUE_CONTINUES_TRUE);
            res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_LENGTH, buffer.length);
            let filename = file.getName();
            res.setHeader(Constants.RESPONSE_HEADER_KEY_CONTENT_DISPOSITION,
                    Util.format(Constants.RESPONSE_HEADER_VALUE_CONTENT_DISPOSITION, filename));
            setHeaderWithParams(res, result.headers);
            res.end(buffer, null);
            // Delete download folder
            if (result.file.isLastFile) {
                let multiZipFolder = file.getParentFile();
                PGUtil.deleteLocalFile(multiZipFolder, function(err) {
                    if (!!err) {
                        log.warn(Message.LOG_ERROR_MSG_FAIL_DELETE_FILE, multiZipFolder.getPath);
                        log.trace(err);
                        return;
                    }
                    let machineNameFolder = multiZipFolder.getParentFile();
                    if (!!machineNameFolder) {
                        machineNameFolder.list(function(err, filenameArray) {
                            if (!!err) {
                                log.warn('Fail to list folder', multiZipFolder.getPath);
                                log.trace(err);
                                return;
                            }
                            if (!filenameArray || filenameArray.length == 0) {
                                if (machineNameFolder.exists()) {
                                    PGUtil.deleteLocalFile(machineNameFolder);
                                }
                            }
                        });
                    }
                });
            } else {
                PGUtil.deleteLocalFile(file);
            }
        });
    } else {
        log.error('send file to client, the localPath can not be null');
        log.trace(new Error('send file to client, the localPath can not be null'));
        sendMessageToClient(res, MSG_INTERNAL_SERVER_ERROR);
    }
}

/**
 * @param {http.ServerResponse} res
 * @param {PGResponse} result
 */
function sendHeadToClient(res, result) {
    log.debug('sendHeadToClient: {statusCode:' + result.statusCode + '} '
        + require('util').inspect(result.headers));
    res.statusCode = result.statusCode;
    setHeaderWithParams(res, result.headers);
    res.end();
}

/**
 * createXmlMessage(statusCode, message)
 * Create message with xml format.
 *
 * @param {int} statusCode
 *            status code
 * @param {String} message
 *            message to client.
 * @return {String} status message with xml format
 */
// function createXmlMessage(statusCode, message) {
//     statusCode = statusCode || '';
//     message = message || '';
//     let xmlStr =
//         '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' //
//         + '<Root>\n' //
//         + '  <StatusCode>' + statusCode + '</StatusCode>\n' //
//         + '  <Message>' + message + '</Message>\n' //
//         + '</Root>';
//     return xmlStr;
// }

/**
 * Create xml format body
 * @param {string} xml
 * @return {string}
 */
function createXmlResponse(xml) {
    if (!xml) {
        return xml;
    }
    let xmlStr =
        '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' //
            + '<root>\n' //
            + xml //
            + '</root>';
    return xmlStr;
}

/**
 * Create special xml format body
 * @param {string} xml
 * @return {string}
 */
function createSpecificXmlResponse(xml) {
    if (!xml) {
        return xml;
    }
    let xmlStr =
        '<?xml version=\"1.0\" encoding=\"UTF-8\"?>' //
            + xml;
    return xmlStr;
}

PGResponse.prototype.endResponse = endResponse;
PGResponse.prototype.endSpecificResponse = endSpecificResponse;
PGResponse.prototype.isOK = isOK;
PGResponse.prototype.setHeader = setHeader;
PGResponse.prototype.setErrorCodeHeader = setErrorCodeHeader;
// ============================================================

module.exports = PGResponse;

module.exports.createInstance = createInstance;
module.exports.withMessage = withMessage;
module.exports.withFile = withFile;
module.exports.withHead = withHead;
// module.exports.withHeadForVerifyConnection = withHeadForVerifyConnection;
module.exports.withJson = withJson;

module.exports.withXml = withXml;

module.exports.MSG_INTERNAL_SERVER_ERROR = MSG_INTERNAL_SERVER_ERROR;
module.exports.MSG_BAD_REQUEST_PARAMS = MSG_BAD_REQUEST_PARAMS;
module.exports.MSG_NOT_SUPPORTTED_REQUEST_PARAMS = MSG_NOT_SUPPORTTED_REQUEST_PARAMS;
module.exports.MSG_CONFLICT_REQUEST_PARAMS = MSG_CONFLICT_REQUEST_PARAMS;
module.exports.MSG_LOCK_CONFLICT = MSG_LOCK_CONFLICT;
