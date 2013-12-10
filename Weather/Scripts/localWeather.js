/// <reference path="jquery-1.10.2.intellisense.js" />

var weatherLookupError = $("#weatherLookupError");

function getLocation() {
    console.log("getLocation");
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (navigator.geolocation) {
        console.log("browser supports geolocation");
        navigator.geolocation.getCurrentPosition(getWeatherForLatLong, showError, options);
    }
    else {
        console.log("browser does not support geolocation");
        weatherLookupError.show();
        weatherLookupError.html("Geolocation is not supported by this browser.");
    }
}

function getWeatherForLatLong(position) {

    console.log("got position");

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    $("#localWeather").show();

    //todo: call api and pass lat&long

    console.log("lat: " + latitude);
    console.log("log: " + longitude);
}

function getWeatherForPostcode() {
    //todo: call api and pass postcode
}

function showError(error) {

    weatherLookupError.show();
    console.log("error getting position");
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