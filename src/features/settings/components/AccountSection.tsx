import styles from "./AccountSection.module.css";
import globalStyles from "./globalSection.module.css";

export function AccountSection() {
  return (
    <section className={globalStyles.card}>
      <h1 className={globalStyles.cardTitle}>Cuenta</h1>
      <p className={globalStyles.cardSubtitle}>
        Gestiona tu sesión y controla tu cuenta personal.
      </p>

      <div className={styles.securityBlock}>
        <div>
          <h3 className={styles.securityTitle}>Cerrar sesión</h3>
          <p className={styles.securityText}>
            Te desconectarás de todos los dispositivos activos.
          </p>
        </div>
        <button className={styles.secondaryButton}>Cerrar sesión</button>
      </div>

      <div className={styles.securityBlock}>
        <div>
          <h3 className={styles.securityTitle}>Eliminar cuenta</h3>
          <p className={styles.securityText}>
            Esta acción es permanente. Todos tus datos serán eliminados.
          </p>
        </div>
        <button className={`${styles.secondaryButton} ${styles.deleteButton}`}>
          Eliminar cuenta
        </button>
      </div>
    </section>
  );
}
