/**
 * Created by andre (http://korve.github.io/) on 29.06.2014
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            src: {
                files: [
                    // copy js
                    { cwd: 'src/js', expand: true, src: ['**/*.js'], dest: 'public/js/', filter: 'isFile' },
                    // copy html
                    { cwd: 'src/html', expand: true, src: ['**/*.html'], dest: 'public/html/', filter: 'isFile' },
                ]
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['src/html/**/*.html'],
                dest: 'public/js/templates.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', [
        'copy',
        'html2js'
    ]);
};