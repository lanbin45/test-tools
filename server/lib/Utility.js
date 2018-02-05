/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to provide useful methods for other files.
 */

const PGLog = require('./utils/PGLog');
const log = PGLog.getLogger('Utility');

exports.scannerList = {};

// ============================================================

function exit() {
    process.exit();
};
exports.exit = exit;

// ============================================================

/**
 * Initilize default values?
 * @param {Function} callback 
 */
exports.initialize = function(callback) {
    PGLog.initLogConfig();
    log.info('Nodejs Initialize');
    log.info('Use default setting to startup.');
    // todo read defaut values?
    callback(null);
};

// ============================================================

exports.printDebugLog = function(message) {
    console.log(message);
};

// ============================================================
