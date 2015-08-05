angular.module('mapper', [])

.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.controller('markerCtrl', function($scope, $http) {
  $scope.get = function() {
    var access = 'https://api.instagram.com/v1/tags/' + $scope.query + '?access_token=26237012.24a20a9.5a528843d38c4aaa99d434aa35af8356&count=100';

    $http.post('/api', {data: $scope.query})
    .then(function(response) {
      console.log(response.data.data)
      var list = response.data.data;
      var lat; 
      var long;
      var image;
      $scope.coordsList = [];
      var count = 0;

      for(var i = 0; i < list.length; i++) {
        if(list[i].location) {
          lat = list[i].location.latitude;
          long = list[i].location.longitude;
          image = list[i].images.low_resolution.url;
          title = list[i].user.username;
          link = list[i].link;
          $scope.coordsList.push({lat: lat, long: long, image: image, title: title, link: link});
        }
      }

      setInterval(function(){
        if(count < $scope.coordsList.length) {
          marker($scope.coordsList[count].lat, $scope.coordsList[count].long, $scope.coordsList[count].image, $scope.coordsList[count].title, $scope.coordsList[count].link);
          count++; 
        } else {
          clearInterval();
        }
      }, 400);
    });
  };
});