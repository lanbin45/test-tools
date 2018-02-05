/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to provide common methods.
 */

'use strict';

const URL = require('url');
const PGUtil = require('./PGUtil');
const FS = require('fs-extra');
const Async = require('async');
const Path = require('path');
const log = require('../utils/PGLog').getLogger('IUtils');

// ============================================================

function parseURLQuery(req) {
    let url = URL.parse(req.url, true);
    return url.query;
}

/**
 * Check specified position of notified code is '1' or not.
 * @param {String} notifiedCode 'XXXX' 
 * @param {Integer} position digtal position
 * @return {boolean} return true if specified position of notified code is '1', otherwise return false.
 */
function hasProtocols(notifiedCode, position) {
    if (!notifiedCode || position <= 0 || notifiedCode.length < position) {
        log.error('Notified code length is shorter than specified position.');
        return false;
    }
    let code = notifiedCode[position - 1];
    if (code === '1') {
        return true;
    } else {
        return false;
    }
}

/**
 * Check whether file is a .dat file.
 * @param {String} filename 
 * @return {boolean} return true if file is .dat file, otherwise return false.
 */
function isDatPathname(filename) {
    return !!filename ? filename.endsWith('.dat') : false;
}

/**
 * Check whether file is a changelog file.
 * @param {String} filename 
 * @return {boolean} return true if file is changelog  file, otherwise return false.
 */
function isChangelogPathname(filename) {
    return !!filename ? filename.endsWith('changelog.xml') : false;
}

/**
 * Check whether file is a summary file.
 * @param {String} filename 
 * @return {boolean} return true if file is summary file, otherwise return false.
 */
function isSummaryPathname(filename) {
    if (!filename) {
        return false;
    }
    return filename.endsWith('.xml') && !filename.endsWith('changelog.xml') && !filename.endsWith('history.xml')
        && !filename.endsWith('dependency.xml');
}

/**
 * Check whether file is a history file.
 * @param {String} filename 
 * @return {boolean} return true if file is history file, otherwise return false.
 */
function isHistoryPathname(filename) {
    return !!filename ? filename.endsWith('history.xml') : false;
}

/**
 * @param {Array<String>} pathnameArray
 * @return {String} history file name. or null(not found)
 */
function getHistoryPath(pathnameArray) {
    if (!pathnameArray) {
        return null;
    }
    let resultPath = null;
    pathnameArray.every(function(pathname) {
        if (isHistoryPathname(pathname)) {
            resultPath = pathname;
            return false;
        }
        return true;
    });
    return resultPath;
}

/**
 * Get file path of summary file
 * @param {Array<String>} pathnameArray
 * @return {String} summary file path. or null(not found)
 */
function getSummaryPath(pathnameArray) {
    if (!pathnameArray) {
        return null;
    }
    let resultPath = null;
    pathnameArray.every(function(pathname) {
        if (isSummaryPathname(pathname)) {
            resultPath = pathname;
            return false;
        }
        return true;
    });
    return resultPath;
}

/**
 * Get file path of .dat file
 * @param {Array<String>} pathnameArray
 * @return {String} .dat file path. or null(not found)
 */
function getDatPath(pathnameArray) {
    if (!pathnameArray) {
        return null;
    }
    let resultPath = null;
    pathnameArray.every(function(pathname) {
        if (isDatPathname(pathname)) {
            resultPath = pathname;
            return false;
        }
        return true;
    });
    return resultPath;
}

/**
 * Clean temp folder.
 * @param {String} localFilePath 
 * @param {Function} callback 
 */
function cleanTempFolder(localFilePath, callback) {
    if (!!localFilePath) {
        let pathList = FS.readdirSync(localFilePath);
        Async.eachLimit(pathList, 10, (onePath, eachCB) => {
            let wholePath = Path.join(localFilePath, onePath);
            PGUtil.deleteLocalFile(wholePath, function(err) {
                if (!!err) {
                    log.warn('Fail to clean temp folder: ' + onePath);
                }
                eachCB(null);
                return;
            });
        }, (err) => {
            callback(null);
            return;
        });
    } else {
        callback(null);
    }
}

exports.parseURLQuery = parseURLQuery;
exports.hasProtocols = hasProtocols;
exports.isDatPathname = isDatPathname;
exports.isChangelogPathname = isChangelogPathname;
exports.isSummaryPathname = isSummaryPathname;
exports.isHistoryPathname = isHistoryPathname;
exports.getHistoryPath = getHistoryPath;
exports.getSummaryPath = getSummaryPath;
exports.getDatPath = getDatPath;
exports.cleanTempFolder = cleanTempFolder;
