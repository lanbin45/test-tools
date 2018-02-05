/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const Xml2js = require('xml2js');
const Constants = require('../commons/Constants');
const Root = require('../model/Root');
const Group = require('../model/Group');
const Param = require('../model/Param');
const PGFile = require('../utils/PGFile');
const PGStringBuffer = require('../utils/PGStringBuffer');
// const DistributionHistory = require('../model/DistributionHistory');

// const log = require('../utils/PGLog').getLogger('PGXml');
// ============================================================

const XmlKeys = {
    ROOT: 'root',
    GROUP: 'Group',
    PARAM: 'Param',
    NAME: 'Name',
    VALUE: 'Value',
    DISPLAY: 'Display',
    // todo #23594
    DISPLAYNAME: 'DisplayName',
    $: '$'
};

/**
 * parseXmlData(data, callback)
 * 
 * @param {String|Buffer} data 
 * @param {Function} callback (err, Root)
 */
function parseXmlData(data, callback) {
    if (arguments.length != parseXmlData.length) {
        throw new Error('invalid arguments.');
    }
    let parser = new Xml2js.Parser();
    parser.parseString(data, function(err, xmlObj) {
        if (err) {
            callback(err, null);
            return;
        }
        if (!xmlObj) {
            err = new Error('Fail to parse xml');
            callback(err, null);
            return;
        }
        try {
            let root = getRootFromXmlObj(xmlObj);
            if (!root) {
                callback(new Error('Fail to parse xml, can not found root node.'), null);
            }
            callback(null, root);
        } catch (xmlErr) {
            callback(xmlErr, null);
        }
    });
}

/**
 * Parse xml file.
 * 
 * @param {String} pathname 
 * @param {String} encoding 
 * @param {Function} callback (err, Root)
 */
function parseXmlFile(pathname, encoding, callback) {
    if (arguments.length == 3) {
        if (typeof arguments[2] != 'function') {
            throw new Error('invalid arguments.');
        }
    } else
    if (arguments.length == 2) {
        if (typeof arguments[1] == 'function') {
            callback = arguments[1];
            encoding = null;
        } else {
            throw new Error('invalid arguments.');
        }
    } else {
        throw new Error('invalid arguments.');
    }
    encoding = encoding || Constants.ENCODING_UTF8;
    let xmlFile = new PGFile(pathname);
    let xmlOpts = {
        encoding: encoding
    };
    xmlFile.readFile(xmlOpts, function(err, xmlStr) {
        if (err) {
            callback(err, null);
        } else {
            parseXmlData(xmlStr, callback);
        }
    });
}

/**
 * conver xml object to Root instance.
 *
 * @param {Object} xmlJson
 * @return {Root}
 * @throws {Error}
 */
function getRootFromXmlObj( /* Object*/ xmlJson) {
    validateSubXmlTag(xmlJson, [XmlKeys.ROOT]);

    let rootJson = xmlJson.root;
    if (!rootJson) {
        throw new Error('Fail to parse xml');
    }

    validateSubXmlTag(rootJson, [XmlKeys.$, XmlKeys.GROUP]);
    let mRoot = new Root();
    if (rootJson.$) {
        mRoot.name = rootJson.$.Name;
        // todo #23594
        mRoot.displayName = rootJson.$.DisplayName;
    }

    let groupJsonArr = rootJson.Group;
    if (groupJsonArr) {
        let len = groupJsonArr.length;
        let mGroupArr = new Array(len);
        for (let i = 0; i < len; i++) {
            mGroupArr[i] = getGroup(groupJsonArr[i]);
        };

        mRoot.setGroupArray(mGroupArr);
    }
    return mRoot;
}

function getGroup( /* GroupJson*/ groupJson) {
    validateSubXmlTag(groupJson, [XmlKeys.$, XmlKeys.GROUP, XmlKeys.PARAM]);

    let mGroup = new Group();
    if (groupJson.$) {
mGroup.name = groupJson.$.Name;
}
    if (groupJson.$) {
mGroup.value = groupJson.$.Value;
}
    if (groupJson.$) {
mGroup.display = groupJson.$.Display;
}
    // todo #23594 need more test!!!
    if (groupJson.$) {
        mGroup.displayName = groupJson.$.DisplayName;
    }
    let mGroupArr = getSubGroupArray(groupJson);
    mGroup.setGroupArray(mGroupArr);

    let mParamArr = getSubParamArray(groupJson);
    mGroup.setParamArray(mParamArr);
    return mGroup;
}

