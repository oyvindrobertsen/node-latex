# node-latex [![Build status](http://ci.oyvindrobertsen.com/buildStatus/icon?job=node-latex)](http://ci.oyvindrobertsen.com/job/node-latex/)

A simple LaTeX library for Node.js that will support multiple compilers 
(defaulting to `rubber`) and references, images, etc.

Uses `mocha` for tests.

# Usage

    var latex = require('node-latex');
    latex.compile('file.tex');

Uses Rubber to compile, so that's a dependency.
**WIP: Support for other compilers will be implemented.**
The compile function also accepts an options object. For now, the compiler
option is ignored.

    var compileOpts = {
      path: <PATH_TO_TEX_FILE>,
      compiler: 'xelatex',
      outDir: <PATH_TO_OUTPUT_DIR>
    }
