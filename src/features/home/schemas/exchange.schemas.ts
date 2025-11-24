import { z } from "zod";

//Datos ficticios
export const rewardsTypeBD = [
  { id: 1, name: "Cafe gratis" },
  { id: 2, name: "Pastel Grande" },
  { id: 3, name: "Puntos Felices" },
  { id: 4, name: "Descuento Hyper" },
];
export const ExchangeSchema = z.object({
  phoneNumber: z.string().min(10, "Ingresa un numero telefónico valido"),
  rewardsType: z
    .string()
    .min(1, "Selecciona una recompensa para continuar")
    .transform((val) => Number(val))
    .refine((num) => rewardsTypeBD.some((g) => g.id === num), {
      message: "Selecciona un giro válido",
    }),
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
