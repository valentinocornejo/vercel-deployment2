import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Registro } from "./pages/register";
import { IniciodeSesion } from "./pages/login";
import { MultiStepForm } from "./pages/quickStart";
import { Homepage } from "./pages/homepage";
import { BarcodeScanner } from "./pages/barcodescanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registro />} />
        <Route path="/login" element={<IniciodeSesion />} />
        <Route path="/quickstart" element={<MultiStepForm />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/barcodescanner" element={<BarcodeScanner />} />
      </Routes>
    </Router>
  );
}

export default App;
