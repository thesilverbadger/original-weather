var server = (function () {

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
            $("#loading").show();

            server.getByPostcode(postcode).done(_weatherApi.showCurrentCondition);
        },

        latLongLookup: function (latitude, longitude) {

            server.getByLatLong(latitude, longitude).done(_weatherApi.showCurrentCondition);
        },

        showCurrentCondition: function (data) {

            $("#loading").hide();

            if (!data) {
                $("#weatherLookupError").html("Error looking up postcode. Did you type it correctly?");
                $('#weatherLookupError').show();
                $('#postcodeLookup').show();
                return;
            }

            var temp = data.temp_C;
            var conditions = data.weatherDesc[0].value;
            var icon = data.weatherIconUrl[0].value;

            $('#localConditions').html(conditions);
            $('#localTemp').html(temp);
            $('#localImage').attr("src", icon);
            $('#localWeather').show();
        },

        getLocation: function () {
            $("#loading").show();
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(_weatherApi.getWeatherForLatLong, _weatherApi.showError, options);
            }
            else {
                var weatherLookupError = $("#weatherLookupError");
                weatherLookupError.show();
                weatherLookupError.html("Geolocation is not supported by this browser.");
            }
        },

        getWeatherForLatLong: function (position) {

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            server.getByLatLong(latitude, longitude).done(_weatherApi.showCurrentCondition);
        },

        showError: function (error) {
            $("#loading").hide();
            var weatherLookupError = $("#weatherLookupError");
            weatherLookupError.show();

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