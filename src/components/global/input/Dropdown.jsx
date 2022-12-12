import React, { useState } from "react";
import "./dropdown.scss";

export default function Dropdown({
  options,
  onChange,
  value,
  name,
  label,
  noOption,
  defaultValue,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  useState(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  return (
    <div className="dropdown">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={(ev) => {
          onChange(ev), setSelectedOption(ev.target.value);
        }}
        value={value}
        defaultValue={defaultValue}
        className={options.length === 0 ? "hide-arrow" : ""}
      >
        <option value="" hidden={selectedOption ? true : false}>
          Select a {label}
        </option>
        {options.length > 0 ? (
          options.map((option, index) => {
            return (
              <option value={option.value} key={index}>
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
