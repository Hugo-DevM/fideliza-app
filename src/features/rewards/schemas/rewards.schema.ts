import { benefitTypesSchema, requirementTypesSchema } from "@/config/constants";
import { z } from "zod";

export const RewardsSchema = z
  .object({
    rewardName: z.string().min(3, "Nombre de recompensa requerido"),
    description: z
      .string()
      .min(5, "Descripción de recompensa requerida")
      .optional(),
    benefitType: z
      .string()
      .min(1, "Selecciona un tipo de beneficio")
      .transform((v) => Number(v))
      .refine((num) => benefitTypesSchema.some((t) => t.id === num), {
        message: "Selecciona un beneficio válido",
      }),
    benefitValue: z.union([z.string(), z.number()]),
    requirementType: z
      .string()
      .min(1, "Selecciona el tipo de requisito")
      .transform((v) => Number(v))
      .refine((num) => requirementTypesSchema.some((t) => t.id === num), {
        message: "Selecciona un requisito válido",
      }),
    requirementValue: z.union([z.string(), z.number()]),
  })
  .superRefine((data, ctx) => {
    switch (data.benefitType) {
      case 1:
      case 5:
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

      case 2:
        if (typeof data.benefitValue !== "number" || data.benefitValue <= 0) {
          ctx.addIssue({
            path: ["benefitValue"],
            code: "custom",
            message: "Debes ingresar un porcentaje válido",
          });
        }
        break;

      case 3:
        if (typeof data.benefitValue !== "number" || data.benefitValue <= 0) {
          ctx.addIssue({
            path: ["benefitValue"],
            code: "custom",
            message: "Debes ingresar un monto válido",
          });
        }
        break;

      case 4:
        if (typeof data.benefitValue !== "number" || data.benefitValue <= 0) {
          ctx.addIssue({
            path: ["benefitValue"],
            code: "custom",
            message: "Debes ingresar un número de puntos válido",
          });
        }
        break;
    }
    switch (data.requirementType) {
      case 1:
      case 2:
      case 3:
      case 5:
        if (
          typeof data.requirementValue !== "number" ||
          data.requirementValue <= 0
        ) {
          ctx.addIssue({
            path: ["requirementValue"],
            code: "custom",
            message: "Este requisito requiere un valor numérico mayor a 0",
          });
        }
        break;

      case 4:
        if (
          typeof data.requirementValue !== "string" ||
          !data.requirementValue.trim()
        ) {
          ctx.addIssue({
            path: ["requirementValue"],
            code: "custom",
            message: "Debes ingresar el producto requerido",
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
