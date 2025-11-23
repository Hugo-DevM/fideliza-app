import { z } from "zod";
import { girosSingupSchema } from "@/config/constants";

export type GirosType = (typeof girosSingupSchema)[number];
export type GiroId = GirosType["id"];

export const SingupSchema = z
  .object({
    email: z.email("Email no valido").min(1, "Email requerido"),
    password: z.string().min(8, "Debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Debe tener al menos 8 caracteres"),
    companyName: z.string().min(1, "Nombre de empresa requerido"),
    giroId: z
      .string()
      .min(1, "Selecciona un giro para continuar")
      .transform((val) => Number(val))
      .refine((num) => girosSingupSchema.some((g) => g.id === num), {
        message: "Selecciona un giro válido",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type SingupSchemaType = z.input<typeof SingupSchema>;

export const defaultValuesSingup: SingupSchemaType = {
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  giroId: "",
};
