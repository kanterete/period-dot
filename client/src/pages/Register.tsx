import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    <div>
      Register page
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <div>
          <label>Login:</label>
          <input type="text" {...register("login")} placeholder="your login" />
          {errors.login && <p>{errors.login.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email")}
            placeholder="your@email.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" {...register("age")} placeholder="your age" />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password")}
            placeholder="**********"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirm password:</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="**********"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        {serverError && <p>{serverError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
