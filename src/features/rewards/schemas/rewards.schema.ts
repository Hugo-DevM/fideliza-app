import { z } from "zod";

export const RewardsSchema = z
  .object({
    rewardName: z.string().min(3, "Nombre de recompensa requerido"),
    description: z
      .string()
      .min(5, "Descripción de recompensa requerida")
      .optional(),
    benefitType: z.coerce.number().min(1, "Selecciona un tipo de beneficio"),
    benefitValue: z.union([z.string(), z.number()]),

    requirementType: z.coerce
      .number()
      .min(1, "Selecciona el tipo de requisito"),
    requirementValue: z.coerce.number().min(1, "Ingresa un monto valido"),
  })
  .superRefine((data, ctx) => {
    switch (data.benefitType) {
      case 1: // Producto Gratis
        if (
          typeof data.benefitValue !== "string" ||
          !data.benefitValue.trim()
        ) {
          ctx.addIssue({
            path: ["benefitValue"],
            code: "custom",
            message: "Este beneficio requiere un nombre de producto",
          });
        }
        break;

      case 2: // Descuento
        if (typeof data.benefitValue !== "number" || data.benefitValue <= 0) {
          ctx.addIssue({
            path: ["benefitValue"],
            code: "custom",
            message: "Debes ingresar un porcentaje válido",
          });
        }
        break;
    }
  });

export type RewardsSchemaType = z.input<typeof RewardsSchema>;

export const defaultValuesRewards: RewardsSchemaType = {
  rewardName: "",
  description: "",
  benefitType: "",
  benefitValue: "",
  requirementType: "",
  requirementValue: "",
};
