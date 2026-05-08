import { Routes, Route, Navigate } from "react-router-dom";
import Nl from "./Nl";
import En from "./En";

export default function App() {
  return (
    <Routes>
      <Route path="/"   element={<Nl />} />
      <Route path="/en" element={<En />} />
      <Route path="*"   element={<Navigate to="/" replace />} />
    </Routes>
  );
}