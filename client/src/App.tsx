import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./AppLayout";
import Dashboard from "./components/Dashboard";
import Cycles from "./components/Cycles";
import Profile from "./components/Profile";

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
        {/* <h1 className="text-4xl font-bold text-app-primary-dark p-10 md:flex md:flex-col md:justify-between">
          Period.
        </h1> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cycles" element={<Cycles />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
