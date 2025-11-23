import React from "react";
import styles from "./FormInput.module.css";

type InputCustomProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, InputCustomProps>(
  ({ type, placeholder, id, name, onChange, onBlur, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        className={styles.inputCustom}
      />
    );
  }
);

export default FormInput;
