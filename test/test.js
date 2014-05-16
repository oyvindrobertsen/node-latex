var assert = require('assert'),
    lt = require('../latex'),
    fs = require('fs');


var path = __dirname + '/test.tex';

var removeTexCompiledFiles = function() {
    fs.exists(__dirname + '/test.pdf', function(exists) {
        if (!exists) {
            return;
        }
        var unlinkCallback = function(err) {
            if (err) {
                throw err;
            }
        };
        fs.unlink(__dirname + '/test.pdf', unlinkCallback);
        fs.unlink(__dirname + '/test.aux', unlinkCallback);
        fs.unlink(__dirname + '/test.log', unlinkCallback);
    });
};

describe('LaTeX', function() {
    describe('#compile', function() {
        before(removeTexCompiledFiles);
        it('should compile our latex file', function(done) {
            lt.compile(path, done);
        });
        after(removeTexCompiledFiles);
    });
});

