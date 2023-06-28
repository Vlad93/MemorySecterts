// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива,
  // который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

export function createNumbersArray(count) {
  const arrPairNumbers = [];
  for (let i = 0; i < (count ** 2) / 2; i++) {
    arrPairNumbers.push((i + 1), (i + 1));
  }
  return arrPairNumbers;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе
// исходный массив и возвращает перемешанный массив. arr - массив чисел

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    // поменять элементы местами
    // для этого используем синтаксис "деструктурирующее присваивание"
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
