import React from "react";
import { FormInput } from "./FormInput";

export const CalculatedValues = ({
  frequency,
  wavelengthI,
  amplitudeR,
  wavelengthR,
  amplitudeT,
  wavelengthT,
  velocities,
  coefR,
  coefT,
}) => {
  const kI = (2 * Math.PI) / wavelengthI;
  const k1 = (2 * Math.PI) / wavelengthR;
  const k2 = (2 * Math.PI) / wavelengthT;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="font-semibold mb-2">Valores Calculados:</h3>

      <FormInput
        label="Coeficientes de reflexión y trasmisión"
        name="coef"
        value={{ R: coefR, T: coefT }}
        disabled={true}
      />
      <FormInput
        label="Velocidades medio 1 y medio 2 [m/s]"
        name="velocities"
        value={velocities}
        disabled={true}
      />
      <FormInput
        label="Amplitudes E0 onda trasmitida y reflejada"
        name="amplitudes"
        value={{ E0R: amplitudeR, E0T: amplitudeT }}
        disabled={true}
      />
    </div>
  );
};
