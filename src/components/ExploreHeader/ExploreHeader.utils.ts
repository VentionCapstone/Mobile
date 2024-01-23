export   const getStayDuration = (checkInDate: string | undefined, checkOutDate: string | undefined) => {
  if (!checkInDate || !checkOutDate) return;
  const checkinDateFormat = new Date(checkInDate.replaceAll("/", "-"));
  const checkoutDateFormat = new Date(checkOutDate.replaceAll("/", "-"));
  const diffInTime = checkoutDateFormat.getTime() - checkinDateFormat.getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
  const dayOrDays = diffInDays > 1 ? 'days' : 'day'
  const durationText = `${diffInDays} ${dayOrDays}`;
  return durationText;
}