import { Autocomplete } from "@mantine/core";
import { usePlaceAutocomplete } from "../hooks/usePlaceAutocomplete";

const LocationInput = ({ value, onChange, onPlaceSelect }) => {
  const suggestions = usePlaceAutocomplete(value);
  console.log(suggestions);
  const handleOptionSubmit = (val) => {
    const selectedSuggestion = suggestions.find((s) => s.value === val);
    if (selectedSuggestion) {
      const placeService = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      placeService.getDetails(
        { placeId: selectedSuggestion.placeId },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            onPlaceSelect(place);
          }
        }
      );
    }
  };

  return (
    <Autocomplete
      label="Search Address"
      value={value}
      onChange={onChange}
      onOptionSubmit={handleOptionSubmit}
      placeholder="Enter your address"
      data={suggestions.map((s) => s.value)}
      nothingFound="No addresses found"
    />
  );
};

export default LocationInput;
