export const measureReadBodySchema = {
  title: 'Measure Read Body Schema',
  type: 'object',
  properties: {
    idESP: { type: 'string', minLength: 24, maxLength: 24 },
  },
  additionalProperties: false,
  required: ['idESP'],
  minProperties: 1,
};

export const measureReadResponseSchema = {
  200: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        liquidLevel: { type: 'number' },
        batteryLevel: { type: 'number' },
        dateMeasure: { type: 'string', format: 'date-time' },
      },
    },
  },
};
