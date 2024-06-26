export const roundToTwoDecimals = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
