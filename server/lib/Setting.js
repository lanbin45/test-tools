/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company: CANON MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to define some application settings
 */

module.exports = {
    CTConfig: {
        appName: 'CTSimulatorTestTool',
        port: '9817',
        root: '/CTSimulatorTestTool/',
        logPath: 'C:/ProgramData/Vitrea/Logs/CTSimulatorTestTool',
        logLevel: 'info',
        splitLength: 90 * 1024 * 1024, // 1MB, the file length to split
        SSL: false,
        supportSettings: true,
        // todo or c:\temp? folder access privilege?
        tempFolderPath: 'temp'
    },
    PGConfig: {
        host: 'localhost',
        port: '9815',
        appName: 'ProtocolGateway',
        SSL: true
    }
};
