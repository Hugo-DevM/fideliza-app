"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  LoginSchemaType,
  defaultValuesLogin,
} from "@/features/auth/schemas/login.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "@/features/auth/server/login.action";

import styles from "./page.module.css";
import Image from "next/image";
import FormInput from "@/components/forms/FormInput";
import ButtonCustom from "@/components/ui/Button";
import Link from "next/link";
import ConfirmModal from "@/components/modal/ConfirmModal";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const methodsLogin = useForm({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultValuesLogin,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = methodsLogin;

  const onSubmit = async (values: LoginSchemaType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    const result = await loginAction(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setShowModal(true);
      return;
    }

    router.push("/");
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

        <h2 className={styles.title}>Bienvenido</h2>
        <p className={styles.subtitle}>
          Ingresa tus credenciales para continuar
        </p>

        <FormProvider {...methodsLogin}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <ButtonCustom
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Ingresando..."
            >
              Iniciar Sesión
            </ButtonCustom>
          </form>
        </FormProvider>
        <span className={styles.contentLink}>
          No tienes una cuenta?{" "}
          <Link className={styles.link} href="/register">
            Registrate aqui
          </Link>
        </span>
      </div>
      {showModal && (
        <ConfirmModal
          open={showModal}
          title="Error al iniciar sesión"
          message={
            errorMessage === "INVALID_CREDENTIALS" ||
            errorMessage === "Invalid login credentials"
              ? "Contraseña y/o correo incorrecto"
              : errorMessage === "EMAIL_NOT_VERIFIED"
              ? errorMessage
              : "Tu correo no está verificado. Revisa tu correo para activarlo"
          }
          cancelLabel="Cerrar"
          confirmColor="danger"
          onCancel={() => setShowModal(false)}
          onConfirm={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
