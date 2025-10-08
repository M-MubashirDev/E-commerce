import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextInput } from "@mantine/core";

const LocationInput = ({ value, onChange, onPlaceSelect }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handlePlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (place.geometry) {
      onChange(place.formatted_address || "");
      onPlaceSelect(place);
    }
  };

  return (
    <div className="mb-3">
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <TextInput
          ref={inputRef}
          label="Search Address"
          placeholder="Enter your address"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Autocomplete>
    </div>
  );
};

export default LocationInput;
