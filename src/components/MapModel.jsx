import { useEffect, useState } from "react";
import { Modal, Loader } from "@mantine/core";
import { useJsApiLoader } from "@react-google-maps/api";
import MapComponent from "./MapComp";
import LocationInput from "./LocationInput";
import LocationDetails from "./LocationDetail";
import { useGeolocation } from "../hooks/useGeolocation";
import { useSelector } from "react-redux";

const libraries = ["places"];

const LocationMapModal = ({ opened = true, onSave, onClose }) => {
  const { location } = useSelector((state) => state.location);

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [map, setMap] = useState(null);
  const { position } = useGeolocation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // ✅ Utility function using new API
  const getAddressFromCoords = async (lat, lng) => {
    const { Geocoder } = await window.google.maps.importLibrary("geocoding");
    const geocoder = new Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0])
          resolve(results[0].formatted_address);
        else reject(status);
      });
    });
  };

  useEffect(() => {
    if (
      isLoaded &&
      ((location.lat && location.lng) || (position.lat && position.lng)) &&
      !lat &&
      !lng
    ) {
      const currentLat = position.lat || location.lat;
      const currentLng = position.lng || location.lng;

      (async () => {
        try {
          setLat(currentLat);
          setLng(currentLng);
          const addr = await getAddressFromCoords(currentLat, currentLng);
          setAddress(addr);
        } catch (err) {
          console.error("Geocoding failed:", err);
        }
      })();
    }
  }, [isLoaded, position, lat, lng, location]);

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
    if (lat && lng) mapInstance.panTo({ lat, lng });
  };

  const onMarkerDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setLat(newLat);
    setLng(newLng);

    try {
      const addr = await getAddressFromCoords(newLat, newLng);
      setAddress(addr);
    } catch (err) {
      console.error("Failed to update address:", err);
    }
  };

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
      withCloseButton={false}
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
          <LocationDetails
            address={address}
            lat={lat}
            lng={lng}
            onSave={onSave}
          />
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
