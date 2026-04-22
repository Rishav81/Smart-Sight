import { useState } from "react";

import SimulationUI from "../src/components/SimulationUI";
import CameraDetection from "../src/components/CameraDetection";

const Dashboard = () => {
  const [mode, setMode] = useState("simulation"); // default simulation

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">SmartSight</h1>
        <span className="text-green-400 text-sm">● System Active</span>
      </div>

      {/* MODE TOGGLE */}
      <div className="flex justify-center gap-4 mt-12">
        <button
          onClick={() => setMode("simulation")}
          className={`px-4 py-2 rounded ${
            mode === "simulation" ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          Simulation Mode
        </button>
        <button
          onClick={() => setMode("camera")}
          className={`px-4 py-2 rounded ${
            mode === "camera" ? "bg-green-500" : "bg-gray-700"
          }`}
        >
          Camera Mode
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center justify-center">
        {mode === "camera" ? (
          <CameraDetection key="camera" />
        ) : (
          <SimulationUI />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
