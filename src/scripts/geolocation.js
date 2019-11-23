const get_location = () => {
  navigator.geolocation;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not available.");
  }

  function success(position) {
    var geoLat = position.coords.latitude.toFixed(5);
    var geoLng = position.coords.longitude.toFixed(5);
    var geoAcc = position.coords.accuracy.toFixed(1);
  }

  function error(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert("User denied the request for geolocation.");
        break;
      case err.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
};
module.exports = get_location;
