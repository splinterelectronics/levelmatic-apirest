export const userRegisterResponseSchema = {
  201: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
    },
  },
};

export const userRegisterBodySchema = {
  title: 'User Register Body Schema',
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 6 },
    password: { type: 'string', minLength: 6 },
    email: { type: 'string', format: 'email', minLength: 4 },
  },
  additionalProperties: false,
  required: ['username', 'password', 'email'],
  maxProperties: 3,
  minProperties: 3,
};

export const userLoginResponseSchema = {
  200: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
      devices: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            owner: { type: 'string' },
            rxConnection: { type: 'string', format: 'date-time' },
            lastMeasure: {
              type: 'object',
              properties: {
                liquidLevel: { type: 'number' },
                batteryLevel: { type: 'number' },
                dateMeasure: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
  },
};

export const userLoginBodySchema = {
  title: 'User Login Body Schema',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', minLength: 4 },
    password: { type: 'string', minLength: 6 },
  },
  additionalProperties: false,
  required: ['email', 'password'],
  maxProperties: 2,
  minProperties: 2,
};