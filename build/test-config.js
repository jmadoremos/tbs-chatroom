// registering babel before running any test will
// let webpack transpile those tests
require('babel-register');

// treating .css file will prevent errors in Mocha
// while it parses through each javascript files where
// we have embedded our stylesheets (@see index.js import)
require.extensions['.css'] = function() {};
