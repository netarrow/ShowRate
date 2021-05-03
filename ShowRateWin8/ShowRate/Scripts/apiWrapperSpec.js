/// <reference path="apiWrapper.js" />
/// <reference path="C:\Program Files (x86)\Microsoft SDKs\Windows\v8.0\ExtensionSDKs\Microsoft.WinJS.1.0\1.0\DesignTime\CommonConfiguration\neutral\Microsoft.WinJS.1.0\js\base.js" />
/// <reference path="C:\Program Files (x86)\Microsoft SDKs\Windows\v8.0\ExtensionSDKs\Microsoft.WinJS.1.0\1.0\DesignTime\CommonConfiguration\neutral\Microsoft.WinJS.1.0\js\ui.js" />

describe("Trakt API wrapper", function () {
    var shows = [];

    it('Can create Show class by json', function () {
        var customShows = showRate.buildShowsByJson('[{ "title": "fargo", "images": { "poster": "imageUrl" }, "genres": ["drama", "thriller"] },{ "title": "24", "images": { "poster": "24imageUrl" }, "genres": ["drama", "thriller"] }]');
        expect(customShows.length).toBe(2);
        expect(customShows[0].title).toBe('fargo');
        expect(customShows[0].image).toBe('imageUrl');
        expect(customShows[0].genres[0]).toBe('drama');
        expect(customShows[0].genresList).toBe('drama, thriller');

        expect(customShows[1].title).toBe('24');
        expect(customShows[1].image).toBe('24imageUrl');
        expect(customShows[1].genres[1]).toBe('thriller');
        expect(customShows[1].genresList).toBe('drama, thriller');
    });

    it("Can get shows from API", function (done) {

       showRate.getShows().done(function (data) {
           shows = data;
           done();
       });
        
   });

   it("Must return some shows", function () {
       expect(shows.length).toBeGreaterThan(0);
   });

   it("Calc factorial", function () {

       expect(showRate.factorial(4)).toBe(24);

   });

   it("Get combination number", function () {

       expect(showRate.combination(4, 2)).toBe(6);
       expect(showRate.combination(38, 2)).toBe(703);
       expect(showRate.combination(100, 2)).toBe(4950);

   });

    it("Build correct number of matches", function() {
        {
            var shows = ['a', 'b', 'c', 'd']; // 4 items
            var expectedMatches = 6;

            var matches = showRate.getMatchesByArray(shows);

            expect(matches.length).toBe(expectedMatches);
        }
    });

});