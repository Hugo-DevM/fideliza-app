import { z } from "zod";
import { rewardsTypeSchema } from "@/config/constants";

export type RewardsType = (typeof rewardsTypeSchema)[number];
export type RewardsId = ["id"];

export const RewardsSchema = z
  .object({
    rewardName: z.string().min(3, "Nombre de recompensa requerido"),
    description: z
      .string()
      .min(5, "Descripcion de recompensa requerida")
      .optional(),
    rewardType: z
      .string()
      .min(1, "Selecciona el tipo de recompensa para continuar")
      .transform((val) => Number(val))
      .refine((num) => rewardsTypeSchema.some((g) => g.id === num), {
        message: "Selecciona un tipo de recomensa valido",
      }),
    value: z.union([z.string(), z.number()]),
  })
  .superRefine((data, ctx) => {
    const type = data.rewardType;
    //Validacion para el tipo de recompensa que es string
    if (type === 4) {
      if (typeof data.value !== "string" || data.value.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Este tipo de recompensa requiere un valor de texto",
          path: ["value"],
        });
      }
      return;
    }
    //Validacion para el tipo de recompensa que es number
    if (typeof data.value !== "number" || isNaN(data.value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Este tipo de recompensa requiere un valor numérico",
        path: ["value"],
      });
    }
  });

export type RewardsSchemaType = z.input<typeof RewardsSchema>;

export const defaultValuesRewards: RewardsSchemaType = {
  rewardName: "",
  description: "",
  rewardType: "",
  value: "",
};
