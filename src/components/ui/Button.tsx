import React from "react";
import styles from "./Button.module.css";

type ButtonCustomProps = {
  isValid: boolean;
  isSubmitting: boolean;
  loadingText?: string;
  type?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  isValid,
  isSubmitting,
  children,
  loadingText = "Guardando...",
  type,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={!isValid || isSubmitting}
      className={styles.button}
      {...rest}
    >
      {isSubmitting ? loadingText : children}
    </button>
  );
};

export default ButtonCustom;
