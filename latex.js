var spawn   = require('child_process').spawn,
    fs      = require('fs'),
    path    = require('path');

function DefaultOptions() {
    this.path = null; // Absolute path to main .tex file
    this.compiler = 'rubber'; // Which compiler to use
    this.outDir = null; // Directory in which to place compiled files
}

exports.compile = function(opts, callback) {
    // Opts can be an option object or just the path to the .tex file
    if (typeof(opts) == 'string') {
        var p = opts;
        opts = new DefaultOptions();
        opts.path = p;
    }
    var flags = '--pdf';
    if (opts.outDir) {
      flags.concat(' --into=' + opts.outDir);
    } else {
      opts.outDir = path.dirname(opts.path);
    }
    var comp = spawn('rubber', [flags, opts.path],
            {cwd: path.dirname(opts.path), env: process.env});
    comp.on('error', function(err) {
        callback(err);
    });
    var pdfPath = opts.outDir + '/' + path.basename(opts.path).split('.')[0] +
      '.pdf';
    comp.on('exit', function(code, signal) {
        fs.exists(pdfPath, function(exists) {
            if (!exists) {
                callback(new Error('Unable to compile, ' + pdfPath));
                return;
            }
            callback();
        });
    });
};
