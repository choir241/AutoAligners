export function isHoliday({
  month,
  day,
  dayOfWeek,
}: {
  month: number;
  day: number;
  dayOfWeek: number;
}) {
  // New Year's Day: January 1
  if (
    (month === 1 && day === 1) ||
    (month === 12 && day === 24) ||
    (month === 12 && day === 25) ||
    (month === 12 && day === 31) ||
    (month === 11 && day === 11) ||
    (month === 7 && day === 4)
  ) {
    return false;
  } else if (month === 1 && dayOfWeek === 1 && day >= 15 && day < 22) {
    return false;
  } else if (month === 5 && day + 7 > 31 && dayOfWeek === 1) {
    // Memorial Day: The last Monday in May
    return false;
  } else if (month === 9 && day >= 1 && day <= 7 && dayOfWeek === 1) {
    // Labor Day: The first Monday in September
    return false;
  } else if (month === 10 && dayOfWeek === 1 && day >= 8 && day < 15) {
    // Columbus Day: The second Monday in October
    return false;
  }
  return true;
}
