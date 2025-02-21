export const isDateOlderThan14Days = (dateToCheck: Date): boolean => {
  const maxDateSeconds = getMaxDate().getTime();
  const dateToCheckSeconds = dateToCheck.getTime();

  if (dateToCheckSeconds < maxDateSeconds) {
    return true;
  }

  return false;
};

export const getMaxDate = (): Date => {
  const todaysDate = new Date();
  const maxDate = new Date(todaysDate);
  maxDate.setDate(todaysDate.getDate() - 14);

  return maxDate;
};
