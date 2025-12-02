import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email no valido")
    .min(1, "Email requerido")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(1, "Ingresa una contraseña"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export const defaultValuesLogin: LoginSchemaType = {
  email: "",
  password: "",
};
