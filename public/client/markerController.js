angular.module('mapper', [])

.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.controller('markerCtrl', function($scope, $http) {
  $scope.get = function() {
    var access = 'https://api.instagram.com/v1/tags/' + $scope.query + '?access_token=26237012.24a20a9.5a528843d38c4aaa99d434aa35af8356&count=100';
    // var access = 'https://api.instagram.com/v1/users/rodoriot/?access_token=26237012.24a20a9.5a528843d38c4aaa99d434aa35af8356';

    $http.post('/api', {data: $scope.query})
    .then(function(response) {
      var list = response.data.data;
      var lat; 
      var long;
      var coordsList = [];
      var count = 0;

      for(var i = 0; i < list.length; i++) {
        if(list[i].location) {
          console.log(list[i])
          lat = list[i].location.latitude;
          long = list[i].location.longitude;
          coordsList.push({lat: lat, long: long});
        }
      }

      setInterval(function(){
        if(count < coordsList.length) {
          marker(coordsList[count].lat, coordsList[count].long);
          count++; 
        } else {
          clearInterval();
        }
      }, 400);
    });
  };
});