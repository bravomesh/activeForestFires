import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import {fireData} from 'data.js'


const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let sizeClass = 'w-7 h-7';
    if (count < 20) sizeClass = 'w-7 h-7';
    else if (count < 100) sizeClass = 'w-10 h-10';
    else sizeClass = 'w-12 h-12';

    return L.divIcon({
        html: `<div class="${sizeClass} flex items-center justify-center bg-red-500 text-white rounded-full">${count}</div>`,
        className: 'custom-marker-cluster',
        iconSize: L.point(40, 40, true),
    });
};

const FireMap = () => {
    return (
        <MapContainer center={[-20.66344833, 46.3418541]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
                iconCreateFunction={createClusterCustomIcon}
            >
                {fireData.map((fire, index) => (
                    <Marker
                        key={index}
                        position={[fire.Latitude, fire.Longitude]}
                    >
                        <Popup>
                            <div>
                                <strong>Detection Confidence:</strong> {fire["DetectionConfidence(%)"]}%<br />
                                <strong>Fire Radiative Power:</strong> {fire["FireRadiativePower(MW)"]} MW<br />
                                <strong>Start Date:</strong> {fire.StartDate}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default FireMap;
