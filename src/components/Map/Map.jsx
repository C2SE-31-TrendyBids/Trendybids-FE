import React, { useState } from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const [viewState, setViewState] = useState({
        latitude: 16.059942,
        longitude: 108.209742,
        zoom: 17
    })
    console.log(process.env.REACT_APP_MAPBOX_API_KEY);
    return (
        <ReactMapGL {...viewState}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            transitionDuration='200'
            mapStyle="mapbox://styles/quangquoc154/clo4dm2y300og01pf4o3mg3pm"
            onMove={(evt) => setViewState(evt.viewState)}
        >
            <Marker longitude="108.209742" latitude="16.059942" />
            <GeolocateControl />
            <FullscreenControl />
            <NavigationControl />
        </ReactMapGL>
    );
};

export default Map;