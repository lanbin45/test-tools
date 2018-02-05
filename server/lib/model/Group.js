/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const assert = require('assert');
const Message = require('../commons/Message');
const Param = require('../model/Param');
require('../utils/ArrayExtra');

// ============================================================

/**
 * Class Group
 * This class is used to store Group element in xml files
 * 
 * @param {String} name
 */
function Group(name) {
    /* -- Properties -- */
    /** @type {String} */
    this.name = undefined;
    /** @type {String}*/
    this.value = undefined;
    /** @type {String}*/
    this.display = undefined;
    // todo #23594
    this.displayName = undefined;
    /** @type {Root|Group}*/
    this.parent = undefined;
    /** @type {Array<Param>} */
    this.paramArray = [];
    /** @type {Array<Group>} */
    this.groupArray = [];

    /* -- Constructor -- */
    if (name) {
        this.name = String(name);
    }
}

/**
 * Deep copy group object
 * @return {Group}
 */
Group.prototype.copy = function() {
    let group = new Group();
    group.name = this.name;
    group.value = this.value;
    group.display = this.display;
    // todo #23594
    group.displayName = this.displayName;
    // todo
    group.parent = this.parent;

    let paramArray = [];
    for (let i = 0; i < this.paramArray.length; ++i) {
        // paramArray.push(this.paramArray[i]);
        paramArray[i] = this.paramArray[i].copy();
    }
    group.paramArray = paramArray;

    let groupArray = [];
    for (let i = 0; i < this.groupArray.length; ++i) {
        // groupArray.push(this.groupArray[i].copy());
        groupArray[i] = this.groupArray[i].copy();
    }
    group.groupArray = groupArray;

    return group;
};

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
 * Get child group by name and value
 * 
 * @param {String} name
 *                 group name
 * @param {String} value
 *                 group value
 * @return {Array<Group>}
 *                 all children group array
 */
function getAllGroupsByNameAndValue(name, value) {
    let resultGroupArr = [];
    if (!name) {
        return resultGroupArr;
    }
    if (!value) {
        return resultGroupArr;
    }
    this.getAllGroups().forEach(function(group) {
        if (name == group.name && value == group.value) {
            resultGroupArr[resultGroupArr.length] = group;
        }
    });
    return resultGroupArr;
}

/**
 * Get single group by name
 * 
 * @param {String} name
 *                 group name
 * @return {Group}
 *                 the first group by group name;
 *                 otherwise, null
 */
function getSingleGroupByName(name) {
    if (!name) {
        return null;
    }
    let groupArr = this.getAllGroupsByName(name);
    return groupArr.length > 0 ? groupArr[0] : null;
}
/**
 * Get single group by name and value
 * 
 * @param {String} name
 *                 group name
 * @param {String} value
 *                 group value
 * @return {Group}
 *                 the first group by group name and value
 *                 otherwise, null
 */
function getSingleGroupByNameAndValue(name, value) {
    if (!name) {
        return null;
    }
    if (!value) {
        return null;
    }
    let groupArr = this.getAllGroupsByNameAndValue(name, value);
    return groupArr.length > 0 ? groupArr[0] : null;
}

/**
 * Set group array
 * 
 * @param {Array<Group>} groups
 */
