import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ lat, lng, onMapLoad, onMarkerDragEnd }) => {
  return (
    <div className="h-96 w-full mt-4 rounded-lg border border-gray-200 shadow-sm">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat, lng }}
        zoom={15}
        onLoad={onMapLoad}
      >
        <Marker
          position={{ lat, lng }}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
