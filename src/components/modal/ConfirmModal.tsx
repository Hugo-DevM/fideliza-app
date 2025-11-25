import styles from "./ConfirmModal.module.css";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "primary" | "danger" | "neutral";
  onCancel: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
}

export default function ConfirmModal({
  open,
  title = "¿Estás seguro?",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmColor = "primary",
  onCancel,
  onConfirm,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>

        {message && <p className={styles.text}>{message}</p>}

        {children}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelLabel}
          </button>

          <button
            className={`${styles.confirmBtn} ${styles[confirmColor]}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
