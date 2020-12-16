import dayjs from 'dayjs';

const getDateArrayByDDMM = (dates: any[]) => {
  return dates.map(({ _id: day, month, year }) =>
    dayjs(`${year}-${month}-${day}`).format('DD/MM')
  );
};

const getDateArrayByHour = (dates: any[]) => {
  return dates.map(({ _id: hour }) => `${hour}:00`);
};

const getDateArray = (dates: any[], range: string) => {
  if (range === '1m' || range === '7d') {
    return getDateArrayByDDMM(dates);
  }
  if (range === '6h' || range === '1d') {
    return getDateArrayByHour(dates);
  }
  return dates.map(() => '');
};

export default getDateArray;
