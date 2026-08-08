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
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col rounded-r-3xl bg-app-sidebar p-4">
      <h1 className="text-app-bg text-3xl mb-4">Period.</h1>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          <House className="w-5 h-5" /> Summary
        </NavLink>
        <NavLink to="/calendar" className={navLinkClass}>
          <CalendarHeart className="w-5 h-5" /> Calendar
        </NavLink>
        <NavLink to="/cycles" className={navLinkClass}>
          <Droplet className="w-5 h-5" /> My cycles
        </NavLink>
        <NavLink to="/statistics" className={navLinkClass}>
          <ChartNoAxesColumn className="w-5 h-5" /> Statistics
        </NavLink>
        <NavLink to="/symptoms" className={navLinkClass}>
          <HeartPulse className="w-5 h-5" /> Symptoms
        </NavLink>
        <NavLink to="/settings" className={navLinkClass}>
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
