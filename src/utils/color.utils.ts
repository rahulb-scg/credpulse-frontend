export function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

export function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '';
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value;
}

// Parse HSL values from the first theme color to use as base for generating consistent colors
function getBaseColorProperties(): { s: number; l: number } {
  const value = getCssVar('--chart-1');
  if (!value) return { s: 70, l: 50 }; // Fallback values
  const [_, s, l] = value.split(' ').map(Number);
  return { s, l };
}

export function getChartColor(index: number): string {
  const value = getCssVar(`--chart-${index + 1}`);
  if (!value) return '';
  const [h, s, l] = value.split(' ').map(Number);
  return hslToRgb(h, s, l);
}

// Generate a color with consistent saturation and lightness but different hue
function generateConsistentColor(index: number): string {
  const { s, l } = getBaseColorProperties();
  // Generate hue values that are visually distinct
  // Using golden ratio to spread hues evenly
  const goldenRatio = 0.618033988749895;
  const hue = Math.floor((index * goldenRatio * 360) % 360);
  return hslToRgb(hue, s, l);
}

export function getChartColors(count: number): string[] {
  // First use theme colors
  const themeColors = Array.from({ length: Math.min(count, 5) }, (_, i) => {
    const color = getChartColor(i);
    return color || generateConsistentColor(i);
  });

  // If we need more colors, generate them with consistent properties
  if (count > 5) {
    const additionalColors = Array.from({ length: count - 5 }, (_, i) => 
      generateConsistentColor(i + 5)
    );
    return [...themeColors, ...additionalColors];
  }

  return themeColors;
} 