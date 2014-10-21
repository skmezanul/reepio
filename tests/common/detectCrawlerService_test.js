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

        it('should detect bing agents as crawler', inject(function(detectCrawlerService){
            expect(detectCrawlerService.isCrawler('Bingbot')).toBe(true);
            expect(detectCrawlerService.isCrawler('Adidxbot')).toBe(true);
            expect(detectCrawlerService.isCrawler('MSNBot')).toBe(true);
            expect(detectCrawlerService.isCrawler('BingPreview')).toBe(true);
        }));

        it('should detect yahoo agents as crawler', inject(function(detectCrawlerService){
            expect(detectCrawlerService.isCrawler('Yahoo Slurp')).toBe(true);
            expect(detectCrawlerService.isCrawler('Yahoo! Slurp China')).toBe(true);
        }));

        it('should detect duckduckgo agents as crawler', inject(function(detectCrawlerService){
            expect(detectCrawlerService.isCrawler('DuckDuckBot')).toBe(true);
        }));

    });
});