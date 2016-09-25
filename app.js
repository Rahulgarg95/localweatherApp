var app = angular.module('weatherApi', []);

app.factory('WeatherApi', function($http) {
  var obj = {};
  
  obj.getlocation = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
  obj.getweather = function(city) {
    var api = "http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=metric";
    var appid = "&APPID=66cf3e3fcc39460223c18c2e320ccc5a"
    var cb = "&callback=JSON_CALLBACK";
    
    return $http.jsonp(api + city + units+ appid + cb);
  };
  return obj
});

app.controller('MainCtrl', function($scope, WeatherApi) {
  $scope.Data = {};
  $scope.Data.unit ='C';
  $scope.Data.sysChange = false;
  WeatherApi.getlocation().success(function(data) {
    var city = data.city + ',' + data.country;
    $scope.Data.city = data.city;
    $scope.Data.country = data.country;
    WeatherApi.getweather(city).success(function(data) {
      CurrentWeather(data)
    });
  });

  function CurrentWeather(data) {
    $scope.Data.temp = Math.round(data.main.temp);
    $scope.Data.Cel = Math.round(data.main.temp);
    $scope.Data.des = data.weather[0].main;
    $scope.Data.Fah = Math.round( ($scope.Data.temp * 9)/5 + 32 );
  return setBackground($scope.Data.des);
  }
  
  
  $scope.Data.sys= function(){
   if($scope.Data.sysChange){
     $scope.Data.unit ='C';
     $scope.Data.temp = $scope.Data.Cel;
     return $scope.Data.sysChange = false;
     }
    $scope.Data.unit ='F';
    $scope.Data.temp = $scope.Data.Fah;
    return $scope.Data.sysChange = true;
  }
  
  function setBackground(city) {
    var city = city.toLowerCase()
    switch (city) {
      case 'dizzle':
        $('body').css('background-image',"url('https://lintvksnt.files.wordpress.com/2016/01/rain-hd-desktop-background-9608_thumb.jpeg?w=640')");
        break;
      case 'clouds':
        $('body').css('background-image',"url('http://cdn.wallpapersafari.com/41/84/pRZrWj.jpg')");
        break;
      case 'rain':
        $('body').css('background-image',"url('https://images2.alphacoders.com/180/180742.jpg')");
        break;
      case 'snow':
       $('body').css('background-image',"url('http://cdn.wallpapersafari.com/20/4/inDpEL.jpg')");
        break;
      case 'clear':
        $('body').css('background-image',"url('http://all4desktop.com/data_images/1280%20x%201024/4201419-canyonlands-national-park-normal.jpg')");
        break;
      case 'thunderstom':
        $('body').css('background-image',"url('http://weboboi.ru/wp-content/uploads/2015/01/049269-%D0%9C%D0%BE%D0%BB%D0%BD%D0%B8%D1%8F-%D1%82%D1%83%D1%87%D0%B8-%D1%81%D1%82%D0%B8%D1%85%D0%B8%D1%8F-27.jpg')");
        break;
      default:
    $('body').css('background-color',"grey");
    }
  }
  
});