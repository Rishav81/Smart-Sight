import { useEffect, useState } from "react";
import axios from "axios";

const SimulationUI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:3000/api/sensors")
        .then((res) => setData(res.data));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="w-full flex flex-col items-center text-center px-4">
      {/* MAIN ALERT */}
      {data.obstacle && Number(data.distance) < 1 ? (
        <h1 className="text-6xl text-red-500 font-bold animate-pulse">
          🚧 Obstacle Ahead
        </h1>
      ) : data.water ? (
        <h1 className="text-6xl text-blue-400 font-bold animate-pulse">
          💧 Water Detected
        </h1>
      ) : (
        <h1 className="text-6xl text-green-400 font-bold">✅ Path Clear</h1>
      )}

      {/* INFO */}
      <div className="mt-10 space-y-4">
        <p>📏 Distance: {data.distance} m</p>

        <p>🔋 Battery: {Math.floor(data.battery)}%</p>

        <iframe
          className="w-[600px] h-[400px] rounded"
          src={`https://maps.google.com/maps?q=${data.gps.lat},${data.gps.lng}&z=15&output=embed`}
        ></iframe>
      </div>
    </div>
  );
};

export default SimulationUI;
