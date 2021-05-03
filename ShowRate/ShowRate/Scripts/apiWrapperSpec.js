/// <reference path="apiWrapper.js" />
/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" />

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
            var shows = [{ title: 'a', genres: ['a'] }, { title: 'a', genres: ['a'] }, { title: 'a', genres: ['a'] }, { title: 'a', genres: ['a'] }]; 
            var expectedMatches = 6;

            var matches = showRate.getMatchesByArray(shows);

            expect(matches.length).toBe(expectedMatches);
        }
    });

    it("Build correct number of matches excluding show with no genres in common", function () {
        {
            var shows = [{ title: 'a', genres: ['drama', 'horror'] }, { title: 'b', genres: ['horror'] }, { title: 'c', genres: ['comic'] }, { title: 'd', genres: ['comic'] }]; 
            var expectedMatches = 2;

            var matches = showRate.getMatchesByArray(shows);

            expect(matches.length).toBe(expectedMatches);
        }
    });

    it("Build correct number of matches comparing same show on different common genres", function () {
        {
            var shows = [{ title: 'a', genres: ['drama', 'horror'] }, { title: 'b', genres: ['horror', 'drama'] }, { title: 'c', genres: ['comic', 'crime'] }, { title: 'd', genres: ['comic', 'crime'] }];
            var expectedMatches = 4;

            var matches = showRate.getMatchesByArray(shows);

            expect(matches.length).toBe(expectedMatches);
        }
    });

    it("If show wins set it as the winner of the match", function () {
        {
            
            var show = new showRate.Show('title', 'image', ['drama', 'comedy']);
            var show2 = new showRate.Show('title2', 'image2', ['drama']);
            
            var match = new showRate.Match(show, show2, 'drama');

            document.getElementById = function(name) {
                return {
                    winControl: {
                        next: function() {
                            {
                            }
                        }
                    }
                };
            }

            match.leftShowWins();

            expect(match.winner).toBe('title');

            match.rightShowWins();

            expect(match.winner).toBe('title2');
        }
    });

});