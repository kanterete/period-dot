const { z } = require("zod");

const createUserSchema = z
  .object({
    login: z
      .string()
      .min(3, "Login must be atleast 3 characters")
      .max(100, "Login too long"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    email: z.string().email("Incorrect email").max(255, "Email too long"),
    age: z.coerce
      .number()
      .int("Age must be an integer")
      .min(10, "Age is too low")
      .max(100, "Age is too high"),
  })
  .strict();

const editUserSchema = z
  .object({
    login: z
      .string()
      .min(3, "Login must be atleast 3 characters")
      .max(100, "Login too long")
      .optional(),
    email: z
      .string()
      .email("Incorrect email")
      .max(255, "Email too long")
      .optional(),
    age: z.coerce
      .number()
      .int("Age must be an integer")
      .min(10, "Age is too low")
      .max(100, "Age is too high")
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "You have to edit one field",
  });

module.exports = { createUserSchema, editUserSchema };