function getSubGroupArray( /* GroupJson*/ groupJson) {
    let groupJsonArr = groupJson.Group;
    if (groupJsonArr) {
        let len = groupJsonArr.length;
        let mGroupArr = new Array(len);
        for (let i = 0; i < len; i++) {
            mGroupArr[i] = getGroup(groupJsonArr[i]);
        };
        return mGroupArr;
    }
    return undefined;
}

function getSubParamArray( /* GroupJson*/ groupJson) {
    let paramJsonArr = groupJson.Param;
    if (paramJsonArr) {
        let len = paramJsonArr.length;
        let mParamArr = new Array(len);
        for (let i = 0; i < len; i++) {
            mParamArr[i] = getParam(paramJsonArr[i]);
        }
        return mParamArr;
    }
    return undefined;
}

function getParam( /* ParamJson*/ paramJson) {
    let mParam = new Param();
    if (paramJson.$) {
        mParam.name = paramJson.$.Name;
    }
    if (paramJson.$) {
        mParam.value = paramJson.$.Value;
    }
    if (paramJson.$) {
        mParam.display = paramJson.$.Display;
    }
    // todo #23594
    if (paramJson.$) {
        mParam.displayName = paramJson.$.DisplayName;
    }
    return mParam;
}

function validateSubXmlTag( /* Object*/ tagObj, /* Array*/ validTags) {
    validTags = validTags || [];
    for (let tag in tagObj) {
        if (typeof tag === 'string' || tag instanceof String) { // TODO NEED TEST
            validateXmlTag(tag, validTags);
        }
    }
}

function validateXmlTag( /* String*/ tag, /* Array*/ validTags) {
    let isError = true;

    validTags.every(function(validTag) {
        if (tag == validTag) {
            isError = false;
            return false;
        } else {
            return true;
        }
    });

    if (isError) {
        throw new Error('Invalid Xml tag: ' + tag + ' in ' + JSON.stringify(validTags));
    }
}

// ###### Object to Xml #######

/**
 * Save xml file
 *
 * @param {Root} root the model object
 * @param {String} pathname the pathname to save
 * @param {String} encoding optional (default utf8 )
 *
 * @throw Error
 */
function saveAsXmlFile(root, pathname, encoding) {
    if (arguments.length < 2 //
        || arguments.length > 3 //
        || !root //
        || !pathname //
    ) {
        throw new Error('invalid arguments');
    }

    encoding = encoding || Constants.ENCODING_UTF8;
    let xmlStr = saveAsXmlString(root);
    let xmlFile = new PGFile(pathname);
    xmlFile.writeFileSync(xmlStr, {
        encoding: encoding
    });
}

/**
 * Save root object as xml string with xml header.
 * 
 * @param {Root} root 
 * @return {String}
 */
function saveAsXmlString(root) {
    let xmlStr = new PGStringBuffer();
    xmlStr.append('<?xml version="1.0" encoding="UTF-8"?>');
    xmlStr.append(root2XmlStr(root));
    return xmlStr.toString();
}

/**
 * Convert root object to xml string.
 * 
 * @param {Root} root 
 * @return {PGStringBuffer}
 */
function root2XmlStr(root) {
    let level = 0;
    let xmlStr = new PGStringBuffer();
    let rootNode = new XmlNode(XmlKeys.ROOT, level);
    let name = root.name ? root.name : null;
    // TODO #23594
    let displayName = (root.displayName || root.displayName === '') ? root.displayName : null;
    xmlStr.append(rootNode.getStartTag(name, null, displayName));
    root.getAllGroups().forEach(function(subGroup) {
        xmlStr.append(group2XmlStr(subGroup, level + 1));
    });
    xmlStr.append(rootNode.getEndTag());
    return xmlStr;
}

/**
 * Convert Group object to xml string.
 * 
 * @param {Group} group 
 * @param {int} level 
 * @return {PGStringBuffer}
 */
