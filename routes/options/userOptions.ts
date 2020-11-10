import { RouteShorthandOptions } from 'fastify';
import {
  userRegisterResponseSchema,
  userRegisterBodySchema,
} from '../../utils/schemas/userOptionsSchema';

export const userRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: userRegisterBodySchema,
    response: userRegisterResponseSchema,
  },
};

export const userDeleteOpts = {};
