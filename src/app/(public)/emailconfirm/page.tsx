"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function EmailConfirm() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.confirmCard}>
          <Image
            loading="eager"
            src="/logo.svg"
            width={160}
            height={80}
            alt="Fideliza+"
            className={styles.logo}
          />

          <h1 className={styles.confirmTitle}>¡Correo confirmado!</h1>

          <p className={styles.confirmText}>
            Gracias por verificar tu cuenta. Ya puedes iniciar sesión y comenzar
            a usar la plataforma.
          </p>

          <Link href="/login" className={styles.confirmBtn}>
            Ir al inicio de sesión
          </Link>

          <p className={styles.confirmFooter}>
            Si no realizaste esta acción, puedes ignorar este mensaje.
          </p>
        </div>
      </div>
    </div>
  );
}
