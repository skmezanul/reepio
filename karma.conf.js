module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'public/assets/js/angular-1.2.21/angular.js',
            'public/assets/js/angular-1.2.21/angular-route.js',
            'public/assets/js/angular-1.2.21/angular-mocks.js',
            'public/modules/**/module.js',
            'public/modules/**/*.js',
            'public/config.js',
            'public/app.js',
            'tests/**/*_test.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome', 'Firefox', 'IE'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
