import { RouteShorthandOptions } from 'fastify';
import {
  userAddDevicePreHandler,
  userRegisterPreHandler,
} from '../../utils/hooks/userHooks';
import {
  userRegisterBodySchema,
  userLoginBodySchema,
  userLoginResponseSchema,
  userAddDeviceBodySchema,
  userAddDeviceResponseSchema,
} from '../../utils/schemas/userOptionsSchema';

export const userRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: userRegisterBodySchema,
    response: userLoginResponseSchema,
  },
  preHandler: userRegisterPreHandler,
};

export const userLoginOpts: RouteShorthandOptions = {
  schema: {
    body: userLoginBodySchema,
    response: userLoginResponseSchema,
  },
};

export const userAddDeviceOpts: RouteShorthandOptions = {
  schema: {
    body: userAddDeviceBodySchema,
    response: userAddDeviceResponseSchema,
  },
  preHandler: userAddDevicePreHandler,
};

export const userGetDevicesOpts: RouteShorthandOptions = {
  schema: {
    response: userAddDeviceResponseSchema,
  },
};
