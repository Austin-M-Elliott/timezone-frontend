import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import timezoneData from './ne_10m_time_zones.geojson';
import worldMap from './worldmap.geojson';

function MapComponent() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltipContent, setTooltipContent] = useState('');

    const handleMouseMove = (event, geo) => {
        setTooltipPosition({
            x: event.clientX,
            y: event.clientY
        });
        const timeZone = geo.properties.time_zone;
        setTooltipContent(timeZone);
        setShowTooltip(true);
    };  

    const handleMouseOut = () => {
        setShowTooltip(false);  // Hide the tooltip when the mouse leaves the timezone.
    };
    console.log(showTooltip)
    return (
        <div style={{ position: "relative", width: '2000px', height: '900px' }}>
            
        {/* Tooltip */}
        {showTooltip && (
            <div
                style={{
                    position: 'absolute',
                    top: tooltipPosition.y,
                    left: tooltipPosition.x,
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    transform: 'translate(-50%, -10%)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                }}
            >
                Time Zone: {tooltipContent}
            </div>
        )}
        <ComposableMap width={1000} height={500}>
                {/* Base world map */}
                <Geographies geography={worldMap}>
                    {({ geographies }) =>
                        geographies.map(geo => (
                            <Geography key={geo.rsmKey} geography={geo} />
                        ))
                    }
                </Geographies>

                {/* Timezone overlay */}
                <Geographies geography={timezoneData}>
                    {({ geographies }) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseMove={(event) => handleMouseMove(event, geo)}
                                onMouseOut={handleMouseOut}
                                style={{
                                    default: {
                                        fill: "rgba(0, 123, 255, 0.5)",
                                        outline: "none",
                                        stroke: "#FFF",
                                        strokeWidth: 0.5
                                    },
                                    hover: {
                                        fill: "rgba(0, 153, 255, 0.8)",
                                        outline: "none",
                                        stroke: "#FFF",
                                        strokeWidth: 0.5
                                    },
                                    pressed: {
                                        fill: "rgba(0, 123, 255, 1)",
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
        </div>
    );
}
export default MapComponent;
