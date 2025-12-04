import React from "react";
import styles from "./FormInput.module.css";

type InputCustomProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, InputCustomProps>(
  (props, ref) => {
    return <input ref={ref} className={styles.inputCustom} {...props} />;
  }
);

export default FormInput;
