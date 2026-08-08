import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-app-bg text-app-text">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-app-bg px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
