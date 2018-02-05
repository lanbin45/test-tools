/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

'use strict';

// var FSWin = require('fswin');
const FS = require('fs-extra');
const Path = require('path');
const Assert = require('assert');
const log = require('../utils/PGLog').getLogger('PGFile');

// ============================================================

/**
 * Class PGFile(path, [paths ...])
 *
 * An abstract representation of file and directory pathnames.
 * 
 * @param {String|PGFile} paths multiple the file or directory paths
 *
 * @return {PGFile} null, if invalid arguments;
 *            otherwise, return a PGFile instance
 *
 */
function /* Class*/ PGFile(paths) {
    try {
        this._path = undefined;
        if (arguments.length == 0) {
            arguments[0] = '.';
        } else if (!arguments[0]) {
            log.warn('Arguments to PGFile must be PGFile or Strings');
            return null;
        } else if (arguments[0] instanceof PGFile) {
            arguments[0] = arguments[0].getPath();
        }
        for (let i = 0; i < arguments.length; ++i) {
            let arg = arguments[i];
            if (!(typeof arg === 'string') && !(arg instanceof String)) { // not string
                log.warn('Arguments to PGFile must be strings');
                return null;
            }
        }
        this._path = Path.join(...arguments);
    } catch (error) {
        log.error('Failed to create PGFile');
        log.trace(error);
        this._path = '';
    }
}

/**
 * Append file path.
 *
 * @param {string} paths
 * @return {PGFile}
 */
PGFile.prototype.append = function(paths) {
    if (arguments.length == 0) {
        return this;
    }
    for (let i = 0; i < arguments.length; ++i) {
        let arg = arguments[i];
        if (!(typeof arg === 'string') && !(arg instanceof String)) { // not string
            throw new Error('path must be a string');
        }
    }
    return new PGFile(this._path, Path.join(...arguments));
};

PGFile.prototype.getParentFile = function() {
    let parentPath = this.getParent();
    if (!parentPath) {
        return null;
    }
    return new PGFile(parentPath);
};

PGFile.prototype.getParent = function() {
    let absPath = this.getAbsolutePath();
    let parPath = Path.dirname(absPath);
    if (absPath == parPath) {
        parPath = null;
    }
    return parPath;
};
/**
 * Return the last portion of a path. Similar to the Unix basename command.
 * @param {String} [ext]
 */
PGFile.prototype.getName = function(ext) {
    return Path.basename(this._path, ext);
};
/**
 * Return the extension of the path, from the last '.' 
 * to end of string in the last portion of the path. 
 * If there is no '.' in the last portion of the path 
 * or the first character of it is '.', then it returns 
 * an empty string. 
 */
PGFile.prototype.getExtname = function() {
    return Path.extname(this._path);
};

PGFile.prototype.getPath = function() {
    return String(this._path);
};

PGFile.prototype.getAbsolutePath = function() {
    return Path.resolve(this._path);
};

/**
 * Tests whether the file or directory denoted by this abstract pathname exists.
 *
 * return <boolean>: true if and only if the file or directory denoted by this abstract pathname exists; false otherwise
 * Throws:
 */
PGFile.prototype.exists = function() {
    return FS.existsSync(this._path);
};

/**
 * mkdirs(callback(err))
 * Creates the directory named by this abstract pathname, including any
 * necessary but nonexistent parent directories. Note that if this operation
 * fails it may have succeeded in creating some of the necessary parent
 * directories.
 */
PGFile.prototype.mkdirs = function( /* Function*/ callback) {
    return FS.mkdirs(this._path, callback);
};
/**
 * Creates the directory named by this abstract pathname, including any
 * necessary but nonexistent parent directories. Note that if this operation
 * fails it may have succeeded in creating some of the necessary parent
 * directories.
 *
 * @return <boolean> true if and only if the directory was created, along with all
 *         necessary parent directories; false otherwise
 * @throws Error
 */
PGFile.prototype.mkdirsSync = function() {
    return FS.mkdirsSync(this._path);
};
/**
 * ensureDir(callback(err))
 * Ensures that the directory exists.
 * If the directory structure does not exist, it is created.
 *
 */
