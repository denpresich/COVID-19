export const getDotNumber = (key) => {
  const [, number] = key.split('-');

  return number;
};

export const shouldShowDot = (pointNumber, pointsCount, gap) => {
  const showEach =
    pointsCount < 30 ? 1 : Math.floor(pointsCount / (pointsCount / gap));

  return !(pointNumber % showEach);
};
