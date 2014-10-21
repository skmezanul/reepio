'use strict';

describe('detectCrawlerService module tests', function () {
    beforeEach(module('common'));

    describe('isCrawler function tests', function () {

        it('should be defined', inject(function(detectCrawlerService){
            expect(detectCrawlerService.isCrawler).toBeDefined();
            expect(typeof detectCrawlerService.isCrawler).toBe('function');
        }));

        it('should detect google agents as crawler', inject(function(detectCrawlerService){
            expect(detectCrawlerService.isCrawler('Googlebot')).toBe(true);
            expect(detectCrawlerService.isCrawler('Googlebot-News (Googlebot)')).toBe(true);
            expect(detectCrawlerService.isCrawler('Googlebot-Image (Googlebot)')).toBe(true);
            expect(detectCrawlerService.isCrawler('Googlebot-Video (Googlebot)')).toBe(true);
            expect(detectCrawlerService.isCrawler('Mediapartners-Google')).toBe(true);
            expect(detectCrawlerService.isCrawler('Mediapartners (Googlebot)')).toBe(true);
            expect(detectCrawlerService.isCrawler('AdsBot-Google')).toBe(true);
        }));

    });
});