﻿var server = (function () {

    //temporary error handler
    $(document).ajaxError(function (event, xhr) {
        $(".error").html("<div class='alert alert-error'>API current unavailable</div>").removeClass("hidden");
    });

    var getByLatLong = function (latitude, longitude) {

        return $.ajax(_latLongApiUrl + "?latitude=" + latitude + "&longitude=" + longitude);
    };

    var getByPostcode = function (postcode) {

        return $.ajax(_postcodeApiUrl + "?postcode=" + postcode);
    };

    return {
        getByLatLong: getByLatLong,
        getByPostcode: getByPostcode,
    }

}());

(function ($) {

    weatherApi = function (options) {
        this._init(options);
    };

    var _weatherApi = null;

    weatherApi.prototype = {
        _latLongApiUrl: "",
        _postcodeApiUrl: "",

        options: {
            latLongApiUrl: "",
            postcodeApiUrl: "",
        },

        _init: function (options) {
            var self = this;
            _weatherApi = this;
            $.extend(true, self.options, options);

            _latLongApiUrl = options.latLongApiUrl;
            _postcodeApiUrl = options.postcodeApiUrl;

            _weatherApi.wireEvents();
        },

        wireEvents: function () {
            $(document).on("click", "#search", _weatherApi.postcodeLookup);
        },

        postcodeLookup: function () {
            var postcode = $('#postcode').val();
            $('#postcodeLookup').hide();
            $('#weatherLookupError').hide();

            server.getByPostcode(postcode).done(_weatherApi.showCurrentCondition);
        },

        latLongLookup: function (latitude, longitude) {

            server.getByLatLong(latitude, longitude).done(_weatherApi.showCurrentCondition);
        },

        showCurrentCondition: function (data) {
            //debugger;
            var temp = data.temp_C;
            var conditions = data.weatherDesc[0].value;
            var icon = data.weatherIconUrl[0].value;

            $('#localConditions').html(conditions);
            $('#localTemp').html(temp);
            $('#localImage').attr("src", icon);
            $('#localWeather').show();
        },

        getLocation: function () {
            console.log("getLocation");
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            if (navigator.geolocation) {
                console.log("browser supports geolocation");
                navigator.geolocation.getCurrentPosition(_weatherApi.getWeatherForLatLong, _weatherApi.showError, options);
            }
            else {
                console.log("browser does not support geolocation");
                var weatherLookupError = $("#weatherLookupError");
                weatherLookupError.show();
                weatherLookupError.html("Geolocation is not supported by this browser.");
            }
        },

        getWeatherForLatLong: function (position) {

            console.log("got position");

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            $("#localWeather").show();

            server.getByLatLong(latitude, longitude).done(_weatherApi.showCurrentCondition);

            console.log("lat: " + latitude);
            console.log("log: " + longitude);
        },

        showError: function (error) {

            var weatherLookupError = $("#weatherLookupError");
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
        },

    }

})(jQuery);