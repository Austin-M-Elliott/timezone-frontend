import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import timezoneData from './ne_10m_time_zones.geojson';
import worldMap from './worldmap.geojson';

function MapComponent() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltipContent, setTooltipContent] = useState('');
    const [stickyTooltipPosition, setStickyTooltipPosition] = useState(null);
    const [stickyTooltipContent, setStickyTooltipContent] = useState('');
    const [activeTimeZone, setActiveTimeZone] = useState(null);

    const getGeographyStyle = (geo) => {
        if (geo.properties.time_zone === activeTimeZone) {
            // Style for the active timezone
            return {
                fill: "rgba(0, 123, 255, 0.5)",
                outline: "none",
                stroke: "#FFF",
                strokeWidth: 0.8,
                filter: "url(#glow)"
            };
        }
    
        // Default style for non-active timezones
        return {
            fill: "rgba(0, 123, 255, 0.5)",
            outline: "none",
            stroke: "#FFF",
            strokeWidth: 0.5
        };
    };

    const handlePress = (event, geo) => {
        const timeZone = geo.properties.time_zone;
        if (timeZone === activeTimeZone) {
            setActiveTimeZone(null);
        } else {
            setActiveTimeZone(timeZone);
            setStickyTooltipPosition({
                x: event.clientX,
                y: event.clientY
            });
            setStickyTooltipContent(timeZone);
        }
    };    
    
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
        {stickyTooltipPosition && (
            <div
                style={{
                    position: 'absolute',
                    top: stickyTooltipPosition.y,
                    left: stickyTooltipPosition.x,
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    transform: 'translate(-50%, -10%)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                }}
            >
                Time Zone: {stickyTooltipContent}
            </div>
        )}

        <ComposableMap width={1000} height={500}>
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

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
                                onClick={(event) => handlePress(event, geo)}
                                style={{
                                    default: getGeographyStyle(geo),
                                    hover: {
                                        fill: "rgba(0, 123, 255, 0.8)",
                                        outline: "none",
                                        stroke: "#FFF",
                                        strokeWidth: 0.5
                                    },
                                    pressed: geo.properties.time_zone === activeTimeZone ? {
                                        fill: "rgba(0, 123, 255, 0.5)",
                                        outline: "none",
                                        stroke: "#FFF",
                                        strokeWidth: 0.8,
                                        filter: "url(#glow)"
                                    } : {
                                        fill: "rgba(0, 123, 255, 0.5)",
                                        outline: "none",
                                        stroke: "#FFF",
                                        strokeWidth: 0.8,
                                        filter: "url(#glow)"
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
