angular.module("weather").provider("WeatherService", function(){
   var apiEndpoint;
    return {
        setApiEndpoint: function (endpoint) {
            apiEndpoint = endpoint;
        },
        $get: function ($http) {
            return WeatherService($http, apiEndpoint);
        }
    };

    function WeatherService($http, endpoint){
        var service = this;
        service.getLocalWeatherForCity = getLocalWeatherForCity;
        return service;

        function getLocalWeatherForCity(cityName, canceller){
            return $http.get(endpoint + "weather?q=" + cityName, {
                timeout: canceller
            }).then(function(data){
                return {
                    location: data.name,
                    temperature: (parseFloat(data.main.temp) - 273.15).toFixed(2)
                };
            });
        }
    }
});