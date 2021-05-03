
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

    context.showRate.getMatchesByArray = function (shows, randomized) {
        var matches = [];
        for (var i = 0; i < shows.length - 1; i++) {
            for (var y = i + 1; y < shows.length; y++) {
                matches.push({first: shows[i], second: shows[y]});
            }
        }

        return randomized ? shuffle(matches) : matches;
    };

})(window);