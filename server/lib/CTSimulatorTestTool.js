/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to start "CTSimulatorTestTool".
 */

const filePath = process.argv[1] == 'CTSimulatorTestTool.js' ? process.cwd() : process.argv[1];
const location = filePath.indexOf('lib');
const dir = filePath.substring(0, location);
console.log('Working Directoring: ' + dir);
process.chdir(dir);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// todo delete
process.currentScannerList = [];
process.mutexList = {};

const app = require('../node_modules/express')();
const querystring = require('querystring');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const router = require('./Router.js');
const setting = require('./Setting.js');
const utility = require('./Utility.js');
const log = require('./utils/PGLog').getLogger('CTSimulatorTestTool');

// ============================================================
process.on('uncaughtException', function(err) {
    log.error('Caught exception: ');
    log.trace(err);
    utility.exit();
});

// ============================================================
const init = function(next) {
    utility.initialize(function(err) {
        if (!!err) {
            utility.exit();
            return;
        }
        next();
});
};

// ============================================================
const listen = function() {
    let port = setting.CTConfig.port;
    app.use(function(req, res, next) {
        for (let i in req.headers) {
            if (Object.prototype.hasOwnProperty.call(req.headers, i)) {
                req.headers[i] = querystring.unescape(req.headers[i]);
                req.headers[i] = req.headers[i].replace(/\+/g, '');
            }
        }
        next();
    });
    // Dispatch HTTP request
    router(app);
    let server;
    if (setting.CTConfig.SSL) {
        let options = {
            key: fs.readFileSync(path.join(__dirname, 'cert/vitality-key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert/vitality-cert.pem')),
            rejectUnauthorized: false,
            requestCert: false
        };
        server = https.createServer(options, app);
        server.on('listening', () => {
            log.info('App running at => https://localhost:' + port + '/CTSimulatorTestTool');
            let appUri = 'https://localhost:' + port + setting.CTConfig.root;
            console.log('APP_FEEDBACK pid ' + process.pid);
            console.log('APP_FEEDBACK vsp.ctrl.ping ' + appUri + 'ping');
            console.log('APP_FEEDBACK vsp.ctrl.kill ' + appUri + 'kill');
            console.log('APP_FEEDBACK vsp.ctrl.proxy ' + 'https://localhost:' + port);
            console.log('APP_FEEDBACK vsp.ctrl.state IDLE');
        });
    } else {
        server = http.createServer(app);
        server.on('listening', () => {
            log.info('App running at => http://localhost:' + port + '/CTSimulatorTestTool');
            let appUri = 'http://localhost:' + port + setting.CTConfig.root;
            console.log('APP_FEEDBACK pid ' + process.pid);
            console.log('APP_FEEDBACK vsp.ctrl.ping ' + appUri + 'ping');
            console.log('APP_FEEDBACK vsp.ctrl.kill ' + appUri + 'kill');
            console.log('APP_FEEDBACK vsp.ctrl.proxy ' + 'http://localhost:' + port);
            console.log('APP_FEEDBACK vsp.ctrl.state IDLE');
        });
    }
    server.on('request', (request, response) => {
        log.info(request.ip + ' [' + request.method + '] ' + request.url);
        response.on('finish', () => {
            log.info(request.ip + ' [' + request.method + '] ' + request.url + ' Status:' + response.statusCode);
        });
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            // todo
            log.error('Address in use, closing...');
            utility.exit();
        } else {
            log.error('Server error.');
            log.trace(err);
        }
    });
    server.listen(port);
};

// ============================================================
init(listen);
