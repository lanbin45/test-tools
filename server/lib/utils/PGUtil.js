/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Util = require('util');
const FS = require('fs-extra');
const Path = require('path');
const Assert = require('assert');
const UUID = require('node-uuid');
const PGFile = require('../utils/PGFile');
const Setting = require('../Setting');
const Message = require('../commons/Message');
const crypto = require('crypto');
const Constants = require('../commons/Constants');
// require('../utils/StringExtra');
require('../utils/ArrayExtra');
const log = require('../utils/PGLog').getLogger('PGUtil');

// ============================================================

function isArray(obj) {
    return Util.isArray(obj);
}

/**
 * Tests if something is a string.
 *
 * @example
 *
 * PGUtil.isString("true") //true
 * PGUtil.isString(true) //false
 *
 * @param obj the thing to test
 * @return {Boolean} returns true if the argument is a string.
 * @static
 * @memberOf PGUtil
 */
function isString(obj) {
    return (typeof obj == 'string' || obj instanceof String);
}

function isNotString(obj) {
    return !isString(obj);
}

/**
 * Tests if something is an emptry string.
 *
 * @example
 *
 * PGUtil.isEmptyString("") //true
 * PGUtil.isEmptyString(new String("")) //true
 * PGUtil.isEmptyString("123") //false
 *
 * @param str the thing to test
 * @return {Boolean} returns true if the argument is an emptry string.
 * @static
 * @memberOf PGUtil
 */
function isEmptyString(str) {
    return isString(str) && str == '';
}

function isNotEmptyString(str) {
    return !isEmptyString(str);
}
/**
 * Tests if something is empty.
 * @example
 * 0, "", null, false, undefined, NaN
 *
 * @param obj
 * @return true, if is one of above values;
 *         Otherwise.
 */
function isEmpty(obj) {
    return !obj;
}

// ------------------------------------------------------------

/**
 * convert path to match unix
 * @param {String} path
 * @return {String} a new path unix like format
 */
function convertPathToUnix(path) {
    if (!path) {
        return path;
    }
    let aPath = String(path);
    return aPath.replace(/\\/g, '/');
}

/**
 * getTempFolder(machineName, ...)
 * Get a temporary directory
 * @param {String} machineName
 * @return {String} path
 * @static
 * @memberOf PGUtil
 */
function getTempFolder() {
    return Path.resolve(Path.join(Setting.CTConfig.tempFolderPath, Path.join.apply(null, arguments)));
}

/**
 * The download folder is used to save protocol files 
 * which are retrieved from AFM.
 * @return {String} path
 */
function getDownloadFolder(machineName) {
    Assert.equal(arguments.length, getDownloadFolder.length,
            Message.ASSERT_MSG_INVALID_ARGUMENTS);
    let downloadDirName = Constants.PATH_DIR_TMP_DOWNLOAD + '_' + Date.now();
    return Path.join(getTempFolder(), machineName,
                downloadDirName);
}

/**
 * The upload folder is used to save protocol files 
 * which are retrieved from AFM.
 * @return {String} path
 */
function getUploadFolder() {
    return Path.join(getTempFolder(), UUID.v1());
}

function getSettingName(filename) {
    let indexOfSeperator = filename.indexOf('_');
    let settingName = filename.substr(0, indexOfSeperator);
    return settingName;
}

/**
 * The unzip folder is used to save protocol files 
 * which are retrieved from AFM.
 * @return {String} path
 */
function getUnzipFolder() {
    return Path.join(getTempFolder(), UUID.v1());
}

/**
 * getMultiZipFolder(machineName, childs...)
 * the folder is used to save zip files
 * @param {String} machineName
 * @param {String} childs Optional
 * @return {String} path
 */
