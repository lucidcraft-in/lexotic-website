'use client'

import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 40.730610, // Default center (New York City)
    lng: -73.935242,
};

const GoogleMapComponent = () => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [location, setLocation] = useState({
        lat: null,
        lng: null,
        address: ''
    });

    const onLoad = useCallback((autoC) => {
        setAutocomplete(autoC);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            setLocation({
                lat: lat,
                lng: lng,
                address: place.formatted_address,
            });

            console.log("Selected Location:", { lat, lng, address: place.formatted_address });
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        <div>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY" libraries={["places"]}>
                {/* Google Map */}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* Places Autocomplete input */}
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <input
                            type="text"
                            placeholder="Enter location"
                            style={{
                                boxSizing: 'border-box',
                                border: '1px solid transparent',
                                width: '240px',
                                height: '32px',
                                padding: '0 12px',
                                borderRadius: '3px',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                fontSize: '16px',
                                outline: 'none',
                                textOverflow: 'ellipses',
                                position: 'absolute',
                                left: '50%',
                                top: '10px',
                                marginLeft: '-120px'
                            }}
                        />
                    </Autocomplete>
                </GoogleMap>
            </LoadScript>

            {/* Display Latitude and Longitude */}
            {location.lat && location.lng && (
                <div>
                    <p>Selected Location: {location.address}</p>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lng}</p>
                </div>
            )}
        </div>
    );
};

export default GoogleMapComponent;
