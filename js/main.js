/**
 * Получение случайного числа из заданного диапазона
 * @param {number} min минимальное значение диапазона от нуля и выше
 * @param {number} max максимальное значение диапазона
 * @param {number} [decimal=0] количество знаков после запятой
 * @returns {number} случайное число из заданного диапазона
 */
function getRandomNumber(min, max, decimal) {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен состоять из положительных цифр, включая ноль');
  }
  if (min > max) {
    const minBefore = min;
    min = max;
    max = minBefore;
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
}

getRandomNumber(2.3,6.8,2);
