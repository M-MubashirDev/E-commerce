import { useState, useEffect } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          setError(err.message);
          console.log("Geolocation error:", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { position, error };
}
