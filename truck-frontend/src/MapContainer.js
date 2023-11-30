// MapContainer.js

import React, { useRef, useEffect, useMemo } from 'react';
import GoogleMapReact from 'google-map-react';

const MapContainer = ({ onPositionClick, list }) => {
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco coordinates
  const mapRef = useRef(null);
  const markers = useRef([]);
 
  const handleApiLoaded = (map, maps) => {
    mapRef.current = map;
    // Use the map instance to position markers
    positionMarkers(maps);

    // Add click event listener to the map
    mapRef.current.addListener('click', (e) => handleMapClick(e, maps));
  };

  const positionMarkers = (maps) => {
    list.forEach((marker) => {
      const markerOptions = {
        position: { lat: marker.lat, lng: marker.lng },
        map: mapRef.current,
      };
      const newMarker = new maps.Marker(markerOptions);
      markers.current.push(newMarker);
    });
  };

  const clearMarkers = () => {
    markers.current.forEach((marker) => {
      marker.setMap(null);
    });
  };

  const handleMapClick = (event, maps) => {

    // Clear existing markers    
    clearMarkers();    

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    
    // Add a new marker at the clicked position
    const newMarkerOptions = {
      position: { lat, lng },
      map: mapRef.current,
      animation: maps.Animation.DROP,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // URL for a blue marker icon
      },
    };
    const newMarker = new maps.Marker(newMarkerOptions);
    markers.current.push(newMarker);

    // Call the onPositionClick prop with the selected position
    onPositionClick({ lat, lng });
  };

  useEffect(() => {
    // Position markers when markers change
    if (mapRef.current) {
      positionMarkers(window.google.maps);
    }
  }, [list]);

  const map = useMemo(() => {
    return <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultCenter}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
            
  }, [list])

  return (
    <div style={{ height: '700px', width: '70%', margin: '0 auto' }}>
      {map}
    </div>
  );
};

export default MapContainer;
