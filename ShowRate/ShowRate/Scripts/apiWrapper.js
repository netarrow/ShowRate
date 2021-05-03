
/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" />
(function (context) {

    var shuffle = function (input) {

        for (var i = input.length - 1; i >= 0; i--) {

            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }


    var options = {
        url: 'http://api.trakt.tv/user/library/shows/all.json/{put_here_your_key}/{put_here_your_username}',
        type: 'GET',
        headers: { "Content-type": "application/json" },
        responseType: "json"
    };

    context.showRate = context.showRate || {};

    var Show = WinJS.Class.define(function (title, image, genres) {
        this.title = title;
        this.image = image;
        this.genres = genres;
        this.genresList = genres.join(", ");
    });

    context.showRate.Show = Show;

    context.showRate.getShows = function () {
        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr(options).done(function (data) {
                var shows = context.showRate.buildShowsByJson(data.responseText);
                complete(shows);
            });
        });
    }

    context.showRate.buildShowsByJson = function (json) {
        var apiShows = JSON.parse(json);
        var shows = [];
        for (var i in apiShows) {
            var s = apiShows[i];
            var show = new Show(s.title, s.images.poster, s.genres);
            shows.push(show);
        }
        return shows;
    }

    context.showRate.factorial = function (n) {
        if (n == 1) return 1;
        return n * arguments.callee(n - 1);
    };

    context.showRate.combination = function (n, k) {
        var f = context.showRate.factorial;
        return f(n) / (f(k) * f(n - k));
    };

    var Match = WinJS.Class.define(function(first, second, genreCompared) {
        this.first = first;
        this.second = second;
        this.genreCompared = genreCompared;
        this.winner = '';
    },
        {
            leftShowWins: function () {
                this.winner = this.first.title;
                document.getElementById('flippenView').winControl.next();
            },
            rightShowWins: function () {
                this.winner = this.second.title;
                document.getElementById('flippenView').winControl.next();
            }
        });

    WinJS.Namespace.define("Converters", {
        leftShowWins: WinJS.Binding.converter(function (model) {
            var fixFunc = model.leftShowWins.bind(model);
            WinJS.Utilities.markSupportedForProcessing(fixFunc);
            return fixFunc;
        }),

        rightShowWins: WinJS.Binding.converter(function (model) {
            var fixFunc = model.rightShowWins.bind(model);
            WinJS.Utilities.markSupportedForProcessing(fixFunc);
            return fixFunc;
        })
});

    context.showRate.Match = Match;

    context.showRate.getMatchesByArray = function (shows) {
        var matches = [];
        for (var i = 0; i < shows.length - 1; i++) {
            for (var y = i + 1; y < shows.length; y++) {
                
                var commonGenres = shows[i].genres.filter(function (n) {
                    return shows[y].genres.indexOf(n) != -1;
                });

                for (var x = 0; x < commonGenres.length; x++) {
                    var match = new Match(shows[i], shows[y], commonGenres[x]);

                    WinJS.Utilities.markSupportedForProcessing(match.leftShowWins);
                    WinJS.Utilities.markSupportedForProcessing(match.rightShowWins);

                    matches.push(match);
                }
            }
        }

        return shuffle(matches);
    };

})(window);