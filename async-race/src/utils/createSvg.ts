/* eslint-disable max-lines-per-function */
export function createSVG(color: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('carSvg');
  svg.setAttribute('version', '1.1');
  svg.setAttribute('width', '200');
  svg.setAttribute('height', '150');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('viewBox', '0 150 1024 1024');
  svg.setAttribute('xml:space', 'preserve');
  svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

  // Создание группы элементов
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('id', 'Layer_2');

  // Создание первого элемента path
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('class', 'st0');
  path1.setAttribute(
    'd',
    'M102.93,534.68c0,0-43.3-4.68-49.15-11.7c-5.85-7.02-15.21-33.94-16.38-47.98c-1.17-14.04-1.17-21.07-1.17-21.07l5.85-3.51l37.45,12.87l3.69,57.92L102.93,534.68z'
  );

  // Создание второго элемента path
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('class', 'st1');
  path2.setAttribute(
    'd',
    'M278.51,311.64c0,0,44.44-14.36,121.68-20.21s129.9-2.34,170.86,10.53c40.96,12.87,198.1,75.8,198.1,75.8L703.56,380l-78.85-13.42L426.8,350.64C426.8,350.64,345.45,330.29,278.51,311.64z'
  );

  // Создание третьего элемента path
  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute(
    'd',
    'M264.54,540.93l-107.38,1.36l-68.27-9.67l-12.87-15.49c0,0,14.2-111.18,12.87-112.16s68.27-14.04,68.27-14.04l83.09,11.94l42.91,89.68L264.54,540.93z'
  );

  const polygon1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'polygon'
  );
  polygon1.setAttribute(
    'points',
    '922.51,535.85 846.9,545.3 744.88,539.95 732.39,473.52 760.19,431.43 805.36,403.52 869.56,403 915.95,446.65 925.13,496'
  );

  const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('fill', color);
  path4.setAttribute(
    'd',
    `M259.8,540.93c0,0,48.6-4.7,70.55-6.27c21.95-1.57,422.49,5.49,422.49,5.49s-6.27-41.49,0-66.99
    c6.27-25.5,45.46-72.53,90.93-66.26s70.55,32.92,76.82,75.25c6.27,42.33-4.7,54.87-4.7,54.87s9.41,0,18.81-3.14
    c9.41-3.14,18.81-6.27,18.81-6.27l20.38-4.7l6.27-61.14c0,0-67.41-59.57-111.31-70.55c-43.9-10.97-65.84-7.84-65.84-7.84
    l-34.49-4.7c0,0-50.17,4.7-68.98-4.7c-18.81-9.41-68.98-39.19-103.47-53.3c-34.49-14.11-67.41-21.95-112.87-25.08
    s-97.2,3.14-175.58,12.54c-78.38,9.41-213.21,53.3-213.21,53.3s-42.33,0-40.76,4.7c1.57,4.7,7.84,6.27,4.7,12.54
    s-10.97,21.95-10.97,21.95l-1.57,39.19l-3.14,9.41c0,0,1.57,18.81,3.14,25.08c1.57,6.27,4.7,17.24,4.7,17.24l4.7-28.22l17.24,1.57
    c0,0-1.57,23.52,0,36.06c1.57,12.54,6.27,20.38,6.27,20.38H89.7c0,0-14.11-34.49-3.14-62.71s32.92-54.87,68.98-58
    s79.95,12.54,95.63,54.87S259.8,540.93,259.8,540.93z`
  );

  const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path5.setAttribute('class', 'st3');
  path5.setAttribute(
    'd',
    `M686.33,383.13c0,0-25.06-20.12-61.99-39.61c-30.32-16.01-68.66-31.6-107.7-35.29
    c-86.6-8.19-117.03-2.34-117.03-2.34s-100.65,16.38-122.88,21.07c-22.24,4.68-29.26,7.02-29.26,7.02s14.04,12.87,21.07,15.21
    c7.02,2.34,168.52,21.07,234.06,24.58c28.79,1.54,67.77,5.86,102.4,7.61C649.19,383.61,686.33,383.13,686.33,383.13z`
  );

  const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path6.setAttribute('class', 'st4');
  path6.setAttribute(
    'd',
    'M709.15,533.51c0,0-346.41-19.9-378.01-14.04s-56.17,16.38-56.17,16.38'
  );

  const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('fill', color);
  path7.setAttribute(
    'd',
    'M979.49,463.29l-39.79-5.85l10.18,33.59c0.96,3.16,3.36,5.69,6.47,6.8l11.43,4.08l8.77,2.09C976.56,504,979.42,463.59,979.49,463.29z'
  );

  const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path8.setAttribute('class', 'st0');
  path8.setAttribute(
    'd',
    'M933.5,425.27c-0.83-0.6-16.04-4.11-16.04-4.11l17.55,24.58l35.21,7.6'
  );

  const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path9.setAttribute('class', 'st6');
  path9.setAttribute(
    'd',
    'M938.25,430.62c-0.53-0.38-10.22-2.62-10.22-2.62l11.19,15.66l22.44,4.85'
  );

  const path10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path10.setAttribute('class', 'st7');
  path10.setAttribute(
    'd',
    'M93.57,362.65c0,0,56.17-2.34,126.39,2.34c70.22,4.68,158.8,21.3,158.8,21.3S296.56,358,219.56,352S93.57,362.65,93.57,362.65z'
  );

  const path11 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path11.setAttribute('class', 'st8');
  path11.setAttribute(
    'd',
    `M740.74,517.13c-1.17-38.62,3.51-56.17,18.72-79.58c15.21-23.41,51.49-40.96,77.24-39.79
    c25.75,1.17,58.52,12.87,78.41,40.96c19.9,28.09,17.55,84.26,17.55,84.26l25.14,3.63l-17.02,5.2l-15.24,4.04l-7.91,0.99l-1.77,0.18
    c0,0,8.21-13.37,6.45-36.69c-1.77-23.32-9.05-44.78-9.05-44.78S904.56,437,895.56,429s-32-20-48-22s-31.89,1.48-43.45,7.74
    C792.56,421,776.56,433,768.56,443s-13.92,23.3-15.96,31.15c-2.04,7.85-3.04,25.85-3.04,25.85l1.14,29.42l-9.14-0.42L740.74,517.13
    z`
  );

  const path12 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path12.setAttribute('class', 'st8');
  path12.setAttribute(
    'd',
    `M76.01,456.27c0,0,18.72-50.32,60.12-60.86c41.4-10.53,75.63-2.34,103.72,23.41
    c17.33,15.89,25.3,43.8,28.87,62.86c2.51,13.41,2.12,27.24-1.47,40.4c-2.22,8.15-4.7,12.42-5.7-3.08c-2-31-6.2-50.36-6.2-50.36
    s-7.81-30.22-26.81-45.93c-18.99-15.71-39.48-19.69-46.74-21.2c-7.26-1.51-32.5-4.28-55.38,7.11
    c-22.88,11.38-34.07,37.15-34.48,36.77c-0.4-0.38-8.4,23.62-8.4,23.62s-3,15-1,26s6,26,6,26l-10,1c0,0-7-17-7-25
    s0.11-25.15,0.55-25.57s0.35-6.53,0.35-6.53L76.01,456.27z`
  );

  const path13 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path13.setAttribute('class', 'st7');
  path13.setAttribute(
    'd',
    'M683.56,376c0,0-31.73-20.96-53.87-32.48C607.56,332,591.56,325,591.56,325s52.53,19.77,95.77,46.38C730.56,398,683.56,376,683.56,376z'
  );

  const path14 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path14.setAttribute('class', 'st0');
  path14.setAttribute(
    'd',
    'M684.13,382.54c0,0-66.27-43.08-104.89-54.89s-115.86-23.52-173.2-17.67s-133.31,28.45-129.27,33.53s31.28,11.14,31.28,11.14l107.92,11.86l157.71,12.87L674.56,384L684.13,382.54z'
  );

  const path15 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path15.setAttribute('class', 'st0');
  path15.setAttribute(
    'd',
    'M756.42,416.61c0,0-47.57,0.13-48.01,0c-0.44-0.13,1.9,2.21,1.9,2.21l29.26,2.34l3.85,6.13'
  );

  const path16 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('fill', color);
  path16.setAttribute(
    'd',
    'M49.1,400.1c0,0,15.21-5.85,23.41-10.53c8.19-4.68,16.38-9.36,16.38-9.36s-24.17-8.71-31-8.23c-0.33,0.02,0.95,5.28,0.95,5.28l-9.74,18.47V400.1z'
  );

  const path17 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('fill', color);
  path17.setAttribute(
    'd',
    'M69.58,462.11l-14.63-1.93L45.56,451l5-14v-33l38-19l44.95,7.02C133.5,392.02,88.6,400.21,69.58,462.11z'
  );

  const path18 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('fill', color);
  path18.setAttribute(
    'd',
    'M913.56,420c0,0-19-18-48-27s-69-4-69-4s45.98,1.41,68.49,8.7C887.56,405,913.56,420,913.56,420z'
  );
  // Добавление элементов внутрь группы
  group.appendChild(path1);
  group.appendChild(path2);
  group.appendChild(path3);
  group.appendChild(polygon1);
  group.appendChild(path4);
  group.appendChild(path5);
  group.appendChild(path6);
  group.appendChild(path7);
  group.appendChild(path8);
  group.appendChild(path9);
  group.appendChild(path10);
  group.appendChild(path11);
  group.appendChild(path12);
  group.appendChild(path13);
  group.appendChild(path14);
  group.appendChild(path15);
  group.appendChild(path16);
  group.appendChild(path17);
  group.appendChild(path18);

  // Добавление группы внутрь SVG
  svg.appendChild(group);

  return svg;
}
