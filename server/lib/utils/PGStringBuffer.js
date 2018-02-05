/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

function /* Class*/ PGStringBuffer() {
    this._content_ = []; // new Array;
}

PGStringBuffer.prototype.append = function(str) {
    if (typeof str == 'string') {
        this._content_.push(str);
    } else if (str instanceof String) {
        this._content_.push(str.toString());
    } else if (str instanceof PGStringBuffer) {
        let self = this;
        str._content_.forEach(function(ele) {
            self._content_.push(ele);
        });
    } else {
        throw new Error('invalid arguments');
    }
};

PGStringBuffer.prototype.toString = function() {
    return this._content_.join('');
};

module.exports = PGStringBuffer;
