import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useState, useMemo } from 'react';
import { Button } from '@mui/material';

function AllAgenciesMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBoHeDRjWztjVjOVtsTPX4rFqE5vkcWW7E',
  });

  const hospitalLocations = [
    { lat: 12.938294256854377, lng: 77.5614856694409 },
    { lat: 12.931927514834538, lng: 77.56301672640747 },
    { lat: 12.92466525139595, lng: 77.5641395015163 },
    { lat: 12.908050786022919, lng: 77.54382747909311 },
    { lat: 12.92615751455527, lng: 77.52810862756965 },
    { lat: 12.909642638938038, lng: 77.57873557793093 },
    { lat: 12.929142014112683, lng: 77.59261716109451 },
    { lat: 12.949336189614574, lng: 77.56250637408529 },
    { lat: 12.951425148892854, lng: 77.56383329012297 },
    { lat: 12.903124964988177, lng: 77.49740623695574 },
    { lat: 12.962776534072614, lng: 77.55731125253303 },
    { lat: 12.962776534072614, lng: 77.56120868728144 },
    { lat: 12.96347988724514, lng: 77.57304534096176 },
    { lat: 12.966433948864319, lng: 77.57636537796967 },
    { lat: 12.951241258544421, lng: 77.59772909436832 },
    { lat: 12.986119766811585, lng: 77.555586370379 },
    { lat: 12.998999303986047, lng: 77.56880429627698 },
    { lat: 12.986119766811585, lng: 77.6443353014083 },
    { lat: 13.025927085218058, lng: 77.5526998762 },
  ];

  const fireStationLocations = [
    { lat: 12.97803, lng: 77.58952 },
    { lat: 12.96337, lng: 77.56327 },
    { lat: 12.98096, lng: 77.5802 },
  ];

  const policeStationLocations = [
    { lat: 12.97828, lng: 77.57334 },
    { lat: 12.96214, lng: 77.56682 },
    { lat: 12.96908, lng: 77.56999 },
    { lat: 12.96542, lng: 77.57626 },
  ];

  const defaultMarker = { lat: 12.97, lng: 77.58 };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Map
        hospitalLocations={hospitalLocations}
        fireStationLocations={fireStationLocations}
        policeStationLocations={policeStationLocations}
        defaultMarker={defaultMarker}
      />
    </div>
  );
}

function Map({
  hospitalLocations,
  fireStationLocations,
  policeStationLocations,
  defaultMarker,
}) {
  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [displayType, setDisplayType] = useState('all');
  const [currentLocation, setCurrentLocation] = useState(null);

  const center = { lat: 12.9697, lng: 77.5771 };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(userLocation);
        console.log(userLocation);
      },
      (error) => {
        console.error("Error getting user's location:", error);
      },
    );

    const allLocations = [
      ...hospitalLocations.map((location) => ({
        ...location,
        type: 'hospital',
      })),
      ...fireStationLocations.map((location) => ({
        ...location,
        type: 'fireStation',
      })),
      ...policeStationLocations.map((location) => ({
        ...location,
        type: 'policeStation',
      })),
      {
        ...defaultMarker,
        type: 'default',
      },
    ];

    if (displayType === 'hospital') {
      setMarkers(allLocations.filter((marker) => marker.type === 'hospital'));
    } else if (displayType === 'fireStation') {
      setMarkers(
        allLocations.filter((marker) => marker.type === 'fireStation'),
      );
    } else if (displayType === 'policeStation') {
      setMarkers(
        allLocations.filter((marker) => marker.type === 'policeStation'),
      );
    } else {
      setMarkers(allLocations);
    }
  }, [
    hospitalLocations,
    fireStationLocations,
    policeStationLocations,
    defaultMarker,
    displayType,
  ]);

  const hospitalIcon = {
    url: 'https://i.ibb.co/PjDps7c/hospital.png',
    size: new window.google.maps.Size(64, 64), // Adjust size as needed
    scaledSize: new window.google.maps.Size(64, 64), // Adjust size as needed
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16), // Center the icon
  };

  const fireStationIcon = {
    url: 'https://i.ibb.co/KwkLshz/fire-station.png',
    size: new window.google.maps.Size(64, 64),
    scaledSize: new window.google.maps.Size(64, 64),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16),
  };

  const policeStationIcon = {
    url: 'https://i.ibb.co/sFzkv2F/police-station.png',
    size: new window.google.maps.Size(64, 64),
    scaledSize: new window.google.maps.Size(64, 64),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16),
  };

  const defaultMarkerIcon = {
    url: 'https://i.ibb.co/Jtmq87g/location.png',
    size: new window.google.maps.Size(64, 64),
    scaledSize: new window.google.maps.Size(64, 64),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(16, 16),
  };

  const options = useMemo(
    () => ({
      mapId: '6fc3992e0bee9502',
      disableDefaultUI: true,
      clickableIcons: false,
      polylineOptions: {
        strokeColor: 'white', // You can customize the route color
      },
    }),
    [],
  );

  const calculateDirections = (serviceLocation) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          serviceLocation.lat,
          serviceLocation.lng,
        ),
        destination: new window.google.maps.LatLng(
          defaultMarker.lat,
          defaultMarker.lng,
        ),
        travelMode: 'DRIVING', // You can change the travel mode as needed
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          setShowDirections(true);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      },
    );
  };

  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={() => setDisplayType('hospital')}>Hospital</Button> &nbsp;
        <Button variant="contained"  onClick={() => setDisplayType('fireStation')}>
          Fire Station
        </Button> &nbsp;
        <Button variant="contained"  onClick={() => setDisplayType('policeStation')}>
          Police Station
        </Button> &nbsp;
        <Button  variant="contained" onClick={() => setDisplayType('all')}>All</Button>
        <br /><br />
      </div>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={{ width: '90vw', height: '70vh'}}
        options={options}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            icon={
              marker.type === 'hospital'
                ? hospitalIcon
                : marker.type === 'fireStation'
                ? fireStationIcon
                : marker.type === 'policeStation'
                ? policeStationIcon
                : defaultMarkerIcon
            }
            onClick={() => calculateDirections(marker)}
          />
        ))}
        {showDirections && directions && (
          <DirectionsRenderer directions={directions} options={options} />
        )}
      </GoogleMap>
    </>
  );
}
export default AllAgenciesMap;
