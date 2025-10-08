export default function setAddressUtil(newLat, newLng) {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results) => {
    if (results[0]) setAddress(results[0].formatted_address);
  });
}
