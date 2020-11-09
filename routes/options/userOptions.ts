import { RouteShorthandOptions } from 'fastify';
import RegisterBodySchema from '../../schemas/userRegisterBodySchema.json';

export const userOpts: RouteShorthandOptions = {
  schema: {
    body: RegisterBodySchema,
  },
  preHandler: async (req, reply) => {
    console.log(req.body);
  },
};
