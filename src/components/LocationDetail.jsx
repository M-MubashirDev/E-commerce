const LocationDetails = ({ lat, lng, onSave }) => {
  return (
    <div className="mt-4 space-y-2">
      <p>Latitude: {lat.toFixed(6)}</p>
      <p>Longitude: {lng.toFixed(6)}</p>
      <button
        onClick={onSave}
        className="w-full bg-blue-600 text-white p-2 rounded-lg"
        disabled={!lat || !lng}
      >
        Save Location
      </button>
    </div>
  );
};

export default LocationDetails;
