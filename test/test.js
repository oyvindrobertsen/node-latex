var lt = require('./latex'),
    assert = require('assert');

var path = __dirname + '/testfiles/test.tex';

describe('#compile', function() {
    it('should compile our latex file', function(done) {
        lt.compile(path, done);
    })
});
