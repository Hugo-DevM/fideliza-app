import { z } from "zod";

export const ExchangeSchema = z.object({
  phoneNumber: z.string().min(10, "Ingresa un numero telefónico valido"),
  rewardsType: z.string().min(1, "Selecciona una recompensa para continuar"),
  amount: z
    .string()
    .min(1, "Ingresa una monto válido")
    .transform((val) => Number(val))
    .refine((num) => num > 0, {
      message: "El monto debe ser mayor a 0",
    }),
});

export type ExchangeSchemaType = z.input<typeof ExchangeSchema>;

export const defaultValuesExchange: ExchangeSchemaType = {
  phoneNumber: "",
  rewardsType: "",
  amount: "",
};
