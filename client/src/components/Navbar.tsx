import { CalendarDays, CircleUser, Home, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-app-border bg-app-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="font-bold text-app-primary-dark text-xl">Period.</div>

        <nav className="flex items-center gap-4 ">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/calendar" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Calendar
          </Link>
          <Link to="/cycles" className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Cycles
          </Link>
          <Link to="/profile" className="flex items-center gap-2">
            <CircleUser className="w-4 h-4" />
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
