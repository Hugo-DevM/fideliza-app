import { z } from "zod";

export const SingupSchema = z
  .object({
    email: z.email("Email no valido").min(1, "Email requerido"),
    password: z.string().min(8, "Debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Debe tener al menos 8 caracteres"),
    companyName: z.string().min(1, "Nombre de empresa requerido"),
    username: z.string().min(1, "Nombre de usuario requerido"),
    giroId: z.string().min(1, "Selecciona un giro para continuar"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type SingupSchemaType = z.infer<typeof SingupSchema>;

export const defaultValuesSingup: SingupSchemaType = {
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  username: "",
  giroId: "",
};
