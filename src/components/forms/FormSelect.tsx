import React from "react";
import styles from "./FormSelect.module.css";

type SelectCustomProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const FormSelect = React.forwardRef<HTMLSelectElement, SelectCustomProps>(
  ({ id, name, onChange, onBlur, children, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.selectCustom}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

export default FormSelect;
