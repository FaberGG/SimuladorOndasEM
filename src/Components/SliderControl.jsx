import React from "react";
import { FormInput } from "./FormInput";

export const SliderControl = ({ state, setState, label, min, max, step }) => {
  const handleInputChange = (name, value) => {
    setState(parseFloat(value) || 0);
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
      <input
        type="range"
        value={state}
        onChange={(e) => setState(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        style={{ width: "100%" }}
      />
      <FormInput
        label="Valor exacto:"
        name=""
        value={state}
        onChange={handleInputChange}
        disabled={false}
        min={0}
      />
    </div>
  );
};
