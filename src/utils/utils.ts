export function adjustColor(color: string, amount: number): string {
  // Remove leading #
  color = color.replace('#', '');

  // Convert color to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate the adjustment amount
  const adjustment = Math.round(2.55 * amount);

  // Calculate new RGB values
  const newR = clamp(r + adjustment);
  const newG = clamp(g + adjustment);
  const newB = clamp(b + adjustment);

  // Convert new RGB values to hexadecimal
  const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

  return newColor;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}

export function generateUUID (): string {
  return crypto.randomUUID();
}