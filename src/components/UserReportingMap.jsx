import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


const UserReportingMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBoHeDRjWztjVjOVtsTPX4rFqE5vkcWW7E",
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [finalLocation, setFinalLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [geoCodedData, setGeoCodedData] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCurrentLocation(userLocation);
                setMarkers([userLocation]);
                setFinalLocation(userLocation);
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBoHeDRjWztjVjOVtsTPX4rFqE5vkcWW7E`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setGeoCodedData(data.results[0].formatted_address);
                        console.log(data.results[0].formatted_address);
                        console.log(data.results[7].address_components[1].short_name);
                    })
                    .catch((error) => {
                        console.error("Error fetching API data:", error);
                    });
                console.log(userLocation);
            },
            (error) => {
                console.error("Error getting user's location:", error);
            }
        );
    }, []);

    const handleMapClick = (mapsMouseEvent) => {
        if (markers.length === 0) {
            const newMarker = {
                lat: mapsMouseEvent.latLng.lat(),
                lng: mapsMouseEvent.latLng.lng(),
            };
            console.log(newMarker.lat, newMarker.lng);
            setMarkers([...markers, newMarker]);
            console.log(markers.length);
        } else {
            return null;
        }
    };
    const center = currentLocation;

    const handleMarkerDragEnd = (index, event) => {
        const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        console.log("New Location:", newLocation);
        setFinalLocation(newLocation);
    };

    function handleLogFinalLocation() {
        console.log("Final Location:", finalLocation);
    };


    if (!isLoaded) return <div>Loading...</div>
    return (
        <>
            <GoogleMap
                zoom={15}
                center={center}
                mapContainerStyle={{ width: "100%", height: "400px" }}
                onClick={handleMapClick}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker}
                        draggable={true}
                        onDragEnd={(event) => handleMarkerDragEnd(index, event)}
                    />
                ))}
            </GoogleMap>
            {/* <button onClick={handleLogFinalLocation}>Submit Report</button> */}
        </>
    );
}

export default UserReportingMap