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
    setMediumVars((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
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
        min={400000000000000}
        max={1.5e15}
        step={10000000000}
      />

      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        Permeabilidad y permitividad de los medios
      </h2>

      <FormInput
        label="Permeabilidad magnética (𝜇1) [H/m]"
        name="mu1"
        value={mediumVars.mu1}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      <FormInput
        label="Permitividad eléctrica (𝜖1) [F/m]"
        name="epsilon1"
        value={mediumVars.epsilon1}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      <FormInput
        label="Permeabilidad magnética (𝜇2) [H/m]"
        name="mu2"
        value={mediumVars.mu2}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      <FormInput
        label="Permitividad eléctrica (𝜖2) [F/m]"
        name="epsilon2"
        value={mediumVars.epsilon2}
        onChange={handleMediumVarsChange}
        disabled={false}
        min={0}
      />

      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        Variables calculadas
      </h2>
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

      {/* Controles de visualización */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={showElectric}
            onChange={(e) => setShowElectric(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Campo E
        </label>
        <label>
          <input
            type="checkbox"
            checked={showMagnetic}
            onChange={(e) => setShowMagnetic(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Campo B
        </label>
      </div>

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
