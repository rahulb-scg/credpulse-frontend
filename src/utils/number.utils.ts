export const roundToTwoDecimals = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
