const measureReadBodySchema = {
  title: 'Measure Read Body Schema',
  type: 'object',
  properties: {
    idESP: { type: 'string', minLength: 24, maxLength: 24 },
  },
  additionalProperties: false,
  required: ['idESP'],
  minProperties: 1,
};

export default measureReadBodySchema;
