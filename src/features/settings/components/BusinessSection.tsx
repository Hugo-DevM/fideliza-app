import { FormProvider, useForm } from "react-hook-form";
import {
  BusinessSchema,
  defaultValuesBusiness,
} from "../schemas/business.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { girosSingupSchema } from "@/config/constants";

import FormInput from "@/components/forms/FormInput";
import styles from "./BusinessSection.module.css";
import globalStyles from "./globalSection.module.css";
import FormSelect from "@/components/forms/FormSelect";
import ButtonCustom from "@/components/ui/Button";

export function BusinessSection() {
  const methodsBusiness = useForm({
    mode: "onChange",
    resolver: zodResolver(BusinessSchema),
    defaultValues: defaultValuesBusiness,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methodsBusiness;

  const onSubmit = () => {
    console.log("Envio de datos");
  };

  return (
    <section className={globalStyles.card}>
      <h1 className={globalStyles.cardTitle}>Perfil del negocio</h1>
      <p className={globalStyles.cardSubtitle}>
        Actualiza la información visible de tu negocio dentro de Fideliza+.
      </p>
      <FormProvider {...methodsBusiness}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="companyName">Nombre del negocio</label>
            <FormInput
              type="text"
              id="companyName"
              placeholder="Cafeteria FlyCoffe"
              {...register("companyName")}
            />
            {errors.companyName && (
              <span className={styles.error}>{errors.companyName.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Giro / Industria</label>
            <FormSelect id="giroId" {...register("giroId")} defaultValue="">
              <option value="" disabled>
                Selecciona un giro
              </option>

              {girosSingupSchema.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </FormSelect>
            {errors.giroId && (
              <span className={styles.error}>{errors.giroId.message}</span>
            )}
          </div>

          <div className={styles.formGroupRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Teléfono</label>
              <FormInput
                type="text"
                id="phoneNumber"
                placeholder="3221239569"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span className={styles.error}>
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rfc">RFC (opcional)</label>
              <FormInput
                type="text"
                id="rfc"
                placeholder="X9S9KUINM"
                {...register("rfc")}
              />
              {errors.rfc && (
                <span className={styles.error}>{errors.rfc.message}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Dirección</label>
            <FormInput
              type="text"
              id="address"
              placeholder="Calle Emiliano #253, Puerto Vallarta, Jalisco"
              {...register("address")}
            />
            {errors.address && (
              <span className={styles.error}>{errors.address.message}</span>
            )}
          </div>

          <div className={styles.actions}>
            <ButtonCustom
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Guardando..."
            >
              Guardar cambio
            </ButtonCustom>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
