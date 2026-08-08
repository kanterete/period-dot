import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./AppLayout";
import Dashboard from "./components/Dashboard";
import Cycles from "./components/Cycles";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";
import Symptoms from "./components/Symptoms";
import Settings from "./components/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/cycles" element={<Cycles />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}

export default App;
