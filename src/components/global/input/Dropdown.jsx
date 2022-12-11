import React from "react";
import "./dropdown.scss";

export default function Dropdown({
  options,
  onChange,
  value,
  name,
  label,
  noOption,
}) {
  return (
    <div className="dropdown">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange} value={value}>
        {options ? (
          options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            );
          })
        ) : (
          <option value="">{noOption}</option>
        )}
      </select>
    </div>
  );
}
