"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValuesExchange,
  ExchangeSchema,
  rewardsTypeBD,
} from "@/features/home/schemas/exchange.schemas";

import styles from "./page.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import FormSelect from "@/components/forms/FormSelect";

export default function Home() {
  const methodsExchange = useForm({
    mode: "onChange",
    resolver: zodResolver(ExchangeSchema),
    defaultValues: defaultValuesExchange,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methodsExchange;

  const rewardsType = methodsExchange.watch("rewardsType");

  const onSubmit = () => {
    console.log("Envio de datos");
  };
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Registrar Compra</h1>
        <p className={styles.subtitle}>
          Ingresa los datos para registrar una compra
        </p>

        <FormProvider {...methodsExchange}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">Numero de telefono</label>
              <FormInput
                type="text"
                placeholder="Ej: 3221343234"
                id="phoneNumber"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span className={styles.error}>
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="rewardsType">Recompensa a canjear</label>
              <FormSelect
                id="rewardsType"
                {...register("rewardsType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una recompensa a canjear
                </option>

                {rewardsTypeBD.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </FormSelect>
              {errors.rewardsType && (
                <span className={styles.error}>
                  {errors.rewardsType.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="amount">Monto</label>
              <FormInput
                type="number"
                placeholder="Ej: 1, $100, 5"
                id="amount"
                {...register("amount")}
              />
              {errors.amount && (
                <span className={styles.error}>{errors.amount.message}</span>
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
