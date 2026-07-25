import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../type/types";
import api from "../utils/axios";

type loginData = {
  email: string;
  password: string;
};

type registerData = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
};

interface ProviderProps {
  user: User | null;
  loading: boolean;
  login: (data: loginData) => Promise<void>;
  register: (data: registerData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
const AuthContext = createContext<ProviderProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  refreshUser: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const login = async (data: loginData) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
    navigate("/");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  const register = async (data: registerData) => {
    await api.post("/auth/register", data);
    navigate("/login");
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
