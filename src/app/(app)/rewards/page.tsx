"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValuesRewards,
  RewardsSchema,
} from "@/features/rewards/schemas/rewards.schema";

import styles from "./page.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import FormSelect from "@/components/forms/FormSelect";
import { benefitTypesSchema, requirementTypesSchema } from "@/config/constants";

export default function Rewards() {
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(RewardsSchema),
    defaultValues: defaultValuesRewards,
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const benefitType = watch("benefitType");
  const requirementType = watch("requirementType");

  const onSubmit = () => {
    console.log("Envio de datos");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Nueva Recompensa</h1>
        <p className={styles.subtitle}>
          Ingresa los datos para crear una nueva recompensa
        </p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.sectionTitle}>Beneficio</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="rewardName">Nombre de la recompensa</label>
              <FormInput
                type="text"
                placeholder="Café Gratis"
                id="rewardName"
                {...register("rewardName")}
              />
              {errors.rewardName && (
                <span className={styles.error}>
                  {errors.rewardName.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">Descripción</label>
              <FormInput
                type="text"
                id="description"
                placeholder="En la compra de 10 cafés el 11 es gratis"
                {...register("description")}
              />
              {errors.description && (
                <span className={styles.error}>
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="benefitType">Tipo de Beneficio</label>
              <FormSelect
                id="benefitType"
                {...register("benefitType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un tipo de beneficio
                </option>
                {benefitTypesSchema.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </FormSelect>
              {errors.benefitType && (
                <span className={styles.error}>
                  {errors.benefitType.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="benefitValue">Valor del Beneficio</label>

              <FormInput
                id="benefitValue"
                type={
                  benefitType === "1" || benefitType === "5" ? "text" : "number"
                }
                placeholder={
                  benefitType === "1" || benefitType === "5"
                    ? "Ej: Café Latte"
                    : "Ej: 10, 200, 5"
                }
                {...register("benefitValue", {
                  setValueAs: (val) => {
                    if (benefitType === "1" || benefitType === "5") return val;
                    if (val === "" || val === null) return "";
                    const num = Number(val);
                    return isNaN(num) ? "" : num;
                  },
                })}
              />

              {errors.benefitValue && (
                <span className={styles.error}>
                  {errors.benefitValue.message}
                </span>
              )}
            </div>

            <h2 className={styles.sectionTitle}>Requisito</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="requirementType">Tipo de Requisito</label>

              <FormSelect
                id="requirementType"
                {...register("requirementType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona cómo se gana la recompensa
                </option>
                {requirementTypesSchema.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </FormSelect>

              {errors.requirementType && (
                <span className={styles.error}>
                  {errors.requirementType.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="requirementValue">Valor del Requisito</label>

              <FormInput
                id="requirementValue"
                type={requirementType === "4" ? "text" : "number"}
                placeholder={
                  requirementType === "4"
                    ? "Ej: Café latte"
                    : "Ej: 10, 200, 1000"
                }
                {...register("requirementValue", {
                  setValueAs: (val) => {
                    if (requirementType === "4") return val;
                    if (val === "" || val === null) return "";
                    const num = Number(val);
                    return isNaN(num) ? "" : num;
                  },
                })}
              />

              {errors.requirementValue && (
                <span className={styles.error}>
                  {errors.requirementValue.message}
                </span>
              )}
            </div>

            <ButtonCustom
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Guardando..."
            >
              Registrar
            </ButtonCustom>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
