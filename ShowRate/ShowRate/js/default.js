// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" />
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var shows = new WinJS.Binding.List();

    WinJS.Namespace.define("ViewModel",
    {
        Shows: shows,
        Compares: 0,
        Valued: WinJS.Binding.as(0)
    });

    WinJS.UI.Pages.define('default.html', {
        ready: function () {
            WinJS.UI.processAll().then(getShows);
        }
    });

    function getShows() {
        showRate.getShows().then(function (data) {
            var matches = showRate.getMatchesByArray(data);
            for (var i in matches) {
                shows.push(matches[i]);
            }
            ViewModel.Compares = matches.length;
            document.getElementById('flippenView').winControl.addEventListener("pageselected", function () {
                ViewModel.Valued = document.getElementById('flippenView').winControl.currentPage + 1;
                WinJS.Binding.processAll(document.getElementById('header'), ViewModel);
            });

        });
    }

  
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
