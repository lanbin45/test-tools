/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle TestConnection request.
 */

'use strict';

const Async = require('async');
const Response = require('../model/PGResponse');
const TestConnectionService = require('../services/TestConnectionService');

const log = require('../utils/PGLog').getLogger('TestConnectionHandler');

// ============================================================
const execute = (req, res) => {
    log.info('TestConnection start...');
    Async.waterfall([
        function(innerCB) {
            if (!req.body) {
                log.error('Failed to create protocol. Request body is empty.');
                innerCB(Response.MSG_INTERNAL_SERVER_ERROR);
            } else {
                innerCB(null, req.body);
            }
        },
        function(requestParams, innerCB) {
            TestConnectionService.service(requestParams, function(pgRes) {
                if (!!pgRes) {
                    innerCB(pgRes);
                    return;
                }
                innerCB(null);
            });
        }
    ],
        function(pgRes) {
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
        }
    );
};

exports.execute = execute;
