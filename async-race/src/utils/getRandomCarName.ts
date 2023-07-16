const carBrands = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Nissan',
  'Hyundai',
  'Kia',
  'Volvo',
  'Mazda',
  'Subaru',
  'Lexus',
  'Jeep',
  'Tesla',
  'Ferrari',
  'Porsche',
  'Lamborghini'
];

const names = [
  'John',
  'Emma',
  'Michael',
  'Olivia',
  'William',
  'Sophia',
  'James',
  'Ava',
  'Benjamin',
  'Isabella',
  'Jacob',
  'Mia',
  'Ethan',
  'Charlotte',
  'Alexander',
  'Amelia',
  'Daniel',
  'Harper',
  'Matthew',
  'Evelyn'
];
export function getRandomName(): string {
  const randomCarBrandIndex = Math.floor(Math.random() * carBrands.length);
  const randomNameIndex = Math.floor(Math.random() * names.length);
  const uniqueWord = `${carBrands[randomCarBrandIndex]} ${names[randomNameIndex]}`;

  return uniqueWord;
}
