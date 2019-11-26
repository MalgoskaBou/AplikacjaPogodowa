export default getLocation;

function getLocation() {
  navigator.geolocation;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not available.");
  }

  function success(position) {
    const geoLat = position.coords.latitude.toFixed(5);
    const geoLng = position.coords.longitude.toFixed(5);
    const geoAcc = position.coords.accuracy.toFixed(1);
    return [geoLat, gepLng];
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
}