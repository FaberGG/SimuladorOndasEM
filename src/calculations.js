// Constantes físicas (ahora como constantes, no estados)
export const c = 3e8; // velocidad de la luz en m/s
export const epsilon0 = 8.85e-12; // permitividad del vacío en F/m
export const mu0 = 1.256637061e-6; // permeabilidad del vacío en H/m

let tscale = 6e-15;
let xscale = 7.5e-7; //longitud luz visible

const calculateScales = (frecuency) => {
  if (frecuency < 3e4) {
    // Ondas de radio
    tscale = 1e-3;
    xscale = 100000;
  } else if (frecuency >= 3e4 && frecuency < 3e6) {
    // Ondas de radio
    tscale = 1e-5;
    xscale = 1000;
  } else if (frecuency >= 3e6 && frecuency < 3e9) {
    // Ondas de radio
    tscale = 1e-8;
    xscale = 100;
  } else if (frecuency >= 3e9 && frecuency < 3e12) {
    // Microondas
    tscale = 1e-11;
    xscale = 0.01; // 1 cm
  } else if (frecuency >= 3e12 && frecuency < 4e14) {
    // Infrarrojo
    tscale = 1e-12;
    xscale = 1e-4; // 100 micrómetros
  } else if (frecuency >= 4e14 && frecuency <= 1.5e15) {
    // Luz visible
    tscale = 6e-15;
    xscale = 7.5e-7; // 750 nm
  } else if (frecuency > 1.5e15 && frecuency <= 3e16) {
    // Ultravioleta
    tscale = 1e-16;
    xscale = 1e-8; // 10 nm
  } else if (frecuency > 3e16 && frecuency <= 3e19) {
    // Rayos X
    tscale = 1e-18;
    xscale = 1e-10; // 0.1 nm
  } else if (frecuency > 3e19) {
    // Rayos Gamma
    tscale = 1e-20;
    xscale = 1e-12; // 0.001 nm
  } else {
    throw new Error("Frecuencia fuera de rango");
  }
  return { tscale, xscale };
};
// Cálculos físicos
const calculateMagneticAmplitude = (electricAmplitude, velocity) => {
  return electricAmplitude;
};

const verifyLightSpeed = () => {
  const calculatedC = 1 / Math.sqrt(epsilon0 * mu0);
  return Math.abs(calculatedC - c) < 1e-6;
};

// Funciones de generación de campos
export const calculateElectricField = (
  height,
  width,
  time,
  frequency,
  wavelength,
  amplitude,
  boundaryCondition,
  isSecondMedium
) => {
  calculateScales(frequency);
  const omega = 2 * Math.PI * frequency; // Frecuencia angular
  const k = (2 * Math.PI) / wavelength; // Número de onda

  const timeStep = tscale; // Asegura un paso de tiempo razonable
  let adjustedTime = time * timeStep;

  return Array.from({ length: 100 }, (_, i) => {
    let x = (i / 100) * width;
    if (isSecondMedium) x = x + width;
    // Mapear x al rango
    const xReal = (x / width) * xscale; // Normalización al rango físico

    // Factor según las condiciones de frontera
    //const factor = boundaryCondition === "both-open" ? 1 : Math.cos(k * xReal);

    // Calcular el campo eléctrico para la onda
    const E = amplitude * Math.cos(k * xReal - omega * adjustedTime);
    return `${isSecondMedium ? x - width : x},${height / 2 + E}`;
  }).join(" ");
};

export const calculateMagneticField = (
  height,
  width,
  time,
  frequency,
  wavelength,
  amplitude,
  velocity,
  boundaryCondition,
  isSecondMedium,
  strOnda
) => {
  calculateScales(frequency);
  const B0 = calculateMagneticAmplitude(amplitude, velocity);
  const k = (2 * Math.PI) / wavelength;
  const omega = 2 * Math.PI * frequency;

  const timeStep = tscale; // Asegura un paso de tiempo razonable
  let adjustedTime = time * timeStep;

  return Array.from({ length: 100 }, (_, i) => {
    let x = (i / 100) * width;
    if (isSecondMedium) x = x + width;

    // Mapear x al rango
    const xReal = (x / width) * xscale; // Normalización al rango físico

    //const factor = boundaryCondition === "both-open" ? 1 : Math.sin(k * x);
    let B;
    if (strOnda == "R") {
    } else {
      B = B0 * Math.cos(k * xReal - omega * adjustedTime + Math.PI / 2);
    }

    return `${isSecondMedium ? x - width : x},${height / 2 + B}`;
  }).join(" ");
};

export const calculateBetha = (mu1, mu2, v1, v2) => {
  return (mu1 * v1) / (mu2 * v2);
};

export const calculateCoefT = (betha) => {
  return 2 / (1 + betha);
};

//CALCULO EL COEFICIENTE DE REFLEXIÓN//
export const calculateCoefR = (betha) => {
  return (1 - betha) / (1 + betha);
};

export const calculateAmplitude = (coef, amplitudeI) => {
  return coef * amplitudeI;
};

const auxCalculateVelocity = (mu, epsilon) => {
  return 1 / Math.sqrt(epsilon * mu);
};
export const calculateVelocities = (mu1, mu2, epsilon1, epsilon2) => {
  const v1 = auxCalculateVelocity(mu1, epsilon1);
  const v2 = auxCalculateVelocity(mu2, epsilon2);
  return { v1, v2 };
};

export const calculatWavelength = (velocity, frecuency) => {
  return velocity / frecuency;
};
