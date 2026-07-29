import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  ChevronLeft,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import registerImage from "../assets/registerImage.png";

const registerSchema = z
  .object({
    login: z
      .string()
      .trim()
      .min(3, "Login must be atleast 3 characters")
      .max(100, "Login too long"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Incorrect email")
      .max(255, "Email too long"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    age: z.coerce
      .number()
      .int("Age must be an integer")
      .min(10, "Age is too low")
      .max(100, "Age is too high"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password are not the same",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { registerAuth } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");

      await registerAuth(data);
    } catch (err) {
      setServerError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen bg-app-bg px-4 py-8">
      <div className="mx-auto max-w-5xl grid place-items-center">
        <div className="grid overflow-hidden md:grid-cols-2 w-full bg-app-card shadow-xl rounded-xl">
          <section className="relative hidden overflow-hidden  min-h-140 md:block bg-app-primary-soft p-6 sm:p-10">
            <img
              src={registerImage}
              alt="register img"
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
                <h1 className="font-semibold">Create your account</h1>
                <p className="text-sm text-app-muted">
                  Start your journey now!
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus:p-2">
                <UserRound className="w-4 h-4 text-app-muted" />
                <input
                  type="text"
                  {...register("login")}
                  placeholder="Login"
                  className="w-full bg-transparent outline-none"
                />
                {errors.login && <p>{errors.login.message}</p>}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus:p-2">
                <Mail className="w-4 h-4 text-app-muted" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full bg-transparent outline-none"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus:p-2">
                <Calendar className="w-4 h-4 text-app-muted" />
                <input
                  type="number"
                  {...register("age")}
                  placeholder="Age"
                  className="w-full bg-transparent outline-none"
                />
                {errors.age && <p>{errors.age.message}</p>}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus:p-2">
                <LockKeyhole className="w-4 h-4 text-app-muted" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full bg-transparent outline-none"
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-app-border bg-white px-4 py-3 focus:p-2">
                <LockKeyhole className="w-4 h-4 text-app-muted" />
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm password"
                  className="w-full bg-transparent outline-none"
                />
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </div>
              {serverError && <p>{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sm text-white w-full p-2 border-app-border bg-app-primary rounded-3xl mb-4"
              >
                {isSubmitting ? "Registering" : "Register"}
              </button>

              <p className="text-xs text-app-muted">
                You have already account?{" "}
                <Link to="/login" className="text-app-primary font-semibold">
                  Login here
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Register;
