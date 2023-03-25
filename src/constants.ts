const dateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
};

export const NORMALIZE_DATE = new Intl.DateTimeFormat('ru', dateOptions);

const dateOptionsWithYear: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const isDateGreaterThanToday = (date: string) => {
  const today = new Date().setHours(0, 0, 0, 0);

  return new Date(date).setHours(0, 0, 0, 0) > today;
};

export const isDateLessThanToday = (date: string) => {
  const today = new Date().setHours(0, 0, 0, 0);

  return new Date(date).setHours(0, 0, 0, 0) < today;
};

export const BURGER_MENU_BREAKPOINT = 1150;

export const NORMALIZE_DATE_WITH_YEAR = new Intl.DateTimeFormat('ru', dateOptionsWithYear);
