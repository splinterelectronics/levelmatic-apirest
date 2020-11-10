import { RouteShorthandOptions } from 'fastify';
import {
  measureReadResponseSchema,
  measureReadBodySchema,
} from '../../utils/schemas/measureOptionsSchema';

export const measureReadOpts: RouteShorthandOptions = {
  schema: {
    querystring: measureReadBodySchema,
    response: measureReadResponseSchema,
  },
};

export const measureDeleteOpts = {};
