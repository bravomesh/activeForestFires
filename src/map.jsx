import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {fireData} from './data'
const FireMap = () => (
    <MapContainer center={[-20.66344833, 46.3418541]} zoom={5} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
        {fireData.map((fire, index) => (
            <Marker key={index} position={[fire.Latitude, fire.Longitude]}>
                <Popup>
                    <div>
                        <strong>Detection Confidence:</strong> {fire['DetectionConfidence(%)']}%<br />
                        <strong>Fire Radiative Power:</strong> {fire['FireRadiativePower(MW)']} MW<br />
                        <strong>Start Date:</strong> {fire.StartDate}
                    </div>
                </Popup>
            </Marker>
        ))}
    </MapContainer>
);

export default FireMap;
