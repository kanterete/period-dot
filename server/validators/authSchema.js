const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email("Incorrect email").max(255, "Email too long"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

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
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password are not the same",
    path: ["confirmPassword"],
  });

module.exports = { registerSchema, loginSchema };
