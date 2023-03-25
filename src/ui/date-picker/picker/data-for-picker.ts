export const monthes = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const getNumberOfDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const dateFormat = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getNumberOfDaysI = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const range = (end: number) => {
  const { result } = Array.from({ length: end }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + 1,
    }),
    { result: [], current: 1 }
  );

  return result;
};

export const findRangePrevMonth = (year: number, month: number, day: number): number[] => {
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const allDaysPrevMonth = range(getNumberOfDaysInMonth(new Date(year, month - 1, day)));
  const lastDayPrevMonth = getNumberOfDaysInMonth(new Date(year, month - 1, day));

  const startIndex = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

  const slicedPrevMonth = allDaysPrevMonth.slice(lastDayPrevMonth - startIndex + 1, lastDayPrevMonth);

  return slicedPrevMonth;
};

export const findRangeNextMonth = (year: number, month: number, day: number): number[] => {
  const allDaysNextMonth = range(getNumberOfDaysInMonth(new Date(year, month + 1, day)));

  const firstSevenDays = allDaysNextMonth.slice(0, 6);
  const weekSunday = firstSevenDays.find((el) => new Date(year, month + 1, el).getDay() === 0) || 0;

  const slicedNextMonth = allDaysNextMonth.slice(0, weekSunday);

  return slicedNextMonth;
};

export const getSortedDays = (date: Date) => {
  const daysInMonth = range(getNumberOfDaysInMonth(date));

  return [...daysInMonth];
};

export const onlyWeekend = (year: number, month: number, day: number) => {
  const daysInMonth = range(getNumberOfDaysInMonth(new Date(year, month, day)));

  const sartudayArray = daysInMonth.filter((el) => new Date(year, month, el).getDay() === 6);
  const mondayArray = daysInMonth.filter((el) => new Date(year, month, el).getDay() === 0);

  return [...sartudayArray, ...mondayArray];
};

export const findYesterday = (year: number, month: number, day: number) => {
  let yearstuday = day + 1;

  const daysInMonth = range(getNumberOfDaysInMonth(new Date(year, month, day)));

  const sartudayArray = daysInMonth.filter((el) => new Date(year, month, el).getDay() === 6);
  const mondayArray = daysInMonth.filter((el) => new Date(year, month, el).getDay() === 0);

  if (sartudayArray.includes(yearstuday)) {
    yearstuday += 1;
  }

  if (mondayArray.includes(yearstuday)) {
    yearstuday += 1;
  }

  return yearstuday;
};
