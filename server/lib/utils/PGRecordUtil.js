/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

"use strict";
var Assert		= require('assert');
var Async 		= require('async');
var Path 		= require('path');
var Constants 	= require('../commons/Constants');
var Message 	= require('../commons/Message');
				  require('../utils/ArrayExtra');
var PGUtil		= require('../utils/PGUtil');
var PGFile		= require('../utils/PGFile');
var HistoryType = require('../dao/HistoryMetadataDao').HistoryType;
var log 		= require('../utils/PGLog').getLogger('PGRecordUtil');
//============================================================
/**
 * Read string array from record file
 * @param {String} path
 * @param {Function} callback(Error, Array<String>)
 */
function readRecordsFile(path, callback){
	Assert.equal(readRecordsFile.length, arguments.length , 
		Message.ASSERT_MSG_INVALID_ARGUMENTS);
	var uidsArray = [];
	var uidsRecordFile = new PGFile(path);
	if(uidsRecordFile.exists()){
		uidsRecordFile.readFile({encoding:Constants.ENCODING_UTF8}, 
			function(err, jsonStr){
			if(!!err){
				callback(err);
				return;
			}
			var uidsArray;
			try{
				uidsArray = JSON.parse(jsonStr);
			}catch(err){
				log.warn(err);
				log.trace(err);
			}
			callback(null, uidsArray);
		});
	}else{
		callback();
	}
}

/**
 * Write string array to record file
 * @param {Array<String>} uidsArray
 * @param {String} path
 * @param {Function} callback(Error)
 */
function writeRecordsFile(uidsArray, path, callback){
	Assert.equal(writeRecordsFile.length, arguments.length , 
		Message.ASSERT_MSG_INVALID_ARGUMENTS);
	var uidsRecordFile = new PGFile(path);
	Async.waterfall([
	    // Create parent folder.
		function(innerCB) {
			uidsRecordFile.getParentFile().ensureDir(function(err){
				innerCB(err);
			});
		},
		// Read old uids in record file.
		function(innerCB) {
			readRecordsFile(path, function(err, uidsArray){
				innerCB(err, uidsArray);
			});
		},
		// Merge arrays
		function(oldUIDsArray, innerCB) {
			var newUIDsArray;
			if(!!oldUIDsArray && oldUIDsArray.length != 0){
				newUIDsArray = merge(oldUIDsArray, uidsArray);
			}else{
				newUIDsArray = uidsArray;
			}
			innerCB(null, newUIDsArray);
		},
		// Wirte uids to record file.
		function(newUIDsArray, innerCB) {
			var data = JSON.stringify(newUIDsArray);
			uidsRecordFile.writeFile(data,innerCB);
		}],
		function(err) {
			callback(err);
		}
	);
}

/**
 * Merge newArray into toArray
 * @param {Array<String>} toArray
 * @param {Array<String>} newArray
 */
function merge(toArray, newArray){
	Assert.ok(toArray instanceof Array , Message.ASSERT_MSG_INVALID_ARGUMENTS);
	var needArray = new Array();
	newArray.forEach(function(newValue){
		if(!(toArray.contains(newValue))){
			needArray.push(newValue);
		}
	});
	return toArray.concat(needArray);
}

/**
 * readRecords(callback(err, uidsArray, othersPathsArray))
 * 
 * Read uid string array from record file;
 * Read others type protocol file path array from record file;
 * @param machineName
 * @param {String} historyType
 * @param {Function} callback(Error, Array<String>, Array<String>)
 * if the record is not exist, the array is null
 */
function readRecords(machineName, historyType, callback){
	Assert.equal(readRecords.length, arguments.length, 
		Message.ASSERT_MSG_INVALID_ARGUMENTS);
	if(!machineName){
		callback(new Error('machineName can not be null'));
		return;
	}
	Async.waterfall([
		function(innerCB) {
            var fileName = historyType === HistoryType.HISTORY ?
                Constants.PATH_FILE_TMP_FILES_UID_LIST : Constants.PATH_FILE_TMP_FILES_UID_LIST_IN_TRANSFERS;
			var path = PGUtil.getTempFolder(machineName, fileName);
			readRecordsFile(path, function(err, uidsArray){
				innerCB(err, uidsArray);
			});
		},
		function(uidsArray, innerCB){
            var othersFileName = historyType === HistoryType.HISTORY ?
                Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST : Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST_IN_TRANSFERS;
			var path = PGUtil.getTempFolder(machineName, othersFileName);
			readRecordsFile(path, function(err, othersPathsArray){
				innerCB(err, uidsArray, othersPathsArray);
			});
		}],
		function(err, uidsArray, othersPathsArray){
			callback(err, uidsArray, othersPathsArray);
		}
	);
}
/**
 * Write uid string array to record file
 * Write uid string array to record file
 * @param {Array<String>} uidsArray
 * @param {Array<String>} pathsArray
 * @param {String} machineName
 * @param {Function} callback(Error)
 */
