"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValuesSingup,
  SingupSchema,
  SingupSchemaType,
} from "@/features/auth/schemas/signup.schema";
import { singupAction } from "@/features/auth/server/singup.action";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Giros } from "@/features/auth/Types";

import styles from "./register.module.css";
import Image from "next/image";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import Link from "next/link";
import FormSelect from "@/components/forms/FormSelect";

export default function Register({ giros }: { giros: Giros[] }) {
  const router = useRouter();
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

  const onSubmit = async (values: SingupSchemaType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    const result = await singupAction(formData);

    if (result?.error) {
      console.error(result.error);
      return;
    }

    router.push("/login");
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
            <div className={styles.compactGroup}>
              <div className={styles.inputGroup}>
                <label htmlFor="companyName">Nombre del negocio</label>
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

                  {giros.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </FormSelect>
                {errors.giroId && (
                  <span className={styles.error}>{errors.giroId.message}</span>
                )}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuario</label>
              <FormInput
                type="text"
                placeholder="Juan Carlos"
                id="username"
                {...register("username")}
              />
              {errors.username && (
                <span className={styles.error}>{errors.username.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo</label>
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
              loadingText="Creando cuenta..."
            >
              Crear Cuenta
            </ButtonCustom>
          </form>
        </FormProvider>
        <span className={styles.contentLink}>
          ¿Ya tienes una cuenta con nosotros?{" "}
          <Link className={styles.link} href="/login">
            Iniciar Sesión
          </Link>
        </span>
      </div>
    </div>
  );
}
