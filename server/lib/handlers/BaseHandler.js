/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle all HTTP request.
 */

'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');

const log = require('../utils/PGLog').getLogger('BaseHandler');
// ============================================================
const execute = (req, res) => {
    let uri = url.parse(req.url).pathname;
    let distDir = path.join('dist', uri);
    let filename = path.join(process.cwd(), distDir);

    log.info('Request: ' + uri);

    let contentTypesByExtension = {
        '.html': 'text/html',
        '.htm': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.pdf': 'application/pdf'
    };

    // path.exists(filename, function(exists) {
    fs.exists(filename, function(exists) {
        if (!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404 Not Found\n');
            res.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.write(err + '\n');
                res.end();
                return;
            }

            let headers = {};
            let contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType) headers['Content-Type'] = contentType;
            res.writeHead(200, headers);
            res.write(file, 'binary');
            res.end();
        });
    });
};

exports.execute = execute;
