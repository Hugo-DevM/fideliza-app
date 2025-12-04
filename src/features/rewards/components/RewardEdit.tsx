"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RewardsSchema,
  RewardsSchemaType,
} from "@/features/rewards/schemas/rewards.schema";
import { Benefit, Requirement, Reward } from "../type";
import { updateRewardAction } from "../server/rewards.action";
import { useRouter } from "next/navigation";

import styles from "./NewRewards.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import FormSelect from "@/components/forms/FormSelect";
import Link from "next/link";

export default function RewardEdit({
  reward,
  benefits,
  requirements,
}: {
  reward: Reward;
  benefits: Benefit[];
  requirements: Requirement[];
}) {
  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(RewardsSchema),
    defaultValues: {
      rewardName: reward.name,
      description: reward.description,
      benefitType: reward.benefit_type,
      benefitValue: reward.benefit_value,
      requirementType: reward.requirement_type,
      requirementValue: String(reward.requirement_value),
    },
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

    formData.append("id", String(reward.id));

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    const result = await updateRewardAction(formData);

    if (result?.error) {
      console.error(result.error);
      return;
    }

    router.push("/rewards");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Actulizar Recompensa</h1>
        <p className={styles.subtitle}>
          Modifca los datos para actualizar la recompensa seleciconada
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
              <FormSelect id="benefitType" {...register("benefitType")}>
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
                type={benefitType === 1 ? "text" : "number"}
                placeholder={
                  benefitType === 1 ? "Ej: Café Latte" : "Ej: 10, 200, 5"
                }
                {...register("benefitValue", {
                  setValueAs: (val) => {
                    if (benefitType === 1) return val;
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

              <FormSelect id="requirementType" {...register("requirementType")}>
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
                type={requirementType === 1 ? "text" : "number"}
                placeholder={
                  requirementType === 1 ? "Ej: Café latte" : "Ej: 10, 200, 1000"
                }
                {...register("requirementValue", {
                  setValueAs: (val) => {
                    if (requirementType === 1) return val;
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
              Actualizar
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