function group2XmlStr(group, level) {
    let xmlStr = new PGStringBuffer();
    if (!group) {
        return xmlStr;
    }
    let groupNode = new XmlNode(XmlKeys.GROUP, level);

    let name = group.name ? group.name : null;
    let value = group.value ? group.value : null;
    // let display = group.display ? group.display : null;

    // todo #23594
    let displayName = (group.displayName || group.displayName === '') ? group.displayName : null;
    xmlStr.append(groupNode.getStartTag(name, value, /* display*/displayName));
    group.getAllParams().forEach(function(subParam) {
        xmlStr.append(param2XmlStr(subParam, (level + 1)));
    });

    group.getAllGroups().forEach(function(subGroup) {
        xmlStr.append(group2XmlStr(subGroup, (level + 1)));
    });

    xmlStr.append(groupNode.getEndTag());
    return xmlStr;
}

/**
 * Convert Param object to xml string.
 * 
 * @param {Param} param 
 * @param {int} level 
 * @return {String}
 */
function param2XmlStr(param, level) {
    let paramNode = new XmlNode(XmlKeys.PARAM, level);
//    var name = param.name ? param.name : null;
//    var value = param.value ? param.value : null;
//    var display = param.display ? param.display : null;
    // todo #23594
    return paramNode.getTagSelfClosed(param.name, param.value, /* param.display*/param.displayName);
}

function /* Class*/ XmlNode( /* String*/ tag, /* int*/ level) {
    if (arguments.length != XmlNode.length || !tag) {
        throw new Error('invalid arguments');
    }

    this.tag = tag;
    level = level || 0;
    this.tuckunder = getTuckunder(level);


    /**
     * Get xml string of a tag without end tag.
     * 
     * @param {String} name 
     * @param {String} value 
     * @param {String} display
     * @return {String}
     */
    this.getTagSelfClosed = function( /* String*/ name, /* String*/ value, /* String*/ display) {
        return getTag.call(this, name, value, display, true);
    };


    /**
     * Get xml string of an start tag.
     * 
     * @param {String} name 
     * @param {String} value 
     * @param {String} display
     * @return {String}
     */
    this.getStartTag = function( /* String*/ name, /* String*/ value, /* String*/ display) {
        return getTag.call(this, name, value, display, false);
    };

    /**
     * Get xml string of an xml tag.
     * 
     * @param {String} name 
     * @param {String} value 
     * @param {String} display 
     * @param {boolean} isClosed 
     * @return {String}
     */
    function getTag(name, value, display, isClosed) {
        let tagStr = new PGStringBuffer();
        tagStr.append(this.tuckunder);
        tagStr.append('<' + this.tag);

        if (name || name == '') {
            tagStr.append(' ' + XmlKeys.NAME + '=' + '\"' + escapeChar(name) + '\"');
        }
        // TODO #23594
        if (display || display == '') {
            tagStr.append(' ' + XmlKeys.DISPLAYNAME + '=' + '\"' + escapeChar(display) + '\"');
        }

        if (value || value == '') {
            tagStr.append(' ' + XmlKeys.VALUE + '=' + '\"' + escapeChar(value) + '\"');
        }

/*        if (display || display == '') {
            tagStr.append(' ' + XmlKeys.DISPLAY + '=' + '\"' + escapeChar(display) + '\"');
        }*/

        if (isClosed) {
            tagStr.append('/>');
        } else {
            tagStr.append('>');
        }

        return tagStr.toString();
    }

    /**
     * Escape special characters in XML. ' is not escaped according to context.
     * @param {String} charToEscape
     * @return {String} escaped characters
     */
    function escapeChar(/*  */charToEscape) {
        if (!charToEscape) {
            return charToEscape;
        }

        let escapedChar = String(charToEscape).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        return escapedChar;
    }

    /**
     * Get xml tag as the end tag.
     * @return {String}
     */
    this.getEndTag = function() {
        return this.tuckunder + '</' + this.tag + '>';
    };

    function getTuckunder( /* int*/ level) {
        level = level || 0;
        let tuckunder = new PGStringBuffer();
        tuckunder.append('\r\n');

        for (let i = 0; i < level; i++) {
            tuckunder.append('  ');
        }

        return tuckunder.toString();
    }
}
// ============================================================

module.exports = {
    parseXmlData: parseXmlData,
    parseXmlFile: parseXmlFile,
    saveAsXmlString: saveAsXmlString,
    saveAsXmlFile: saveAsXmlFile,
    group2XmlStr: group2XmlStr,
    root2XmlStr: root2XmlStr,
    param2XmlStr: param2XmlStr
};
