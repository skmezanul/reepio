'use strict';

describe('common.crypto module', function () {

    describe('service tests', function () {
        var testString, crc;

        beforeEach(module('common'));
        beforeEach(function () {
            testString = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, ea ex ipsa itaque quis totam?';
            crc = '8F02C325';
        });

        it('should have a function "crc32" defined', inject(function ($crypto) {
            expect($crypto.crc32).toBeDefined();
        }));

        it('should yield the correct crc hash for testString', inject(function($crypto) {
            expect($crypto.crc32(testString)).toBe(crc);
        }));

    });
});