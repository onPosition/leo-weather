import { useLocation } from "@/app/storage/LocationContext";

// Типы для возвращаемых значений
type WeekdayResult = {
  day: string;
  date: string;
};

type StringResult = string;

// Перегрузка функции:
// 1. Когда format === 'weekday', возвращается объект WeekdayResult
function formatTime(dateString: string, format: "weekday"): WeekdayResult;
// 2. Для всех остальных форматов возвращается строка
function formatTime(dateString: string, format: string): StringResult;

// Реализация функции
function formatTime(
  dateString: string,
  format: string
): WeekdayResult | StringResult {
  const { currentLocation } = useLocation();
  const dateObject = new Date(dateString);

  if (!currentLocation) {
    return "Time parse error";
  }

  switch (format) {
    case "hourly":
      return new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: currentLocation.timezone.name,
      }).format(dateObject);

    case "daily":
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: currentLocation.timezone.name,
      }).format(dateObject);

    case "weekday":
      const today = new Date();

      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",

        month: "long",
      }).format(dateObject);

      const dayName = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
      }).format(dateObject);

      if (dateObject.toDateString() === today.toDateString()) {
        return { day: "Today", date: formattedDate };
      }
      return { day: dayName, date: formattedDate };

    default:
      return new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: currentLocation.timezone.name,
      }).format(dateObject);
  }
}

export default formatTime;
