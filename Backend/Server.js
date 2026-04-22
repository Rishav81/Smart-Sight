const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simulated sensor data
let sensorData = {
  obstacle: false,
  distance: 2.5,
  water: false,
  battery: 100,
  gps: {
    lat: 28.6139,
    lng: 77.209,
  },
};

// Auto update data every 2 sec
// setInterval(() => {
//   sensorData.obstacle = Math.random() > 0.5;
//   sensorData.distance = (Math.random() * 3).toFixed(2);
//   sensorData.water = Math.random() > 0.7;
//   sensorData.battery = Math.max(10, sensorData.battery - Math.random());

//   // slight GPS change (fake movement)
//   sensorData.gps.lat += (Math.random() - 0.5) * 0.001;
//   sensorData.gps.lng += (Math.random() - 0.5) * 0.001;
// }, 2000);

// API route
app.get("/api/sensors", (req, res) => {
  res.json(sensorData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
