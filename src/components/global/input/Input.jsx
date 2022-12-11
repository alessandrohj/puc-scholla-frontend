import React from "react";
import "./input.scss";

export default function Input({
  type,
  id,
  placeholder,
  value,
  onChange,
  name,
  label,
  required,
  className,
}) {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`input-field ` + className}
      />
    </div>
  );
}
