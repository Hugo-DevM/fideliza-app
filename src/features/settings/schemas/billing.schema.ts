import { z } from "zod";

export const BillingSchema = z.object({
  cardHolder: z
    .string()
    .min(1, "El nombre del titular es obligatorio")
    .max(100, "Nombre demasiado largo"),

  cardNumber: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, ""))
    .superRefine((value, ctx) => {
      if (!/^\d+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo números",
        });
        return;
      }
      if (value.length !== 16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La tarjeta debe tener 16 dígitos",
        });
      }
    }),

  expDate: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/AA)")
    .refine((value) => {
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const currentYear = Number(now.getFullYear().toString().slice(-2));
      const currentMonth = now.getMonth() + 1;
      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    }, "La tarjeta está vencida"),

  cvc: z
    .string()
    .trim()
    .min(3, "CVC inválido")
    .max(4, "CVC inválido")
    .regex(/^\d+$/, "CVC solo debe contener números"),
});

export type BillingSchemaType = z.infer<typeof BillingSchema>;

export const defaultValuesBilling: BillingSchemaType = {
  cardHolder: "",
  cardNumber: "",
  expDate: "",
  cvc: "",
};
