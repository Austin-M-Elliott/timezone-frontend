import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import timezoneData from './ne_10m_time_zones.geojson';
import worldMap from './worldmap.geojson';

function MapComponent() {
    return (
        <ComposableMap width={1000} height={800}>
            
            {/* Base world map */}
            <Geographies geography={worldMap}>
                {({ geographies }) => 
                    geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                }
            </Geographies>
            
            {/* Timezone overlay */}
            <Geographies geography={timezoneData}>
                {({ geographies }) => 
                    geographies.map(geo => (
                        <Geography 
                            key={geo.rsmKey} 
                            geography={geo}
                            style={{
                                default: {
                                    fill: "rgba(0, 123, 255, 0.5)",
                                    outline: "none",
                                    stroke: "#FFF",
                                    strokeWidth: 0.5
                                },
                                hover: {
                                    fill: "rgba(0, 153, 255, 0.8)", // a slightly brighter blue on hover
                                    outline: "none",
                                    stroke: "#FFF",
                                    strokeWidth: 0.5
                                },
                                pressed: {
                                    fill: "rgba(0, 123, 255, 1)",  // an even darker blue when pressed
                                    outline: "none",
                                    stroke: "#FFF",
                                    strokeWidth: 0.5
                                }
                            }}
                        />

                    ))
                }
            </Geographies>
            
        </ComposableMap>
    );
}

export default MapComponent;