import React from "react";
import { SliderControl } from "./SliderControl";
import { CalculatedValues } from "./CalculatedValues";
import { c, epsilon0, mu0 } from "../calculations";
import { FormInput } from "./FormInput";
export const Controls = ({
  amplitude,
  setAmplitude,
  frequency,
  setFrequency,
  wavelength,
  //valores a mostrar
  amplitudeR,
  wavelengthR,
  amplitudeT,
  wavelengthT,
  velocities,
  coefR,
  coefT,
  //otros estados
  showElectric,
  setShowElectric,
  showMagnetic,
  setShowMagnetic,
  mediumVars,
  setMediumVars,
}) => {
  const handleMediumVarsChange = (name, value) => {
    // Parse the input value as a float or set to 0 if invalid
    const numericValue = parseFloat(value) || 0;

    setMediumVars((prev) => {
      // Compute new state
      const updatedVars = {
        ...prev,
        [name]: numericValue,
      };

      // Calculate absolute values based on relative values
      if (name === "mu_r1") {
        updatedVars.mu1 = numericValue * mu0; // μ₁ = μᵣ₁ * μ₀
      } else if (name === "mu_r2") {
        updatedVars.mu2 = numericValue * mu0; // μ₂ = μᵣ₂ * μ₀
      } else if (name === "epsilon_r1") {
        updatedVars.epsilon1 = numericValue * epsilon0; // 𝜖₁ = 𝜖ᵣ₁ * 𝜖₀
      } else if (name === "epsilon_r2") {
        updatedVars.epsilon2 = numericValue * epsilon0; // 𝜖₂ = 𝜖ᵣ₂ * 𝜖₀
      }

      return updatedVars;
    });
  };

  return (
    <div
      style={{
        flex: "-1",
        color: "#fff",
        backgroundColor: "#1c1c1e",
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        Control Onda Incidente
      </h2>

      {/* Control de Amplitud */}
      <SliderControl
        state={amplitude}
        setState={setAmplitude}
        label={"Amplitud (E₀): " + amplitude + " V/m"}
        min={1}
        max={100}
        step={1}
      />

      {/* Control de Frecuencia */}
      <SliderControl
        state={frequency}
        setState={setFrequency}
        label={"Frecuencia (f): " + frequency + " Hz"}
        min={1}
        max={400}
        step={1}
      />

      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        Permeabilidad y permitividad de los medios
      </h2>

      {/* Inputs para valores relativos */}

      <div className="text-sm text-gray-500">
        Valor absoluto (𝜇₁): {mediumVars.mu_r1} × μ₀ ≈{" "}
        {(mediumVars.mu_r1 * mu0).toExponential(2)} H/m
      </div>
      <FormInput
        label="Permeabilidad relativa (𝜇ᵣ₁)"
        name="mu_r1"
        value={mediumVars.mu_r1}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      <div className="text-sm text-gray-500">
        Valor absoluto (𝜖₁): {mediumVars.epsilon_r1} × ε₀ ≈{" "}
        {(mediumVars.epsilon_r1 * epsilon0).toExponential(2)} F/m
      </div>

      <FormInput
        label="Permitividad relativa (𝜖ᵣ₁)"
        name="epsilon_r1"
        value={mediumVars.epsilon_r1}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />
      <div className="text-sm text-gray-500">
        Valor absoluto (𝜇₂): {mediumVars.mu_r2} × μ₀ ≈{" "}
        {(mediumVars.mu_r2 * mu0).toExponential(2)} H/m
      </div>
      <FormInput
        label="Permeabilidad relativa (𝜇ᵣ₂)"
        name="mu_r2"
        value={mediumVars.mu_r2}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      <div className="text-sm text-gray-500">
        Valor absoluto (𝜖₂): {mediumVars.epsilon_r2} × ε₀ ≈{" "}
        {(mediumVars.epsilon_r2 * epsilon0).toExponential(2)} F/m
      </div>
      <FormInput
        label="Permitividad relativa (𝜖ᵣ₂)"
        name="epsilon_r2"
        value={mediumVars.epsilon_r2}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      {/* Constantes Fundamentales */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Constantes Fundamentales:</h3>
        <div className="grid gap-2 text-sm">
          <div title="Velocidad de la luz en el vacío">
            <span className="font-semibold">c:</span> {c.toExponential(2)} m/s
          </div>
          <div title="Permitividad eléctrica del vacío">
            <span className="font-semibold">ε₀:</span>{" "}
            {epsilon0.toExponential(2)} F/m
          </div>
          <div title="Permeabilidad magnética del vacío">
            <span className="font-semibold">μ₀:</span> {mu0.toExponential(2)}{" "}
            H/m
          </div>
        </div>
      </div>

      {/* Condiciones de Frontera */}
      {/* <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Condiciones de Frontera
        </label>
        <select
          value={boundaryCondition}
          onChange={(e) => setBoundaryCondition(e.target.value)}
          style={{ width: "100%", padding: "4px" }}
        >
          <option value="both-open">Ambos extremos abiertos</option>
          <option value="one-closed">Un extremo cerrado</option>
        </select>
      </div> */}

      {/* <ScaleInfo showScaledB={showScaledB} E0={amplitude} /> */}

      <div>
        {/* Toggle de escala real */}
        {/* <label>
          <input
            type="checkbox"
            checked={showScaledB}
            onChange={(e) => setShowScaledB(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Mostrar B con escala física real
        </label> */}

        {/* Valores calculados actualizados */}
        <CalculatedValues
          frequency={frequency}
          wavelengthI={wavelength}
          amplitudeR={amplitudeR}
          wavelengthR={wavelengthR}
          amplitudeT={amplitudeT}
          wavelengthT={wavelengthT}
          velocities={velocities}
          coefR={coefR}
          coefT={coefT}
        />
      </div>
    </div>
  );
};
