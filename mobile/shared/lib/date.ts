export const dateFormat = (date: string) => {
  const dateObject = new Date(date);

  // Получение дня, месяца, часов и минут
  const day = dateObject.getDate(); // День месяца (1-31)
  const month = dateObject.getMonth() + 1; // Месяц (0-11, поэтому прибавляем 1 для корректного отображения)
  const hours = dateObject.getHours(); // Часы (0-23)
  const minutes = dateObject.getMinutes(); // Минуты (0-59)

  // Форматирование результата
  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};