"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewClientSchema,
  NewClientSchemaType,
} from "@/features/clients/schemas/newclient.schema";
import { updateClientAction } from "@/features/clients/server/clients.action";
import { useRouter } from "next/navigation";
import { Client } from "../type";

import styles from "./ClientEdit.module.css";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import Link from "next/link";

export default function ClientEdit({ client }: { client: Client }) {
  const router = useRouter();

  const methods = useForm<NewClientSchemaType>({
    mode: "onChange",
    resolver: zodResolver(NewClientSchema),
    defaultValues: {
      fullname: client.fullname,
      phoneNumber: client.phone,
      email: client.email || "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const onSubmit = async (values: NewClientSchemaType) => {
    const formData = new FormData();

    formData.append("id", String(client.id));

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    const result = await updateClientAction(formData);

    if (result?.error) {
      alert(result.error);
      console.error(result.error);
      return;
    }

    router.push("/clients");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Actualizar Cliente</h1>
        <p className={styles.subtitle}>Modifica la información del cliente</p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullname">Nombre completo *</label>
              <FormInput
                type="text"
                placeholder="Ej: Juan Francisco García Pérez"
                id="fullname"
                {...register("fullname")}
              />
              {errors.fullname && (
                <span className={styles.error}>{errors.fullname.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">Número de teléfono *</label>
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
              Actualizar cambios
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
