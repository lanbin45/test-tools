/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Assert = require('assert');
const Message = require('../commons/Message');
const Group = require('../model/Group');
require('../utils/ArrayExtra');

// ============================================================

/**
 * Class Root
 * 
 * this class is used to keep the Xml root Element
 */
function Root(name) {
    /* -- Properties --*/
    /** @type {String} */
    this.name = undefined;
    // todo #23594
    /** @type {String} */
    this.displayName = undefined;
    /** @type {String} */
    // this.display = undefined;
    /** @type {Array<Group>} */
    this.groupArray = [];

    /* -- Constructor --*/
    if (name) {
        this.name = String(name);
    }
}
/**
 * Get all group elements in its children
 * 
 * @return {Array<Group>} all children groups
 */
function getAllGroups() {
    if (!this.groupArray) {
        return [];
    }
    return this.groupArray;
}

/**
 * Get child group by name
 * 
 * @param {String} name<br>
 *            group name
 * @return {Array<Group>} all children groups
 */
function getAllGroupsByName(name) {
    let resultGroupArr = [];
    if (!name) {
        return resultGroupArr;
    }
    this.getAllGroups().forEach(function(group) {
        if (name == group.name) {
            resultGroupArr[resultGroupArr.length] = group;
        }
    });
    return resultGroupArr;
}

/**
 * Get child group by name
 * 
 * @param {String} name<br>
 *            group name
 * @return {Array<Group>} all children groups
 */
function getSingleGroupByName(name) {
    if (!name) {
        return null;
    }
    let groupArr = this.getAllGroupsByName(name);
    return groupArr.length > 0 ? groupArr[0] : null;
}

/**
 * Set group array
 * 
 * @param {Array<Group>} groups
 */
function setGroupArray( /* Array<Group>*/ groups) {
    if (groups && groups.length > 0) {
        this.groupArray = groups;
    } else {
        this.groupArray = [];
    }
}

/**
 * Add an sub group in Array
 * 
 * @param {Group} group
 */
function addGroup(group) {
    Assert.ok(group, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    Assert.ok(group instanceof Group, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    if (!this.groupArray) { // null
        this.groupArray = [];
    }
    this.groupArray.push(group);
    group.parent = null;
}

/**
 * Remove groups by group name
 * 
 * @param {String} name
 *             group name
 * @return {boolean}
 *         
 */
function removeGroupByName(name) {
    let groupArray = this.groupArray;
    let indexArr = [];
    for (let i = 0, len = groupArray.length; i < len; ++i) {
        let group = groupArray[i];
        if (name == group.name) {
            indexArr.push(i);
        }
    }
    if (indexArr.length == 0) {
        return false;
    }
    for (let i = indexArr.length - 1; i >= 0; --i) {
        groupArray.remove(indexArr[i]);
    }
    return true;
}

/**
 * Remove groups by group name and value
 * 
 * @param {String} name
 *             group name
 * @param {String} value
 *             group value
 * @return {boolean}
 *         
 */
function removeGroupByNameValue(name, value) {
    let groupArray = this.groupArray;
    let indexArr = [];
    for (let i = 0, len = groupArray.length; i < len; ++i) {
        let group = groupArray[i];
        if (name == group.name && value == group.value) {
            indexArr.push(i);
        }
    }
    if (indexArr.length == 0) {
        return false;
    }
    for (let i = indexArr.length - 1; i >= 0; --i) {
        groupArray.remove(indexArr[i]);
    }
    return true;
}

// -------------------------------------------------------------
Root.prototype.removeGroupByNameValue = removeGroupByNameValue;
Root.prototype.removeGroupByName = removeGroupByName;
Root.prototype.addGroup = addGroup;
Root.prototype.getAllGroups = getAllGroups;
Root.prototype.getAllGroupsByName = getAllGroupsByName;
Root.prototype.getSingleGroupByName = getSingleGroupByName;
Root.prototype.setGroupArray = setGroupArray;
// ============================================================

module.exports = Root;
