/**
 * Created by andre (http://korve.github.io/) on 29.06.2014
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:              grunt.file.readJSON('package.json'),
        ngAnnotate:       {
            angular:    {
                src:  [
                    'public/bower_components/jquery/dist/jquery.js',
                    'public/bower_components/angular/angular.js',
                    'public/bower_components/angular-route/angular-route.js',
                    'public/bower_components/angular-animate/angular-animate.js',
                    'public/bower_components/angulartics/src/angulartics.js',
                    'public/bower_components/angulartics/src/angulartics-piwik.js',
                ],
                dest: 'build/lib/angular.js'
            },
            thirdparty: {
                src:  [
                    'public/bower_components/bootstrap/dist/js/bootstrap.js',
                    'public/js/ui-bootstrap-0.11.0.js',
                    'public/bower_components/reepio-paste-to-clipboard/bin/js/swfobject.js',
                    'public/bower_components/threejs/build/three.js',
                    'public/bower_components/peerjs/peer.js',
                    'public/js/jquery.socialshareprivacy.js',
                    'public/js/paste.js/paste.js'
                ],
                dest: 'build/lib/thirdparty.js'
            },
            scripts:    {
                src:  [
                    'public/modules/**/module.js',
                    'public/modules/**/*.js'
                ],
                dest: 'build/app/scripts.js'
            },
            app:        {
                src:  [
                    'public/config.js',
                    'public/app.js'
                ],
                dest: 'build/app/app.js'
            }
        },
        uglify:           {
            options: {
                preserveComments: 'some',
                mangle:           true,
                compress:         {
                    drop_console: true
                }
            },
            libs:    {
                files: {
                    'dist/libs.min.js': [
                        'build/lib/*.js'
                    ]
                }
            },
            app:     {
                files: {
                    'dist/app.min.js': [
                        'build/app/*.js'
                    ]
                }
            }
        },
        cssmin:           {
            theme: {
                files: {
                    'dist/css/theme.min.css': [
                        'public/fonts/fontello/css/fontello.css',
                        'public/fonts/font-awesome-4.1.0/css/font-awesome.css',
                        'public/js/socialshareprivacy/socialshareprivacy.css',
                        'public/css/theme.css'
                    ]
                }
            }
        },
        copy:             {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd:    'public',
                        dest:   'dist/',
                        src:    [
                            '**/*.swf',
                            'css/*.min.css',
                            'fonts/**',
                            'images/**',
                            'js/socialshareprivacy/**',
                            'modules/**/*.html',
                            'github-btn.html'
                        ]
                    }
                ]
            }
        },
        imagemin:         {
            dynamic: {
                files: [{
                    expand: true,
                    cwd:    'dist/images/',
                    src:    ['**/*.{png,jpg,gif}'],
                    dest:   'dist/images/'
                }]
            }
        },
        fingerprint:      {
            assets: {
                src:      [
                    'dist/app.min.js',
                    'dist/libs.min.js',
                    'dist/css/theme.min.css',
                ],
                filename: 'fingerprint',
                template: '\'<%= fingerprint %>\''
            }
        },
        'string-replace': {
            index:    {
                files:   {
                    'build/index.html': 'public/index_prod.html'
                },
                options: {
                    replacements: [
                        {
                            pattern:     /@@assetFingerprint@@/g,
                            replacement: function (match, offset, string) {
                                return grunt.file.read('./fingerprint').replace(/\'/g, '');
                            }
                        }
                    ]
                }
            },
            htaccess: {
                files:   {
                    'dist/.htaccess': 'public/.htaccess'
                },
                options: {
                    replacements: [
                        {
                            pattern:     /#@@DIST_RULES/g,
                            replacement: function (match, offset, string) {
                                return '<IfModule mod_ssl.c>\n' +
                                    'RewriteCond %{HTTPS} off\n' +
                                    'RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]\n' +
                                    '</IfModule>';
                            }
                        }
                    ]
                }
            },
            appMinJs: {
                files:   {
                    'dist/app.min.js': 'dist/app.min.js'
                },
                options: {
                    replacements: [
                        {
                            pattern:     /127\.0\.0\.1/g,
                            replacement: 'reep.io'
                        }
                    ]
                }
            }
        },
        htmlmin:          {
            dist: {
                options: {
                    removeComments:     true,
                    collapseWhitespace: true,
                    minifyJS:           true
                },
                files:   {
                    'dist/index.html': 'build/index.html'
                }
            }
        },
        clean:            ['build', 'fingerprint']
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-fingerprint');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('default', [
        'ngAnnotate',
        'uglify',
        'cssmin',
        'copy',
        'imagemin',
        'fingerprint',
        'string-replace',
        'htmlmin',
        'clean'
    ]);
};