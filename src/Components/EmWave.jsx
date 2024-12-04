import React from "react";
import * as calculations from "../calculations";

export const EmWave = ({
  width,
  height,
  bgcolor,
  isSecondMedium,
  time,
  //onda Incidente
  amplitudeI,
  frequencyI,
  wavelengthI,
  //onda Reflejada
  amplitudeR,
  wavelengthR,
  //PASAR PARAMETROS (props) para esta onda
  //onda Trasmitida
  amplitudeT,
  wavelengthT,
  //medio
  velocities,
  showElectric,
  showMagnetic,
  boundaryCondition,
}) => {
  const generateElectricField = () => {
    //si esta en el segundo medio
    if (isSecondMedium) {
      return calculations.calculateElectricField(
        height,
        width,
        time,
        frequencyI,
        wavelengthT,
        amplitudeT,
        boundaryCondition,
        isSecondMedium,
        "T" //trasmitido
      );
    } else {
      return calculations.calculateElectricField(
        height,
        width,
        time,
        frequencyI,
        wavelengthI,
        amplitudeI,
        boundaryCondition,
        isSecondMedium,
        "I" //incidente
      );
    }
  };
  const generateMagneticField = () => {
    if (isSecondMedium) {
      return calculations.calculateMagneticField(
        height,
        width,
        time,
        frequencyI,
        wavelengthT,
        amplitudeT,
        velocities.v2,
        boundaryCondition,
        isSecondMedium,
        "T"
      );
    }
    return calculations.calculateMagneticField(
      height,
      width,
      time,
      frequencyI,
      wavelengthI,
      amplitudeI,
      velocities.v1,
      boundaryCondition,
      isSecondMedium,
      "I"
    );
  };
  return (
    <div style={{ flex: "0" }}>
      <svg
        width={width}
        height={height}
        style={{
          backgroundColor: bgcolor,
          border: "1px solid #ccc",
        }}
      >
        {/*Eje x */}
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="#CCCCCC"
          strokeDasharray="4" //la linea se ve punteada
        />

        {/* Campo Eléctrico */}
        {showElectric && (
          <polyline
            points={generateElectricField()}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
        )}

        {/* Campo Magnético */}
        {showMagnetic && (
          <polyline
            points={generateMagneticField()}
            fill="none"
            stroke="red"
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
};
