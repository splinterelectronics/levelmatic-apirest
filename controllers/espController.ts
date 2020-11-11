import { FastifyReply, FastifyRequest } from 'fastify';

// const service = EspService.Instance;

export default class EspController {
  private static instance: EspController;

  public static get Instance(): EspController {
    if (!EspController.instance) {
      EspController.instance = new EspController();
    }
    return EspController.instance;
  }

  public async read(req: FastifyRequest, reply: FastifyReply) {
    try {
      return reply.send('Ok');
    } catch (error) {
      return reply.send('oka');
    }
  }
}
