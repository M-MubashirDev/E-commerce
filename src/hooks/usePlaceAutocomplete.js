import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";

export function usePlaceAutocomplete(input, delay = 400) {
  const [suggestions, setSuggestions] = useState([]);
  const [debounced] = useDebouncedValue(input, delay);

  useEffect(() => {
    if (!debounced) {
      setSuggestions([]);
      return;
    }

    if (!window.google?.maps?.places) {
      console.warn("Google Maps Places API not loaded yet");
      setSuggestions([]);
      return;
    }

    const autocompleteService =
      new window.google.maps.places.AutocompleteService();

    autocompleteService.getPlacePredictions(
      { input: debounced, types: ["address"] },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(
            predictions.map((pred) => ({
              value: pred.description,
              placeId: pred.place_id,
            }))
          );
        } else {
          setSuggestions([]);
        }
      }
    );
  }, [debounced]);

  return suggestions;
}