PGFile.prototype.ensureDir = function( /* Function*/ callback) {
    if (!this.exists) {
        this.mkdirs(callback);
    } else {
        this.mkdirs(callback);
    }
};

/**
 * Creates the directory named by this abstract pathname, including any
 * necessary but nonexistent parent directories. Note that if this operation
 * fails it may have succeeded in creating some of the necessary parent
 * directories.
 *
 * @return <boolean> true if and only if the directory was created, along with all
 *         necessary parent directories; false otherwise
 */
PGFile.prototype.ensureDirSync = function() {
    return FS.ensureDirSync(this._path);
};
/**
 * ensureFile(callback(err))
 *
 * Ensures that the file exists.
 * If the file that is requested to be created is in directories that do not exist,
 * these directories are created. If the file already exists, it is NOT MODIFIED.
 * @param callback <Function(Error)>
 */
PGFile.prototype.ensureFile = function( /* Function*/ callback) {
    Assert.equal(arguments.length, 1, 'invalid arguments');
    return FS.ensureFile(this._path, callback);
};

PGFile.prototype.ensureFileSync = function() {
    return FS.ensureFileSync(this._path);
};

/**
 * @param {Function} callback(err, Array<filename>)
 */
PGFile.prototype.list = function(callback) {
    if (!this.isDirectory()) {
        callback();
        return;
    }
    // let parent = this._path;
    FS.readdir(this._path, function(err, filenameArray) {
        if (!callback) {
            return;
        }
        if (err) {
            callback(err);
            return;
        }
        callback(null, filenameArray);
    });
};


/**
 * Finds files within a given directory (and optionally its subdirectories)
 * which match an array of extensions.
 *
 * @return <Array<String>> an array of sub file or directory.
 *         if return null, the pathname is not a directory.
 *
 */
PGFile.prototype.listSync = function() {
    if (!this.exists() || !this.isDirectory()) {
        return null;
    }
    return FS.readdirSync(this._path);
};

PGFile.prototype.listPaths = function(callback) {
    let parent = this._path;
    this.list(function(err, filenameArray) {
        if (!callback) {
            return;
        }
        if (err) {
            callback(err);
            return;
        }
        if (!filenameArray) {
            callback();
            return;
        }
        let length = filenameArray.length;
        let pathArray = new Array(length);
        for (let i = 0; i < length; ++i) {
            pathArray[i] = Path.join(parent, filenameArray[i]);
        }
        callback(null, pathArray);
    });
};
PGFile.prototype.listPathsSync = function() {
    let filenameArray = this.listSync();
    if (!filenameArray) {
        return null;
    }
    let length = filenameArray.length;
    let pathArray = new Array(length);
    let parent = this._path;
    for (let i = 0; i < length; ++i) {
        pathArray[i] = Path.join(parent, filenameArray[i]);
    }
};


/**
 * Finds files' path within a given directory (and optionally its subdirectories)
 * which match an array of extensions.
 *
 * @param {Function} callback(err, Array<PGFile>) an array of sub file or directory.
 *         if return null, the pathname is not a directory.
 *
 */
PGFile.prototype.listFiles = function(callback) {
    this.listPaths(function(err, pathArray) {
        if (!callback) {
            return;
        }
        if (err) {
            callback(err);
            return;
        }
        if (!pathArray) {
            callback();
            return;
        }
        let length = pathArray.length;
        let fileArray = new Array(length);
        // let parent = this._path;
        for (let i = 0; i < length; ++i) {
            fileArray[i] = new PGFile(pathArray[i]);
        }
        callback(null, fileArray);
    });
};


/**
 * Finds files' path within a given directory (and optionally its subdirectories)
 * which match an array of extensions.
 *
 * @return <Array<PGFile>> an array of sub file or directory.
 *         if return null, the pathname is not a directory.
 *
 */
PGFile.prototype.listFilesSync = function() {
    let filenameArray = this.listSync();
    if (!filenameArray) {
        return null;
    }
    let length = filenameArray.length;
    let fileArray = new Array(length);
    let parent = this._path;
    for (let i = 0; i < length; ++i) {
        fileArray[i] = new PGFile(Path.join(parent, filenameArray[i]));
    }
    return fileArray;
};
/**
 *
 * @return <boolean> true if the file is Directory; false othrewise
 *
 */
