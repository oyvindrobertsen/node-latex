var spawn   = require('child_process').spawn,
    fs      = require('fs');

exports.compile = function(path, callback) {
    //Naïve, insecure version
    var comp = spawn('rubber', ['--pdf', 'test.tex'], {cwd: 'test/', env: process.env});
    comp.on('error', function(err) {
        callback(err);
    });
    comp.on('exit', function(code, signal) {
        fs.exists(__dirname + '/test/test.pdf', function(exists) {
            if (!exists) {
                callback('Unable to compile');
            }
            else {
                callback();
            }
        });
    });
}
