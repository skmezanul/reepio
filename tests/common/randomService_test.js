'use strict';

describe('randomService tests', function () {
    beforeEach(module('common'));

    describe('generateString function tests', function(){
        it('should generate a random string with a length of 6 correctly', inject(function (randomService) {
            expect(randomService.generateString(6).length).toBe(6);
        }));
        it('should have a defaultLength defined', inject(function (randomService) {
            expect(randomService.defaultLength).toBeDefined();
        }));
        it('should return a random string the length of defaultLength if length param is omitted', inject(function (randomService) {
            expect(randomService.generateString().length).toBe(randomService.defaultLength);
        }));
    });
});