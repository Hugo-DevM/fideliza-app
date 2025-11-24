"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./page.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import {
  defaultValuesRewards,
  RewardsSchema,
} from "@/features/rewards/schemas/rewards.schema";
import FormSelect from "@/components/forms/FormSelect";
import { rewardsTypeSchema } from "@/config/constants";
import Image from "next/image";

export default function Rewards() {
  const methodsRewards = useForm({
    mode: "onChange",
    resolver: zodResolver(RewardsSchema),
    defaultValues: defaultValuesRewards,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methodsRewards;

  const rewardType = methodsRewards.watch("rewardType");

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

        <FormProvider {...methodsRewards}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="rewardName">Nombre de la recompensa</label>
              <FormInput
                type="text"
                placeholder="Cafe Gratis"
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
                placeholder="En la compra de 10 cafes en 11 es gratis"
                {...register("description")}
              />
              {errors.description && (
                <span className={styles.error}>
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="rewardType">Tipo de Recompensa</label>
              <FormSelect
                id="rewardType"
                {...register("rewardType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un tipo de recompensa
                </option>

                {rewardsTypeSchema.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </FormSelect>
              {errors.rewardType && (
                <span className={styles.error}>
                  {errors.rewardType.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="value">Valor de la Recompensa</label>
              <FormInput
                type={rewardType === "4" ? "text" : "number"}
                id="value"
                placeholder={
                  rewardType === "4" ? "Ej: café latter" : "Ej: 10, 200, 5"
                }
                {...register("value", {
                  setValueAs: (val) => {
                    if (rewardType === "4") return val;
                    if (val === "" || val === null || val === undefined)
                      return "";
                    const num = Number(val);
                    return isNaN(num) ? "" : num;
                  },
                })}
              />
              {errors.value && (
                <span className={styles.error}>{errors.value.message}</span>
              )}
            </div>
            <ButtonCustom
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Ingresando..."
            >
              Registrar
            </ButtonCustom>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
