import { stringToDateFormat } from 'src/utils';

export const getStayDuration = (checkin: string | undefined, checkout: string | undefined) => {
  if (!checkin || !checkout) return;
  const checkinDate = stringToDateFormat(checkin);
  const checkoutDate = stringToDateFormat(checkout);
  if (checkinDate >= checkoutDate) return;
  const diffInTime = checkoutDate.getTime() - checkinDate.getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
  const dayOrDays = diffInDays > 1 ? 'days' : 'day';
  const durationText = `${diffInDays} ${dayOrDays}`;
  return durationText;
};
