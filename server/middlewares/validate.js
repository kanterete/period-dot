const z = require("zod");

const createUserSchema = z.object({
  login: z
    .string("Must be a text")
    .min(6, { message: "Must be atleast 6 characters" }),
  password: z
    .string()
    .min(8, { message: "Must be atleast 8 characters" })
    .max(16),
  email: z.email("Correct your email"),
  age: z
    .int("Must be a number")
    .positive("Positive numbers only")
    .min(1, { message: "select higher age than 0" }),
});

const updateUserSchema = z.object({
  login: z.string(),
  email: z.email(),
  age: z.number().int().positive().min(1),
});

//TODO - fix validation

const createUserValidation = (data) => {
  const result = createUserSchema.safeParse(data);

  if (!result.success) {
    return z.prettifyError(result.error);
  }
  return result.success;
};

const updateUserValidation = (data) => {
  const result = updateUserSchema.safeParse(data);

  if (!result.success) {
    return z.prettifyError(result.error);
  }
  return result.success;
};

module.exports = { createUserValidation, updateUserValidation };
