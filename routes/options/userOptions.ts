import { RouteShorthandOptions } from 'fastify';
import userRegisterBodySchema from '../../utils/schemas/userRegisterBodySchema.json';

export const userRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: userRegisterBodySchema,
  },
};
