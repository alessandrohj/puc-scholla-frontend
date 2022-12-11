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
  style,
  containerStyle,
}) {
  return (
    <div className="input" style={containerStyle}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(ev) => onChange(ev)}
        name={name}
        required={required}
        className={`input-field ` + className}
        style={style}
      />
    </div>
  );
}
