import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { EmWave } from "./EmWave";
import { Controls } from "./Controls";
import * as calculations from "../calculations";

export const MainSimulation = () => {
  // Estados básicos
  const [time, setTime] = useState(0);
  const [showMagnetic, setShowMagnetic] = useState(true);
  const [showElectric, setShowElectric] = useState(true);
  const [showScaledB, setShowScaledB] = useState(false);
  const [boundaryCondition, setBoundaryCondition] = useState("both-open");

  //ONDA INCIDENTE
  const [amplitudeI, setAmplitudeI] = useState(39);
  const [frequencyI, setFrequencyI] = useState(4e14);
  const [wavelengthI, setWavelengthI] = useState(200); //lamda

  //ONDA REFLEJADA
  const [amplitudeR, setAmplitudeR] = useState(39);
  const [wavelengthR, setWavelengthR] = useState(200);
  //ONDA TRASMITIDA
  const [amplitudeT, setAmplitudeT] = useState(90);
  const [wavelengthT, setWavelengthT] = useState(200);

  //MEDIOS
  const [mediumVars, setMediumVars] = useState({
    mu1: calculations.mu0, //se lee
    epsilon1: calculations.epsilon0, //se lee
    mu2: calculations.mu0, //se lee
    epsilon2: calculations.epsilon0, // se lee
  });
  const [velocities, setVelocities] = useState({
    v1: calculations.c,
    v2: calculations.c,
  });
  //COEFICIENTES
  const [coefR, setCoefR] = useState();
  const [coefT, setCoefT] = useState();

  const setAllVars = () => {
    // CALCULO LAS VELOCIDADES DE ONDA EN LOS MEDIOS 1 Y 2
    const velocities = calculations.calculateVelocities(
      mediumVars.mu1,
      mediumVars.mu2,
      mediumVars.epsilon1,
      mediumVars.epsilon2
    );
    setVelocities(velocities);

    const betha = calculations.calculateBetha(
      mediumVars.mu1,
      mediumVars.mu2,
      velocities.v1,
      velocities.v2
    );

    // Para la Onda incidente
    const wavelengthI = calculations.calculatWavelength(
      velocities.v1,
      frequencyI
    );

    //calculos para onda reflejada
    const coefR = calculations.calculateCoefR(betha);
    const amplitudeR = calculations.calculateAmplitude(coefR, amplitudeI);
    const wavelengthR = calculations.calculatWavelength(
      velocities.v1,
      frequencyI
    );

    //ns coefR=calculations.o; //onda total

    // Para la Onda transmitida
    const coefT = calculations.calculateCoefT(betha);
    const amplitudeT = calculations.calculateAmplitude(coefT, amplitudeI);
    const wavelengthT = calculations.calculatWavelength(
      velocities.v2,
      frequencyI
    );

    // Actualiza los estados, asegurando que usas los valores más recientes
    setCoefT(coefT);
    setAmplitudeT(amplitudeT);
    setWavelengthI(wavelengthI);
    setWavelengthT(wavelengthT);
    setCoefR(coefR);
    setAmplitudeR(amplitudeR);
    setWavelengthR(wavelengthR);
  };

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now(); // Registro del tiempo inicial

    const update = () => {
      const currentTime = performance.now(); // Tiempo actual en milisegundos
      const deltaTime = (currentTime - lastTime) / 1000; // Diferencia en segundos
      lastTime = currentTime;

      // Actualiza el tiempo y recalcula las variables en cada frame
      setTime((t) => {
        const newTime = t + deltaTime;
        setAllVars(); // Llamada a la función en cada frame
        return newTime;
      });

      animationFrameId = requestAnimationFrame(update); // Continuar la animación
    };

    animationFrameId = requestAnimationFrame(update); // Iniciar la animación

    return () => cancelAnimationFrame(animationFrameId); // Limpieza al desmontar el componente
  }, [
    mediumVars,
    frequencyI,
    amplitudeI,
    velocities,
    amplitudeR,
    wavelengthI,
    coefR,
    coefT,
  ]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            textAlign: "center",
            color: "white",
          }}
        >
          Simulación de Ondas Electromagnéticas Reflexión y trasmisión
        </h1>

        <div style={{ display: "flex", width: "100%", gap: "0px" }}>
          {/* DIVISION DE MEDIOS */}
          <div
            className="mediumsContainer"
            style={{ display: "flex", width: "100%", gap: "0px" }}
          >
            {/* Panel de visualización MEDIO 1 */}
            <EmWave
              width={400}
              height={400}
              bgcolor={"transparent"}
              //define medio 2
              isSecondMedium={false}
              //var tiempo global
              time={time}
              //onda incidente
              amplitudeI={amplitudeI}
              frequencyI={frequencyI}
              wavelengthI={wavelengthI}
              setWavelengthI={setWavelengthI}
              //onda reflejada
              amplitudeR={amplitudeR}
              wavelengthR={wavelengthR}
              velocities={velocities}
              //utilidades
              showElectric={showElectric}
              showMagnetic={showMagnetic}
              boundaryCondition={boundaryCondition}
            />
            {/* Panel de visualización MEDIO 2 */}
            <EmWave
              //dimensiones y color del panel
              width={400}
              height={400}
              bgcolor={"#ffffff15"}
              //define medio 2
              isSecondMedium={true}
              //var tiempo global
              time={time}
              //onda incidente
              amplitudeI={amplitudeI}
              frequencyI={frequencyI}
              wavelengthI={wavelengthI}
              //onda trasmitida
              amplitudeT={amplitudeT}
              wavelengthT={wavelengthT}
              velocities={velocities}
              //utilidades
              showElectric={showElectric}
              showMagnetic={showMagnetic}
              boundaryCondition={boundaryCondition}
            />
          </div>

          {/* Panel de control */}
          <Controls
            amplitude={amplitudeI}
            setAmplitude={setAmplitudeI}
            frequency={frequencyI}
            setFrequency={setFrequencyI}
            //valores a mostrar
            amplitudeR={amplitudeR}
            wavelengthR={wavelengthR}
            amplitudeT={amplitudeT}
            wavelengthT={wavelengthT}
            velocities={velocities}
            coefR={coefR}
            coefT={coefT}
            //utilidades
            showElectric={showElectric}
            setShowElectric={setShowElectric}
            showMagnetic={showMagnetic}
            setShowMagnetic={setShowMagnetic}
            mediumVars={mediumVars}
            setMediumVars={setMediumVars}
          />
        </div>
      </div>
    </>
  );
};
