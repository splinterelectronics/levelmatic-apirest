import { RouteShorthandOptions } from 'fastify';
import userRegisterBodySchema from '../../schemas/userRegisterBodySchema.json';

export const userRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: userRegisterBodySchema,
  },
};
