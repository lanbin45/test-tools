/**
 * Copyright:Copyright(c) 2018 CANON MEDICAL SYSTEMS CORPORATION All Rights
 * Reserved Company:CANON MEDICAL SYSTEMS CORPORATION
 */

'use strict';

const fse = require('fs-extra');
const zlib = require('zlib');
const archiver = require('archiver');
const path = require('path');
const log = require('./PGLog').getLogger('PGArchiver');

/**
 * A class to archive zip file.
 * 
 * @param {String} zipFilePath output zip file path
 * @param {Object} options 
 * options = {
        forceLocalTime: true|false,
        zlib: {
            level: zlib.Z_BEST_COMPRESSION,
            // ...
        }
    }
 * @return {PGArchiver}
 */
function PGArchiver(zipFilePath, options) {
    if (!(this instanceof PGArchiver)) {
        return new PGArchiver(zipFilePath, options);
    }

    /**
     * zip file path
     * @type {String}
     */
    this.zipFilePath;
    /**
     * node-archiver Archiver
     * @type {Archiver}
     */
    this._archive;
    /**
     * output stream of zip file
     * @private
     * @type {Stream}
     */
    this._output;
    /**
     * true if the archive has been aborted
     * @private
     * @type {boolean}
     */
    this._aborted = false;

    /**
     * Constructor
     */
    if (!zipFilePath) {
        log.error('Zip file path should not be empty.');
        return;
    }

    this.zipFilePath = zipFilePath;
    fse.ensureDirSync(path.dirname(this.zipFilePath));

    let zipOptions = options;
    if (!zipOptions) {
        zipOptions = {
            forceLocalTime: true,
            zlib: {
                level: zlib.Z_BEST_COMPRESSION
            } // Sets the compression level to 9.
        };
    } else {
        if (!zipOptions.zlib) {
            zipOptions.zlib = {
                level: zlib.Z_BEST_COMPRESSION
            };
        }
        if (zipOptions.forceLocalTime !== false) {
            zipOptions.forceLocalTime = true;
        }
    }

    let me = this;
    me._archive = archiver('zip', zipOptions);
    me._archive.on('warning', function(err) {
        log.warn('Archive warning. Error code: ' + err.code);
        log.trace(err);
    });

    me._archive.on('error', function(err) {
        log.trace(err);
        me._archive.abort();
    });

    me._output = fse.createWriteStream(zipFilePath);
    me._output.on('close', function() {
        console.log(me._archive.pointer() + ' total bytes');
        log.debug('Archiver has been finalized and the output file descriptor has closed. File path: ' + me.zipFilePath);
    });
    me._output.on('end', function() {
        console.log('Data has been drained');
    });
    me._output.on('error', function(err) {
        log.error('Caught zip stream exception:');
        log.trace(err);
    });
}

/**
 * Appends an input source (text string, buffer, or stream) to the instance.
 * When the instance has received, processed, and emitted the input, the `entry` event is fired.
 *
 * @param  {(Buffer|Stream|String)} source The input source.
 * @param  {EntryData} entry entry dat.
 * @return {Archiver} this
 */
PGArchiver.prototype.append = function(source, entry) {
    if (!this._archive) {
        log.error('Failed to append. Archive is empty.');
        return this;
    }

    return this._archive.append(source, entry);
};

/**
 * Append all files from a directory and put its contents at a sub directory of the root of archive.
 * It is better to check whether source directory exists before calling this method.
 * 
 * @param {String} srcDir source directory which has files to be zipped.
 * @param {String} subDir sub directory of the root of archive if exits, otherwise, put all files at the root of archive.
 * @return {Archiver} this
 */
PGArchiver.prototype.directory = function(srcDir, subDir) {
    if (!srcDir) {
        log.error('Source directory should not be empty.');
        return this;
    }
    if (!subDir) {
        return this._archive.directory(srcDir, false);
    } else {
        return this._archive.directory(srcDir, subDir);
    }
};

/**
 * Finalizes the instance and prevents further appending to the archive structure (queue will continue til drained).
 *
 * The `end`, `close` or `finish` events on the destination stream may fire right after calling this method so you 
 * should set listeners beforehand to properly detect stream completion.
 * 
 * @return {Archiver} this
 */
PGArchiver.prototype.finalize = function() {
    if (!this._archive || !this._output) {
        log.error('Failed to finalize. Archive is empty.');
        return this;
    }
    return this._archive.finalize();
};

/**
 * Pipe the archive stream to the zip file.
 * 
 * @param {function} callback(err) err is null if no error occurs
 */
PGArchiver.prototype.pipe = function(callback) {
    if (!this._archive || !this._output) {
        log.error('Failed to pipe. Archive is empty.');
        return;
    }
    let me = this;

    me._archive.pipe(me._output).on('error', function(err) {
        log.error('Pipe error:');
        log.trace(err);
        if (typeof callback === 'function') {
            callback(err);
        }
    }).on('close', function() {
        log.debug('Pipe to ' + me.zipFilePath + ' closed');
        if (typeof callback === 'function') {
            callback();
        }
    });
};

/**
 * Finalize the archive and pipe the archive stream to the zip file.
 * @param {Function} callback(err)
 */
PGArchiver.prototype.finalizeAndPipe = function(callback) {
    if (!this._archive || !this._output) {
        log.error('Failed to finalize and pipe. Archive is empty.');
        return;
    }

    this.finalize();
    this.pipe(callback);
};

/**
 * Returns the current length (in bytes) that has been emitted.
 * @return {Number}
 */
PGArchiver.prototype.size = function() {
    if (!this._archive) {
        log.error('Archive is empty.');
        return 0;
    }
    return this._archive.pointer();
};

/**
 * Aborts the archiving process, taking a best-effort approach, by:
 *
 * - removing any pending queue tasks
 * - allowing any active queue workers to finish
 * - detaching internal module pipes
 * - ending both sides of the Transform stream
 *
 * Also, the zip file will be deleted.
 *
 * @param {Function} callback
 */
PGArchiver.prototype.abort = function(callback) {
    if (!this._archive) {
        log.error('Failed to abort. Archive is empty.');
        return;
    }
    if (this._aborted) {
        if (typeof callback === 'function') {
            callback();
        }
        return;
    }
    this._archive.abort();
    this._aborted = true;
    if (this._output) {
        let me = this;
        this._output.on('close', function() {
            cleanTempArchiveFile(me.zipFilePath, callback);
        });
        this._output.end();
    }
};

/**
 * Delete temp zip file.
 * 
 * @param {String} zipFilePath file path to delete 
 * @param {Function} callback(err) 
 */
function cleanTempArchiveFile(zipFilePath, callback) {
    fse.remove(zipFilePath, function(err) {
        if (typeof callback === 'function') {
            callback(err);
        } else if (err) {
            log.error(err.stack || err);
        }
        // var parentZipDir = path.dirname(zipFilePath);
        // console.log('dir:', parentZipDir);
        // fse.readdir(parentZipDir, function(err, filenameArray) {
        //     if (err) {
        //         log.warn('Failed to list files in temp zip folder at ' + parentZipDir);
        //         log.trace(err);
        //         callback();
        //         return;
        //     }
        //     console.log('files in dir:', filenameArray);
        //     if (!filenameArray || filenameArray.length === 0) {
        //         fse.remove(parentZipDir, function(err) {
        //             if (err) {
        //                 log.warn('Failed to clean temp zip folder at ' + parentZipDir);
        //                 log.trace(err);
        //             }
        //             callback();
        //         });
        //     }
        // });
    });
}

module.exports = PGArchiver;