function writeRecords(uidsArray, pathsArray, machineName, callback){
	Assert.equal(writeRecords.length, arguments.length, 
		Message.ASSERT_MSG_INVALID_ARGUMENTS);
	if(!machineName){
		callback(new Error('machineName can not be null'));
		return;
	}
	Async.waterfall([
		function(innerCB) {
			if(!uidsArray || uidsArray.length == 0){
				innerCB(null);
				return;
			}
			var path = PGUtil.getTempFolder(machineName, Constants.PATH_FILE_TMP_FILES_UID_LIST);
			writeRecordsFile(uidsArray, path, innerCB);
		},
		function(innerCB){
			if(!pathsArray || pathsArray.length == 0){
				innerCB(null);
				return;
			}
			var path = PGUtil.getTempFolder(machineName, Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST);
			writeRecordsFile(pathsArray, path, innerCB);
		}],
		function(err){
			callback(err);
		}
	);
}

/**
 * Write uid string array in Transfers folder to record file
 * Write uid string array to record file
 * @param {Array<String>} uidsArray
 * @param {Array<String>} pathsArray
 * @param {String} machineName
 * @param {Function} callback(Error)
 */
function writeRecordsOfGetTransfer(uidsArray, pathsArray, machineName, callback){
    Assert.equal(writeRecords.length, arguments.length,
        Message.ASSERT_MSG_INVALID_ARGUMENTS);
    if(!machineName){
        callback(new Error('machineName can not be null'));
        return;
    }
    Async.waterfall([
        function(innerCB) {
            if(!uidsArray || uidsArray.length == 0){
                innerCB(null);
                return;
            }
            var path = PGUtil.getTempFolder(machineName, Constants.PATH_FILE_TMP_FILES_UID_LIST_IN_TRANSFERS);
            writeRecordsFile(uidsArray, path, innerCB);
        },
        function(innerCB){
            if(!pathsArray || pathsArray.length == 0){
                innerCB(null);
                return;
            }
            var path = PGUtil.getTempFolder(machineName, Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST_IN_TRANSFERS);
            writeRecordsFile(pathsArray, path, innerCB);
        }],
        function(err){
            callback(err);
        }
    );
}

/**
 * delete record files
 * @param {String} machineName
 * @param {Function} callback(err)
 */
function deleteRecords(machineName, callback){
	var path_uids = PGUtil.getTempFolder(machineName, Constants.PATH_FILE_TMP_FILES_UID_LIST);
	console.log('deleteRecords step1 ok');
	var uidsRecordFile = new PGFile(path_uids);
	console.log('deleteRecords step2 ok');
	uidsRecordFile.deleteFile(function(err){
		if(err){
			callback(err);
			return;
		}
		console.log('deleteRecords step3 ok');
		var path_others_paths = PGUtil.getTempFolder(machineName, Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST);
		console.log('deleteRecords step4 ok');
		var pathsRecordFile = new PGFile(path_others_paths);
		console.log('deleteRecords step5 ok');
		pathsRecordFile.deleteFile(callback);
		console.log('deleteRecords step6 ok');
	});
}
function deleteRecordsSync(machineName, historyType){
    var fileName = historyType === HistoryType.HISTORY ?
        Constants.PATH_FILE_TMP_FILES_UID_LIST : Constants.PATH_FILE_TMP_FILES_UID_LIST_IN_TRANSFERS;
	var path_uids = PGUtil.getTempFolder(machineName, fileName);

    var otherFileName = historyType === HistoryType.HISTORY ?
        Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST : Constants.PATH_FILE_TMP_FILES_OTHERS_PATH_LIST_IN_TRANSFERS;

	var path_others_paths = PGUtil.getTempFolder(machineName, otherFileName);
	var uidsRecordFile = new PGFile(path_uids);
	var pathsRecordFile = new PGFile(path_others_paths);

	// uidsRecordFile.deleteFileSync();
	// pathsRecordFile.deleteFileSync();
	PGUtil.deleteLocalFile(uidsRecordFile.getParentFile());
}

//============================================================
exports.readRecords = readRecords;
exports.writeRecords = writeRecords;
exports.writeRecordsOfGetTransfer = writeRecordsOfGetTransfer;
exports.deleteRecords = deleteRecords;
exports.deleteRecordsSync = deleteRecordsSync;
