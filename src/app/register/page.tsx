"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValuesSingup,
  SingupSchema,
} from "@/features/auth/schemas/singup.schema";

import styles from "./page.module.css";
import Image from "next/image";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import Link from "next/link";
import FormSelect from "@/components/forms/FormSelect";
import { girosSingupSchema } from "@/config/constants";

export default function Register() {
  const methodsRegister = useForm({
    mode: "onChange",
    resolver: zodResolver(SingupSchema),
    defaultValues: defaultValuesSingup,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methodsRegister;

  const onSubmit = () => {
    console.log("Envio de datos");
  };
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Image
          loading="eager"
          src="/logo.svg"
          width={160}
          height={80}
          alt="Fideliza+"
          className={styles.logo}
        />

        <h2 className={styles.title}>Registrate</h2>
        <p className={styles.subtitle}>
          Registra tu negocio y comienza a fidelizar clientes
        </p>

        <FormProvider {...methodsRegister}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="companyName">Nombre del neogoció</label>
              <FormInput
                type="text"
                placeholder="Cafeteria FlyCoffe"
                id="companyName"
                {...register("companyName")}
              />
              {errors.companyName && (
                <span className={styles.error}>
                  {errors.companyName.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="giroId">Giro</label>
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
            <div className={styles.inputGroup}>
              <label htmlFor="email">Usuario</label>
              <FormInput
                type="email"
                placeholder="usuario@empresa.com"
                id="email"
                {...register("email")}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <FormInput
                type="password"
                id="password"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <FormInput
                type="password"
                id="confirmPassword"
                placeholder="********"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <ButtonCustom
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Ingresando..."
            >
              Crear Cuenta
            </ButtonCustom>
          </form>
        </FormProvider>
        <span className={styles.contentLink}>
          Ya tienes una cuenta con nosotros?{" "}
          <Link className={styles.link} href="/login">
            Iniciar Sesión
          </Link>
        </span>
      </div>
    </div>
  );
}
