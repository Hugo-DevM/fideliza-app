import { z } from "zod";

export const NewClientSchema = z.object({
  fullname: z.string().min(10, "Ingresa un nombre valido"),
  phoneNumber: z.string().min(10, "Ingresa un numero de telefono valido"),
  email: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val.toLowerCase()))
    .optional()
    .refine(
      (val) => val === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Email no válido" }
    ),
});

export type NewClientSchemaType = z.infer<typeof NewClientSchema>;

export const defaultValuesNewClient: NewClientSchemaType = {
  fullname: "",
  phoneNumber: "",
  email: "",
};
