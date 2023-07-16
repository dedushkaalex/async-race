type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export function getRandomColor(): Color {
  // Генерируем случайные значения для красного, зеленого и синего цветов
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Генерируем случайное значение для прозрачности (для RGBA)
  const alpha = Math.random().toFixed(2);

  // Генерируем случайное значение для HEX
  const hex = Math.floor(Math.random() * 16777215).toString(16);

  // Формируем цвет в формате RGB
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;

  // Формируем цвет в формате RGBA
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  // Формируем цвет в формате HEX
  const hexColor = `#${hex}`;

  // Возвращаем случайно выбранный формат цвета
  const formats = [rgbColor, rgbaColor, hexColor];
  const randomIndex = Math.floor(Math.random() * formats.length);

  return formats[randomIndex] as Color;
}
