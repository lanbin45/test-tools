/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Root = require('../model/Root');
const Group = require('../model/Group');
const Param = require('../model/Param');
const MachineInfo = require('../model/MachineInfo');
const Message = require('../commons/Message');

// ============================================================
/**
 * Class ExamPlanChangelog
 * 
 * This class is used to store parameters of an ExamPlan Changelog.
 */
class ExamPlanChangelog {
    constructor(epName, machineInfo, uid, version, tempUID) {
        if (!(machineInfo instanceof MachineInfo)) {
            throw new Error(Message.ASSERT_MSG_INVALID_ARGUMENTS);
        }

        /** @type {String} */
        this.epName = String(epName);
        /** @type {MachineInfo} */
        this.machineInfo = machineInfo;
        /** @type {String} */
        this.uid = !uid ? '' : String(uid);
        /** @type {String} */
        this.version = !version ? '1.0' : version;
        /** @type {String} */
        this.tempUID = tempUID;
    }

    get machineName() {
        let machineName = '';
        if (this.machineInfo) {
            machineName = this.machineInfo.machineName || '';
        }
        return machineName;
    }

    toRoot() {
        let root = new Root('ExamPlan ChangeLog');

        let headerGroup = new Group('Header');
        headerGroup.addParam(new Param('Name', String(this.epName)));
        headerGroup.addParam(new Param('UID', String(this.uid)));
        headerGroup.addParam(new Param('TempUID', !this.tempUID ? this.machineInfo.getTempUID() : String(this.tempUID)));
        headerGroup.addParam(new Param('Status', 'Approval Requested'));

        let masterInfoGroup = new Group('MasterInfo');
        masterInfoGroup.addParam(new Param('MasterName', ''));
        masterInfoGroup.addParam(new Param('MasterUID', ''));
        masterInfoGroup.addParam(new Param('MasterSystemName', ''));
        masterInfoGroup.addParam(new Param('MasterModelName', ''));
        masterInfoGroup.addParam(new Param('MasterXRayMode', ''));
        masterInfoGroup.addParam(new Param('MasterSoftwareVersion', ''));
        headerGroup.addGroup(masterInfoGroup);

        let scannerInfoGroup = this.machineInfo.toGroup();
        headerGroup.addGroup(scannerInfoGroup);
        root.addGroup(headerGroup);

        let eventGroup = new Group('Event');
        let requestGroup = new Group('Request');
        requestGroup.addParam(new Param('MachineName', this.machineInfo.machineName));
        requestGroup.addParam(new Param('Action', !this.uid ? 'Create' : 'Edit'));
        requestGroup.addParam(new Param('UpdatedUserName', this.machineInfo.machineName));
        requestGroup.addParam(new Param('UpdatedDateTime', new Date().toISOString()));
        requestGroup.addParam(new Param('Version', this.version));
        requestGroup.addParam(new Param('Remark', ''));
        requestGroup.addGroup(new Group('ChangeLog'));
        requestGroup.addGroup(scannerInfoGroup);
        eventGroup.addGroup(requestGroup);
        root.addGroup(eventGroup);
        return root;
    }
}

// ExamPlanChangelog.prototype.toString = function() {
//     // TODO NOT IMPLEMENTED
//     return '';
// };

// ============================================================
module.exports = ExamPlanChangelog;
