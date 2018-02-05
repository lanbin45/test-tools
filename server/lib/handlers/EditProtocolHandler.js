/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle EditProtocol request.
 */

'use strict';

const Async = require('async');
const Response = require('../model/PGResponse');
const CreateProtocolService = require('../services/CreateProtocolService');

const log = require('../utils/PGLog').getLogger('EditProtocolHandler');

// ============================================================

const execute = (req, res) => {
    log.info('Start editing protocol...');
    Async.waterfall([
        function(innerCB) {
            if (!req.body) {
                log.error('Failed to edit protocol. Request body is empty.');
                innerCB(Response.MSG_INTERNAL_SERVER_ERROR);
            } else {
                innerCB(null, req.body);
            }
        },
        function(requestParams, innerCB) {
            if (!requestParams.uid || !requestParams.version) {
                log.error('Failed to edit protocol. UID or version is empty.');
                innerCB(Response.MSG_INTERNAL_SERVER_ERROR);
                return;
            }

            CreateProtocolService.service(requestParams, (pgRes) => {
                if (!!pgRes) {
                    innerCB(pgRes);
                } else {
                    innerCB(null);
                }
            });
        }
    ], function(pgRes) {
        // todo
        let json = {};
        if (!!pgRes) {
            json['result'] = 1;
            json['msg'] = pgRes.msg;
            let response = Response.withJson(JSON.stringify(json), pgRes.statusCode);
            response.endResponse(req, res);
        } else {
            json['result'] = 0;
            json['msg'] = 'Success';
            let response = Response.withJson(JSON.stringify(json));
            response.endResponse(req, res);
        }
    });
};

exports.execute = execute;

