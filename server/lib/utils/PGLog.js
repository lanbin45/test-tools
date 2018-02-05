/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Log4js = require('log4js');
const path = require('path');
const FS = require('fs-extra');
const Setting = require('../Setting');

// ============================================================

/**
 * Get a logger instance. Instance is cached on categoryName level.
 *
 * @param  {String} categoryName name of category to log to.
 * @return {{trace: Function, debug: Function, info: Function, warn: Function, error: Function, fatal: Function}} instance of logger for the category
 * @static
 *
 */
function getLogger(categoryName) {
    let _log = Log4js.getLogger(categoryName);

    return {
        trace: function(...args) {
            _log.trace(...args);
        },
        debug: function(...args) {
            _log.debug(...args);
        },
        info: function(...args) {
            _log.info(...args);
        },
        warn: function(...args) {
            _log.warn(...args);
        },
        error: function(...args) {
            _log.error(...args);
        },
        fatal: function(...args) {
            _log.fatal(...args);
        }
    };
}

/**
 * Initialize logger.
 */
function initLogConfig() {
    if (!FS.pathExistsSync(Setting.CTConfig.logPath)) {
        FS.mkdirsSync(Setting.CTConfig.logPath);
    }

    let logPath = path.join(Setting.CTConfig.logPath, Setting.CTConfig.appName + 'Node');
    let logLevel = Setting.logLevel;
    let configure = {
        appenders: [
            {
                level: logLevel,
                // category: 'Logger',
                type: 'file',
                filename: logPath + '_' + getDateString() + '_' + process.pid + '.log',
                maxLogSize: Setting.maxLogSize*1000,
                keepFileExt: true,
                compress: true,
                backups: 100000,
                layout: {
                    type: 'pattern',
                    pattern: '[%d] [%5.5p] %c - %m'
                }
            // }, {
            //     level: logLevel,
            //     // category: 'Logger',
            //     type: 'dateFile',
            //     filename: logPath,
            //     pattern: '_yyyyMMdd_' + process.pid + '.log',
            //     alwaysIncludePattern: true,
            //     layout: {
            //         type: 'pattern',
            //         pattern: '[%d] [%5.5p] %c - %m'
            //     }
            }, {
                type: 'console',
                layout: {
                    type: 'pattern',
                    pattern: '[%d] [%[%5.5p%]] %c - %m'
                }
            }
        ],
        replaceConsole: false // replace console.log file
    };
    Log4js.configure(configure);
    Log4js.getLogger('Logger').debug('Logger file: ' + logPath + ' | logger level: ' + logLevel + ' | process id: ' + process.pid);
}

/**
 * Shutdown Logger and write all logs to file.
 * 
 * @param {function} callback
 */
function shutdown(callback) {
    if (typeof callback !== 'function') {
        Log4js.getLogger('Logger').warn('Error occurs when shuting down Logger.');
    } else {
        Log4js.shutdown(callback);
    }
}

/**
 * Return date in log file name. Date pattern is 'yyyyMMdd'.
 * 
 * @return {string} date string in pattern 'yyyyMMdd'
 */
function getDateString() {
    const date = new Date();

    let dateString = date.getFullYear() + '';
    if (date.getMonth() < 9) {
        dateString += '0';
    }
    dateString += (date.getMonth() + 1);
    if (date.getDate() < 10) {
        dateString += '0';
    }
    dateString += date.getDate();
    return dateString;
}

// ============================================================
exports.initLogConfig = initLogConfig;
exports.getLogger = getLogger;
exports.shutdown = shutdown;
