export const formatShortNumber = (number) => {
  let result = null;

  if (number >= 1_000_000_000 || number <= -1_000_000_000) {
    const shortNumber = (number / 1_000_000_000).toFixed(0);
    result = `${shortNumber}B`;
  } else if (number >= 1_000_000 || number <= -1_000_000) {
    const shortNumber = (number / 1_000_000).toFixed(0);
    result = `${shortNumber}M`;
  } else if (number >= 1_000 || number <= -1_000) {
    const shortNumber = (number / 1_000).toFixed(0);
    result = `${shortNumber}K`;
  } else {
    result = `${number.toLocaleString()}`;
  }

  return result;
};

export const formatNumber = (number) => number.toLocaleString();
