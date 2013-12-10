﻿/// <reference path="jquery-1.10.2.intellisense.js" />
console.log("loaded");

var weatherLookupError = $("#weatherLookupError");

function getLocation() {
    console.log("getLocation");

    if (navigator.geolocation) {
        console.log("browser supports geolocation");
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        console.log("browser does not support geolocation");
        weatherLookupError.show();
        weatherLookupError.html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    $("#localWeather").show();
    console.log("lat: " + latitude);
    console.log("log: " + longitude);
}

function showError(error) {

    weatherLookupError.show();
    console.log(error.code);

    switch (error.code) {
        case error.PERMISSION_DENIED:
            weatherLookupError.html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            weatherLookupError.html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            weatherLookupError.html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            weatherLookupError.html("An unknown error occurred.");
            break;
        default:
            weatherLookupError.html("An unknown error occurred.");
            break;
    }

    $("#postcodeLookup").show();
}

getLocation();