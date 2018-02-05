/**
 * Copyright: Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to provide common services.
 */

 'use strict';

 const Async = require('async');
 const Dir = require('node-dir');
 const PGZip = require('../utils/PGZip');
 const PGXml = require('../utils/PGXml');
 const Setting = require('../Setting');
 const Path = require('path');
 const Constants = require('../commons/Constants');
 const IUtils = require('../utils/IUtils');
 const ReturnParameters = require('../model/ReturnParameters');

 const log = require('../utils/PGLog').getLogger('IService');

 // ============================================================

/**
 * Unzip zipped file array.
 * @param {Array} zipArray 
 * @param {Function} callback 
 */
 function unzipZippedFile(zipArray, callback) {
    if (!zipArray || zipArray.length <= 0) {
        log.info('No zip file to be unzip.');
        callback(null, []);
        return;
    }
    let tempFolderName = Path.join(process.cwd(), Setting.CTConfig.tempFolderPath, 'unzipFiles');
    let arraySize = zipArray.length;
    let index = 0;
    Async.waterfall([
        function(innerCB) {
            Async.whilst(
                function() {
                    return index < arraySize;
                },
                function(eachCB) {
                    let zipPath = zipArray[index].zipPath;
                    if (!zipPath) {
                        log.warn('One zip file has no path.');
                        eachCB(null);
                        return;
                    }
                    PGZip.unzipFile(zipPath, tempFolderName, (err) => {
                        if (!!err) {
                            let msg = `Fail to unzip file: ${zipPath}`;
                            log.error(msg);
                            eachCB(msg);
                            return;
                        }
                        ++index;
                        eachCB(null);
                    });
                },
                function(errMsg) {
                    if (!!errMsg) {
                        innerCB(errMsg);
                        return;
                    }
                    innerCB(null);
                }
            );
        },
        function(innerCB) {
            Dir.files(tempFolderName, (err, fileNames) => {
                if (!!err) {
                    let msg = 'Fail to list files in directory: ' + tempFolderName;
                    log.error(msg);
                    innerCB(msg);
                    return;
                }
                if (!fileNames || fileNames.length <= 0) {
                    let msg = 'No protocol file is in the zip file!';
                    log.info(msg);
                    innerCB(null, []);
                } else {
                    innerCB(null, fileNames);
                }
            });
        }
    ],
        function(errMsg, pathArray) {
            callback(errMsg, pathArray);
        }
    );
 };

 /**
  * Parse files and get protocol parameters array.
  * @param {Array} pathArray 
  * @param {Function} callback
  */
function parseFiles(pathArray, callback) {
    if (!pathArray || pathArray.length <= 0) {
        let msg = 'No files to be parsed.';
        callback(msg);
        return;
    }
    let paramsArray = [];
    Async.waterfall([
        function(innerCB) {
            let protocolMap = getProtocolFileMap(pathArray);
            if (!protocolMap) {
                let msg = 'Fail to classify protocols.';
                log.error(msg);
                innerCB(msg);
                return;
            }
            innerCB(null, protocolMap);
        },
        function(protocolMap, innerCB) {
            let nameArray = Object.keys(protocolMap);
            Async.eachLimit(nameArray, 10, (oneProtocol, eachCB) => {
                let files = protocolMap[oneProtocol];
                if (!files) {
                    eachCB(null);
                    return;
                }
                let summaryFile = IUtils.getDatPath(files);
                let historyFile = IUtils.getHistoryPath(files);
                if (!summaryFile || !historyFile) {
                    log.warn(`Protocol ${oneProtocol} is lack of summary or history file.`);
                    eachCB(null);
                    return;
                }
                PGXml.parseXmlFile(historyFile, (err, root) => {
                    if (!!err) {
                        log.error('Fail to parse history file.');
                        eachCB('Fail to parse history file.');
                        return;
                    }
                    let params = new ReturnParameters();
                    getParamsFromHistory(root, params);
                    PGXml.parseXmlFile(summaryFile, (terr, summaryRoot) => {
                        if (!!terr) {
                            log.error('Fail to parse summary file.');
                            eachCB('Fail to parse summary file.');
                            return;
                        }
                        getParamsFromSummary(summaryRoot, params);
                        paramsArray.push(params.toObj());
                        eachCB(null);
                    });
                });
            }, (errMsg) => {
                innerCB(errMsg);
            });
        }],
        function(errMsg) {
            callback(errMsg, paramsArray);
        }
    );
}

/**
 * Classify protocol file paths by epNo(ExamPlan).
 * 
 * @param {Array<String>} protocolFilesArray
 * @return {Object} protocol file map key: EPNo/PresetName, value: File path array of the protocol
 *    {
 *        ep_000 : [ep_000.dat, ep_000.xml, ep_000_changelog.xml], 
 *        Adult_Head_CBP : [Adult_Head_CBP.xml, Adult_Head_CBP_changelog.xml]
 *    }
 */
