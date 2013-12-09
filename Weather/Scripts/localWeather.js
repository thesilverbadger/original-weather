/// <reference path="jquery-1.10.2.intellisense.js" />

var postcodeLookupError = $("#postcodeLookupError");

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        postcodeLookupError.show();
        postcodeLookupError.html("Geolocation is not supported by this browser.");
    }
}

getLocation();

function showPosition(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
}

function showError(error) {

    postcodeLookupError.show();

    switch (error.code) {
        case error.PERMISSION_DENIED:
            postcodeLookupError.html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            postcodeLookupError.html("Location information is unavailable.");
            $("#postcodeLookup").show();
            break;
        case error.TIMEOUT:
            postcodeLookupError.html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            postcodeLookupError.html("An unknown error occurred.");
            break;
    }
}