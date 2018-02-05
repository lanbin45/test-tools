/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Path = require('path');
const FS = require('fs-extra');
const Readable = require('stream').Readable;
const unzip = require('unzip');
const Message = require('../commons/Message');
const Constants = require('../commons/Constants');
const PGArchiver = require('../utils/PGArchiver');
const PGFile = require('../utils/PGFile');
const PGUtil = require('../utils/PGUtil');
const log = require('../utils/PGLog').getLogger('PGZip');
// ============================================================

/**
 * Zip all files in one directory into a zip file.
 * @param {Object} zipParam includes source files directory path and destination path.
 * @param {Function} callback
 */
function zipDirectory(zipParam, callback) {
    let targetPath = zipParam.targetPath;
    let srcPath = zipParam.srcPath;

    if (typeof srcPath !== 'string' || !srcPath) {
        callback(new Error(Message.ASSERT_MSG_INVALID_ARGUMENTS));
        return;
    }
    if (typeof targetPath !== 'string' || !targetPath) {
        targetPath = '';
    }

    let zipNameWithSuffix = targetPath;
    // if (!zipNameWithSuffix.endWith('\\' + Constants.ZIP_SUFFIX)) {
    if (!zipNameWithSuffix.endsWith(Constants.ZIP_SUFFIX)) {
        zipNameWithSuffix = targetPath + Constants.ZIP_SUFFIX;
    }

    try {
        let archive = new PGArchiver(zipNameWithSuffix);
        archive.directory(srcPath);
        archive.finalizeAndPipe(function() {
            callback(null, targetPath);
        });
    } catch (err) {
        log.error('Failed to archive directory. Error is ' + err.stack);
        callback(err, null);
    }
}

/**
 * Zip all files in one directory into a zip file.
 * @param {Object} zipParam includes source files directory path and destination directory path.
 * @param {String} zipName zip name (including '.zip' suffix or not are both OK)
 * @param {String} subDirectory sub directory name in zip file
 * @param {Function} callback
 */
function zipDirectoryByName(zipParam, zipName, subDirectory, callback) {
    try {
        let targetPath = zipParam.targetPath;
        let srcPath = zipParam.srcPath;
        if (typeof subDirectory === 'function') {
            callback = subDirectory;
            subDirectory = undefined;
        }
        if ((typeof srcPath !== 'string' || !srcPath) ||
            (typeof zipName !== 'string' || !zipName)) {
            callback(new Error(Message.ASSERT_MSG_INVALID_ARGUMENTS));
            return;
        }
        if (typeof targetPath !== 'string' || !targetPath) {
            targetPath = '';
        }

        let zipWithSuffix = zipName;
        if (!zipName.endWith('\\' + Constants.ZIP_SUFFIX)) {
            zipWithSuffix = zipName + Constants.ZIP_SUFFIX;
        }

        let targetWholePath = Path.join(targetPath, zipWithSuffix);
        let archiver = new PGArchiver(targetWholePath);
        archiver.directory(srcPath, subDirectory);
        archiver.finalizeAndPipe(function() {
            callback(null, targetWholePath);
        });
    } catch (err) {
        log.error('Fail to archive files in a directory by name. Error is ' + err.stack);
        callback(err, null);
    }
}

/**
 * Unzip a zip file to given directory. If unzip directory is not given, unzip the file to the directory same name with
 * the zip file and under the same directory with the zip file.
 * 
 * @param {String} zipFilePath path of the file to unzip
 * @param {String} unzipDir directory of the file to unzip to 
 * @param {Function} callback(err, unzipDir) unzipDir: the absolute path of the unzipped directory
 */
function unzipFile(zipFilePath, unzipDir, callback) {
    if (arguments.length < 2 || typeof callback !== 'function') {
        callback(Message.ASSERT_MSG_INVALID_ARGUMENTS);
        return;
    }
    if (!PGUtil.isString(zipFilePath)) {
        callback(new Error('Invalid arguments. Zip file path must be a string.'));
        return;
    }

    if (!new PGFile(zipFilePath).exists()) {
        callback(new Error('Zip file does not exist.'));
    }

    if (arguments.length === 2 && typeof unzipDir === 'function') {
        callback = unzipDir;
        unzipDir = Path.resolve(zipFilePath.replace(Constants.PATH_ZIP, ''));
    }

    if (!PGUtil.isString(unzipDir)) {
        callback(new Error('Unzip folder should be a string.'));
        return;
    }

    unzipStream(FS.createReadStream(zipFilePath), unzipDir, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(err, Path.resolve(unzipDir));
        }
    });
}

/**
 * Unzip a stream to given directory. The stream must be a readable stream.
 * 
 * @param {stream.Readable} data stream data to unzip
 * @param {String} unzipDir unzip directory
 * @param {Function} callback(err)
 */
function unzipStream(data, unzipDir, callback) {
    if (!data) {
        callback(new Error('Unzip failed because zip file is empty.'));
        return;
    }

    if (!(data instanceof Readable)) {
        callback(new Error('Unzip failed because zip file is not a correct stream.'));
        return;
    }

    if (!PGUtil.isString(unzipDir)) {
        data.resume();
        callback(new Error('Unzip folder should be a string.'));
        return;
    }

    data.on('error', function(err) {
        log.error('Stream data error, ' + err.stack);
        callback(err);
    });
    data.on('end', function() {
        log.debug('Stream data has been end.');
    });
    data.pipe(unzip.Extract({
        path: Path.resolve(unzipDir)
    })).on('error', function(err) {
        log.error('Unzip error, ' + err.stack);
        callback(err);
    }).on('close', function() {
        log.info('Finished unzipping data to ' + unzipDir);
        callback();
    });
}

// ===========================================================
module.exports.unzipFile = unzipFile;
module.exports.unzipStream = unzipStream;
module.exports.zipDirectory = zipDirectory;
module.exports.zipDirectoryByName = zipDirectoryByName;
