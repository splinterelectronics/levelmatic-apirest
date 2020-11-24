export const getProjectObject = (range: string): Object => {
  if (range === '1m' || range === '7d') {
    return {
      dateMeasureDay: { $dayOfMonth: '$dateMeasure' },
      dateMeasureMonth: { $month: '$dateMeasure' },
      value: '$liquidLevel',
    };
  }
  return {
    dateMeasureHour: { $hour: '$dateMeasure' },
    value: '$liquidLevel',
  };
};

export const getGroupObject = (range: string): Object => {
  if (range === '1m' || range === '7d') {
    return {
      _id: '$dateMeasureDay',
      month: { $first: '$dateMeasureMonth' },
      avgValue: { $avg: '$value' },
    };
  }
  return {
    _id: '$dateMeasureHour',
    avgValue: { $avg: '$value' },
  };
};

export const getSortObject = (range: string): Object => {
  if (range === '1m' || range === '7d') {
    return { month: 'asc', _id: 'asc' };
  }
  return { _id: 'asc' };
};
