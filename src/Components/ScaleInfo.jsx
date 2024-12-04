import React from "react";

export const ScaleInfo = () => {
  const B0 = E0 / 3e8; // Calculamos B0 real

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
      <h3 className="font-semibold mb-2">Información de Escalas:</h3>
      {showScaledB ? (
        <div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">⚠️ Nota sobre la escala real:</span>
          </p>
          <p className="text-gray-600">
            El campo B parece "desaparecer" porque estás viendo la escala física
            real. Para E₀ = {E0} V/m, B₀ = {B0.toExponential(2)} T, una
            diferencia de {(E0 / B0).toExponential(2)} veces. Esta diferencia de
            magnitud hace que B sea casi imperceptible en esta escala.
          </p>
        </div>
      ) : (
        <p className="text-gray-600">
          Actualmente mostrando una visualización amplificada del campo B para
          propósitos didácticos. La relación real B₀ = E₀/c es mucho menor.
        </p>
      )}
      <p className="mt-2 text-gray-500 italic">
        Alterna entre escalas usando el checkbox "Mostrar B con escala física
        real"
      </p>
    </div>
  );
};
