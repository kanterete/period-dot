import { User2Icon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-app-accent-dark flex min-h-screen">
      <Sidebar />
      <section className="w-full bg-app-accent-light p-6">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-semibold">Summary</h1>
          <div className="bg-red-200 flex gap-3 items-center">
            <User2Icon className="w-5 h-5" />
            {user?.login}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
