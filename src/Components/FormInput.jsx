import React, { useState } from "react";
import "./styles/FormInput.css";

export const FormInput = ({
  label,
  name,
  disabled,
  value,
  onChange,
  min,
  onlyLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  function roundDecimal(numero, decimales) {
    const factor = 10 ** decimales;
    return Math.round(numero * factor) / factor;
  }

  function redondearValoresObj(obj, decimales) {
    const resultado = {};

    for (let key in obj) {
      if (typeof obj[key] === "number") {
        resultado[key] = roundDecimal(obj[key], decimales);
      } else {
        resultado[key] = obj[key];
      }
    }

    return resultado;
  }

  const handleWheel = (e) => {
    e.target.blur();
  };

  return (
    <div className="form-input-wrapper">
      <label htmlFor={name} className="form-input-label">
        {label}
      </label>
      {!onlyLabel ? (
        <>
          {typeof value == "object" ? (
            <input
              value={JSON.stringify(redondearValoresObj(value, 4))}
              placeholder={isNaN(value) ? "No Calculado aun" : ""}
              type="text"
              id={name}
              name={name}
              className="form-input-input"
              disabled={disabled}
              min={min}
              onWheel={handleWheel}
            />
          ) : (
            <input
              value={value}
              placeholder="0"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => onChange(name, e.target.value)}
              type="number"
              id={name}
              name={name}
              className="form-input-input"
              disabled={disabled}
              min={min}
              onWheel={handleWheel}
            />
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};
