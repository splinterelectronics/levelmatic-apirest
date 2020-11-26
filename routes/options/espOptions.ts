import { RouteShorthandOptions } from 'fastify';
import { espUpdateBodySchema } from '../../utils/schemas/espOptionsSchema';

export const espUpdateOpts: RouteShorthandOptions = {
  schema: {
    body: espUpdateBodySchema,
    // response: ,
  },
};

export const measureDeleteOpts = {};
