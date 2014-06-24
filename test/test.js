var assert = require('assert'),
lt = require('../latex'),
fs = require('fs');

var texPath = __dirname + '/test.tex';

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
      lt.compile(texPath, done);
    });
    after(removeTexCompiledFiles);
  });
  describe('#compile', function() {
    it('should accept an options object', function(done) {
      var opts = {
        path: texPath,
      };
      lt.compile(opts, done);
    });
    after(removeTexCompiledFiles);
  });
});
