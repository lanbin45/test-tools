/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

// ============================================================

/**
 * remove sub elements from srcindex to destIndex
 * @param {number} from
 * @param {number} to
 * @return {Array} the array length after operation
 */
Array.prototype.remove = function(from, to) {
    if (arguments.length == 1) {
        to = from;
    } else if (arguments.length != 2) {
        throw new Error('invalid arguments');
    }
    const rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

/**
 * Return true if arrays is empty.
 * @return {boolean} true if arrays is empty.
 */
Array.prototype.isEmpty = function() {
    return this.length == 0;
};

// ============================================================
