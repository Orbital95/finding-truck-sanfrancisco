import "./App.css";
// App.js
// App.js

import React, { useState } from "react";
import MapContainer from "./MapContainer";
import axios from "axios";

const App = () => {
  const [arrayList, setArrayList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAxiosRequest = async (position) => {
    setLoading(true);
    setError(null);

    try {
      // Perform Axios GET request with the selected position as parameters
      const response = await axios.get("http://127.0.0.1:8000/truck/", {
        params: {
          lat: position.lat,
          lng: position.lng,
        },
      });

      // Handle the response as needed
      setArrayList(
        response.data.map((item) => ({
          lat: parseFloat(item[14]),
          lng: parseFloat(item[15]),
          text: item[1],
        }))
      );
    } catch (error) {
      console.error("Axios error:", error);
      // Handle the error as needed
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>San Francisco Map</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MapContainer        
        list={arrayList}
        onPositionClick={(position) => {
          handleAxiosRequest(position);
        }}
      />
    </div>
  );
};

export default App;
