/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle TransferProtocol request.
 */

'use strict';

const Async = require('async');
const Response = require('../model/PGResponse');
const IUtils = require('../utils/IUtils');
const Constants = require('../commons/Constants');
const TransferProtocolService = require('../services/TransferProtocolService');

const log = require('../utils/PGLog').getLogger('TransferProtocolHandler');

// ============================================================

const execute = (req, res) => {
    log.info('TransferProtocol start...');
    Async.waterfall([
        function(innerCB) {
            let requestParams = IUtils.parseURLQuery(req);
            innerCB(null, requestParams);
        },
        function(requestParams, innerCB) {
            validateParams(requestParams, (errMsg) => {
                if (!!errMsg) {
                    innerCB(errMsg);
                    return;
                }
                innerCB(null, requestParams);
            });
        },
        function(requestParams, innerCB) {
            TransferProtocolService.service(requestParams, function(errMsg, protocolArray) {
                if (!!errMsg) {
                    innerCB(errMsg);
                    return;
                }
                innerCB(null, protocolArray);
            });
        }
    ],
        function(errMsg, protocolArray) {
            let json = {};
            if (!!errMsg) {
                if (Constants.MSG_THERE_IS_NO_MATCHED_PROTOCOLS === errMsg) {
                    json['result'] = 2;
                    json['msg'] = errMsg;
                    let response = Response.withJson(JSON.stringify(json));
                    response.endResponse(req, res);
                    return;
                }
                json['result'] = 1;
                json['msg'] = errMsg;
                let response = Response.withJson(JSON.stringify(json));
                response.endResponse(req, res);
                return;
            }
            json['result'] = 0;
            json['msg'] = 'Success';
            json['total'] = !!protocolArray ? protocolArray.length : 0;
            json['protocols'] = protocolArray;
            let response = Response.withJson(JSON.stringify(json));
            response.endResponse(req, res);
        }
    );
};

/**
 * Validate query parameters.
 * @param {Object} reqParams 
 * @param {Function} callback 
 */
function validateParams(reqParams, callback) {
    if (!reqParams || !reqParams.MachineName) {
        let msg = 'MachineName should not be empty.';
        callback(msg);
        return;
    }
    callback(null);
}

exports.execute = execute;