function setGroupArray(groups) {
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
    assert.ok(group, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    assert.ok(group instanceof Group, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    if (!this.groupArray) { // null
        this.groupArray = [];
    }
    this.groupArray.push(group);
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
    let indexArray = [];
    for (let i = 0, len = groupArray.length; i < len; ++i) {
        let group = groupArray[i];
        if (name == group.name) {
            indexArray.push(i);
        }
    }
    if (indexArray.length == 0) {
        return false;
    }
    for (let i = indexArray.length - 1; i >= 0; --i) {
        groupArray.remove(indexArray[i]);
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
    let indexArray = [];
    for (let i = 0, len = groupArray.length; i < len; ++i) {
        let group = groupArray[i];
        if (name == group.name && value == group.value) {
            indexArray.push(i);
        }
    }
    if (indexArray.length == 0) {
        return false;
    }
    for (let i = indexArray.length - 1; i >= 0; --i) {
        groupArray.remove(indexArray[i]);
    }
    return true;
}

// ---------------- Parmas ---------------------------------------
/**
 * Get all param elements in its children
 * 
 * @return {Array<Param>}
 *                 all children param array
 */
function getAllParams() {
    if (!this.paramArray) {
        return [];
    }
    return this.paramArray;
}

/**
 * Get all param elements in its children by name
 * 
 * @param {String} name
 *                 param name
 * @return {Array<Param>}
 *                 all children param array
 */
function getAllParamsByName(name) {
    let resultParamArr = [];
    if (!name) {
        return resultParamArr;
    }
    this.getAllParams().forEach(function(param) {
        if (name == param.name) {
            resultParamArr[resultParamArr.length] = param;
        }
    });
    return resultParamArr;
}

/**
 * Get single children param element by name
 * 
 * @param {String} name
 *                 param name
 * @return {Array<Param>}
 *                 the first children param;
 *                 otherwise, null
 */
function getSingleParamByName(name) {
    if (!name) {
        return null;
    }
    let paramArr = this.getAllParamsByName(name);
    return paramArr.length > 0 ? paramArr[0] : null;
}

/**
 * Get single param element by name
 * @param {String} name
 * @param {String} value
 * @return {Array<Param>}
 *                 the first children param;
 *                 otherwise, null
 */
function getSingleParamByNameAndValue(name, value) {
    if (!name) {
        return null;
    }
    if (!value) {
        return null;
    }
    let resultParamArr = [];
    this.getAllParams().forEach(function(param) {
        if (name == param.name && value == param.value) {
            resultParamArr[resultParamArr.length] = param;
        }
    });
    return resultParamArr.length > 0 ? resultParamArr[0] : null;
}

/**
 * Set children param array
 * 
 * @param {Array<Param>} params children param array
 */
function setParamArray(params) {
    if (params && params.length > 0) {
        this.paramArray = params;
    } else {
        this.paramArray = [];
    }
}

/**
 * Add a children param
 * 
 * @param {Param} param an param
 */
function addParam(param) {
    assert.ok(param, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    assert.ok(param instanceof Param, Message.ASSERT_MSG_INVALID_ARGUMENTS);
    if (!this.paramArray) { // null
        this.paramArray = [];
    }
    this.paramArray.push(param);
}

/**
 * Remove params by name and value
 * 
 * @param {String} name
 *             param name
 * @return {boolean}
 *         
 */
function removeParamByName(name) {
    let paramArray = this.paramArray;
    let indexArray = [];
    for (let i = 0, len = paramArray.length; i < len; ++i) {
        if (name == paramArray[i].name) {
            indexArray.push(i);
        }
    }
    if (indexArray.length == 0) {
        return false;
    }
    for (let i = indexArray.length-1; i >= 0; --i) {
        paramArray.remove(indexArray[i]);
    }
    return true;
}

/**
 * Remove params by name and value
 * 
 * @param {String} name
 *             param name
 * @param {String} value
 *             param value
 * @return {boolean}
 *         
 */
function removeParamByNameValue(name, value) {
    let paramArray = this.paramArray;
    let indexArray = [];
    for (let i = 0, len = paramArray.length; i < len; ++i) {
        let param = paramArray[i];
        if (name == param.name && value == param.value) {
            indexArray.push(i);
        }
    }
    if (indexArray.length == 0) {
        return false;
    }
    for (let i = indexArray.length - 1; i >= 0; --i) {
        paramArray.remove(indexArray[i]);
    }
    return true;
}

// -------------------------------------------------------------
// Group
Group.prototype.getAllGroups = getAllGroups;
Group.prototype.getAllGroupsByName = getAllGroupsByName;
Group.prototype.getAllGroupsByNameAndValue = getAllGroupsByNameAndValue;
Group.prototype.getSingleGroupByName = getSingleGroupByName;
Group.prototype.getSingleGroupByNameAndValue= getSingleGroupByNameAndValue;
Group.prototype.addGroup = addGroup;
Group.prototype.setGroupArray = setGroupArray;
Group.prototype.removeGroupByName = removeGroupByName;
Group.prototype.removeGroupByNameValue = removeGroupByNameValue;
// Param
Group.prototype.getSingleParamByName = getSingleParamByName;
Group.prototype.getAllParamsByName = getAllParamsByName;
Group.prototype.getAllParams = getAllParams;
Group.prototype.addParam = addParam;
Group.prototype.setParamArray = setParamArray;
Group.prototype.removeParamByNameValue = removeParamByNameValue;
Group.prototype.removeParamByName = removeParamByName;
Group.prototype.getSingleParamByNameAndValue = getSingleParamByNameAndValue;
// =============================================================

module.exports = Group;