PGFile.prototype.isDirectory = function() {
    try {
        return FS.statSync(this._path).isDirectory();
    } catch (err) {
        return false;
    }
};
/**
 * @param {Function} callback(Error)
 * @param {boolean} recursive  
 *             Is true, delete sub subfolders and files.
 */
PGFile.prototype.deleteFile = function(callback, recursive) {
    Assert.ok(arguments.length == 1 || arguments.length == 2, 'invalid arguments');
    if (!!recursive) {
        FS.remove(this._path, function(err) {
            if (callback) {
callback(err);
}
        });
    } else {
        FS.unlink(this._path, function(err) {
            if (callback) {
callback(err);
}
        });
    }
};

PGFile.prototype.deleteFileSync = function(recursive) {
    if (!!recursive) {
        FS.removeSync(this._path);
    } else {
        FS.unlinkSync(this._path);
    }
};

/**
 *
 * @return <boolean> true if the file is File; false othrewise
 *
 */
PGFile.prototype.isFile = function() {
    try {
        return FS.statSync(this._path).isFile();
    } catch (err) {
        return false;
    }
};

/**
 * Returns the length of the file denoted by this abstract pathname.
 * The return value is unspecified if this pathname denotes a directory.
 *
 * @return {number} the file size
 * @throws
 */
PGFile.prototype.length = function() {
    try {
        return FS.statSync(this._path).size;
    } catch (err) {
        return 0;
    }
};

PGFile.prototype.valueOf = function() {
    return String(this.getPath());
};

PGFile.prototype.toString = function() {
    return String(this.getPath());
};

/**
 * function([options])
 *
 * @param option Object
 *       encoding String | Null default = null
 *         flag String default = 'r'
 *
 * @param callback(err, data)
 *
 * If no encoding is specified, then the raw buffer is returned.
 *
 */
PGFile.prototype.readFile = function( /* Object*/ option, /* err, data*/ callback) {
    Assert.ok(arguments.length == 1 || arguments.length == 2, 'invalid arguments');
    if (typeof option === 'function') {
        callback = option;
        option = null;
    }
    let self = this;
    FS.readFile(self._path, option, function(err, data) {
        callback.call(self, err, data);
    });
};

/**
 * function([options])
 * The synchronous version
 *
 * @param option Object
 *       encoding String | Null default = null
 *         flag String default = 'r'
 *
 * @return String|Buffer
 *
 * If no encoding is specified, then the raw buffer is returned.
 *
 * @throws Eroor
 *
 */
PGFile.prototype.readFileSync = function( /* Object*/ option) {
    return FS.readFileSync(this._path, option);
};

/**
 * function(data, [options], callback(err))
 *
 * @param data String | Buffer
 *
 * @param option Object
 *       encoding String | Null default = 'utf8'
 *         mode Number default = 438 (aka 0666 in Octal)
 *         flag String default = 'w'
 *
 * @param callback(err)
 *
 *The encoding option is ignored if data is a buffer. It defaults to 'utf8'.
 *
 */
PGFile.prototype.writeFile = function( /* String|Buffer*/ data, /* Object*/ option, /* err*/ callback) {
    Assert.ok(arguments.length == 2 || arguments.length == 3, 'invalid arguments');
    if (typeof option == 'function') {
        callback = option;
        option = {
            encoding: 'utf8'
        };
    }
    let self = this;
    FS.writeFile(self._path, data, option, function(err) {
        callback.call(self, err);
    });
};

/**
 * function(data, [options])
 * The synchronous version
 *
 * @param data String | Buffer
 *
 * @param option Object
 *       encoding String | Null default = 'utf8'
 *         mode Number default = 438 (aka 0666 in Octal)
 *         flag String default = 'w'
 *
 *The encoding option is ignored if data is a buffer. It defaults to 'utf8'.
 *
 * @throws Eroor
 *
 */
PGFile.prototype.writeFileSync = function( /* String|Buffer*/ data, /* Object*/ option) {
    FS.writeFileSync(this._path, data, option);
};

// ============================================================

module.exports = PGFile;
