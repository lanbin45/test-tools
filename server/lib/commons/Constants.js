/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

"use strict";

/**
 * Class Constants. This class is constants table.
 */
module.exports = /**
 * @author Administrator
 *
 */
{
    EMPTY_STR : "",
    DOT : ".",
    QUESTION_MARK : "?",
    UNDERLINE : "_",
    COLON : ":",
    SLASH : "/",
    FILE_SEPARATOR : "\\",
    COMMA : ",",
    ZIP_SUFFIX: ".zip",

//  /**
//   * Open file for reading and writing.
//   */
//  MODE_RW : "rw",
//  /**
//   * Open file for reading.
//   */
//  MODE_R : "r",
    
    CONFIG_KEY_PARAM_ZIP_SPLIT_SIZE : "ZipSplitSize",
    /**
     * The zip split size default is 1M.
     */
    CONFIG_VALUE_PARAM_ZIP_SPLIT_SIZE_DEFAULT : 1024 * 1024,
    CONFIG_KEY_GROUP_ZIP : "Zip",

    XML_ELEMENT_ROOT : "Root",
    XML_PMCONFIG_GROUP_PROTOCOLPOOL_SETTINGS : "ProtocolPoolSettings",
    XML_PMCONFIG_GROUP_CONSOLE_SETTINGS : "ConsoleSettings",
    XML_PMCONFIG_GROUP_DISTRIBUTION_SETTINGS : "DistributionSettings",
    XML_PMCONFIG_GROUP_APPROVAL_SETTINGS : "ApprovalSettings",
    XML_PMCONFIG_GROUP_SOURCE_MACHINENAME : "SourceMachineName",
    XML_PMCONFIG_GROUP_SUPPORT_SETTINGS : "SupportSettings",
    XML_PMCONFIG_PARAM_VENDOR : "Vendor",
    XML_PMCONFIG_PARAM_MODALITY : "Modality",
    XML_PMCONFIG_PARAM_SYSTEMNAME : "SystemName",
    XML_PMCONFIG_PARAM_MODELNAME : "ModelName",
    XML_PMCONFIG_PARAM_XRAYMODE : "XRayMode",
    XML_PMCONFIG_PARAM_SOFTWAREVERSION : "SoftwareVersion",
    XML_PMCONFIG_PARAM_MACHINENAME : "MachineName",
    XML_PMCONFIG_PARAM_DISTRIBUTION_MACHINENAME : "DistributionMachineName",
    XML_VOICE_LANGUAGE_DEPENDENCY_ROOT_NAME : "VoicePresetPositionList",
    XML_PMCONFIG_GROUP_LIMITATION_SETTINGS : "LimitationSettings",
    XML_VOICE_LANGUAGE_INDEX: "Index",
    XML_MAX_CARD: "MaxCard",
    XML_MAX_ORGAN: "MaxOrgan",
    XML_TOTAL_CARDS: "TotalCards",

    // EPType
    EPTYPE_ANATOMICAL_LANDMARK : 0,
    EPTYPE_STANDARD : 1,
    EPTYPE_ANATOMICAL_LANDMARK_PLUS : 2,

    // Path
    XML_EPTYPE : "EPType",
    XML_PROTOCOLPOOL_SETTING_NAME : "ProtocolPoolSettingName",
    XML_SCANCONSOLES : "ScanConsoles",
    
    PATH_DIR_BACKUP_CONFIG : "Config",
    PATH_DIR_TMP : "Temp",
    PATH_DIR_TEMP : "C://temp//",
    //PATH_DIR_FROM : "From",
    //PATH_DIR_TO : "To",
    //PATH_DIR_ARCHIVE : "Archive",
    //PATH_DIR_MASTER : "Master",
    PATH_DIR_REQUESTS : "Requests",
    PATH_DIR_HISTORIES : "Histories",
    PATH_DIR_TRANSFERPOOL : "Transfers",
    PATH_DIR_MASTER_LIST : "Master",
    PATH_DIR_POSITION : "Position",
    PATH_DIR_TMP_DOWNLOAD : "download",
    PATH_DIR_TMP_EQUIPMENTSETTING : "tempEquipmentSetting",
    PATH_DIR_TMP_NEWTIMESTAMP : "tempNewTimeStamp",
    PATH_DIR_TMP_GET_PROTOCOL : "GetProtocol",
    PATH_DIR_TMP_RESTORE_PROTOCOL : "RestoreProtocol",
    PATH_FILE_NAME_PM_CONFIG : "ProtocolManagement.xml",//"default.config",
    PATH_FILE_NAME_CONFIG : "config.xml",
    PATH_FILE_NAME_SUFFIX_HISTORY : "_history.xml",
    PATH_FILE_NAME_SUFFIX_CHANGE_LOG : "_changelog.xml",
    PATH_FILE_NAME_SUFFIX_SUMMARY : ".xml",
    PATH_FILE_NAME_SUFFIX_SOURCE : ".dat",
    PATH_FILE_NAME_SUFFIX_OTHERS : ".zip",
    PATH_FILE_NAME_PREFIX_EXAMPLAN : "ep_",
    PATH_FILE_NAME_MULTI_DAT_LABEL : "SERD",
    PATH_FILE_NAME_UPDATE_DATE_TIME : "HTTPSRequestTime.xml",
    PATH_FILE_NAME_DISTRIBUION_HISTORY : "distribution_history.xml",
    PATH_FILE_NAME_PREFIX_DISTRIBUION_HISTORY : "distribution_history_",
    PATH_FILE_TMP_FILES_UID_LIST : "uidsArray.record",
    PATH_FILE_TMP_FILES_OTHERS_PATH_LIST : "othersPathArray.record",
    PATH_ZIP : ".zip",
    PATH_FILE_NAME_DOWNLOAD_GET_ZIP : "To.zip",
    PATH_FILE_NAME_DOWNLOAD_RESTROE_ZIP : "Restore.zip",
    PATH_XML : "xml",
    PATH_EXT_METADATA : ".metadata",
    PATH_DEFAULT_BACKUP_DIR : "C:/Program Files/TMSC/Vitality/temp",
    PATH_DIR_TMP_RETRIEVE_FILE : "RetrieveFile",
    PATH_DIR_OTHERS : "Others",

    PATH_DIR_TMP_GET_TRANSFER_PROTOCOL : "GetTransferProtocol",
    PATH_DIR_TMP_RESTORE_TRANSFER_PROTOCOL : "RestoreTransferProtocol",
    PATH_FILE_NAME_DOWNLOAD_TRANSFER_ZIP : "Transfers.zip",
    PATH_FILE_NAME_DOWNLOAD_RESTORE_FROM_TRANSFER_ZIP : "TransferRestore.zip",
    PATH_FILE_TMP_FILES_UID_LIST_IN_TRANSFERS : "transferUidsArray.record",
    PATH_FILE_TMP_FILES_OTHERS_PATH_LIST_IN_TRANSFERS : "transfersOthersPathArray.record",
    
    /** Encoding */
    ENCODING_UTF8 : "utf8",

    // Applying Result xml
    XML_APPLYING_RESULT_ELEMENT_GROUP_SUCCESS : "Success",
    XML_APPLYING_RESULT_ELEMENT_GROUP_REJECT : "Reject",
    XML_APPLYING_RESULT_ELEMENT_GROUP_UID : "UID",

    // Request Actions
    REQUEST_ACTION_TYPE_APPROVAL : "Approval",
    REQUEST_ACTION_TYPE_DELETION : "Deletion",
    REQUEST_ACTION_TYPE_DISTRIBUTION : "Distribution",
    REQUEST_ACTION_TYPE_RESTORATION : "Restoration",
    REQUEST_ACTION_TYPE_CUTANDPASTE : "CutAndPaste",
    
    REQUEST_MAPPING_GET_DISTRIBUTED_PROTOCOL : "/GetDistributedProtocol",
    REQUEST_MAPPING_GET_TRANSFER_PROTOCOL : "/GetTransferProtocol",

    // Request Parameters
    /**
     * Console identified name
     */
    REQUEST_PARAM_MACHINE_NAME : "MachineName",
    /**
     * Console requested action
     */
    REQUEST_PARAM_ACTION_TYPE : "ActionType",
    /**
     * Protocol identified name {@value}
     */
    REQUEST_PARAM_DATA_TYPE : "DataType",
    REQUEST_PARAM_UID : "UID",
    /**
     * Older EPNo (Required only ActionType : "CutAndPaste")
     */
    REQUEST_PARAM_OLD_EPNO : "OldEPNo",
    /**
     * Newer EPNo (Required only ActionType : "CutAndPaste")
     */
    REQUEST_PARAM_NEW_EPNO : "NewEPNo",
    REQUEST_PARAM_UPLOAD_FILE : "ZippedFile",
    REQUEST_PARAM_FILTER : "Filter",
    REQUEST_FILTER_ALL : "All",
    REQUEST_FILTER_BY_UID : "By UID",
    REQUEST_FILTER_REPLICATE : "Replicate",

    REQUEST_FILTER_EXAMPLAN : "ExamPlan",
    REQUEST_FILTER_SUREIQ : "SureIQ",
    REQUEST_FILTER_SUREEXPOSURE : "SureExposure",
    REQUEST_FILTER_CONTRASTPRESET : "ContrastPreset",
    REQUEST_FILTER_OTHERS : "Others",
    REQUEST_FILTER_VOICEPRESET : "VoicePreset",

    REQUEST_PARAM_FILTER_ID : "FilterID",
    REQUEST_PARAM_APPROVAL_STATUS : "ApprovalStatus",
    REQUEST_PARAM_APPLYING_STATUS : "ApplyingStatus",
    REQUEST_PARAM_APPLYING_RESULT : "ApplyingResult",

    REQUEST_PARAM_FILE_NAME : "FileName",

    REQUEST_PARAM_SIZE_ENABLED: "SizeEnabled",
    
    /**
     * SetScannerInfo: Name of ProtocolPoolSetting group
     */
    REQUEST_PARAM_PROTOCOL_POOL_SETTING_NAME : "ProtocolPoolSettingName",
    
    /**
     * Success of delete: x Success of others: o Failure: x All Others
     * protocols: o
     */
    REQUEST_PARAM_APPROVAL_STATUS_SUCCESS : "Success",
    /**
     * Success of delete: x Success of others: x Failure: o All Others
     * protocols: x
     */
    REQUEST_PARAM_APPROVAL_STATUS_FAILURE : "Failure",
    /**
     * Success of delete: o Success of others: x Failure: x All Others
     * protocols: x
     */
    REQUEST_PARAM_APPROVAL_STATUS_DELETE : "Delete",
    
    REQUEST_PARAM_APPLYING_STATUS_B100 : 'B100',
    REQUEST_PARAM_APPLYING_STATUS_B110 : 'B110',
    REQUEST_PARAM_APPLYING_STATUS_B101 : 'B101',
    REQUEST_PARAM_APPLYING_STATUS_B111 : 'B111',
    REQUEST_PARAM_APPLYING_STATUS_B010 : 'B010',
    REQUEST_PARAM_APPLYING_STATUS_B011 : 'B011',
    REQUEST_PARAM_APPLYING_STATUS_B001 : 'B001',
    REQUEST_PARAM_APPLYING_STATUS_B200 : 'B200',
    REQUEST_PARAM_APPLYING_STATUS_B300 : 'B300',
    
    /**
     * Qurey parameter: ClearCache (Required only by "Backup" api)
     */
    REQUEST_PARAM_CLEAR_CACHE : 'ClearCache',
    REQUEST_PARAM_PATH : 'Path',
    REQUEST_PARAM_VALUE_CLEARCACHE_TRUE : "true",
    REQUEST_PARAM_VALUE_CLEARCACHE_FALSE : "false",

    // Response
    RESPONSE_HEADER_KEY_CONTENT_TYPE : "Content-Type",
    RESPONSE_HEADER_KEY_CONTENT_TYPE_ZIP : "application/zip",
    RESPONSE_HEADER_KEY_CONTENT_TYPE_XML : "text/xml",
    RESPONSE_HEADER_KEY_CONTENT_TYPE_JSON : "application/json;charset=UTF-8",

    RESPONSE_HEADER_KEY_CONTENT_DISPOSITION : "Content-Disposition",
    RESPONSE_HEADER_VALUE_CONTENT_DISPOSITION : "attachment;filename=\"%s\"",

    // Return xml file fixed name
    RESPONSE_XML_PROTOCOLPOOLLIST : "ProtocolPoolList",
    RESPONSE_XML_POOLNAME : "PoolName",
    RESPONSE_XML_MACHINELIST : "MachineNameList",
    RESPONSE_XML_MACHINENAME : "MachineName",
    RESPONSE_XML_EQUIPMENTSETTINGS : "EquipmentSettings",
    REWPONSE_XML_HOSTALIASDETAILS : "HostAliasDetails",

    // Response Distribution Status
    /*
     * Distribution status
     */
    RESPONSE_HEADER_KEY_CONTENT_LENGTH : "Content-Length",
    
    RESPONSE_HEADER_KEY_CONTINUES : "Continuous",
    RESPONSE_HEADER_VALUE_CONTINUES_TRUE : "True",
    RESPONSE_HEADER_VALUE_CONTINUES_FALSE : "False",
    
    RESPNOSE_HEADER_KEY_TOTAL_PROTOCOL: "TotalProtocol",
    RESPNOSE_HEADER_KEY_BACKUP_PROTOCOL: "BackupProtocol",
    RESPNOSE_HEADER_KEY_RESTORED_PROTOCOL: "RestoredProtocol",
    
    RESPNOSE_HEADER_KEY_ERROR_CODE: "ErrorCode",
    /**
     * That protocol is already approved
     */
    RESPNOSE_HEADER_ERROR_CODE_E001: "E001",
    /**
     * That protocol with same UID is already approved
     */
    RESPNOSE_HEADER_ERROR_CODE_E002: "E002",
    /**
     * Another scanner has already requested the approval at same slot
     */
    RESPNOSE_HEADER_ERROR_CODE_E003: "E003",
    /**
     * Another scanner has already requested a protocol with same UID
     */
    RESPNOSE_HEADER_ERROR_CODE_E004: "E004",
    /**
     * This scanner has already requested the approval at same slot
     */
    RESPNOSE_HEADER_ERROR_CODE_DUPLICATE_FILE_NAME: "E003-1",
    /**
     * This scanner has already requested a protocol with same UID
     */
    RESPNOSE_HEADER_ERROR_CODE_DUPLICATE_UID: "E004-1",
    /**
     * This scanner has already requested a protocol of which previous slot is at same slot
     */
    RESPNOSE_HEADER_ERROR_CODE_DUPLICATE_OLD_EP_NO: "E003-2",

    /**
     * .dat file missing in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_SOURCE_MISSING_EP: "E007-1",
    /**
     * Summary file missing in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_MISSING_EP: "E007-2",
    /**
     * Changelog file missing in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_MISSING_EP: "E007-3",
    /**
     * Summary file missing in SureIQ
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_MISSING_SUREIQ: "E008-1",
    /**
     * Changelog file missing in SureIQ
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_MISSING_SUREIQ: "E008-2",
    /**
     * Summary file missing in SureExposure
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_MISSING_SUREEXPOSURE: "E009-1",
    /**
     * Changelog file missing in SureExposure
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_MISSING_SUREEXPOSURE: "E009-2",
    /**
     * Summary file missing in ContrastPreset
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_MISSING_CONTRAST_PRESET: "E010-1",
    /**
     * Changelog file missing in ContrastPreset
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_MISSING_CONTRAST_PRESET: "E010-2",
    /**
     * source file missing in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_SOURCE_MISSING_VOICE_PRESET: "E018-1",
    /**
     * Summary file missing in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_MISSING_VOICE_PRESET: "E018-2",
    /**
     * Changelog file missing in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_MISSING_VOICE_PRESET: "E018-3",
    
    /**
     * Summary file corrupted in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_CORRUPTED_EP: "E011-1",
    /**
     * Changelog file corrupted in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_CORRUPTED_EP: "E011-2",
    /**
     * Summary file corrupted in SureIQ
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_CORRUPTED_SUREIQ: "E012-1",
    /**
     * Changelog file corrupted in SureIQ
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_CORRUPTED_SUREIQ: "E012-2",
    /**
     * Summary file corrupted in SureExposure
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_CORRUPTED_SUREEXPOSURE: "E013-1",
    /**
     * Changelog file corrupted in SureExposure
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_CORRUPTED_SUREEXPOSURE: "E013-2",
    /**
     * Summary file corrupted in ContrastPreset
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_CORRUPTED_CONTRAST_PRESET: "E014-1",
    /**
     * Changelog file corrupted in ContrastPreset
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_CORRUPTED_CONTRAST_PRESET: "E014-2",
    /**
     * Summary file corrupted in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_SUMMARY_CORRUPTED_VOICE_PRESET: "E019-1",
    /**
     * Changelog file corrupted in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_CHANGELOG_CORRUPTED_VOICE_PRESET: "E019-2",

    /**
     * 400: Scan Console fails to include mandatory conditions.
     */
    RESPNOSE_HEADER_ERROR_CODE_FAIL_TO_INCLUDE_CONDITION: "E015-1",
    
    /**
     * 400: Requested Machine Name is not found in ProtocolPool.
     */
    RESPNOSE_HEADER_ERROR_CODE_MACHINE_NAME_NOT_FOUND: "E015-2",
    
    /**
     * 400: Requested parameter is invalid.
     */
    RESPNOSE_HEADER_ERROR_CODE_INVALID_PARAMETER: "E015-3",
    
    /**
     * 404: Scan Console is mistaken URI.
     */
    RESPNOSE_HEADER_ERROR_CODE_MISTAKEN_URI: "E016",
    
    /**
     * 500: Protocol Management has error internally.
     */
    RESPNOSE_HEADER_ERROR_CODE_INTERNAL_ERR: "E017-1",
    
    /**
     * 500: Protocol Management fails to zip protocol in ProtocolPool.
     */
    RESPNOSE_HEADER_ERROR_CODE_ZIP_FAILED: "E017-2",
    /**
     * 500: No matched protocol is found in ProtocolPool.
     */
    RESPNOSE_HEADER_ERROR_CODE_NO_MATCHED_PROTOCOL: "E017-3",
    /**
     * 400: The CT scanner is not yet registered on Protocol Server.
     */
    RESPNOSE_HEADER_ERROR_CODE_SCANNER_NOT_REGISTERED: "E020-1",
    /**
     * 400: The mandatory condition is not attached in the API.
     */
    RESPNOSE_HEADER_ERROR_CODE_CONDITION_NOT_ATTACHED: "E020-2",
    
    /**
     * Initialize API: protocol file missing in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_MISSING_EP: "E007",
    /**
     * Initialize API: protocol file missing in SureIQ
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_MISSING_SUREIQ: "E008",
    /**
     * Initialize API: protocol file missing in SureExposure
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_MISSING_SUREEXP: "E009",
    /**
     * Initialize API: protocol file missing in ContrastPreset
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_MISSING_CONTRAST: "E010",
    /**
     * Initialize API: protocol file missing in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_MISSING_VOICE: "E018",
    /**
     * Initialize API: protocol file corrupted in ExamPlan
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_CORRUPTION_EP: "E011",
    /**
     * Initialize API: protocol file corrupted in SureIQ
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_CORRUPTION_SUREIQ: "E012",
    /**
     * Initialize API: protocol file corrupted in SureExposure
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_CORRUPTION_SUREEXP: "E013",
    /**
     * Initialize API: protocol file corrupted in ContrastPreset
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_CORRUPTION_CONTRAST: "E014",
    /**
     * Initialize API: protocol file corrupted in VoicePreset
     */
    RESPNOSE_HEADER_ERROR_CODE_FILE_CORRUPTION_VOICE: "E019",
    
    RESPONSE_HEADER_KEY_DISTRIBUTION_STATUS : "Distribution-Status",

    RESPONSE_HEADER_KEY_HISTORY_EXISTED : "HistoryExists",

    RESPONSE_HEADER_KEY_REQUEST_EXISTED : "RequestExists",

    /**
     * Success of delete: x 
     * Success of others: x 
     * Failure: x
     */
    RESPONSE_DISTRIBUTION_STATUS_A00 : "A00",
    /**
     * Success of delete: o 
     * Success of others: x 
     * Failure: x
     */
    RESPONSE_DISTRIBUTION_STATUS_A01 : "A01",
    /**
     * Success of delete: x 
     * Success of others: o 
     * Failure: x
     */
    RESPONSE_DISTRIBUTION_STATUS_A10 : "A10",
    /**
     * Success of delete: o 
     * Success of others: o 
     * Failure: x
     */
    RESPONSE_DISTRIBUTION_STATUS_A11 : "A11",
    /**
     * Success of delete: x 
     * Success of others: x 
     * Failure: o
     */
    RESPONSE_DISTRIBUTION_STATUS_A20 : "A20",
    /**
     * Success of delete: o 
     * Success of others: x 
     * Failure: o
     */
    RESPONSE_DISTRIBUTION_STATUS_A21 : "A21",
    /**
     * Success of delete: x 
     * Success of others: o 
     * Failure: o
     */
    RESPONSE_DISTRIBUTION_STATUS_A30 : "A30",
    /**
     * Success of delete: o 
     * Success of others: o 
     * Failure: o
     */
    RESPONSE_DISTRIBUTION_STATUS_A31 : "A31",

    RESPONSE_PROTOCOL_STATUS_S001 : "S001",
    RESPONSE_PROTOCOL_STATUS_S002 : "S002",
    RESPONSE_PROTOCOL_STATUS_S003 : "S003",

    RESPONSE_XML_MESSAGE_FORMAT : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
            + "%n<Root>" + "%n\t<StatusCode>%d</StatusCode>"
            + "%n\t<Message>%s</Message>%n</Root>",

    /** Content-Type */
    MIME_XML : 'application/xml',
    MIME_DAT : 'application/octet-stream',
    MIME_ZIP: 'application/zip',
    MIME_TEMP: 'application/xml',
    MIME_MULTIPART_MIXED : 'multipart/mixed',
    MIME_FORM_URLENCODED : 'application/x-www-form-urlencoded',
    CHARSET_UTF8 : ';charset=UTF-8',

    AUTHENTICATION_DIGEST : 'digest',
    AUTHENTICATION_TICKET : 'ticket',
    AUTHENTICATION_COOKIE : 'cookie',
    
    // HTTPSRequestTime
    UPDATE_PROTOCOL_REQUESTED_ON : 'protocolRequestedOn',
    UPDATE_PROTOCOL_DISTRIBUTED_ON : 'protocolDistributedOn',
    UPDATE_HISTORY_UPDATED_ON : 'historyUpdatedOn',
    UPDATE_SETTING_UPDATED_ON : 'settingUpdatedOn',
    UPDATE_PROTOCOL_RESTORED_ON : 'protocolRestoredOn',
    UPDATE_TRANSFER_PROTOCOL_DISTRIBUTED_ON : 'protocolTransferDistributedOn',
    // UPDATE_EQUIPMENTSETING_ON : 'equipmentSettingChangedOn',
    
    // DistributionHistory 
    DISTRIBUTE_GROUP_DISTRIBUTIONS : "Distributions",
    DISTRIBUTE_GROUP_DISTRIBUTION_ID : "DistributionID",
    DISTRIBUTE_NAME:'Name',
    DISTRIBUTE_UID:'UID',
    DISTRIBUTE_PROTOCOLTYPE:'ProtocolType',
    DISTRIBUTE_EPNUMBER:'EPNumber',
    DISTRIBUTE_VERSION:'Version',
    DISTRIBUTE_ACTION:'Action',
    DISTRIBUTE_FROM_MACHINE:'FromMachine',
    DISTRIBUTE_DISTRIBUTE_TIME:'DistributeTime',
    DISTRIBUTE_STATUS:'Status',
    DISTRIBUTE_STATUS_DISTRIBUTED_BY_RESTORE : "DistributedByRestore",
        
    // Protocol Type
    PROTOCOL_DATATYPE_EXAMPLAN : "ExamPlan",
    PROTOCOL_DATATYPE_CONTRASTPRESET : "ContrastPreset",
    PROTOCOL_DATATYPE_SUREEXPOSURE : "SureExposure",
    PROTOCOL_DATATYPE_SUREIQ : "SureIQ",
    PROTOCOL_DATATYPE_OTHERS : "Others",
    PROTOCOL_TYPE_POSITION : "Position",
    PROTOCOL_DATATYPE_VOICEPRESET: "VoicePreset",
    
    // Custom Metadata
    METADATA_TASK_SUCCEEDED : "Succeeded",
    METADATA_TASK_FAILED : "Failed",
    METADATA_DATATYPE : "dataType",
    METADATA_PROTOCOL_FILE_TYPE : "protocolFileType",
    METADATA_PROTOCOL_FILE_TYPE_CHANGELOG : "Changelog",
    METADATA_PROTOCOL_FILE_TYPE_SUMMARY : "Summary",
    METADATA_PROTOCOL_FILE_TYPE_HISTORY : "History",
    METADATA_FILENAME : "fileName",
    METADATA_UID : "uid",
    METADATA_MASTER_UID : "masterUid",
    METADATA_FAMILY_SUMMARY : "familySummary",
    METADATA_FAMILY_SOURCE : "familySource",
    METADATA_FAMILY_CHANGELOG : "familyChangelog",
    METADATA_STATUS : "status",
    METADATA_STATUS_DELETION_ACCEPTED : "Deletion Accepted",
    METADATA_STATUS_APPROVAL_ACCEPTED : "Approval Accepted",
    METADATA_STATUS_DELETION_REJECTED : "Deletion Rejected",
    METADATA_STATUS_APPROVAL_REJECTED : "Approval Rejected",
    METADATA_STATUS_LOCAL_USE_ACCEPTED : "Local Use Accepted",
    METADATA_STATUS_NON_DELETION_ACCEPTED : "Others",
    METADATA_CONSOLE_SYSTEM_NAME : "consoleSystemName",
    METADATA_CONSOLE_MODEL_NAME : "consoleModelName",
    METADATA_CONSOLE_XRAY_MODE : "consoleXrayMode",
    METADATA_CONSOLE_SOFTWARE_VERSION : "consoleSoftwareVersion",
    METADATA_PROTOCOL_NAME : "protocolName",
    METADATA_CONSOLE_NAME : "consoleName",
    METADATA_CREATOR_UPDATEDON : "creatorUpdatedOn",
    METADATA_CREATOR_NAME : "creatorName",
    METADATA_VERSION : "version",
    METADATA_PATIENT_TYPE : "patientType",
    METADATA_BODY_REGION : "bodyRegion",
    METADATA_SEQ_NO : "seqNo",
    METADATA_EP_NO: "epNo",
    METADATA_NUM_OF_SCANS: "numberOfScans",
    METADATA_PROTOCOL_EPTYPE: "protocolEPType",
    METADATA_VOICE_LANGUAGE_INDEX: "voiceLanguageIndex",
    METADATA_DISPLAY_REQUEST: "displayRequest",

    METADAT_MODIFIED_ON: "file.modifiedOn",
    METADATA_SIZE: "file.size",
    METADATA_CREATED_ON : "file.createdOn",
    METADATA_VALUE_TRUE : "true",
    METADATA_VALUE_FALSE : "false",
    METADATA_ATTACHED_SUREIQ_PREFIX : "attachedSureIQ_",
    METADATA_ATTACHED_SUREEXP_PREFIX : "attachedSureExposure_",
    METADATA_ATTACHED_CONTRASTPRESET_PREFIX : "attachedContrastPreset_",
    METADATA_ATTACHED_VOICEPRESET_PREFIX : "attachedVoicePreset_",
    METADATA_ACTION : "action",
    METADATA_TEMP_UID : "tempUid",
    METADATA_OLD_EP_NO : "oldEpNo",
    METADATA_NEW_EP_NO : "newEpNo", 
    METADATA_VALUE_PATIENT_TYPE_CHILD : "Child",
    METADATA_VALUE_PATIENT_TYPE_ADULT : "Adult",

    // Custom metadata for VoicePreset
    METADATA_VOICE_LANGUAGE : "voiceLanguage",
    METADATA_VOICE_COMMAND : "voiceCommand",
    
    METADATA_SORTBY_VALUE_CREATED_ON : "createdOn",
    // Others metadata
    METADATA_SETTINGS_NAME : "settingsName",
    // History metadata
    METADATA_TASK : "task",
    METADATA_FAMILY_HISTORY : "familyHistory",
    METADATA_APPROVER_UPDATED_ON : "approverUpdatedOn",
    METADATA_APPROVED_ON : "approvedOn",
    METADATA_APPROVER_NAME : "approverName",
    METADATA_APPROVER_COMMENTS : "approverComments",
    METADATA_CREATOR_COMMENTS : "creatorComments",
    METADATA_IS_LATEST : "isLatest",
    METADATA_IS_MASTER : "isMaster",
    METADATA_DISTRIBUTED_PREFIX : "distributed_",
    METADATA_LAST_UPDATED_SCANNER_NAME : "lastUpdatedScannerName",
    METADATA_IS_TRANSFERRED : "isTransferred",
    METADATA_MASTER_PROTOCOL_POOL_SETTING_NAME : "masterProtocolPoolSettingName",
    METADATA_MASTER_MODEL_NAME : "masterModelName",
    METADATA_MASTER_XRAY_MODE : "masterXRayMode",
    METADATA_MASTER_SOFTWARE_VERSION : "masterSoftwareVersion",
    METADATA_RPID_INFO : "RPIDInfo",
    // #24028
    METADATA_CONSOLE_EPTYPE :"consoleEPType",
    METADATA_MASTER_EPTYPE : "masterEPType",

    METADATA_PATH: "path",
    METADATA_CHECKSUM_DATE_TIME : "checksumDateTime",
    METADATA_AUTO_APPROVED_CHECKSUM: "AutoApproved",

    REQUEST_PARAM_PATHPREFIX : "pathPrefix",
    REQUEST_PARAM_COLLAPSE_SUBFOLDERS : "collapseSubfolders",
    REQUEST_PARAM_CREATED_AFTER : "createdAfter",
    REQUEST_PARAM_LIMIT : "limit",
    REQUEST_PARAM_SORT_BY : "sortBy",
    REQUEST_PARAM_OFFSET : "offset",
    RESTORE_REQ:'RESTORE_REQ_',
    REMOVE_REQ:'REMOVE_REQ_',
    SETSCANNERINFO_REQ:'SETSCANNERINFO_REQ_',
    GETDISTRIBUTEDPROTOCOL_REQ:'GETDISTRIBUTEDPROTOCOL_REQ_',
    RETRIEVEFILE_REQ:'RETRIEVEFILE_REQ_',

    GETTRANSFERPROTOCOL_REQ:'GETTRANSFERPROTOCOL_REQ_',
    RESTORE_FROM_TRANSFER_REQ:'RESTORE_FROM_TRANSFER_REQ_',
    CLEAR_TRANSFER_QUEUE_REQ : 'CLEAR_TRANSFER_QUEUE_REQ_',
    SETPROTOCOLPOOL_REQ : 'SETPROTOCOLPOOL_REQ_',
    UPDATEPROTOCOLPOOL_REQ : 'UPDATEPROTOCOLPOOL_REQ',
    SETLIMITATION_REQ: 'SETLIMITATION_REQ',
    
    // Protocol History
    HISTORY_STATUS_APPROVAL_ACCEPTED: "Approval Accepted",
    HISTORY_RESPONSE_ACTION_APPROVE: "Approve",
    HISTORY_STATUS_DELETION_ACCEPTED: "Deletion Accepted",
    HISTORY_RESPONSE_ACTION_DELETE: "Delete",
    HISTORY_HEADER_TASK_VALUE_SUCCEEDED: "Succeeded",
    CHANGELOG_ROOT: "Changelog",
    CHANGELOG_GROUP_EVENT: "Event",
    CHANGELOG_PARAM_RECEIVED_DATE_TIME: "ReceivedDateTime",
    HISTORY_ROOT: "History",
    HISTORY_GROUP_HEADER: "Header",
    HISTORY_HEADER_GROUP_STATUS_INFO: "StatusInfo",
    HISTORY_HEADER_GROUP_SCANNER_INFO: "ScannerInfo",
    HISTORY_HEADER_GROUP_MASTER_INFO: "MasterInfo",
    HISTORY_HEADER_PARAM_PATIENT_TYPE: "PatientType",
    HISTORY_HEADER_PARAM_ORGAN: "Organ",
    HISTORY_HEADER_PARAM_NAME: "Name",
    HISTORY_HEADER_PARAM_UID: "UID",
    HISTORY_HEADER_PARAM_TEMP_UID: "TempUID",
    HISTORY_HEADER_PARAM_STATUS: "Status",
    HISTORY_HEADER_PARAM_TASK: "Status",
    HISTORY_HEADER_PARAM_REMARK: "Remark",
    HISTORY_HEADER_PARAM_LAST_UPDATED_DATETIME: "LastUpdatedDateTime",
    HISTORY_HEADER_PARAM_LAST_UPDATED_USERNAME: "LastUpdatedUserName",
    HISTORY_HEADER_PARAM_VERSION: "Version",
    HISTORY_HEADER_PARAM_LAST_UPDATED_SCANNER_NAME: "LastUpdatedScannerName",
    HISTORY_HEADER_PARAM_MASTER_UID: "MasterUID",
    HISTORY_HEADER_PARAM_MASTER_MODEL_NAME: "MasterModelName",
    HISTORY_HEADER_PARAM_MASTER_XRAY_MODE: "MasterXRayMode",
    HISTORY_HEADER_PARAM_MASTER_SOFTWARE_VERSION: "MasterSoftwareVersion",
    HISTORY_HEADER_PARAM_LANGUAGE_NAME: "LanguageName",
    HISTORY_HEADER_PARAM_COMMAND_NAME: "CommandName",
    HISTORY_GROUP_EVENTS: "Events",
    HISTORY_EVENTS_GROUP_EVENTID: "EventID",
    HISTORY_EVENTS_GROUP_REQUEST: "Request",
    HISTORY_EVENTS_GROUP_RESPONSE: "Response",
    HISTORY_EVENTS_GROUP_CHANGELOG: "ChangeLog",
    HISTORY_EVENTS_GROUP_SCANNERINFO: "ScannerInfo",
    HISTORY_EVENTS_PARAM_MACHINE_NAME: "MachineName",
    HISTORY_EVENTS_PARAM_VERSION: "Version",
    HISTORY_EVENTS_PARAM_ACTION: "Action",
    HISTORY_EVENTS_PARAM_REMARK: "Remark",
    HISTORY_EVENTS_PARAM_UPDATED_DATETIME: "UpdatedDateTime",
    HISTORY_EVENTS_PARAM_UPDATED_USERNAME: "UpdatedUserName",
    HISTORY_EVENTS_PARAM_PROTOCOL_POOL_SETTING_NAME: "ProtocolPoolSettingName",
    HISTORY_EVENTS_PARAM_UID: "UID",
    HISTORY_FILE_MODEL_GROUP: "group",

    // Service Flag
    REMOVE_DISTRIBUTED_SERVICE : 'RemoveDistributedService',
    CLEAR_TRANSFER_QUEUE_SERVICE : 'ClearTransferQueueService',
    
    DICOM_UID_ROOT: "1.2.840.51431", // should be same with Protocol Management

    PARAM_KEY_SEARCH_FOLDER: "searchFolder",

    MUTEX_NAME: "Global\\ProtocolManagementServerLock_",
    MUTEX_WAIT_TIME: 0,
    WAIT_RESULT_SUCCESS: 0,
    WAIT_RESULT_ABANDONED: 1,
    WAIT_RESULT_TIMEOUT: 2,
    WAIT_FAILED: 3,
    CONFLICT_DELAY_TIME: 1,

    VOICEORESET_OTHERS_FILE_PREFIX: "VoiceLanguage",

    LIMITATION_SETTING_MAX_LANGUAGE_INDEX: "MaxLanguage",
    LIMITATION_SETTING_MIN_LANGUAGE_INDEX: "MinLanguage",
    LIMITATION_SETTING_MAX_COMMAND_INDEX: "MaxCommandPerLanguage",
    LIMITATION_SETTING_MIN_COMMAND_INDEX: "MinCommandPerLanguage",
    VOICE_PRESET_PREFIX: "voice_",

    // Limitation setting default values
    LIMITATION_SETTING_MAX_LANGUAGE_INDEX_DEFAULT: 20,
    LIMITATION_SETTING_MAX_COMMAND_INDEX_DEFAULT: 10,

    LIMITATION_SETTING_SUREEXPOSURE_DEFAULT_ORGAN: 4,
    LIMITATION_SETTING_SUREEXPOSURE_DEFALUT_MAX_CARD: 5,
    LIMITATION_SETTING_SUREEXPOSURE_DEFAULT_TOTAL_CARDS: 40,

    LIMITATION_SETTING_SUREIQ_DEFAULT_MAX_ORGAN: 16,
    LIMITATION_SETTING_SUREIQ_DEFAULT_MAX_CARD: 8,
    LIMITATION_SETTING_SUREIQ_DEFAULT_TOTAL_CARDS: 80,

    API_APPROVELOCALPROTOCOL: 'ApproveLocalProtocol',
    API_SETPROTOCOLPOOL: 'SetProtocolPool',
    API_CLEARLOCALQUEUE: 'ClearLocalQueue',
    API_QUERYPROTOCOLSTATUS: 'QueryProtocolStatus',
    API_GETLOCALPROTOCOL: 'GetLocalProtocol',
    API_GETTRANSFERPROTOCOL: 'GetTransferProtocol',
    API_CLEARTRANSFERQUEUE: 'ClearTransferQueue',
    API_TESTCONNECTION: 'TestConnection',

    MSG_THERE_IS_NO_MATCHED_PROTOCOLS: 'There is no matched protocols.'

};