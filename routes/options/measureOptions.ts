import { RouteShorthandOptions } from 'fastify';
import measureReadBodySchema from '../../utils/schemas/measureOptionsSchema';

export const measureReadOpts: RouteShorthandOptions = {
  schema: {
    querystring: measureReadBodySchema,
  },
};

export const measureDeleteOpts = {};
