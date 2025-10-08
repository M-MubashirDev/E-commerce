import { useEffect, useState } from "react";
import { Modal, Loader } from "@mantine/core";
import { useJsApiLoader } from "@react-google-maps/api";
import MapComponent from "./MapComp";
import LocationInput from "./LocationInput";
import LocationDetails from "./LocationDetail";
import { useGeolocation } from "../hooks/useGeolocation";

const LocationMapModal = ({ opened = true, onSave, onClose }) => {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [map, setMap] = useState(null);
  const { position } = useGeolocation();

  useEffect(() => {
    if (position.lat && position.lng && !lat && !lng) {
      setLat(position.lat);
      setLng(position.lng);
    }
  }, [position, lat, lng]);

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
    if (lat && lng) mapInstance.panTo({ lat, lng });
  };

  const onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setLat(newLat);
    setLng(newLng);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results) => {
      if (results[0]) setAddress(results[0].formatted_address);
    });
  };

  // we are setting the data after selection
  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      const newLat = place.geometry.location.lat();
      const newLng = place.geometry.location.lng();
      setLat(newLat);
      setLng(newLng);
      setAddress(place.formatted_address);
      if (map) map.panTo({ lat: newLat, lng: newLng });
    }
  };

  const handleSave = () => {
    if (address && lat && lng) {
      onSave({ address, lat, lng });
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Select Your Location"
      size="xl"
      radius="lg"
      centered
      overlayProps={{ blur: 2 }}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      {isLoaded ? (
        <>
          <LocationInput
            value={address}
            onChange={setAddress}
            onPlaceSelect={handlePlaceSelect}
          />
          <MapComponent
            lat={lat}
            lng={lng}
            onMapLoad={onMapLoad}
            onMarkerDragEnd={onMarkerDragEnd}
          />
          <LocationDetails lat={lat} lng={lng} onSave={handleSave} />
        </>
      ) : (
        <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
          <Loader type="bars" />
        </div>
      )}
    </Modal>
  );
};

export default LocationMapModal;
