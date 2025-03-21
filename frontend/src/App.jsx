import { useState } from "react";
import shieldLogo from "./assets/logo.svg";

function App() {
  const [formData, setFormData] = useState({
    Account_Length: "",
    VMail_Message: "",
    Day_Mins: "",
    Day_Calls: "",
    Day_Charge: "",
    Eve_Mins: "",
    Eve_Calls: "",
    Eve_Charge: "",
    Night_Mins: "",
    Night_Calls: "",
    Night_Charge: "",
    Intl_Mins: "",
    Intl_Calls: "",
    Intl_Charge: "",
    CustServ_Calls: "",
  });

  const [result, setResult] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Failed to connect to API" });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-500 to-red-900 text-white">
      {/* Logo */}
      <img src={shieldLogo} alt="Fraud Detection Logo" className="w-20 mb-4" />

      <h1 className="text-4xl font-bold mb-6 font-serif">Fraud Shield Detection</h1>

      <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-8 shadow-2xl rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Enter Call Details</h2>

        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold capitalize">{key.replace("_", " ")}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-stone-200 hover:bg-blue-700 text-black p-3 rounded-lg text-lg font-semibold">
          Predict Fraud
        </button>
      </form>

      {/* Result Section */}
      {result && (
        <div className="mt-6 p-4 bg-white text-gray-900 shadow-lg rounded-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold">Prediction Result:</h2>
          <p className="text-lg font-mono">{JSON.stringify(result, null, 2)}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-300">
        Capstone Project 2025 - Fraud Shield AI | Developed by Team
      </footer>
    </div>
  );
}

export default App;
