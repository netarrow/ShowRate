(function() {
    "use strict";

    WinJS.UI.Pages.define("default.html", {
        ready: function(element, options) {

            showRate.getShows().done(function(data) {

                var shows = data;

                var matchList = document.getElementById("matchList").winControl;
                var matchesList = new WinJS.Binding.List(showRate.getMatchesByArray(shows, true));
                matchList.itemDataSource = matchesList.dataSource;

                var showTemplate = document.getElementById("matchTemplate");
                matchList.itemTemplate = showTemplate;

            });

        }

    });

})();
   