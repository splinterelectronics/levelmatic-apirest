export const measureReadBodySchema = {
  title: 'Measure Read Body Schema',
  type: 'object',
  properties: {
    idESP: { type: 'string', minLength: 24, maxLength: 24 },
    range: { type: 'string', enum: ['1h', '6h', '1d', '7d', '1m'] },
  },
  additionalProperties: false,
  required: ['idESP', 'range'],
  maxProperties: 2,
};

export const measureReadResponseSchema = {
  200: {
    type: 'array',
  },
};
