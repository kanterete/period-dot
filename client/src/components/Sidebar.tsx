import {
  CalendarHeart,
  ChartNoAxesColumn,
  Droplet,
  HeartPulse,
  House,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <aside className="flex flex-col min-h-screen w-64 shrink-0 bg-app-sidebar p-4 rounded-l-xl rounded-bl-xl">
      <h1 className="text-app-bg text-2xl mb-8">Period.</h1>
      <nav className="">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <House className="w-5 h-5" /> Summary
        </NavLink>
        <NavLink
          to="/calendar"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <CalendarHeart className="w-5 h-5" /> Calendar
        </NavLink>
        <NavLink
          to="/cycles"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Droplet className="w-5 h-5" /> My cycles
        </NavLink>
        <NavLink
          to="/statistics"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <ChartNoAxesColumn className="w-5 h-5" /> Statistics
        </NavLink>
        <NavLink
          to="/symptoms"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <HeartPulse className="w-5 h-5" /> Symptoms
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Settings className="w-5 h-5" /> Settings
        </NavLink>
      </nav>
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
