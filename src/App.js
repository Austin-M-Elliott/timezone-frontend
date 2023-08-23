import React from 'react';
import './App.css';
import MapComponent from './TimeZoneMap';  // Import the component

function App() {
    
    return (
        <div className="App">
            <h1 className="app-title">f1oclock</h1>
            <MapComponent />  {/* Use the component */}
        </div>
    );
}

export default App;
