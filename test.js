var lt = require('./latex.js');

exports.compileTest = function(test) {
    test.ok("Hello World", lt.compile());
    test.done();
}
