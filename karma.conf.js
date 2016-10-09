// Karma configuration
var path = require( "path" );
var webpackConfig = require( "./webpack.config" );

module.exports = function( config ) {
    config.set( {
        frameworks: [ "jasmine" ],
        browsers: [
            "PhantomJS",
            "Chrome",
            "Firefox"
        ],
        files: [
            // all files ending in "_test"
            { pattern: 'test/*.spec.ts', watched: false },
            { pattern: 'test/**/*.spec.ts', watched: false }
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'test/*.spec.ts': [ 'webpack' ],
            'test/**/*.spec.ts': [ 'webpack' ]
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies
            resolve: webpackConfig.resolve,
            module: webpackConfig.module,
            devtool: "eval-source-map"
        },
        reporters: [ "progress" ]
    } );
};
