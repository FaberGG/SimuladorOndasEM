import React, { useState, useEffect } from "react";
import { EmWave } from "./EmWave";
import { Controls } from "./Controls";
import * as calculations from "../calculations";
import "./styles/MainSimulation.css";

export const MainSimulation = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // Estado para controlar si el tiempo está corriendo
  const [showMagnetic, setShowMagnetic] = useState(true);
  const [showElectric, setShowElectric] = useState(true);
  const [showScaledB, setShowScaledB] = useState(false);
  const [boundaryCondition, setBoundaryCondition] = useState("both-open");

  const [amplitudeI, setAmplitudeI] = useState(39);
  const [frequencyI, setFrequencyI] = useState(4000);
  const [wavelengthI, setWavelengthI] = useState(200);

  const [amplitudeR, setAmplitudeR] = useState(39);
  const [wavelengthR, setWavelengthR] = useState(200);

  const [amplitudeT, setAmplitudeT] = useState(90);
  const [wavelengthT, setWavelengthT] = useState(200);

  const [mediumVars, setMediumVars] = useState({
    mu1: calculations.mu0,
    mu_r1: 1,
    epsilon1: calculations.epsilon0,
    epsilon_r1: 1,
    mu2: calculations.mu0,
    mu_r2: 1,
    epsilon2: calculations.epsilon0,
    epsilon_r2: 1,
  });

  const [velocities, setVelocities] = useState({
    v1: calculations.c,
    v2: calculations.c,
  });

  const [coefR, setCoefR] = useState();
  const [coefT, setCoefT] = useState();

  const setAllVars = () => {
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

    const wavelengthI = calculations.calculatWavelength(
      velocities.v1,
      frequencyI
    );

    const coefR = calculations.calculateCoefR(betha);
    const amplitudeR = calculations.calculateAmplitude(coefR, amplitudeI);
    const wavelengthR = calculations.calculatWavelength(
      velocities.v1,
      frequencyI
    );

    const coefT = calculations.calculateCoefT(betha);
    const amplitudeT = calculations.calculateAmplitude(coefT, amplitudeI);
    const wavelengthT = calculations.calculatWavelength(
      velocities.v2,
      frequencyI
    );

    setCoefT(coefT);
    setAmplitudeT(amplitudeT);
    setWavelengthI(wavelengthI);
    setWavelengthT(wavelengthT);
    setCoefR(coefR);
    setAmplitudeR(amplitudeR);
    setWavelengthR(wavelengthR);
  };

  useEffect(() => {
    if (!isRunning) return; // Detener el tiempo si `isRunning` es false

    let animationFrameId;
    let lastTime = performance.now();

    const update = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime((t) => t + deltaTime);
      setAllVars();

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, mediumVars, frequencyI, amplitudeI]);

  const toggleTime = () => {
    if (isRunning) {
      setTime(0); // Reinicia el tiempo si está corriendo
    }
    setIsRunning(!isRunning); // Alterna el estado
  };

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
          Simulación de Ondas Electromagnéticas Reflexión y Transmisión
        </h1>

        <button
          onClick={toggleTime}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isRunning ? "Detener y Reiniciar Tiempo" : "Reiniciar Tiempo"}
        </button>

        <div style={{ display: "flex", width: "100%", gap: "0px" }}>
          {/* DIVISION DE MEDIOS */}

          <div className="panels-container">
            {/* PANELES PARA CAMPO ELECTRICO */}
            <div style={{ fontSize: "14px", color: "white" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#1068ff",
                      marginRight: "5px",
                    }}
                  ></span>
                  Campo eléctrico incidente (I)
                </li>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "yellow",
                      marginRight: "5px",
                    }}
                  ></span>
                  Campo eléctrico reflejado (R)
                </li>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "white",
                      marginRight: "5px",
                    }}
                  ></span>
                  Campo eléctrico resultante
                </li>
              </ul>
            </div>
            <h2
              style={{ fontSize: "18px", marginBottom: "20px", color: "white" }}
            >
              CAMPO ELÉCTRICO
            </h2>
            <div className="mediumsContainer">
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
                showMagnetic={false}
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
                showMagnetic={false}
                boundaryCondition={boundaryCondition}
              />
            </div>

            <div style={{ fontSize: "14px", color: "white" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "red",
                      marginRight: "5px",
                    }}
                  ></span>
                  Campo magnético incidente (I)
                </li>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "yellow",
                      marginRight: "5px",
                    }}
                  ></span>
                  Campo magnético reflejado (R)
                </li>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "white",
                      marginRight: "5px",
                    }}
                  ></span>
                  Campo magnético resultante
                </li>
              </ul>
            </div>
            <h2
              style={{ fontSize: "18px", marginBottom: "20px", color: "white" }}
            >
              CAMPO MAGNÉTICO
            </h2>

            {/* PANELES PARA CAMPO MAGNETICO */}
            <div className="mediumsContainer">
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
                showElectric={false}
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
                showElectric={false}
                showMagnetic={showMagnetic}
                boundaryCondition={boundaryCondition}
              />
            </div>
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
