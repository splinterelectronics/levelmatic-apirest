import { RouteShorthandOptions } from 'fastify';
import { espUpdateBodySchema } from '../../utils/schemas/espOptionsSchema';

// eslint-disable-next-line import/prefer-default-export
export const espUpdateOpts: RouteShorthandOptions = {
  schema: {
    body: espUpdateBodySchema,
    // response: ,
  },
};
