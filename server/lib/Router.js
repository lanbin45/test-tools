/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to dispatch HTTP request to correct request handler.
 */

'use strict';

const setting = require('./Setting.js');
const bodyParser = require('body-parser');

// const pingKillHandler = require('./handlers/pingKillHandler.js');
const baseHandler = require('./handlers/BaseHandler.js');

const testConnectionHandler = require('./handlers/TestConnectionHandler.js');
const createProtocolHandler = require('./handlers/CreateProtocolHandler.js');
const synchronizeProtocolHandler = require('./handlers/SynchronizeProtocolHandler.js');
const editProtocolHandler = require('./handlers/EditProtocolHandler.js');
const transferProtocolHandler = require('./handlers/TransferProtocolHandler.js');

// Dispatch HTTP request
module.exports = function(app) {
    // app.get(setting.CTConfig.root + 'ping', (req, res) => {
    //     pingKillHandler.ping(req, res);
    // });

    // app.get(setting.CTConfig.root + 'kill', (req, res) => {
    //     pingKillHandler.kill(req, res);
    // });

    let option = {
        extended: false
    };

    let testConnectionJson = bodyParser.json(option);
    app.post(setting.CTConfig.root + 'testconnection', testConnectionJson, (req, res) => {
        testConnectionHandler.execute(req, res);
    });

    let createProtocolJson = bodyParser.json(option);
    app.post(setting.CTConfig.root + 'createprotocol', createProtocolJson, (req, res) => {
        createProtocolHandler.execute(req, res);
    });

    app.get(setting.CTConfig.root + 'sychronize', (req, res) => {
        synchronizeProtocolHandler.execute(req, res);
    });

    let editProtocolJson = bodyParser.json(option);
    app.post(setting.CTConfig.root + 'editprotocol', editProtocolJson, (req, res) => {
        editProtocolHandler.execute(req, res);
    });

    app.get(setting.CTConfig.root + 'transfer', (req, res) => {
        transferProtocolHandler.execute(req, res);
    });

    app.all('*', (req, res) => {
        baseHandler.execute(req, res);
    });
};
