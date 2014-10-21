'use strict';

describe('common.crypto module', function () {

    describe('common.crypto.crc32 function tests', function () {
        var testString, crc;

        beforeEach(module('common'));
        beforeEach(function () {
            testString = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, ea ex ipsa itaque quis totam?';
            crc = '8F02C325';
        });

        it('should be defined', inject(function ($crypto) {
            expect($crypto.crc32).toBeDefined();
        }));

        it('should yield the correct crc hash for testString', inject(function($crypto) {
            expect($crypto.crc32(testString)).toBe(crc);
        }));

        it('should return a hash for valid values', inject(function($crypto) {
            expect($crypto.crc32(testString)).toNotBe(null);
            expect($crypto.crc32(0)).toNotBe(null);
            expect($crypto.crc32('0')).toNotBe(null);
            expect($crypto.crc32(' ')).toNotBe(null);
        }));

        it('should return null for invalid values', inject(function($crypto) {
            expect($crypto.crc32(null)).toBeNull();
            expect($crypto.crc32('')).toBeNull();
        }));

    });
});