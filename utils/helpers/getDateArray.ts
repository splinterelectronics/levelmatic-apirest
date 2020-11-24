import dayjs from 'dayjs';

// const getWeekDay = (day: number) => {
//   switch (day) {
//     case 0:
//       return 'Domingo';
//     case 1:
//       return 'Lunes';
//     case 2:
//       return 'Martes';
//     case 3:
//       return 'Miércoles';
//     case 4:
//       return 'Jueves';
//     case 5:
//       return 'Viernes';
//     default:
//       return 'Sábado';
//   }
// };

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