function getProtocolFileMap(protocolFilesArray) {
    let protocolFileMap = {};
    let valid = protocolFilesArray.every(function(protocolFilePath/* , index, array*/) {
        let protocolFileName = Path.basename(protocolFilePath);
        let protocolName;
        if (IUtils.isChangelogPathname(protocolFileName)) {
            protocolName = protocolFileName.replace(Constants.PATH_FILE_NAME_SUFFIX_CHANGE_LOG, '');
        } else if (IUtils.isSummaryPathname(protocolFileName)) {
            protocolName = protocolFileName.replace(Constants.PATH_FILE_NAME_SUFFIX_SUMMARY, '');
        } else if (IUtils.isHistoryPathname(protocolFileName)) {
            protocolName = protocolFileName.replace(Constants.PATH_FILE_NAME_SUFFIX_HISTORY, '');
        } else if (IUtils.isDatPathname(protocolFileName)) {
            if (protocolFileName.indexOf(Constants.PATH_FILE_NAME_MULTI_DAT_LABEL) === -1) {
                protocolName = protocolFileName.replace(Constants.PATH_FILE_NAME_SUFFIX_SOURCE, '');
            }
            // else {
            //     // Multiple dat. Name format: ep{EPNo}SERD{SeqNo}.dat
            //     let epNo = protocolFileName.substring(2,
            //         protocolFileName.indexOf(Constants.PATH_FILE_NAME_MULTI_DAT_LABEL));
            //     protocolName = Constants.PATH_FILE_NAME_PREFIX_EXAMPLAN + epNo;
            // }
        } else {
            log.error('Validate protocol file failed. Invalid protocol file type: ' + protocolFileName);
            return false;
        }

        let fileArray = protocolFileMap[protocolName];
        if (!fileArray) {
            fileArray = [];
        }
        fileArray.push(protocolFilePath);
        protocolFileMap[protocolName] = fileArray;
        return true;
    });

    return valid? protocolFileMap: null;
}

/**
 * Get parameters from summary file.
 * @param {Root} root 
 * @param {ReturnParameters} paramObj
 */
