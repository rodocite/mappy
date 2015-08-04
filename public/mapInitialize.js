function initialize() {
  var mapOptions = {
    zoom: 2,
    center: {lat: 34, lng: -118}
  };

  window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

window.marker = function(latitude, longitude){
  new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    animation: google.maps.Animation.DROP,
    map: window.map
  });
};


