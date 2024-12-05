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

        {isSecondMedium ? (
          <>
            
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
                  boundaryCondition,
                  isSecondMedium,
                  "T" //trasmitido
                )}
                fill="none"
                stroke="blue"
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
                  boundaryCondition,
                  isSecondMedium,
                  "T"
                )}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
            )}
          </>
        ) : ( //SE RENDERIZA DOS VECES 
          <>
          
            {showElectric && (
              <polyline
                points={calculations.calculateElectricField(
                  height,
                  width,
                  time,
                  frequencyI,
                  wavelengthI,
                  amplitudeI,
                  boundaryCondition,
                  isSecondMedium,
                  "I" //incidente
                )}
                fill="none"
                stroke="blue"
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
                  wavelengthI,
                  amplitudeI,
                  velocities.v1,
                  boundaryCondition,
                  isSecondMedium,
                  "I" //Incidente
                )}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
            )}
            {showElectric && (
              //REFLEJADA ELECTRICA Y MAGNETICA
              <polyline
                points={calculations.calculateElectricField(
                  height,
                  width,
                  time,
                  frequencyI,
                  wavelengthR,
                  amplitudeR,
                  velocities.v1,
                  boundaryCondition,
                  isSecondMedium,
                  "R" //REFLEJADA 
                )}
                fill="none"
                stroke="yellow"
                strokeWidth="2"
                strokeDasharray="6" //la linea se ve punteada
              />
            )}
            {showMagnetic && (
              <polyline
                points={calculations.calculateMagneticField(
                  height,
                  width,
                  time,
                  frequencyI,
                  wavelengthR,
                  amplitudeR,
                  velocities.v1,
                  boundaryCondition,
                  isSecondMedium,
                  "R" //REFLEJADA 
                )}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="6" //la linea se ve punteada
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
};
