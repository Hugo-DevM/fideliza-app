import { z } from "zod";
import { girosSingupSchema } from "@/config/constants";

export const BusinessSchema = z.object({
  companyName: z.string().min(1, "Nombre de empresa requerido"),
  giroId: z
    .string()
    .min(1, "Selecciona un giro para continuar")
    .transform((val) => Number(val))
    .refine((num) => girosSingupSchema.some((g) => g.id === num), {
      message: "Selecciona un giro válido",
    }),
  phoneNumber: z.string().min(10, "Ingresa un numero telefónico valido"),
  rfc: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) => !val || (val.length >= 12 && val.length <= 13),
      "No es valido el RFC"
    ),
  address: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export type BusinessSchemaType = z.input<typeof BusinessSchema>;

export const defaultValuesBusiness: BusinessSchemaType = {
  companyName: "",
  giroId: "",
  phoneNumber: "",
  rfc: "",
  address: "",
};
