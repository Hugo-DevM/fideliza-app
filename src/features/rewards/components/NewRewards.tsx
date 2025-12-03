"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValuesRewards,
  RewardsSchema,
  RewardsSchemaType,
} from "@/features/rewards/schemas/rewards.schema";
import { Benefit, Requirement } from "../type";
import { rewardAction } from "../server/rewards.action";
import { useRouter } from "next/navigation";

import styles from "./NewRewards.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import FormSelect from "@/components/forms/FormSelect";
import Link from "next/link";

export default function NewRewards({
  benefits,
  requirements,
}: {
  benefits: Benefit[];
  requirements: Requirement[];
}) {
  const router = useRouter();
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

  const onSubmit = async (values: RewardsSchemaType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    const result = await rewardAction(formData);

    if (result?.error) {
      console.error(result.error);
      return;
    }

    router.push("/rewards");
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
              <label htmlFor="rewardName">Nombre de la recompensa *</label>
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
              <label htmlFor="description">Descripción *</label>
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
              <label htmlFor="benefitType">Tipo de Beneficio *</label>
              <FormSelect
                id="benefitType"
                {...register("benefitType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un tipo de beneficio
                </option>
                {benefits.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
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
              <label htmlFor="benefitValue">Valor del Beneficio *</label>

              <FormInput
                id="benefitValue"
                type={benefitType === "1" ? "text" : "number"}
                placeholder={
                  benefitType === "1" ? "Ej: Café Latte" : "Ej: 10, 200, 5"
                }
                {...register("benefitValue", {
                  setValueAs: (val) => {
                    if (benefitType === "1") return val;
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
              <label htmlFor="requirementType">Tipo de Requisito *</label>

              <FormSelect
                id="requirementType"
                {...register("requirementType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona cómo se gana la recompensa
                </option>
                {requirements.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
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
              <label htmlFor="requirementValue">Valor del Requisito *</label>

              <FormInput
                id="requirementValue"
                type={requirementType === "1" ? "text" : "number"}
                placeholder={
                  requirementType === "1"
                    ? "Ej: Café latte"
                    : "Ej: 10, 200, 1000"
                }
                {...register("requirementValue", {
                  setValueAs: (val) => {
                    if (requirementType === "1") return val;
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
        <Link className={styles.link} href="/rewards">
          Regresar
        </Link>
      </div>
    </div>
  );
}
