import { CalendarDays, CircleUser, Home, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-app-border bg-app-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 flex-col">
        <div className="font-bold text-app-primary-dark text-xl">Period.</div>

        <nav className="flex items-center flex-col gap-4">
          <Home className="w-4 h-4" />
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/calendar">
            <CalendarDays className="w-4 h-4" />
            Calendar
          </Link>
          <Link to="/cycles">
            <RefreshCcw className="w-4 h-4" />
            Cycles
          </Link>
          <Link to="/profile">
            <CircleUser className="w-4 h-4" />
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
