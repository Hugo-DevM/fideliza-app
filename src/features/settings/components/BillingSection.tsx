import { FormProvider, useForm } from "react-hook-form";
import styles from "./BillingSection.module.css";
import globalStyles from "./globalSection.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillingSchema, defaultValuesBilling } from "../schemas/billing.schema";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";

export function BillingSection() {
  const formatExpDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{0,2})/, "$1/$2")
      .slice(0, 5);
  };
  const methodsBilling = useForm({
    mode: "onChange",
    resolver: zodResolver(BillingSchema),
    defaultValues: defaultValuesBilling,
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = methodsBilling;

  const onSubmit = () => {
    console.log("Envio de datos");
  };
  return (
    <section className={globalStyles.card}>
      <h1 className={globalStyles.cardTitle}>Pago</h1>
      <p className={globalStyles.cardSubtitle}>
        Administra tu suscripción y métodos de pago.
      </p>

      <div className={styles.billingPlan}>
        <p className={styles.billingLabel}>Plan actual</p>
        <p className={styles.billingPlanName}>Fideliza+ Starter</p>
        <p className={styles.billingPrice}>$0 / mes (beta)</p>
      </div>
      <FormProvider {...methodsBilling}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="cardHolder">Titular de la tarjeta</label>
            <FormInput
              type="text"
              id="cardHolder"
              placeholder="Nombre completo del titular"
              {...register("cardHolder")}
            />
            {errors.cardHolder && (
              <span className={styles.error}>{errors.cardHolder.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Número de tarjeta</label>
            <FormInput
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              {...register("cardNumber")}
            />
            {errors.cardNumber && (
              <span className={styles.error}>{errors.cardNumber.message}</span>
            )}
          </div>

          <div className={styles.formGroupRow}>
            <div className={styles.formGroup}>
              <label htmlFor="expDate">Expiración</label>
              <FormInput
                type="text"
                id="expDate"
                placeholder="MM/AA"
                maxLength={5}
                value={watch("expDate") ?? ""}
                {...register("expDate")}
                onChange={(e) => {
                  const formatted = formatExpDate(e.target.value);
                  setValue("expDate", formatted, { shouldValidate: true });
                }}
              />
              {errors.expDate && (
                <span className={styles.error}>{errors.expDate.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvc">CVC</label>
              <FormInput
                type="text"
                id="cvc"
                placeholder="000"
                maxLength={3}
                {...register("cvc")}
              />
              {errors.cvc && (
                <span className={styles.error}>{errors.cvc.message}</span>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <ButtonCustom
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Guardando..."
            >
              Guardar método de pago
            </ButtonCustom>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
