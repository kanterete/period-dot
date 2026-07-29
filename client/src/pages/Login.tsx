import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import loginImage from "../assets/loginImage.png";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      await login(data);
    } catch (err) {
      setServerError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen bg-app-bg px-4 py-8 text-app-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl grid place-items-center">
        <div className="grid w-full overflow-hidden bg-app-card rounded-xl shadow-xl md:grid-cols-2">
          <section className="relative hidden min-h-140 overflow-hidden bg-app-primary-soft md:block ">
            <img
              src={loginImage}
              alt="login image"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md flex flex-col gap-4"
            >
              <div>
                <h1 className="font-semibold">Welcome back! 👋</h1>
                <p className="text-sm text-app-muted">Login to your account</p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus: p-2">
                <Mail className="w-4 h-4 text-app-muted" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full bg-transparent outline-none"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus: p-2">
                <LockKeyhole className="w-4 h-4 text-app-muted" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full bg-transparent outline-none"
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              {serverError && <p>{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sm text-white w-full p-2 border-app-border bg-app-primary rounded-3xl mb-4"
              >
                {isSubmitting ? "Logging" : "Login"}
              </button>
              <p className="text-xs text-app-muted">
                You don't have an account?{" "}
                <Link to="/register" className="text-app-primary font-semibold">
                  Register here
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
