import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  
import 'leaflet/dist/leaflet.css';
import 'font-awesome/css/font-awesome.min.css'; 

const UserMap = () => {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users') 
      .then(response => {
        const users = response.data;

        const locations = users.map(user => ({
          lat: user.location[0],
          lng: user.location[1],
          username: user.name,
          status: user.status,
          city: user.address.city,
          country: user.address.country,
        }));

        setUserLocations(locations);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const userIcon = new L.Icon({
    iconUrl: 'https://banner2.cleanpng.com/20180330/aqw/avicinxbe.webp',
    iconSize: [40, 40], 
    iconAnchor: [20, 40], 
    popupAnchor: [0, -40], 
  });

  return (
    <MapContainer
      center={[51.5074, -0.1278]}
      zoom={3}
      style={{ height: '500px', width: '100%' }} 
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      {userLocations.map((location, index) => (
        <Marker 
          key={index} 
          position={[location.lat, location.lng]} 
          icon={userIcon}  
        >
          <Popup>
            <strong>{location.username}</strong><br />
            Trạng thái: {location.status}<br />
            Thành phố: {location.city}<br />
            Quốc gia: {location.country}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UserMap;
