import React from "react";

export const CalculatedValues = ({ frequency, wavelength }) => {
  const velocidadFase = frequency * wavelength;
  const numeroOnda = (2 * Math.PI) / wavelength;
  const frecuenciaAngular = 2 * Math.PI * frequency;
  const periodo = 1 / frequency;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="font-semibold mb-2">Valores Calculados:</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>Velocidad de fase: {velocidadFase.toFixed(2)} m/s</div>
        <div>Número de onda (k): {numeroOnda.toFixed(4)} rad/m</div>
        <div>Frecuencia angular (ω): {frecuenciaAngular.toFixed(4)} rad/s</div>
        <div>Período: {periodo.toFixed(4)} s</div>
      </div>
    </div>
  );
};
