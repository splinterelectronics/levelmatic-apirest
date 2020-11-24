export const getProjectObject = (range: string): Object => {
  if (range === '1m' || range === '7d') {
    return {
      dateMeasureDay: { $dayOfMonth: '$dateMeasure' },
      dateMeasureMonth: { $month: '$dateMeasure' },
      dateMeasureYear: { $year: '$dateMeasure' },
      value: '$liquidLevel',
    };
  }
  return {
    dateMeasureHour: { $hour: '$dateMeasure' },
    dateMeasureDay: { $dayOfMonth: '$dateMeasure' },
    value: '$liquidLevel',
  };
};

export const getGroupObject = (range: string): Object => {
  if (range === '1m' || range === '7d') {
    return {
      _id: '$dateMeasureDay',
      month: { $first: '$dateMeasureMonth' },
      year: { $first: '$dateMeasureYear' },
      avgValue: { $avg: '$value' },
    };
  }
  return {
    _id: '$dateMeasureHour',
    day: { $first: '$dateMeasureDay' },
    avgValue: { $avg: '$value' },
  };
};

export const getSortObject = (range: string): Object => {
  if (range === '1m' || range === '7d') {
    return { year: 'asc', month: 'asc', _id: 'asc' };
  }
  return { day: 'asc', _id: 'asc' };
};
