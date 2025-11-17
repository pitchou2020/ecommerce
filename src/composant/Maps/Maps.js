import React from 'react';

import './css/forms.css';
import './css/App.css';
import './css/page-congolinaria.css';
import './css/main.css';
import './css/page-create-congolinaria.css';
import './css/page-unidades-congolinaria.css';
import './css/sidebar.css';
import './css/animations.css';
import './css/map.css';
import './css/buttons.css';
import { MapContainer, TileLayer } from 'react-leaflet'

function Maps() {
    return (        <div>

            <MapContainer center={[-23.5419817, -46.6817004]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default Maps;