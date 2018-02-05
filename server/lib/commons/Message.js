/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
"use strict";
var Constants = require('../commons/Constants');

var SC_OK = 200;
var SC_ACCEPTED = 202;
var SC_NO_CONTENT = 204;
var SC_INTERNAL_SERVER_ERROR = 500;
var SC_BAD_REQUEST = 400;
var SC_FORBIDDEN = 403;
var SC_NOT_FOUND = 404;
var SC_CONFLICT_REQUEST = 409;
var RESPONSE_MSG_INTERNAL_SERVER_ERROR = "Protocol Management has error internally.";
	
/**
 * Message
 * This class is for log message.
 */
module.exports = {
	// Response Message
	RESPONSE_CODE_SUCCESS: SC_OK,
	RESPONSE_MSG_SUCCESS: "Success",
	RESPONSE_MSG_SUCCESS_PUT_REQUESTED_PROTOCOL:'Protocol Management put requested protocol in Protocol Pool successfully.',
	RESPONSE_MSG_SUCCESS_EXPORT_NO_DATA: 'There is no data to backup.',
	RESPONSE_MSG_SUCCESS_IMPORT_NO_DATA: 'There is no data to restore.',
	
	RESPONSE_CODE_NOT_FUND:SC_NOT_FOUND,
	RESPONSE_MSG_NOT_FUND:"Scan Console is mistaken URI.",
	RESPONSE_MSG_SETTING_NOT_EXIST: Constants.PATH_FILE_NAME_PM_CONFIG + " file does not exist.",

    RESPONSE_CODE_NOT_FOUND_MACHINE: SC_NOT_FOUND,
    RESPONSE_MSG_NOT_FOUND_MACHINE: "Requested machine is not found.",

	RESPONSE_CODE_INTERNAL_SERVER_ERROR: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_INTERNAL_SERVER_ERROR: RESPONSE_MSG_INTERNAL_SERVER_ERROR,
	
	RESPONSE_CODE_ACCEPTED: SC_ACCEPTED,
	RESPONSE_CODE_NO_CONTENT: SC_NO_CONTENT,
	RESPONSE_MSG_BACKUP_IN_PROGRESS: "Backing up now.",
	RESPONSE_MSG_RESTORE_IN_PROGRESS: "Restoring protocols now.",

	RESPONSE_CODE_CONFLICT: SC_CONFLICT_REQUEST,
	RESPONSE_MSG_CONFLICT: "Same Scanner Request is being processed, please try it later.",

    RESPONSE_MSG_DO_NOTHING : "Do nothing because UNDO value is false.",

    RESPONSE_CODE_LOCK_CONFLICT: SC_CONFLICT_REQUEST,
	RESPONSE_MSG_LOCK_CONFLICT: "Requested Scanner Group is being processed, please try it later.",

	/*
	 * Bad request parameters.
	 */
	RESPONSE_CODE_BAD_REQUEST_PARAMS: SC_BAD_REQUEST,
	RESPONSE_MSG_BAD_REQUEST_PARAMS: "Scan Console fails to include mandatory conditions.",

	RESPONSE_CODE_NOT_SUPPORTTED_PARAMS: SC_BAD_REQUEST,
	RESPONSE_MSG_NOT_SUPPORTTED_PARAMS: "The DataType is not supported.",
	RESPONSE_MSG_FAIL_TO_ATTACH_FILE: "Scan Console fails to attach zipped file.",

	/*
	 * Bad request parameter: ZippedFile.
	 */
	RESPONSE_CODE_BAD_REQUEST_PARAMS_ZIPPED_NAME: SC_BAD_REQUEST,
	RESPONSE_MSG_BAD_REQUEST_PARAMS_ZIPPED_NAME: "The request parameter filename is invalid. DataType:%s Filename:%s",

	RESPONSE_CODE_MACHINE_NAME_NOT_FOUND: SC_BAD_REQUEST,
	RESPONSE_MSG_MACHINE_NAME_NOT_FOUND: "Requested Machine Name is not found in ProtocolPool.",
	RESPONSE_CODE_MACHINE_NAME_NOT_FOUND_IN_CONFIG: SC_BAD_REQUEST,
	
	RESPONSE_MSG_MACHINE_HISTORY_NOT_FOUND: "Protocol Server has no the history files of the requested machine.",
	RESPONSE_CODE_MACHINE_HISTORY_NOT_FOUND: SC_BAD_REQUEST,

	RESPONSE_MSG_MACHINE_REQUEST_NOT_FOUND: "Protocol Server has no the request files of the requested machine.",
	RESPONSE_CODE_MACHINE_REQUEST_NOT_FOUND: SC_BAD_REQUEST,

	LOG_MSG_MACHINE_NAME_NOT_FOUND_IN_CONFIG: "Requested Machine Name is not found in " + Constants.PATH_FILE_NAME_PM_CONFIG + ".",

	RESPONSE_CODE_TRANSFER_FILE_FAILED: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_TRANSFER_FILE_FAILED: RESPONSE_MSG_INTERNAL_SERVER_ERROR,
	LOG_MSG_TRANSFER_FILE_FAILED: "Fail to transfer the received file to the given destination file.Path:\"%s\"",

	RESPONSE_CODE_FAIL_TO_UNZIP: SC_BAD_REQUEST,
	RESPONSE_MSG_FAIL_TO_UNZIP: "Protocol Management fails to open (unzip) attached file.",
	LOG_MSG_FAIL_TO_UNZIP: "Protocol Management fails to open (unzip) attached file.",

	RESPONSE_CODE_FAIL_TO_ZIP: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_FAIL_TO_ZIP: "Protocol Management fails to zip protocol in ProtocolPool.",
	LOG_MSG_FAIL_TO_ZIP: "Protocol Management fails to zip protocol in ProtocolPool.",

	RESPONSE_CODE_FAIL_TO_VALIDATE_PROTOCOL_FILES: SC_BAD_REQUEST,
	RESPONSE_MSG_FAIL_TO_VALIDATE_PROTOCOL_FILES: "The content of attached file is not correct.",
	LOG_MSG_FAIL_TO_VALIDATE_PROTOCOL_FILES: "The content of attached file is not correct.",

    RESPONSE_CODE_CHANGELOG_FILE_VERSION_EMPTY: SC_BAD_REQUEST,
    RESPONSE_MSG_CHANGELOG_FILE_VERSION_EMPTY: "Changelog file version is missing.",
    LOG_MSG_CHANGELOG_FILE_VERSION_EMPTY: "Changelog file version is missing.",

    RESPONSE_CODE_FAIL_TO_VALIDATE_CHANGELOG_FILE: SC_BAD_REQUEST,
    RESPONSE_MSG_FAIL_TO_VALIDATE_CHANGELOG_FILE: "Changelog file UID is missing.",
    LOG_MSG_FAIL_TO_VALIDATE_CHANGELOG_FILE: "Changelog file UID is missing.",

    RESPONSE_CODE_UID_CONFLICT_IN_CHANGELOG_AND_REQUEST_UID: SC_BAD_REQUEST,
    RESPONSE_MSG_UID_CONFLICT_IN_CHANGELOG_AND_REQUEST_UID: "UID is not same in changelog file and request UID.",
    LOG_MSG_UID_CONFLICT_IN_CHANGELOG_AND_REQUEST_UID: "UID is not same in changelog file and request UID.",

    RESPONSE_CODE_CONTENT_CORRUPTED: SC_BAD_REQUEST,
    RESPONSE_MSG_CONTENT_CORRUPTED: "XML file is corrupted.",
    LOG_MSG_CONTENT_CORRUPTED: "XML file is corrupted.",

    RESPONSE_CODE_XML_EMPTY: SC_BAD_REQUEST,
    RESPONSE_MSG_XML_EMPTY: "XML root or save path is empty.",
    LOG_MSG_XML_EMPTY: "XML root or save path is empty.",

    RESPONSE_CODE_FAILE_PARSE_XML: SC_BAD_REQUEST,
    RESPONSE_MSG_FAILE_PARSE_XML: "Fail to parse XML file.",
    LOG_MSG_FAILE_PARSE_XML: "Fail to parse XML file.",

    RESPONSE_CODE_DEPENDENCY_INCORRECT: SC_BAD_REQUEST,
    RESPONSE_MSG_DEPENDENCY_INCORRECT: "Voice language dependency xml is not correct.",
    LOG_MSG_DEPENDENCY_INCORRECT: "Voice language dependency xml is not correct.",

    RESPONSE_CODE_NOT_FOUND_LANGUAGE_DEPENDENCY: SC_BAD_REQUEST,
    RESPONSE_MSG_NOT_FOUND_LANGUAGE_DEPENDENCY: "Voice language dependency file is not found.",

	RESPONSE_CODE_FAIL_TO_PUT_PROTOCOL_IN_PROTOCOL_POOL: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_FAIL_TO_PUT_PROTOCOL_IN_PROTOCOL_POOL: "Protocol Management fails to put protocol in ProtocolPool.",
	LOG_MSG_FAIL_TO_PUT_PROTOCOL_IN_PROTOCOL_POOL: "Protocol Management fails to put protocol in ProtocolPool.",
	
	RESPONSE_CODE_FAIL_TO_PUT_PROTOCOLS_TO_MASTER_LIST: SC_INTERNAL_SERVER_ERROR,
    RESPONSE_MSG_FAIL_TO_PUT_PROTOCOLS_TO_MASTER_LIST: "Protocol Management fails to put protocols to Protocol Pool Master List.",
    LOG_MSG_FAIL_TO_PUT_PROTOCOLS_TO_MASTER_LIST: "Protocol Management fails to put protocols to Protocol Pool Master List.",

    RESPONSE_CODE_FAILE_CALCULATE_CHECKSUM: SC_BAD_REQUEST,
    RESPONSE_MSG_FAILE_CALCULATE_CHECKSUM: "Failed to calculate checksum for invalid parameter.",
    LOG_MSG_FAILE_CALCULATE_CHECKSUM: "Failed to calculate checksum for invalid parameter.",

    RESPONSE_CODE_PARAM_OR_CONFIG_EMPTY: SC_BAD_REQUEST,
    RESPONSE_MSG_PARAM_OR_CONFIG_EMPTY: "One or more input parameters are empty.",

    RESPONSE_CODE_FAIL_TO_GET_ATTACHED_METADATA: SC_BAD_REQUEST,
    RESPONSE_MSG_FAIL_TO_GET_ATTACHED_METADATA: "Fail to get attached metadata from summary file.",
    LOG_MSG_FAIL_TO_GET_ATTACHED_METADATA: "Fail to get attached metadata from summary file.",

    RESPONSE_CODE_OVER_LIMITATION: SC_BAD_REQUEST,
    RESPONSE_MSG_OVER_LIMITATION: "Request protocol is over limitation",

	RESPONSE_CODE_FILE_NOT_FOUND: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_FILE_NOT_FOUND: RESPONSE_MSG_INTERNAL_SERVER_ERROR,
	LOG_MSG_FILE_NOT_FOUND_PATH: "The file not found at:\"%s\"",
	LOG_MSG_FILE_NOT_FOUND: "The file not found.",

	RESPONSE_CODE_BEFORE_GET_DISTRIBUTE_REQUEST: SC_FORBIDDEN,
	RESPONSE_MSG_BEFORE_GET_DISTRIBUTE_REQUEST: "Fail to apply remove protocol before call \"" + Constants.REQUEST_MAPPING_GET_DISTRIBUTED_PROTOCOL + "\".",
	LOG_MSG_BEFORE_GET_DISTRIBUTE_REQUEST: "Fail to apply remove protocol before call \"" + Constants.REQUEST_MAPPING_GET_DISTRIBUTED_PROTOCOL + "\".",

    RESPONSE_CODE_BEFORE_GET_TRANSFER_REQUEST: SC_FORBIDDEN,
    RESPONSE_MSG_BEFORE_GET_TRANSFER_REQUEST: "Fail to apply remove protocol before call \"" + Constants.REQUEST_MAPPING_GET_TRANSFER_PROTOCOL + "\".",
    LOG_MSG_BEFORE_GET_TRANSFER_REQUEST: "Fail to apply remove protocol before call \"" + Constants.REQUEST_MAPPING_GET_TRANSFER_PROTOCOL + "\".",

	RESPONSE_CODE_FAIL_DELETE_FILE: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_FAIL_DELETE_FILE: "Protocol Management fails to remove protocol in ProtocolPool.",
	LOG_MSG_FAIL_DELETE_FILE: "Protocol Management fails to remove protocol in ProtocolPool.",

	RESPONSE_CODE_FAIL_TO_CREATE_FILE_OR_DIR: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_FAIL_TO_CREATE_FILE_OR_DIR: RESPONSE_MSG_INTERNAL_SERVER_ERROR,
	LOG_MSG_FAIL_TO_CREATE_FILE_OR_DIR: "Fail to create file or directory, at \"%s\"",

	RESPONSE_CODE_IOEXCEPTION_OCCURRED: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_IOEXCEPTION_OCCURRED: RESPONSE_MSG_INTERNAL_SERVER_ERROR,
	LOG_MSG_IOEXCEPTION_OCCURRED: "An IOException occurred.",
	LOG_MSG_CHARACTER_ENCODING_NOT_SUPPORTED: "The Character Encoding is not supported.",

	RESPONSE_CODE_NO_MATCHED_PROTOCOL: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_NO_MATCHED_PROTOCOL: "No matched protocol is found in ProtocolPool.",

	RESPONSE_CODE_FAIL_TO_RENAME: SC_INTERNAL_SERVER_ERROR,

	RESPONSE_MSG_FAIL_TO_RENAME: "Protocol Management fails to rename files in \"Master\"/\"Archive\".",
	LOG_MSG_FAIL_TO_RENAME: "Fail to rename file.",
	LOG_MSG_FAIL_TO_RENAME_DETAIL: "Fail to rename file from \"%s\" to \"%s\"",

	RESPONSE_CODE_NO_UID_IN_APPLYINGSTATUS: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_NO_UID_IN_APPLYINGSTATUS: "ApplyingStatus of \"Success\"/\"Reject\" has no UID.",
	LOG_MSG_NO_UID_IN_APPLYINGSTATUS: "ApplyingStatus of \"Success\"/\"Reject\" has no UID.",

	// RESPONSE_CODE_NO_MATCHED_UID_TO_REMOVE =
	// SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_NO_MATCHED_UID_TO_REMOVE: "No uid is found in the last GET request.",
	// LOG_MSG_NO_MATCHED_UID_TO_REMOVE =
	// RESPONSE_MSG_NO_MATCHED_UID_TO_REMOVE,

	RESPONSE_CODE_UID_NOT_FOUND: SC_INTERNAL_SERVER_ERROR,
	RESPONSE_MSG_UID_NOT_FOUND: "The UID is not found in ProtocolPool. UID:\"%s\".",
	LOG_MSG_UID_NOT_FOUND: "The UID is not found in ProtocolPool. UID:\"%s\".",
	
	RESPONSE_CODE_SCANNER_ALREADY_CONFIGURED: SC_BAD_REQUEST,
	RESPONSE_MSG_SCANNER_ALREADY_CONFIGURED: "Scanner and MachineName are already configured in Protocol Pool.",
	RESPONSE_MSG_PROTOCOL_POOL_SETTING_ALREADY_CONFIGURED: "Requested ProtocolPoolSetting name has already been configured in Protocol Pool.",
	// LOG_MSG_SCANNER_ALREADY_CONFIGURED: RESPONSE_MSG_UID_NOT_FOUND,

    RESPONSE_CODE_SCANNER_MACHINE_INFO_NOT_MATCHED: SC_BAD_REQUEST,
    RESPONSE_MSG_SCANNER_MACHINE_INFO_NOT_MATCHED: "Scanner name, scanner configurations and machine must match in config file.",
	
	RESPONSE_CODE_PROTOCOL_APPROVED_HAS_EXIST: SC_BAD_REQUEST,
	RESPONSE_MSG_PROTOCOL_APPROVED_HAS_EXIST: "That protocol is already approved.",
	LOG_MSG_PROTOCOL_APPROVED_HAS_EXIST: "That protocol is already approved.",
	
	RESPONSE_CODE_PROTOCOL_SAME_UID_ALREADY_APPROVED: SC_BAD_REQUEST,
	RESPONSE_MSG_PROTOCOL_SAME_UID_ALREADY_APPROVED: "That protocol with same UID is already approved.",
	
	RESPONSE_CODE_PROTOCOL_APPROVED_BY_ANOTHER_SCANNER: SC_BAD_REQUEST,
	RESPONSE_MSG_PROTOCOL_APPROVED_BY_ANOTHER_SCANNER: "Another scanner has already requested the approval at same slot.",
	LOG_MSG_PROTOCOL_APPROVED_BY_ANOTHER_SCANNER: "Another scanner has already requested the approval at same slot.",
	
	RESPONSE_CODE_PROTOCOL_UID_APPROVED_BY_ANOTHER_SCANNER: SC_BAD_REQUEST,
	RESPONSE_MSG_PROTOCOL_UID_APPROVED_BY_ANOTHER_SCANNER: "Another scanner has already requested a protocol with same UID.",
	LOG_MSG_PROTOCOL_UID_APPROVED_BY_ANOTHER_SCANNER: "Another scanner has already requested a protocol with same UID.",
	
	RESPONSE_CODE_PROTOCOL_REQUESTED_BY_THIS_SCANNER: SC_BAD_REQUEST,
    RESPONSE_MSG_PROTOCOL_REQUESTED_BY_THIS_SCANNER: "This scanner has already requested the approval at same slot.",
    LOG_MSG_PROTOCOL_REQUESTED_BY_THIS_SCANNER: "This scanner has already requested the approval at same slot.",
	
	RESPONSE_CODE_PROTOCOL_UID_APPROVED_BY_THIS_SCANNER: SC_BAD_REQUEST,
	RESPONSE_MSG_PROTOCOL_UID_APPROVED_BY_THIS_SCANNER: "This scanner has already requested a protocol with same UID.",
	LOG_MSG_PROTOCOL_UID_APPROVED_BY_THIS_SCANNER: "This scanner has already requested a protocol with same UID.",
	
	RESPONSE_CODE_OLD_EP_NO_REQUESTED_BY_THIS_SCANNER: SC_BAD_REQUEST,
    RESPONSE_MSG_OLD_EP_NO_REQUESTED_BY_THIS_SCANNER: "This scanner has already requested a protocol which was at the same slot before.",
    LOG_MSG_OLD_EP_NO_REQUESTED_BY_THIS_SCANNER: "This scanner has already requested a protocol which was at the same slot before.",

    RESPONSE_CODE_SAME_UID_REQUESTED_BY_THIS_SCANNER: SC_BAD_REQUEST,
    RESPONSE_MSG_SAME_UID_REQUESTED_BY_THIS_SCANNER: "This scanner has already requested the approval with same UID.",
    LOG_MSG_SAME_UID_REQUESTED_BY_THIS_SCANNER: "This scanner has already requested the approval with same UID.",

    RESPONSE_CODE_NO_SAME_PROTOCOL_IN_TRANSFERPOOL: SC_BAD_REQUEST,
    RESPONSE_MSG_NO_SAME_PROTOCOL_IN_TRANSFERPOOLR: "Protocol with same name and same latest version is not found.",
    LOG_MSG_NO_SAME_PROTOCOL_IN_TRANSFERPOOL: "Protocol with same name and same latest version is not found.",

    RESPONSE_CODE_ALREADY_DELETION_PROTOCOL_IN_TRANSFERPOOL: SC_BAD_REQUEST,
    RESPONSE_MSG_ALREADY_DELETION_PROTOCOL_IN_TRANSFERPOOLR: "Protocol is already deleted in Transfer Pool.",
    LOG_MSG_ALREADY_DELETION_PROTOCOL_IN_TRANSFERPOOL: "Protocol is already deleted in Transfer Pool.",

    RESPONSE_CODE_MACHINE_AND_SCANNER_NOT_MATCHE: SC_BAD_REQUEST,
    RESPONSE_MSG_MACHINE_AND_SCANNER_NOT_MATCHE: "Request machine is not under request scanner group.",

    RESPONSE_CODE_FAILED_UPDATE_EPTYPE: SC_BAD_REQUEST,
    RESPONSE_MSG_FAILED_UPDATE_EPTYPE: "Failed to update EPType.",
    LOG_MSG_FAILED_UPDATE_EPTYPE: "Failed to update EPType.",

    RESPONSE_CODE_CHANGELOG_HAS_UID: SC_BAD_REQUEST,
    RESPONSE_MSG_CHANGELOG_HAS_UID: "Changelog file already has UID.",

    RESPONSE_CODE_VOICE_LANGUGAE_POSITION_NOT_DISTRIBUTED: SC_BAD_REQUEST,
    RESPONSE_MSG_VOICE_LANGUAGE_POSITION_NOT_DISTRIBUTED: "The language position is already occupied with another scanner request.",

    RESPONSE_CODE_VOICE_LANGUGAE_ATTACHED_FILE_ERROR: SC_BAD_REQUEST,
    RESPONSE_MSG_VOICE_LANGUAGE_ATTACHED_FILE_ERROR: "An attached file could not be opened / An attached file could not be parsed or missing.",

    RESPONSE_CODE_VOICE_COMMAND_INDEX_FOUND_IN_REQUESTS_FOLDER: SC_BAD_REQUEST,
    RESPONSE_MSG_VOICE_COMMAND_INDEX_FOUND_IN_REQUESTS_FOLDER: "Corresponding voice command index in other languages is in Requests folder.",

    RESPONSE_CODE_VOICE_COMMAND_INDEX_FOUND_IN_HISTORIES_FOLDER: SC_BAD_REQUEST,
    RESPONSE_MSG_VOICE_COMMAND_INDEX_FOUND_IN_HISTORIES_FOLDER: "Corresponding voice command index in other languages is not distributed to request machine.",

    RESPONSE_CODE_VOCE_PRESET_CHANGELOG_FILE_NAME_IS_INVALID: SC_BAD_REQUEST,
    RESPONSE_MSG_VOICE_PRESET_CHANGELOG_FILE_NAME_IS_INVALID: "Voice preset changelog file name is invalid.",

    RESPONSE_CODE_CONSOLESETTING_MISSING: SC_BAD_REQUEST,
    RESPONSE_MSG_CONSOLESETTING_MISSING: "ConsoleSettings is missing in config file.",

	// Log message
	LOG_ERROR_MSG_CONFIG_NOT_EXIST: "The config file does not exist.",
	LOG_ERROR_MSG_FAIL_TO_FOUND_EVN_PMCORE_HOME: "The system variable \"" + Constants.EVN_PMCORE_HOME + "\" is not found.",
	LOG_ERROR_MSG_INVALIDATE_FORMAT_EVN_PMCORE_HOME: "Invalid format of PM core " + Constants.EVN_PMCORE_HOME + ", at \"%s\".",
	LOG_ERROR_MSG_FAIL_TO_FOUND_PM_DEFAULT_CONFIG: "Fail to found PM " + Constants.PATH_FILE_NAME_PM_CONFIG + ", at \"%s\".",
	LOG_ERROR_MSG_GET_STATUS_FROM_HISTORY_XML: "Fail to get status from the history xml. From:\"%s\"",
	LOG_ERROR_MSG_FAIL_DELETE_FILE: "Fail to delete file or directory. At: \"%s\"",
	LOG_ERROR_MSG_FAIL_DELETE_TEMP_FILE: "Fail to delete temp file or directory ",
	LOG_ERROR_MSG_FAIL_DELETE_BACKUP: "Fail to clear backup directory ",

	LOG_ERROR_MSG_FILE_NOT_EXIST: "File does not exist at:\"%s\"",
	LOG_ERROR_MSG_FILE_CREATE_DIRECTORY: "Fail to create directory, the directory already exist. At \"%s\"",
	LOG_ERROR_MSG_INVALID_XML_FORMAT: "Invalid xml format!",
	LOG_ERROR_MSG_INVALID_XML_FORMAT_WITHOUT_ELEMENT: "Invalid xml format, without <%s> element.",
	LOG_ERROR_MSG_INVALID_XML_FORMAT_AT: "Invalid xml format, at \"%s\"",
	LOG_ERROR_MSG_INVALID_ZIP_FILE_NAME: "Invalid zip file name, at: \"%s\"",
	LOG_ERROR_MSG_INVALID_ZIP_FILE: "Invalid zip file, there is no data!",
	LOG_ERROR_MSG_FAIL_TO_RESTORE_DATA: "Fail to restore files, then delete primary data.",
	LOG_ERROR_MSG_INVALID_ZIPSPLITSIZE: Constants.PATH_FILE_NAME_CONFIG + "->Group(" + Constants.CONFIG_KEY_GROUP_ZIP + ")->Param(" + Constants.CONFIG_KEY_PARAM_ZIP_SPLIT_SIZE + ") value must be number: \"%s\"",
	LOG_ERROR_MSG_FAIL_TO_MOVE_FILE: "Fail to move file, from \"%s\" to \"%s\"",
	LOG_ERROR_MSG_FAIL_TO_COPY_FILE: "Fail to copy file, from \"%s\" to \"%s\"",
	LOG_ERROR_MSG_FAIL_TO_LOCK_FILE: "Fail to lock file, at: \"%s\"",
	LOG_ERROR_MSG_FAIL_TO_CONVERT_DATE_TO_STRING : "Fail to parse date to string.",
	LOG_ERROR_MSG_FAIL_TO_UPDATE_TIME_FILE: "Fail to update " + Constants.PATH_FILE_NAME_UPDATE_DATE_TIME + ".",
	LOG_ERROR_MSG_FAIL_TO_UPDATE_DISTRIBUTION_HISTORY_FILE: "Fail to update " + Constants.PATH_FILE_NAME_DISTRIBUION_HISTORY + ".",
	// LOG_ERROR_MSG_FAIL_TO_READ_TIME_FILE: "Fail to read " +
	// Constants.PATH_FILE_NAME_UPDATE_DATE_TIME + ".",
	LOG_ERROR_MSG_FAIL_TO_RENAME_FILE: "Fail to rename file, because the newEPNo file is exist. [OldEPNo:%s, NewEPNo:%s] Exist file at: \"%s\"",
	LOG_ERROR_MSG_INVALID_NUMBER_OF_PARAM: " does not take %d parameters.",

	LOG_WARN_MSG_NOT_DIRECTORY: "\"%s\" is not a directory.",
	LOG_WARN_MSG_NOT_FILE: "\"%s\" is not a file.",
	LOG_WARN_MSG_PROTOCOLPOOL_NOT_EXIST: "ProtocolPool directory is not exist!",
	
	LOG_MSG_BACKUP_IN_PROGRESS: "%s of %s protocol files have been backed up.",
	LOG_MSG_RESTORE_IN_PROGRESS: "%s of %s protocol files have been restored.",

	LOG_INFO_MSG_USE_DEFAULT_CONFIG: "Use the default config value.",

	LOG_INFO_MSG_PROTOCOLPOOL_ROOT: "The ProtocolPool root at: \"%s\"",
	LOG_INFO_MSG_TEMP_ROOT: "The temporary root at: \"%s\"",
	LOG_INFO_MSG_PM_DEFAULT_CONFIG: "The PM core " + Constants.PATH_FILE_NAME_PM_CONFIG + " at \"%s\"",
	ASSERT_MSG_INVALID_ARGUMENTS: 'invalid arguments',
	
//===================================
	REQUEST_PARAM_IS_INVALID_1:'The parameter "%s" is invalid.',
	REQUEST_PARAM_IS_INVALID_2:'The parameter is invalid, "%s"="%s".',
		
//===================================
	
	/*
     * Protocol History remark
     */
	HISTORY_REMARK_FAIL_TO_UPDATE: "Protocol Management fails to create/update history file.",
	
	End: '',

	RESPONSE_MSG_FAILED_TO_CREATE_PROTOCOL: 'Failed to send a new ExamPlan.'
};
