export const getStayDuration = (checkInDate: string | undefined, checkOutDate: string | undefined): string | undefined => {
  if (!checkInDate || !checkOutDate) {
    return undefined;
  }

  const checkinDateFormat = new Date(checkInDate.replace(/\//g, "-"));
  const checkoutDateFormat = new Date(checkOutDate.replace(/\//g, "-"));

  if (isNaN(checkinDateFormat.getTime()) || isNaN(checkoutDateFormat.getTime())) {
    return undefined;
  }

  const diffInTime = checkoutDateFormat.getTime() - checkinDateFormat.getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));

  if (isNaN(diffInDays) || diffInDays < 0) {
    return undefined;
  }

  const dayOrDays = diffInDays === 1 ? 'day' : 'days';
  const durationText = `${diffInDays} ${dayOrDays}`;

  return durationText;
};