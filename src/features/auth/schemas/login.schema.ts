import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("El correo no es valido").min(1, "Correo requerido"),
  password: z.string().min(1, "Ingresa una contraseña"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export const defaultValuesLogin: LoginSchemaType = {
  email: "",
  password: "",
};
