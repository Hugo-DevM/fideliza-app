"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValuesNewClient,
  NewClientSchema,
  NewClientSchemaType,
} from "@/features/clients/schemas/newclient.schema";

import styles from "./page.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import Link from "next/link";
import { newClientAction } from "@/features/clients/server/clients.action";

export default function NewClient() {
  const methodsNewClient = useForm({
    mode: "onChange",
    resolver: zodResolver(NewClientSchema),
    defaultValues: defaultValuesNewClient,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methodsNewClient;

  const onSubmit = async (values: NewClientSchemaType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    const result = await newClientAction(formData);
    if (result?.error) {
      console.error(result.error);
      return;
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Registro de Cliente</h1>
        <p className={styles.subtitle}>
          Ingresa los datos para registrar un nuevo cliente
        </p>

        <FormProvider {...methodsNewClient}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullname">Nombre completo *</label>
              <FormInput
                type="text"
                placeholder="Ej: Jua Francisco Garcia Peréz"
                id="fullname"
                {...register("fullname")}
              />
              {errors.fullname && (
                <span className={styles.error}>{errors.fullname.message}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">Numero de telefóno *</label>
              <FormInput
                type="text"
                placeholder="Ej: 3221453378"
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
              <label htmlFor="email">Correo electrónico (opcional)</label>
              <FormInput
                type="email"
                placeholder="Ej: fideliza@fideliza.mx"
                id="email"
                {...register("email")}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
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
        <Link className={styles.link} href="/clients">
          Regresar
        </Link>
      </div>
    </div>
  );
}
