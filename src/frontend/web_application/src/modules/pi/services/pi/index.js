export const PI_PROPERTIES = ['comportment', 'technic', 'context'];
export const getPiClass = pi => (pi <= 50 ? 'weak-pi' : 'strong-pi');
export const getAngles = () => {
  const piLength = PI_PROPERTIES.length;
  if (piLength === 0) {
    return 0;
  }

  return 360 / piLength;
};

export const getAveragePI = (pi) => {
  const piProps = PI_PROPERTIES;

  return Math.round((piProps.reduce((acc, name) => acc + pi[name], 0)) / piProps.length);
};
