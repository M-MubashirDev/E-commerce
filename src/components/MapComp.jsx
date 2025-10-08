import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ lat, lng, onMapLoad, onMarkerDragEnd }) => {
  const hasPosition = lat !== 0 && lng !== 0;

  return (
    <div className="h-96 w-full mt-4 rounded-lg border border-gray-200 shadow-sm">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={hasPosition ? { lat, lng } : { lat: 20, lng: 0 }} // neutral world center
        zoom={hasPosition ? 15 : 2} // zoomed-out world view
        onLoad={onMapLoad}
      >
        {hasPosition && (
          <Marker
            position={{ lat, lng }}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
