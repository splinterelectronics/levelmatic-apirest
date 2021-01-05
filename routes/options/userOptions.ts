import { RouteShorthandOptions } from 'fastify';
import {
  userAddDeviceByIdPreHandler,
  userAddDevicePreHandler,
  userRegisterPreHandler,
} from '../../utils/hooks/userHooks';
import {
  userRegisterBodySchema,
  userLoginBodySchema,
  // userLoginResponseSchema,
  userAddDeviceBodySchema,
  userAddDeviceResponseSchema,
  userUpdatePasswordBodySchema,
  userAddDeviceByIdBodySchema,
} from '../../utils/schemas/userOptionsSchema';

export const userRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: userRegisterBodySchema,
  },
  preHandler: userRegisterPreHandler,
};

export const userLoginOpts: RouteShorthandOptions = {
  schema: {
    body: userLoginBodySchema,
  },
};

export const userAddDeviceOpts: RouteShorthandOptions = {
  schema: {
    body: userAddDeviceBodySchema,
    response: userAddDeviceResponseSchema,
  },
  preHandler: userAddDevicePreHandler,
};

export const userAddDeviceByIdOpts: RouteShorthandOptions = {
  schema: {
    body: userAddDeviceByIdBodySchema,
    response: userAddDeviceResponseSchema,
  },
  preHandler: userAddDeviceByIdPreHandler,
};

export const userGetDevicesOpts: RouteShorthandOptions = {
  schema: {
    response: userAddDeviceResponseSchema,
  },
};

export const userUpdateOpts: RouteShorthandOptions = {
  schema: {
    body: userUpdatePasswordBodySchema,
  },
};

export const userResetPassCodeOpts: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      additionalProperties: false,
      required: ['code'],
      properties: {
        code: { type: 'number', minimum: 100000, maximum: 999999 },
      },
    },
  },
};

export const userResetSetNewPassOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['newPassword'],
      maxProperties: 1,
      minProperties: 1,
      properties: {
        newPassword: { type: 'string', minLength: 6 },
      },
    },
    params: {
      type: 'object',
      additionalProperties: false,
      required: ['code'],
      properties: {
        code: { type: 'number', minimum: 100000, maximum: 999999 },
      },
    },
  },
};

export const userVerifyCodeOpts: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      additionalProperties: false,
      required: ['code'],
      properties: {
        code: { type: 'number', minimum: 100000, maximum: 999999 },
      },
    },
  },
};

export const userVerifyEmailOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', minLength: 4 },
      },
      additionalProperties: false,
      required: ['email'],
      maxProperties: 1,
      minProperties: 1,
    },
  },
};
