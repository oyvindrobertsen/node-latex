var spawn   = require('child_process').spawn,
    fs      = require('fs'),
    path    = require('path');

var CompilerEnum = Object.freeze({
    rubber: 'rubber',
    xelatex: 'xelatex'
});

var outputFlagsEnum = Object.freeze({
    dvi: '',
    pdf: '--pdf',
    ps: '--ps'
});

function DefaultOptions() {
    this.path = null; // Absolute path to main .tex file
    this.compiler = CompilerEnum.rubber; // Which compiler to use
    this.outDir = null; // Directory in which to place compiled files
    this.output = outputFlagsEnum.pdf; // Output format
}

exports.optionsFactory = function(args) {
    var o = new DefaultOptions();
    if (args && args.length) {
        for (var i = 0;i < args.length; i++) {
            var arg = args[i];
            switch(arg) {
                case 'rubber':
                    o.compiler = CompilerEnum.rubber;
                    break;
                case 'xelatex':
                    o.compiler = CompilerEnum.xelatex;
                    break;
                case 'pdf':
                    o.output = outputFlagsEnum.pdf;
                    break;
                case 'dvi':
                    o.output = outputFlagsEnum.dvi;
                    break;
                case 'ps':
                    o.output = outputFlagsEnum.ps;
                    break;

            }
        }
    }
    return o;
};

exports.compile = function(opts, callback) {
    // Opts can be an option object or just the path to the .tex file
    if (typeof(opts) == 'string') {
        var p = opts;
        opts = new DefaultOptions();
        opts.path = p;
    }
    //Naïve, insecure version
    var comp = spawn(opts.compiler, ['--pdf', opts.path],
            {cwd: path.dirname(opts.path), env: process.env});
    comp.on('error', function(err) {
        callback(err);
    });
    comp.on('exit', function(code, signal) {
        fs.exists(__dirname + '/test/test.pdf', function(exists) {
            if (!exists) {
                callback('Unable to compile');
            }
            callback();
        });
    });
};
