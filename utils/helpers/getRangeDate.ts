import dayjs, { Dayjs } from 'dayjs';

const getRangeDate = (interval: string = '7d'): { from: Dayjs; to: Dayjs } => {
  const to: Dayjs = dayjs();

  switch (interval) {
    case '1h': {
      const from = to.subtract(1, 'hour');
      return { from, to };
    }

    case '6h': {
      const from = to.subtract(6, 'hour');
      return { from, to };
    }

    case '1d': {
      const from = to.subtract(1, 'day');
      return { from, to };
    }

    case '7d': {
      const from = to.subtract(7, 'day');
      return { from, to };
    }

    case '1m': {
      const from = to.subtract(1, 'month');
      return { from, to };
    }

    default: {
      const from = to.subtract(1, 'hour');
      return { from, to };
    }
  }
};

export default getRangeDate;
