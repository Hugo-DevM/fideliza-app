import { z } from "zod";

export const NewClientSchema = z.object({
  fullname: z.string().min(10, "Ingresa un nombre valido"),
  phoneNumber: z.string().min(10, "Ingresa un numero de telefono valido"),
  email: z.email("Email no valido").min(1, "Ingresa un correo electronico"),
});

export type NewClientSchemaType = z.infer<typeof NewClientSchema>;

export const defaultValuesNewClient: NewClientSchemaType = {
  fullname: "",
  phoneNumber: "",
  email: "",
};
