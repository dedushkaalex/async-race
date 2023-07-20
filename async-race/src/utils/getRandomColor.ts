type RGB = `rgb(${number}, ${number}, ${number})`;

export function getRandomColor(): RGB {
  // Генерируем случайные значения для красного, зеленого и синего цветов
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Формируем цвет в формате RGB
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;

  return rgbColor as RGB;
}
