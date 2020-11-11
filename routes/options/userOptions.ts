import { RouteShorthandOptions } from 'fastify';
import {
  userRegisterResponseSchema,
  userRegisterBodySchema,
  userLoginBodySchema,
} from '../../utils/schemas/userOptionsSchema';

export const userRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: userRegisterBodySchema,
    response: userRegisterResponseSchema,
  },
};

export const userLoginOpts: RouteShorthandOptions = {
  schema: {
    body: userLoginBodySchema,
  },
};
