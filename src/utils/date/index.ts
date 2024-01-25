const getFormattedDate = (value: string) => {
  const [year, month, day] = value.split('/').map(Number);
  const currentDate = new Date();
  const formattedDate = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds()
    )
  ).toISOString();

  return formattedDate;
};

const getInitialDate = (date: string | undefined) => {
  if (!date) return;

  const result = date ? new Date(date).toISOString().split('T')[0].replace(/-/g, '-') : '';

  return result; // yyyy-mm-dd
};

export { getFormattedDate, getInitialDate };
