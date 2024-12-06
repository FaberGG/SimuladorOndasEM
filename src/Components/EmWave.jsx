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
}) => {
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
        {/* Eje z */}
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="#CCCCCC"
          strokeDasharray="4"
        />

        {/* Flecha para el eje ver */}
        <polygon
          points={`${isSecondMedium ? -5 : width + 5},10 ${
            isSecondMedium ? 5 : width - 5
          },10 ${isSecondMedium ? 0 : width},0`}
          fill="#CCCCCC"
        />

        {isSecondMedium ? (
          <>
            {/* Flecha para el eje z */}
            <polygon
              points={`${width - 10},${height / 2 - 5} ${width - 10},${
                height / 2 + 5
              } ${width},${height / 2}`}
              fill="#CCCCCC"
            />
            {/* Etiqueta para el eje z */}
            <text
              x={width - 15}
              y={height / 2 - 10}
              fontSize="16"
              fill="#CCCCCC"
              textAnchor="middle"
            >
              Z
            </text>

            {/* Eje vertical */}
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              stroke="#CCCCCC"
              strokeDasharray="4"
            />

            {/* Etiqueta para el eje vertical*/}
            <text
              x={isSecondMedium ? 15 : width / 2 + 10}
              y={15}
              fontSize="16"
              fill="#CCCCCC"
              textAnchor="middle"
            >
              {showElectric ? "X" : "Y"}
            </text>

            {showElectric && (
              //SE RENDERIZA UNA VEZ
              <polyline
                points={calculations.calculateElectricField(
                  height,
                  width,
                  time,
                  frequencyI,
                  wavelengthT,
                  amplitudeT,
                  isSecondMedium,
                  false //trasmitido
                )}
                fill="none"
                stroke="#1068ff"
                strokeWidth="2"
              />
            )}
            {showMagnetic && (
              <polyline
                points={calculations.calculateMagneticField(
                  height,
                  width,
                  time,
                  frequencyI,
                  wavelengthT,
                  amplitudeT,
                  velocities.v2,
                  isSecondMedium,
                  false
                )}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
            )}
          </>
        ) : (
          //RENDERIZAMOS LAS TRES ONDAS DEL PRIMER MEDIO
          <>
            {/* CAMPO ELECTRICO */}
            {showElectric && (
              <>
                {/* ONDA INCIDENTE */}
                <polyline
                  points={calculations.calculateElectricField(
                    height,
                    width,
                    time,
                    frequencyI,
                    wavelengthI,
                    amplitudeI,
                    isSecondMedium,
                    false //incidente
                  )}
                  fill="none"
                  stroke="#1068ff"
                  strokeWidth="2"
                />
                {/* ONDA REFLEJADA */}
                <polyline
                  points={calculations.calculateElectricField(
                    height,
                    width,
                    time,
                    frequencyI,
                    wavelengthR,
                    amplitudeR,
                    isSecondMedium,
                    true //REFLEJADA
                  )}
                  fill="none"
                  stroke="yellow"
                  strokeWidth="2"
                  strokeDasharray="6" //la linea se ve punteada
                />

                {/* ONDA RESULTANTE */}

                <polyline
                  points={calculations.calculateTotalElectric(
                    height,
                    width,
                    time,
                    frequencyI,
                    wavelengthI,
                    amplitudeI,
                    amplitudeR
                  )}
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="6" //la linea se ve punteada
                />
              </>
            )}
            {/* CAMPO MAGNETICO */}
            {showMagnetic && (
              <>
                <polyline
                  points={calculations.calculateMagneticField(
                    height,
                    width,
                    time,
                    frequencyI,
                    wavelengthI,
                    amplitudeI,
                    velocities.v1,
                    isSecondMedium,
                    false //Incidente
                  )}
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                />
                <polyline
                  points={calculations.calculateMagneticField(
                    height,
                    width,
                    time,
                    frequencyI,
                    wavelengthR,
                    amplitudeR,
                    velocities.v1,
                    isSecondMedium,
                    true //REFLEJADA
                  )}
                  fill="none"
                  stroke="yellow"
                  strokeWidth="2"
                  strokeDasharray="6" //la linea se ve punteada
                />
                {/* ONDA RESULTANTE */}

                <polyline
                  points={calculations.calculateTotalElectric(
                    height,
                    width,
                    time,
                    frequencyI,
                    wavelengthI,
                    amplitudeI,
                    amplitudeR,
                    velocities.v1
                  )}
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="6" //la linea se ve punteada
                />
              </>
            )}
          </>
        )}
      </svg>
    </div>
  );
};
