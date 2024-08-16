import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fireData } from './data';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { divIcon } from 'leaflet';
import L from 'leaflet';

// Fixing the default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const FireMap = () => {
    const createClusterCustomIcon = (cluster) => {
        const count = cluster.getChildCount();
        const sizeClass = count < 20 ? 'w-7 h-7' : count < 100 ? 'w-10 h-10' : 'w-12 h-12';

        return divIcon({
            html: `<div class="flex items-center justify-center bg-teal-700 bg-opacity-60 rounded-full text-white font-bold ${sizeClass}">${count}</div>`,
            className: 'custom-cluster-icon',
            // iconSize: point(40, 40, true),
        });
    };

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
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default FireMap;
