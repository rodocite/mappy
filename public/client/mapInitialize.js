function initialize() {
  var mapOptions = {
    zoom: 3,
    maxZoom: 15,
    minZoom: 3,
    center: {lat: 34, lng: -118}
  };

  window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

window.marker = function(latitude, longitude, image, title, link){
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    icon: 'instagram.png',
    thumbnail: image,
    title: title,
    link: link,
    animation: google.maps.Animation.DROP,
    map: window.map
  });
  
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<div id="bodyContent">'+
      '<b>' + '<a href="' + marker.link + '\"><img src="' + marker.thumbnail + '"></a>'+
      '</div>'+
      '</div>';
  
  var infoBubble = new InfoBubble({
      content: contentString,
      maxWidth: 400,
      minHeight: 0,
      shadowStyle: 1,
      padding: 0,
      backgroundColor: '#fefefc',
      borderRadius: 5,
      arrowSize: 10,
      borderWidth: 2,
      borderColor: '#fefefc',
      disableAutoPan: true,
      hideCloseButton: true,
      arrowPosition: 30,
      backgroundClassName: 'transparent',
      arrowStyle: 2,
      map: window.map
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoBubble.open(map, marker);
  });

  google.maps.event.addListener(map, "click", function () { 
    infoBubble.close();
  });
};