function getMultiZipFolder(machineName, childs) {
    Assert.ok(arguments.length > 1, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    return Path.join(getTempFolder(), Path.join.apply(null, arguments));
}

/**
 * delete file or directory (even if it's not empty)
 * @param {String} file or pathname
 * @param {Function} callback(err) optional
 */
function deleteLocalFile(file, callback) {
    if (!(file instanceof PGFile)) {
        file = new PGFile(file);
    }
    if (!file.exists()) {
        if (callback) {
            callback(null);
        }
        return;
    }
    file.deleteFile(function(err) {
        if (typeof callback === 'function' || callback instanceof Function) {
            callback(err);
            // if (err.code === 'EPERM') {
            //     FS.unlinkSync(err.path, function(err) {
            //         if (err) {
            //             log.error(err.stack);
            //             return;
            //         }
            //         file.deleteFile(function(err) {
            //             callback(err);
            //         }, true);
            //     });
            // } else {
            //     callback(err);
            // }
        } else if (err) {
            log.warn(Message.LOG_ERROR_MSG_FAIL_DELETE_FILE, file.getPath);
            log.trace(err);
        }
    }, true);
}

/**
 * Return true if protocolType is valid (ExamPlan/SureIQ/SureExposure/ContrastPreset/VoicePreset).
 * @param {String} protocolType
 * @param {Boolean} containsOthers true if valid protocol types contains Others
 * @return {boolean} true if protocolType is valid
 */
function isValidProtocolType(protocolType, containsOthers) {
    let protocolTypeArray = getAllProtocolTypes();
    if (!containsOthers && Constants.PROTOCOL_DATATYPE_OTHERS == protocolType) {
        return false;
    }

    return protocolTypeArray.contains(protocolType);
}

/**
 * Return true if applyingStatus is valid.
 * @param {String} applyingStatus
 * @return {boolean}
 */
function isValidApplyingStatus(/* String */applyingStatus) {
    let applyingStatusArray = [
        Constants.REQUEST_PARAM_APPLYING_STATUS_B100,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B110,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B101,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B111,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B010,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B011,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B001,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B200

    ];
    return applyingStatusArray.contains(applyingStatus);
}

function isValidApplyingStatusNewVersion(/* String*/applyingStatus) {
    let applyingStatusArray = [
        Constants.REQUEST_PARAM_APPLYING_STATUS_B100,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B110,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B101,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B111,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B010,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B011,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B001,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B200,
        Constants.REQUEST_PARAM_APPLYING_STATUS_B300

    ];
    return applyingStatusArray.contains(applyingStatus);
}

/**
 * get UTC date string
 */
function currentDateUTCString() {
    return new Date().toISOString();
}

/**
 * Generate time stamp according to UTC time
 * @return {string}
 */
function generateTimeStamp() {
    let currentTime = new Date();
    let yearStr = currentTime.getUTCFullYear() + '';

    let month = currentTime.getUTCMonth() + 1;
    let monthStr = zeroPadding(month, -2);

    let day = currentTime.getUTCDate();
    let dayStr = zeroPadding(day, -2);

    let hour = currentTime.getUTCHours();
    let hourStr = zeroPadding(hour, -2);

    let minutes = currentTime.getUTCMinutes();
    let minutesStr = zeroPadding(minutes, -2);

    let seconds = currentTime.getUTCSeconds();
    let secondsStr = zeroPadding(seconds, -2);

    let millSeconds = currentTime.getUTCMilliseconds();
    let millSecondsStr = zeroPadding(millSeconds, -3);

    return yearStr + monthStr + dayStr + hourStr + minutesStr + secondsStr + millSecondsStr;
}

/**
 * Pad two zero on the right and return left string by index
 * @param num
 * @param index
 * @return {string}
 */
function zeroPadding(num, index) {
    if (!num || !index ) {
        return '';
    }
    num = '00' + num;
    let paddingNum = num.slice(index);
    return paddingNum;
}

/**
 * Walk on a directory and get all files under the dirctory and sub directory.
 * @param {String} path directory path
 * @param {String} excludeSuffix path that ends with suffix will not be added in returned file array
 * @return {Array<String>}File array. If path is null or path is a file, <tt>null</tt> is returned.
 */
function walkDirSync(/* String */path, /* String */excludeSuffix) {
    if (!path) {
        return null;
    }

    let fileArray = [];
    if (!FS.existsSync(path)) {
        return fileArray;
    }
    if (FS.statSync(path).isFile()) {
        return null;
    }

    let subPathArray = FS.readdirSync(path);
    subPathArray.forEach(function(subPath) {
        let fullSubPath = Path.join(path, subPath);
        if (FS.statSync(fullSubPath).isFile()) {
            if (!fullSubPath.endWith(excludeSuffix)) {
                fileArray.push(fullSubPath);
            }
        } else {
            let subDirPaths = walkDirSync(fullSubPath, excludeSuffix);
            fileArray = fileArray.concat(subDirPaths);
        }
    });

    return fileArray;
}

/**
 * Walk on a directory and get all files ending up with given filter under the dirctory and sub directory.
 * @param {String} path directory path
 * @param {String} filter only path that ends with filter will be added in returned file array
 * @return {Array<String>}File array. If path is null or path is a file, <tt>null</tt> is returned.
 */
function walkDirWithFilterSync(/* String */path, /* String */filter) {
    if (!path) {
        return null;
    }

    let fileArray = [];
    if (!FS.existsSync(path)) {
        return fileArray;
    }
    if (FS.statSync(path).isFile()) {
        return null;
    }

    let subPathArray = FS.readdirSync(path);

    subPathArray.forEach(function(subPath) {
        let fullSubPath = Path.join(path, subPath);
        if (FS.statSync(fullSubPath).isFile()) {
            if (!filter || fullSubPath.endWith(filter)) {
                fileArray.push(fullSubPath);
            }
        } else {
            let subDirPaths = walkDirWithFilterSync(fullSubPath, filter);
            fileArray = fileArray.concat(subDirPaths);
        }
    });

    return fileArray;
}

/**
 * Return true if the file has metadata
 * @param {String} fileName
 * @return {Boolean} Return true if the file has metadata; Otherwise, return false
 */
function hasMetadata(/* String*/fileName) {
    if (!fileName) {
        return false;
    }

    if (fileName.endWith(Constants.PATH_FILE_NAME_SUFFIX_CHANGE_LOG) ||
        fileName.endWith(Constants.PATH_FILE_NAME_SUFFIX_HISTORY) || fileName.endWith(Constants.PATH_ZIP) ||
        fileName.endWith(Constants.PATH_FILE_NAME_UPDATE_DATE_TIME)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Return false if the file name contains invalid character
 * @param {String} fileName
 * @return {Boolean} Return false if the file name contains invalid character; Otherwise, return true
 */
function containsInvalidChar(/* String*/fileName) {
    let res = false;
    let invalidCharArray = [';'];
    if (isEmpty(fileName)) {
        return res;
    }

    for (let count = 0; count < invalidCharArray.length; ++count) {
        if (fileName.indexOf(invalidCharArray[count]) > -1) {
            res = true;
            break;
        }
    }

    return res;
}

/**
 * Get EPNo from ExamPlan file name.
 * @param {String} fileName EP dat, summary, or changelog file name
 * @return {String} ep number for ExamPlan file name, or undefined for other file names
 */
function getEPNo(fileName) {
    if (!fileName) {
        return;
    }

    if (fileName.endWith('\\.dat')) {
        return fileName.split(/^ep_(\d+)\.dat$/)[1];
    } else if (fileName.endWith('changelog\\.xml')) {
        return fileName.split(/^ep_(\d+)\_changelog.xml$/)[1];
    } else if (fileName.endWith('history\\.xml')) {
        return fileName.split(/^ep_(\d+)\_history.xml$/)[1];
    } else if (fileName.endWith('\\.xml')) {
        return fileName.split(/^ep_(\d+)\.xml$/)[1];
    } else {
        return;
    }
}

/**
 * Get all supported protocol types, including Others type.
 */
function getAllProtocolTypes() {
    let protocolTypeArray = [
                             Constants.PROTOCOL_DATATYPE_EXAMPLAN,
                             Constants.PROTOCOL_DATATYPE_CONTRASTPRESET,
                             Constants.PROTOCOL_DATATYPE_SUREEXPOSURE,
                             Constants.PROTOCOL_DATATYPE_SUREIQ,
                             Constants.PROTOCOL_DATATYPE_OTHERS,
                             Constants.PROTOCOL_DATATYPE_VOICEPRESET];
    return protocolTypeArray;
}

/**
 * Get all supported protocol types except Others type.
 */
function getNonOthersProtocolTypes() {
    let protocolTypeArray = [
                             Constants.PROTOCOL_DATATYPE_EXAMPLAN,
                             Constants.PROTOCOL_DATATYPE_CONTRASTPRESET,
                             Constants.PROTOCOL_DATATYPE_SUREEXPOSURE,
                             Constants.PROTOCOL_DATATYPE_SUREIQ,
                             Constants.PROTOCOL_DATATYPE_VOICEPRESET];
    return protocolTypeArray;
}

/**
 * Get Voice Preset source file name from Changelog, Summary or History file name.
 * @param {String} filename Changelog, Summary or History file name
 */
function getVoicePresetSourceName( /* String */filename) {
    let sourceFileName = undefined;
    if (filename.endWith(Constants.PATH_FILE_NAME_SUFFIX_CHANGE_LOG)) {
        sourceFileName = filename.replace(Constants.PATH_FILE_NAME_SUFFIX_CHANGE_LOG, '');
    } else if (filename.endWith(Constants.PATH_FILE_NAME_SUFFIX_HISTORY)) {
        sourceFileName = filename.replace(Constants.PATH_FILE_NAME_SUFFIX_HISTORY, '');
    } else if (filename.endWith(Constants.PATH_FILE_NAME_SUFFIX_SUMMARY)) {
        sourceFileName = filename.replace(Constants.PATH_FILE_NAME_SUFFIX_SUMMARY, '');
    }

    return sourceFileName;
}

/**
 * Generate DICOM UID. The root is same with Protocol Management.
 * @return {String} uid. Return '' if error occurs.
 */
function generateUID() {
    try {
        let uuidArr = [];
        UUID.v1(null, uuidArr);
        let uid = Constants.DICOM_UID_ROOT + '.';
        uuidArr.forEach(function(num) {
            uid += ('000' + Number('0x' + num)).slice(-3); // Each number is 3 digit integer with left 0 padding
        });

        return uid;
    } catch (e) {
        log.error('Failed to generate UID');
        log.trace(e);
        return '';
    }
}

/**
 * Get data type configured in ApprovalSettings in config file.
 * @param approvalSettings
 * @return {Array} data type array configured in ApprovalSettings
 */
function getApprovalDistributionDataTypes(/* Group*/approvalSettings) {
    Assert.equal(arguments.length, getApprovalDistributionDataTypes.length,
        Message.ASSERT_MSG_INVALID_ARGUMENTS);
    let paramArr = approvalSettings.getAllParamsByName('ApprovalDistribution');
    paramArr = paramArr.concat(approvalSettings.getAllParamsByName('AutoDistribution'));
    let dataTypeArr = [];
    paramArr.forEach(function(param) {
        if (param) {
            dataTypeArr.push(param.value);
        }
    });
    return dataTypeArr;
}

/**
 * Check whether an object is null
 * @param object
 * @return {boolean}
 */
function isNull(object) {
    if (object == null || object === undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 * Escape special characters in XML.
 * @param charToEscape
 * @return escaped characters
 */
function escapeCharInXml(/* String */charToEscape) {
    if (!charToEscape) {
        return charToEscape;
    }

    let escapedChar = String(charToEscape).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/, '&apos;');
    return escapedChar;
}

/**
 * Get checksum by MD5 algorithm
 * @param {string} str
 * @return {string}
 */
function getChecksum(str) {
    if (isNull(str) || !isString(str) || isEmptyString(str)) {
        log.error('Input parameter can not be empty or is not string.');
        return null;
    }
    let md5SumObj = crypto.createHash('md5');
    md5SumObj.update(str);
    let md5Sum = md5SumObj.digest('hex');
    return md5Sum;
}

// ============================================================
exports.isArray = isArray;
exports.isString = isString;
exports.isNotString = isNotString;
exports.isEmptyString = isEmptyString;
exports.isNotEmptyString = isNotEmptyString;
exports.isEmpty = isEmpty;
exports.isValidProtocolType = isValidProtocolType;
exports.isValidApplyingStatus = isValidApplyingStatus;
exports.isValidApplyingStatusNewVersion = isValidApplyingStatusNewVersion;
exports.hasMetadata = hasMetadata;
exports.isNull = isNull;
exports.zeroPadding = zeroPadding;
// ------------------------------------------------------------
exports.convertPathToUnix = convertPathToUnix;
exports.getTempFolder = getTempFolder;
exports.getDownloadFolder = getDownloadFolder;
exports.getUploadFolder = getUploadFolder;
exports.getUnzipFolder = getUnzipFolder;
exports.getMultiZipFolder = getMultiZipFolder;
exports.getSettingName = getSettingName;
exports.deleteLocalFile = deleteLocalFile;
exports.escapeCharInXml = escapeCharInXml;
exports.getChecksum = getChecksum;
// ------------------------------------------------------------
exports.currentDateUTCString = currentDateUTCString;
exports.generateTimeStamp = generateTimeStamp;
exports.walkDirSync = walkDirSync;
exports.walkDirWithFilterSync = walkDirWithFilterSync;
exports.containsInvalidChar = containsInvalidChar;
exports.getEPNo = getEPNo;
exports.getAllProtocolTypes = getAllProtocolTypes;
exports.getNonOthersProtocolTypes = getNonOthersProtocolTypes;
exports.getVoicePresetSourceName = getVoicePresetSourceName;
exports.generateUID = generateUID;
// ------------------------------------------------------------
exports.getApprovalDistributionDataTypes = getApprovalDistributionDataTypes;
