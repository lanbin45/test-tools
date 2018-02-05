/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

/**
 * Class Param
 * 
 * This class is used to store Param element in xml files
 * 
 * @param {String} name
 * @param {String} value
 * @param {String} display
 */
function Param(name, value, display) {
    /* -- Properties --*/
    /** @type {String} */
    this.name = undefined;
    /** @type {String} */
    this.value = undefined;
    /** @type {String} */
    this.display = undefined;
    // todo #23594
    /** @type {String} */
    this.displayName = undefined;
    /** @type {Root|Group} */
    this.parent = undefined;

    /* -- Constructor --*/
    const len = arguments.length;
    if (len >= 1) {
        this.name = name;
    }
    if (len >= 2) {
        this.value = value;
    }
    if (len >= 3) {
        this.displayName = display;
    }
}

/**
 * Deep copy param.
 * @return {Param}
 */
Param.prototype.copy = function() {
    let param = new Param(this.name, this.value, this.displayName);
    // todo need deep copy parent.
    return param;
};

// ============================================================

module.exports = Param;