function getParamsFromSummary(root, paramObj) {
    if (!root) {
        return;
    }
    if (!paramObj) {
        paramObj = new ReturnParameters();
    }
    let commonGroup = root.getSingleGroupByName('Common');
    if (!!commonGroup) {
        let eptypeParam = commonGroup.getSingleParamByName('EPType');
        paramObj['epType'] = !!eptypeParam ? eptypeParam.value : null;

        let epnoParam = commonGroup.getSingleParamByName('EPNumber');
        paramObj['epNo'] = !!epnoParam ? epnoParam.value : null;

        let epNameParam = commonGroup.getSingleParamByName('EPName');
        paramObj['epName'] = !!epNameParam ? epNameParam.value : null;

        let organParam = commonGroup.getSingleParamByName('Organ');
        paramObj['organ'] = !!organParam ? organParam.value : null;

        let patientPositionParam = commonGroup.getSingleParamByName('PatientPosition');
        paramObj['patientPosition'] = !!patientPositionParam ? patientPositionParam.value : null;

        let patientTypeParam = commonGroup.getSingleParamByName('PatientType');
        paramObj['patientType'] = !!patientTypeParam ? patientTypeParam.value : null;
    }

    let scanListGroup = root.getSingleGroupByName('ScanList');
    if (!scanListGroup) {
        return;
    }

    let scanModeGroup = scanListGroup.getSingleGroupByName('ScanMode');
    if (!scanModeGroup) {
        return;
    }
    let scanParamGroup = scanModeGroup.getSingleGroupByName('Scan Parameters');
    if (!!scanParamGroup) {
        let ceParam = scanParamGroup.getSingleParamByName('CE');
        paramObj['ce'] = !!ceParam ? ceParam.value : null;

        let collimationParam = scanParamGroup.getSingleParamByName('Collimation');
        paramObj['collimation'] = !!collimationParam ? collimationParam.value : null;

        let directionParam = scanParamGroup.getSingleParamByName('Direction');
        paramObj['direction'] = !!directionParam ? directionParam.value : null;

        let kvParam = scanParamGroup.getSingleParamByName('kV');
        paramObj['kV'] = !!kvParam ? kvParam.value : null;

        let maParam = scanParamGroup.getSingleParamByName('mA');
        paramObj['mA'] = !!maParam ? maParam.value : null;

        let pitchParam = scanParamGroup.getSingleParamByName('Pitch');
        paramObj['pitch'] = !!pitchParam ? pitchParam.value : null;

        let rangeParam = scanParamGroup.getSingleParamByName('Range');
        paramObj['range'] = !!rangeParam ? rangeParam.value : null;

        let rotationParam = scanParamGroup.getSingleParamByName('RotationTime');
        paramObj['rotationTime'] = !!rotationParam ? rotationParam.value : null;

        let scanModeParam = scanParamGroup.getSingleParamByName('ScanMode');
        paramObj['scanMode'] = !!scanModeParam ? scanModeParam.value : null;

        let ctdiParam = scanParamGroup.getSingleParamByName('CTDI');
        paramObj['ctdi'] = !!ctdiParam ? ctdiParam.value : null;

        let dlpParam = scanParamGroup.getSingleParamByName('DLP');
        paramObj['dlp'] = !!dlpParam ? dlpParam.value : null;

        let notificationDlpParam = scanParamGroup.getSingleParamByName('NotificationDLP');
        paramObj['notificationDLP'] = !!notificationDlpParam ? notificationDlpParam.value : null;

        let notificationCtdiParam = scanParamGroup.getSingleParamByName('NotificationCTDI');
        paramObj['notificationCTDI'] = !!notificationCtdiParam ? notificationCtdiParam.value : null;
    }

    let reconParamGroup = scanModeGroup.getSingleGroupByName('Recon Parameters');
    if (!!reconParamGroup) {
        let allGroups = reconParamGroup.getAllGroups();
        if (!allGroups || allGroups.length <= 0) {
            return;
        }
        let targetGroup = allGroups[0];
        if (!!targetGroup) {
            let centerxyParam = targetGroup.getSingleParamByName('CenterXY');
            paramObj['centerxy'] = !!centerxyParam ? centerxyParam.value : null;

            let dfovParam = targetGroup.getSingleParamByName('D-FOV');
            paramObj['dFOV'] = !!dfovParam ? dfovParam.value : null;

            let endPositionParam = targetGroup.getSingleParamByName('EndPosition');
            paramObj['endPosition'] = !!endPositionParam ? endPositionParam.value : null;

            let noOfImagesParam = targetGroup.getSingleParamByName('NoOfImages');
            paramObj['noOfImages'] = !!noOfImagesParam ? noOfImagesParam.value : null;

            let sliceIntervalParam = targetGroup.getSingleParamByName('SliceInterval');
            paramObj['sliceInterval'] = !!sliceIntervalParam ? sliceIntervalParam.value : null;

            let sliceThicknessParam = targetGroup.getSingleParamByName('SliceThickness');
            paramObj['sliceThickness'] = !!sliceThicknessParam ? sliceThicknessParam.value : null;

            let startPositionParam = targetGroup.getSingleParamByName('StartPosition');
            paramObj['startPosition'] = !!startPositionParam ? startPositionParam.value : null;

            let totalImagesParam = targetGroup.getSingleParamByName('TotalImages');
            paramObj['totalImages'] = !!totalImagesParam ? totalImagesParam.value : null;

            let urgenReconParam = targetGroup.getSingleParamByName('UrgentRecon');
            paramObj['urgentRecon'] = !!urgenReconParam ? urgenReconParam.value : null;

            let variAreaParam = targetGroup.getSingleParamByName('Vari-Area');
            paramObj['variArea'] = !!variAreaParam ? variAreaParam.value : null;

            let wl1Param = targetGroup.getSingleParamByName('WL1');
            paramObj['wl1'] = !!wl1Param ? wl1Param.value : null;

            let wl2Param = targetGroup.getSingleParamByName('WL2');
            paramObj['wl2'] = !!wl2Param ? wl2Param.value : null;

            let wl3Param = targetGroup.getSingleParamByName('WL3');
            paramObj['wl3'] = !!wl3Param ? wl3Param.value : null;

            let ww1Param = targetGroup.getSingleParamByName('WW1');
            paramObj['ww1'] = !!ww1Param ? ww1Param.value : null;

            let ww2Param = targetGroup.getSingleParamByName('WW2');
            paramObj['ww2'] = !!ww2Param ? ww2Param.value : null;

            let ww3Param = targetGroup.getSingleParamByName('WW3');
            paramObj['ww3'] = !!ww3Param ? ww3Param.value : null;
        }
    }

    return;
}

/**
 * Get parameters from history file.
 * @param {Root} root 
 * @param {ReturnParameters} paramObj
 */
function getParamsFromHistory(root, paramObj) {
    if (!root) {
        return;
    }
    if (!paramObj) {
        paramObj = new ReturnParameters();
    }
    let headerGroup = root.getSingleGroupByName('Header');
    if (!headerGroup) {
        return;
    }

    let uidParam = headerGroup.getSingleParamByName('UID');
    paramObj['uid'] = !!uidParam ? uidParam.value : null;

    let versionParam = headerGroup.getSingleParamByName('Version');
    paramObj['version'] = !!versionParam ? versionParam.value : null;

    let tempUIDParam = headerGroup.getSingleParamByName('TempUID');
    paramObj['tempUID'] = !!tempUIDParam ? tempUIDParam.value : null;
    return;
}

exports.unzipZippedFile = unzipZippedFile;
exports.parseFiles = parseFiles;
